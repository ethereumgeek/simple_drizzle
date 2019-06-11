const HDWalletProvider = require("truffle-hdwallet-provider");
const key = "";
const passphrase = "";

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 6990000,
      gasPrice: 1000000000
    },
    "live": {
      network_id: 1,
      host: "127.0.0.1",
      port: 8546  // Different than the default below
    },
    ropsten: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 3,
      gas: 6990000
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 4,
      gas: 6990000
    },
    kovan: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 42,
      gas: 6990000
    },
    "live-infura": {
        provider: () => new HDWalletProvider(passphrase, "https://mainnet.infura.io/v3/" + key),
        network_id: 1
    },
    "ropsten-infura": {
      provider: () => new HDWalletProvider(passphrase, "https://ropsten.infura.io/v3/" + key),
      network_id: 3,
      gas: 6990000
    },
    "rinkeby-infura": {
      provider: () => new HDWalletProvider(passphrase, "https://rinkeby.infura.io/v3/" + key),
      network_id: 4,
      gas: 6990000
    },
    "kovan-infura": {
      provider: () => new HDWalletProvider(passphrase, "https://kovan.infura.io/v3/" + key),
      network_id: 42,
      gas: 6990000
    }
  },
  compilers: {
    solc: {
       version: "0.5.3",   // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,     // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 1000
       },
       evmVersion: "byzantium"
      }
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
