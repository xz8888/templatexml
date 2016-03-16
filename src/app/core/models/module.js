import Backbone from 'backbone'


export default Backbone.Model.extend({
	defaults:{
			type: "module"
	},

	initialize: function(attr, option){
		this.loadCourseMap(attr.map);
	},

	loadCourseMap: function(map){
		
	}
})