function template() {
return `<article class="add-recipe container">
  <h2 class="text-primary mt-3 mt-md-4 mb-3 text-center text-md-left">Lägg till nytt recept</h2>

  <div class="row">
    <div class="col-md-6">

      <div class="mt-3 mt-md-4 pr-md-5">
        <h5 class="text-dark">Namn på recept</h5>
        <form class="w-100">
          <div class="form-group m-0">
            <input type="text" class="form-control" id="recipeNameForm" placeholder="Fyll i vad ditt recept heter.">
          </div>
        </form>
      </div>

      <div class="mt-3 mt-md-4 pr-md-5">
        <h5 class="text-dark">Beskrivning</h5>
        <textarea class="form-control rounded w-100" rows="3" placeholder="En kort beskrivning av ditt recept."></textarea>
      </div>

      <div class="mt-3 mt-md-4">
        <h5 class="text-dark m-0">Kategorier</h5>
        <small class="text-muted">Kryssa i de rutor som matchar din rätt.</small>
        <div class="row col-12 mt-3 align-items-center justify-content-between">

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Huvudrätt</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Festmåltider</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Fika</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Buffé</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Grytor</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Asiatiskt</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Husmanskost</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Italienskt</p>
            <input type="checkbox">
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
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Veganskt</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Laktosfritt</p>
            <input type="checkbox">
            <span class="checkmark border"></span>
          </label>

          <label class="col-md-6 mt-0 checkboxContainer border-checkbox">
            <p>Endast kött</p>
            <input type="checkbox">
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
              <select class="form-control m-0" id="number-of-portions">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option selected>4</option>
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
              <form>
                <div class="form-group m-0">
                  <input type="text" class="form-control" id="time" aria-describedby="time" placeholder="">
                  <small id="" class="form-text text-muted text-nowrap">Ange tid i minuter.</small>
                </div>
              </form>
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
          <textarea class="form-control my-2 rounded w-100" rows="2" placeholder="1."></textarea>
          <textarea class="form-control my-2 rounded w-100" rows="2" placeholder="2."></textarea>
          <textarea class="form-control my-2 rounded w-100" rows="2" placeholder="3."></textarea>
        </div>
      </div>
    </div> <!-- Closses right col-6 -->

  </div> <!-- Closses top div-row -->

  <div class="row mt-3 mt-md-4 mb-5 p-0">

    <div class="col-md-6">
      <form class="w-100 pr-md-5">
        <div class="form-group m-0">
          <h5 for="hrefLink">Länk till bild</h5>
          <input type="text" class="form-control" id="imageLink" aria-describedby="textHelp" placeholder="https://www.exempel.com/bild.jpg">
          <small id="" class="form-text text-muted">Kom ihåg att ha med hela länken utan några förändringar
            på länken.</small>
        </div>
      </form>
    </div>

    <div class="col-md-6">
      <button class="btn btn-primary btn-lg d-block float-md-right float-left mt-5 mt-md-0 font-weight-bold">
        Lägg till och spara
      </button>
    </div>

  </div>
  <div class="row my-4">
    <div class="col-12 col-md-auto picture-upload mx-auto">

    </div>
  </div>
</article>

`;
}

function template2() {
return `<form class="mb-md-4 mb-1 mb-lg-1 ingredient-form" id="form-${this.formCounter}">
  <div class="form-row">
    <div class="col-6 mb-0 mb-md-0 pt-2">
      <input type="text" class="form-control name-ingredient-${this.formCounter}" placeholder="Namn på ingrediens" data-toggle="tooltip" data-placement="bottom"
        title="Ange namn på ingrediens som visas i receptet">
    </div>

    <div class="col-3 pt-2">
      <input type="text" class="form-control quantity-ingredient-${this.formCounter}" placeholder="antal" data-toggle="tooltip" data-placement="bottom" title="Ange antal">
    </div>
    <div class="form-group col m-0 pt-2" data-toggle="tooltip" data-placement="bottom" title="Ange vilket mått">
      <select class="form-control measurement-ingredient-${this.formCounter}" id="">
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
        <input type="text" class="form-control dataname-ingredient-${this.formCounter}" placeholder="Ingrediens i livsmedelsverket" data-toggle="tooltip" data-placement="bottom"
          title="Ange ingrediens från livsmedelsverket för att räkna ut näringsvärden">
      </div>

      <div class="col d-flex pt-2">
        <input type="text" class="form-control grams-ingredient-${this.formCounter}" placeholder="gram" data-toggle="tooltip" data-placement="bottom" title="Ange totalvikt i gram för uträkning av näringsvärde">
      </div>

      <button data-delete-button-id="${this.formCounter}" class="delete-button align-self-center mt-2 mr-1 ml-1 btn-danger"
        data-toggle="tooltip" data-placement="bottom" title="Ta bort denna ingrediens"><i class="fas fa-times"></i></button>

    </div>
</form>`;
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
