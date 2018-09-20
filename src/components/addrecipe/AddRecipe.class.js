import Base from '../../base/Base.class';
import {
  template,
  ingredientTemplate,
  pictureUploadTemplate,
  instructionTemplate
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
    this.instructionCounter = 1;
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

  keydown() {
      /**
      * Keyup on tab for adding more instruction fields
      * @author Martin
      */
    if ($(event.target).hasClass('instruction')
        && $(event.target).val() !== ''
        && (event.keyCode == 9 || event.which == 9)
      ) {
     this.renderNewInstruction();
    }

  }

  /**
   * Eventhandler for adding/removing ingredient-forms
   */
  eventHandler() {
    $(document).on('change', '#number-of-portions', () => {
      this.getSelectedPortions();
    });
    let that = this;
    $(document).on('submit', 'form', function(e) {
      that.submitForm(e, this)
    });

    /**
    * Handle checkboxes focus on tab will 'hover' the styled checkbox
    @author Martin
    */
    $(document).on('focus', 'input[type="checkbox"]', function(e) {
          $(event.target).siblings('span').addClass('border-checkbox-hover');
      }
    );
    $(document).on('blur', 'input[type="checkbox"]', function(e) {
          $(event.target).siblings('span').removeClass('border-checkbox-hover');
      }
    );
  }


  click() {
    /**
    * Click on #add-instr to add more instructionfields
    * @author Martin
    */
    if($(event.target).attr('id') === 'add-instr') {
      this.renderNewInstruction();
    }

    /**
    * Click on #remove-instr to delete current instructionfield
    * @author Martin
    */
    if($(event.target).hasClass('remove-instr') || $(event.target).parent().hasClass('remove-instr')) {
      if(event.toElement.nodeName === 'I') {
        $(event.target).parent().parent().fadeOut('slow', function() {
          $(this).remove();
        });
      } else {
        $(event.target).parent().fadeOut('slow', function() {
          $(this).remove();
        });
      }
    }

    /**
    * Test purpop
    * @author Andy / Niklas
    */
    if ($(event.target).attr('id') == 'test') {
      this.checkIfFormsAreFilled();
    }


    /**
    * Delete button - Deletes ingredient row when clicked
    * @author Martin
    */
    if($(event.target).hasClass('delete-button') || $(event.target).parent().hasClass('delete-button')) {
      if(event.toElement.nodeName === 'I') {
        $(event.target).parent().parent().parent().fadeOut('slow', function() {
          $(this).remove();
        });
      } else {
        $(event.target).parent().parent().fadeOut('slow', function() {
          $(this).remove();
        });
      }
    }

    /**
    * Button for adding a new line of ingredient
    * @author Martin
    */
    $(event.target).attr('id') === 'add-form' ? this.renderNewForm() : null ;
  }


  /**
  * Rendering number of portions selected to be displayed on h5.
  * @author Andy
  */
  getSelectedPortions() {
    $('.display-portions').empty('').append(`Ingredienser för ${$('#number-of-portions').val()} portioner`);
  }

  /**
  * Rendering new form for Ingredient. Also autofocus the new Ingredientfield rendered
  * @author Andy / Martin
  */
  renderNewForm() {
    this.render('.add-ingredients-holder__list', 'ingredientTemplate')
    this.ingredientCounter++;
    if (this.ingredientCounter > 3) {
      $('.ingredient-form').last().find('input[type="text"]').eq(0).focus();
    }
  }

  /**
  * Rendering new formfield for Instruction. Warns if last field is empty
  *
  */
  renderNewInstruction() {
    $('.instr-warning').remove();
    if($(document).find('.instruction').last().val() !== '') {
      this.instructionCounter++
      this.render('.instruction-container', 'instructionTemplate');
    } else {
      let that = this;
      $(document).find('.instruction-container').append(`<div class="instr-warning">Du måste fylla i fältet för Instruktion ${that.instructionCounter} först.`)
    }
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
AddRecipe.prototype.instructionTemplate = instructionTemplate;
