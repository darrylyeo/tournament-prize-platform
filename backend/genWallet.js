const { Wallet } = require("xpring-js");
const seedWallet = Wallet.generateWalletFromSeed("sszA5q1z5EawEYwg11jmsgERXRgwV");

const remoteURL = "grpc.xpring.tech:80";
const xpringClient = new XpringClient(remoteURL);

async function run(){
const testNetAddress = seedWallet.getAddress();
const balance = await xpringClient.getBalance(testNetAddress);

const amount = BigInt("10");
const recipientAddress = "X7u4MQVhU2YxS4P9fWzQjnNuDRUkP3GM6kiVjTjcQgUU3Jr";
const result = await xpringClient.send(amount, recipientAddress, seedWallet)

}

run();