sap.ui.define([
	'sap/ui/model/resource/ResourceModel'
], function(ResourceModel) {

	return ResourceModel.extend("holcim.swipedemo.model.ResourceModel", {
		constructor: function() {
			ResourceModel.prototype.constructor.call(this, {
				bundleName: 'holcim.swipedemo.i18n.i18n',
				async: true
			});
		}
	});
});