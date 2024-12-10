export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryOptionId: '2'
    }];
  }
}


// localstorage只能存string，所以必须要先转换
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 将函数化为更小的函数增加代码可读性
// 用于将某个产品添加到购物车的函数
export function addToCart(productId) {
  let matchingItem;

  // 如果某个产品已经在购物车存在
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    // 加入购物车
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

// 用于从购物车删除产品的函数
export function removeFromCart(productId) {
  // 1.创建一个新数组
  const newCart = [];

  // 2.循环遍历购物车cart
  cart.forEach((cartItem) => {
    // 如果不等于要删除的id就加入新数组
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // 更新购物车
  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  // 1.look through the cart and find the product
  // 2.upadte the deliveryOptionId of the product
  let matchingItem;

  // 如果某个产品已经在购物车存在
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
  // 14:50:17
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);

    // 从后端加载回数据后再运行渲染函数
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}


export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);

  return text;
}