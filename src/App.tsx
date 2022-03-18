import {
  getCurrentSeller,
  getCurrentStudent,
  getCurrentTeacher,
  logoutUser,
  setCurrentUser,
} from "app/slices/userSlice";
import { store } from "app/store";
import { setAuthToken } from "axiosInstance";
import MyRouter from "routers/index";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
if (localStorage.token) {
  // Set auth token header auth
  var token = localStorage.token;
  setAuthToken(token);
  // Decode token and get user info and exp

  const decoded: any = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.expiresIn < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      const decoded: any = jwt_decode(localStorage.token);
      if (decoded.user_role.includes("seller")) {
        dispatch(getCurrentSeller());
      }
      if (decoded.user_role.includes("student")) {
        dispatch(getCurrentStudent());
      }
      if (decoded.user_role.includes("teacher")) {
        dispatch(getCurrentTeacher());
      }
    }
  }, [localStorage.token]);

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}
