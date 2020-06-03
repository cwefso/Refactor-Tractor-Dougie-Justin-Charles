const chai = require('chai');
import { expect } from 'chai';
import DomUpdates from '../src/domUpdates.js';
const spies = require('chai-spies');
chai.use(spies);
let domUpdates

describe('DomUpdates', () => {
  beforeEach(() => {
    domUpdates = new DomUpdates()
    global.document = {}
    chai.spy.on(document, ['insertAdjacentHTML'], () => {})
  })

  it.only('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });
})

