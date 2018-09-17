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
    this.loadJSONandStart();
    new Router();
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

  this.eventHandler();
}

/**
 * Runs in the constructor
 * Loading All JSON and then executing start
 *
 */
loadJSONandStart() {
  $.getJSON("/json/food.json", (food) => {
    this.foodData = food.LivsmedelDataset.LivsmedelsLista[0].Livsmedel;
    
  }).then($.getJSON("/json/recipes.json", (recipes) => {
    this.recipes = recipes;
    
  })).then(this.start());
}


/**
 * For testing if data has been loaded.
 *
 */
eventHandler(){
  $(document).on('click', () => {
    console.log(this.foodData);
    console.log(this.recipes);
  })

}


}

new App();