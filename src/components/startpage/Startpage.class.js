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
      <a href="/recept/${recipe.url}" class="no-decoration-a-tag col-12 col-lg-6 p-0 d-flex px-2 pop">
        <div class="media mb-4 p-2 border d-flex flex-column flex-lg-row">
          <img class="mb-2 media-img rounded" src="${recipe.imgLink}"
            alt="${recipe.imgAlt}">
          <div class="media-body">
            <h5 class="mt-0 media-heading width-heading d-inline-block">${recipe.title}<i class="fas fa-angle-right fa-lg d-none d-lg-inline-block"></i></h5>
            <p class="w-100 m-0 mt-1 text-muted"><strong>Svårighetsgrad:</strong>
              <span class="stars px-2">
                <i class="fas fa-star ${recipe.difficulty < 1 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 2 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 3 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 4 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 5 ? 'text-muted' : ''} mr-1"></i>
              </span>
            </p>
            <p class="my-1 my-sm-2">${recipe.description}</p>
            <div class="d-flex recipe-info-wrapper justify-content-between">
              <p class="my-0 mt-sm-2 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories.toFixed()} kcal</p>
              <p class="my-0 mt-sm-2 text-muted text-right"><i class="far fa-clock mr-2"></i>${this.calcTime(recipe)}</p>

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
