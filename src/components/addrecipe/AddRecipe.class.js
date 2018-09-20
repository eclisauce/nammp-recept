import Base from '../../base/Base.class';
// import template from './AddRecipe.template';
import {
  template,
  ingredientTemplate,
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
    this.ingredientCounter = 0;
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
   */
  eventHandler() {
    $(document).on('change', '#number-of-portions', () => {
      this.getSelectedPortions();
    });
    // let that = this;
    // $(document).on('submit', 'form', function(e) {
    //   that.submitForm(e, this)
    // });
  }

  click() {
    /**
    * Delete button - Deletes ingredient row when clicked
    * @author Martin
    */
    $(event.target).hasClass('delete-button') ? $(event.target).parent().parent().remove() : null;

    /**
    * Button for adding a new line of ingredient
    * @author Martin
    */
    $(event.target).attr('id') === 'add-form' ? this.renderNewForm() : null ;
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
    this.render('.add-ingredients-holder__list', 'ingredientTemplate')
    this.ingredientCounter++;
  }

  submitForm(e, formHtml) {
    e.preventDefault();
    let allFormData = $(formHtml).serializeArray();
    let ingredientsPerPortion = [];

    for (let i = 0; i < allFormData.length; i++) {
      if (allFormData[i].name == 'Ingrediens') {
        let ingredient = {};
        ingredient.name = allFormData[i].value;
        ingredient.quantity = allFormData[i+1].value;
        ingredient.unitOfMeasurement = allFormData[i+2].value;
        ingredient.lmTitle = allFormData[i+3].value;
        ingredient.grams = allFormData[i+4].value;

        ingredientsPerPortion.push(ingredient);
      }

    }

    let modifiedRecipe = allFormData.reduce((obj, current)=>{
      obj[current.name] = current.value;
      return obj;
    }, {});

    delete modifiedRecipe.Ingrediens;
    delete modifiedRecipe.Antal;
    delete modifiedRecipe.Enhetsmått;
    delete modifiedRecipe.IngrediensPerGram;
    delete modifiedRecipe.IngrediensnamnLivsmedelsverket;

    modifiedRecipe.ingredientsPerPortion = ingredientsPerPortion;

    console.log(modifiedRecipe, "modified recipe obj")


    // fs.writeFile('./www/json/aa.json', req.body); // backend-code
  }

}

AddRecipe.prototype.ingredientTemplate = ingredientTemplate;
AddRecipe.prototype.template = template;
AddRecipe.prototype.pictureUploadTemplate = pictureUploadTemplate;
