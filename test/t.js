'use strict';

describe('Error에 대한 Exception 실험', function() {
  it('[실험1] 문제없이 catch했기 때문에 테스트가 pass된다', function() {
    try {
      throw new Error('에러1');
    } catch (e) {
      console.log(e);
    }
  });

  it('[실험2] catch하지 않아서 테스트가 fail되어버린다. 여기서 만일 —allow-uncaught를 붙이면 Uncaught Error가 나고, 안붙이면 그냥 Error가 난다(Mocha라도 나서서 결국엔 catch해주므로)', function() {
    var err = new Error('에러2');
    console.log(err);
    throw err;
  });
});

describe('Promise Rejection에 대한 실험', function() {
  it('[실험3] promise rejection이 된 것을 catch했기 때문에 테스트가 이상없이 pass되었다.', function() {
    return new Promise(function(resolve, reject) {
      reject(new Error('에러3'));
    }).catch((e) => {
      console.log(e);
    });
  });

  it('[실험4] resolve된 promise를 return한 경우)', function() {
    // eslint-disable-next-line no-new
    new Promise(function(resolve, reject) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('UnhandledRejection이 발생하였다');
    });
    return new Promise(function(resolve, reject) {
      resolve();
    });
  });

  it.only('[실험5] setTimeout', function(done) {
    setTimeout(function() {
      throw new Error("test")
    }, 0)
    return done();
    // eslint-disable-next-line no-new
    // new Promise(function(resolve, reject) {
    //   // eslint-disable-next-line prefer-promise-reject-errors
    //   reject('UnhandledRejection이 발생하였다');
    // });
    // return new Promise(function(resolve, reject) {
    //   reject('리젝트된 프로미스')
    // });
  });

});