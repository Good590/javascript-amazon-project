import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js'

// async: makes a function return a promise
async function loadPage() {
  try{
    // throw 'error1';

    // 只能在async内部用
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);


  } catch(error) {
    console.log('Unexpected error. Please try again later. ')
  }

  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();


// 1.先运行异步代码 2.运行resolve 3.运行then
// 当创建Promise时，回调函数立即执行
// resolve里的参数使得两个步骤共享某一个值

/*--------------------------------------
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
}));
*/

// --------------------------------------------
// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value); 

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });


// ----------------------------------------------
// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary()
//   });;
// });
