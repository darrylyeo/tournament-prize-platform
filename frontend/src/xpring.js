const { Wallet, XRPAmount, XpringClient } = require('xpring-js')

// TestNet URL, use alpha.xrp.xpring.io:50051 for MainNet
const xpringClient = new XpringClient('alpha.test.xrp.xpring.io:50051', true)

const SEED = 'snkBUG96LAVBmK5J3gXanp5XAwv2W'

async function sendXRP(amount, from, to){
	const transactionHash = await xpringClient.send(BigInt(amount), to, from)

}

sendXRP(
	10,
	Wallet.generateWalletFromSeed(SEED),
	Wallet.generateRandomWallet().wallet
)
