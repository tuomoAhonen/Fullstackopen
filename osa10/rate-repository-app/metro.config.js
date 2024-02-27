const {getDefaultConfig} = require('expo/metro-config');

module.exports = (() => {
	const config = getDefaultConfig(__dirname);

	config.transformer = {
		...config.transformer,
		babelTransformerPath: require.resolve('react-native-svg-transformer'),
	};

	config.resolver.sourceExts.push('svg' /*, 'cjs'*/);

	//console.log(config.resolver.sourceExts);
	//console.log(config.transformer);

	return config;
})();
