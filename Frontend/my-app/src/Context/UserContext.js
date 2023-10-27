import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [user,setUser] = useState(null)

  const handleChangeInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleChangeInputLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const { name, email, password } = registerData;
    if (name === "" && email === "" && password === "") {
      alert("Please insert data");
    } else if (name === "") {
      alert("Please insert name");
    } else if (email === "" || !validator.isEmail(email)) {
      alert("Please insert email");
    } else if (password === "") {
      alert("Please insert password");
    } else {
      await axios
        .post("http://localhost:8080/register", registerData)
        .then(function (response) {
          if (response.data.msg === "This email is register") {
            alert("This email is register");
          } else {
            alert("Registar success");
            console.log(response);
            navigate('/')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const login = async () => {
    const { email, password } = loginData;
    if (email === "" && password === "") {
      alert("Please insert data");
    } else if (email === "" || !validator.isEmail(email)) {
      alert("Please insert email");
    } else if (password === "") {
      alert("Please insert password");
    } else {
      await axios
        .post("http://localhost:8080/login", loginData)
        .then(function (response) {
          if (response.data.msg === "not found") {
            alert("email or password is in valid");
          } else {
            alert("Login success");
            localStorage.setItem("user", response.data.token);
            console.log(response.data.token);
            navigate('/home')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const Authen =  () => {
    const token = localStorage.getItem("user")
    useEffect(()=>{
       axios
          .get("http://localhost:8080/me",{headers: { authorization: `Bearer ${token}` }})
          .then(function (response) {
            if(response.data.status === 'error'){
              alert('Please login')
              console.log();
              navigate('/')
            }else{
              setUser(response.data.user[0])
              // console.log(response.data.user[0]);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },[])
  }

  const logOut = async () => {
    localStorage.removeItem("user")
    navigate("/")
  }

 
  return (
    <userContext.Provider
      value={{
        register,
        handleChangeInput,
        registerData,
        login,
        handleChangeInputLogin,
        loginData,
        Authen,
        logOut,user
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
