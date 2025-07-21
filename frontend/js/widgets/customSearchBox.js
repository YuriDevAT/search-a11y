const customSearchBox = instantsearch.connectors.connectSearchBox(
  (renderOptions, isFirstRender) => {
    const { query, refine, clear, widgetParams } = renderOptions;
    const container = document.querySelector(widgetParams.container);

    if (isFirstRender) {
      const form = document.createElement('form');
      form.classList.add('custom-searchbox-form');
      form.autocomplete = 'off';
      form.noValidate = true;
      form.setAttribute('role', 'search');

      const wrapper = document.createElement('div');
      wrapper.classList.add('custom-searchbox-wrapper');

      const input = document.createElement('input');
      input.id = 'main-search-input';
      input.classList.add('custom-search-input');
      input.type = 'text';
      input.spellcheck = false;

      const searchButton = document.createElement('button');
      searchButton.type = 'submit';
      searchButton.classList.add('search-button');
      searchButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><title>Search</title><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

      const clearButton = document.createElement('button');
      clearButton.type = 'button';
      clearButton.classList.add('clear-button');
      clearButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><title>Clear search</title><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

      form.addEventListener('submit', event => {
        event.preventDefault();
        container.dispatchEvent(new CustomEvent('searchSubmitted', { bubbles: true }));
      });
      
      input.addEventListener('input', event => {
        refine(event.currentTarget.value);
      });

      clearButton.addEventListener('click', () => {
        clear(); 
        input.focus();
      });

      wrapper.appendChild(input);
      wrapper.appendChild(searchButton);
      wrapper.appendChild(clearButton);
      form.appendChild(wrapper);
      container.appendChild(form);
    }

    const inputElement = container.querySelector('.custom-search-input');
    const clearButtonElement = container.querySelector('.clear-button');

    inputElement.value = query;

    clearButtonElement.style.display = query.length > 0 ? 'block' : 'none';
  }
);