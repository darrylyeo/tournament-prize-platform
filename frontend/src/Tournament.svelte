<script>
	import { getTournament } from './firestore.js'

	export let tournamentID

	let entryFee = 0
	let registeredPlayers = []
</script>

{#await getTournament(tournamentID)}
<section>
	<h2>Loading...</h2>
</section>
{:then tournament}
<section>
	<h2>{tournament.name}</h2>
	<h3>organized by {tournament.organizer}</h3>

	<button icon="📝" on:click={() => document.scrollTop = document.clientHeight}>Register Now</button>
</section>

<section>
	<h3 icon="💰">Prize Pool</h3>
	<p>{tournament.startingPrizePool} XRP + {tournament.minEntryFee} XRP / player <span class="big-number">{tournament.startingPrizePool + tournament.minEntryFee * registeredPlayers.length} XRP</span></p>
</section>

<section>
	<h3 icon="🎮">Registered Players ({registeredPlayers.length}{#if !tournament.unlimitedPlayers} / {tournament.maxPlayers}{/if})</h3>
	{#each registeredPlayers as player}
		<div>
			{player.name}
		</div>
	{/each}
</section>

<section>
	<h3 icon="🏅">Prizes</h3>
	<label>
		<span>First Prize</span>
		<span>{prizeDistribution.firstPrize} <span class="unit">%</span></span>
	</label>

	<label>
		<span>Runner Up</span>
		<span>{prizeDistribution.secondPrize} <span class="unit">%</span></span>
	</label>

	<label>
		<span>Semi-finalists</span>
		<span>{prizeDistribution.semiFinalists} <span class="unit">%</span> × 2 = <b class="unit">{prizeDistribution.semiFinalists * 2}%</b></span>
	</label>

	<label>
		<span>Quarter-finalists</span>
		<span>{prizeDistribution.quarterFinalists} <span class="unit">%</span> × 4 = <b class="unit">{prizeDistribution.semiFinalists * 4}%</b></span>
	</label>

	<label>
		<span>Tournament Host</span>
		<span>{prizeDistribution.gameHost} <span class="unit">%</span></span>
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

<section>
	<h3 icon="🎮">Game on!</h3>
	<div>
		<input type="submit" value="Publish Tournament" />
		<button on:click={resetForm}>Start Over</button>
	</div>
</section>

<form name="register">
	<section>
		<h3 icon="📝">Register for this Tournament</h3>

		<label>
			<span>Entry Fee (Minimum {tournament.minEntryFee} XRP)</span>
			<span><input type="number" name="entry-fee" placeholder="0.00" bind:value={entryFee} min={tournament.minEntryFee}> <span class="unit">XRP</span></span>
		</label>
	</section>
</form>
{/await}