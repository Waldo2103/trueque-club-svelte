<script>
	import { auth, db } from '../../firebase';
	import { setDoc, doc } from 'firebase/firestore';
	import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
	import { user, isLoggedIn } from '../../stores';
	import { goto } from '$app/navigation';

	const loginG = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const resp = await signInWithPopup(auth, provider);
			$user = resp.user;
			$isLoggedIn = true;
			createUser();
			goto('/');
		} catch (error) {
			console.error(error);
		}
	};
	const createUser = async () => {
		const name = $user.displayName.split(' ');
		const firstname = name[0];
		const lastname = name[1];
		await setDoc(doc(db, 'usuarios', $user.email), {
			email: $user.email,
			firstname,
			lastname,
			uidAuth: $user.uid
		});
	};
</script>

<h1>Login</h1>

<button on:click={loginG}>Ingresar con Google</button>
