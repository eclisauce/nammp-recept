/**
 * Add a render method to the Array class
 * that calls render (in Base) for each item
 * and also collects and returns the temp html divs
 *(see Base)
 */
Object.assign(Array.prototype, {
  render(selector = '', templateNo = '') {

    let html = '';

    for (let item of this) {
      html += item.render(selector, templateNo);
    }

    return html;

  }

});