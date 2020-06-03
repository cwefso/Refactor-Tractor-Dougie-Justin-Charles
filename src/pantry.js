class Pantry {
  constructor(userData, id) {  
    this.id = id  
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
        if(amountNeeded > 0) totalNeeded.push(recipeIngredient)
      } else {
        totalNeeded.push(recipeIngredient)
      }
      return totalNeeded
    },[])
    return ingredientsNeeded[0] ? ingredientsNeeded : null
  }
  // fetchIngredientCost() {
  //  const url = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData";
  //   return fetch(url)
  //   .then(response => response.json())
  //   .then(data => data.ingredientsData)
  //   .catch(err => err.message);
  // }
  returnCostToCook(recipe, ingredientData) {
    let ingredientsNeeded = this.returnIngredientsNeeded(recipe)
    if(!ingredientsNeeded) return 0
    let totalCostInCents = ingredientsNeeded.reduce((totalCost, ingredient) => {
      let costOfIngredient = this.returnIngredient(ingredient.id, ingredientData)
      let centsNeeded = costOfIngredient.estimatedCostInCents * ingredient.amount
      return totalCost + centsNeeded;
    }, 0)
    return totalCostInCents;
  }

  postToPantry(ingredientId, modificationNum) {
    let url = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData"
      return fetch(url , {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': 'fe-apps.herokuapp.com',
        'Content-Type': 'application/json',
        'Content-Length': '75'
      },
      body: JSON.stringify({
        "userID" : this.id,
        "ingredientID" : ingredientId,
        "ingredientModification": modificationNum
      })
    })
    .then((response) => { 
      let res = JSON.parse(response);
      console.log(res)
    })
    .catch((error) => {
      let err = JSON.parse(error);
      console.error(err)
    })
  }

  addIngredientsToPantry(recipe) {
    let ingredientsNeeded = this.returnIngredientsNeeded(recipe)
    ingredientsNeeded.forEach(ingredient => {
      let inPantry = this.returnIngredient(ingredient.id, this.pantry);
      let amountOfModification = inPantry.amount + ingredient.amount
      if(inPantry) { 
        ingredient.amount = amountOfModification
        this.postToPantry(ingredient.id, amountOfModification)
        
      } else {
        this.contents.push(ingredient)
        this.postToPantry(ingredient.id, ingredient.amount)
      }
    })
  }

  removeIngredientsUsed() {}
}


export default Pantry;

