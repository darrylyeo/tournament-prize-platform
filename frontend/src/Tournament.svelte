<script>
	import { getTournament } from './firestore.js'

	export let tournamentID

	let tournament
	$: if(tournamentID){
		getTournament(tournamentID).then(_ => tournament = _)
	}

	
	$: prizeDistribution = tournament ? tournament.distribution : {}
	$: totalDistribution = prizeDistribution
		? prizeDistribution.firstPrize + prizeDistribution.secondPrize + prizeDistribution.semiFinalists * 2 + prizeDistribution.quarterFinalists * 4 + prizeDistribution.gameHost
		: undefined

	let entryFee = 0
	let registeredPlayers = []

	import { fly } from 'svelte/transition'
</script>

{#if !tournament}
<section transition:fly="{{ y: 200 }}">
	<h2>Loading...</h2>
</section>
{:else}
<section transition:fly="{{ y: 200 }}">
	<h2>{tournament.name}</h2>
	<h3>organized by {tournament.organizer}</h3>

	<button icon="📝" on:click={() => document.scrollTop = document.clientHeight}>Register Now</button>
</section>

<section transition:fly="{{ y: 200 }}">
	<h3 icon="💰">Prize Pool</h3>
	<p>{tournament.startingPrizePool} XRP + {tournament.minEntryFee} XRP / player <span class="big-number">{tournament.startingPrizePool + tournament.minEntryFee * registeredPlayers.length} XRP</span></p>
</section>

<section transition:fly="{{ y: 200 }}">
	<h3 icon="🎮">Registered Players ({registeredPlayers.length}{#if !tournament.unlimitedPlayers} / {tournament.maxPlayers}{/if})</h3>
	{#each registeredPlayers as player}
		<div>
			{player.name}
		</div>
	{/each}
</section>

{#if prizeDistribution}
<section transition:fly="{{ y: 200 }}">
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

	<label>
		<span>Other Players</span>
		<span>{((100 - totalDistribution) / registeredPlayers.length).toFixed(2)} <span class="unit">% each</span></span>
	</label>
</section>
{/if}

<form name="register">
	<section>
		<h3 icon="📝">Register for this Tournament</h3>

		<label>
			<span>Entry Fee (Minimum {tournament.minEntryFee} XRP)</span>
			<span><input type="number" name="entry-fee" placeholder="0.00" bind:value={entryFee} min={tournament.minEntryFee}> <span class="unit">XRP</span></span>
		</label>
	</section>

	<section>
		<button type="submit">Enter Tournament</button>
	</section>
</form>
{/if}