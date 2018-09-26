export default `
<nav class="navbar navbar-expand-lg navbar-light p-3 px-md-0 py-md-5 container">
  <a class="navbar-brand pop" href="/"><span>Recept</span><span>&</span><span>Näring</span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  <!-- Collapsing Navigation -->
  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item px-4 mt-md-3 mt-lg-0">
        <a class="nav-link pop" href="/"><i class="fas fa-home p-1"></i> Hem</a>
      </li>
      <li class="nav-item px-4">
        <a class="nav-link pop" href="/searchresult"><i class="far fa-list-alt p-1"></i> Recept</a>
      </li>
      <li class="nav-item px-4">
        <a class="nav-link pop" href="/add-recipe"><i class="far fa-plus-square p-1"></i> Lägg till recept</a>
      </li>
    </ul>
  </div>
  <!-- // Collapsing Navigation End -->
</nav>
<!-- Search field -->
<div class="border search-holder ">
  <div class="container header__search">
      <i class="fas fa-search"></i>
      <input class="form-control form-control-lg pl-5 border-0 search-input-nav" id="search-field" type="text" placeholder="Sök på recept..."></input>
      <a class="searchtest btn btn-primary pop" id="searchBtn" href="searchresult">Sök</a>
      <ul class="list-group result-dropdown" tabindex="-1"></ul>
  </div>
</div>
`;
