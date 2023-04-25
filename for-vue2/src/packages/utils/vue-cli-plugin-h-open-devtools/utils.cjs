const err = (message) => {
  throw new Error(`
[h-open-devtools:Error]:${message}
`);
};

module.exports = {
  err,
};
