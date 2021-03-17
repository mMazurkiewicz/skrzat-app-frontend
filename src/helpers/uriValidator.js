export default (uri) => {
  const expression = /^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/g;
  const regex = new RegExp(expression);
  return uri.match(regex);
};
