export default function adapterCartFromServerToApp(serverCart) {
  return serverCart.map((item) => ({
    ...item,
    productId: item.product.id,
    amount: item.quantity,
    img: {
      src: item.product.image.file.url,
    },
  }))
}
