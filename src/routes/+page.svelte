<script>
	import Buscador from './Buscador.svelte';
	import Listado from './Listado.svelte';

	let busqueda = '';
	function buscar(event) {
		busqueda = event.detail;
	}
</script>

<Buscador on:search={buscar} />
<Listado filtrar={busqueda} />
