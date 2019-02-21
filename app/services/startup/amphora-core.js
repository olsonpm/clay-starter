'use strict';

const amphora = require('amphora'),
  renderers = require('./amphora-renderers'),
  healthCheck = require('@nymdev/health-check'),
  searchExists = () => require('amphora-search').getInstance().ping(),
  providers = ['apikey', process.env.CLAY_PROVIDER || 'local'];

function initAmphora(app, search, sessionStore) {
  return amphora({
    app,
    renderers,
    providers,
    sessionStore,
    plugins: [
      search,
      require('amphora-schedule')
    ],
    storage: require('amphora-storage-postgres'),
    eventBus: require('amphora-event-bus-redis')
  }).then(router => {
    router.use(healthCheck({
      env: [
        'ELASTIC_HOST',
        'MASTERMIND'
      ],
      stats: {
        searchExists
      },
      required: [
        'searchExists',
        'ELASTIC_HOST'
      ]
    }));

    return router;
  });
}

module.exports = initAmphora;
