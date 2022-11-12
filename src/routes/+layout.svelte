<script>
	import menuIcon from '$lib/assets/menu.svg';
	import { page } from '$app/stores';
	import { signOut, onAuthStateChanged } from 'firebase/auth';
	import { auth } from '../firebase';
	import { user, isLoggedIn } from '../stores';

	const logout = () => {
		handleClick();
		try {
			signOut(auth);
			$isLoggedIn = false;
			$user = {};
		} catch (error) {
			console.error(error);
		}
	};

	onAuthStateChanged(auth, (authUser) => {
		$user = authUser;
		$isLoggedIn = !!authUser;
	});

	var close = true;
	const handleClick = () => {
		let check = document.getElementById('check');
		if (check.checked) {
			check.checked = false;
		} else {
			check.checked = true;
		}
	};
</script>

<nav>
	<input type="checkbox" id="check" />
	<label for="check" class="checkbtn">
		<img class="logo" src={menuIcon} alt="menu" />
	</label>
	<a href="/" class="enlace">
		<img
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"
			alt=""
			class="logo"
		/>
	</a>
	<ul class={close ? 'close' : 'open'}>
		<li>
			<a href="/" on:click={handleClick}>Home</a>
		</li>
		{#if $isLoggedIn}
			<li>
				<a href="/perfil" on:click={handleClick}>Perfil</a>
			</li>
			<li>
				<a href="/albumes" on:click={handleClick}>Mis Albumes</a>
			</li>
			<li>
				<a href="/nosotros" on:click={handleClick}>Nosotros</a>
			</li>
			<li>
				<a href="/mensajes" on:click={handleClick}>Mensajes</a>
			</li>
			<li>
				<a href="/" on:click={logout}>Logout</a>
			</li>
		{:else}
			<li>
				<a href="/login">Login</a>
			</li>
		{/if}
	</ul>
</nav>

<slot />

<style>
	* {
		padding: 0;
		margin: 0;
		text-decoration: none;
		list-style: none;
		box-sizing: border-box;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bolder;
	}

	nav {
		background: linear-gradient(45deg, #005e32 0%, #00ff88 100%);
		height: 80px;
		width: 100%;
	}
	.enlace {
		position: absolute;
		padding: 20px 50px;
	}
	.logo {
		height: 40px;
	}
	ul {
		float: right;
		margin-right: 20px;
	}
	li {
		display: inline-block;
		line-height: 80px;
		margin: 0 5px;
	}
	a {
		color: #fff;
		font-size: 18px;
		padding: 7px 13px;
		border-radius: 3px;
		text-transform: uppercase;
	}
	a:active,
	li a:hover {
		background: #005e32;
		transition: 0.5s;
	}
	.checkbtn {
		margin-top: 20px;
		font-size: 30px;
		color: #005e32;
		float: right;
		line-height: 40px;
		margin-right: 40px;
		cursor: pointer;
		display: none;
	}
	#check {
		display: none;
	}

	@media (max-width: 952px) {
		.enlace {
			padding-left: 20px;
		}
		a {
			font-size: 16px;
		}
	}

	@media (max-width: 858px) {
		.checkbtn {
			display: block;
		}
		ul {
			position: fixed;
			width: 100%;
			height: 100vh;
			background: #00924e;
			top: 80px;
			left: -100%;
			text-align: center;
			transition: all 0.5s;
		}
		li {
			display: block;
			margin: 50px 0;
			line-height: 30px;
		}
		a {
			font-size: 20px;
		}
		a:hover,
		.active {
			background: none;
			color: #fff;
		}
		#check:checked ~ ul {
			left: 0;
		}
		.close {
			right: 100% !important;
			z-index: 10000;
		}
		.open {
			z-index: 10000;
		}
	}
</style>
