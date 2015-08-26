sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("holcim.swipedemo.controller.App", {
		/**
		 * On Initialization of the controller, this is the method that'll get executed
		 * @public
		 */
		onInit: function() {
			var model = sap.ui.getCore().getModel('i18n');
			console.log(model.getProperty('master.title'));
			this._setupTransitions();
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
			var id = e.currentTarget.id;
			var match = id.match(/(.*swipe-page)([0-9]{1,})/);
			var add = (direction === 'left') ? 1 : -1;
			if (match && match.length > 2) {
				this.byId('swipedemo-app').to(match[1] + (Number(match[2]) + add), 'slide-' + direction);
			}
		}
	});
});