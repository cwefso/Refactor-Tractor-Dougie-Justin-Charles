class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
  }

  calculateCost() {
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))
        }
      })
    });
    return costCounter;
  }

   getIngredientNameByID() {
    return this.ingredients.map(item => {
      return this.ingredientsData.forEach(ingredient => {
        if (item.id === ingredient.id) {
          item.name = ingredient.name
        }
      })
    })
  }


  filterRecipes() {
    //user should be able to filter recipes by tag
  }


  

}

export default Recipe;
