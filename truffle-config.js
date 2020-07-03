require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "empower copper broccoli aim release pig foam mule ranch salmon brisk royal";
module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://sandbox.truffleteams.com/525dd842-df52-4827-8645-baf6ae81dc27");
      }, 
      port: 443,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://sandbox.truffleteams.com/025ee19b-5c67-4f4e-9a40-b88b5742528f");
      }, 
      port: 443,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
