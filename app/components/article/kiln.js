'use strict';

module.exports = schema => schema;

const { whenLedeImageUrlExists } = require('./utils'),
  KilnInput = window.kiln.kilnInput;

module.exports = schema => {
  const article = new KilnInput(schema);

  whenLedeImageUrlExists(article, ledeFieldset => {
    ledeFieldset.addEventListener(
      'keydown',
      event => {
        console.log('event');
        console.log(event);

        if (event.keyCode === 13 || event.which === 13) {
          console.log('you will not pass');
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
      },
      {
        capture: true
      }
    );
  });

  return schema;
};
