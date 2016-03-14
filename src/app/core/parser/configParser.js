import Parser from './parser'
import $ from 'jquery'

class ConfigParser extends Parser {
    parse(xml) {
        var Config = {};
        if ($(xml).find('course').length > 0) {
            Config.courseLang = $(xml).find('course').find('language').text();

            if ($(xml).find('course').find('multiple').length > 0)
                Config.multipleCourse = 1;
            if ($(xml).find('course').find('showPageNumber').length > 0)
                Config.showPageNumber = 1;
            if ($(xml).find('course').find('showPrint').length > 0)
                Config.showPrint = $(xml).find('course').find('showPrint').text();
            else
                Config.showPrint = 1;

            if ($(xml).find('course').find('showSubtopic').length > 0) {
                Config.showSubtopic = $(xml).find('showSubtopic').text();
            } else {
                Config.showSubtopic = 1;
            }

            if ($(xml).find('course').find('activateScorm').length > 0)
                Config.activateScorm = $(xml).find('course').find('activateScorm').text();
            else
                Config.activateScorm = 1;

        }
        if ($(xml).find('navReq').length > 0) {
            if ($(xml).find('navReq').find('allPagesRequired').length > 0) {
                Config.complReq = $(xml).find('navReq').find('allPagesRequired').text();
            } else
                Config.compReq = 1;

            if ($(xml).find('navReq').find('pageCountLevel').length > 0) {
                Config.pageCountLevel = $(xml).find('navReq').find('pageCountLevel').text();
            } else {
                Config.pageCountLevel = 2;
            }
        }
        if ($(xml).find('label').length > 0) {
            Config.level1Label = $(xml).find("label").find("level1").text();
            Config.level2Label = $(xml).find("label").find("level2").text();
            Config.level3Label = $(xml).find("label").find("level3").text();
        } else {
            //new variables - from config file
            Config.level1Label = "section";
            Config.level2Label = "topic";
            Config.level3Label = "sub-topic";
        }

        //read lesson attributees
        if ($(xml).find('lesson').length > 0) {
            var attributes = [];

            $(xml).find('lesson').find('attribute').each(function() {
                attributes.push($(this).text());
            })

            Config.attributes = attributes;
        }

        //add the module description
        if ($(xml).find('labelDescription').length > 0) {
            Config.level1description = $(xml).find("labelDescription").find("level1").text();
            Config.level2description = $(xml).find("labelDescription").find("level2").text();
        } else {
            Config.level1description = lang.clickStartLesson;
            Config.level2description = lang.clickTopicInLesson;
        }

        //check if the script is cross domain
        if ($(xml).find('crossdomain').length > 0) {
            Config.crossDomain = $(xml).find('crossdomain').text().trim();
        } else
            Config.crossDomain = 0;

        if ($(xml).find('finalTest').length > 0) {
            var testXML = $(xml).find('finalTest');
            var testObj = {};

            $(testXML).children().each(function(index, el) {
                testObj.id = $(this).attr("refid"); // to match the topicref tag id in dita map
                testObj.uid = $(this).attr("uid"); // unique id of the test
                testObj.grade = $(this).find("grade").text();
                testObj.showResults = $(this).find("showResults").text();
                testObj.showAnswers = $(this).find("showAnswers").text();
                testObj.showFeedbacks = $(this).find("showFeedbacks").text();
                testObj.persist = $(this).find("persist").text();
                testObj.showTimer = $(this).find("showTimer").text();
                testObj.random = $(this).find("random").text();
                testObj.passingGrade = parseInt($(this).find("passingGrade").text());
                testObj.weight = $(this).find("weight").text();
                testObj.maxAttempts = $(this).find("maxAttempts").text();
                testObj.trackQuestions = $(this).find("trackQuestions").text();
                testObj.questionPool = $(this).find('questionPool').text();
                testObj.showRetake = $(this).find('showRetake').text();
                testObj.showBackButton = $(this).find('showBackButton').text();
                testObj.showTitle = $(this).find('showTitle').text();
                //added by Sean to show final review page
                testObj.showReviewPage = $(this).find("showReviewPage") ? 1 : $(this).find("showReviewPage").text();

                if ($(this).find("timer").length > 0) {
                    testObj.timer = {};
                    var timerSettings = $(this).find('timer');

                    if (timerSettings.find('active'))
                        testObj.timer.active = timerSettings.find('active').text();
                    else
                        testObj.timer.active = 0;

                    if (timerSettings.find('minutes'))
                        testObj.timer.minutes = timerSettings.find('minutes').text();
                    else
                        testObj.timer.minutes = 30;

                }

            });

            Config.test = testObj;
        }
        if ($(xml).find('knowledgeCheck').length > 0) {
            var mcsaOption = $(xml).find('knowledgeCheck');
            if (mcsaOption.find('validate').length > 0)
                Config.validateMCSA = mcsaOption.find('validate').text();
            else
                Config.validateMCSA = 0;
            if (mcsaOption.find('correctAnswer').length > 0)
                Config.correctAnswer = mcsaOption.find('correctAnswer').text();
            else
                Config.correctAnswer = 0;
            if (mcsaOption.find('random').length > 0) {
                Config.random = mcsaOption.find('random').text();
            } else
                Config.random = 1;
        }

        return Config;
    }
}

export default ConfigParser;
