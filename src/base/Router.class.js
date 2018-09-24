import Startpage from '../components/startpage/Startpage.class';
import AddRecipe from '../components/addrecipe/AddRecipe.class';
import Recipepage from '../components/recipepage/Recipepage.class';
import Searchresult from '../components/searchresult/Searchresult.class';

/**
 * Good ol' PushPopStateHandler from Thomas with a new proper name
 *
 */
export default class Router {

  constructor(app) {
    this.app = app;
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());
  }

  addEventHandler() {
    let that = this;

    $(document).on('click', 'a.pop', function(e) {
      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();
    });
  }

  changePage() {
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;
    // Change which menu link that is active
    $('header ul li a').removeClass('active');
    $(`header ul li a[href="${url}"]`).addClass('active');



    // A small "dictionary" of what method to call on which url
    let urls = {
      '/': 'startpage',
      '/footer': 'footer',
      '/add-recipe': 'addrecipe',
      '/searchresult': 'searchResult'
    };

    // Handles search-strings from navbar
    if(url.includes('searchresult/')){
      let newUrl = url.substring(0, 13);
      let searchStr = url.substring(14);
      let methodName = urls[newUrl];
      // Call the right method
      this[methodName](searchStr);
    } else {

      setTimeout(() => {
        for(let recipe of this.app.recipes) {
          urls[`/recept/${recipe.url}`] = 'recipePage';
        }
        let methodName = urls[url];
  
        // Call the right method
        this[methodName]();
      }, 0);  
    }


    window.scrollTo(0, 0);

  }

  //Methods for rendering in our templates in the SPA

  startpage() {
    this.startPage = new Startpage();
  }

  addrecipe() {
    this.addRecipe = new AddRecipe();
    $('main').empty();
    this.addRecipe.render('main');
    this.addRecipe.renderNewForm();
    this.addRecipe.renderNewForm();
    this.addRecipe.renderNewForm();
  }

  recipePage() {
    this.recipepage = new Recipepage();
  }

  searchResult(searchStr) {
    this.searchresult = new Searchresult(searchStr);
  }


}
