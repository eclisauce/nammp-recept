import Base from '../../base/Base.class';
import template from './Searchresultpage.template';
/**
 * Searchresultpage in main for route '/'
 *
 */
export default class Searchresult extends Base {
  constructor(searchStr, filters, favorites) {
    super();
    this.myFavorites = favorites;
    this.start();
    this.searchStr = searchStr;
    this.filterArray = filters;
    }

  start() {
    setTimeout(() => {
      $('main').empty();
      this.render('main');
      this.searchRecipes = this.searchResults();
      this.filterAndRender();
      this.markFilters();
      this.filterCollapseController();
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

  /**
   * Rewrites the filtered recipes then calls the render method.
   *
   *
   */
  filterAndRender() {
    $('.search-recipe-result').empty()
    this.filteredRecipes = this.filterRecipe(this.filterArray);
    if(this.filteredRecipes.length > 0){
      this.renderRecipeBoxes();
    } else {
      $('.search-recipe-result').append('<h3 class="danger px-4 px-md-0">Tyvärr hittar vi inget recept på din sökning. Var god försök igen.</h3>')
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

  markFilters(){
    let getAll = $('input[type=checkbox]');
    this.filterArray.forEach(x => {
      getAll.each(function () {
        if ($(this).attr('name') == x) {
          $(this).prop('checked', true)
        }
      });
    })
  }

  /**
   * Render all filtered boxes.
   *
   *
   */
  renderRecipeBoxes() {
    let newarr = this.filteredRecipes.map(recipe => {
      return `
      <div class="search-item">
        <button class="heart" data-id="${recipe.url}" title="Lägg detta till favoriter"><i class="${this.myFavorites.favorites.includes(recipe.url) ? 'fas' : 'far'} fa-heart"></i></button>
        <a href="/recept/${recipe.url}" class="no-decoration-a-tag pop">
          <div class="media p-1 p-sm-3 mt-0 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="${recipe.imgLink}"
              alt="${recipe.imgAlt}">
            <div class="media-body ">
              <h5 class="mt-0 media-heading d-inline">${recipe.title}</h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="mt-2">${recipe.description}</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories} kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>${this.calcTime(recipe)}</p>
              </div>
            </div>
          </div>
        </a>
      </div>`;
    })

    $('.search-recipe-result').append(newarr.join(''));
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

  filterCollapseController(){
    if ($(window).width() < 768) {
      $('.filter-heading').trigger('click');
    }
  }

}

Searchresult.prototype.template = template;
