const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    ['env', {
      modules: 'commonjs'
    }],
    'stage-0',
    'react'
  ]
};
