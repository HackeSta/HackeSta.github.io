let fields;
    $(document).ready(function() {
      fields = $("#contact_form input, textarea").not(":submit");
      $.each(fields, function(id, field) {
        $(field).focusout(function() {
          validateField(field);
        });
      });
      $("#contact_form").submit(function(event) {
        event.preventDefault();
        let validate = true;
        let data = {};
        $.each(fields, function(id, field) {
          if (!validateField(field)) {
            validate = false;
          }
          data[$(field).attr('name')] = $(field).val();
        });
        if (validate) {
          $.post("/form/", data).done(function(data){
            fields.val('');
            $("#successMessage").show();
          });
        }
      });
    });

    function validateField(field) {
      if ($(field).next().hasClass('error')) {
        $(field).next().remove();
      }
      if ($(field).attr('type') == "email") {
        if (!validateEmail($(field).val())) {
          $(field).after('<span class="error">This field is required</span>');
          return false;
        }
      }
      if ($(field).val().length == 0) {
        $(field).after('<span class="error">This field is required</span>');
        return false;
      }
      return true;
    }

    function validateEmail(email) {
      let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    }