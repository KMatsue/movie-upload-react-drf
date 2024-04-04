import { useReducer } from "react";
import { withCookies } from "react-cookie";
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from "./actionTypes";
import CircularProgress from "./CircularProgress";
import { FaLock } from "react-icons/fa6";

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
        error: "Email or password is not correct !",
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

const Login = (props) => {
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
        <form className="space-y-6" onSubmit={() => {}}>
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primeColor sm:text-sm sm:leading-6"
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
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
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

export default withCookies(Login);
