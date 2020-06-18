/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//@ts-ignore
import keccak256 from 'keccak256';
import TellorGetters from './contracts/TellorGetters.json';
import UserContract from './contracts/UserContract.json';
import { TellorInfo, RequestInfo, RequestValue, Dispute, RequestQueue } from './types';

interface TellorClientOptions {
    tellorGettersAddress?: string;
    userContractAddress?: string;
}

class TellorClient {
    web3: any;
    tellorGetters: any;
    userContract: any;
    static defaultTellorGettersAddress = '0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5';
    static defaultUserContractAddress = '0xCaC3937932621F62D94aCdE77bBB2a091FD26f58';

    constructor(web3: any, options?: TellorClientOptions) {
        this.web3 = web3;
        this.tellorGetters = new web3.eth.Contract(
            TellorGetters.abi,
            options?.tellorGettersAddress || TellorClient.defaultTellorGettersAddress,
        );
        this.userContract = new web3.eth.Contract(
            UserContract.abi,
            options?.userContractAddress || TellorClient.defaultUserContractAddress,
        );
    }

    public async getUintVar(name: string): Promise<string> {
        const hash = keccak256(name).toString('hex');
        const value = await this.tellorGetters.methods.getUintVar('0x' + hash).call();
        return value;
    }

    public async getInfo(): Promise<TellorInfo> {
        const stakerCountPromise = this.getUintVar('stakerCount');
        const difficultyPromise = this.getUintVar('difficulty');
        const currentRequestIdPromise = this.getUintVar('currentRequestId');
        const disputeCountPromise = this.getUintVar('disputeCount');
        const totalSupplyPromise = this.getUintVar('totalSupply');
        const timeOfLastValuePromise = this.getUintVar('timeOfLastValue');
        const requestCountPromise = this.getUintVar('requestCount');

        const [
            stakerCount,
            difficulty,
            currentRequestId,
            disputeCount,
            totalSupply,
            timeOfLastValue,
            requestCount,
        ] = await Promise.all([
            stakerCountPromise,
            difficultyPromise,
            currentRequestIdPromise,
            disputeCountPromise,
            totalSupplyPromise,
            timeOfLastValuePromise,
            requestCountPromise,
        ]);

        return {
            stakerCount,
            difficulty,
            currentRequestId,
            disputeCount,
            totalSupply,
            timeOfLastValue,
            requestCount,
        };
    }

    //Get data for information about the specified requestID
    public async getRequestInfo(id: string): Promise<RequestInfo> {
        const [
            apiString,
            dataSymbol,
            queryHash,
            granularity,
            requestQPosition,
            totalTip,
        ] = await this.tellorGetters.methods.getRequestVars(id).call();

        return {
            apiString,
            dataSymbol,
            queryHash,
            granularity,
            requestQPosition,
            totalTip,
        };
    }

    //Get data for as specific price request
    public async getRequestValue(id: string): Promise<RequestValue> {
        const [didGet, value, timestampRetrieved] = await this.userContract.methods.getCurrentValue(id).call();
        return {
            didGet,
            value,
            timestampRetrieved,
        };
    }

    //Get data for a specific dispute
    public async getDispute(id: string): Promise<Dispute> {
        const [
            hash,
            executed,
            disputeVotePassed,
            isPropFork,
            reportedMiner,
            reportingParty,
            proposedForkAddress,
            requestId,
            timestamp,
            value,
            minExecutionDate,
            stringOfVotes,
            blockNumber,
            minerSlot,
            quorum,
            fee,
        ] = await this.tellorGetters.methods.getAllDisputeVars(id).call();

        return {
            hash,
            executed,
            disputeVotePassed,
            isPropFork,
            reportedMiner,
            reportingParty,
            proposedForkAddress,
            requestId,
            timestamp,
            value,
            minExecutionDate,
            stringOfVotes,
            blockNumber,
            minerSlot,
            quorum,
            fee,
        };
    }

    //Get data for a specific dispute
    public async getRequestQueue(): Promise<RequestQueue> {
        const requestQueue = await this.tellorGetters.methods.getRequestQ().call();
        return requestQueue;
    }
}

export default TellorClient;
