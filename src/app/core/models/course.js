import Backbone from 'backbone'

export default Backbone.Model.extend({
	defaults:{
			type: "course", 
			modules: new Backbone.Collection;
	},

	initialize: function(attr, option){
		this.loadCourseMap(attr.map);
	},

	loadCourseMap: function(map){
		for (attr.map){
			
		}
	}
})