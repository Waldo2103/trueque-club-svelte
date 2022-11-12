<script>
	import { createEventDispatcher } from 'svelte';
	import { element } from 'svelte/internal';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	const dispatch = createEventDispatcher();

	let value = '';
	let provincias = [
		{ id: '06', name: 'Buenos Aires' },
		{ id: 14, name: 'Córdoba' },
		{ id: 82, name: 'Santa Fe' },
		{ id: '02', name: 'Ciudad Autónoma de Buenos Aires' },
		{ id: 50, name: 'Mendoza' },
		{ id: 6, name: 'Tucumán' },
		{ id: 30, name: 'Entre Ríos' },
		{ id: 66, name: 'Salta' },
		{ id: 54, name: 'Misiones' },
		{ id: 22, name: 'Chaco' },
		{ id: 18, name: 'Corrientes' },
		{ id: 86, name: 'Santiago del Estero' },
		{ id: 70, name: 'San Juan' },
		{ id: 38, name: 'Jujuy' },
		{ id: 62, name: 'Río Negro' },
		{ id: 58, name: 'Neuquén' },
		{ id: 34, name: 'Formosa' },
		{ id: 26, name: 'Chubut' },
		{ id: 74, name: 'San Luis' },
		{ id: 10, name: 'Catamarca' },
		{ id: 46, name: 'La Rioja' },
		{ id: 42, name: 'La Pampa' },
		{ id: 78, name: 'Santa Cruz' },
		{ id: 94, name: 'Tierra del Fuego' }
	];
	let localidades = [];
	let selected1 = '';
	let selected2 = '';

	const handleSubmit = () => {
		dispatch('search', { value, selected1, selected2 });
	};
	const handleChange = (event) => {
		let api = '';
		event.target.value === '02' ? (api = 'localidades') : (api = 'municipios');
		fetch(`https://apis.datos.gob.ar/georef/api/${api}?provincia=${event.target.value}&max=200`)
			.then((response) => response.json())
			.then((apiResponse) => {
				apiResponse.municipios === undefined
					? (localidades = apiResponse.localidades)
					: (localidades = apiResponse.municipios);
			});
	};
</script>

<main>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="field">
			<select
				name="provincia"
				class="select"
				bind:value={selected1}
				on:change={handleChange}
				required
			>
				<option value="" disabled selected>Seleccione una Provincia</option>
				{#each provincias as provincia}
					<option value={provincia.id}>
						{provincia.name}
					</option>
				{/each}
			</select>
		</div>
		<div class="field">
			{#if localidades != []}
				<select name="municipio" class="select" bind:value={selected2}>
					<option value="" disabled selected>Puede seleccione una Localidad</option>
					{#each localidades as localidad}
						<option value={localidad.id}>
							{localidad.nombre}
						</option>
					{/each}
				</select>
			{/if}
		</div>
		<div class="field">
			<input type="text" name="search" class="input" bind:value required />
			<label for="search" class="label">¿Qué buscás?</label>
		</div>
		<button class="btn"><Fa icon={faSearch} />Buscar</button>
	</form>
</main>

<style>
	form {
		--text-color: #1b1818;
		max-width: 500px;
	}

	.field {
		width: 100%;
		position: relative;
		border-bottom: 2px groove;
		margin: 4rem auto 1rem;
	}
	.label {
		color: var(--text-color);
		font-size: 1.2rem;
	}
	.input,
	.select {
		outline: none;
		border: none;
		overflow: hidden;
		margin: 0;
		width: 100%;
		padding: 0.25rem 0;
		background: none;
		color: rgb(31, 27, 27);
		font-size: 1.2rem;
		font-weight: bold;
	}
	.input:valid {
		color: yellowgreen;
	}
	.input:invalid {
		color: orangered;
	}
	/* Border animation*/
	.field::after {
		content: '';
		position: relative;
		display: block;
		height: 2px;
		width: 100%;
		background: #00ff88;
		transform: scaleX(0);
		transform-origin: 0%;
		transition: transform 500ms ease;
		top: 2px;
	}
	.field:focus-within {
		border-color: transparent;
	}
	.field:focus-within::after {
		transform: scaleX(1);
	}
	/* Label animation */
	.label {
		align-self: initial;
		z-index: -1;
		position: absolute;
		transform: translateY(0rem);
		transform-origin: 0%;
		transition: transform 400ms;
	}
	.field:focus-within .label,
	.input:not(:placeholder-shown) + .label {
		transform: scale(0.8) translateY(-2rem);
	}

	.btn {
		width: 100px;
		height: 26px;
		text-align: center;
		line-height: 26px;
		font-size: 14px;
		display: inline-block;
		color: #111;
		background: #00ff88;
		margin: 0 5px;
		transition: 0.5s;
		color: #111;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
