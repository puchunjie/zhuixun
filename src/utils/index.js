export const isMobile = val => {
  if (val.length !== 11) return false;
  return /\d{11}/.test(val)
}
