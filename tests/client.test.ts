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

    it('getRequestValue', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const requestValue = await client.getRequestValue('0');

        console.debug(requestValue);
    });

    it('getDispute', async function () {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const dispute = await client.getDispute('0');

        console.debug(dispute);
    });

    it('getRequestQueue', async () => {
        const web3 = new Web3(ETH_RPC);
        const client = new TellorClient(web3);
        const queue = await client.getRequestQueue();

        console.debug(queue);
    });
});
