import Base from '../../base/Base.class';
// import template from './AddRecipe.template';
import {
  template,
  template2,
  pictureUploadTemplate
} from './AddRecipe.template';

/**
 * Startpage in main for route '/'
 *
 */
export default class AddRecipe extends Base {

  constructor() {
    super();
    this.eventHandler();
    this.formCounter = 0;
    this.checkIfFormsAreFilled()
  }

  change() {
    /**
    * Eventhandler to check if picture url is valid and displays preview
    * @author Martin
    */
    if ($(event.target).attr('id') == 'imageLink') {
      $('.picture-upload').empty();

      const url = $(event.target).val();
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;

      if (url.match(regex)) {
        this.render('.picture-upload', 'pictureUploadTemplate');
        $(document).find('.picture-upload__img').attr('src', url);
      }
    }

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
      this.renderNewForm();
    }
    if ($(event.target).attr('id') == 'test') {
      this.checkIfFormsAreFilled();
    }
  }


  /**
   * Returns number of portions selected to be displayed on h5.
   *
   */
  getSelectedPortions() {
    $('.display-portions').empty('').append(`Ingredienser för ${$('#number-of-portions').val()} portioner`);
  }

  checkIfFormsAreFilled() {
    let kalle = $('.ingredient-form');
    let koala = kalle.length;
    let trueOrFalse = true;
    let array = ['name', 'quantity', 'measurement', 'dataname', 'grams']

    for (let i = 0; i < koala; i++) {
      for (let j = 0; j < array.length; j++) {
        if ($(`.${array[j]}-ingredient-${i}`).val() == '') {
          trueOrFalse = false;
        }
      }
    }

    if (trueOrFalse) {
      this.renderNewForm();
    }
  }

  renderNewForm() {
    this.render('.add-ingredients-holder', 'template2')
    this.formCounter++;
  }

}

AddRecipe.prototype.template2 = template2;
AddRecipe.prototype.template = template;
AddRecipe.prototype.pictureUploadTemplate = pictureUploadTemplate;
