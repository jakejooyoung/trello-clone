module.exports = {
  'extends': 'airbnb',
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-tabs': 0,
  },
  'globals': {
    'document': true,
    'window': true,
  },
  'env': {
    'jest': true
	}
};