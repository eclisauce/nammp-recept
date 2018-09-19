import Base from '../../base/Base.class';
import template from './Recipepage.template';
import JsonLoad from '../../base/JsonLoad.class';


/**
 * Recipepage in main for route '/'
 *
 */
export default class Recipepage extends Base {
  constructor() {
    super();
  }

  click() {
    if ($(event.target).hasClass('testy')) {
      
    }
  }


}

Recipepage.prototype.template = template;