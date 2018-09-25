import Base from '../../base/Base.class'
import navbarTemplate from './navbar.template';

/**
 * Navigation menu in the header
 *
 */
export default class Navbar extends Base {
  constructor() {
    super();
    this.eventHandler();
    this.str;
  }
  template() {
    return navbarTemplate;
  }

  /**
   * Keyup on searchfield to change the hidden href which is clicked when enter is pressed in keydown-method
   * @author Andreas
   */
  keyup() {
    if ($(event.target).attr('id') === 'search-field') {
      if (!(location.pathname.includes('/searchresult'))) {
        $('.searchtest').attr('href', `/searchresult/${$('#search-field').val()}`)
      } else {
        this.setFilters();
      }
    }
  }

  /**
   * Keydown on enter to search. Sends filters if there are any.
   * @author Andreas
   */
  keydown() {
    if ($(event.target).attr('id') === 'search-field' && $(event.target).val() !== '' && (event.keyCode == 13 || event.which == 13)) {
      this.setFilters();
      $('.searchtest').trigger('click');
    }
  }

  /**
   * Checks and sets filters if there is any.
   * @author Andreas
   */
  setFilters(){
    let checkedFilters = $('input[type=checkbox]:checked');
    let filters = 'filters';
    checkedFilters.each((i, x) => {
      filters += `${x.name}-`;
    })
    if(filters.length > 7){
      filters = filters.slice(0, -1);
      $('.searchtest').attr('href', `/searchresult/${$('#search-field').val()}/${filters}`)
    } else {
      $('.searchtest').attr('href', `/searchresult/${$('#search-field').val()}`)
    }
  }


  eventHandler(){
    let that = this;
    /**
     * jQuery code for handeling the input from user displaying the list from json and autocompletes
     * @author Markus
     */
    $(document).on('keyup', '.search-input', function() {
      let str = $(this).val();
      let ul = $(this).parent().find('.result-dropdown');
      ul.empty();
      let recipes = that.autoCompleteSearch(str).splice(0, 15);
      for (let recipe of recipes) {
        let recipeObj = that.recipes.filter(x => x.title == recipe)[0];
        let recipeImg = that.recipes.filter(x => x.title == recipe)[0];
        ul.append(`
          <a href="recept/${recipeObj.url}" class="pop no-decoration-a-tag">
            <li class="list-group-item list-item"><img src="${recipeImg.imgLink}" class"img-fluid p-4" alt=""><span class="p-2"> ${recipe}</span> <i class="fas fa-angle-right fa-lg"></i></li>
          </a>`);
      }
    });

    /**
     * Allows us to defocus the input field if clicked outside of interval
     *
     *@author Markus
     */

    $(document).on('click', 'main', () => {
      $(".result-dropdown").html('');
    });
    $(document).on('click', '.list-item', () => {
      $(".result-dropdown").html('');
    });

  }

  /**
   * autocomplete method and sorting
   * needs more added to it?
   *@author Markus
   */
  autoCompleteSearch(str) {
    //   if(str.length < 3){
    //   return new Error('You must send a str with >= 3 letters');
    // }
    str = str.toLowerCase();
    return this.recipes.filter(x => x.title.toLowerCase().includes(str)).map(x => x.title).sort((a, b) => {

      // advanced
      // prioritize when finding the str
      // as a separate word
      let aIsSeparateWord = (' ' + a + ' ').toLowerCase().includes(' ' + str + ' ');
      let bIsSeparateWord = (' ' + b + ' ').toLowerCase().includes(' ' + str + ' ');

      // prioritize str early in name
      let aPos = a.toLowerCase().indexOf(str) - (
        aIsSeparateWord
        ? 1000
        : 0);
      let bPos = b.toLowerCase().indexOf(str) - (
        bIsSeparateWord
        ? 1000
        : 0);

      if (aPos === bPos) {
        // if same position
        // sort alphabetically by name
        return a < b
          ? -1
          : 1;
      }

      return aPos < bPos
        ? -1
        : 1;
    });
  }




}
