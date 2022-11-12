<script>
	import { collection, query, where, getDocs } from 'firebase/firestore';
	import { db } from '../../firebase';
	import { user, userChat } from '../../stores';
	import Chat from '../Chat.svelte';
	import Modal from '../Modal.svelte';
	let mensajes = [];
	let mensajeLimpio = [];
	let mensajesCargados = [];
	$: {
		getMensajes();
	}
	async function getMensajes() {
		const q = query(collection(db, 'mensajes'), where('id', 'array-contains', $user.email));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			//mensajes.push({ ...doc.data(), id: doc.id });
			let photoProfile =
				doc.data().imagen[0] == $user.photoURL ? doc.data().imagen[1] : doc.data().imagen[0];
			let email = doc.data().id[0] == $user.email ? doc.data().id[1] : doc.data().id[0];
			let name =
				doc.data().nombre[0] == $user.displayName ? doc.data().nombre[1] : doc.data().nombre[0];
			let messages = doc.data().messages;
			mensajes.push({
				email,
				photoProfile,
				name,
				messages
			});
		});
		return (mensajeLimpio = mensajes);
	}
	let modal;
	const handleClick = (owner) => {
		$userChat = owner;
		modal.show();
	};
</script>

<body>
	{#await mensajeLimpio}
		<strong>Loading...</strong>
	{:then mensajes}
		{#each mensajes as { photoProfile, messages, name, email }}
			<main class="leaderboard__profiles">
				<article
					class="leaderboard__profile"
					on:click={handleClick({ photoProfile, messages, name, email })}
				>
					<img src={photoProfile} alt="foto de perfil" class="leaderboard__picture" />
					<span class="leaderboard__name">{name}</span>
					<span class="leaderboard__value"
						>{messages[messages.length - 1].owner == $user.email
							? messages[messages.length - 2].content
							: messages[messages.length - 1].content}</span
					>
				</article>
			</main>
		{:else}
			<strong>No hay resultados</strong>
		{/each}
	{:catch error}
		<p>Error!!{error}</p>
	{/await}
	<Modal bind:this={modal}>
		<Chat />
	</Modal>
</body>

<style>
	.leaderboard__profiles {
		background-color: #fff;
		border-radius: 0 0 12px 12px;
		padding: 15px 15px 20px;
		display: grid;
		row-gap: 8px;
	}

	.leaderboard__profile {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		align-items: center;
		padding: 10px 30px 10px 10px;
		overflow: hidden;
		border-radius: 10px;
		box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
		cursor: pointer;
		transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
			box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
		background-color: #fff;
	}
	article:hover {
		transform: scale(1.2);
		box-shadow: 0 9px 47px 11px rgba(51, 51, 51, 0.18);
	}

	.leaderboard__picture {
		max-width: 100%;
		width: 60px;
		border-radius: 50%;
		box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
	}

	.leaderboard__name {
		color: #979cb0;
		font-weight: 600;
		font-size: 20px;
		letter-spacing: 0.64px;
		margin-left: 12px;
	}

	.leaderboard__value {
		color: #35d8ac;
		font-weight: 700;
		font-size: 14px;
		text-align: right;
	}
	span {
		opacity: 0.8;
		font-weight: 600;
		font-size: 13px;
		margin-left: 3px;
	}

	body {
		margin: 0;
		background-color: #eaeaea;
		display: grid;
		height: 100vh;
		width: 100%;
		place-items: center;
		font-family: 'Source Sans Pro', sans-serif;
	}
</style>
