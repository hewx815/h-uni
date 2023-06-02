/* eslint-disable no-unused-vars */

module.exports = async (api, options) => {
  console.log('beforBuild');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('beforBuild');
      resolve();
    }, 5000);
  });
};
