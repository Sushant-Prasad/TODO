// This is an async function to handle the user registration process.
// It takes in the previous state and the formData submitted from a form using useActionState or similar hooks.
export const register = async (previousState, formData) => {
  try {
    // Extract email and password from the form data object
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    // Make a POST request to the backend API to register the user
    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Send data in JSON format
      },
      body: JSON.stringify({ email, password }), // Convert email and password to a JSON string
    });

    // Parse the response into JSON
    const data = await response.json();

    // If the backend returns an error message, return it in the new state
    if (data?.error) {
      return { ...previousState, error: data.error }; // Keep previous state and update error
    }

    // If registration is successful, return a success state with no error
    return { error: null, success: data };

  } catch (error) {
    // Handle any unexpected errors, such as network issues
    return { ...previousState, error: "Something went wrong" };
  }
};

// This is an async function to handle the user login process
export const login = async (previousState, formData) => {
  try {
    // Extract email and password from the form data
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password); // For debugging purposes

    // Make a POST request to the backend API for login
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST", // Use the POST method
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      credentials: "include", // Include cookies (for session/auth handling)
      body: JSON.stringify({ email, password }), // Send credentials as JSON
    });

    // Convert the server response to JSON
    const data = await response.json();

    // If there's an error in the response, return it
    if (data?.error) {
      return {
        ...previousState,
        error: data.error,
      };
    }

    // If login is successful, return the success state
    return {
      error: null,
      success: data,
    };

  } catch (error) {
    // If an unexpected error occurs (e.g. network issue), return a general error
    return {
      ...previousState,
      error: "Something went wrong",
    };
  }
};
