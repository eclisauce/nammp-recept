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
        ul.append(`<li class="list-group-item list-item">${recipe}</li>`);
        console.log(recipe);
      }
    });

    /**
     * Allows us to defocus the input field if clicked outside of interval
     *
     *@author Markus
     */

    $(document).on('click', 'main', () => {
      $(".result-dropdown").html('');
    })
    /**
     * function to pick  an item from the list and put it in the input field
     *
     *@author Markus
     */

    $(document).on('click', '.list-item', function() {
      location.href = '/searchresult';

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
