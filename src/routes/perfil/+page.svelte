<script>
	import { user, isLoggedIn } from '../../stores';
</script>

<h1>Perfil</h1>
{#if $isLoggedIn}
	<img src={$user.photoURL} alt={$user.displayName} />
	<h3>{$user.displayName}</h3>
	<p>{$user.email}</p>
{/if}
