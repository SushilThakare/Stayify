// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  function applyCustomValidation(field) {
    if (field.dataset.validateTrim === 'true') {
      field.setCustomValidity(field.value.trim() ? '' : 'This field is required.')
      return
    }

    if (field.dataset.validateNumber === 'true') {
      var value = field.value.trim()
      var numericValue = Number(value)
      var isValidNumber = value !== '' && !Number.isNaN(numericValue)
      field.setCustomValidity(isValidNumber ? '' : 'Please enter a valid number.')
    }
  }

  function validateCustomFields(form) {
    var customFields = form.querySelectorAll('[data-validate-trim="true"], [data-validate-number="true"]')
    Array.prototype.slice.call(customFields).forEach(function (field) {
      applyCustomValidation(field)
    })
  }

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      var customFields = form.querySelectorAll('[data-validate-trim="true"], [data-validate-number="true"]')
      Array.prototype.slice.call(customFields).forEach(function (field) {
        field.addEventListener('input', function () {
          applyCustomValidation(field)
        })
      })

      form.addEventListener('submit', function (event) {
        validateCustomFields(form)

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    });
})();