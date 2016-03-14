import Backbone from 'backbone'
import _ from 'lodash'

export default Backbone.Model.extend({

	initialize: function(attrs, option){

		this.url = option.url;
		this.fetch({
			success: _.bind(function(response){
				this.trigger('CourseLoader:dataLoaded');
			}, this), 
			error: function(data){
				alert('Unable to load the coursemap.json');
			}, 
			complete: function(xhr, textStatus){
				//
			}
		})
	}, 

	parse: function(response){
		this.courses = response;
		return ;
	}, 

	findCourse: function(course_id){
		var course =  _.find(this.courses, {id: course_id})
		
		if (!course){
			alert('unable to find course ' + course_id);
			return;
		}
		else
			return course;
	}
})