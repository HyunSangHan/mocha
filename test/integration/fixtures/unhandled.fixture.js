'use strict';

function rejectWithError(err) {
  return new Promise(function (resolve, reject) {
    reject(new Error(err));
  });
}

it('should fail when faced with an unhandled rejection', function (done) {
  rejectWithError('rejection');
});

it('should fail exactly once when a global promise is rejected first', function (done) {
  process.nextTick(function () {
    rejectWithError('global error');
  });
});

it('should fail exactly once when a global promise is rejected second', function (done) {
  process.nextTick(function () {
    rejectWithError('test error');
  });

  process.nextTick(function () {
    rejectWithError('global error');
  });
});
