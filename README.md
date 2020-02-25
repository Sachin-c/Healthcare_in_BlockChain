# Blockchain in Healthcare

## Our stack

For this project, we used the following stack:

- Solidity Smart Contracts
- IPFS for storing image data via Infura
- Truffle and Ganache for our development and testing framework
- React / Redux / Bootstrap 4 for our front-end development
- MetaMask for our web3 provider

## Prerequisites

1.  You will need [Metamask](https://metamask.io/) plugin for Chrome.
2.  Make sure you have [Node.js](https://nodejs.org/en/) installed.

## Installation

1.  Install [Truffle Framework](http://truffleframework.com/) and [Ganache CLI](http://truffleframework.com/ganache/) globally. If you prefer, the graphical version of Ganache works as well.

    ```bash
    npm install -g truffle
    npm install -g ganache-cli
    ```

    <strong>Note</strong>: The graphical version of Ganache seems to be more stable on Mac whereas Ganache CLI works fine on Ubuntu.

2.  Run the development blockchain.

    ```bash
    // no blocktime specified so transaction will be mined instantly
    ganache-cli
    ```

    You may want to pass in a blocktime. Otherwise, it's difficult to track things like loading indicators because Ganache will mine instantly.

    <strong>Note</strong>: We've noticed that using a blocktime while running `truffle test` causes issues.

    ```bash
    // 3 second blocktime
    ganache-cli -b 3
    ```

3.  Open another terminal, clone this repo and install its dependencies.

    ```bash
    git clone https://github.com/Sachin-c/Healthcare_in_BlockChain.git

    cd Healthcare_in_BlockChain

    npm install
    ```

    <strong>Note</strong>: If you get an error on install, don't panic. It should still work.

4.  Compile and migrate the smart contracts.

    ```bash
    truffle compile
    truffle migrate

    # You can combine into one command
    truffle migrate --reset ---compile-all
    ```

5.  Start the application

    ```bash
    npm run start
    ```

6.  Navigate to http://localhost:3000/ in your browser.

7.  Remember to connect [MetaMask](https://metamask.io/) to one of your local Ganache Ethereum accounts

    - Connect to Localhost 8545, or
    - Create and connect to a custom RPC network using the Ganache RPC server (currently `http://127.0.0.1:8545`), then
    - Import a new account and use the account seed phrase provided by Ganache

      ![IPFS Image dApp](../master/assets/screenshots/metamask-choose-network.png?raw=true 'MetaMask Choose Network')


## Deploy to Rinkeby TestNet

Steps to deploy our smart contract directly from Truffle with Infura to the Rinkeby TestNet.

1.  Get an [Infura](https://infura.io/) API key. You can sign up for [free](https://infura.io/signup).
2.  Create a .env file in the root directory if it doesn't exist
    ```bash
    cd Healthcare_in_Blockchain
    touch .env
    ```
3.  Update the .env file with your MetaMask mnenomic and Infura API Key
    ```javascript
    MNENOMIC = '<Your MetaMask recovery words>'
    INFURA_API_KEY = '<Your Infura API Key after its registration>'
    ```
4.  Deploy to Rinkeby with `truffle migrate --reset --compile-all --network rinkeby`

    ```bash
    $ truffle migrate --reset --compile-all --network rinkeby
    Compiling ./contracts/ImageRegister.sol...
    Compiling ./contracts/Migrations.sol...
    Compiling openzeppelin-solidity/contracts/lifecycle/Destructible.sol...
    Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol...
    Writing artifacts to ./build/contracts

    Using network 'rinkeby'.

    Running migration: 1_initial_migration.js
      Deploying Migrations...
      ... 0xb2d3cebfca0c1a2e0d271c07740112460d82ce4469ba14d7b92f9993314af50c
      Migrations: 0x4ed3265ed135a4c85669f32ca662bd2aba3e5db3
    Saving successful migration to network...
      ... 0xde1d86d1efbeae9d086e0d1d170a20bbe1f570e92816d231265874f2a8afe556
    Saving artifacts...
    Running migration: 2_deploy_contracts.js
      Deploying ImageRegister...
      ... 0xcfbe99781c8c0cd77dd208eb445b2c12381704441e3827b2308a88d9c9b29079
      ImageRegister: 0x107aaa697293b44376de69ad4b87579e3b1e50d8
    Saving successful migration to network...
      ... 0x46ad7dbe55f412a55c76e48bf7553603c0826a19cda92f45f319699b8eb5a203
    Saving artifacts...
    ```

5.  Run the application as described above.

Check out the awesome tutorial [Deploy Your Smart Contract Directly from Truffle with Infura](https://medium.com/coinmonks/deploy-your-smart-contract-directly-from-truffle-with-infura-ba1e1f1d40c2) by Hyungsuk Kang.

## Troubleshooting Tips

- Is Ganache running?
- Is your MetaMask account unlocked?
- Are you using the MetaMask account associated with your Ganache account?
- Are you using your custom RPC network in MetaMask?
- If MetaMask can't find your RPC network, try switching to the Rinkeby Test Network and back.
- Did you `truffle compile` and `truffle migrate` whenever starting your local network or making changes to your smart contract?
- Transaction error? 
  - Try resetting the MetaMask account you created under settings.
- Is `truffle migrate` showing stale settings? 
  - Try `truffle migrate --reset`
- Images do not appear right away? 
  - Have noticed on Mac that ganache-cli may drop transactions. Try using the Ganache app instead.
  - If you are using the Rinkeby TestNet, it may take up to a minute before the transaction is mined.

## Where can I find more documentation?

This application is a marriage of [Truffle](http://truffleframework.com/) and a React project created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start.

You can also check out the official sites for the [Ethereum Project](https://ethereum.org/), [OpenZeppelin](https://openzeppelin.org/) library and [IPFS](https://ipfs.io/).


## Future enhancements

- Add a visual indicator of the number of image uploads in-progress
- Improve web3 error handling, use React error boundaries
- Improve account change logic
  - Current logic is based on this article [Detecting Metamask account or network change in Javascript using Web3 1.0.0](https://medium.com/coinmonks/detecting-metamask-account-or-network-change-in-javascript-using-web3-1-0-0-18433e99df5a)
- Image upload wizard workflow
- Allow video uploads
- Allow update of image metadata e.g. title, description, tags
- Search / filter by tags

## Notes

This project uses [Bootstrap 4](https://getbootstrap.com/).

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# License

MIT
