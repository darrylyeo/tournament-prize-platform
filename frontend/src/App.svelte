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

<svelte:body on:hashchange={onNavigate}/>

<header>
	<div id="logo">
		<h1><a href="#/"><i>🏆</i> Tourney<b>Earney</b></a></h1>
	</div>
</header>

<main>
	{#if $route === '/'}
		<section transition:fly="{{ y: 200 }}" style="text-align: center">
			<h2>Host a game. Set prize pools. Reward your players, anytime, anywhere.</h2>
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