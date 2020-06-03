import data from './fetch';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';

const favButton = document.querySelector('.view-favorites');
const savedButton = document.querySelector('.view-saved')
const homeButton = document.querySelector('.home')
const cardArea = document.querySelector('.all-cards');
const searchBar = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')
let user, pantry;


let ingredientsData
let recipeData
let users


let DomUpdates = {
  async getData() {
    users = await data.getUsersData()
    recipeData = await data.getRecipeData()
    ingredientsData = await data.getIngredientsData()
    DomUpdates.onStartup()
  },

  onStartup(){
    let userId = (Math.floor(Math.random() * 49) + 1)
    let newUser = users.find(user => {
      return user.id === Number(userId);
    });
    user = new User(newUser)
    pantry = new Pantry(newUser.pantry, newUser.id)
    DomUpdates.populateCards(recipeData, 'add', 'favorite');
    DomUpdates.greetUser();
  },

  populateCards(recipeData, saveStatus, favStatus) {
    cardArea.innerHTML = '';
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    searchBar.value = '';
    recipeData.forEach(recipe => {
      cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
      class='card'>
          <header id='${recipe.id}' class='card-header'>
            <button id='${recipe.id}' aria-label='add-${recipe.name}-to-saved-recipes' class='${saveStatus} card-button hover-items active-items'>
            </button>
            <button id='${recipe.id}' aria-label='add-${recipe.name}-to-favorite-recipes' class='${favStatus} favorite${recipe.id} card-button hover-items active-items'></button>
          </header>
            <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
            <img id='${recipe.id}' tabindex='0' class='card-picture'
            src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>

      </div>`)
    })
    DomUpdates.makeRecipes()
  },

  viewFavorites() {
    if (!user.favoriteRecipes.length) {
      favButton.innerHTML = 'You have no favorites!';
      return
    } else {
      cardArea.innerHTML = '';
      DomUpdates.populateCards(user.favoriteRecipes, 'add', 'favorite favorite-active');
    }
  },

  viewSaved() {
    if (!user.recipesToCook.length) {
      savedButton.innerHTML = 'You have no saved recipes!';
      return
    } else {
      cardArea.innerHTML = '';
      DomUpdates.populateCards(user.recipesToCook, 'add add-active', 'favorite');
    }
  },

  greetUser() {
    const userName = document.querySelector('.user-name');
    userName.innerHTML =
    user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
  },

  addCardToList(event, toggle, list, words, button) {
    let specificRecipe = recipeData.find(recipe => {
      if (recipe.id  === Number(event.target.id)) {
        return recipe;
      }
    })
    if (!event.target.classList.contains(toggle)) {
      event.target.classList.add(toggle);
      button.innerHTML = words;
      user.addToList(specificRecipe, list);
    } else if (event.target.classList.contains(toggle)) {
      event.target.classList.remove(toggle);
      user.removeFromList(specificRecipe, list)
    }
  },
  
  cardButtonConditionals(event) {
    if (event.target.classList.contains('favorite')) {
      DomUpdates.addCardToList(event, 'favorite-active', user.favoriteRecipes, 'View Favorites', favButton);
    } else if (event.target.classList.contains('card-picture')) {
      DomUpdates.displayDirections(event);
    } else if (event.target.classList.contains('home')) {
      DomUpdates.populateCards(recipeData, 'add', 'favorite')
    } else if (event.target.classList.contains('add')) {
      DomUpdates.addCardToList(event, 'add-active', user.recipesToCook, 'View Saved', savedButton);
    }
  },

  displayDirections(event) {
    let newRecipeInfo = recipeData.find(recipe => {
      if (recipe.id === Number(event.target.id)) {
        return recipe;
      }
    })
    let recipeObject = new Recipe(newRecipeInfo, ingredientsData);
    let cost = recipeObject.calculateCost()
    let costInDollars = (cost / 100).toFixed(2)
    recipeObject.getIngredientNameByID()
    cardArea.classList.add('all');
    cardArea.innerHTML = `<section aria-label='recipe-information'>
    <h3>${recipeObject.name}</h3>
    <p class='all-recipe-info'>
    <strong>It will cost: </strong><span class='cost recipe-info'>
    $${costInDollars}</span><br><br>
    <strong>You will need: </strong><span class='ingredients recipe-info'></span>
    <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
    </span></ol>
    </p>
    </section>`;
    let ingredientsSpan = document.querySelector('.ingredients');
    let instructionsSpan = document.querySelector('.instructions');
    recipeObject.ingredients.forEach(ingredient => {
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
      ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
      ${ingredient.name}</li></ul>
      `)
    })
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
      ${instruction.instruction}</li>
      `)
    })
  },

  makeRecipes() {
    let named = recipeData.forEach(item => {
      let newRecipe = new Recipe(item, ingredientsData)
      newRecipe.getIngredientNameByID()
    })
    return named
  },

  searchCards() {
    let searched = user.findRecipe(searchBar.value, recipeData)
    DomUpdates.populateCards(searched, 'add', 'favorite');
  },
}



export default DomUpdates;