module.exports = {
  err: (message) => {
    throw new Error(`
  [h-uni-build]:${message}
  `);
  },
  log: (message) => {
    // eslint-disable-next-line no-console
    console.log(`
  [h-uni-build]:${message}
  `);
  },
};
