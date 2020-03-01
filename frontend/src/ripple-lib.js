// import { RippleAPI } from 'ripple-lib'
const { RippleAPI } = require('ripple-lib')

const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233' // Public rippled server
})
api.connect()

// Continuing after connecting to the API
async function doPrepare() {
  const sender = "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
  const preparedTx = await api.prepareTransaction({
    "TransactionType": "Payment",
    "Account": sender,
    "Amount": api.xrpToDrops("22"), // Same as "Amount": "22000000"
    "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
  }, {
    // Expire this transaction if it doesn't execute within ~5 minutes:
    "maxLedgerVersionOffset": 75
  })
  const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
  console.log("Prepared transaction instructions:", preparedTx.txJSON)
  console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
  console.log("Transaction expires after ledger:", maxLedgerVersion)


	api.on('ledger', ledger => {
		console.log("Ledger version", ledger.ledgerVersion, "was just validated.")
		if (ledger.ledgerVersion > maxLedgerVersion) {
			console.log("If the transaction hasn't succeeded by now, it's expired")
		}
	})
	
  return preparedTx.txJSON
}


doPrepare().then(txJSON => {
	// Continuing from the previous step...
	const response = api.sign(txJSON, "s████████████████████████████")
	const txID = response.id
	console.log("Identifying hash:", txID)
	const txBlob = response.signedTransaction
	console.log("Signed blob:", txBlob)
	return txBlob
})

// doSubmit
.then(async txBlob => {
  const latestLedgerVersion = await api.getLedgerVersion()

  const result = await api.submit(txBlob)

  console.log("Tentative result code:", result.resultCode)
  console.log("Tentative result message:", result.resultMessage)

  // Return the earliest ledger index this transaction could appear in
  // as a result of this submission, which is the first one after the
  // validated ledger at time of submission.
  return latestLedgerVersion + 1
})
.then(async earliestLedgerVersion => {
	console.log(earliestLedgerVersion)

	// Continues from previous examples.
	// earliestLedgerVersion was noted when the transaction was submitted.
	// txID was noted when the transaction was signed.
	try {
		tx = await api.getTransaction(txID, {minLedgerVersion: earliestLedgerVersion})
		console.log("Transaction result:", tx.outcome.result)
		console.log("Balance changes:", JSON.stringify(tx.outcome.balanceChanges))
	} catch(error) {
		console.log("Couldn't get transaction outcome:", error)
	}
})