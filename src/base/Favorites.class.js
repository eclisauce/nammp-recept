export default class Favorites {

  constructor() {
    try {
      const favorites = JSON.parse(localStorage.favorites);
      if (Array.isArray(favorites)) {
        this.favorites = favorites;
      }
    } catch (e) {
      this.favorites = [];
    }
  }


  /**
  * Add recipe to favorites
  * @author Martin
  */
  addToFavorites(obj) {
    this.favorites.push(obj);
    localStorage.favorites = JSON.stringify(this.favorites);
  }


  /**
  * Removes Recipe from Favorites
  * @author Martin
  */
  removeFromFavorites(url) {
    this.favorites = this.favorites.filter((favorite) => favorite !== url);
    localStorage.favorites = JSON.stringify(this.favorites);
  }


  /**
  * Check if a recipe exists in Favorites
  * @author Martin
  * @return Boolean Returns true if exist in favorites
  */
  checkIfExist(url) {
    for(let favorite of this.favorites) {
      if (favorite.url === url) {
        return true;
      } else {
        return false;
      }
    }
  }

}
