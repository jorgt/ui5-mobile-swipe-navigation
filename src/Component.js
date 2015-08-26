sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/m/NavContainer",
	"holcim/swipedemo/model/ApplicationModel",
	"holcim/swipedemo/model/ResourceModel"
], function(UIComponent, NavContainer, AppModel, ResourceModel) {
	"use strict";

	UIComponent.extend('holcim.swipedemo.Component', {
		metadata: {
			name: 'Sample Swipe app',
			version: '1.0.0',
			includes: ['css/app.css'],
			dependencies: {
				libs: ['sap.m']
			},
			rootView: 'holcim.swipedemo.view.App'
		},

		init: function() {
			var slide;

			sap.ui.getCore().setModel(new AppModel());
			sap.ui.getCore().setModel(new ResourceModel(), 'i18n');

			slide = NavContainer.transitions.slide;

			//technically, swiping from left to right just means
			//reversing the "to/back functions" of the existing slide animation
			NavContainer.transitions["slide-left"] = slide;

			NavContainer.transitions["slide-right"] = {
				to: slide.back,
				back: slide.to
			};

			UIComponent.prototype.init.call(this, arguments);
		}
	});
});