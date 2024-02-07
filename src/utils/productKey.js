/* The code you provided is a JavaScript function named `productKeyGenerator`. It takes two parameters:
`nombreProducto` (which represents the product name) and `marca` (which represents the brand). */
const productKeyGenerator = (nombreProducto, marca) => { // by chat gpt and me
  const getInitials = (cadena) => cadena.split(/\s+/).map(word => word.replace(/[\d\W]/g, '')[0]).join('')
  const numbers = nombreProducto.replace(/\D/g, '')
  const key = `${getInitials(nombreProducto)}-${numbers}-${marca}`

  return key.toUpperCase()
}

export default productKeyGenerator
