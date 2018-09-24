import Base from '../../base/Base.class'
import navbarTemplate from './navbar.template';

/**
 * Navigation menu in the header
 *
 */
export default class Navbar extends Base {
  constructor() {
    super();
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

}