const fetch = require('node-fetch')
class Pantry {
  constructor(userData) { 
    this.id = userData.id   
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
    fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': 'fe-apps.herokuapp.com',
        'Content-Type': 'application/json',
        'Content-Length': '75'
      },

    //make sure to serialize your JSON body
      body: JSON.stringify({
        "userID" : this.id,
        "ingredientID" : ingredientId,
        "ingredientModification": modificationNum
      })
    })
    .then( (response) => { 
    //do something awesome that makes the world a better place
    });
      // take ingredient list or pantry/ 

    
    /*
    POST /api/v1/whats-cookin/1911/users/wcUsersData/?userID=1 HTTP/1.1
    Host: fe-apps.herokuapp.com
    Content-Type: application/json
    Content-Length: 75

{
  "userID" : 1,
  "ingredientID" : 18371,
  "ingredientModification": 7
}
    */
  }
  addIngredientsToPantry(recipe) {
    // Add the necessary ingredients to my pantry
    let ingredientsNeeded = this.returnIngredientsNeeded(recipe)
    ingredientsNeeded.forEach(ingredient => {
      let inPantry = this.returnIngredient(ingredient.id, this.pantry);
      inPantry ? (inPantry.amount + ingredient.amount) : this.contents.push(ingredient)
    })
    this.postToPantry(ingredientsNeeded)
    // call the method that get the ingredients still needed
    // add those amounts to the pantry
    // if the ingredient is in the pantry, then just add the amounts to whats there
    // if not then add that ingredient to the pantry
    // post the new pantry to the api using fetch

    // (and keep this up to date with the database via fetch)
  }
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
