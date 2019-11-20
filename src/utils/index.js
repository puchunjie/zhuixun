export const isMobile = val => {
  if (val.length !== 11) return false;
  return /\d{11}/.test(val)
}


//富文本数据格式化
export const escape2Html = str => {
  let arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, t => arrEntities[t]).replace(/\<img/gi, '<img style="width:100%;height:auto"');
}