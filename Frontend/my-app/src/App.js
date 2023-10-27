import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Component/Login";
import UserContextProvider from "./Context/UserContext";
import Register from "./Component/Register";
import Homepage from "./Component/Homepage";
import CreateShop from "./Component/CreateShop";
import ShopContextProvider from "./Context/ShopContext";

function App() {
  return (
    <UserContextProvider>
      <ShopContextProvider>
      <div className="">
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/createshop" element={<CreateShop />} />
          </Routes>
        </div>
      </div>
      </ShopContextProvider>
    </UserContextProvider>
  );
}

export default App;
