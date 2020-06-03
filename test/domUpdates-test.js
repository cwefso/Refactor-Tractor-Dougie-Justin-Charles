const chai = require('chai');
import { expect } from 'chai';
import DomUpdates from '../src/domUpdates.js';
const spies = require('chai-spies');
chai.use(spies);
let domUpdates

describe('DomUpdates', () => {
  beforeEach(() => {
    global.document = {}
    chai.spy.on(document, ['insertAdjacentHTML'], () => {})
  })

  it.only('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('should invoke on startup', () => {
    DomUpdates.onStartUp()
    expect(DomUpdates.onStartUp).to.have.been.called(1);
  })
  it('should invoke populate cards', () => {
    DomUpdates.populateCards()
    expect(DomUpdates.populateCards).to.have.been.called(1);
  })
  it('should invoke view favorites', () => {
    DomUpdates.viewFavorites()
    expect(DomUpdates.viewFavorites).to.have.been.called(1);
  })
  it('should invoke viewSaved', () => {
    DomUpdates.viewSaved()
    expect(DomUpdates.viewSaved).to.have.been.called(1);
  })
  it('should invoke greetUser', () => {
    DomUpdates.greetUser()
    expect(DomUpdates.greetUser).to.have.been.called(1);
  })
  it('should invoke addCardToList', () => {
    DomUpdates.addCardToList
    expect(DomUpdates.addCardToList).to.have.been.called(1);
  })
  it('should invoke cardButtonConditionals', () => {
    DomUpdates.cardButtonConditionals()
    expect(DomUpdates.cardButtonConditionals).to.have.been.called(1);
  })
  it('should invoke display directions', () => {
    DomUpdates.displayDirections()
    expect(DomUpdates.displayDirections).to.have.been.called(1);
  })
  it('should invoke make recipes', () => {
    DomUpdates.makeRecipes()
    expect(DomUpdates.makeRecipes).to.have.been.called(1);
  })
  it('should invoke searchCards', () => {
    DomUpdates.searchCards()
    expect(DomUpdates.searchCards).to.have.been.called(1);
  })

})

