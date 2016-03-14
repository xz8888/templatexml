import Backbone from Backbone
import AppContext from "./core/views/appView.js"

export default Backbone.View.extend({
	initialize: function(){
		this.preRender();
		this.render();
	},

	preRender: function(){

	},

	postRender: function(){

	},

	render: function(){
		var data = this.Model.toJson();
	
	}

})