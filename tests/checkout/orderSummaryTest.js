import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage,cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite:renderOrderSummary' ,() => {
  // 利用Hook使多文件可以共享某个测试中的设置
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // HOOK-提前运行某些函数
  beforeAll(async() => {
    // loadProducts 是一个假设的函数，它接受一个回调函数作为参数。这个回调函数将在 loadProducts 完成其异步操作时被调用。
    await loadProductsFetch();
  });

  // HOOK-进行一些全局设置
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
  `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    // 重新加载
    loadFromStorage();

    renderOrderSummary();
  });

  // 需要测试： 1.页面的外观 
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2'); 

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1'); 

    document.querySelector('.js-test-container').innerHTML = '';
  });

  // 2.页面的行为
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  // 清除生成的代码
  document.querySelector('.js-test-container').innerHTML = '';
});