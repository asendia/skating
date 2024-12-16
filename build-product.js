import { execSync } from 'child_process';
import csv from 'csv-parser';
import { createReadStream, writeFile } from 'fs';

let products = [];

const numFmt = new Intl.NumberFormat('en-US', {
	currency: 'IDR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

createReadStream('./src/lib/data/product.csv')
	.pipe(csv())
	.on('data', (row) => {
		if (row.Name && !row.Brand && !row.Sizes && !row.Description && !row.Price) {
			products.push({
				name: row.Name.trim(),
				items: [],
				itemIdsWithImages: []
			});
		} else if (row.Name && row.Brand && row.Sizes && row.Description && row.Price) {
			const item = {
				name: row.Name.trim(),
				brand: row.Brand.trim(),
				sizes: row.Sizes.trim().split(' ').map((size) => size.trim()),
				info: [
					`IDR ${numFmt.format(Number(row.Price))}`
				],
				description: row.Description
			};
			const lastCategory = products[products.length - 1];
			console.log(lastCategory.name, item.name);
			lastCategory.items.push(item);
		}
	})
	.on('end', async () => {
		writeFile('./src/lib/data/product.json', JSON.stringify(products, null, 2), (err) => {
			if (err) {
				console.log(err);
			}
		});

		// Generate TypeScript file content
		let tsFileContent = '';
		products.forEach((category) => {
			category.items.forEach((item) => {
				const itemNameKebabCase = kebabCase(item.brand + '_' + item.name);
				tsFileContent += `import img${itemNameKebabCase
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join('')} from '$lib/assets/product/details/${itemNameKebabCase}.webp';\n`;
			});
		});

		tsFileContent += '\n\nconst productDetailPhotoMap = {\n';
		products.forEach((category) => {
			category.items.forEach((item) => {
				const itemNameKebabCase = kebabCase(item.brand + '_' + item.name);
				tsFileContent += `\t'${itemNameKebabCase}': img${itemNameKebabCase
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join('')},\n`;
			});
		});
		tsFileContent += '};\n\nexport default productDetailPhotoMap;\n';

		writeFile('./src/lib/productDetailPhotoMap.ts', tsFileContent, (err) => {
			if (err) {
				console.log(err);
			}
		});

		// replace /product/details/ with /product/thumbs/
		tsFileContent = tsFileContent.replace(/\/product\/details\//g, '/product/thumbs/');
		writeFile('./src/lib/productThumbnailPhotoMap.ts', tsFileContent, (err) => {
			if (err) {
				console.log(err);
			}
		});
	});

// Run convert_img_to_webp.sh to convert jpgs and pngs in folder ./src/lib/assets/product/details to webp
execSync('sh ./convert_img_to_webp.sh ./src/lib/assets/product/details');
execSync('sh ./create_thumbnails.sh ./src/lib/assets/product/details ./src/lib/assets/product/thumbs');

function kebabCase(str) {
	return (
		str
			// Convert non-alphanumeric characters to spaces
			.replace(/[^a-zA-Z0-9]+/g, ' ')
			// Replace spaces with dash
			.replace(/\s+/g, '-')
			// Convert the string to lowercase
			.toLowerCase()
	);
}
