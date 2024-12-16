<script lang="ts">
	import igLogo from '$lib/assets/social/instagram-small.svg';

	const socialLinks = [
		{
			url: 'https://www.instagram.com/skating.id/',
			alt: 'instagram',
			imgSrc: igLogo,
			text: 'Instagram'
		}
	];
</script>

{#each socialLinks as s}
	<a
		class="flex active:scale-95 transition-transform justify-center w-[100px] text-black dark:text-white font-medium py-1 px-2 rounded-full shadow-md leading-6 text-xs mr-2 mb-2 bg-[#ffffff] dark:bg-[#0f151c]"
		target="_blank"
		href={s.url}
		rel="noreferrer"
	>
		<img class="mr-2" alt={s.alt} src={s.imgSrc} width="24" height="24" loading="lazy" />{s.text}
	</a>
{/each}
