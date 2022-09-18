import React from "react";
import { MainContainer } from "./features/mainContainer/mainContainer";
import { LoginView } from "./features/login/loginView";
import { useSelector } from "react-redux";
import { selectToken } from "./features/common/commonSlice";
function App() {
  const token = useSelector(selectToken);
  return (
    <div className="App">
      {token === "" ? <LoginView /> : <MainContainer />}
    </div>
  );
}

export default App;
