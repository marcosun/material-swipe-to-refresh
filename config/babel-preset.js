const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    ['env', {
      modules: BABEL_ENV === 'cjs' ? 'commonjs' : false
    }],
    'stage-0',
    'react'
  ]
};
