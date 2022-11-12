<script>
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import { db } from '../../firebase';
	import Album from '../Album.svelte';
	import { user } from '../../stores';

	export let ownerAlbums = $user.email;
	let albumesFilt = [];
	let albumes = [];
	$: {
		getAlbums();
	}
	async function getAlbums() {
		const q = query(collection(db, 'albumes'), where('owner', '==', ownerAlbums));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc);
			albumes.push({ ...doc.data() });
		});
		return (albumesFilt = albumes);
	}
</script>

{#await albumesFilt}
	<strong>Loading...</strong>
{:then albumes}
	{#each albumes as { id, nombre, imagen, zona, owner, etiquetas, descripcion }}
		<Album {id} {nombre} {imagen} {descripcion} {owner} />
	{:else}
		<strong>No hay resultados</strong>
	{/each}
{:catch error}
	<p>Error!!</p>
{/await}
