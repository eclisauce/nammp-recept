  import Base from './Base.class';

  /**
   * Runs in the constructor
   * Loading All JSON.
   *
   */
  export default class JsonLoad extends Base {
    constructor() {
      super();
      $.getJSON("/json/naring.json", (food) => {
        JsonLoad.foodData = food;
      }).then($.getJSON("/json/recipes.json", (recipes) => {
        JsonLoad.recipes = recipes;
      }));
    }


  }



