require.config({
	baseUrl: "./js",
	paths: {
		button: './public/button',
		dialog: './public/dialog',
		jquery: './libs/jquery.min'
	}
});

define(function(require) {
   	require('button');
});