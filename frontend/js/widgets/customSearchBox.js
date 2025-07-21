const customSearchBox = instantsearch.connectors.connectSearchBox(
  (renderOptions, isFirstRender) => {
    const { query, refine, widgetParams } = renderOptions;
    const container = document.querySelector(widgetParams.container);

    if (isFirstRender) {
      const input = document.createElement('input');
      input.id = 'main-search-input';
      input.classList.add('custom-search-input');
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;

      input.addEventListener('input', event => {
        refine(event.currentTarget.value);
      });

      container.appendChild(input);
    }

    container.querySelector('input').value = query;
  }
);