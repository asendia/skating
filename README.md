# Skating Indonesia (skating.id)
[![Netlify Status](https://api.netlify.com/api/v1/badges/599eecad-58fd-453f-9b21-130e4b9713f5/deploy-status)](https://app.netlify.com/sites/skatingindonesia/deploys)

Frontend code of [skating.id](https://skating.id)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run sync
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run sync
npm run build
```

You can preview the production build with `npm run preview`.

## Editing the menu

1. Edit the CSV file located in [src/lib/data/menu.csv](https://github.com/asendia/skating/blob/main/src/lib/data/product.csv)
2. Add/Edit hi-res images in [src/lib/assets/brand/](https://github.com/asendia/skating/blob/main/src/lib/assets/product/details), ensure the file name matches item [brand]-[name] in `product.csv` (e.g. brand: "Brand Name" name: "Item Name" will have "brand-name-item-name.webp")
3. Run `node build-product.js`, it will generate `src/lib/data/product.json`, `src/lib/productThumbnailPhotoMap.ts` & `src/lib/productDetailPhotoMap.ts`
