# tellor-js

## Description

tellor-js is a JS library for interacting with Tellor.io smart contracts on the Ethereum blockchain. These smart contracts coordinate PoW-based (Proof-of-Work) oracle mining. Use the tellor-js package alongside web3 to simply access to on-chain data from Tellor miners.

## Features

-   Get Tellor Mining Metrics (difficulty, stakerCount...)
-   Get Request Info (apiString, position...)
-   Get Request Value (value, timestamp)
-   Get Request Queue (pending requests)

## Install

```
npm install tellor-js
```

## Quickstart

Install the Web3 peer dependency.
Query general Tellor info.

```js
const web3 = new Web3(ETH_RPC);
const client = new TellorClient(web3);
const info = await client.getInfo();
console.debug(info);
```

## Tests

Set the .env ETH_URL variable.

```
ETH_RPC=<YOUR_NODE>
```

Run tests.

```
npm run test
```

## TO DO

-   Coverage
-   Documentation

## Contributing

To contribute code, feel free to fork this repo. Feel free to contact us if you have any questions or would like to collaborate.

## License

2020 Leo Vigna
MIT License.

## About Vulcan Link

We are a Paris-based Chainlink (and soon possibly Tellor!) node operator working on actively maintaining 30+ reliable data feeds and developing decentralized applications that leverage smart contracts with external data. We believe in building trust through transparency by contributing to opensource projects. If you'd like us to add other data feeds to [feeds.link](https://feeds.link), feel free to reach out through our links below!

Find us at online at [vulcan.link](https://vulcan.link)
Follow us on Twitter [@vulcanlink](https://twitter.com/vulcanlink) for updates on new projects like this one.
If you'd like to contribute, join us on [Telegram](https://t.me/vulcanlink) and [Discord](https://discord.gg/uGwqJJH).
