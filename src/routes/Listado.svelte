<script>
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import { onDestroy } from 'svelte';
	import { db } from '../firebase';
	import Producto from './Producto.svelte';
	export let filtrar = '';
	let productsFilt = [];
	let products = [];
	$: if (filtrar !== '') {
		productsFilt = [];
		products = [];
		getProducts();
	}
	async function getProducts() {
		let q;
		if (filtrar.selected2 === '') {
			q = query(
				collection(db, 'productos'),
				where('provincia', '==', filtrar.selected1),
				where('etiquetas', 'array-contains', filtrar.value)
			);
		} else {
			q = query(
				collection(db, 'productos'),
				where('provincia', '==', filtrar.selected1),
				where('municipio', '==', filtrar.selected2),
				where('etiquetas', 'array-contains', filtrar.value)
			);
		}
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			products.push({ ...doc.data(), id: doc.id });
		});
		return (productsFilt = products);
	}
	/* const unsub = onSnapshot(
		collection(db, 'productos'),
		(res) => {
			products = res.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
		},
		(err) => {
			console.log(err);
		}
	);
	onDestroy(unsub);  */
</script>

{#await productsFilt}
	<strong>Loading...</strong>
{:then products}
	{#each products as { id, nombre, imagen, zona, owner, etiquetas, descripcion }}
		<Producto {id} {nombre} {imagen} {zona} {owner} {etiquetas} {descripcion} />
	{:else}
		<strong>No hay resultados</strong>
	{/each}
{:catch error}
	<p>Error!!</p>
{/await}
