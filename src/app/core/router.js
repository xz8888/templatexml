import $ from 'jquery'
import Backbone from 'backbone';
import App from './app'

export default Backbone.Router.extend({
	routes:{
		"load/:course_id": "load"
	}, 

	load: function(course_id){
		var course = App.courseLoader.findCourse(course_id);
		if (course)
			App.loadCourse(course);
		
		//check for course loading
		$('#course_app').append('<div> The course id is ' + course_id + "</div>");
	}, 

	initialize() {
		console.log('router started');
    	$('body').append('<div id="course_app"></div>');
    },

});

