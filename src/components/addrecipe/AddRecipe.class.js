import Base from '../../base/Base.class';
// import template from './AddRecipe.template';
import {
  template,
  template2
} from './AddRecipe.template';

/**
 * Startpage in main for route '/'
 *
 */
export default class AddRecipe extends Base {

  constructor() {
    super();
    this.eventHandler();
    this.formCounter = 1;

  }


  /**
   * Eventhandler for adding/removing ingredient-forms
   *
   */
  eventHandler() {
    $(document).on('click', '.delete-button', function(e) {
      e.preventDefault();
      let formNumber = `form-${$(this).data('deleteButtonId')}`;
      $(`#${formNumber}`).remove();
    })

    $(document).on('change', '#number-of-portions', () => {
      this.getSelectedPortions();
    });
  }

  click() {
    if ($(event.target).attr('id') == 'add-form') {
      this.render('.add-ingredients-holder', 'template2')
      this.formCounter++;
    }
  }


  /**
   * Returns number of portions selected to be displayed on h5.
   *
   */
  getSelectedPortions() {
    $('.display-portions').empty('').append(`Ingredienser för ${$('#number-of-portions').val()} portioner`);
  }

}

AddRecipe.prototype.template2 = template2;
AddRecipe.prototype.template = template;