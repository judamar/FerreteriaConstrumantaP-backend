function productKeyGenerator (nombreProducto, marca) { // by chat gpt and me
  const getInitials = (cadena) => cadena.split(/\s+/).map(word => word.replace(/[\d\W]/g, '')[0]).join('')
  const numbers = nombreProducto.replace(/\D/g, '')
  const key = `${getInitials(nombreProducto)}-${numbers}-${marca}`

  return key.toUpperCase()
}

export default productKeyGenerator
