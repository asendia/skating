export interface ProductCategory {
	name: string;
	items: Array<Product>;
}
export interface Product {
	name: string;
	brand?: string;
	price?: number;
	sizes?: Array<string>;
	thumbnailHref?: string;
	photoHref?: string;
	info: Array<string>;
	description?: string;
}

import productItemsJSON from '$lib/data/product.json';
import productThumbnailPhotoMap from './productThumbnailPhotoMap';
import productDetailPhotoMap from './productDetailPhotoMap';
import { urlHashFromName } from './url';

const productItems: Array<ProductCategory> = productItemsJSON;

// Attach images to productItems
for (const productCategory of productItems) {
	for (const product of productCategory.items) {
		const key = urlHashFromName(
			product.brand + '-' + product.name
		) as keyof typeof productThumbnailPhotoMap;
		if (productThumbnailPhotoMap[key]) {
			product.thumbnailHref = productThumbnailPhotoMap[key];
		}
		if (productDetailPhotoMap[key]) {
			product.photoHref = productDetailPhotoMap[key];
		}
	}
}

export default productItems;
