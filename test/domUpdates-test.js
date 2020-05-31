import domUpdates from '../src/domUpdates.js' 
import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

global.window = {}

chai.spy.on(window, ['getData'], () => true);

describe('Get Data', function() {
  it('Get fetched data', function(){
    getData();
    expect(domUpdates.getData).to.have.been.called(1);
  })
})

