export function formatCurrency(priceCents) {
  // return (priceCents / 100).toFixed(2);
  // 提前进行四舍五入避免使用fixed后出现错误
  return (Math.round(priceCents) / 100).toFixed(2);
}

// 每个文件只能有一个默认导出
export default formatCurrency;