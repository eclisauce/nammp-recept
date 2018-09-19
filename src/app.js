import './base/array-methods';
import Base from './base/Base.class';
import JsonFlex from './base/jsonflex';
import Navbar from './components/navbar/Navbar.class';
import Footer from './components/footer/Footer.class';
import Router from './base/Router.class';
import '../scss/main.scss';

class App extends Base {
  constructor() {
    super();
    new Router();
    this.start();
  }

  /**
   * Runs in the constructor and runs everthing
   *
   */
  start() {
    // Navbar in header
    this.navbar = new Navbar();
    this.navbar.render('header');

    // Footer renderin
    this.footer = new Footer();
    this.footer.render('footer');
  }

}



new App();