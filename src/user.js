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
    let smallString = strgToSrch.toLowerCase()
    return arrayToSearch.filter(recipe => {
      return recipe.name.toLowerCase().includes(smallString)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.toLowerCase().includes(smallString)
        || recipe.tags.find(tag => {
          return tag.toLowerCase().includes(smallString)
        })
      })
    })
  }

}

export default User;
