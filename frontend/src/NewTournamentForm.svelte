<script>
	import { addTournament } from './firestore.js'
	// import { generateRandomWallet } from './xpring.js'

	export let route

	const defaultTournamentConfig = {
		name: '',
		organizer: '',
		startingPrizePool: 0,
		minEntryFee: 0,
		minPlayers: 4,
		maxPlayers: 32,
		unlimitedPlayers: false,
		distribution: {
			firstPrize: 30,
			secondPrize: 20,
			semiFinalists: 10,
			quarterFinalists: 5,
			gameHost: 0
		}
	}

	const tournament = {...defaultTournamentConfig}
	const prizeDistribution = tournament.distribution

	const XRP_to_USD = 0.229260

	/* Array.prototype.sum = function(){
		let sum = 0
		for(const x of this)
			sum += x
		return sum
	}
	$: totalDistribution = Object.values(tournament).sum() */

	$: totalDistribution = prizeDistribution.firstPrize + prizeDistribution.secondPrize + prizeDistribution.semiFinalists * 2 + prizeDistribution.quarterFinalists * 4 + prizeDistribution.gameHost


	let hasPaid = false
	$: canSubmit = hasPaid

	async function onTournamentFormSubmit(e){
		console.log(e, tournament)

		// Generate a wallet
		// tournament.wallet = generateRandomWallet()

		const document = await addTournament(tournament)
		$route = '/tournament/' + document.id
		console.log(document)
	}

	function resetForm(){
		Object.assign(tournament, defaultTournamentConfig)
	}

	import { fly } from 'svelte/transition'
</script>

<form on:submit|preventDefault={onTournamentFormSubmit}>
	<h2>Start a Tournament</h2>

	<section class="full">
		<label>
			<span>Tournament Name</span>
			<input type="text" name="tournament-name" placeholder="e.g. SLO Hacks 2020 Super Smash Bros Ultimate Tournament" bind:value={tournament.name}>
		</label>

		<label>
			<span>Organizer Name</span>
			<input type="text" name="organizer" placeholder="e.g. Mr. Game & Watch" bind:value={tournament.organizer}>
		</label>
	</section>

	<section>
		<h3 icon="💰">Fund Prize Pool</h3>
		<label>
			<span>Starting Prize Pool</span>
			<span><input type="number" name="starting-prize-pool" placeholder="0.00" min="0" bind:value={tournament.startingPrizePool}> <span class="unit">XRP</span> <small>(${tournament.startingPrizePool * XRP_to_USD})</small></span>
		</label>

		<label>
			<span>Minimum Entry Fee</span>
			<span><input type="number" name="entry-fee" placeholder="0.00" min="0" bind:value={tournament.minEntryFee}> <span class="unit">XRP / player <small>(${tournament.startingPrizePool * XRP_to_USD} / player)</small></span></span>
		</label>

		<label>
			<span>Minimum Number of Players</span>
			<span><input type="number" name="min-players" placeholder="4" min="4" bind:value={tournament.minPlayers}> or more players</span>
		</label>

		<label>
			<span>Maximum Number of Players</span>
			<span><input type="number" name="max-players" placeholder="32" min="4" bind:value={tournament.maxPlayers} disabled={!!tournament.unlimitedPlayers}> or fewer players</span>
			<small><input type="checkbox" bind:value={tournament.unlimitedPlayers}> Allow Unlimited Players</small>
		</label>
	</section>

	<section>
		<h3 icon="🏅">Distribute Prizes</h3>
		<label>
			<span>First Prize</span>
			<span><input type="number" name="distribution-1st-prize" placeholder="30" min="0" max="100" bind:value={prizeDistribution.firstPrize}> <span class="unit">%</span></span>
		</label>

		<label>
			<span>Runner Up</span>
			<span><input type="number" name="distribution-2nd-prize" placeholder="20" min="0" max="100" bind:value={prizeDistribution.secondPrize}> <span class="unit">%</span></span>
		</label>

		<label>
			<span>Semi-finalists</span>
			<span><input type="number" name="distribution-semi-finalists" placeholder="10" min="0" max="100" bind:value={prizeDistribution.semiFinalists}> <span class="unit">%</span> × 2 = <b class="unit">{prizeDistribution.semiFinalists * 2}%</b></span>
		</label>

		<label>
			<span>Quarter-finalists</span>
			<span><input type="number" name="distribution-quarter-finalists" placeholder="10" min="0" max="100" bind:value={prizeDistribution.quarterFinalists}> <span class="unit">%</span> × 4 = <b class="unit">{prizeDistribution.semiFinalists * 4}%</b></span>
		</label>

		<label>
			<span>Tournament Host</span>
			<span><input type="number" name="distribution-game-host" placeholder="0" min="0" max="100" bind:value={prizeDistribution.gameHost}> <span class="unit">%</span></span>
		</label>

		<p class="full">
			You've assigned
			<b>{totalDistribution}%</b>
			of the prize pool to the top players{#if prizeDistribution.gameHost > 0} and tournament host{/if}.
			{#if totalDistribution > 100}
				<span class="error">Please adjust the distribution to sum to 100% or less.</span>
			{:else if totalDistribution < 100}
				The remaining <b>{100 - totalDistribution}%</b> of the prize pool will be distributed evenly amongst the other players ({((100 - totalDistribution) / tournament.maxPlayers).toFixed(2)} – {((100 - totalDistribution) / tournament.minPlayers).toFixed(2)}% each).
			{/if}
		</p>
	</section>
	
	{#if tournament.startingPrizePool > 0}
	<section transition:fly={{y: 300}}>
		<h3 icon="💵">Supply the starting pool</h3>

		<p>Please send <b>{tournament.startingPrizePool} XRP (${tournament.startingPrizePool * XRP_to_USD})</b> to the following wallet address:</p>

		<p><small>TV91U2jibTYC9EFrF5GMdqAsJ38WBY5aWeFSrWF17axoAtN</small></p>

		<button>Pay via Xpring</button>

		<button>Pay via carbon.money</button>

		<button>Check for payment</button>
	</section>
	{/if}
	
	<section>
		<h3 icon="🎮">Game on!</h3>
		<div>
			<input type="submit" value={hasPaid ? 'Publish Tournament' : 'Please supply the starting pool'} disabled={!canSubmit} />
			<button on:click|preventDefault={resetForm}>Start Over</button>
		</div>
	</section>
</form>