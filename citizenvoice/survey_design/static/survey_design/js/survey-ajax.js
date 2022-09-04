$(document).ready(
    function() {
        let saveForm = function () {
            let form = $('#form-survey-create');
            $.ajax({
//                url: form.attr("action-url"),
                url: form.attr("action"),
                data: form.serialize(),
                type: form.attr("method"),
                dataType: 'json',
                success: function (data) {
                    if(data.form_is_valid) {
                        alert("Form is Valid");
//                        alert(data.surveys[0].id)
//                        alert(data.form_is_valid)
                        alert(data.html_form);
                        $('#sidebar-left-survey-list').html(data.html_form);
                    }
                    else {
                        alert("Not Valid")
                    }
                }
            });
        };


        let form_submit = $('#form-survey-create-submit')
        let form = $('#form-survey-create')

        form_submit.on("click", function(event){
            event.preventDefault();
            alert("clicked");
            saveForm();
        });
    }
);
