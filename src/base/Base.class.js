import Jsonflex from './jsonflex.js';
/**
 * Rendering framework from Nodebite
 *
 */
export default class Base {

  constructor() {
    this.loadAllJSON();
    new Jsonflex();
    if (!Base.subRenderCounter) {
      Base.subRenderCounter = 1;
      Base.renderingInProgress = false;
      Base.renderQueue = [];
    }
  }

  render(selector = '', templateNo = '') {

    // The basic idea is that the render method calls
    // template methods ("template" + templateNo)
    // gets the html generated and pushes it to the dom

    if (Base.renderingInProgress) {
      // If rendering is in progress then the call
      // to render is from inside a template
      // (delay execution of this "subrendering")
      return this.subrender(templateNo);
    }

    Base.renderingInProgress = true;
    let oldBaseEl = this.baseEl;
    this.baseEl = $(this[templateNo || 'template']());
    this.addEvents(templateNo);

    // If subrendering to a temporary holder
    if (selector.indexOf('.temp-render-holder') == 0) {
      $(selector).replaceWith(this.baseEl)
    }
    // If rerendering to existing place in the DOM
    else if (!selector && oldBaseEl) {
      oldBaseEl.replaceWith(this.baseEl);
    }
    // If rendering to a specific element in DOM
    else {
      $(selector || 'main').append(this.baseEl);
    }

    Base.renderingInProgress = false;

    // Take care of delayed subrendering
    while (Base.renderQueue.length) {
      let queued = Base.renderQueue.shift();
      queued.obj.render.apply(queued.obj, queued.args);
    }

  }

  subrender(templateNo) {
    // Temporarily return a unique holder for things to be subrendered
    Base.subRenderCounter++;
    let className = `temp-render-holder-${Base.subRenderCounter}`;
    Base.renderQueue.push({
      obj: this,
      args: [`.${className}`, templateNo]
    });
    return `<option class="${className}"/>`;
  }

  addEvents(templateNo) {
    // Add events to baseElements - so that an event calls a corresponding
    // method in the class (named event type + templateNo)
    let types = ['click', 'keyup', 'mouseenter', 'mouseleave', 'change', 'keydown'];
    for (let type of types) {
      let methodName = type + templateNo;
      if (this[methodName]) {
        this.baseEl[type]((e) => this[methodName](e));
      }
    }
  }

  // Global methods that are being used in more than one class

  loadAllJSON(){
    $.getJSON("/json/naring.json", (food) => {
      this.foodData = food;
    }).then(this.loadRecipeJSON());
  }

  loadRecipeJSON() {
    $.getJSON("/json/recipes.json", (recipes) => {
      this.recipes = recipes;
    });
  }


  saveAllRecipes(newRecipe){
    $.getJSON("/json/recipes.json", (recipes) => {
      this.recipes = recipes;
      this.recipes.push(newRecipe);
    }).then( () => {
      JSON._save('recipes.json', this.recipes).then(function () {
      })
    }).then(() => {
      this.loadRecipeJSON();
    });


  }


  calcTime(recipe){
    let time = recipe.time
    let minutes = time % 60;
    let hours = (time - minutes) / 60;
    let hourStr;
    let minuteStr;
    if (hours === 1){
      hourStr = `${hours} timme`;
    }
    else if (hours > 1) {
      hourStr = `${hours} timmar`;
    } else {
      hourStr = '';
    }
    if (minutes === 1){
      minuteStr = `${minutes} minut`;
    } else if (minutes > 1){
      minuteStr = `${minutes} minuter`;
    } else {
      minuteStr = '';
    }

    return `${hourStr} ${minuteStr}`
  }
}
