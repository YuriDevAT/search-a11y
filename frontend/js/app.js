const searchClient = algoliasearch(
  ALGOLIA_CONFIG.ALGOLIA_APP_ID,
  ALGOLIA_CONFIG.ALGOLIA_SEARCH_API_KEY
);

const search = instantsearch({
  indexName: ALGOLIA_CONFIG.ALGOLIA_INDEX_NAME, 
  searchClient,
});

let searchWasSubmitted = false;

const widgets = [
  customSearchBox({
    container: '#custom-searchbox-container',
  }),
  customRefinementList({
    container: '#author-list-container',
    attribute: 'author',
    sortBy: ['name:asc'],
  }),
  instantsearch.widgets.stats({
    container: '#stats-container',
    templates: {
      text(data, { html }) {
        const count = data.nbHits;
        const query = data.query;
        const plural = count === 1 ? '' : 's';

        if (query) {
          if (count === 0) {
            return `No articles found for "${query}".`;
          } else {
          return html`${count} article${plural} found for <i>${query}</i>`;
          }
        } else {
          return`${count} article${plural} in the index.`;
        }
      },
    },
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <article>
          <a href="{{link}}">
            <h3>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h3>
          </a>
          <div class="hit-content">
            {{#helpers.snippet}}{ "attribute": "content", "highlightedTagName": "mark" }{{/helpers.snippet}}
          </div>
          <p class="author">By {{author}}</p>
          {{#formattedDate}}<p class="date">Published: {{formattedDate}}</p>{{/formattedDate}}
        </article>
      `,
    },
    transformItems(items) {
      return items.map(item => {
        let formattedDate = '';
        if (item.pubDate) {
          const dateObject = new Date(item.pubDate);
          if (!isNaN(dateObject.getTime())) {
            formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            });
          }
        }
        return { ...item, formattedDate };
      });
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
];

search.addWidgets(widgets);
search.start();