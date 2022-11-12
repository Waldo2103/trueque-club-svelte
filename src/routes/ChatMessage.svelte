<script>
	import { user } from '../stores';

	export let chat = {},
		message = {};
	/* let message = {
		content: 'Hola que tal boca como te va aaaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaa ',
		date: '16 de agosto de 2021, 20:22:17 UTC-3',
		owner: 'test@test.com',
		type: 'text'
	};
	let chat = {
		id: ['test@test.com', 'admin@admin.com'],
		imagen: [
			'https://firebasestorage.googleapis.com/v0/b/el-club-del-trueque-f911a.appspot.com/o/fotoPerfil%2FUsuario-Icono.jpg?alt=media&token=8ff5501d-8467-42f4-80d2-40f70f807f9e',
			'https://firebasestorage.googleapis.com/v0/b/el-club-del-trueque-f911a.appspot.com/o/fotoPerfil%2Fadmin-admin.com.jpg?alt=media&token=9f3ad26a-fefe-4ba9-aa16-05aa1c9f94c0'
		],
		nombre: ['Test', 'Admin1'],
		uid: 'tiYxo4luAlKSVxAzCoSH'
	}; */
	const owner = message.owner === $user.email ? 'user' : 'ownerProd';
	let foto;
	if (message.owner === $user.email && $user.photoURL === chat.imagen[0]) {
		foto = chat.imagen[0];
	} else {
		foto = chat.imagen[1];
	}
	const messageClass = $user.email === message.owner ? 'sent' : 'received';
</script>

<div class="message-container">
	<div class="message">
		<img class={messageClass} src={foto} alt={'foto ' + owner} />
		<div class={`message ${messageClass}`}>
			<span>{message.content}</span>
		</div>
	</div>
</div>

<style>
	/* Inicio ChatMessage Component*/
	.message-container {
		margin-top: 0px;
		position: relative;
		width: 80%;
		height: auto;
		min-height: 80px;
	}
	.message {
		margin-top: 0px;
		position: relative;
		height: auto;
	}
	.message img.received {
		align-self: right;
		margin-left: 100%;
	}
	.message img.received {
		align-self: left;
		margin-right: 100%;
	}
	.message img {
		width: 3rem;
		height: 3rem;
		border-style: solid;
		border-width: 2px;
		border-color: rgb(56, 55, 55);
		margin: 5%;
		border-radius: 5rem;
	}
	.message span {
		margin-left: 20px;
		font-size: small;
		width: 60%;
		display: inline-block;
	}
	.sent {
		position: absolute;
		width: 80%;
		margin-top: 10%;
		margin-right: 20%;
		background-color: #0ce065;
		border-style: solid;
		border-color: rgb(56, 55, 55);
		border-radius: 5rem;
		border-top-left-radius: 0;
	}
	.received {
		position: absolute;
		margin-top: 10%;
		margin-left: 20%;
		width: 80%;
		background-color: #4facfe;
		border-style: solid;
		border-color: #222;
		border-radius: 2rem;
		border-top-right-radius: 0;
	}
	.message.sent {
		left: 15%;
	}
	/* Fin ChatMessage Component*/
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
		width: 75%;
		margin: 10px 5px;
		padding-left: 20px;
	}
	/* Fin Chat Component*/
</style>
