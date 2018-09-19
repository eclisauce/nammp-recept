export default function() {
  return `
  
  <div class="container mt-0 mt-md-3">
    <article class="row">

      <aside class="col-12 col-md-4 col-lg-3 bg-white border align-self-start">

        <section class="row categories flex-column p-0">

          <div class="filter-heading categories border-bottom p-3 d-flex justify-content-between" data-toggle="collapse"
            data-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
            <p class="my-0 mx-auto m-md-0">Kategorier</p> <i class="fas fa-chevron-circle-down align-self-center"></i>
          </div>

          <!-- This is the body of cathegories -->
          <div class="collapse show mt-2 ml-3" id="collapseCategory">

            <label class="checkboxContainer border-checkbox">
              <p>Huvudrätt</p>
              <input type="checkbox" name="Huvudrätter">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Festmåltider</p>
              <input type="checkbox" name="Festmåltider">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Fika</p>
              <input type="checkbox" name="Fika">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Buffé</p>
              <input type="checkbox" name="Buffé">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Grytor</p>
              <input type="checkbox" name="Grytor">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Asiatiskt</p>
              <input type="checkbox" name="Asiatiskt">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Husmanskost</p>
              <input type="checkbox" name="Husmanskost">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Italienskt</p>
              <input type="checkbox" name="Italienskt">
              <span class="checkmark border"></span>
            </label>

          </div>

        </section>


        <section class="row categories flex-column p-0 border-bottom">
          <div class="filter-heading filters border-bottom border-top p-3 d-flex justify-content-between" data-toggle="collapse"
            data-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
            <p class="my-0 mx-auto m-md-0">Filter</p> <i class="fas fa-chevron-circle-down align-self-center"></i>
          </div>

          <!-- This is the body of cathegories -->
          <div class="collapse show mt-2 ml-3" id="collapseFilter">
            <label class="checkboxContainer border-checkbox">
              <p>Vegetariskt</p>
              <input type="checkbox" name="Vegetariskt">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Veganskt</p>
              <input type="checkbox" name="Veganskt">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Laktosfritt</p>
              <input type="checkbox" name="Laktosfritt">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Endast kött</p>
              <input type="checkbox" name="Endast Kött">
              <span class="checkmark border"></span>
            </label>
          </div>


        </section>

        <section class="row categories flex-column p-0">
          <a class="btn btn-primary rounded-0 p-3" href="add-recipe.html">Nytt recept</a>
        </section>



      </aside>


      <section class="col-12 col-md-8 col-lg-9 p-0 pl-md-3 pt-3 pt-md-0 search-recipe-result">
        <!-- Media object component -->


      </section>

    </article>

  </div>
  
  `;
}