class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToList(recipe, list) {
    if (!list.includes(recipe)) {
      list.push(recipe)
    }
  }

  removeFromList(recipe, list) {
    const i = list.indexOf(recipe);
    list.splice(i, 1)
  }

  filterRecipes(tag, list) {
    return list.filter(recipe => {
      return recipe.tags.includes(tag)
    });
  }

  findRecipe(strgToSrch, arrayToSearch) {
    return arrayToSearch.filter(recipe => {
      return recipe.name.includes(strgToSrch)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(strgToSrch)
      })
    })
  }

}

export default User;
