/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//@ts-ignore
import keccak256 from 'keccak256';
import TellorGetters from './contracts/TellorGetters.json';
import UserContract from './contracts/UserContract.json';

interface TellorInfo {
    stakerCount: string;
    difficulty: string;
    currentRequestId: string;
    disputeCount: string;
    totalSupply: string;
    timeOfLastValue: string;
    requestCount: string;
}

interface RequestInfo {
    apiString: string;
    dataSymbol: string;
    queryHash: string;
    granularity: string;
    requestQPosition: string;
    totalTip: string;
}

interface RequestValue {
    didGet: boolean;
    value: string;
    timestampRetrieved: string;
}

interface Dispute {
    hash: string;
    executed: string;
    disputeVotePassed: string;
    isPropFork: boolean;
    reportedMiner: string;
    reportingParty: string;
    proposedForkAddress: string;
    requestId: string;
    timestamp: string;
    value: string;
    minExecutionDate: string;
    stringOfVotes: string;
    blockNumber: string;
    minerSlot: string;
    quorum: string;
    fee: string;
}

type RequestQueue = any;

class TellorClient {
    web3: any;
    tellorGetters: any;
    userContract: any;
    static defaultTellorGettersAddress = '0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5';
    static defaultUserContractAddress = '0xCaC3937932621F62D94aCdE77bBB2a091FD26f58';

    constructor(web3: any, { tellorGettersAddress, userContractAddress }: any) {
        this.web3 = web3;
        this.tellorGetters = new web3.eth.Contract(
            TellorGetters.abi,
            tellorGettersAddress || TellorClient.defaultTellorGettersAddress,
        );
        this.userContract = new web3.eth.Contract(
            UserContract.abi,
            userContractAddress || TellorClient.defaultUserContractAddress,
        );
    }

    public async getUintVar(name: string): Promise<string> {
        const hash = keccak256(name).toString('hex');
        const value = await this.tellorGetters.methods.getUintVar(hash).call();
        return value;
    }

    public async getInfo(): Promise<TellorInfo> {
        //TODO (Avoid blocking await calls)
        const stakerCount = await this.getUintVar('stakerCount');
        const difficulty = await this.getUintVar('difficulty');
        const currentRequestId = await this.getUintVar('currentRequestId');
        const disputeCount = await this.getUintVar('disputeCount');
        const totalSupply = await this.getUintVar('totalSupply');
        const timeOfLastValue = await this.getUintVar('timeOfLastValue');
        const requestCount = await this.getUintVar('requestCount');

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
