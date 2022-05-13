import Index from "./containers/Layout/Index";
import store from "./helpers/state/store";
import { Provider } from "react-redux";


function App() {
  return (
    <Provider store={store}>
    <Index />
    </Provider>
  );
}

export default App;
