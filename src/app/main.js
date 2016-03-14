import App from './core/app'
import CourseLoader from './core/courseLoader'
import Router from './core/Router'

App.courseLoader= new CourseLoader({}, {url: 'coursemap.json'})
//initalize when the coursemap is loaded
App.courseLoader.once('CourseLoader:dataLoaded', function(){
	App.start();
});

App.once("App:startApp", function(){
	App.router = new Router();
})