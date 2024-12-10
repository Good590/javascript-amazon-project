class Cart {
  // 区别于Object
  cartItems;
  // 私有属性
  #localStorageKey;

  // 构造函数(创建时自动运行，适合放一些设置)
  constructor(localStorageKey) {
    // this指向生成的对象
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();

    // 不能返回任何
  }

  // 简写，相当于loadFromStorage: function()
  // 类之外的属性无权从存储中调用加载
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '2'
      }];
    }
  };

  // localstorage只能存string，所以必须要先转换
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  };

  // 将函数化为更小的函数增加代码可读性
  // 用于将某个产品添加到购物车的函数
  addToCart(productId) {
    let matchingItem;

    // 如果某个产品已经在购物车存在
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      // 加入购物车
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    
    this.saveToStorage();
  };

  // 用于从购物车删除产品的函数
  removeFromCart(productId) {
    // 1.创建一个新数组
    const newCart = [];

    // 2.循环遍历购物车cart
    this.cartItems.forEach((cartItem) => {
      // 如果不等于要删除的id就加入新数组
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    // 更新购物车
    this.cartItemsart = newCart;

    this.saveToStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    // 1.look through the cart and find the product
    // 2.upadte the deliveryOptionId of the product
    let matchingItem;
  
    // 如果某个产品已经在购物车存在
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
    // 14:50:17
  }
}

// oop中首字母全大写
// 利用函数生成对象，不需要通过一直复制代码生成对象

// 可以直接给构造函数传参
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);;


