class Pantry {
  constructor(userData) {    
    this.contents = typeof userData === "object" ? userData.pantry : null;
  }

  returnIds(locationToSearch) {
    return locationToSearch.map(ingredient => ingredient.id);
  }

  returnIngredient(id, ingredientList) {
    let inPantry = ingredientList.find(ingredient => {
      if(ingredient.id === id) {
        return ingredient
      }
    }) 
    return inPantry ? inPantry : null
  }

  filterPantryFromRecipe(recipe) {
    let recipeIds = this.returnIds(recipe.ingredients)
    return this.contents.filter(ingredient => recipeIds.includes(ingredient.id))
  }

  returnAmountInRecipe(recipe) {
    let recipeData = recipe.ingredients.reduce((ingredientData, ingredient) => {
      ingredientData.push({'id' : ingredient.id,'amount' : ingredient.quantity.amount,})
      return ingredientData
    },[])
    return recipeData;
  }

  hasEnough(recipe) {
    let ids = this.returnIds(this.contents);
    if(typeof recipe !== 'object') return null;
    if(ids.includes(undefined)) return false;
    let recipeIngredientsInPantry = recipe.ingredients.reduce((total, ingredient) => {
      if (ids.includes(ingredient.id)){
        total ++; 
      }
      return total;
    },0);
    let amountInRecipe = recipe.ingredients.length;
    return recipeIngredientsInPantry === amountInRecipe ? true : false; 
  }

  returnIngredientsNeeded(recipe) {
    let amountInRecipe = this.returnAmountInRecipe(recipe)
    let filteredPantry = this.filterPantryFromRecipe(recipe)
    let ingredientsNeeded = amountInRecipe.reduce((totalNeeded, recipeIngredient) => {
      let pantryIngredient = this.returnIngredient(recipeIngredient.id, filteredPantry)
      if(pantryIngredient) {
        let amountNeeded = recipeIngredient.amount -= pantryIngredient.amount
        if(amountNeeded > 0) {
          totalNeeded.push(recipeIngredient)
        }
      } else {
        totalNeeded.push(recipeIngredient)
      }
      return totalNeeded
    },[])
    return ingredientsNeeded[0] ? ingredientsNeeded : null
  }
  returnCostToCookRecipe(recipe) {}
  addIngredientsToPantry() {}
  removeIngredientsUsed() {}
}


export default Pantry;

/*
Every User should have a pantry. A Pantry holds on to all the ingredients 
its owner has stocked, and the amount of each ingredient they have. As a user, I should be able to:

Determine whether my pantry has enough ingredients to cook a given meal

Determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry
Determine how much it will cost to buy the necessary ingredients needed to cook a given meal, based on what’s in my pantry
Add the necessary ingredients to my pantry (and keep this up to date with the database via fetch)
Remove the ingredients used for a given meal from my pantry, once that meal has been cooked
*/
