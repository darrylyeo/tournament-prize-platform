import { Utils, Wallet, XRPAmount, XpringClient } from 'xpring-js'

// TestNet URL, use alpha.xrp.xpring.io:50051 for MainNet
const xpringClient = new XpringClient('alpha.test.xrp.xpring.io:50051', true)

const SEED = 'snkBUG96LAVBmK5J3gXanp5XAwv2W'

async function sendXRP(amount, from, to){
	if(!Utils.isValidAddress(to))
		throw new Error('Not a valid address', to)
	if(!Utils.isValidAddress(from))
		throw new Error('Not a valid address:', from)
	
	const transactionHash = await xpringClient.send(BigInt(amount), to, from)

}

sendXRP(
	10,
	Wallet.generateRandomWallet().wallet,
	'X7u4MQVhU2YxS4P9fWzQjnNuDRUkP3GM6kiVjTjcQgUU3Jr'
)


// Wallet.generateWalletFromSeed(SEED),


function generateRandomWallet(){
	return Wallet.generateRandomWallet().wallet
}


export {
	generateRandomWallet
}