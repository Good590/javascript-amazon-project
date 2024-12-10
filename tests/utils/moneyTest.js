import {formatCurrency} from '../../scripts/utils/money.js';

// 1.创建测试套件 test suite
describe('test suite: formatCurrency', () => {
  // 1. 第一个测试用例
  it('coverts cents into dollars', () => {
    // 并非使用if 使用expect() and brackets()
    expect(formatCurrency(2095)).toEqual('20.95');
    // expect返回一个对象并包含一个method用于比较值
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});