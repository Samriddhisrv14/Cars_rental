import axios from "axios";
import { message } from "antd";

// ✅ LOGIN
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    // ✅ Call Local Backend (Proxy will handle this)
    const response = await axios.post("/api/users/login", reqObj);

    // ✅ Store only user object
    localStorage.setItem("user", JSON.stringify(response.data.user));

    message.success("Login successful ✅");

    dispatch({ type: "LOADING", payload: false });

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);

    // ✅ Show proper backend message
    message.error(
      error.response?.data?.message || "Login failed ❌"
    );

    dispatch({ type: "LOADING", payload: false });
  }
};

// ✅ REGISTER
export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    // ✅ Call Local Backend
    const response = await axios.post("/api/users/register", reqObj);

    message.success("Registration successful ✅");

    dispatch({ type: "LOADING", payload: false });

    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  } catch (error) {
    console.log(error);

    message.error(
      error.response?.data?.message || "Registration failed ❌"
    );

    dispatch({ type: "LOADING", payload: false });
  }
};
