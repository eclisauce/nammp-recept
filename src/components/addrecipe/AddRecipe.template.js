function template() {
return `
  <article class="add-recipe container">
    <h2 class="text-primary mt-3 mt-md-4 mb-3 text-center text-md-left">Lägg till nytt recept</h2>
    <article class="mt-3 mt-md-4">
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-toggle="tooltip" data-placement="bottom" title="Information om hur receptet skall fyllas i">
          <i class="fas fa-info-circle"></i>
        </button>
        <div class="dropdown-menu info-box" aria-labelledby="dropdownMenuButton">
          <i class="fas fa-info-circle p-2"></i>
          <p class="p-2">För att underlätta fyll i alla fält.</p>
          <p class="p-2">För att ta del av de automatiska uträkningarna på näringsinnehåll fyll i en ingrediens från vår databas</p>
        </div>
      </div>
    </article>
    <form id="add-recipe-form">
      <div class="row">
        <div class="col-md-6">
          <div class="mt-3 mt-md-4 pr-md-5">
            <h5 class="text-dark">Namn på recept</h5>
            <div class="form-group m-0 w-100">
              <input type="text" class="form-control" id="recipeNameForm" name="title" placeholder="Fyll i vad ditt recept heter.">
            </div>
          </div>

          <div class="mt-3 mt-md-4 pr-md-5">
            <h5 class="text-dark">Beskrivning</h5>
            <textarea class="form-control rounded w-100" name="description" rows="3" placeholder="En kort beskrivning av ditt recept."></textarea>
          </div>
          <div class="width-768-plus">
          </div>




        </div><!-- Closses left col-6 -->

        <div class="col-md-6 pl-md-5">


          <div class="row mt-3 mt-md-4">
            <div class="col-6">
              <div class="row">
                <div class="col-12 mb-lg-0 mb-2">
                  <h6 class="d-inline text-dark vertical-align-middle">Antal portioner</h6>
                </div>
                <div class="form-group col-6 m-0 pr-0" data-toggle="tooltip" data-placement="bottom" title="Ange hur många portioner receptet avser">
                  <select class="form-control m-0" id="number-of-portions" name="portions">
                    <option selected>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option >4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-12 mb-lg-0 mb-2 pr-0">
                  <h6 class="d-inline text-dark vertical-align-middle">Tidsåtgång</h6>
                </div>
                <div class="col-6 pr-0">
                  <div class="form-group m-0">
                    <input type="text" class="form-control" name="time" id="time" aria-describedby="time" placeholder="">
                    <small id="" class="form-text text-muted text-nowrap">Ange tid i minuter.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 mt-md-4 add-ingredients-holder">
            <h5 class="mb-0 display-portions">Ingredienser för 4 portioner</h5>
            <div class="add-ingredients-holder__list my-2">

            </div>
            <button type="button" id="add-form" class="my-4 btn btn-sm d-block mx-auto btn-info">Lägg till en ny rad för ingrediens</button>
          </div>

          <div class="row">
            <div class="col-12 mt-3 instruction-container">
              <h5 class="text-dark">Instruktioner</h5>
              ${this.render('.instruction-container', 'instructionTemplate')}
            </div>
            <button type="button" id="add-instr" class="my-4 btn btn-sm d-block mx-auto btn-info">Lägg till en ny rad för ingrediens</button>
          </div>
          <div class="width-768">
          </div>

        </div> <!-- Closses right col-6 -->

      </div> <!-- Closses top div-row -->

      <div class="row mt-3 mt-md-4 mb-5 p-0"> 

        <div class="col-md-6">
          <button class="bajsbajs">testa mig</button>
        </div>

        <div class="col-md-6 pl-md-5 d-flex justify-content-between align-items-center">
          <h5 class="something-went-wrong text-danger m-0"></h5>
          <button type="submit" form="add-recipe-form" value="Submit" class="btn btn-primary btn-lg mt-5 mt-md-0 font-weight-bold">
            Spara recept
          </button>
        </div>


      </div>


    </form>
  </article>
`;
}

function ingredientTemplate() {
return `
  <div class="mb-md-4 mb-1 mb-lg-1 my-2 ingredient-form" id="ingredientInput-${this.ingredientCounter}">
    <div class="form-row">
      <div class="col-6 mb-0 mb-md-0 pt-2">
        <input type="text" name="Ingrediens" class="form-control name-ingredient-${this.ingredientCounter}" placeholder="Namn på ingrediens" data-toggle="tooltip" data-placement="bottom" title="Ange namn på ingrediens som visas i receptet">
      </div>

      <div class="col-3 pt-2">
        <input type="text" name="Antal" id="quantity" class="form-control quantity-ingredient-${this.ingredientCounter}" placeholder="antal" data-toggle="tooltip" data-placement="bottom" title="Ange antal">
      </div>
      <div class="form-group col m-0 pt-2" data-toggle="tooltip" data-placement="bottom" title="Ange vilket mått">
        <select class="form-control measurement-ingredient-${this.ingredientCounter}" name="Enhetsmått">
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
    </div>
    <div class="form-row">
      <div class="col-6 mb-0 mb-md-0 pt-2 bla">
        <input type="text" name="IngrediensnamnLivsmedelsverket" class="form-control dataname-ingredient-${this.ingredientCounter} ingredient-input" placeholder="Ingrediens i livsmedelsverket" data-toggle="tooltip" data-placement="bottom"
          title="Ange ingrediens från livsmedelsverket för att räkna ut näringsvärden">
          <ul class="list-group result-dropdown"></ul>
      </div>

      <div class="col d-flex pt-2">
        <input type="text" name="IngrediensPerGram" class="form-control grams-ingredient-${this.ingredientCounter}" placeholder="gram" data-toggle="tooltip" data-placement="bottom" title="Ange totalvikt i gram för uträkning av näringsvärde">
      </div>

      <button type="button" class="btn btn-danger delete-button align-self-center mt-2 mr-1 ml-1"
        data-toggle="tooltip" data-placement="bottom" title="Ta bort denna ingrediens"><i class="fas fa-times"></i></button>
    </div>
  </div>`;
}

function pictureUploadTemplate() {
    return `
      <img src="" class="picture-upload__img"  alt="Uppladdat recept foto"/>
    `;
  }

function instructionTemplate() {
  return `
    <div class="position-relative my-3">
      <label for="instruction-1" class="label-instr" title="Textfält för instruktion 1."><span>1</span></label>
      <textarea name="instruction-1" class="instruction form-control my-2 rounded w-100" rows="2" placeholder="1."></textarea>
      <button type="button" class="remove-instr btn btn-danger" title="Tabort denna instruktion"><i class="fas fa-times"></i></button>
    </div>
  `;
}

function categoriesTemplate() {
  return `
  <div class="mt-3 mt-md-4">
      <h5 class="text-dark m-0">Kategorier</h5>
      <small class="text-muted">Kryssa i de rutor som matchar din rätt.</small>
      <div class="row col-12 mt-3 align-items-center justify-content-between">

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Huvudrätt</p>
          <input type="checkbox" name="Huvudrätter">
          <span class="checkmark"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Festmåltider</p>
          <input type="checkbox" name="Festmåltider">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Fika</p>
          <input type="checkbox" name="Fika">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Buffé</p>
          <input type="checkbox" name="Buffé">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Grytor</p>
          <input type="checkbox" name="Grytor">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Asiatiskt</p>
          <input type="checkbox" name="Asiatiskt">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Husmanskost</p>
          <input type="checkbox" name="Husmanskost">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Italienskt</p>
          <input type="checkbox" name="Italienskt">
          <span class="checkmark border"></span>
        </label>

      </div>
    </div>

    <div class="my-3 mt-md-4">
      <h5 class="text-dark m-0">Övrigt</h5>
      <small class="text-muted">Kryssa i de rutor som matchar din rätt.</small>
      <div class="row col-12 mt-3 align-items-center justify-content-between">

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Vegetariskt</p>
          <input type="checkbox" name="Vegetariskt">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Veganskt</p>
          <input type="checkbox" name="Veganskt">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Laktosfritt</p>
          <input type="checkbox" name="Laktosfritt">
          <span class="checkmark border"></span>
        </label>

        <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
          <p>Endast kött</p>
          <input type="checkbox" name="Endast Kött">
          <span class="checkmark border"></span>
        </label>

      </div>
    </div>
  `;
}
function pictureHolderTemplate() {
  return `
  <div class="form-group m-0 w-100 pr-md-5">
    <h5 for="hrefLink">Länk till bild</h5>
    <input type="text" class="form-control" name="imgLink" id="imgLink" aria-describedby="textHelp" placeholder="https://www.exempel.com/bild.jpg">
    <small id="" class="form-text text-muted">Kom ihåg att ha med hela länken utan några förändringar
      på länken.</small>
  </div>
  
  <div class="row pr-md-5 mt-2">
      <div class="col-12 picture-upload">
        <img src="/img/placeholder-image.jpg" class="picture-upload__img"  alt="Uppladdat recept foto"/>
      </div>
  </div>
  `;
}

export {
  template,
  ingredientTemplate,
  pictureUploadTemplate,
  instructionTemplate,
  categoriesTemplate,
  pictureHolderTemplate
}
