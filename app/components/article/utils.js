'use strict';

const _get = require('lodash/get');

function hasClass(className) {
  return element => {
    const classList = _get(element, 'classList');

    return classList && classList.contains(className);
  };
}

function whenLedeImageUrlExists(kilnInput, cb) {
  kilnInput.subscribe(
    'OPEN_FORM',
    () => {
      const kilnWrapper = document.querySelector('.kiln-wrapper'),
        runCallbackWhenLedeImageExists = mutation => {
          const form = Array.from(mutation.addedNodes).find(hasClass('kiln-overlay-form'));

          if (form) {
            cb(form.querySelector('.input-container > fieldset:first-child'));
            return true;
          }
        },
        observer = new MutationObserver(mutationList => {
          for (const mutation of mutationList) {
            const callbackRan = runCallbackWhenLedeImageExists(mutation);

            if (callbackRan) {
              observer.disconnect();
              return;
            }
          }
        });

      observer.observe(kilnWrapper, { childList: true });
    },
    true
  );
}

module.exports = { hasClass, whenLedeImageUrlExists };
