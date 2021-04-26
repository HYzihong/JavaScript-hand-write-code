// const promise = new Promise(function(resolve, reject) {
  //   // ... some code
  
  //   if (/* 异步操作成功 */){
  //     resolve(value);
  //   } else {
  //     reject(error);
  //   }
  // });
  
  // let Promise = HPromise
  
      new Promise((resolve, reject) => {
        console.log('before reject')
        reject('reject error')
      }).then(res => {
        console.log(res)
      }, error => {
        console.log(error)
      })