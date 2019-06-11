# simple_drizzle

This project demonstrates an issue where projects created with Drizzle won't initialize within Coinbase Wallet.

To repro the issue, follow these steps:

git clone git@github.com:ethereumgeek/simple_drizzle.git
cd simple_drizzle
npm install
cd app
npm install
npm run start

Make sure you're on the Rinkeby network. You'll see that drizzle loads and you can see some info about your account, and you can interact with the SimpleStorage contract. Now build a version of the dapp to deploy:

npm run build

Then deploy the dapp to some URL. If you go to this URL with a Metamask-enabled browser or Cipherwallet or Alphawallet on iOS (again, using Rinkeby) you'll see everything working fine. If you visit this URL with Coinbase Wallet, the app won't load because drizzle can't initialize.

According to the Truffle team (who created Drizzle), this is because "Coinbase [hasn't implemented] EIP 1102 and automatically connects the dapp upon invocation of window.ethereum.enable()"

The truffle team has a branch with a potential fix, but this doesn't seem to work for us and we're not sure why. To use the fix:

git clone git@github.com:trufflesuite/drizzle.git
cd drizzle
git checkout fix/coinbase-init-web3
npm install
npm ci
npm run test
npm run build
npm link

// Now go back to the top level directory where the simple_drizzle app is cloned and link the 'fixed' drizzle:
cd ../simple_drizzle
npm link drizzle
npm install
cd app
npm run start

The app should still work on your local machine after this. It it supposed to now work with Coinbase Wallet, let's see:

npm run build
<do whatever you do to deploy apps here, for instance "firebase deploy">

If you go to the deployed app on Coinbase Wallet, you should still see that the app fails to load. If you use Cipher Wallet it still works fine.

We're not sure why truffle's "fixed" version of drizzle doesn't allow the app to load in Coinbase Wallet. If you have ideas please let me know. elliotolds at gmail.

