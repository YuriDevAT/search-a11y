const customRefinementList = instantsearch.connectors.connectRefinementList(
  (renderOptions, isFirstRender) => {
    const { items, refine, widgetParams } = renderOptions;
    const container = document.querySelector(widgetParams.container);

    if (isFirstRender) {
      const list = document.createElement('ul');
      list.classList.add('custom-refinement-list');

      list.addEventListener('click', event => {
        const button = event.target.closest('.custom-refinement-item');
        if (button) {
          refine(button.dataset.value);
        }
      });
      
      container.innerHTML = '';
      container.appendChild(list);
    }
    
    const list = container.querySelector('.custom-refinement-list');
    list.innerHTML = items.map(item => `
      <li>
        <button 
          class="custom-refinement-item ${item.isRefined ? 'selected' : ''}"
          data-value="${item.value}"
        >
          <span class="custom-refinement-label">${item.label}</span>
          <span class="custom-refinement-count">${item.count}</span>
        </button>
      </li>
    `).join('');
  }
);