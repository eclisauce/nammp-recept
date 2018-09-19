import data from '../../base/JsonLoad.class';
import Base from '../../base/Base.class';
import template from './Recipepage.template';



/**
 * Recipepage in main for route '/'
 *
 */
export default class Recipepage extends Base {
  constructor() {
    super();
  }

  click() {
    if ($(event.target).hasClass('testy')) {
      this.getRecipe("Tikka Masala");

      $('.instruction-list').append(this.getInstructions(this.recipe));
    }
  }

  /**
   * Finding a recipe by its title
   *
   */
  getRecipe(str){
    this.recipe = data.recipes.filter(recipe => recipe.name === str);
  }

  getInstructions(){
    return this.recipe.instructions.map(instruction => {
      console.log(instruction);
    })


  }


}

Recipepage.prototype.template = template;