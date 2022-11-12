<script>
	import { createEventDispatcher } from 'svelte';
	export let name = '';
	let files;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array: por eso guardo cada archivo en un array y mando. Sino, si lo guardo en un array del otro lado, me hace quilombo al mostrarlo
		let filesArray = [];
		for (let i = 0; i < files.length; i++) {
			filesArray.push(files[i]);
		}
		dispatch('fotos', filesArray);
	}
	const dispatch = createEventDispatcher();
</script>

<div class="custom-input-file col-md-6 col-sm-6 col-xs-6">
	<label for="many">Selecciona las fotos de {name}</label>
	<input bind:files id="many" multiple type="file" class="input-file" />

	<!-- {#if files}
		<h2>Fotos seleccionadas:</h2>
		{#each Array.from(files) as file}
			<p>{file.name} ({file.size} bytes)</p>
		{/each}
	{/if} -->
</div>

<style>
	div {
		min-height: 100px;
		border: 2px solid #ddd;
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		color: #ccc;
	}
	img {
		width: 100%;
	}
	.custom-input-file {
		background-color: #1b945b;
		color: #fff;
		cursor: pointer;
		font-size: 18px;
		font-weight: bold;
		margin: 0;
		min-height: 15px;
		overflow: hidden;
		padding: 10px;
		position: relative;
		text-align: center;
		width: 90%;
	}

	.custom-input-file .input-file {
		border: 10000px solid transparent;
		cursor: pointer;
		font-size: 10000px;
		margin: 0;
		opacity: 0;
		outline: 0 none;
		padding: 0;
		position: absolute;
		right: -1000px;
		top: -1000px;
	}
</style>
