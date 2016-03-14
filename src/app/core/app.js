import Backbone from 'backbone';
import _ from 'Lodash';

var ApplicationModel = Backbone.Model.extend({

	defaults:{

	}
})

var ApplicationContext = new ApplicationModel();
//calling course loading 

ApplicationContext.start = _.once(function(){
	ApplicationContext.trigger('App:startApp');
	Backbone.history.start();
})

ApplicationContext.loadCourse = _.once(function(course){
	
})
//initialize the application after loading

export default ApplicationContext

