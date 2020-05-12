require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = "empower copper broccoli aim release pig foam mule ranch salmon brisk royal";

module.exports = {
  networks: {
  //   ropsten: {
  //   provider: function() {
  //     return new HDWalletProvider(mnemonic, "https://sandbox.truffleteams.com/025ee19b-5c67-4f4e-9a40-b88b5742528f");
  //   },
  //   network_id: '1589235947767',
  // },

    development: {
      // Hostname: "bit.com",
      // provider: function() {
      //   return new HDWalletProvider(mnemonic, "https://sandbox.truffleteams.com/025ee19b-5c67-4f4e-9a40-b88b5742528f");
      // },
      host: "https://sandbox.truffleteams.com/025ee19b-5c67-4f4e-9a40-b88b5742528f",
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
