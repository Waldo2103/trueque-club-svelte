<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import { tagsList } from '../stores';
	import MultiSelect from '../components/MultiSelect.svelte';

	const dispatch = createEventDispatcher();
	//const storage = Storage;
	export let foto, index;
	export let altaAlbum = false;
	let image;
	let container;
	let name,
		description,
		tags,
		deleted = 0;
	let isVisible = 'show';
	const removeTroque = () => {
		dispatch('newProd', { index, foto, name, description, tags, deleted: 1 });
		isVisible = 'hide';
		//dispatch('deleteProd', index);
	};
	/* $: {
		dispatch('newProd', { index, foto, name, description, tags });
	} */
	$: {
		const reader = new FileReader();
		reader.addEventListener('load', function () {
			image.setAttribute('src', reader.result);
		});
		reader.readAsDataURL(foto);
	}
	// No se usa en alta de album
	const addProduct = () => {
		console.log('alta de product no por album');
	};
	function mandar() {
		/* let fileName = $user.email.replace('@', '_');
		fileName = fileName + new Date().getTime();
		let extension = foto.name.split('.');
		extension = extension[1];
		uploadFile(foto, 'productos', fileName, extension); */
		dispatch('newProd', { index, foto, name, description, tags, deleted });
	}
</script>

<form on:submit|preventDefault={addProduct}>
	<div class={`formbg-outer ${isVisible}`}>
		<div class="formbg">
			<div class="formbg-inner padding-horizontal--48">
				<div formArrayName="troques">
					<span>
						<div bind:this={container}>
							<img bind:this={image} src="" alt="Preview" />
						</div>
						<br />
					</span>
					<div class="form-group">
						<div class="field padding-bottom--24">
							<input
								type="text"
								placeholder="Nombre Artículo"
								on:change={mandar}
								bind:value={name}
							/>
						</div>
						<div class="field padding-bottom--24">
							<input
								focus
								type="text"
								name="descripcion"
								placeholder="Descripción"
								on:change={mandar}
								bind:value={description}
							/>
						</div>
						<div class="field padding-bottom--24">
							<MultiSelect name="tags" id="tags" bind:value={tags} on:change={mandar}>
								{#each $tagsList as tag}
									<option value={tag.id}>{tag.name}</option>
								{/each}
							</MultiSelect>
						</div>
					</div>
					<button type="button" on:click={removeTroque}>
						<Fa icon={faTrash} color="red" />
					</button>
				</div>
				{#if !altaAlbum}
					<div class="field">
						<button type="submit"><Fa icon={faAdd} />Agregar producto</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</form>

<style>
	* {
		padding: 0;
		margin: 0;
		color: #1a1f36;
		box-sizing: border-box;
		word-wrap: break-word;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Ubuntu,
			sans-serif;
	}
	img {
		width: 100%;
	}
	.hide {
		display: none;
	}
	.show {
		display: block;
	}
	.formbg-outer {
		margin: 15% 0;
	}
	.box-divider--light-all-2 {
		box-shadow: inset 0 0 0 2px #e3e8ee;
	}
	.box-background--blue {
		background-color: #54d474;
	}
	.box-background--blue800 {
		background-color: #21633a;
	}
	.box-background--gray100 {
		background-color: #e3e8ee;
	}
	.box-background--cyan200 {
		background-color: #7feda4;
	}
	.padding-top--64 {
		padding-top: 64px;
	}
	.padding-top--24 {
		padding-top: 24px;
	}
	.padding-top--48 {
		padding-top: 48px;
	}
	.padding-bottom--24 {
		padding-bottom: 24px;
	}
	.padding-horizontal--48 {
		padding: 48px;
	}

	.formbg {
		margin: 0px auto;
		width: 100%;
		max-width: 448px;
		background: white;
		border-radius: 4px;
		box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
	}
	span {
		display: block;
		font-size: 20px;
		line-height: 28px;
		color: #1a3622;
	}
	.field input,
	.field textarea,
	.field button {
		font-size: 16px;
		line-height: 28px;
		padding: 8px 16px;
		width: 100%;
		min-height: 44px;
		border: unset;
		border-radius: 4px;
		outline-color: rgba(84, 212, 137, 0.5);
		background-color: rgb(255, 255, 255);
		box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px;
	}
	.field button {
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
</style>
