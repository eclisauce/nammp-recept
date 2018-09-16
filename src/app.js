import './base/array-methods';
import Base from './base/Base.class';
import Startpage from './components/startpage/Startpage.class';
import Navbar from './components/navbar/Navbar.class';
import Footer from './components/footer/Footer.class';
import '../scss/main.scss';

class App extends Base {
  constructor() {
    super();
    this.start();
  }

  start() {
    // Navbar in header
    this.navbar = new Navbar();
    this.navbar.render('header');

    // Footer renderin
    this.footer = new Footer();
    this.footer.render('footer');

    //Startpage
    this.startpage = new Startpage('Skicka in något till Startpageklassen du vill logga');
    this.startpage.render('main');
  }

}

const app = new App();
