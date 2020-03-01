<script>
	import NewTournamentForm from './NewTournamentForm.svelte'
	import Tournament from './Tournament.svelte'
	
	const state = {
		route: '/'
	}

	const navigateTo = route =>
		() => state.route = route
	
	const onNavigate = e => {
		/*if(e.target.nodeName.toLowerCase() === 'a'){
			e.preventDefault()
			state.route = a.href.path
		}*/
		state.route = location.hash.replace(/^#/, '') || '/'
		console.log('Navigated to', state.route)
	}
	onNavigate()

	document.body.onhashchange = onNavigate
</script>

<svelte:body on:hashchange={onNavigate}/>

<header>
	<div id="logo">
		<h1><a href="#/"><i>🏆</i> Tourney<b>Earney</b></a></h1>
	</div>
</header>

<main>
	{#if state.route === '/'}
		<section>
			<h2>Host a game. Set prize pools. Reward your players, anytime, anywhere.</h2>
			<a href="#/tournament-setup"><button>Get started</button></a>
		</section>
	{:else if state.route === '/tournament-setup'}
		<NewTournamentForm />
	{:else if state.route.startsWith('/tournament')}
		<Tournament id={state.route} />
	{:else}
		{state.route = "/", 'Loading'}
	{/if}
</main>

<style>

</style>