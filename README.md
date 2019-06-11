# simple_drizzle

This project demonstrates an issue where projects created with Drizzle won't initialize within Coinbase Wallet.

To repro the issue, follow these steps:

```
git clone git@github.com:ethereumgeek/simple_drizzle.git
cd simple_drizzle
npm install
cd app
npm install
npm run start
```

Make sure you're on the Rinkeby network. You'll see that drizzle loads and you can see some info about your account, and you can interact with the SimpleStorage contract. Now build a version of the dapp to deploy:

```
npm run build
```

Then deploy the dapp to some URL. 

```
<somehow deploy the app>
```

See some options for how to deploy [here](https://facebook.github.io/create-react-app/docs/deployment). If you go to the URL you deployed to with a Metamask-enabled browser or Cipherwallet or Alphawallet on iOS (again, using Rinkeby) you'll see everything working fine. If you visit this URL with Coinbase Wallet on iOS, the app won't load because drizzle can't initialize.

According to the Drizzle team, this is because "Coinbase [hasn't implemented] EIP 1102 and automatically connects the dapp upon invocation of window.ethereum.enable()"

The Drizzle team has a branch with a potential fix, but this doesn't seem to work for us and we're not sure why. To use the fix:

```
git clone git@github.com:trufflesuite/drizzle.git
cd drizzle
git checkout fix/coinbase-init-web3
npm install
npm ci
npm run test
npm run build
```
After 'npm run build' we get a warning:

```
WARNING in ./src/web3/web3Saga.js 86:18-35
"export 'WEB3_ERROR' (imported as 'Action') was not found in './constants'
 @ ./src/drizzleStatus/drizzleStatusSaga.js
 @ ./src/index.js
```

Can we ignore this? Unclear but we'll assume we can. Finally:

```
npm link
```

We also get a warning after 'npm link':

```
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/ganache-core/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
```

We'll ignore that too. Now go back to the top level directory where the simple_drizzle app is cloned and link the 'fixed' drizzle:

```
cd ../simple_drizzle
npm link drizzle
cd app
npm run start
```

The app should still work on your local machine after this. It's supposed to now work with Coinbase Wallet, let's see:

```
npm run build
<somehow deploy the app>
```

If you go to the deployed app on Coinbase Wallet (remember to use Rinkeby), you should still see that the app fails to load. If you use Cipher Wallet it still works fine.

### A working example

A developer on the Truffle team has an example of a drizzle project which does initialize from within Coinbase Wallet. To try it, do this:

```
git clone git@github.com:cds-amal/drizzle_react_example.git
cd drizzle_react_example
npm install
npm run start
<see that it works locally>
npm run build
<somehow deploy the app>
```

You'll see that it works in wallets like Cipher Wallet, but not in Coinbase Wallet. Then link to the fixed drizzle repo:

```
npm link drizzle
npm run build
<somehow deploy the app>
```
Now the app works in Coinbase Wallet. 

Why does this app work with the fixed drizzle repo, but the first one doesn't? This is the mystery we're trying to solve. 

The way the first app uses Drizzle is based on the code in https://github.com/truffle-box/drizzle-box. The working app uses DrizzleContext, whereas the non-working one uses DrizzleProvider.

If you have ideas about why the first app fails to load Drizzle please let me know. Either open up an issue in this repo or email elliotolds at gmail.
