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
          <a class="nav-link pop" href="/">Hem</a>
        </li>
        <li class="nav-item px-4">
          <a class="nav-link pop" href="/searchresult">Recept</a>
        </li>
        <li class="nav-item px-4">
          <a class="nav-link pop" href="/add-recipe">Lägg till recept</a>
        </li>
      </ul>
    </div>
    <!-- // Collapsing Navigation End -->
  </nav>

  <!-- Search field -->
  <div class="border search-holder ">
    <div class="container header__search ">
      <i class="fas fa-search"></i>
      <input class="form-control form-control-lg pl-5 border-0" id="search-field" type="text" placeholder="Sök på recept..."></input>
      <a class="searchtest d-none pop" href="searchresult">search!</a>
    </div>
  </div>
`;
