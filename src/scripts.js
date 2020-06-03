import './css/base.scss';
import './css/styles.scss';
import DomUpdates from './domUpdates';

const favButton = document.querySelector('.view-favorites');
const savedButton = document.querySelector('.view-saved')
const homeButton = document.querySelector('.home')
const cardArea = document.querySelector('.all-cards');
const searchButton = document.querySelector('.search-button')


let domUpdates = DomUpdates;

window.onload = function() {
  domUpdates.getData()
}

homeButton.addEventListener('click', domUpdates.cardButtonConditionals)
favButton.addEventListener('click', domUpdates.viewFavorites);
savedButton.addEventListener('click', domUpdates.viewSaved);
cardArea.addEventListener('click', domUpdates.cardButtonConditionals);
searchButton.addEventListener('click', (event) => {
  event.preventDefault()
  domUpdates.searchCards()
});
