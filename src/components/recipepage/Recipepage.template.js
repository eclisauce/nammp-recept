export default function() {
  return `
    <div class="container mb-5 recept-page mx-auto mt-3">
      <!-- Recept "header" start -->
      <article class="row">
        <section class="col-12 d-flex flex-md-row flex-column recipe-top-part-2">
        <button class="heart" data-id="${this.recipe.url}" role="button" title="Lägg detta till favoriter"><i class="${this.myFavorites.favorites.includes(this.recipe.url) ? 'fas' : 'far'} fa-heart"></i></button>
          <div class="col-12 d-flex flex-md-row flex-column recipe-top-part">
            <div class="row">
              <div class="col-md-12 col-12 col-lg-4 text-center text-lg-left">
                <img src="${this.recipe.imgLink}" alt="${this.recipe.imgAlt}" class="img-fluid">
              </div>
              <div class="col-md-12 col-12 col-lg-8 d-flex flex-column">
                <h2 class="text-center mt-3 mt-lg-1 recipe-header align-self-center align-self-lg-start">${this.recipe.title}</h2>
                <p class="m-0 p-0 mb-2 text-white mt-2"><strong>Svårighetsgrad:</strong>
                  <span class="ml-2 px-2 stars">
                    <i class="fas fa-star ${this.recipe.difficulty < 1 ? 'text-muted' : ''}"></i>
                    <i class="fas fa-star ${this.recipe.difficulty < 2 ? 'text-muted' : ''}"></i>
                    <i class="fas fa-star ${this.recipe.difficulty < 3 ? 'text-muted' : ''}"></i>
                    <i class="fas fa-star ${this.recipe.difficulty < 4 ? 'text-muted' : ''}"></i>
                    <i class="fas fa-star ${this.recipe.difficulty < 5 ? 'text-muted' : ''}"></i>
                  </span>
                </p>
                <article>
                  <p>${this.recipe.description}</p>
                </article>
                <div class="d-flex flex-row justify-content-between">
                  <div class="d-flex">
                    <p><i class="fas fa-utensils mr-1"></i> Kcal: ${this.recipe.nutrientsPerPortion.calories.toFixed()}</p>
                  </div>
                  <div class="d-flex">
                    <p><i class="far fa-clock mr-1"></i> Tid: ${this.calcTime(this.recipe)}</p>
                  </div>
                </div>
                <div class="d-flex flex-row flex-wrap mt-auto recipe-categories">
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
          <div class="d-flex flex-wrap justify-content-between py-1 align-items-center">
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

          <ul class="list-group ingredient-list mb-3 mb-lg-0">

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
            <p class="d-inline"><span class="font-weight-bold">Energi:</span> ${this.recipe.nutrientsPerPortion.calories.toFixed()} kcal</p>
            <a class="ml-md-4 d-block d-md-inline collapsed" data-toggle="collapse" href="#visaMer" role="button" aria-expanded="false" aria-controls="visaMer">
              Detaljerad näringsinformation<i class="fas fa-chevron-down ml-2"></i>
            </a>
            <div class="collapse" id="visaMer">
              <div class="row">
                <div class="col-4 ml-auto text-right">
                  <p class="mb-0 text-muted rdi-text" data-toggle="tooltip" data-placement="top" title="Livsmedelsverkets rekommenderade dagliga intag">% av RDI <i class="fas fa-info-circle"></i></p>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mt-1 mt-sm-0 mb-1">
                    <span class="font-weight-bold">Kolhydrater</span> ${this.recipe.nutrientsPerPortion.carbohydrates.toFixed()}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-kolhydrater" role="progressbar" style="width: ${(this.recipe.nutrientsPerPortion.carbohydrates / 300 * 100).toFixed()}%" aria-valuenow="${(this.recipe.nutrientsPerPortion.carbohydrates / 300 * 100).toFixed()}" aria-valuemin="0" aria-valuemax="100">${(this.recipe.nutrientsPerPortion.carbohydrates / 300 * 100).toFixed()}%</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mt-1 mt-sm-0 mb-1">
                    <span class="font-weight-bold">Protein</span> ${this.recipe.nutrientsPerPortion.protein.toFixed()}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-protein" role="progressbar" style="width: ${(this.recipe.nutrientsPerPortion.protein / 70 * 100).toFixed()}%" aria-valuenow="${(this.recipe.nutrientsPerPortion.protein / 70 * 100).toFixed()}" aria-valuemin="0" aria-valuemax="100">${(this.recipe.nutrientsPerPortion.protein / 70 * 100).toFixed()}%</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mt-1 mt-sm-0 mb-1">
                    <span class="font-weight-bold">Salt</span> ${this.recipe.nutrientsPerPortion.salt.toFixed(1)}g
                  </p>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-salt" role="progressbar" style="width: ${(this.recipe.nutrientsPerPortion.salt / 6 * 100).toFixed()}%" aria-valuenow="${(this.recipe.nutrientsPerPortion.salt / 6 * 100).toFixed()}" aria-valuemin="0" aria-valuemax="100">${(this.recipe.nutrientsPerPortion.salt / 6 * 100).toFixed()}%</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-4">
                  <p class="mt-1 mt-sm-0 mb-1 d-inline-block">
                    <span class="font-weight-bold">Fett</span> ${this.recipe.nutrientsPerPortion.fat.total.toFixed()}g
                  </p>
                  <a class="ml-1 collapsed" data-toggle="collapse" href="#varav" role="button" aria-expanded="false" aria-controls="varav"> <i class="fas fa-chevron-down ml-0"></i>
                  </a>
                  <div class="collapse" id="varav">
                    <p class="mb-1 ml-2">varav</p>
                    <p class="mb-1 ml-3">
                       enkelomättat ${this.recipe.nutrientsPerPortion.fat.monounsaturated.toFixed(1)}g
                    </p>
                    <p class="mb-1 ml-3">
                      mättat ${this.recipe.nutrientsPerPortion.fat.saturated.toFixed(1)}g
                    </p>
                    <p class="mb-1 ml-3">
                      fleromättat ${this.recipe.nutrientsPerPortion.fat.polyunsaturated.toFixed(1)}g
                    </p>
                  </div>
                </div>
                <div class="col-12 col-sm-8">
                  <div class="progress flex-grow-1 ml-0 ml-sm-3 mt-1">
                    <div class="progress-bar progress-fett" role="progressbar" style="width: ${(this.recipe.nutrientsPerPortion.fat.total / 90 * 100).toFixed()}%" aria-valuenow="${(this.recipe.nutrientsPerPortion.fat.total / 90 * 100).toFixed()}" aria-valuemin="0" aria-valuemax="100">${(this.recipe.nutrientsPerPortion.fat.total / 90 * 100).toFixed()}%</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- end näringsvärde -->
          <button class="print-me btn btn-primary my-4">
            <i class="fas fa-print"></i> Skriv ut
          </button>

        </article>
        <!-- end instructions -->
      </article>
      <!-- End Main content on the page ingredient and instructions -->

    </div>

  `;
}
