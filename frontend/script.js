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
    searchAsYouType: false,
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    transformItems(items) {
      return items.map(item => {
        let formattedDate = '';

        if (item.pubDate) {
          const dateObject = new Date(item.pubDate);
          
          if (!isNaN(dateObject.getTime())) {
            formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }
        }
        
        return {
          ...item,
          formattedDate,
        };
      });
    },
    templates: {
      item: `
        <article>
          <a href="{{link}}">
            <h2>
              {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
            </h2>
          </a>
          <div class="hit-content">
            {{#helpers.snippet}}{
              "attribute": "content",
              "highlightedTagName": "mark"
            }{{/helpers.snippet}}
          </div>
          <p class="author">By {{author}}</p>
          {{#formattedDate}}
              <p class="date">Published: {{formattedDate}}</p>
            {{/formattedDate}}
        </article>
      `,
      empty: `
        No results have been found for <strong>{{query}}</strong>.
      `,
    },
  }),

  instantsearch.widgets.refinementList({
    container: '#author-filter-bar',
    attribute: 'author',
      templates: {
      header: '<p>Filter by Author</p>',
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination-full',
    padding: 3,
  }),
  
  instantsearch.widgets.pagination({
    container: '#pagination-short',
    padding: 1,
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 10,
  }),
]);

search.start();