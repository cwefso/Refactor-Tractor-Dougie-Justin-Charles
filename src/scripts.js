import './css/base.scss';
import './css/styles.scss';
import domUpdates from './domUpdates';

const favButton = document.querySelector('.view-favorites');
const savedButton = document.querySelector('.view-saved')
const homeButton = document.querySelector('.home')
const cardArea = document.querySelector('.all-cards');
const searchBar = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')

homeButton.addEventListener('click', domUpdates.cardButtonConditionals);
favButton.addEventListener('click', domUpdates.viewFavorites);
savedButton.addEventListener('click', domUpdates.viewSaved)
cardArea.addEventListener('click', domUpdates.cardButtonConditionals);
searchButton.addEventListener('click', domUpdates.searchCards);



window.onload = domUpdates.getData()
