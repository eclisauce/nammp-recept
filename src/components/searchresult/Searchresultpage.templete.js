export default function() {
  return `
  
  <main class="container mt-0 mt-md-3">
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
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Festmåltider</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Fika</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Buffé</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Grytor</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Asiatiskt</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Husmanskost</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Italienskt</p>
              <input type="checkbox">
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
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Veganskt</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Laktosfritt</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>

            <label class="checkboxContainer border-checkbox">
              <p>Endast kött</p>
              <input type="checkbox">
              <span class="checkmark border"></span>
            </label>
          </div>


        </section>

        <section class="row categories flex-column p-0">
          <a class="btn btn-primary rounded-0 p-3" href="add-recipe.html">Nytt recept</a>
        </section>



      </aside>


      <section class="col-12 col-md-8 col-lg-9 p-0 pl-md-3 pt-3 pt-md-0">
        <!-- Media object component -->

        <a href="/recipe" class="no-decoration-a-tag">
          <div class="media p-1 p-sm-3 mt-0 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="https://img.koket.se/recipelist/vegetarisk-spaghetti-bolognese-pa-rotselleri-och-morotter.jpg"
              alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0 media-heading d-inline">Spaghetti bolognese</h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="mt-2">Denna goda och mättande rätt är både enkel och billig att tillaga. Klassiska italienska
                smaker, anpassade efter det svenska köket.</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>450 kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>30 minuter</p>
              </div>
            </div>
          </div>
        </a>

        <a href="/recipe" class="no-decoration-a-tag">
          <div class="media p-1 p-sm-3 mt-3 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="https://img.koket.se/recipelist/matvetesallad-med-varmrokt-lax.jpg"
              alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0 media-heading d-inline">Matvetesallad med varmrökt lax</h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="mt-2">En matig och supergod sallad på matvete, varmrökt lax och krispiga grönsaker. Till
                serveras en krämig dressing med sting av wasabi.</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>285 kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>25 minuter</p>
              </div>
            </div>
          </div>
        </a>

        <a href="/recipe" class="no-decoration-a-tag">
          <div class="media p-1 p-sm-3 mt-3 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="https://img.koket.se/recipelist/raggmunk-med-svamp-och-lingon.jpg"
              alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0 media-heading d-inline">Raggmunk med svamp och lingon</h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="mt-2">Klassiska raggmunkar, fast med en grön twist i form av ett svamp- och lökfräs som
                tillbehör i stället för stekt fläsk. Riven morot ger både fin färg och smak.</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>320 kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>45 minuter</p>
              </div>
            </div>
          </div>
        </a>

        <a href="/recipe" class="no-decoration-a-tag">
          <div class="media p-1 p-sm-3 mt-3 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="https://img.koket.se/recipelist/halloumitacos-med-avokadokram-och-inlagd-lok.jpg"
              alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0 media-heading d-inline">Halloumitacos med avokadokräm</h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="mt-2">Vegetarisk tacoröra på svarta bönor, halloumi och paprika serveras med inlagd rödlök,
                avokadokräm, yoghurt och koriander.</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>390 kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>40 minuter</p>
              </div>
            </div>
          </div>
        </a>

        <a href="/recipe" class="no-decoration-a-tag">
          <div class="media p-1 p-sm-3 mt-3 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="https://img.koket.se/recipelist/graddig-fisksoppa-med-rakor-och-saffran.jpg"
              alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0 media-heading d-inline">Gräddig fisksoppa med räkor och saffran</h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="mt-2">Saffransdoftande fisksoppa med blandad fisk, räkor, vitt vin och fänkål. Serveras med en
                klick vitlöksaioli.</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>415 kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>55 minuter</p>
              </div>
            </div>
          </div>
        </a>
      </section>

    </article>

  </main>
  
  `;
}