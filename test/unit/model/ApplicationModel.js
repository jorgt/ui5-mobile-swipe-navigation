sap.ui.define([
	"holcim/swipedemo/model/ApplicationModel",
	"sap/ui/model/json/JSONModel"
], function(ApplicationModel, JSONModel) {
	"use strict";

	QUnit.module("Application Model", {
		setup: function() {
			this.model = new ApplicationModel
		},
		teardown: function() {
			this.model = null;
		}
	});

	QUnit.test("Is a JSON Model", function(assert) {
		assert.equal(this.model instanceof JSONModel, true, "The inheritence is correct");
	});

	QUnit.test("Contains an empty object on instantiation", function(assert) {
		assert.deepEqual(this.model.getData(), {}, "The object is empty");
	});


	QUnit.test("Can hold and retrieve values", function(assert) {
		this.model.setProperty('/foo', 'bar');
		assert.deepEqual(this.model.getProperty('/foo'), 'bar', "A value was set and retrieved");
	});

});