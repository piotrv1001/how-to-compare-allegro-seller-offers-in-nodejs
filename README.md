# How to Compare Allegro Seller Offers in Node.js

This example calls our [Allegro Price Comparison Scraper](https://apify.com/piotrv1001/allegro-price-comparison-scraper) on Apify. It does not implement an Allegro scraper from scratch.

## What this example does

- Sends one Allegro Poland offer URL to the Actor
- Keeps new, buy-now offers and asks for the three lowest ordinary delivered totals
- Waits for the run and fetches its dataset
- Prints each seller offer with its price and delivery fields

The delivered total uses the anonymous source context. It is not a checkout quote for your postcode, account, or basket.

## Prerequisites

- Node.js 18 or later
- An Apify account and [API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

Copy `.env.example` to `.env` and replace the placeholder with your Apify token. Do not commit `.env`.

## Usage

```bash
npm start
```

## Code example

```js
import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// Initialize the ApifyClient with your Apify API token
// Set APIFY_TOKEN in your .env file (copy .env.example to get started)
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// Prepare Actor input
const input = {
    productUrls: ['https://allegro.pl/oferta/17338232832'],
    eans: [],
    maxItems: 3,
    maxOffersPerProduct: 3,
    condition: 'new',
    sortBy: 'priceWithDelivery',
    smartOnly: false,
};

// Run the Actor and wait for it to finish
const run = await client.actor('piotrv1001/allegro-price-comparison-scraper').call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs
```

`maxItems` caps saved offers across the entire run; `maxOffersPerProduct` caps one product. To inspect whether the source had more offers, open the run's **Run summary**. A three-row dataset is a shortlist, not the complete seller market.

## Example output

[`sample-output.json`](./sample-output.json) contains two full records from our September 18, 2026 printer validation. That validation used buy-now sorting; the code above requests delivered-price sorting, so your order and prices may differ. Useful fields include `productId`, `offerId`, `sellerLogin`, `buyNowPrice`, `deliveryCost`, `priceWithDelivery`, `condition`, and `smart`.

## Use cases

- Compare new buy-now offers for one catalog product
- Check whether ordinary delivery changes the price ranking
- Keep a specific offer ID for later price checks
- Inspect seller and Smart! context before opening the live offer

## Try the Actor on Apify

**[Open the Allegro Price Comparison Scraper on Apify](https://apify.com/piotrv1001/allegro-price-comparison-scraper)**

## Related resources

- [How to compare Allegro seller offers by delivered price](https://www.falconscrape.com/blog/how-to-compare-allegro-seller-offers)
- [Allegro listings guide](https://www.falconscrape.com/blog/how-to-scrape-allegro-product-listings)

## License

MIT
