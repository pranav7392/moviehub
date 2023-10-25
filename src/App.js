import { createContext, useState } from "react";
import Addmovie from "./components/Addmovie";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Wishlist from "./components/Wishlist";
import Cards from "./components/Cards";
import Details from "./components/Details";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
const user = createContext();
function App() {
  // const [profile, SetProfile] = useState({
  //   userName: "Dhruv Bhuva",
  //   mobile: "7984395343",
  //   password: "Dhruv@123",
  // });
  const [profile, SetProfile] = useState({
    userName: "",
    mobile: "",
    password: "",
    userid: "",
  });
  return (
    <user.Provider value={{ profile, SetProfile }}>
      <div className="App w-full">
        <Header />
        <div className="flex w-full flex-row justify-center relative">
          <div className="absolute w-[70%] left-0">
            <Sidebar />
          </div>
          <div
            className="w-full"
            onClick={() => {
              if (!document.getElementById("udetail").hidden) {
                document.getElementById("udetail").hidden =
                  !document.getElementById("udetail").hidden;
              }
            }}
          >
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/addmovie" element={<Addmovie />} />
              <Route path="/user/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </div>
        </div>
      </div>
    </user.Provider>
  );
}
export default App;
export { user };
