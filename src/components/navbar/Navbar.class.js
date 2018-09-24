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
  * keyup on searchfield to change the hidden href
  * @author Andreas
  */
  keyup(){
    if ($(event.target).attr('id') === 'search-field'){
      console.log($('#search-field').val())
      $('.searchtest').attr('href', `/searchresult/${$('#search-field').val()}`)
    }
  }

  /**
  * Keydown on enter to search
  * @author Andreas
  */
  keydown() {
    if ($(event.target).attr('id') === 'search-field' && $(event.target).val() !== '' && (event.keyCode == 13 || event.which == 13)) {
      $('.searchtest').trigger('click');
    }

  }

}