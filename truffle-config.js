require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");
<<<<<<< HEAD
const mnemonic =
  "rib smooth speed fuel company lazy bring call leader famous then hover";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
=======
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
>>>>>>> 3a4229f95cdc928f2c83dfc66887d4fc2dab73fb
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
// rib smooth speed fuel company lazy bring call leader famous then hover
// ropsten: {
//   provider: function() {
//     return new HDWalletProvider(
//       mnemonic,
//       "https://sandbox.truffleteams.com/025ee19b-5c67-4f4e-9a40-b88b5742528f"
//     );
//   },
//   port: 443,
//   network_id: "*", // Match any network id
// },
