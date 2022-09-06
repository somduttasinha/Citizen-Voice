//import * as superHeroes from './ajax-survey.js';
// import {marvel} from "./ajax-survey";

$(document).ready(
    function() {
        let saveForm = function () {
            let form = $('#form-survey-create');
            $.ajax({
                url: form.attr("action"),
                data: form.serialize(),
                type: form.attr("method"),
                dataType: 'json',
                success: function (data) {
                    if(data.form_is_valid) {
                        alert("Form is Valid");
//                        alert(data.html_form);
                        $('#sidebar-left-survey-list').html(data.html_form);
                    }
                    else {
                        alert("Not Valid")
                    }
                }
            });
        };

        let editForm = function (selected_link) {
            alert("EditForm function")
            let survey_link = $(selected_link);
            alert(survey_link.attr("href"))
            $.ajax({
                url: survey_link.attr("href"),
                data: {},
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    alert(data.html_form);
                    alert(data.data_exists)
                    if(data.data_exists) {
                        alert("Data exists");
//                        alert(data.html_form);
                        $('#ajax-container-map-sidebar').html(data.html_form)
                    }
                    else {
                        alert("Link Valid")
                    }
                }
            });
        };
//        superHeroes.marvel();
//        alert("Success")


        let form_submit = $('#form-survey-create-submit')
        form_submit.on("click", function(event){
            event.preventDefault();
            alert("clicked");
            saveForm();
        });

        let button_add_survey = $('#sidebar-left-survey-add')
        button_add_survey.on("click", function(event) {
            alert("Clicked add button")
        });

        let survey_link = $('.survey-link-select');
        survey_link.each(function() {
            $(this).on("click", function(event) {
                alert("Survey link select");
                event.preventDefault();
                editForm(this);
            });
        });
//        survey_link.on("click", function(event) {
//            alert("Survey link select");
//            event.preventDefault();
//            editForm();
//        });
    }
);



$(function() {


    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    alert("CSRFTOKEN");
    alert(csrftoken);
    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});