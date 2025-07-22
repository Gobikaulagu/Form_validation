document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const fields = [
    {
      id: "firstName",
      errorId: "firstNameError",
      validate: (value) => value.trim() !== "",
      errorMsg: "First Name is required",
    },
    {
      id: "lastName",
      errorId: "lastNameError",
      validate: (value) => value.trim() !== "",
      errorMsg: "Last Name is required",
    },
    {
      id: "email",
      errorId: "emailError",
      validate: (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
      errorMsg: "Invalid Email Id",
    },
    {
      id: "phone",
      errorId: "phoneError",
      validate: (value) => /^\d{10}$/.test(value),
      errorMsg: "Enter a valid 10-digit phone number",
    },
    {
      id: "password",
      errorId: "passwordError",
      validate: (value) => value.length >= 6,
      errorMsg: "Password must be at least 6 characters",
    },
    {
      id: "confirmPassword",
      errorId: "confirmPasswordError",
      validate: (value) => value.length >= 6,
      errorMsg: "Confirm Password is required",
    },
  ];

  function validateField(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    let valid = field.validate(input.value);
    if (field.id === "confirmPassword") {
      const password = document.getElementById("password").value;
      if (input.value !== password) {
        error.textContent = "Passwords do not match";
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
      }
    }
    if (!valid) {
      error.textContent = field.errorMsg;
      input.classList.remove("valid");
      input.classList.add("invalid");
    } else {
      error.textContent = "";
      input.classList.remove("invalid");
      input.classList.add("valid");
    }
    return valid;
  }

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    input.addEventListener("input", () => validateField(field));
    input.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", function (e) {
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        allValid = false;
      }
    });
    // Check password match
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match";
      document.getElementById("confirmPassword").classList.remove("valid");
      document.getElementById("confirmPassword").classList.add("invalid");
      allValid = false;
    }
    if (!allValid) {
      e.preventDefault();
    }
  });
});
