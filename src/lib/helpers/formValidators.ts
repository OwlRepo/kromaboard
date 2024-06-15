function validateEmail(email: string) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Helper function to validate password strength
function validatePassword(password: string) {
  const re = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return re.test(String(password));
}

const validators = {
  validateEmail,
  validatePassword,
};

export default validators;
