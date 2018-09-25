import './base/array-methods';
import Base from './base/Base.class';
import JsonFlex from './base/jsonflex';
import Navbar from './components/navbar/Navbar.class';
import Footer from './components/footer/Footer.class';
import Router from './base/Router.class';
import Favorites from './base/Favorites.class';
import '../scss/main.scss';

class App extends Base {
  constructor() {
    super();
    this.start();
  }

  /**
   * Runs in the constructor and runs everthing
   *
   */
  async start() {
    // Navbar in header
    this.navbar = new Navbar();
    this.navbar.render('header');

    // Footer renderin
    this.footer = new Footer();
    this.footer.render('footer');

    this.myFavorites = new Favorites();

    setTimeout(() => {
      this.router = new Router(this.myFavorites);
    }, 0)
  }


}



const app = new App();
