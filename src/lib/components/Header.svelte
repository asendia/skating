<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	export let title: string;
</script>

<div class="absolute right-4 top-2 z-10">
	<ThemeSwitcher />
</div>

<svelte:head>
	<link rel="preload" as="image" href={logo} />
</svelte:head>

<h1 class="text-center font-light text-5xl text-brand relative pt-11">
	<a href="/">
		<span class="relative uppercase z-10">{title}</span>
		<img
			class="absolute top-[9px] bg-[#ffffff] dark:bg-[#06080f] left-[calc(50%-50px)]"
			alt="skating.id logo"
			src={logo}
			width="84"
			height="46"
			loading="lazy"
		/>
	</a>
</h1>
<p class="text-center font-light mt-1 mb-3 px-7 text-xs text-brand">
	<slot name="description" />
</p>
