sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {

	return JSONModel.extend("holcim.aggcycle.services.ApplicationModel", {
		constructor: function() {
			JSONModel.prototype.constructor.call(this, {});
		}
	});
});