export default function() {
  return `
  
  <button class="testy">TESTEST</button>

    <div class="container mb-5 recept-page mx-auto mt-3">
      <!-- Recept "header" start -->
      <article class="row">
        <section class="col-12 d-flex flex-md-row flex-column recipe-top-part-2">
          <div class="col-12 d-flex flex-md-row flex-column recipe-top-part">
            <div class="row">
              <div class="col-md-12 col-12 col-lg-4">
                <img src="/img/recept-bild1.jpg" alt="Picture of a Tikka masala stew" class="img-fluid">
              </div>
              <div class="col-md-12 col-12 col-lg-8">
                <h2 class="text-center mt-1 recipe-header">Tikka Masala</h2>
                <article>
                  <p>Chicken tikka masala är en gryta inspirerad av det indiska köket, där chicken tikka kombinerats med
                    masalasås, ett uttryck av fusion cuisine, anpassat för västerländska smakpreferenser. Rätten är även
                    populär på indiska restauranger i Sverige och andra länder.</p>
                </article>
                <div class="d-flex flex-row justify-content-between">
                  <div class="d-flex">
                    <p><i class="fas fa-utensils"></i> Antal kalorier: 2112</p>
                  </div>
                  <div class="d-flex">
                    <p><i class="far fa-clock"></i> Tid att utföra: 2 timmar</p>
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
                <select class="form-control p-0 mr-2" id="sel1">
                  <option>2</option>
                  <option selected>4</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                </select>
                <label for="sel1" class="p-0 m-0 text-muted align-self-center">Portioner</label>
  
              </div>
  
            </form>
  
          </div>
  
          <ul class="list-group ingredient-list mb-3">
            <li class="list-group-item border-0">4 kycklingbröstfiléer/kycklinglårfiléer</li>
            <li class="list-group-item border-0">15ml olja</li>
            <li class="list-group-item border-0">10ml salt</li>
            <li class="list-group-item border-0">5ml gurkmeja</li>
            <li class="list-group-item border-0">10ml garam masala</li>
            <li class="list-group-item border-0">10ml kumin</li>
            <li class="list-group-item border-0">5ml malen koriander</li>
            <li class="list-group-item border-0">0,6ml kardemumma</li>
            <li class="list-group-item border-0">2,5ml svartpeppar</li>
            <li class="list-group-item border-0">1 lök</li>
            <li class="list-group-item border-0">0,6dl tomatpure</li>
            <li class="list-group-item border-0">4 klyftor vitlök</li>
            <li class="list-group-item border-0">En bit ingefära</li>
            <li class="list-group-item border-0">500ml krossade tomater/passerade tomtater</li>
            <li class="list-group-item border-0">500ml kokosmjölk</li>
            <li class="list-group-item border-0">Några dl kycklingbuljong efter behov</li>
          </ul>
          <!-- <button type="button" class="btn btn-primary mb-1">Lägg till i varukorg <i class="fas fa-cart-arrow-down"></i></button> -->
        </aside>
        <!-- Side ingredient end -->
        <!-- Start instructions -->
        <article class="col-lg-7 col-12 col-md-12 d-flex flex-column recipe-instruction pt-3 pl-md-4">
          <h2 class="text-center instructions-h2">Utförande</h2>
          <section class="my-4">
            <ol class="d-flex flex-column list-unstyled instruction-list">
             
            </ol>
          </section>
        </article>
        <!-- end instructions -->
      </article>
      <!-- End Main content on the page ingredient and instructions -->
  
    </div>
  
  `;
}