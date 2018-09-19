import Base from '../../base/Base.class';
import template from './Recipepage.template';
import data from '../../base/JsonLoad.class';



/**
 * Recipepage in main for route '/'
 *
 */
export default class Recipepage extends Base {
  constructor() {
    super();
    this.checkIfDataExist();

  }

  /**
  * Method for checking if data has been loaded properly. 
  *
  *
  */

  checkIfDataExist(){
    if(data.recipes && data.foodData) {
      this.start();
    } else {
      setTimeout(() => { this.checkIfDataExist(); }, 300);
    }
  }


  /**
  * Getting the right recipe by a string passed to the constructor later on
  * Empty main if there is anything
  * Render big template
  * Render ingredients
  *** Rendering ingredients to also listen for change on portions
  *
  */
  start(){
    this.getRecipe("Tikka Masala");
    $('main').empty();
    this.render('main');
    this.renderIngredients();
  }


  /**
  * Eventhandlers
  *
  */
  change() {
    if ($(event.target).is('#portion-selector')) {
      this.renderIngredients();

    }
  }

  /**
   * Finding a recipe by its title
   *
   */
  getRecipe(str) {
    console.log(data.recipes);
    this.recipe = data.recipes.filter(recipe => recipe.title === str)[0];
  }

  /**
   * Get all ingredients and put them into html-strings
   *
   */
  getIngredients(){
    let portions = $('#portion-selector').val() * 1;
    console.log(portions);
    return this.recipe.ingredientsPerPortion.map(ingredient => {
      return `<li class="list-group-item border-0">${ingredient.quantity * portions}${ingredient.unitOfMeasurement} ${ingredient.title}</li>`
    })
  }

  /**
   * Get all instructions and put them into html strings
   *
   */
  getInstructions() {
    return this.recipe.instructions.map(instruction => {
      return `<li class="d-flex">
      <div class="flex-grow-1 ml-4">
        ${instruction}
      </div>
    </li>`
    }).join('');
  }


  /**
   * Calculate showed time from recipe.json into hours and minutes
   *
   */
  calcTime(){
    let time = this.recipe.time
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

  renderIngredients(){
    $('.ingredient-list').empty('').append(this.getIngredients());
  }
  
}



Recipepage.prototype.template = template;