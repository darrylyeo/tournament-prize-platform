<script>
	const defaultTournamentConfig = {
		name: '',
		startingPrizePool: 0,
		minEntryFree: 0,
		minParticipants: 4,
		maxParticipants: 32,
		distribution: {
			firstPrize: 30,
			secondPrize: 20,
			semiFinalists: 10,
			quarterFinalists: 5,
			gameHost: 0
		}
	}

	const newTournament = {...defaultTournamentConfig}

	Array.prototype.sum = function(){
		let sum = 0
		for(const x of this)
			sum += x
		return sum
	}

	$: totalDistribution = Object.values(newTournament).sum()

	const onTournamentFormSubmit = e => {
		console.log(e, newTournament)
	}

	const resetForm = () => {
		Object.assign(newTournament, defaultTournamentConfig)
	}
</script>

<form on:submit|preventDefault={onTournamentFormSubmit}>
	<section>
		<h2>Start a tournament</h2>
		
		<label>
			<span>Tournament Name</span>
			<input type="text" name="tournament-name" placeholder="SLO Hacks 2020 Super Smash Bros Ultimate Tournament">
		</label>

		<label>
			<span>Starting Prize Pool</span>
			<span><input type="text" name="starting-prize-pool" placeholder="0.00" bind:value={newTournament.startingPrizePool}> <span class="unit">XRP</span></span>
		</label>

		<label>
			<span>Minimum Entry Fee</span>
			<span><input type="number" name="entry-fee" placeholder="0.00" bind:value={newTournament.minEntryFree}> <span class="unit">XRP</span></span>
		</label>

		<label>
			<span>Minimum Number of Participants</span>
			<span><input type="number" name="min-participants" placeholder="4" min="4" bind:value={newTournament.minParticipants}> or more players</span>
		</label>

		<label>
			<span>Maximum Number of Participants</span>
			<span><input type="number" name="max-participants" placeholder="32" bind:value={newTournament.maxParticipants}> or fewer players</span>
		</label>
	</section>

	<section>
		<h2>Prize distribution</h2>
		<form>
			<label>
				<span>First Prize</span>
				<span><input type="number" name="distribution-1st-prize" placeholder="30" bind:value={newTournament.distribution.firstPrize}> <span class="unit">%</span></span>
			</label>

			<label>
				<span>Runner Up</span>
				<span><input type="number" name="distribution-2nd-prize" placeholder="20" bind:value={newTournament.distribution.secondPrize}> <span class="unit">%</span></span>
			</label>

			<label>
				<span>Semi-finalists</span>
				<span><input type="number" name="distribution-semi-finalists" placeholder="10" bind:value={newTournament.distribution.semiFinalists}> <span class="unit">% × 2</span></span>
			</label>

			<label>
				<span>Quarter-finalists</span>
				<span><input type="number" name="distribution-quarter-finalists" placeholder="10" bind:value={newTournament.distribution.quarterFinalists}> <span class="unit">% × 2</span></span>
			</label>

			<label>
				<span>Tournament Host</span>
				<span><input type="number" name="distribution-game-host" placeholder="10" bind:value={newTournament.distribution.gameHost}> <span class="unit">%</span></span>
			</label>

			{#if totalDistribution > 100}
				<p class="error">The distribution adds up to more than 100%.</p>
			{:else if totalDistribution < 100}
				<p>The remaining <b>{100 - totalDistribution}%</b> of the prize pool will be distributed evenly amongst the other players.</p>
			{/if}
		</form>
	</section>
	
	<button on:click={resetForm}>Reset</button>
</form>