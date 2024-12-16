import { error, type Load } from '@sveltejs/kit';
import productItems, { type Product } from '$lib/productItems';
import { urlHashFromName } from '$lib/url';

export const load: Load = async ({ params }) => {
	let product: Product | undefined = undefined;
	for (const cat of productItems) {
		for (const f of cat.items) {
			const fName = urlHashFromName(f.brand + '-' + f.name);
			if (fName === params.slug) {
				product = f;
				break;
			}
		}
		if (product !== undefined) break;
	}
	if (product === undefined) {
		throw error(404, `Food ${params.slug} not found`);
	}
	return {
		product
	};
};
