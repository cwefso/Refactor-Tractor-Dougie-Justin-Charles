const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
import User from '../src/user.js';
import Pantry from '../src/pantry.js';

let userData
let user1;
let user1Pantry;
let userData2
let justin
let justinPantry
let recipeData
let halfUser
let halfUserData
let halfUserPantry
let costData

describe('Pantry', () => {
  beforeEach(() => {
    userData = {
      "id": 1,
      "name": "Saige O'Kon",
      "pantry": [
        {
          "ingredient": 11477,
          "amount": 1
        },
        {
          "ingredient": 93820,
          "amount": 1
        },
        {
          "ingredient": 11297,
          "amount": 3
        },
        {
          "ingredient": 11547,
          "amount": 5
        },
      ]
    };
    userData2 = {
      "id": 3,
      "name": "Justin Volk",
      "pantry": [
        {
          "id": 12061,
          "amount": 0.5,
        },
        {
          "id": 19334,
          "amount": 6,
        
        },
        {
          "id": 12104,
          "amount": 0.5,
        },
        {
          "id": 12115,
          "amount": 1,
        },
        {
          "id": 4047,
          "amount": 6,
        },
        {
          "id": 10019071,
          "amount": 1,
        },
        {
          "id": 8212,
          "amount": 1,
        },
        {
          "id": 19911,
          "amount": 5,
        },
        {
          "id": 8121,
          "amount": 3,
        },
        {
          "id": 12142,
          "amount": 0.5,
        },
        {
          "id": 2047,
          "amount": 0.25,
        },
        {
          "id": 2050,
          "amount": 1,
        }
      ]
    }
    halfUserData = {
      "id": 3,
      "name": "half recipe",
      "pantry": [
        {
          "id": 12061,
          "amount": 0.25,
        },
        {
          "id": 19334,
          "amount": 3,
        
        },
        {
          "id": 12104,
          "amount": 0.25,
        },
        {
          "id": 12115,
          "amount": 0.5,
        },
        {
          "id": 4047,
          "amount": 3,
        },
        {
          "id": 10019071,
          "amount": 0.5,
        },
        {
          "id": 8212,
          "amount": 0.5,
        },
        {
          "id": 19911,
          "amount": 2.5,
        },
        {
          "id": 8121,
          "amount": 1.5,
        },
        {
          "id": 12142,
          "amount": 0.25,
        },
        {
          "id": 2047,
          "amount": 0.125,
        },
        {
          "id": 2050,
          "amount": 0.5,
        }
      ]
    }

    recipeData = {
      "name": "Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)",
      "id": 721146,
      "image": "https://spoonacular.com/recipeImages/721146-556x370.jpg",
      "ingredients": [
        {
          "name": "almonds",
          "id": 12061,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "name": "brown sugar",
          "id": 19334,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "name": "coconut",
          "id": 12104,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "name": "coconut cream",
          "id": 12115,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "name": "coconut oil",
          "id": 4047,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "name": "dark chocolate chips",
          "id": 10019071,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "name": "granola",
          "id": 8212,
          "quantity": {
            "amount": 1,
            "unit": "Handful"
          }
        },
        {
          "name": "maple syrup",
          "id": 19911,
          "quantity": {
            "amount": 5,
            "unit": "tablespoons"
          }
        },
        {
          "name": "oatmeal",
          "id": 8121,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        },
        {
          "name": "pecans",
          "id": 12142,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "name": "salt",
          "id": 2047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "name": "vanilla extract",
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        }
      ],
      "instructions": [
        {
          "number": 1,
          "instruction": "Preheat the oven to 325 degrees F.Coarsely chop the almonds and pecans."
        },
        {
          "number": 2,
          "instruction": "Combine the oats, almonds, pecans, and salt in a bowl. Toss to combine.In a medium-sized bowl, combine the coconut oil (measure exactly when it's melted and not in the hardened state), and 1/2 cup chocolate chips.Microwave in bursts of 15 seconds stirring in between each burst for 15 seconds until completely melted.Stir in the brown sugar (measured lightly packed), honey or maple syrup, and vanilla extract."
        },
        {
          "number": 3,
          "instruction": "Pour the chocolate wet mixture into the oat and nut mixture and stir until well combined."
        },
        {
          "number": 4,
          "instruction": "Spread the granola evenly onto a parchment lined baking sheet."
        },
        {
          "number": 5,
          "instruction": "Bake for 20-30 minutes (depending on the heat of your oven) making sure to flip and stir the granola around every 6-8 minutes."
        },
        {
          "number": 6,
          "instruction": "Remove and allow the granola to harden and set up. (It may be soft and not very \"granola-like\", but it hardens as it dries out so be careful to not over-cook it). Mine generally takes about 21 minutes to be fully baked.Allow the granola to sit at room temperature for a few hours to harden and set up.Once the granola is hardened, stir in the remaining 1/2 cup chocolate chips and the toasted flaked coconut.To make a yogurt bowl: fill a bowl with the coconut cream yogurt, add a swirl of nut butter, add some fruit such as a banana, add the granola, and finish with chia seeds. Enjoy immediately."
        }
      ],
      "tags": [
        "side dish"
      ]
    },
    costData = [
      { id: 19334, name: 'brown sugar', estimatedCostInCents: 559 },
      { id: 2047, name: 'salt', estimatedCostInCents: 280 },
      { id: 2050, name: 'vanilla', estimatedCostInCents: 926 },
      { id: 19911, name: 'maple', estimatedCostInCents: 349 },
      { id: 12061, name: 'whole almonds', estimatedCostInCents: 1029 },
      { id: 12104, name: 'coconut', estimatedCostInCents: 918 },
      { id: 12115, name: 'coconut cream', estimatedCostInCents: 304 },
      { id: 4047, name: 'coconut oil', estimatedCostInCents: 152 },
      { id: 10019071, name: 'dark chocolate morsels', estimatedCostInCents: 632},
      { id: 8212, name: 'granola cereal', estimatedCostInCents: 381 },
      { id: 8121, name: 'oatmeal', estimatedCostInCents: 659 },
      { id: 12142, name: 'pecan', estimatedCostInCents: 314 }
    ]
    user1 = new User(userData);
    justin = new User(userData2);
    halfUser = new User(halfUserData);
    user1Pantry = new Pantry(user1, user1.id);
    justinPantry = new Pantry(justin, justin.id);
    halfUserPantry = new Pantry(halfUser, halfUser.id);
  })
  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });
  it('should be an instance of Pantry', () => {
    expect(user1Pantry).to.an.instanceof(Pantry);
  })
  it('should accept user ingredients', () => {
    expect(user1Pantry.contents).to.eql([
      {
        "ingredient": 11477,
        "amount": 1
      },
      {
        "ingredient": 93820,
        "amount": 1
      },
      {
        "ingredient": 11297,
        "amount": 3
      },
      {
        "ingredient": 11547,
        "amount": 5
      },
    ])
  });
  it('should be null if not passed ingredients', () => {
    let pantry2 = new Pantry();
    expect(pantry2.contents).to.equal(null);
  });
  it('should only accept correct data type for ingredients', () => {
    let pantry2 = new Pantry("")
    expect(pantry2.contents).to.equal(null)
  });
  describe('return ids', () => {

    it('returnIds should return array with id numbers in pantry', () => {
      expect(justinPantry.returnIds(justinPantry.contents)).to.eql([
        12061,    19334,
        12104,    12115,
        4047, 10019071,
        8212,    19911,
        8121,    12142,
        2047,     2050
      ]);
    });
    it('should return ids in recipe', () => {
      expect(justinPantry.returnIds(recipeData.ingredients)).to.eql([
        12061,    19334,
        12104,    12115,
        4047, 10019071,
        8212,    19911,
        8121,    12142,
        2047,     2050
      ])
    })
  });
  describe('returnPantryIngredient', () => {

    it('should return item in pantry if given id and location to search', () => {
      expect(justinPantry.returnIngredient(12061, justinPantry.contents)).to.eql({ id: 12061, amount: 0.5 })
    });
    it.skip('should return null if not in pantry', () => { });
  })
  describe('isEnough', () => {
    it('should return true if pantry has enough ingredients for recipe', () => {
      let trueTest = justinPantry.hasEnough(recipeData);
      expect(trueTest).to.equal(true);
    });
    it('should return false if pantry doesnt have enough ingredients', () => {
      let falseTest = user1Pantry.hasEnough(recipeData)
      expect(falseTest).to.equal(false)
    });
    it.skip('should return null if not passed an object', () => {
      let nullTest = user1Pantry.hasEnough()
      expect(nullTest).to.equal(null)
    });
  })
  describe('amount in recipe', () => {
    it('should filter pantry from recipe', () => {
      let filterTest = justinPantry.filterPantryFromRecipe(recipeData)
      expect(filterTest).to.eql([
        { id: 12061, amount: 0.5 },
        { id: 19334, amount: 6 },
        { id: 12104, amount: 0.5 },
        { id: 12115, amount: 1 },
        { id: 4047, amount: 6 },
        { id: 10019071, amount: 1 },
        { id: 8212, amount: 1 },
        { id: 19911, amount: 5 },
        { id: 8121, amount: 3 },
        { id: 12142, amount: 0.5 },
        { id: 2047, amount: 0.25 },
        { id: 2050, amount: 1 }
      ])
    })
    it('should return amount in recipe', () => {

    })
  })
  describe('return ingredients needed', () => {

    it('should determine amount of ingredients still needed to cook a recipe based on pantry', () => {
      let wholeRecipeNeeded = user1Pantry.returnIngredientsNeeded(recipeData);
      expect(wholeRecipeNeeded).to.eql([
        {
          "id": 12061,
          "amount": 0.5,
        },
        {
          "id": 19334,
          "amount": 6,
          
        },
        {
          "id": 12104,
          "amount": 0.5,
        },
        {
          "id": 12115,
          "amount": 1,
        },
        {
          "id": 4047,
          "amount": 6,
        },
        {
          "id": 10019071,
          "amount": 1,
        },
        {
          "id": 8212,
          "amount": 1,
        },
        {
          "id": 19911,
          "amount": 5,
        },
        {
          "id": 8121,
          "amount": 3,
        },
        {
          "id": 12142,
          "amount": 0.5,
        },
        {
          "id": 2047,
          "amount": 0.25,
        },
        {
          "id": 2050,
          "amount": 1,
        }
      ])
    });
    it('should return null if pantry has enough for the recipe', () => {
      let nullTest = justinPantry.returnIngredientsNeeded(recipeData)
      expect(nullTest).to.equal(null)
    });
    it('should return the amount of ingredients needed if the pantry doesnt have enough', () => {
      let halfTest = halfUserPantry.returnIngredientsNeeded(recipeData)
      expect(halfTest).to.eql([
        {
          "id": 12061,
          "amount": 0.25,
        },
        {
          "id": 19334,
          "amount": 3,
          
        },
        {
          "id": 12104,
          "amount": 0.25,
        },
        {
          "id": 12115,
          "amount": 0.5,
        },
        {
          "id": 4047,
          "amount": 3,
        },
        {
          "id": 10019071,
          "amount": 0.5,
        },
        {
          "id": 8212,
          "amount": 0.5,
        },
        {
          "id": 19911,
          "amount": 2.5,
        },
        {
          "id": 8121,
          "amount": 1.5,
        },
        {
          "id": 12142,
          "amount": 0.25,
        },
        {
          "id": 2047,
          "amount": 0.125,
        },
        {
          "id": 2050,
          "amount": 0.5,
        }
      ])
    })
  })
  describe('cost to cook recipe', () => {
    it('should return 0 if pantry has all ingredients', () => {
      let noCost = justinPantry.returnCostToCook(recipeData, costData);
      expect(noCost).to.equal(0)
    })
    it('should return the cost of the whole recipe if pantry has no ingredients', () => {
      let allCost = user1Pantry.returnCostToCook(recipeData, costData);
      expect(allCost).to.equal(11431.5)
    })
    it('should return cost if user has half the amount of ingredients in pantry', () => {
      let halfCost = halfUserPantry.returnCostToCook(recipeData, costData);
      expect(halfCost).to.equal(5715.75)
    })
  })
  describe('add ingredients to pantry', () => {
    it('should add no ingredients to pantry if user has all ingredients', () => {
      
    })
    it('should add all ingredients to pantry if user has none', () => {

    })
    it('should add half ingredients to pantry if user has none', () => {

    })
  })
  describe('remove ingredients from pantry', () => {
    it('should add no ingredients to pantry if user has all ingredients', () => {
      
    })
    it('should add all ingredients to pantry if user has none', () => {

    })
    it('should add half ingredients to pantry if user has none', () => {

    })
  })

})