import "https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js";

CookieConsent.run({
	/**
	 * All config. options available here:
	 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
	 */

	categories: {
		necessary: {
			enabled: true, // this category is enabled by default
			readOnly: true, // this category cannot be disabled
		},
		analytics: {},
	},

	language: {
		default: "en",
		translations: {
			en: {
				consentModal: {
					title: "Cookie Policy",
					description:
						"We use cookies to manage cookie consent on our website. We do not use cookies for targeting, advertising, data analytics, or any other purpose that may compromise your privacy. We only use necessary cookies to ensure the proper functioning of the website. Please select your cookie preferences below.",
					acceptAllBtn: "Accept",
					showPreferencesBtn: "More information",
				},
				preferencesModal: {
					title: "Manage cookie preferences",
					description:
						"We use necessary cookies to ensure the proper functioning of the website. These cookies are essential for the website to work correctly and cannot be disabled.",
					closeIconLabel: "Close modal",
					sections: [
						{
							title: "Necessary cookies",
							description:
								"These cookies are essential for the website to work correctly and cannot be disabled.",
						},
					],
				},
			},
		},
	},
});
