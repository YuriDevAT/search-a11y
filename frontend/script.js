const searchClient = algoliasearch(
  'YOUR_ALGOLIA_APP_ID',
  'ecc1d987423e274c0777a83e02ef8f5e'
);

const search = instantsearch({
  indexName: 'accessibility_articles', 
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
    hitsPerPage: 8,
  }),
]);

search.start();