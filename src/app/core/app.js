import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'lodash';
import ConfigParser from './parser/configParser'
import DitamapParser from './parser/ditamapParser'
import Course from './models/course'

var ApplicationModel = Backbone.Model.extend({
})

var ApplicationContext = new ApplicationModel();
//calling course loading 

ApplicationContext.start = _.once(function(){
	ApplicationContext.trigger('App:startApp');
	Backbone.history.start();
})

ApplicationContext.loadCourse = _.once(function(course){
	if (!course.base_dir){
		alert('Base_dir not specified in coursemap.json');
		return;
	}

	var config_file = course.config ? course.base_dir + "/" + course.config : course.base_dir + "/config.xml";
	var ditamap = course.ditamap ? course.base_dir + "/" + course.ditamap : course.base_dir + "/DITAMAP_XML_E.xml";

	//use jquery defered to fetch xml
	$.when($.ajax(config_file), $.ajax(ditamap)).done(function(data1, data2){
		var configData = new ConfigParser().parse(data1[0]);
		var ditamapParser = new DitamapParser();

		ditamapParser.parse($(data2[0]));

		//load the course data 
		var courseData = ditamapParser.getCourse();
		var menuData = ditamapParser.getMenu();

		var courseMap = new Course(courseData);

	}).fail(function(){
		alert("Can't find ditamap or config.xml in the path specified")
	})
})

//initialize the application after loading
export default ApplicationContext

