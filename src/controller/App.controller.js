sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, Toast) {
	"use strict";

	return Controller.extend("holcim.swipedemo.controller.App", {

		/**
		 * The app object.
		 * @type {sap.m.App}
		 */
		app: null,

		/**
		 * On Initialization of the controller, this is the method that'll get executed
		 * @public
		 */
		onInit: function() {
			this.app = this.byId('swipedemo-app');

			this._setupTransitions();

			this.app.attachAfterNavigate(this.onAfterNavigate.bind(this))
		},

		onAfterNavigate: function(e) {
			Toast.show('Goin from ' + e.mParameters.from + ' to ' + e.mParameters.to, {
				duration: 500
			});
		},

		/**
		 * Sets up the swipe event and attached a handler
		 * @private
		 */
		_setupTransitions: function() {
			$('body').on('swipeleft', '.swipe-page', function(e) {
				this._navigate(e, 'left');
			}.bind(this));

			$('body').on('swiperight', '.swipe-page', function(e) {
				this._navigate(e, 'right');
			}.bind(this));
		},

		/**
		 * Navigates to a specific page in the application based on the
		 * current page and the direction of swiping
		 * @param  {Object} e         the swype event
		 * @param  {string} direction the direction, either 'left' or 'right'
		 * @private
		 */
		_navigate: function(e, direction) {
			var id, newId, match, add;

			id = e.currentTarget.parentNode.id;
			match = id.match(/.*swipe-page([0-9]{1,}$)/);
			add = (direction === 'left') ? 1 : -1
			if (match && match.length > 1) {
				newId = this.createId('swipe-page' + (Number(match[1]) + add));
				this.app.to(newId, 'slide-' + direction);
			}
		}
	});
});