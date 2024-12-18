<script lang="ts">
	import { PUBLIC_PROTO_DOMAIN } from '$env/static/public';
	import ogImage from '$lib/assets/og-image.jpg';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Social from '$lib/components/Social.svelte';
	import productItems from '$lib/productItems';
	import { urlHashFromName } from '$lib/url';
	export const ogImageFullUrl = PUBLIC_PROTO_DOMAIN + ogImage;

	const title = 'Skating ID';
	const description =
		'Welcome to Skating ID, your ultimate destination for ice skating enthusiasts! Discover the best ice skating rinks, events, training programs, and a wide range of ice skating shoes, blades, and accessories across Indonesia.';

	let showFullDescription: Record<string, boolean> = {};

	function truncateDescription(description: string) {
		if (description.length > 120) {
			return description.slice(0, 120) + '...';
		}
		return description;
	}

	function toggleDescription(index: string) {
		showFullDescription = { ...showFullDescription, [index]: !showFullDescription[index] };
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="food" />
	<meta property="og:url" content={PUBLIC_PROTO_DOMAIN} />
	<meta property="og:image" content={ogImageFullUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@skating.id" />
	<meta name="twitter:creator" content="@skating.id" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageFullUrl} />
	<link rel="canonical" href={PUBLIC_PROTO_DOMAIN} />
	{#each productItems as cat, catID}
		{#each cat.items as item, id}
			{#if catID === 0 && item.thumbnailHref && id < 2}
				<link
					rel="preload"
					as="image"
					href={item.thumbnailHref}
					imagesrcset={`${item.thumbnailHref}, ${item.photoHref} 2x`}
				/>
			{/if}
		{/each}
	{/each}
</svelte:head>

<Header {title}>
	<span slot="description">
		{#each description.split('. ') as d}
			{d}<br />
		{/each}
	</span>
</Header>

<div class="flex flex-wrap px-5 w-[370px] lg:w-[580px] mx-auto justify-center">
	<Social />
</div>

<div class="w-full mx-auto sm:w-[640px] lg:w-[960px] 2xl:w-[1280px]">
	{#each productItems as cat}
		<h2 class="text-center md:text-left text-2xl font-medium mt-3 mb-6">
			{cat.name}
		</h2>
		<ul class="mb-7 flex flex-wrap md:justify-between px-2 md:px-0">
			{#each cat.items as item}
				<li
					class="list-none pb-3 mb-5 flex flex-col w-[50%] px-2 md:mx-0 md:w-[300px] overflow-hidden box-border"
				>
					<a
						class="flex active:scale-95 transition-transform aspect-square relative dark:bg-white rounded-md border"
						href="/product/{urlHashFromName(item.brand + '-' + item.name)}"
					>
						<img
							title={item.name}
							alt={item.name}
							srcset={`${item.thumbnailHref}, ${item.photoHref} 2x`}
							src={item.thumbnailHref}
							width="1000"
							height="1000"
							loading="lazy"
							class="w-full h-full object-contain absolute top-0 left-0"
						/>
					</a>
					<div class="flex flex-col justify-end">
						<a
							href="/product/{urlHashFromName(item.brand + '-' + item.name)}"
							class="flex mt-2 outline-none text-brand underline"
						>
							{item.brand}
							{item.name}
						</a>
						<ul class="flex mt-3 text-xs text-black dark:text-[#d5d6d7]">
							{#each item.info as info}
								<li class="mr-4 flex items-center">{info}</li>
							{/each}
						</ul>
						{#if item.description}
							<div class="py-2 text-[#95979a] text-xs">
								{#if showFullDescription[item.brand + '-' + item.name]}
									{item.description}
									<button
										on:click={() => toggleDescription(item.brand + '-' + item.name)}
										class="text-brand">(less)</button
									>
								{:else}
									{truncateDescription(item.description)}
									{#if item.description.length > 120}
										<button
											on:click={() => toggleDescription(item.brand + '-' + item.name)}
											class="text-brand">(more)</button
										>
									{/if}
								{/if}
							</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/each}
</div>

<Footer />
