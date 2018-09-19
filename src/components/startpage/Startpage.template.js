export default function() {
return `
<article>
  <a href="recipes" class="no-decoration-a-tag pop">
    <div class="main-picture d-flex justify-content-center align-items-center">
      <h1 class="p-3">Hitta inspiration till din matlagning</h1>
    </div>
  </a>
</article>

<article class="container mt-0 mt-md-3 p-0">

  <article class="row">

    <section class="heading-holder col-12 p-0">
      <h2 class="py-0 py-md-4 week-special">Veckans utvalda recept</h2>
    </section>

    <section class="row col-12 m-0 p-0 mt-5">
    ${this.fourRecipes[0]}
    ${this.fourRecipes[1]}

    </section>
    <section class="row col-12 m-0 p-0">
      ${this.fourRecipes[2]}
      ${this.fourRecipes[3]}

    </section>

  </article>


</article>`;
}