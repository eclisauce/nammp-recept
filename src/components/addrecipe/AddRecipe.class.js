import Base from '../../base/Base.class';
import {
  template,
  ingredientTemplate,
  pictureUploadTemplate,
  instructionTemplate
} from './AddRecipe.template';
import { doesNotThrow } from 'assert';

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
    if ($(event.target).hasClass('instruction') &&
      $(event.target).val() !== '' &&
      (event.keyCode == 9 || event.which == 9)
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
    $(document).on('submit', 'form', function (e) {
      that.submitForm(e, this)
    });

    /**
    * Handle checkboxes focus on tab will 'hover' the styled checkbox
    @author Martin
    */
    $(document).on('focus', 'input[type="checkbox"]', function (e) {
      $(event.target).siblings('span').addClass('border-checkbox-hover');
    });
    $(document).on('blur', 'input[type="checkbox"]', function (e) {
      $(event.target).siblings('span').removeClass('border-checkbox-hover');
    });
  }


  keyup(){
    if ($(event.target).is('input, textarea')){
      $(event.target).removeClass('red-border');
    }
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
    if ($(event.target).hasClass('delete-button') || $(event.target).parent().hasClass('delete-button')) {
      if (event.toElement.nodeName === 'I') {
        $(event.target).parent().parent().parent().fadeOut('slow', function () {
          $(this).remove();
        });
      } else {
        $(event.target).parent().parent().fadeOut('slow', function () {
          $(this).remove();
        });
      }
    }

    /**
     * Button for adding a new line of ingredient
     * @author Martin
     */
    $(event.target).attr('id') === 'add-form' ? this.renderNewForm() : null;
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


  // Submit form and build object to send to JSON.
  submitForm(e, formHtml) {
    e.preventDefault();
    let allFormData = $(formHtml).serializeArray();
    console.log(allFormData);
    this.checkIfExistsInDatabase(allFormData)

    let ingredientsPerPortion = [];

    // Get number of portions
    let numberOfPortions = allFormData.filter(data => data.name === 'portions')[0].value;

    // Get checked filters into an array.
    let filters = allFormData.filter(data => data.value === 'on').map(filter => filter.name);

    // Filter instructions, get the values in the instructions, remove undefined or empty string
    let instructions = allFormData.filter(data => data.name === 'instruction').map(ins => ins.value).filter(ins => ins !== "" || undefined);


    for (let i = 0; i < allFormData.length; i++) {
      if (allFormData[i].name == 'Ingrediens') {
        let ingredient = {};
        ingredient.name = allFormData[i].value;
        ingredient.quantity = (allFormData[i + 1].value * 1) / numberOfPortions;
        ingredient.unitOfMeasurement = allFormData[i + 2].value;
        ingredient.lmTitle = allFormData[i + 3].value;
        ingredient.grams = (allFormData[i + 4].value * 1) / numberOfPortions;
        ingredientsPerPortion.push(ingredient);
      }
    }

    let modifiedRecipe = allFormData.reduce((obj, current) => {
      obj[current.name] = current.value;
      return obj;
    }, {});



    delete modifiedRecipe.Ingrediens;
    delete modifiedRecipe.Antal;
    delete modifiedRecipe.Enhetsmått;
    delete modifiedRecipe.IngrediensPerGram;
    delete modifiedRecipe.IngrediensnamnLivsmedelsverket;
    delete modifiedRecipe.instruction;
    delete modifiedRecipe.portions;

    modifiedRecipe.ingredientsPerPortion = ingredientsPerPortion;

    // Set portions to 1
    modifiedRecipe.portions = 1;

    // Delete filter objects
    filters.forEach(filter => {
      delete modifiedRecipe[filter];
    })

    // Set instructions
    modifiedRecipe.instructions = instructions;

    // Set filters
    modifiedRecipe.filters = filters;

    // Set an imgAlt to the title.
    modifiedRecipe.imgAlt = modifiedRecipe.title;

    // Make time to number
    modifiedRecipe.time = modifiedRecipe.time * 1;



    // Get full nutrition mother fuckkcccaass
    let allNutritionsArray = modifiedRecipe.ingredientsPerPortion.map(val => {
      if(val.lmTitle) {return this.getAllNutritions(val.lmTitle, val.grams)};
    }).filter(nut => nut !== undefined);

    // This is a reducer function that adds everything in an array.
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    modifiedRecipe.nutrientsPerPortion = {};
    modifiedRecipe.nutrientsPerPortion.calories = allNutritionsArray.map(val => val.calories).reduce(reducer)
    modifiedRecipe.nutrientsPerPortion.carbohydrates = allNutritionsArray.map(val => val.carbohydrates).reduce(reducer);
    modifiedRecipe.nutrientsPerPortion.protein = allNutritionsArray.map(val => val.protein).reduce(reducer);
    modifiedRecipe.nutrientsPerPortion.salt = allNutritionsArray.map(val => val.salt).reduce(reducer);
    modifiedRecipe.nutrientsPerPortion.fat = {};
    modifiedRecipe.nutrientsPerPortion.fat.monounsaturated = allNutritionsArray.map(val => val.fat.monounsaturated).reduce(reducer);
    modifiedRecipe.nutrientsPerPortion.fat.saturated = allNutritionsArray.map(val => val.fat.saturated).reduce(reducer);
    modifiedRecipe.nutrientsPerPortion.fat.polyunsaturated = allNutritionsArray.map(val => val.fat.polyunsaturated).reduce(reducer);
    modifiedRecipe.nutrientsPerPortion.fat.total = allNutritionsArray.map(val => val.fat.total).reduce(reducer);


    JSON._save('test-recipes.json', modifiedRecipe).then(function(){
      console.log('Saved!');
    });
    console.log(modifiedRecipe, "modified recipe obj")
    // This line of code gets all the ingredients.
    // fs.writeFile('./www/json/aa.json', req.body); // backend-code
  }

  // Will check if everything has value and if not, throw error through more methods
  checkIfEverythingHasValue(allFormData){
    let emptyValueArray = allFormData.filter(form => form.value === "");
    console.log(emptyValueArray);
    if (emptyValueArray.length === 0){
      $('.something-went-wrong').empty();
      // Call exists in database
    } else {
      $('form input, textarea').each(function(){
        if($(this).val() == ""){
          $(this).addClass('red-border');

          $('.something-went-wrong').empty().append('Alla fält måste vara ifyllda!');
        }
      })
    }
  }

  /**
  * Creates recipe Url from String
  * @author Martin
  */
  createRecipeUrl(str) {
    str = str.toLowerCase()
             .replace(/[^a-zA-Z ]/g, '')
             .replace(/å|ä/g, 'a')
             .replace(/ö/g, 'o')
             .replace(/\s/g, '');
    return `${str.slice(0,15)}-${Date.now()}`;
  }
  
  checkIfExistsInDatabase(allFormData){
    // Get all ingredients thats suppose to exist in database
    let ingredientsLm = allFormData.filter(data => {
      if(data.name === "IngrediensnamnLivsmedelsverket") {
        return true;
      }
    });


    // Trying to loop out and compare ingredients lm to fooddata
    let tempArr = []
    ingredientsLm.forEach(x => {
      if(this.existInDatabase(x.value)){
      } else {
        tempArr.push(x);
      }
    })

    ingredientsLm = tempArr;

    // If all is found then ingredientsLm will be 0. 
    if(ingredientsLm.length === 0){
      // call numbercheck
    } else {


      let lmInputs = $('input[name="IngrediensnamnLivsmedelsverket"]');

      ingredientsLm.forEach(x => {
        for (let i = 0; i < lmInputs.length; i++){
          if(lmInputs.eq(i).val() == x.value) {
            $(lmInputs.eq(i)).addClass('red-border');

            $('.something-went-wrong').empty().append('Alla ingredienser finns inte i databasen!');
          }
        }
      })
    }

    console.log(ingredientsLm)
  }




  checkIfNumbers(allFormData){
    let numbersOnlyArray = allFormData.filter(form => {
      if(form.name == "time" || form.name == "Antal" || form.name == "IngrediensPerGram"){
        return form;
      };
    }).map(numVal => numVal.value * 1);

    console.log(numbersOnlyArray.filter(x => !isNaN(x) && x !== 0))

    console.log(numbersOnlyArray);

  }



  /**
   * Gets all the nutritions needed for the recipe and adds it to an object that is returned
   * @author Andy
   */
  getAllNutritions(ingredientStr, grams) {
    let ingredient = this.foodData.filter(item => {
      return item.Namn == ingredientStr;
    })[0];

    console.log(grams);

    let nutrientsPerPortion = {};
    // Kcal
    nutrientsPerPortion.calories = this.getOneNutrition(ingredient, 'Energi (kcal)') * grams / 100;
    // Carbs
    nutrientsPerPortion.carbohydrates = this.getOneNutrition(ingredient, 'Kolhydrater') * grams / 100;
    // Protein
    nutrientsPerPortion.protein = this.getOneNutrition(ingredient, 'Protein') * grams / 100;
    // Salt
    nutrientsPerPortion.salt = this.getOneNutrition(ingredient, 'Salt') * grams / 100;

    nutrientsPerPortion.fat = {};
    // Fetter: totalt fett.
    nutrientsPerPortion.fat.total = this.getOneNutrition(ingredient, 'Fett') * grams / 100;
    // Enkelomättat fett
    nutrientsPerPortion.fat.monounsaturated = this.getOneNutrition(ingredient, 'Summa enkelomättade fettsyror') * grams / 100;
    // Mättat fett
    nutrientsPerPortion.fat.saturated = this.getOneNutrition(ingredient, 'Summa mättade fettsyror') * grams / 100;
    // Fleromättat
    nutrientsPerPortion.fat.polyunsaturated = this.getOneNutrition(ingredient, 'Summa fleromättade fettsyror') * grams / 100;

    return nutrientsPerPortion;
  }


  /**
   * Finds the one nutrition we pass to the function and returns it
   *
   */
  getOneNutrition(ingredient, unit) {
    return ingredient.Naringsvarden.filter(nutrition => {
      return nutrition.Namn == unit;
    })[0].Varde.replace(/,/gi, '.');
  }

  existInDatabase(str){
    return this.foodData.some(x => x.Namn == str);
  }

}

AddRecipe.prototype.ingredientTemplate = ingredientTemplate;
AddRecipe.prototype.template = template;
AddRecipe.prototype.pictureUploadTemplate = pictureUploadTemplate;
AddRecipe.prototype.instructionTemplate = instructionTemplate;
