export const createError = (statusCode, message) => {
  const error = new Error(); // Create a new instance of the built-in Error object
  error.message = message;// Set a custom error message
  error.statusCode = statusCode; // Attach a custom status code (like 400, 401, 500, etc.)
  return error;// Return the customized error object
};
