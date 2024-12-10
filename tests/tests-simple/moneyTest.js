import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');

// 1.基本测试

console.log('coverts cents into dollars');

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('works with 0');

if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('rounds up to the nearest cent');

// 2.边缘测试
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}



