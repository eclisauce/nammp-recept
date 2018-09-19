import Base from '../../base/Base.class';
import template from './Startpage.template';
import data from '../../base/JsonLoad.class';

/**
 * Startpage in main for route '/'
 *
 */
export default class Startpage extends Base {

  constructor(){
    super();
    this.checkIfDataExist();

  }

  checkIfDataExist(){
    if(data.recipes && data.foodData) {
      this.start();
    } else {
      setTimeout(() => { this.checkIfDataExist(); }, 100);
    }
  }

  start(){
    this.fourRecipes = this.recipeBox();
    console.log(this.fourRecipes);
    $('main').empty();
    this.render('main');
  }

  recipeBox(){
    let firstFour = data.recipes.slice(0,4);

    return firstFour.map(recipe => {
      function calcTime(){
        let time = recipe.time
        let minutes = time % 60;
        let hours = (time - minutes) / 60;
        if(hours === 0){
          return `${minutes} minuter`
        } else if (minutes === 0) {
          return `${hours} timmar`
        } else {
          return `${hours} timmar ${minutes} minuter`;
        }
      }
      return `
      <a href="/recipe" class="no-decoration-a-tag col-lg-6 p-0 d-flex px-2">
        <div class="media pl-3 p-1 p-sm-3 border">
          <img class="mr-2 ml-3 mt-1 m-sm-0 mr-sm-4 media-img rounded" src="${recipe.imgLink}"
            alt="${recipe.imgAlt}">
          <div class="media-body">
            <h5 class="mt-0 media-heading d-inline">${recipe.title}</h5>
            <i class="fas fa-angle-right fa-lg"></i>
            <p class="my-1 my-sm-2">${recipe.description}</p>
            <div class="row recipe-info-wrapper">
              <p class="col-6 my-0 mt-sm-2 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories} kalorier</p>
              <p class="col-6 my-0 mt-sm-2 text-muted text-right"><i class="far fa-clock mr-2"></i>${calcTime()}</p>
            </div>
          </div>
        </div>
      </a>
      `
    })
  }

  
}

Startpage.prototype.template = template;