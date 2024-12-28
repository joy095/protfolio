<script>
	import { fly } from 'svelte/transition';
</script>

<div class="container">Contact us</div>

<div transition:fly={{ duration: 800, y: 50 }}>
	<h1>Hello</h1>
</div>
