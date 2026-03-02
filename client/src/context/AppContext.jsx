import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);
  // function to check if user is logged in
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user/data");
      if (response.data.success) {
        setUser(response.data.user);
        setIsOwner(response.data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  // Function to fetch all cars form server
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // user to logout
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("Logged out successfully");
  };

  // useEffect to retrieve the token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    fetchCars();
  }, []);
  // useEffect to retrieve the user from localStorage
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);
  const value = {
    navigate,
    axios,
    token,
    setToken,
    user,
    setUser,
    isOwner,
    setIsOwner,
    fetchUser,
    fetchCars,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    cars,
    setCars,
    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
