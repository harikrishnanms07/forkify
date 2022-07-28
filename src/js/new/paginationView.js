import view from './view.js';
import icons from 'url:../../img/icons.svg';
import View from './view.js';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numpages = Math.ceil(
      this._data.results.length / this._data.resultsperpage
    );

    if (currentPage === 1 && numpages > 1) {
      return `

      
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
            
            <span>Page ${currentPage + 1}</span>
           
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
      `;
    }

    if (currentPage === numpages && numpages > 1) {
      return `
      
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
      `;
    }
    if (currentPage < numpages) {
      return `
      
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
     <button data-goto="${
       currentPage - 1
     }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>    
      `;
    }
    return '';
  }
}
export default new PaginationView();
