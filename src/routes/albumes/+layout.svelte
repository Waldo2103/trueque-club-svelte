<script>
	/** @type {import('./$types').LayoutData} */
	export let data;
	import { user } from '../../stores';

	export let ownerAlbums = $user.email;
</script>

<body>
	<div class="submenu">
		{#each data.sections as section}
			{#if ownerAlbums === $user.email}
				<a href="/albumes/{section.slug}">{section.title}</a>
			{/if}
		{/each}
	</div>
</body>

<slot />

<style>
	a {
		background-color: rgb(0, 255, 115);
		box-shadow: 0 5px 0 rgb(0, 139, 46);
		color: white;
		padding: 1em 1.5em;
		position: relative;
		text-decoration: none;
		text-transform: uppercase;
	}

	a:hover {
		background-color: #06ce53;
	}

	a:active {
		box-shadow: none;
		top: 5px;
	}

	/* Non-Demo Styles */
	body {
		margin-top: 5%;
		display: flex;
		justify-content: right;
		align-items: right;
	}
</style>
