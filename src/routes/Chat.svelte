<script>
	import ChatMessage from './ChatMessage.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import { user, userChat } from '../stores';

	import {
		collection,
		query,
		where,
		getDocs,
		updateDoc,
		doc,
		arrayUnion,
		addDoc
	} from 'firebase/firestore';
	import { db } from '../firebase';

	let ownerProd = $userChat;
	let formValue = '';
	let chat = { messages: [] };
	let messageToSend = '';
	let altaChat = false;
	$: {
		getChat();
	}

	async function getChat() {
		const q = query(
			collection(db, 'mensajes'),
			where('id', 'in', [[ownerProd.email, $user.email]])
		);
		const querySnapshot = await getDocs(q).then(async (res) => {
			if (res.docs.length === 0) {
				const q = query(
					collection(db, 'mensajes'),
					where('id', 'in', [[$user.email, ownerProd.email]])
				);
				const querySnapshot = await getDocs(q).then(async (res2) => {
					if (res2.docs.length === 0) {
						altaChat = true;
						chat = {
							id: [$user.email, ownerProd.email],
							imagen: [$user.photoURL, ownerProd.photoProfile],
							nombre: [$user.displayName, ownerProd.name],
							messages: [
								{
									content: 'Hola, este articulo está activo! Espero tu consulta',
									date: new Date(),
									owner: ownerProd.email,
									type: 'text'
								}
							]
						};
					} else {
						res2.forEach((doc) => {
							chat = { ...doc.data(), uid: doc.id };
							return chat;
						});
					}
				});
			} else {
				res.forEach((doc) => {
					chat = { ...doc.data(), uid: doc.id };
					return chat;
				});
			}
		});
	}

	const sendMessage = async (e) => {
		e.preventDefault();
		//*aaaaaaaaaaaaaaaaaaa**/
		if (altaChat) {
			let message = {
				content: messageToSend,
				owner: $user.email,
				type: 'text',
				read: false,
				date: new Date()
			};
			let dataChat = {
				id: [$user.email, ownerProd.email],
				imagen: [$user.photoURL, ownerProd.photoProfile],
				nombre: [$user.displayName, ownerProd.name],
				messages: arrayUnion(message)
			};
			await addDoc(collection(db, 'mensajes'), dataChat);
		} else {
			/**bbbbbbbbbbbbbbb*/
			const data = {
				content: messageToSend,
				owner: $user.email,
				type: 'text',
				read: false,
				date: new Date()
			};

			const messageRef = doc(db, 'mensajes', chat.uid);
			await updateDoc(messageRef, {
				uid: chat.uid,
				messages: arrayUnion(data)
			});
		}
		messageToSend = '';
	};
</script>

<div class="chat">
	<main class="chat-messages">
		{#await chat.messages !== {}}
			<strong>Loading</strong>
		{:then}
			{#each chat.messages as message}
				<ChatMessage {chat} {message} />
			{/each}
		{/await}
		<span />
	</main>
	<form onSubmit={sendMessage}>
		<div class="chat-message-to-send">
			<input bind:value={messageToSend} placeholder="Escribe algo..." />

			<button class="button" type="submit" disabled={!messageToSend} on:click={sendMessage}>
				<Fa icon={faPaperPlane} />
			</button>
		</div>
	</form>
</div>

<style>
	/* Inicio Chat Component*/
	.chat-messages {
		overflow-x: hidden;
		overflow-y: auto;
		height: 300px;
	}
	.chat-messages::-webkit-scrollbar {
		-webkit-appearance: none;
	}

	.chat-messages::-webkit-scrollbar:vertical {
		width: 10px;
	}

	.chat-messages::-webkit-scrollbar-button:increment,
	.chat-messages::-webkit-scrollbar-button {
		display: none;
	}

	.chat-messages::-webkit-scrollbar:horizontal {
		height: 10px;
	}

	.chat-messages::-webkit-scrollbar-thumb {
		background-color: #797979;
		border-radius: 20px;
		border: 2px solid #f1f2f3;
	}

	.chat-messages::-webkit-scrollbar-track {
		border-radius: 10px;
	}
	.chat-message-to-send {
		margin-top: 25px;
		position: relative;
		bottom: 0;
	}
	.chat-message-to-send button {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		position: absolute;
		right: 5px;
		bottom: 5px;
		margin: 0;
	}
	.chat-message-to-send input {
		height: 30px;
		width: 80%;
		margin: 10px 5px;
		padding-left: 20px;
	}
	/* Fin Chat Component*/
	/* Inicio ChatRow Component*/
	.chat-row {
		width: 300px;
		position: static;
		font-size: medium;
		color: #239c3d;
	}
	.chat-row img {
		border-radius: 5rem;
		width: 50px;
		height: 50px;
		margin-bottom: -2rem;
		margin-right: 1rem;
	}
	.chat-subtitle {
		font-size: small;
		color: #44754e;
		margin-left: 6rem;
	}
	/* Fin ChatRow Component*/
	.button {
		outline: none;
		border: none;
		cursor: pointer;
		width: 100%;
		height: 50px;
		font-size: 20px;
		font-weight: 700;
		color: #fff;
		background: #11da54;
		border-radius: 25px;
		box-shadow: 5px 5px 10px #d0d3d6, -5px -5px 10px #ffffff;
		margin-bottom: 10px;
		transition: 0.5s;
	}
	.button:hover {
		background: #33f785;
	}
	.button:active {
		background: #239c3d;
	}
</style>
