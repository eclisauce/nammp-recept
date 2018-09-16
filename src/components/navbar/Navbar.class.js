import Base from '../../base/Base.class'
import navbarTemplate from './navbar.template';

export default class Navbar extends Base {
  constructor() {
    super();
  }
  template() {
    return navbarTemplate;
  }
}