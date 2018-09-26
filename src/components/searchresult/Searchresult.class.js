import Base from '../../base/Base.class';
import {
  template,
  paginationTemplate
} from './Searchresultpage.template';
/**
 * Searchresultpage in main for route '/'
 *
 */
export default class Searchresult extends Base {
  constructor(searchStr, filters, favorites) {
    super();
    this.myFavorites = favorites;
    this.searchStr = searchStr;
    this.filterArray = filters;
    this.checkIfExist();
    }

  checkIfExist(){
    setTimeout(() => {
      if(this.recipes) {
        this.start()
      } else {
        this.checkIfExist();
      }
    }, 50);

  }

  start() {
      $('main').empty();
      this.render('main');
      this.lastRenderedIndex = 0;
      this.searchRecipes = this.searchResults();
      this.renderAll();

  }

  /**
   * Does all the checks and rendering in order to display the right recipes.
   * @author Andreas
   */
  renderAll() {
    this.renderAllRecipes();
    this.markFilters();
    this.disableNextOrPrev();
    this.setActiveLink();
    this.filterCollapseController();
  }


  /**
   * Eventhandler
   * Checks if there is a change to checkboxes.
   * Then either add the name of it to an array or remove it
   * Call renderAllRecipes
   * @author Andreas
   */
  change() {
    if ($(event.target).is('input[type=checkbox]')) {
      let name = $(event.target).attr('name');
      if ($(event.target).is(':checked')) {
        this.filterArray.push(name);
      } else {
        let index = this.filterArray.indexOf(name);
        if (index > -1) {
          this.filterArray.splice(index, 1)
        }
      }
      this.renderAll();
    }
  }

  click() {
    for (let i = 0; i < this.pages.length; i++) {
      if ($(event.target).hasClass(`pagination-${i+1}`)) {
        this.lastRenderedIndex = i;
        this.renderActiveAndScroll();
      }
    }

    if ($(event.target).hasClass('previous')) {
      if (this.lastRenderedIndex > 0) {
        this.lastRenderedIndex--;
        this.renderActiveAndScroll();
      }

    }

    if ($(event.target).hasClass('next')) {
      if (this.lastRenderedIndex + 1 < this.pages.length) {
        this.lastRenderedIndex++;
        this.renderActiveAndScroll();
      }
    }
  }

  renderActiveAndScroll(){
    this.renderAPage(this.lastRenderedIndex);
    this.setActiveLink();
    setTimeout(() => {
      $(window).scrollTop($(document).height());
    }, 0);

  }

  /**
   * Empties both holders & filters the recipes by the selected boxes
   * Gets how many pages that is needed to render
   * Checks if there is any recipes. If there is then renders the recipes else it renders an error msg.
   * @author Andreas
   */
  renderAllRecipes() {
    $('.search-recipe-result').empty();
    $('.pagination-holder').empty();
    this.filteredRecipes = this.filterRecipe(this.filterArray);
    this.getPageCounter(this.filteredRecipes.length / 5);


    if (this.filteredRecipes.length > 0) {
      this.renderAPage(0);
      this.render('.pagination-holder', 'paginationTemplate');
    } else {
      $('.search-recipe-result').append('<h3 class="danger px-4 px-md-0">Tyvärr hittar vi inget recept på din sökning. Var god försök igen.</h3>')
    }
  }

  /**
   * Filtering recipes after an array with filter-words.
   * Then returns the filtered array.
   * @author Andreas
   */
  filterRecipe(filterArray) {
    let arr = this.searchRecipes.filter(recipe => {
      if (filterArray.every(filter => {
          return recipe.filters.includes(filter)
        })) {
        return recipe;
      }
    })
    return arr;
  }

  /**
   * Empty + renders the specified page
   * Then runs disableNextorPrev
   * @author Andreas
   */
  renderAPage(pageNumber) {
    $('.search-recipe-result').empty();
    $('.search-recipe-result').append(this.pages[pageNumber]);
    this.disableNextOrPrev();
  }


  /**
   * Recieves a number of pages which is (number of recipes / 5)
   * As each page should display 5 recipes.
   * Then pushes arrays with 5 recipes in it to a bigger array (this.pages)
   * @author Andreas
   */
  getPageCounter(numberOfPages) {
    numberOfPages = Math.ceil(numberOfPages);
    let fullArr = this.getRecipeBoxes();
    this.pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      let fiveArr = fullArr.slice(i * 5, 5 * (i + 1));
      this.pages.push(fiveArr);
    }
  }


  /**
   * Returns an array with html for recipeboxes.
   * The array is produced by checking all the filtered recipes.
   * @author Andreas
   */
  getRecipeBoxes() {
    return this.filteredRecipes.map(recipe => {
      return `
      <div class="search-item">
        <button class="heart" data-id="${recipe.url}" title="Lägg detta till favoriter"><i class="${this.myFavorites.favorites.includes(recipe.url) ? 'fas' : 'far'} fa-heart"></i></button>
        <a href="/recept/${recipe.url}" class="no-decoration-a-tag pop">
          <div class="media p-1 p-sm-3 mt-0 border">
            <img class="m-1 mr-3 m-sm-0 mr-sm-4 media-img rounded" src="${recipe.imgLink}"
              alt="${recipe.imgAlt}">
            <div class="media-body ">
              <h5 class="mt-0 media-heading d-inline-block">${recipe.title}</i></h5>
              <i class="fas fa-angle-right fa-lg"></i>
              <p class="w-100 m-0 mt-1 text-muted">Såvrighetsgrad: 
                <i class="fas fa-star ${recipe.difficulty < 1 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 2 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 3 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 4 ? 'text-muted' : ''} mr-1"></i>
                <i class="fas fa-star ${recipe.difficulty < 5 ? 'text-muted' : ''} mr-1"></i>
              </p>
              <p class="mt-2">${recipe.description}</p>
              <div class="row recipe-info-wrapper">
                <p class="col-6 mb-0 text-muted"><i class="fas fa-utensils mr-2"></i>${recipe.nutrientsPerPortion.calories.toFixed()} kalorier</p>
                <p class="col-6 mb-0 text-muted text-right"><i class="far fa-clock mr-2"></i>${this.calcTime(recipe)}</p>
              </div>
            </div>
          </div>
        </a>
      </div>`;
    })
  }




  /**
   * Marks filters that is sent to search-result as a string
   * @author Andreas
   */
  markFilters() {
    let getAll = $('input[type=checkbox]');
    this.filterArray.forEach(x => {
      getAll.each(function () {
        if ($(this).attr('name') == x) {
          $(this).prop('checked', true)
        }
      });
    })
  }


  /**
   * Set active link on the page that is showing in the pagination-bar
   * @author Andreas
   */
  setActiveLink() {
    $('a.page-link').removeClass('active');
    $(`.pagination-${this.lastRenderedIndex+1}`).addClass('active');
  }

  /**
   * A check if it should disable next or previous.
   * @author Andreas
   */
  disableNextOrPrev() {
    if (this.pages.length === this.lastRenderedIndex + 1) {
      $('.next-li').addClass('disabled');
      $('.next').attr('tabindex', '-1');
    } else {
      $('.next-li').removeClass('disabled');
      $('.next').removeAttr('tabindex');
    }
    if (this.lastRenderedIndex === 0) {
      $('.previous-li').addClass('disabled');
      $('.previous').attr('tabindex', '-1');
    } else {
      $('.previous-li').removeClass('disabled');
      $('.previous').removeAttr('tabindex');
    }
  }

  /**
   * Returns html with li elements
   * Each li element is produced by how many pages that is in this.page
   * @author Andreas
   */
  paginationLiTemplate() {
    let fullhtml = '';
    for (let i = 0; i < this.pages.length; i++) {
      fullhtml += `
      <li class="page-item"><a class="page-link text-primary pagination-${i+1}">${i+1}</a></li>
      `
    }
    return fullhtml
  }



  /**
   * Takes the search-string that is provided to the constructor.
   * Then search filters out all recipes with the searchstr and returns an array with the recipes.
   * @author Andreas
   */
  searchResults() {
    let arr;
    if (this.searchStr) {
      arr = this.recipes.filter(x => {
        if (x.title.toLowerCase().includes(this.searchStr.toLowerCase())) {
          return x;
        } else if (x.ingredientsPerPortion.some(xx => xx.name.toLowerCase().includes(this.searchStr.toLowerCase()))) {
          return x;
        }
      })
    } else {
      arr = this.recipes;
    }
    return arr;
  }

  /**
   * If less that 768 (mobile and such) then trigger a click on the categorie/filter-collapse.
   * This displays it as not collapsed.
   * @author Andreas
   */
  filterCollapseController() {
    if ($(window).width() < 768) {
      $('#collapseCategory').collapse();
      $('#collapseFilter').collapse();

    }
  }
}

Searchresult.prototype.template = template;
Searchresult.prototype.paginationTemplate = paginationTemplate;
