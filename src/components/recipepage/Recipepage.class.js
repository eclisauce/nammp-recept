import Base from '../../base/Base.class';
import template from './Recipepage.template';

/**
 * Recipepage in main for route '/'
 *
 */
export default class Recipepage extends Base {
  constructor() {
    super();
    this.pictureRandomizer();
  }

  /**
   * Method to randomly select a background image 
   * for the "header" of the recipe page
   * Selects image from an array and uses it as the value
   * of the background-image property
   */
  pictureRandomizer() {
    $(document).ready(function() {
      // An array of strings of background-image pictures to select from
      let backgroundPictureArray = ["url(/img/start-picture.jpg)", "url(/img/recept-cover.jpeg)", "url(/img/recept-cover-2.jpg)", "url(/img/recept-cover-3.jpg)"];
      // Get a random number 0 - 3 (inclusive)
      let randomNumber = Math.floor(Math.random() * 4);
      // Select background-image from array using randomNumber as index
      let recipeBackgroundPicture = backgroundPictureArray[randomNumber];
      // Insert chosen background-image as value to the background-image property
      $('.recipe-top-part-2').css('background-image', recipeBackgroundPicture);
    })
  }

}

Recipepage.prototype.template = template;