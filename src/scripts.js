import './css/base.scss';
import './css/styles.scss';
import data from './fetch';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import domUpdates from './domUpdates';

const favButton = document.querySelector('.view-favorites');
const savedButton = document.querySelector('.view-saved')
const homeButton = document.querySelector('.home')
const cardArea = document.querySelector('.all-cards');
const searchBar = document.querySelector('.search-input')
const searchButton = document.querySelector('search-button')
let user, pantry;

let ingredientsData
let recipeData
let users

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
savedButton.addEventListener('click', viewSaved)
cardArea.addEventListener('click', cardButtonConditionals);

const getData = async() => {
  users = await data.getUsersData()
  recipeData = await data.getRecipeData()
  ingredientsData = await data.getIngredientsData()
  onStartup()
}

window.onload = getData()

function onStartup() {
  let userId = (Math.floor(Math.random() * 49) + 1)
  let newUser = users.find(user => {
    return user.id === Number(userId);
  });
  user = new User(newUser)
  pantry = new Pantry(newUser.pantry)
  populateCards(recipeData);
  greetUser();
}

function viewFavorites() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
    return
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';
    populateCards(user.favoriteRecipes);
  }
}

function viewSaved() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.recipesToCook.length) {
    savedButton.innerHTML = 'You have no saved recipes!';
    return
  } else {
    savedButton.innerHTML = 'Refresh Saved Recipes'
    cardArea.innerHTML = '';
    populateCards(user.recipesToCook);
  }
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML =
  user.name.split(' ')[0] + ' ' + user.name.split(' ')[1][0];
}

function addCardToList(event, toggle, list, words, button) {
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
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('favorite')) {
    addCardToList(event, 'favorite-active', user.favoriteRecipes, 'View Favorites', favButton);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    populateCards(recipeData);
  } else if (event.target.classList.contains('add')) {
    addCardToList(event, 'add-active', user.recipesToCook, 'View Saved', savedButton);
  }
}


function displayDirections(event) {
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
  cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
  <p class='all-recipe-info'>
  <strong>It will cost: </strong><span class='cost recipe-info'>
  $${costInDollars}</span><br><br>
  <strong>You will need: </strong><span class='ingredients recipe-info'></span>
  <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
  </span></ol>
  </p>`;
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
}

function populateCards(recipeData) {
  cardArea.innerHTML = '';
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  recipeData.forEach(recipe => {
    cardArea.insertAdjacentHTML('afterbegin', `<div id='${recipe.id}'
    class='card'>
        <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' aria-label='add-button' class='add card-button hover-items active-items'>
          </button>
          <label for='favorite-button' class='hidden'>Click to favorite recipe
          </label>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button hover-items active-items'></button>
        </header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>

    </div>`)
  })
};
