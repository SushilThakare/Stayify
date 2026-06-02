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

// Rotating headline logic
(function () {
  var phrases = [
    'Weekend escapes',
    'Work-from-anywhere homes',
    'Perfect for family getaways',
    'City stays with character',
    'Cozy countryside retreats'
  ];

  var el = document.getElementById('rotating-headline');
  if (!el) return;

  var idx = 0;
  var visible = true;

  function showNext() {
    el.classList.add('hidden');
    setTimeout(function () {
      idx = (idx + 1) % phrases.length;
      el.textContent = phrases[idx];
      el.classList.remove('hidden');
    }, 340);
  }

  // Rotate every 2800ms
  setInterval(showNext, 2800);
})();