import Base from '../../base/Base.class';
import template from './AddRecipe.template';

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

  template() {
    return template;
  }


   /**
   * Eventhandler for adding/removing ingredient-forms
   *
   */
  eventHandler(){
    $(document).on('click', '#add-form', () => {
      this.addMoreIngredients();
    })

    $(document).on('click', '.delete-button', function(e) {
      e.preventDefault();
      let formNumber = `form-${$(this).data('deleteButtonId')}`;
      $(`#${formNumber}`).remove();
    })

    $(document).on('change', '#number-of-portions', () => {
      this.getSelectedPortions();
    });



  }
  
  /**
   * Add more ingredient-filling-forms
   *
   */
  addMoreIngredients(){
    $('.add-ingredients-holder').append(this.ingredientsFormTemplate());
    this.formCounter++;
  }

  /**
   * Ingredient-form-template
   *
   */
  ingredientsFormTemplate(){
    return `<form class="mb-md-4 mb-1 mb-lg-1" id="form-${this.formCounter}">
    <div class="form-row">
      <div class="col-12 col-sm-5 col-md-12 col-lg-4 mb-0 mb-md-0 pt-2">
        <input type="text" class="form-control" placeholder="Ingrediens" data-toggle="tooltip" data-placement="bottom"
          title="Ange vilken ingrediens">
      </div>

      <div class="col-3 col-sm-2 col-md-3 col-lg-2 pt-2">
        <input type="text" class="form-control" placeholder="antal" data-toggle="tooltip" data-placement="bottom"
          title="Ange antal">
      </div>
      <div class="form-group col-auto m-0 pt-2" data-toggle="tooltip" data-placement="bottom" title="Ange vilket mått">
        <select class="form-control" id="">
          <option>st</option>
          <option>krm</option>
          <option>tsk</option>
          <option>msk</option>
          <option>ml</option>
          <option>cl</option>
          <option>dl</option>
          <option>liter</option>
          <option>mg</option>
          <option>g</option>
          <option>hg</option>
          <option>kg</option>
        </select>
      </div>
      <div class="col d-flex pt-2">
        <input type="text" class="form-control" placeholder="gram" data-toggle="tooltip" data-placement="bottom"
          title="Ange totalvikt i gram för uträkning av näringsvärde">
      </div>

      <button data-delete-button-id="${this.formCounter}" class="delete-button align-self-center mt-2 mr-1 ml-1 btn-danger" data-toggle="tooltip"
        data-placement="bottom" title="Ta bort denna ingrediens"><i class="fas fa-times"></i></button>

      </div>
    </form>`
  }

  /**
   * Returns number of portions selected to be displayed on h5.
   *
   */
  getSelectedPortions() {
    $('.display-portions').empty('').append(`Ingredienser för ${$('#number-of-portions').val()} portioner`);
  }

}