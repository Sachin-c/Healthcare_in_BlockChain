require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic =
  "rib smooth speed fuel company lazy bring call leader famous then hover";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
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
