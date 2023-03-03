export default function formatItemColors(product) {
  const arrColors = [];
  product.colors.forEach((obj) => {
    arrColors.push(obj.code);
  })
  return arrColors;
}
