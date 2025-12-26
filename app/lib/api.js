// lib/api.js
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Create salon profile with all details
 */
export async function createSalonProfile(formData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/register-salon`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // axios automatically parses JSON and puts it in response.data
    return response.data;
  } catch (error) {
    console.error("Error creating salon profile:", error);
    // axios error handling
    if (error.response) {
      // Server responded with error
      throw new Error(
        error.response.data.message || "Failed to create salon profile"
      );
    } else if (error.request) {
      // Request made but no response
      throw new Error("No response from server. Please check your connection.");
    } else {
      // Something else happened
      throw new Error(error.message || "Failed to create salon profile");
    }
  }
}

/**
 * Register private massager profile
 */
export async function registerPrivateMassager(profileData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/private-massagers`,
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error registering massager:", error);
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to register massager profile"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please check your connection.");
    } else {
      throw new Error(error.message || "Failed to register massager profile");
    }
  }
}

/**
 * Helper function to convert base64 to File object
 */
export function base64ToFile(base64String, filename) {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
