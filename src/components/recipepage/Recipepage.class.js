import Base from '../../base/Base.class';
import template from './Recipepage.template';


/**
 * Recipepage in main for route '/'
 *
 */
export default class Recipepage extends Base {
  constructor(favorites) {
    super();
    this.myFavorites = favorites;
    this.start();
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
    setTimeout(() => {
      this.getRecipe(location.pathname.slice(8, location.pathname.length));
      $('main').empty();
      this.render('main');
      this.renderIngredients();
      this.renderRecipeFilters();
      this.pictureRandomizer();
      this.initializeBootstrapTooltips();
    }, 50);
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
   * Should be provided from the contructor later on.
   */
  getRecipe(str) {
    this.recipe = this.recipes.filter(recipe => recipe.url === str)[0];
  }

  /**
   * Get all ingredients and put them into html-strings
   *
   */
  getIngredients(){
    let portions = $('#portion-selector').val() * 1;
    return this.recipe.ingredientsPerPortion.map(ingredient => {
      return `<li class="list-group-item border-0">${ingredient.quantity * portions}${ingredient.unitOfMeasurement} ${ingredient.name}</li>`
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


  renderIngredients(){
    $('.ingredient-list').empty('').append(this.getIngredients());
  }

  /**
   * Method to randomly select a background image
   * for the "header" of the recipe page
   * Selects image from an array and uses it as the value
   * of the background-image property
   */
  pictureRandomizer() {
    // An array of strings of background-image pictures to select from
    let backgroundPictureArray = ["url(/img/start-picture.jpg)", "url(/img/recept-cover.jpeg)", "url(/img/recept-cover-2.jpg)", "url(/img/recept-cover-3.jpg)"];
    // Get a random number 0 - 3 (inclusive)
    let randomNumber = Math.floor(Math.random() * 4);
    // Select background-image from array using randomNumber as index
    let recipeBackgroundPicture = backgroundPictureArray[randomNumber];
    // Insert chosen background-image as value to the background-image property
    $('.recipe-top-part-2').css('background-image', recipeBackgroundPicture);
  }

  /**
   * Bootstrap built-in method needed to
   * initialize tooltips on page
   *
   */
  initializeBootstrapTooltips() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

  /**
   * Method to get filters/categories for specific recipe
   * and render those out to the page as button links
   */
  renderRecipeFilters() {
    let recipeFilters = this.recipe.filters;
    let recipeFilterButtons = recipeFilters.map(filter => {
      return `<a class="btn filter-btn mt-2 pop" role="button" href="/searchresult/mat/filters${filter}" name="${filter}">${filter}</a>`
    });
    $('.recipe-categories').empty().append(recipeFilterButtons.join(''));
  }

}



Recipepage.prototype.template = template;
