<script>
	import NewTournamentForm from './NewTournamentForm.svelte'
	import Tournament from './Tournament.svelte'

	import { writable } from 'svelte/store'
	
	const route = writable('/')
	$: console.log('Route:', $route)

	const navigateTo = route =>
		() => $route = route
	
	const onNavigate = e => {
		/*if(e.target.nodeName.toLowerCase() === 'a'){
			e.preventDefault()
			$route = a.href.path
		}*/
		$route = location.hash.replace(/^#/, '') || '/'
		console.log('Navigated to', $route)
	}
	onNavigate()

	document.body.onhashchange = onNavigate

	import { fly } from 'svelte/transition'
</script>

<svelte:body on:hashchange={onNavigate} />

<header class:home={$route === '/'}>
	<a href="#/">
		<div id="logo">
			<h1 icon="🏆"><!--<i>🏆</i> -->Tourney<b>Earney</b></h1>
		</div>
		<div>
			Dead simple tournament prize distribution
		</div>
	</a>
</header>

<main>
	{#if $route === '/'}
		<section transition:fly="{{ y: 200 }}" style="text-align: center">
			<h3>Host a game. Set prize pools. Reward your players, anytime, anywhere.</h3>
			<a href="#/tournament-setup"><button>Get started</button></a>
		</section>
	{:else if $route === '/tournament-setup'}
		<NewTournamentForm {route} />
	{:else if $route.startsWith('/tournament')}
		<Tournament tournamentID={$route.split('/').pop()} />
	{:else}
		{$route = "/", 'Loading'}
	{/if}
</main>

<style>

</style>