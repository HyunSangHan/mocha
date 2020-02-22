'use strict';

var helpers = require('./helpers');
var run = helpers.runMochaJSON;
var args = [];

describe('unhandled rejections', function() {
  it('handles unhandled rejections from async specs', function(done) {
    run('unhandled.fixture.js', args, function(err, res) {
      if (err) {
        done(err);
        return;
      }
      expect(res, 'to have failed with error', 'global error', 'test error')
        .and('to have pending test count', 0)
        .and('to have passed test count', 0)
        .and('to have failed test count', 3)
        .and(
          'to have failed test',
          'should fail when faced with an unhandled rejection',
          'should fail exactly once when a global promise is rejected first',
          'should fail exactly once when a global promise is rejected second'
        );

      done();
    });
  });
});
