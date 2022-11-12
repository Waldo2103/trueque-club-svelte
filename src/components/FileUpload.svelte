<script>
	import { createEventDispatcher } from 'svelte';
	export let name = '';
	let input;
	let container;
	let image;
	let placeholder;
	let showImage = false;

	const dispatch = createEventDispatcher();

	function onChange() {
		const file = input.files[0];

		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);

			dispatch('fotoPortada', reader);
			return;
		}
		showImage = false;
	}
</script>

<div class="custom-input-file col-md-6 col-sm-6 col-xs-6">
	<input
		bind:this={input}
		on:change={onChange}
		type="file"
		id="fichero-tarifas"
		class="input-file"
		accept="image/*"
	/>
	Subir imagen de {name}...
</div>
<div bind:this={container}>
	{#if showImage}
		<img bind:this={image} src="" alt="Preview" />
	{:else}
		<span bind:this={placeholder}>Vista Previa {name}</span>
	{/if}
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
