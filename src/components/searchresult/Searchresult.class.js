import Base from '../../base/Base.class';
import template from './Searchresultpage.template';

/**
 * Searchresultpage in main for route '/'
 *
 */
export default class Searchresult extends Base {
  constructor(){
    super();
    this.checkIfDataExist();

  }

  /**
  * Method for checking if data has been loaded properly. 
  * Need to optimize this. Data needs to always be loaded.
  * Code is repeated in more classes.
  *
  */
  checkIfDataExist(){
    if(this.recipes && this.foodData) {
      this.start();
    } else {
      setTimeout(() => { this.checkIfDataExist(); }, 80);
    }
  }

  start(){
    $('main').empty();
    this.render('main');
    this.filterArray = [];
    this.filterAndRender();
  }


  /**
  * Eventhandler
  * Checks if there is a change to checkboxes.
  * Then either add the name of it to an array or remove it
  * Call filterAndRender
  * 
  */
  change(){
    if ($(event.target).is('input[type=checkbox]')) {
      let name = $(event.target).attr('name');
      if($(event.target).is(':checked')) {
        this.filterArray.push(name);
      } else {
        let index = this.filterArray.indexOf(name);
        if(index > -1) {
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
  filterAndRender(){
    this.filteredRecipes = this.filterRecipe(this.filterArray);
    this.renderRecipeBoxes();
  }

  /**
  * Filtering recipes after an array with filter-words
  * 
  *
  */
  filterRecipe(filterArray){
    let arr = this.recipes.filter(recipe => {
        if (filterArray.every(filter => {
          return recipe.filters.includes(filter)
        })) {
          return recipe;
        }
    })
    return arr;
  }

  /**
  * Render all filtered boxes.
  * 
  *
  */
  renderRecipeBoxes(){
    let newarr = this.filteredRecipes.map(recipe => {
      return `<a href="/recipe" class="no-decoration-a-tag pop">
      <div class="media p-1 p-sm-3 mt-0 border">
        <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="${recipe.imgLink}"
          alt="${recipe.imgAlt}">
        <div class="media-body">
          <h5 class="mt-0 media-heading d-inline">${recipe.title}</h5>
          <i class="fas fa-angle-right fa-lg"></i>
          <p class="mt-2">${recipe.description}</p>
          <div class="row recipe-info-wrapper">
            <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories} kalorier</p>
            <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>${this.calcTime(recipe)}</p>
          </div>
        </div>
      </div>
    </a>`
    })

    $('.search-recipe-result').empty().append(newarr.join(''));
  }
}

Searchresult.prototype.template = template;