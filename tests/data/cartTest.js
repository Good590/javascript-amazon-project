import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    // 利用Mock创建一个假版本，以至于不需要从本地获取数据导致错误结果
    // param1:要模拟的对象 param2:要模拟的方法
    spyOn(localStorage, 'getItem').and.callFake(() => {
      // 这个函数用于想要getItem做什么(本例中要返回一个起始空数组，相当于购物车一开始并没有东西)
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    // 重新加载
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    // 测试一个方法被调用多少次
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // 测试第一项是否符合
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    // 模拟setItem防止存储
    spyOn(localStorage, 'setItem');

    // 利用Mock创建一个假版本，以至于不需要从本地获取数据导致错误结果
    // param1:要模拟的对象 param2:要模拟的方法
    spyOn(localStorage, 'getItem').and.callFake(() => {
      // 这个函数用于想要getItem做什么(本例中要返回一个起始空数组，相当于购物车一开始并没有东西)
      return JSON.stringify([]);
    });
    // 重新加载
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    // 测试一个方法被调用多少次
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // 测试第一项是否符合
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});