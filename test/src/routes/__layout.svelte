<script lang="ts" context="module">
	import 'carbon-components-svelte/css/white.css';
	import { Content } from 'carbon-components-svelte';
    import channel from '../channel'
    import { onMount } from 'svelte';
    import reducer from '../reducer'
</script>

<script lang="ts">
    onMount(async () => {
        await channel.connect(reducer)
    })
</script>

<Content>
	<slot />
</Content>

<style>
</style>
