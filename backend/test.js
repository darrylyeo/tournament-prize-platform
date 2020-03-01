const { XpringClient } = require("xpring-js");

const remoteURL = "alpha.test.xrp.xpring.io:50051"; // TestNet URL, use alpha.xrp.xpring.io:50051 for MainNet
const xpringClient = new XpringClient(remoteURL, true);

const address = "X7u4MQVhU2YxS4P9fWzQjnNuDRUkP3GM6kiVjTjcQgUU3Jr";

const balance = await xpringClient.getBalance(address);
console.log(balance); // Logs a balance in drops of XRP