import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [allShop, setAllShop] = useState(null);
  const [createShop, setCreateShop] = useState({
    name: "",
    title: "",
    map: "",
  });

  const [shopdata, setShopData] = useState(null);

  const hagdleCreateShop = (e) => {
    setCreateShop({ ...createShop, [e.target.name]: e.target.value });
  };

  const GetShop = async () => {
    const token = localStorage.getItem("user");
    useEffect(() => {
      axios
        .get("http://localhost:8080/getallshop", {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          setAllShop(response.data.shop);
          console.log(response.data.shop);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  };

  const createNewShop = async () => {
    const { name, title, map } = createShop;
    const token = localStorage.getItem("user");
    if (name === "" && title === "" && map === "") {
      alert("Please insert data");
    } else if (name === "") {
      alert("Please insert name");
    } else if (title === "") {
      alert("Please insert title");
    } else if (map === "") {
      alert("Please insert map");
    } else {
      await axios
        .post("http://localhost:8080/createshop", createShop, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response);
          setCreateShop({
            name: "",
            title: "",
            map: "",
          });
          navigate("/home");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const upDateShop = async (shopId) => {
    // console.log(createShop);
    const token = localStorage.getItem("user");
    await axios
      .patch(`http://localhost:8080/editshop/${shopId}`, createShop, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        alert("Update Success");
        console.log(response);
        setCreateShop({
          name: "",
          title: "",
          map: "",
        });
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteShop = async (shopId) => {
    // console.log(createShop);
    const token = localStorage.getItem("user");
    await axios
      .delete(`http://localhost:8080/shop/delete/${shopId}`,{
        headers: { authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        alert("Delete Success");
        console.log(response);
        
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <shopContext.Provider
      value={{
        GetShop,
        allShop,
        hagdleCreateShop,
        createShop,
        createNewShop,
        setShopData,
        shopdata,
        upDateShop,
        deleteShop
      }}
    >
      {children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
