const searchClient = algoliasearch(
  ALGOLIA_CONFIG.ALGOLIA_APP_ID,
  ALGOLIA_CONFIG.ALGOLIA_SEARCH_API_KEY
);

const search = instantsearch({
  indexName: ALGOLIA_CONFIG.ALGOLIA_INDEX_NAME, 
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox', 
    placeholder: 'Search for articles about ARIA, screen readers, etc.',
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <article>
          <a href="{{link}}" target="_blank" rel="noopener noreferrer">
            <h3>
              {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
            </h3>
          </a>
          <p class="author">By {{author}}</p>
          <p class="date">Published on: ${new Date('{{pubDate}}').toLocaleDateString()}</p>
        </article>
      `,
      empty: `
        No results have been found for <strong>{{query}}</strong>.
      `,
    },
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 20,
  }),
]);

search.start();