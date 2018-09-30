export default `
<nav class="navbar navbar-expand-lg navbar-light p-3 px-md-0 py-md-5 container" role="navigation">
  <a class="navbar-brand pop" href="/"><span>Recept</span><span>&</span><span>Näring</span></a>
  <button class="navbar-toggler" type="button" role="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  <!-- Collapsing Navigation -->
  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item px-4 mt-md-3 mt-lg-0">
        <a class="nav-link pop text-center" data-toggle="collapse" data-target=".navbar-collapse.show" href="/">
          <i class="fas fa-home d-block text-center m-2 navbar-icons"></i>
          Hem
        </a>
      </li>
      <li class="nav-item px-4">
        <a class="nav-link pop text-center" data-toggle="collapse" data-target=".navbar-collapse.show" href="/searchresult">
          <i class="far fa-list-alt d-block text-center m-2 navbar-icons"></i>
          Recept
        </a>
      </li>
      <li class="nav-item px-4">
        <a class="nav-link pop text-center" data-toggle="collapse" data-target=".navbar-collapse.show" href="/add-recipe">
          <i class="far fa-plus-square d-block text-center m-2 navbar-icons"></i>
          Lägg till recept
        </a>
      </li>
    </ul>
  </div>
  <!-- // Collapsing Navigation End -->
</nav>
<!-- Search field -->
<div class="border search-holder ">
  <div class="container header__search">
      <i class="fas fa-search"></i>
      <input class="form-control form-control-lg pl-5 border-0 search-input-nav" id="search-field" type="text" role="search" placeholder="Sök på recept..."></input>
      <a class="searchtest btn btn-primary pop" id="searchBtn" role="button" href="/searchresult">Sök recept</a>
      <ul class="list-group result-dropdown" tabindex="-1"></ul>
  </div>
</div>
`;
