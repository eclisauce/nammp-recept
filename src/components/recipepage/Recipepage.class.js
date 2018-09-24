import Base from '../../base/Base.class';
import template from './Recipepage.template';


/**
 * Recipepage in main for route '/'
 *
 */
export default class Recipepage extends Base {
  constructor() {
    super();
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
      this.pictureRandomizer();
      this.initializeBootstrapTooltips();
    }, 100);
    this.renderRecipeFilters();
    this.goToFilter();
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
      return `<a class="btn filter-btn mt-2" href="/searchresult" name="${filter}">${filter}</a>`
    })
    $('.recipe-categories').empty().append(recipeFilterButtons.join(''));
  }

  /**
   * *WIP*
   * Event handler for sending user to correct category on
   * searchresult page when clicking on link
   * Needs to reach Searchresult.class and call its methods
   * to re-render page but can't figure out how
   * Extending Searchresult.class seems dumb
   *
   */
  goToFilter() {
    $(document).on('click', 'a.filter-btn', event => {
      if ($(event.target).is('a.filter-btn')) {
        // Put button name in variable targetName
        // We want to use targetName as the only index
        // of Searchresults.filterArray when it is called
        // as an argument of Searchresults.filterRecipe()
        // on line 66 in Searchresults.class.js
        // This will render the page with the recipes 
        // corresponding to the filter only
        let targetName = $(event.target).attr('name');
        console.log(targetName);
      }
    })

  }

  

}



Recipepage.prototype.template = template;
