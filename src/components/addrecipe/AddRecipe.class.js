import Base from '../../base/Base.class';
import {
  template,
  ingredientTemplate,
  pictureUploadTemplate,
  instructionTemplate,
  categoriesTemplate,
  pictureHolderTemplate
} from './AddRecipe.template';
import {
  doesNotThrow
} from 'assert';

/**
 * Startpage in main for route '/'
 *
 */
export default class AddRecipe extends Base {

  constructor() {
    super();
    this.eventHandler();
    this.str;
    this.ingredientCounter = 0;
    window.onresize = () => {
      this.checkSizeWindowAndAppend();
    };
  }

  /**
   * autocomplete method and sorting
   * needs more added to it?
   *@author Markus
   */
  autoComplete(str) {
    //   if(str.length < 3){
    //   return new Error('You must send a str with >= 3 letters');
    // }
    str = str.toLowerCase();
    return this.foodData.filter(x => x.Namn.toLowerCase().includes(str)).map(x => x.Namn).sort((a, b) => {

      // advanced
      // prioritize when finding the str
      // as a separate word
      let aIsSeparateWord = (' ' + a + ' ').toLowerCase().includes(' ' + str + ' ');
      let bIsSeparateWord = (' ' + b + ' ').toLowerCase().includes(' ' + str + ' ');

      // prioritize str early in name
      let aPos = a.toLowerCase().indexOf(str) - (
        aIsSeparateWord
        ? 1000
        : 0);
      let bPos = b.toLowerCase().indexOf(str) - (
        bIsSeparateWord
        ? 1000
        : 0);

      if (aPos === bPos) {
        // if same position
        // sort alphabetically by name
        return a < b
          ? -1
          : 1;
      }

      return aPos < bPos
        ? -1
        : 1;
    });
  }

  change() {
    /**
     * Eventhandler to check if picture url is valid and displays preview
     * @author Martin
     */
    if ($(event.target).attr('id') == 'imgLink') {
      let emptyAndUpload = (renderUrl) => {
        $('.picture-upload').empty();
        this.render('.picture-upload', 'pictureUploadTemplate');
        $(document).find('.picture-upload__img').attr('src', renderUrl);
      }
      emptyAndUpload('/img/placeholder-image.jpg');


      const url = $(event.target).val();
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;

      if (url.match(regex)) {
        emptyAndUpload(url)

      }
    }

  }

  keydown() {
    /**
      * Keyup on tab for adding more instruction fields
      * @author Martin
      */
    if ($(event.target).hasClass('instruction') && $(event.target).val() !== '' && (event.keyCode == 9 || event.which == 9)) {
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
     * jQuery code for handeling the input from user displaying the list from json and autocompletes
     * @author Markus
     */
    $(document).on('keyup', '.ingredient-input', function() {
      let str = $(this).val();
      let ul = $(this).parent().find('.result-dropdown');
      ul.empty();
      let foodItems = that.autoComplete(str).splice(0, 15);
      for (let foodItem of foodItems) {
        ul.append(`<li class="list-group-item list-item">${foodItem}</li>`);
      }

    });

    /**
     * Allows us to defocus the input field if clicked outside of interval
     *
     *@author Markus
     */
    $(document).on('click', 'main', () => {
      $(".result-dropdown").html('');
    })

    /**
     * function to pick  an item from the list and put it in the input field
     *
     *@author Markus
     */
    $(document).on('click', '.list-item', function() {
      let inputField = $(this);
      $(this).parent().siblings('.ingredient-input').val($(event.target).text());

    });

    /**
    * Handle checkboxes focus on tab will 'hover' the styled checkbox
    @author Martin
    */
    $(document).on('focus', 'input[type="checkbox"]', function(e) {
      $(event.target).siblings('span').addClass('border-checkbox-hover');
    });
    $(document).on('blur', 'input[type="checkbox"]', function(e) {
      $(event.target).siblings('span').removeClass('border-checkbox-hover');
    });
  }


  keyup() {
    if ($(event.target).is('input, textarea')) {
      $(event.target).removeClass('red-border');
    }
  }

  /**
  * Recalculate the Instructions index
  * @author Martin
  */
  recalculateInstructionIndex() {
    const $labels = $('.label-instr');
    $labels.each(function(i)  {
      i = i === 0 ? 1 : i + 1;
      $(this).text(i).parent().attr('for', `ìnstruction-${i}`).attr('title', `Textfält för instruktion ${i}.`).find('.instruction').attr('placeholder', `${i}.`).attr('name', `instruction-${i}`);
    });
  }

  click() {
    /**
    * Click on #add-instr to add more instructionfields
    * @author Martin
    */
    if ($(event.target).attr('id') === 'add-instr') {
      this.renderNewInstruction();
    }

    /**
    * Click on remove-instr to delete current instructionfield
    * @author Martin
    */
    if ($(event.target).hasClass('remove-instr') && $('.instruction').length > 1 || $(event.target).parent().hasClass('remove-instr') && $('.instruction').length > 1 ) {
      let instance = this;
      if (event.toElement.nodeName === 'I') {
        $(event.target).parent().parent().fadeOut('slow', function() {
          $(this).remove();
          instance.recalculateInstructionIndex();
        });
      } else {
        $(event.target).parent().fadeOut('slow', function () {
          $(this).remove();
          instance.recalculateInstructionIndex();
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
        $(event.target).parent().parent().parent().fadeOut('slow', function() {
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
    $(event.target).attr('id') === 'add-form'
      ? this.renderNewForm()
      : null;
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
    if ($(document).find('.instruction').last().val() !== '') {
      this.render('.instruction-container', 'instructionTemplate');
    } else {
      let that = this;
      $(document).find('.instruction-container').append(`<div class="instr-warning">Du måste fylla i fältet för Instruktion ${$('.instruction').length} först.`)
    }
    this.recalculateInstructionIndex();
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


  // Submit form and build object to send to JSON.
  submitForm(e, formHtml) {
    e.preventDefault();
    let allFormData = $(formHtml).serializeArray();
    if (this.doAllChecks(allFormData)) {

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

      // Set url
      modifiedRecipe.url = this.createRecipeUrl(modifiedRecipe.title);




      // Get full nutrition mother fuckkcccaass
      let allNutritionsArray = modifiedRecipe.ingredientsPerPortion.map(val => {
        if (val.lmTitle) {
          return this.getAllNutritions(val.lmTitle, val.grams)
        };
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

      this.saveAllRecipes(modifiedRecipe);
    }
  }





  /**
   * Does all the checks and gives an error on each check if it doesnt apply
   * Checks in the order of the if-statement
   * If everything is ok it returns true and submitForm() saves the recipe.
   * @author Andy
   */
  doAllChecks(allFormData){
    if(
      this.checkIfEverythingHasValue(allFormData)
      &&
      this.checkIfExistsInDatabase(allFormData)
      &&
      this.checkIfNumbers(allFormData)
      && 
      this.checkIfFilterSelected(allFormData)
    ) {
      return true;
    }
  }


  /**
   * Receives all form data and checks if everything is filled out.
   * If everything is filled out it calls the next method.
   * Else it writes a error msg and makes a red border where the error is.
   * @author Andy
   */
  checkIfEverythingHasValue(allFormData) {
    let emptyValueArray = allFormData.filter(form => form.value === "");
    if (emptyValueArray.length === 0) {
      $('.something-went-wrong').empty();
      return true;
    } else {
      $('form input, textarea').each(function () {
        if ($(this).val() == "") {
          $(this).addClass('red-border');

          $('.something-went-wrong').empty().append('Alla fält måste vara ifyllda!');
        }
      })
      return false;
    }
  }

  /**
   * Receive a string and checks if that string exist in names of database.
   * Returns true if it's found and false if it isn't found.
   * @author Andy
   */
  existInDatabase(str) {
    return this.foodData.some(x => x.Namn == str);
  }

  /**
   * Receives all form data and checks if everything is in the database.
   * If everything is in the database it calls next function
   * Else it writes a error msg and makes a red border where the error is.
   * @author Andy
   */
  checkIfExistsInDatabase(allFormData) {
    // Get all ingredients thats suppose to exist in database
    let ingredientsLm = allFormData.filter(data => {
      if (data.name === "IngrediensnamnLivsmedelsverket") {
        return true;
      }
    });


    // Trying to loop out and compare ingredients lm to fooddata
    let tempArr = []
    ingredientsLm.forEach(x => {
      if (!this.existInDatabase(x.value)) {
        tempArr.push(x);
      }
    })

    ingredientsLm = tempArr;

    // If all is found then ingredientsLm will be 0. 
    if (ingredientsLm.length === 0) {
      $('.something-went-wrong').empty();
      return true;
    } else {
      let lmInputs = $('input[name="IngrediensnamnLivsmedelsverket"]');
      ingredientsLm.forEach(x => {
        for (let i = 0; i < lmInputs.length; i++) {
          if (lmInputs.eq(i).val() == x.value) {
            $(lmInputs.eq(i)).addClass('red-border');

            $('.something-went-wrong').empty().append('Alla ingredienser finns inte i databasen!');
          }
        }
      })
      return false;
    }
  }


  /**
   * Receives all form data and checks if some inputs are numbers.
   * If they are then it calls the next function
   * Else it writes a error msg and makes a red border where the error is.
   * @author Andy
   */
  checkIfNumbers(allFormData) {
    let numbersOnlyArray = allFormData.filter(form => {
      if (form.name == "time" || form.name == "Antal" || form.name == "IngrediensPerGram") {
        return form;
      };
    });

    let isNumbers = numbersOnlyArray.map(numVal => numVal.value * 1);
    let isNotNumberArr = [];
    isNumbers.forEach((x, index) => {
      if (!(!isNaN(x) && x !== 0)) {
        isNotNumberArr.push(numbersOnlyArray[index]);
      }
    })

    if (isNotNumberArr.length === 0) {
      // Call next function
      $('.something-went-wrong').empty();
      return true;
    } else {

      let numberInput = $('input[name="time"], input[name="Antal"], input[name="IngrediensPerGram"]');

      isNotNumberArr.forEach(x => {
        for (let i = 0; i < numberInput.length; i++) {
          if (numberInput.eq(i).val() == x.value) {
            $(numberInput.eq(i)).addClass('red-border');

            $('.something-went-wrong').empty().append('Var vänlig kontrollera att du matat in nummer på rätt ställe!');
          }
        }
      })
      return false;
    }
  }

  checkIfFilterSelected(allFormData) {
    let filters = allFormData.filter(data => data.value === 'on').map(filter => filter.name);
    if (filters.length > 0) {
      $('.something-went-wrong').empty();
      return true;
    } else {
      $('.something-went-wrong').empty().append('Var snäll välj en kategori!');
      return false;
    }
  }



  /**
   * Receives all the nutritions needed for the recipe and adds it to an object that is returned
   * @author Andy
   */
  getAllNutritions(ingredientStr, grams) {
    let ingredient = this.foodData.filter(item => {
      return item.Namn == ingredientStr;
    })[0];

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

  /**
  * Listen to change on window-size and appending where it should be. 
  *
  */
  checkSizeWindowAndAppend(){
    $('.width-768').empty();
    $('.width-768-plus').empty();
    if($(document).width() < 768) {
      $('.width-768-plus').empty();
      this.render('.width-768', 'pictureHolderTemplate');
      this.render('.width-768', 'categoriesTemplate');
    } else {
      this.render('.width-768-plus', 'categoriesTemplate');
      this.render('.width-768-plus', 'pictureHolderTemplate');
    }
  }

}

AddRecipe.prototype.ingredientTemplate = ingredientTemplate;
AddRecipe.prototype.template = template;
AddRecipe.prototype.pictureUploadTemplate = pictureUploadTemplate;
AddRecipe.prototype.instructionTemplate = instructionTemplate;
AddRecipe.prototype.categoriesTemplate = categoriesTemplate;
AddRecipe.prototype.pictureHolderTemplate = pictureHolderTemplate;