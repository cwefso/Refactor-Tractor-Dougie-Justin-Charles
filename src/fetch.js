const fetch = require("node-fetch")

var indredientsUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData'
var recipesUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData'
var usersUrl = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData'


let data = {

  getUsersData() {
    return fetch(usersUrl)
      .then(res => {
        return res.json()
      })
      .then(data => {
        return data.wcUsersData
      })
      .catch(err => {
        alert(err.message)
      })
  },


  getIngredientsData() {
    return fetch(indredientsUrl)
      .then(res => {
        return res.json()
      })
      .then(data => {
        return data.ingredientsData
      })
      .catch(err => {
        alert(err.message)
      })
  },


  getRecipeData() {
    return fetch(recipesUrl)
      .then(res => {
        return res.json()
      })
      .then(data => {
        return data.recipeData
      })
      .catch(err => {
        alert(err.message)
      })
  }
}

export default data;