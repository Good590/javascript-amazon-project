// 创建http请求
const xhr = new XMLHttpRequest();

// 等待response loaded
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

// param1: type param2：向何处发送http信息
// GET: 从后端获取信息
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();