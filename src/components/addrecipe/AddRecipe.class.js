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
      * Click outside formfield instruction for adding more instruction fields
      * @author Martin
      */
    if ($(document).find('.instruction').last().val() !== '') {
      this.renderNewInstruction();
    }

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
  * Returns number of portions selected to be displayed on h5.
  *
  */
  getSelectedPortions() {
    $('.display-portions').empty('').append(`Ingredienser för ${$('#number-of-portions').val()} portioner`);
  }

  renderNewForm() {
    this.render('.add-ingredients-holder__list', 'ingredientTemplate')
    this.ingredientCounter++;
    $('.ingredient-form').last().find('input[type="text"]').eq(0).focus()
  }

  renderNewInstruction() {
    this.instructionCounter++
    this.render('.instruction-container', 'instructionTemplate');
  }

  submitForm(e, formHtml) {
    e.preventDefault();
    let allFormData = $(formHtml).serializeArray();
    let ingredientsPerPortion = [];
    console.log(allFormData);

    // Get number of portions
    let numberOfPortions = allFormData.filter(data => data.name === 'portions')[0].value;

    // Get checked ingrediens into an array.
    let filters = allFormData.filter(data => data.value === 'on').map(filter => filter.name);
    console.log(filters);



    for (let i = 0; i < allFormData.length; i++) {
      if (allFormData[i].name == 'Ingrediens') {
        let ingredient = {};
        ingredient.name = allFormData[i].value;
        ingredient.quantity = (allFormData[i+1].value * 1) / numberOfPortions;
        ingredient.unitOfMeasurement = allFormData[i+2].value;
        ingredient.lmTitle = allFormData[i+3].value;
        ingredient.grams = (allFormData[i+4].value * 1) / numberOfPortions;

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

    // Set portions to 1
    modifiedRecipe.portions = 1;

    // Delete filter objects
    filters.forEach(filter => {
      delete modifiedRecipe[filter];
    })

    // Set filters
    modifiedRecipe.filters = filters;

    // Make time to number
    modifiedRecipe.time = modifiedRecipe.time * 1;

    // Set an imgAlt to the title.
    modifiedRecipe.imgAlt = modifiedRecipe.title;

    // JSON._save('bajs.json', modifiedRecipe).then(function(){
    //   console.log('Saved!');
    // });
    console.log(modifiedRecipe, "modified recipe obj")
    // This line of code gets all the ingredients.
    console.log(this.getAllNutritions('Potatis rå'))
    // fs.writeFile('./www/json/aa.json', req.body); // backend-code
  }


  /**
  * Gets all the nutritions needed for the recipe and adds it to an object that is returned
  *
  */
  getAllNutritions(ingredientStr){
    let ingredient = this.foodData.filter(item => {
      return item.Namn == ingredientStr;
    })[0];

    let nutrientsPerPortion = {};
    // Kcal
    nutrientsPerPortion.calories = this.getOneNutrition(ingredient, 'Energi (kcal)');
    // Carbs
    nutrientsPerPortion.carbohydrates = this.getOneNutrition(ingredient, 'Kolhydrater');
    // Protein
    // nutrientsPerPortion.protein = this.getNutrition('Potatis rå', 'Protein');
    // Salt
    nutrientsPerPortion.salt = this.getOneNutrition(ingredient, 'Salt');

    nutrientsPerPortion.fat = {};
    // Fetter: totalt fett. 
    nutrientsPerPortion.fat.total = this.getOneNutrition(ingredient, 'Fett');
    // Enkelomättat fett
    // nutrientsPerPortion.fat.monounsaturated = this.getNutrition(ingredient, 'Energi (kcal)')
    // Mättat fett
    nutrientsPerPortion.fat.saturated = this.getOneNutrition(ingredient, 'Summa mättade fettsyror')
    // Fleromättat
    // nutrientsPerPortion.fat.polyunsaturated = this.getNutrition(ingredient, 'Energi (kcal)')
    return nutrientsPerPortion;
  }


  /**
  * Finds the one nutrition we pass to the function and returns it
  *
  */
  getOneNutrition(ingredient, unit){
    return ingredient.Naringsvarden.filter(nutrition => {
      return nutrition.Namn == unit;
    })[0].Varde[0].replace(/,/gi, '.') * 1;
  }

}

AddRecipe.prototype.ingredientTemplate = ingredientTemplate;
AddRecipe.prototype.template = template;
AddRecipe.prototype.pictureUploadTemplate = pictureUploadTemplate;
AddRecipe.prototype.instructionTemplate = instructionTemplate;
