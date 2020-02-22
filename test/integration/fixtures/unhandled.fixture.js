'use strict';

function rejectWith(err) {
  return new Promise(function (resolve, reject) {
    reject(err);
  });
}

var unresolvedPromise = new Promise(function () {});

it('fails when faced with an unhandled rejection', function () {
  rejectWith(new Error('rejection'));

  return unresolvedPromise;
});

it('fails exactly once when a global promise is rejected first', function () {
  process.nextTick(function () {
    rejectWith(new Error('global error'));
  });

  return unresolvedPromise;
});

it('fails exactly once when a global promise is rejected second', function () {
  process.nextTick(function () {
    rejectWith(new Error('test error'));
  });

  process.nextTick(function () {
    rejectWith(new Error('global error'));
  });

  return unresolvedPromise;
});