function template() {
return `
  <article class="add-recipe container">
    <h2 class="text-primary mt-3 mt-md-4 mb-3 text-center text-md-left">Lägg till nytt recept</h2>
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

          <div class="mt-3 mt-md-4">
            <h5 class="text-dark m-0">Kategorier</h5>
            <small class="text-muted">Kryssa i de rutor som matchar din rätt.</small>
            <div class="row col-12 mt-3 align-items-center justify-content-between">

              <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
                <p>Huvudrätt</p>
                <input type="checkbox" name="Huvudrätter">
                <span class="checkmark border"></span>
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
            <h5 class="mb-0 display-portions">Ingredienser för 4 portioner</h5><button id="add-form">Add</button>
            <button id="test">test</button>
          </div>

          <div class="row">
            <div class="col-12 mt-3">
              <h5 class="text-dark">Instruktioner</h5>
              <textarea name="instruction-${this.counter}" class="form-control my-2 rounded w-100" rows="2" placeholder="1."></textarea>
            </div>
          </div>
        </div> <!-- Closses right col-6 -->

      </div> <!-- Closses top div-row -->

      <div class="row mt-3 mt-md-4 mb-5 p-0">

        <div class="col-md-6">
          <div class="form-group m-0 w-100 pr-md-5">
            <h5 for="hrefLink">Länk till bild</h5>
            <input type="text" class="form-control" name="imageLink" id="imageLink" aria-describedby="textHelp" placeholder="https://www.exempel.com/bild.jpg">
            <small id="" class="form-text text-muted">Kom ihåg att ha med hela länken utan några förändringar
              på länken.</small>
          </div>
        </div>

        <div class="col-md-6">
          <button type="submit" form="add-recipe-form" value="Submit" class="btn btn-primary btn-lg d-block float-md-right float-left mt-5 mt-md-0 font-weight-bold">
            Lägg till och spara
          </button>
        </div>

      </div>
      <div class="row my-4">
        <div class="col-12 col-md-auto picture-upload mx-auto">

        </div>
      </div>
      
    </form>
  </article>
`;
}

function template2() {
return `
  <div class="mb-md-4 mb-1 mb-lg-1 ingredient-form" id="ingredientInput-${this.ingredientCounter}">
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
      <div class="col-6 mb-0 mb-md-0 pt-2">
        <input type="text" name="IngrediensnamnLivsmedelsverket" class="form-control dataname-ingredient-${this.ingredientCounter}" placeholder="Ingrediens i livsmedelsverket" data-toggle="tooltip" data-placement="bottom"
          title="Ange ingrediens från livsmedelsverket för att räkna ut näringsvärden">
      </div>

      <div class="col d-flex pt-2">
        <input type="text" name="IngrediensPerGram" class="form-control grams-ingredient-${this.ingredientCounter}" placeholder="gram" data-toggle="tooltip" data-placement="bottom" title="Ange totalvikt i gram för uträkning av näringsvärde">
      </div>
  
      <button data-delete-button-id="${this.ingredientCounter}" class="delete-button align-self-center mt-2 mr-1 ml-1 btn-danger"
        data-toggle="tooltip" data-placement="bottom" title="Ta bort denna ingrediens"><i class="fas fa-times"></i></button>

    </div>
  </div>`;
}

function pictureUploadTemplate() {
    return `
      <img src="" class="picture-upload__img"  alt="Uppladdat recept foto"/>
    `;
  }

export {
template,
template2,
pictureUploadTemplate
}
