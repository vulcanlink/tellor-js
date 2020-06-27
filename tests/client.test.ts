/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

import { expect } from 'chai';
import Web3 from 'web3';
import TellorClient from '../src/client';
require('dotenv').config();

const ETH_RPC = process.env.ETH_RPC;
console.debug(ETH_RPC);

describe('TellorClient', function () {
    it('defaultTellorGettersAddress', function () {
        const result = TellorClient.defaultTellorGettersAddress;
        expect(result).equal('0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5');
    });

    it('defaultUserContractAddress', function () {
        const result = TellorClient.defaultUserContractAddress;
        expect(result).equal('0xCaC3937932621F62D94aCdE77bBB2a091FD26f58');
    });

    it('getInfo', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const info = await client.getInfo();

        console.debug(info);
    });

    it('getRequestInfo', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const requestInfo = await client.getRequestInfo('0');

        console.debug(requestInfo);
    });

    it('getCurrentValue', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const requestValue = await client.getCurrentValue('1');

        console.debug(requestValue);
    });

    it('getDispute', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const dispute = await client.getDispute('1');

        console.debug(dispute);
    });

    it('getRequestQueue', async () => {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const queue = await client.getRequestQueue();

        console.debug(queue);
    });

    it('getNewValueCountbyRequestId', async () => {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const newValueCount = await client.getNewValueCountbyRequestId('1');

        console.debug(newValueCount);
    });

    it('getTimestampbyRequestIDandIndex', async () => {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const timestamp = await client.getTimestampbyRequestIDandIndex('1', 1);

        console.debug(timestamp);
    });

    it('retrieveData', async () => {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const timestamp = await client.getTimestampbyRequestIDandIndex('1', 1);
        const data = await client.retrieveData('1', timestamp);

        console.debug(data);
    });

    it('getCurrentValue == retrieveData', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        //getRequestValue
        const requestValue = await client.getCurrentValue('1');
        //retrieveData
        const newValueCount = await client.getNewValueCountbyRequestId('1');
        const timestamp = await client.getTimestampbyRequestIDandIndex('1', newValueCount - 1);
        const requestValue2 = await client.retrieveData('1', timestamp);

        console.debug(requestValue);
        console.debug(requestValue2);
        expect(requestValue.value).to.equal(requestValue2); // Recommended
    });
});
