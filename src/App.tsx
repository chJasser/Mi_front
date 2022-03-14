import { setAuthToken } from "axiosInstance";
import MyRouter from "routers/index";
if (localStorage.token) {
  // Set auth token header auth
  const token = localStorage.token;
  setAuthToken(token);
  // Decode token and get user info and exp
  // const decoded = jwt_decode(token);
  // // Set user and isAuthenticated
  // store.dispatch(setCurrentUser(decoded));
  // // Check for expired token

  // const currentTime = Date.now() / 1000; // to get in milliseconds
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Redirect to login
  //   window.location.href = "./sign-in";
  // }
}

export default function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}
