import Base from '../../base/Base.class';
import template from './Startpage.template';

/**
 * Startpage in main for route '/'
 *
 */
export default class Startpage extends Base {

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
    this.fourRecipes = this.recipeBox();
    $('main').empty();
    this.render('main');
  }

  /**
  * Gets the firt 4 recipes in JSON.
  * Returns a template with data from JSON
  *
  */
  recipeBox(){
    let firstFour = this.recipes.slice(0,4);

    return firstFour.map(recipe => {
      return `
      <a href="/recept/${recipe.url}" class="no-decoration-a-tag col-12 col-lg-6 p-0 d-flex px-2">
        <div class="media pl-2 p-1 p-sm-3 border">
          <img class="mr-2 mt-1 m-sm-0 mr-sm-4 media-img rounded" src="${recipe.imgLink}"
            alt="${recipe.imgAlt}">
          <div class="media-body">
            <h5 class="mt-0 media-heading d-inline">${recipe.title}</h5>
            <i class="fas fa-angle-right fa-lg"></i>
            <p class="w-100 mb-0 mt-2 mr-2 text-muted">Såvrighetsgrad: 
                <span>
                  <i class="fas fa-star ${recipe.difficulty < 1 ? 'text-muted' : ''} mr-1"></i>
                  <i class="fas fa-star ${recipe.difficulty < 2 ? 'text-muted' : ''} mr-1"></i>
                  <i class="fas fa-star ${recipe.difficulty < 3 ? 'text-muted' : ''} mr-1"></i>
                  <i class="fas fa-star ${recipe.difficulty < 4 ? 'text-muted' : ''} mr-1"></i>
                  <i class="fas fa-star ${recipe.difficulty < 5 ? 'text-muted' : ''} mr-1"></i>
                </span>
              </p>
            <p class="my-1 my-sm-2">${recipe.description}</p>
            <div class="row recipe-info-wrapper">
              <p class="col-6 my-0 mt-sm-2 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories} kalorier</p>
              <p class="col-6 my-0 mt-sm-2 text-muted text-right"><i class="far fa-clock mr-2"></i>${this.calcTime(recipe)}</p>
              
              </div>
            </div>
          </div>
        </div>
      </a>
      `
    })
  }


}

Startpage.prototype.template = template;
