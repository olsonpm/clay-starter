'use strict';

const pkg = require('../../package.json'),
  amphoraHtml = require('amphora-html'),
  setup = require('amphora-html/lib/setup'),
  helpers = require('../universal/helpers'),
  resolveMediaService = require('../server/resolve-media'),
  fs = require('fs'),
  path = require('path');

// init is necessary because their code sets module.exports.hbs to undefined
//   after they init it themselves.  Granted, I don't know why they do that.
setup.init();
setup.hbs.registerPartial(
  'testing',
  fs.readFileSync(path.resolve(__dirname, './testing.hbs'), 'utf8')
);

amphoraHtml.configureRender({
  editAssetTags: true,
  cacheBuster: pkg.version
});

amphoraHtml.addResolveMedia(resolveMediaService);
amphoraHtml.addHelpers(helpers);
amphoraHtml.addEnvVars(require('../../client-env.json'));

module.exports = {
  default: 'html',
  html: amphoraHtml
};
