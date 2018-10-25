(function() {
	"use strict";

	var xipixapp = angular.module('wedding', [ 'pascalprecht.translate', 'ngCookies' ]);

	xipixapp.config(function($translateProvider) {

		$translateProvider.useStaticFilesLoader({
			prefix : 'i18n/',
			suffix : '.json'
		});
		$translateProvider.useSanitizeValueStrategy('escapeParameters');
		$translateProvider.registerAvailableLanguageKeys([ 'es', 'ca' ], {
			'es_*' : 'es',
			'ca_*' : 'ca',
			'*' : 'es'
		});
		$translateProvider.fallbackLanguage('es');
		$translateProvider.determinePreferredLanguage();
		$translateProvider.useLocalStorage();
	});
})();
