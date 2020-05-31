import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js'

let user1

describe('User', () => {
  beforeEach(() => {
    user1 = new User(1, 'Boba', [
      {
        'ingredient': 1077,
        'amount': 1
      },
      {
        'ingredient': 14412,
        'amount': 1
      },
      {
        'ingredient': 1009054,
        'amount': 3
      }]
    );
  });

  it('Should have a property of favoriteRecipes with a default value', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToList(recipeData[0], user1.favoriteRecipes)
    expect(user1.favoriteRecipes.includes(recipeData[0])).to.eql(true);
  });

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.removeFromList(recipeData, user1.favoriteRecipes);
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToList(recipeData[0], user1.favoriteRecipes);
    user1.addToList(recipeData[1], user1.favoriteRecipes);
    expect(user1.filterRecipes('antipasti', user1.favoriteRecipes)).to.eql([recipeData[0]]);
  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToList(recipeData[0], user1.favoriteRecipes);
    user1.addToList(recipeData[1], user1.favoriteRecipes);
    expect(user1.findRecipe('egg', user1.favoriteRecipes)).to.eql([recipeData[0]]);
  });

  it('Should be return empty array if no success in searching favoriteRecipes by name or ingredient', () => {
    user1.addToList(recipeData[0], user1.favoriteRecipes);
    user1.addToList(recipeData[1], user1.favoriteRecipes);
    expect(user1.findRecipe('sawdust', user1.favoriteRecipes)).to.eql([]);
  });

  it('Should be able to add recipes to recipesToCook', () =>{
    user1.addToList(recipeData[0], user1.recipesToCook)
    expect(user1.recipesToCook.includes(recipeData[0])).to.eql(true);
  });

  it('Should be able to remove recipes from recipesToCook', () =>{
    user1.removeFromList(recipeData, user1.favoriteRecipes);
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through recipesToCook by tag', () => {
    user1.addToList(recipeData[0], user1.recipesToCook);
    user1.addToList(recipeData[1], user1.recipesToCook);
    expect(user1.filterRecipes('antipasti', user1.recipesToCook)).to.eql([recipeData[0]]);
  });

  it('Should be able to search recipesToCook by name or ingredient', () => {
    user1.addToList(recipeData[0], user1.recipesToCook);
    user1.addToList(recipeData[1], user1.recipesToCook);
    expect(user1.findRecipe('egg', user1.recipesToCook)).to.eql([recipeData[0]]);
  });
});
