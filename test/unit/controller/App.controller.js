sap.ui.define([
	"holcim/swipedemo/controller/App.controller",
	"sap/ui/core/mvc/Controller",
	"sap/m/App",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(AppController, Controller, App) {
	"use strict";

	sinon.config.useFakeTimers = false

	function addMockPage() {
		var $div = $('<div id="swipe-page2"><div class="swipe-page"></div></div>');
		$('#qunit-fixture').append($div);
	}

	function swipe(direction, func, assert) {

		$('body').on('swipe' + direction, '.swipe-page', function(e) {
			func.apply(this);
			$('body').unbind('swipe' + direction);
		}.bind(this))

		$('body .swipe-page').trigger('swipe' + direction, '.swipe-page');
	}

	QUnit.module("App Controller", {
		setup: function() {
			this.app = new App('swipedemo-app');
			this.controller = new AppController;
			this.controller.app = this.app;
			this.controller.onInit();
		},
		teardown: function() {
			this.controller.destroy();
			this.app.destroy();
		}
	});

	QUnit.test("Is an SAP controller", function(assert) {
		assert.equal(this.controller instanceof Controller, true, "The inheritence is correct");
	});

	QUnit.test("Attaches swipe left events to body", function(assert) {
		expect(1);

		addMockPage();
		sinon.stub(this.controller, '_navigate');

		swipe('left', function() {
			this.controller._navigate.called;
			assert.equal(this.controller._navigate.called, true, 'The events were succesfully attached');
			this.controller._navigate.restore();
		}.bind(this), assert)

	});

	QUnit.test("Attaches swipe right events to body", function(assert) {
		expect(1);

		addMockPage();
		sinon.stub(this.controller, '_navigate');

		swipe('right', function() {
			this.controller._navigate.called;
			assert.equal(this.controller._navigate.called, true, 'The events were succesfully attached');
			this.controller._navigate.restore();
		}.bind(this), assert)
	});

	QUnit.test("Swiping changes the page", function(assert) {
		expect(1);

		addMockPage();
		sinon.stub(this.controller.app, 'to');

		swipe('left', function() {
			assert.equal(this.controller.app.to.called, true, 'app.to was called');
			this.controller.app.to.restore();
		}.bind(this), assert)
	});
});