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
        </article>
        <!-- end instructions -->
      </article>
      <!-- End Main content on the page ingredient and instructions -->
  
    </div>
  
  `;
}