const STATUS_PENDING = 'pending' // 等待
const STATUS_FULFILLED = 'fulfilled'  // 成功
const STATUS_REJECTED = 'rejected'  // 失败
class HPromise{
  constructor(executor){// 构造方法(执行器函数)
    // PromiseStatus = 'pending'
    // PromiseResult = undefined

    this.status = STATUS_PENDING // 状态
    this.value  // 成功态
    this.reason // 失败态

    // 用来存储 订阅的内容的
    this.onSuccessCallbacks = [];
    this.onFailCallbacks = [];
    
    let resolve = value => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_FULFILLED
        this.value = value
        this.onSuccessCallbacks.forEach(fn => fn());
      }
    }
    
    let reject = reason => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_REJECTED
        this.reason = reason
        this.onFailCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  
  }  
  then(onFulfilled, onRejected){
    if(this.status === STATUS_FULFILLED){
        onFulfilled(this.value);
    }
    if(this.status === STATUS_REJECTED){
        onRejected(this.reason);
    }
    // 当Promise里面有异步请求控制状态改变时，会先走到then方法里面
    if(this.status === STATUS_PENDING) {
        this.onSuccessCallbacks.push(()=>{
            onFulfilled(this.value);
        });
        this.onFailCallbacks.push(()=>{
            onRejected(this.reason);
        });
    }
}

}