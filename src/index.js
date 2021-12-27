import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import FallbackComponent from "./components/components/Fallback";

const rootElement = document.getElementById("root");

const errorHandler = (error, errorInfo) => {
  // console.log("errorr", error);
  // console.log("errorrinfo", errorInfo);
};
render(
  <Provider store={Store}>
    <BrowserRouter>
       <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={errorHandler}
      > 
        <App />
       </ErrorBoundary> 
    </BrowserRouter>
  </Provider>,
  rootElement
);
