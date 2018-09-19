export default function() {
  return `
    <div class="container mb-5 recept-page mx-auto mt-3">
      <!-- Recept "header" start -->
      <article class="row">
        <section class="col-12 d-flex flex-md-row flex-column recipe-top-part-2">
          <div class="col-12 d-flex flex-md-row flex-column recipe-top-part">
            <div class="row">
              <div class="col-md-12 col-12 col-lg-4">
                <img src="${this.recipe.imgLink}" alt="${this.recipe.imgAlt}" class="img-fluid">
              </div>
              <div class="col-md-12 col-12 col-lg-8">
                <h2 class="text-center mt-1 recipe-header">${this.recipe.title}</h2>
                <article>
                  <p>${this.recipe.description}</p>
                </article>
                <div class="d-flex flex-row justify-content-between">
                  <div class="d-flex">
                    <p><i class="fas fa-utensils"></i> Kalorier: ${this.recipe.nutrientsPerPortion.calories}</p>
                  </div>
                  <div class="d-flex">
                    <p><i class="far fa-clock"></i> Tid: ${this.calcTime(this.recipe)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
      <!-- recept header end -->
      <!-- Start Main content on the page ingredient and instructions -->
      <article class="row mt-4">
        <!-- Side ingredient start -->
        <aside class="col-lg-5 col-12 col-md-12 d-flex flex-column border ingredient-side p-2 p-md-4">
          <div class="d-flex flex-wrap justify-content-between px-3 py-1 align-items-center">
            <h4 class="ingredient-h4 p-0">Ingredienser</h4>
            <form class="recipe-selector">
              <div class="form-group d-flex p-0">
                <select class="form-control p-0 mr-2" id="portion-selector">
                  <option>2</option>
                  <option selected>4</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                </select>
                <label for="portion-selector" class="p-0 m-0 text-muted align-self-center">Portioner</label>
  
              </div>
  
            </form>
  
          </div>
  
          <ul class="list-group ingredient-list mb-3">

          </ul>
          <!-- <button type="button" class="btn btn-primary mb-1">Lägg till i varukorg <i class="fas fa-cart-arrow-down"></i></button> -->
        </aside>
        <!-- Side ingredient end -->
        <!-- Start instructions -->
        <article class="col-lg-7 col-12 col-md-12 d-flex flex-column recipe-instruction pt-3 pl-md-4">
          <h2 class="text-center instructions-h2">Utförande</h2>
          <section class="my-4">
            <ol class="d-flex flex-column list-unstyled instruction-list">
              ${this.getInstructions()}
            </ol>
          </section>

          <!-- Start Näringsvärde -->
          <section class="naringsvarde mt-4 p-4">
            <h4 class="naringsvarde-h4">Näringsvärde</h4>
            <h6 class="naringsvarde-h6">(per portion)</h6>
            <p class="d-inline"><span class="font-weight-bold">Energi:</span> ${this.recipe.nutrientsPerPortion.calories} kcal</p>
            <a class="ml-4 collapsed" data-toggle="collapse" href="#visaMer" role="button" aria-expanded="false" aria-controls="visaMer">
              Visa mer<i class="fas fa-chevron-down ml-2"></i>
            </a>
            <div class="collapse" id="visaMer">
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mb-1">
                    <span class="font-weight-bold">Kolhydrater</span> ${this.recipe.nutrientsPerPortion.carbohydrates}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-kolhydrater" role="progressbar" style="width: ${this.recipe.nutrientsPerPortion.carbohydrates}%" aria-valuenow="${this.recipe.nutrientsPerPortion.carbohydrates}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mb-1">
                    <span class="font-weight-bold">Protein</span> ${this.recipe.nutrientsPerPortion.protein}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-protein" role="progressbar" style="width: ${this.recipe.nutrientsPerPortion.protein}%" aria-valuenow="${this.recipe.nutrientsPerPortion.protein}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mb-1">
                    <span class="font-weight-bold">Fett</span> ${this.recipe.nutrientsPerPortion.fat.total}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-fett" role="progressbar" style="width: ${this.recipe.nutrientsPerPortion.fat.total}%" aria-valuenow="${this.recipe.nutrientsPerPortion.fat.total}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mb-0">
                    <span class="font-weight-bold">Salt</span> ${this.recipe.nutrientsPerPortion.salt}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-salt" role="progressbar" style="width: ${this.recipe.nutrientsPerPortion.salt}%" aria-valuenow="${this.recipe.nutrientsPerPortion.salt}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- end näringsvärde -->

        </article>
        <!-- end instructions -->
      </article>
      <!-- End Main content on the page ingredient and instructions -->
  
    </div>
  
  `;
}