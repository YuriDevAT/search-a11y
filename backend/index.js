require('dotenv').config();

const algoliasearch = require('algoliasearch');
const Parser = require('rss-parser');
const { trimHTML } = require('./utils.js');
const FEEDS_TO_PARSE = require('./config/feeds.js');

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

async function fetchAndIndexArticles() {
    try {
        if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY) {
            throw new Error('Algolia environment variables are missing. Please check your .env file.');
        }

        console.log('--- Starting article fetch process ---');
        
        const parser = new Parser({
            customFields: {
                item: ['content:encoded', 'content']
            }
        });
        
        const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
        const index = algoliaClient.initIndex(ALGOLIA_INDEX_NAME);

        let allArticles = [];

        for (const feed of FEEDS_TO_PARSE) {
            try {
                console.log(`Fetching articles from ${feed.author}...`);
                const feedContent = await parser.parseURL(feed.url);
                
                const formattedArticles = feedContent.items
                    .filter(item => item.title && item.link) 
                    .map(item => ({
                        title: item.title,
                        link: item.link,
                        author: feed.author,
                        pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
                        content: trimHTML(item['content:encoded'] || item.content),
                    }));

                allArticles.push(...formattedArticles);
                console.log(`-> Found ${formattedArticles.length} articles.`);
            } catch (error) {
                console.error(`Error fetching or parsing feed for ${feed.author}:`, error.message);
            }
        }

        if (allArticles.length === 0) {
            console.log('No articles found to index. Exiting.');
            return;
        }

        console.log(`\nAttempting to index ${allArticles.length} total articles...`);
        
        console.log('Clearing existing index to ensure freshness...');
        await index.clearObjects();

        console.log('Saving new articles to Algolia...');
        const { objectIDs } = await index.saveObjects(allArticles, {
          autoGenerateObjectIDIfNotExist: true, 
        });

        console.log(`\n--- Success! ---`);
        console.log(`Successfully indexed ${objectIDs.length} articles in the '${ALGOLIA_INDEX_NAME}' index.`);

    } catch (error) {
        console.error('\n--- An error occurred during the Algolia process! ---');
        console.error(error);
    }
}

fetchAndIndexArticles();