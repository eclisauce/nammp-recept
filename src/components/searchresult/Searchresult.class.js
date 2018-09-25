import Base from '../../base/Base.class';
import template from './Searchresultpage.template';
/**
 * Searchresultpage in main for route '/'
 *
 */
export default class Searchresult extends Base {
  constructor(searchStr, filters) {
    super();
    this.start();
    this.searchStr = searchStr;
    this.filterArray = filters;
  }

  start() {
    setTimeout(() => {
      $('main').empty();
      this.render('main');
      this.lastRenderedIndex = 0;
      this.searchRecipes = this.searchResults();
      this.filterAndRender();
      this.markFilters();
      this.filterCollapseController();
      $('.pagination-holder').append(this.paginationTemplate());
      this.disableNextOrPrev();
      this.setActiveLink();
    }, 50);
  }


  /**
   * Eventhandler
   * Checks if there is a change to checkboxes.
   * Then either add the name of it to an array or remove it
   * Call filterAndRender
   *
   */
  change() {
    if ($(event.target).is('input[type=checkbox]')) {
      let name = $(event.target).attr('name');
      if ($(event.target).is(':checked')) {
        this.filterArray.push(name);
      } else {
        let index = this.filterArray.indexOf(name);
        if (index > -1) {
          this.filterArray.splice(index, 1)
        }
      }
      this.filterAndRender();
    }
  }

  click() {
    for (let i = 0; i < this.pages.length; i++){
      if ($(event.target).hasClass(`pagination-${i+1}`)) {
        this.lastRenderedIndex = i;
        this.renderAPage(this.lastRenderedIndex);
        this.setActiveLink();
      }
    }

    if ($(event.target).hasClass('previous')) { 
      if (this.lastRenderedIndex > 0){
        this.lastRenderedIndex--;
        this.renderAPage(this.lastRenderedIndex);
      }     

    }

    if ($(event.target).hasClass('next')) {
      if (this.lastRenderedIndex+1 < this.pages.length) {
        this.lastRenderedIndex++;
        this.renderAPage(this.lastRenderedIndex);
      } 
    }



  }

  /**
   * Rewrites the filtered recipes then calls the render method.
   *
   *
   */
  filterAndRender() {
    $('.search-recipe-result').empty()
    this.filteredRecipes = this.filterRecipe(this.filterArray);
    this.getPageCounter(this.filteredRecipes.length/5);
    if (this.filteredRecipes.length > 0) {
      this.renderAPage(0);


    } else {
      $('.search-recipe-result').append('<h3 class="danger px-4 px-md-0">Tyvärr hittar vi inget recept på din sökning. Var god försök igen.</h3>')
    }
  }

  renderAPage(pageNumber){
    $('.search-recipe-result').empty();
    $('.search-recipe-result').append(this.pages[pageNumber]);
    console.log(this.pages.length, this.lastRenderedIndex);
    this.disableNextOrPrev();

  }

  getPageCounter(numberOfPages){
    numberOfPages = Math.ceil(numberOfPages);
    let fullArr = this.getRecipeBoxes();
    this.pages = [];
    for (let i = 0; i < numberOfPages; i++){
      let fiveArr = fullArr.slice(i*5, 5*(i+1));
      this.pages.push(fiveArr);
    }
  }

  /**
   * Filtering recipes after an array with filter-words
   *
   *
   */
  filterRecipe(filterArray) {
    let arr = this.searchRecipes.filter(recipe => {
      if (filterArray.every(filter => {
          return recipe.filters.includes(filter)
        })) {
        return recipe;
      }
    })
    return arr;
  }

  markFilters() {
    let getAll = $('input[type=checkbox]');
    this.filterArray.forEach(x => {
      getAll.each(function () {
        if ($(this).attr('name') == x) {
          $(this).prop('checked', true)
        }
      });
    })
  }

  setActiveLink(){
    $('a.page-link').removeClass('active');
    $(`.pagination-${this.lastRenderedIndex+1}`).addClass('active');
  }

  disableNextOrPrev(){
    if(this.pages.length === this.lastRenderedIndex+1){
      $('.next-li').addClass('disabled');
      $('.next').attr('tabindex', '-1');
      console.log('disable next');
    } else {
      $('.next-li').removeClass('disabled');
      $('.next').removeAttr('tabindex');
    }
    if(this.lastRenderedIndex === 0){
      $('.previous-li').addClass('disabled');
      $('.previous').attr('tabindex', '-1');
    } else {
      $('.previous-li').removeClass('disabled');
      $('.previous').removeAttr('tabindex');
    }
  }

  paginationLiTemplate(){
    let fullhtml = '';
    for (let i = 0; i < this.pages.length; i++){
      fullhtml += `
      <li class="page-item"><a class="page-link text-primary pagination-${i+1}">${i+1}</a></li>
      `
    }
    return fullhtml
  }

  paginationTemplate() {
    return `
    <div class="row col-12 justify-content-center m-0 pagination">
    <nav aria-label="Pagination for recipes">
      <ul class="pagination">
        <li class="page-item previous-li">
          <a class="page-link text-primary previous" aria-label="Previous">
            &laquo;
            <span class="sr-only">Previous</span>
          </a>
        </li>
          ${this.paginationLiTemplate()}
        <li class="page-item next-li">
          <a class="page-link text-primary next" aria-label="Next">
            &raquo;
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
    `
  }

  /**
   * Render all filtered boxes.
   *
   *
   */
  getRecipeBoxes() {
    return this.filteredRecipes.map(recipe => {
      return `<a href="/recept/${recipe.url}" class="no-decoration-a-tag pop">
      <div class="media p-1 p-sm-3 mt-0 border">
        <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="${recipe.imgLink}"
          alt="${recipe.imgAlt}">
        <div class="media-body">
          <h5 class="mt-0 media-heading d-inline">${recipe.title}</h5>
          <i class="fas fa-angle-right fa-lg"></i>
          <p class="mt-2">${recipe.description}</p>
          <div class="row recipe-info-wrapper">
            <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories.toFixed()  } kalorier</p>
            <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>${this.calcTime(recipe)}</p>
          </div>
        </div>
      </div>
    </a>`
    })
  }

  searchResults() {
    let arr;
    if (this.searchStr) {
      arr = this.recipes.filter(x => {
        if (x.title.toLowerCase().includes(this.searchStr.toLowerCase())) {
          return x;
        } else if (x.ingredientsPerPortion.some(xx => xx.name.toLowerCase().includes(this.searchStr.toLowerCase()))) {
          return x;
        }
      })
    } else {
      arr = this.recipes;
    }
    return arr;
  }

  filterCollapseController() {
    if ($(window).width() < 768) {
      $('.filter-heading').trigger('click');
    }
  }

}

Searchresult.prototype.template = template;