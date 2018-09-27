import Base from '../../base/Base.class'
import navbarTemplate from './navbar.template';

/**
 * Navigation menu in the header
 *
 */
export default class Navbar extends Base {
  constructor() {
    super();
    this.searchListRender();
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


  click() {
    if ($(event.target).attr('id') === 'searchBtn') {
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
    if ($(event.target).attr('id') === 'search-field' && (event.keyCode == 13 || event.which == 13)) {
      this.setFilters();
      $('.searchtest').trigger('click');
    }
  }

  /**
   * Checks and sets filters if there is any.
   * @author Andreas
   */
  setFilters() {
    let checkedFilters = $('input[type=checkbox]:checked');
    let filters = 'filters';
    checkedFilters.each((i, x) => {
      filters += `${x.name}-`;
    })
    if (filters.length > 7) {
      filters = filters.slice(0, -1);
      $('.searchtest').attr('href', `/searchresult/${$('#search-field').val()}/${filters}`)
    } else {
      $('.searchtest').attr('href', `/searchresult/${$('#search-field').val()}`)
    }
  }

  searchListRender() {
    let that = this;
    /**
     * jQuery code for handeling the input from user displaying the list from json and autocompletes
     * @author Markus
     */
    $(document).on('keyup', '.search-input-nav', function() {
      let str = $(this).val();
      let strRegex = new RegExp (`${str}`, 'i');
      let ul = $(this).parent().find('.result-dropdown');
      ul.empty();
      if (!(location.pathname.includes('/searchresult'))) {
        let recipes = that.autoCompleteSearch(str).splice(0, 6);
        for (let recipe of recipes) {
          let recipeObj = that.recipes.filter(x => x.title == recipe)[0];
          let titleIndex = recipeObj.title.search(strRegex);
          let strToReplace = recipeObj.title.substr(titleIndex, str.length);
          let title = recipeObj.title.replace(strToReplace, `<strong>${strToReplace}</strong>`);
          if (!(location.pathname.includes('/recept'))) {
            ul.append(`
            <li class="list-group-item list-item focusedInput p-0">
              <a href="recept/${recipeObj.url}" class="pop no-decoration-a-tag p-2 test2"><img src="${recipeObj.imgLink}" class"img-fluid p-4" alt="${recipeObj.imgAlt}"><span class="p-1"> ${title}</span> <i class="fas fa-angle-right fa-lg"></i></a>
            </li>`);
          } else {
            ul.append(`
            <li class="list-group-item list-item focusedInput p-0">
              <a href="${recipeObj.url}" class="pop no-decoration-a-tag p-2 test2"><img src="${recipeObj.imgLink}" class"img-fluid p-4" alt="${recipeObj.imgAlt}"><span class="p-1"> ${title}</span> <i class="fas fa-angle-right fa-lg"></i></a>
            </li>`);
          }
        }
      }
    });

    /**
     * Allows us to defocus the input field if clicked outside of input
     *
     *@author Markus
     */

    $(document).keyup(function(e) {
      if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('.result-dropdown').html('');
        $(".search-input-nav").val('');
      }
    });

    $(document).on('click', 'body', () => {
      $(".result-dropdown").html('');
      $(".search-input-nav").val('');
    });
    $(document).on('click', '.list-item', () => {
      $(".result-dropdown").html('');
    });


    $(document).on('keydown', '.header__search', function(e) {
      if (e.keyCode == 40) {      
        e.preventDefault();
        if ($('#search-field').is(':focus')){
          $('.test2')[0].focus();
        } else {
          $('.test2:focus').closest('li').next().find('a.test2').focus();
        }
      }
      if (e.keyCode == 38) {    
        e.preventDefault();
        if($('.test2').eq(0).is(':focus')){
          $('#search-field').focus();
        } else {
          $('.test2:focus').closest('li').prev().find('a.test2').focus();
        }
      }
    })
  }

  /**
   * autocomplete method and sorting
   *
   *@author Markus
   */
  autoCompleteSearch(str) {
    if (str.length == 0) {
      return [];
    }
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
