const customSearchBox = instantsearch.connectors.connectSearchBox(
  (renderOptions, isFirstRender) => {
    const { query, refine, clear, widgetParams } = renderOptions;
    const container = document.querySelector(widgetParams.container);

    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-searchbox-wrapper');

    const input = document.createElement('input');
    const searchButton = document.createElement('button');
    const clearButton = document.createElement('button');

    const toggleClearButton = () => {
      clearButton.style.display = input.value.length > 0 ? 'block' : 'none';
    };

    if (isFirstRender) {
      input.id = 'main-search-input';
      input.classList.add('custom-search-input');
      input.type = 'search';
      input.placeholder = widgetParams.placeholder || '';
      input.autocomplete = 'off';
      input.spellcheck = false;

      searchButton.type = 'submit';
      searchButton.classList.add('search-button');
      searchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>Search</title>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>`;

      clearButton.type = 'button';
      clearButton.classList.add('clear-button');
      clearButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>Clear search</title>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`;
        
      input.addEventListener('input', event => {
        refine(event.currentTarget.value);
        toggleClearButton();
      });

      clearButton.addEventListener('click', () => {
        clear();
        toggleClearButton();
        input.focus();
      });

      wrapper.appendChild(input);
      wrapper.appendChild(searchButton);
      wrapper.appendChild(clearButton);
      container.appendChild(wrapper);

      toggleClearButton();
    }

    const currentInput = container.querySelector('.custom-search-input');
    if (currentInput.value !== query) {
        currentInput.value = query;
    }
    toggleClearButton();
  }
);