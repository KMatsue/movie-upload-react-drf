import { useReducer } from "react";
// import { withCookies } from "react-cookie";
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from "./actionTypes";
import CircularProgress from "./CircularProgress";
import { FaLock } from "react-icons/fa6";
import axios from "axios";
import { RiContactsBookLine } from "react-icons/ri";
// import PropTypes from "prop-types";

const BACKEND_DOMAIN = "http://127.0.0.1:8000";

const REGISTER_URL = `${BACKEND_DOMAIN}/api/auth/users/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/api/auth/jwt/create/`;
const LOGOUT_URL = `${BACKEND_DOMAIN}/api/auth/logout/`;
const REFRESH_URL = `${BACKEND_DOMAIN}/api/auth/jwt/refresh/`;

const initialState = {
  isLoading: false,
  isLoginView: true,
  error: "",
  credentialsLog: {
    email: "",
    password: "",
  },
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        error: state.isLoginView
          ? "Email or password is not correct!"
          : "CompanyName, Email or password is not correct !",
        isLoading: false,
      };
    }
    case INPUT_EDIT: {
      return {
        ...state,
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
        error: "",
      };
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const inputChangedLog = () => (event) => {
    dispatch({
      type: INPUT_EDIT,
      inputName: event.target.name,
      payload: event.target.value,
    });
  };

  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };

  const login = async (event) => {
    // submitイベントの本来の動作を止める(submit時の画面リロード防止)
    event.preventDefault();

    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH });
        const res = await axios.post(LOGIN_URL, state.credentialsLog, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        // props.cookies.set("access", res.data.access);
        console.log(res);
        res.status == 200
          ? (window.location.href = "/video")
          : (window.location.href = "/");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    } else {
      try {
        dispatch({ type: START_FETCH });
        await axios.post(REGISTER_URL, state.credentialsLog, {
          headers: { "Content-Type": "application/json" },
        });
        const res = await axios.post(LOGIN_URL, state.credentialsLog, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        // props.cookies.set("access", res.data.access);
        res.status == 200
          ? (window.location.href = "/video")
          : (window.location.href = "/");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {state.isLoading && <CircularProgress />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaLock color="orange" className="mx-auto h-10 w-auto " />

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {state.isLoginView ? "Sign in" : "Sign up"} to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={login}>
          {!state.isLoginView && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={state.credentialsLog.username}
                  onChange={inputChangedLog()}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={state.credentialsLog.email}
                onChange={inputChangedLog()}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-orange-600 hover:text-orange-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={state.credentialsLog.password}
                onChange={inputChangedLog()}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primeColor sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <span className="flex text-red-500 font-semibold text-lg">
              {state.error}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600
               px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 aria-disabled:bg-gray-500"
              disabled={
                !state.credentialsLog.password || !state.credentialsLog.email
              }
            >
              {state.isLoginView ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          {state.isLoginView ? "Not a member?" : "You have an account."}
          <span
            className="cursor-pointer ml-2 font-semibold leading-6 text-orange-600 hover:text-orange-500"
            onClick={() => toggleView()}
          >
            {state.isLoginView ? "Create Account" : "Back to login"}
          </span>
        </p>
      </div>
    </div>
  );
};

// Login.propTypes = {
//   cookies: PropTypes.object,
// };

export default Login;
