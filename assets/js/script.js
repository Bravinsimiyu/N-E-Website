document.getElementById('registrationForm').addEventListener('submit', function (event) {
    // Prevent default form submission
    event.preventDefault();
  
    // Clear all error messages
    const errors = document.querySelectorAll('.error-message');
    errors.forEach((error) => (error.style.display = 'none'));
  
    let isValid = true;
  
    // Validate First Name
    const firstName = document.getElementById('firstName');
    if (firstName.value.trim().length < 2) {
      showError('firstNameError', 'First name must be at least 2 characters.');
      isValid = false;
    }
  
    // Validate Last Name
    const lastName = document.getElementById('lastName');
    if (lastName.value.trim().length < 2) {
      showError('lastNameError', 'Last name must be at least 2 characters.');
      isValid = false;
    }
  
    // Validate Phone Number
    const phone = document.getElementById('phone');
    if (!phone.value.match(/^[0-9]{10}$/)) {
      showError('phoneError', 'Phone number must be 10 digits.');
      isValid = false;
    }
  
    // Validate Email
    const email = document.getElementById('email');
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError('emailError', 'Please enter a valid email address.');
      isValid = false;
    }
  
    // If the form is valid, submit it
    if (isValid) {
      alert('Form submitted successfully!');
      this.submit(); // Or you can send data via AJAX
    }
  });
  
  function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.style.display = 'block';
    errorElement.textContent = message;
  }
  
 
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  // Prevent the form from submitting initially
  event.preventDefault();

  // Input fields and their error spans
  const fields = [
    { id: 'firstName', errorId: 'firstNameError', name: 'First Name', rules: { minlength: 2 } },
    { id: 'lastName', errorId: 'lastNameError', name: 'Last Name', rules: { minlength: 2 } },
    { id: 'phone', errorId: 'phoneError', name: 'Phone Number', rules: { pattern: /^[0-9]{10}$/ } },
    { id: 'email', errorId: 'emailError', name: 'Email Address', rules: { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ } },
    { id: 'program', errorId: 'programError', name: 'Preferred Program', rules: { required: true } },
  ];

  let isValid = true;

  // Validation logic
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorElement = document.getElementById(field.errorId);
    let errorMessage = '';

    // Check for required fields
    if (field.rules.required && !input.value.trim()) {
      errorMessage = `${field.name} is required.`;
    }

    // Check for minimum length
    if (field.rules.minlength && input.value.trim().length < field.rules.minlength) {
      errorMessage = `${field.name} must be at least ${field.rules.minlength} characters.`;
    }

    // Check for pattern match
    if (field.rules.pattern && !field.rules.pattern.test(input.value.trim())) {
      errorMessage = `Please provide a valid ${field.name}.`;
    }

    // Display error if any
    if (errorMessage) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
      isValid = false;
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  });

  // Submit the form if all validations pass
  if (isValid) {
    alert('Form submitted successfully!');
    document.getElementById('registrationForm').submit();
  }

  
});


// document.getElementById('registrationForm').addEventListener('submit', function (event) {
//     // Prevent the form from submitting initially
//     event.preventDefault();
  
//     // Input fields and their error spans
//     const fields = [
//       { id: 'firstName', errorId: 'firstNameError', name: 'First Name', rules: { minlength: 2 } },
//       { id: 'lastName', errorId: 'lastNameError', name: 'Last Name', rules: { minlength: 2 } },
//       { id: 'phone', errorId: 'phoneError', name: 'Phone Number', rules: { pattern: /^[0-9]{10}$/ } },
//       { id: 'email', errorId: 'emailError', name: 'Email Address', rules: { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ } },
//       { id: 'program', errorId: 'programError', name: 'Preferred Program', rules: { required: true } },
//     ];
  
//     let isValid = true;
  
//     // Validation logic
//     fields.forEach((field) => {
//       const input = document.getElementById(field.id);
//       const errorElement = document.getElementById(field.errorId);
//       let errorMessage = '';
  
//       // Check for required fields
//       if (field.rules.required && !input.value.trim()) {
//         errorMessage = `${field.name} is required.`;
//       }
  
//       // Check for minimum length
//       if (field.rules.minlength && input.value.trim().length < field.rules.minlength) {
//         errorMessage = `${field.name} must be at least ${field.rules.minlength} characters.`;
//       }
  
//       // Check for pattern match
//       if (field.rules.pattern && !field.rules.pattern.test(input.value.trim())) {
//         errorMessage = `Please provide a valid ${field.name}.`;
//       }
  
//       // Display error if any
//       if (errorMessage) {
//         errorElement.textContent = errorMessage;
//         errorElement.style.display = 'block';
//         isValid = false;
//       } else {
//         errorElement.textContent = '';
//         errorElement.style.display = 'none';
//       }
//     });
  
//     // Submit the form if all validations pass
//     if (isValid) {
//       alert('Form submitted successfully!');
//       document.getElementById('registrationForm').submit();
//     }
//   });
  
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = new FormData(this);
  
    fetch('submit.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          this.reset(); // Clear the form
        } else if (data.errors) {
          // Display validation errors
          for (const [field, errorMessage] of Object.entries(data.errors)) {
            document.getElementById(`${field}Error`).textContent = errorMessage;
          }
        } else {
          alert(data.message || 'An unexpected error occurred.');
        }
      })
      .catch((error) => console.error('Error:', error));
  });
  