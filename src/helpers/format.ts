export const padWithZeroOnStart = (number: number) => {
  return number.toString().padStart(2, '0')
}

export const formatPrice = (price?: number) => {
  // INPUT 2500
  // OUTPUT 'R$ 2.500,00'

  if (!price) {
    return ''
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formatter.format(price)
}
