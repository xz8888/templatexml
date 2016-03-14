import Parser from './parser'
import $ from 'jquery'
import '../../library/jquery.attribute'

class DitamapParser extends Parser {

    parse(xml) {

        //Load the menu
        var that = this;
        if ($(xml).find('menu') !== undefined) {
            $(xml).find('menu').each(function() {
                that.menu = that.loadMenu($(this))
            })
        }

        //load report if the report tag is found
        // Todo 
        if ($(xml).find('report') !== undefined) {
            // if (typeof ReportManager != "undefined")
            // 	ReportManager.init($(xml));
            this.report = this.loadReport();
        }

        if ($(xml).find('map') !== undefined) {
        	this.course = {};
        	this.course.title = $(xml).find('map').attr('title');
            this.course.map = this.loadCourseMap($(xml).find('map'));
        }
    }

    /** load course map */
    loadCourseMap(mapNode) {

        function _parseNav(mapNode) {
            if (mapNode.children().size() === 0)
                return;
            var result = [];	
            mapNode.children().each(function() {
                var nav = {}

                nav.id = $(this).attr('id');
                nav.title_url = $(this).attr('navtitle');
                nav.title = $(this).attr('navtitle');

                if ($(this).attr('alternate') != undefined && $(this).attr('alternate').length > 0)
                    nav.title = $(this).attr('alternate');
                if ($(this).attr('dependency') != undefined && $(this).attr('dependency').length > 0)
                    nav.dependency = $(this).attr('dependency').split(',');

                //find attributes 	
                var attributes = $(this).getAttributes('attr');

                if (Object.keys(attributes).length > 0) {
                    nav.navAttributes = attributes;
                }

                nav.href = $(this).attr('href');
                nav.type = $(this).attr('type');
                if ($(this).attr('lessonName'))
                    nav.lessonName = $(this).attr('lessonName');

                nav.pageCount = parseInt($(this).attr('pagecount'));
                nav.required = $(this).attr('required');

                nav.child = _parseNav($(this));

                result.push(nav);
            });

            return result;
        }

        return _parseNav(mapNode); 
    }

    loadReport() {

    }

    loadMenu(menuNode) {

    }

    getMenu() {
        return this.menu
    }

    getCourse() {
        return this.course;
    }

}

export default DitamapParser;
