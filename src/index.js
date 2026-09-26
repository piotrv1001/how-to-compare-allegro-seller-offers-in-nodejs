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
