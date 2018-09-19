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
      // An array of background-image pictures to select from
      let backgroundPictureArray = ["url(/img/start-picture.jpg)", "url(/img/recept-cover.jpeg)"];
      // Get a random number 0 - 1 (inclusive) to pick an image in the array
      let randomNumber = Math.floor(Math.random() * 2);
      // Select background-image from array
      let recipeBackgroundPicture = backgroundPictureArray[randomNumber];
      // Insert chosen background-image as value to the background-image property
      $('.recipe-top-part-2').css('background-image', recipeBackgroundPicture);
    })
  }

}

Recipepage.prototype.template = template;