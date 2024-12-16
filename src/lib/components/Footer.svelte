<script lang="ts">
	import { onMount } from 'svelte';

	let isFooterVisible = false;

	onMount(() => {
		let lastYPos = window.scrollY;
		function handleScroll() {
			const yPos = window.scrollY;
			console.log(document.body.offsetHeight - yPos - window.innerHeight);
			if (yPos < lastYPos && document.body.offsetHeight - yPos - window.innerHeight > 60) {
				isFooterVisible = false;
			} else {
				isFooterVisible = true;
			}
			lastYPos = yPos;
		}
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div
	class={`${
		isFooterVisible ? 'translate-y-0' : 'translate-y-14'
	} sticky bottom-0 text-center font-light mt-2 pt-2 pb-6 transition-transform bg-opacity-80 dark:bg-opacity-80 dark:bg-black bg-white`}
>
	2024 - skating.id
</div>
