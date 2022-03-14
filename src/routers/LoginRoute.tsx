import { isAuthenticated } from "app/slices/userSlice";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const LoginRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(isAuthenticated);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return isAuth === false ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    </div>
  );
};

export default LoginRoute;
