import { useState, useEffect } from "react";
import axios from "axios";

// React router dom
import { useNavigate } from "react-router-dom";

// Context
import { useMovieContext } from "../context/context";

// APIs
import { APIs } from "../APIs/APIs";

export const useAuthentication = () => {
  const { movieState, setMovieState } = useMovieContext();
  let navigate = useNavigate();

  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // ----------------------- Register user ---------------------------
  const register = async (
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await axios.post(APIs.register_url, {
        name,
        email,
        password,
      });

      if (!response) {
        setError("Could not complete, Try again!");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        sessionStorage.setItem("name", response.data.user.name);
        sessionStorage.setItem("token", response.data.token);

        //sessionStorage.setItem('movieState', 'movie')
        sessionStorage.removeItem("genreId");
        //sessionStorage.removeItem('option')
        //sessionStorage.setItem('page', 1)
        sessionStorage.setItem("term", "");
        setMovieState(!movieState);

        setName("");
        setEmail("");
        setPassword("");
        setError("");

        navigate("/");
      }

      // Update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.response.data.message);

        setTimeout(() => {
          setError("");
        }, 2000);

        setIsPending(false);
      }
    }
  };

  // ----------------------- Login user ---------------------------
  const login = async (email, password, setEmail, setPassword) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await axios.post(APIs.login_url, {
        email,
        password,
      });

      if (!response) {
        setError("Could not complete, Try again!");
        setIsPending(false);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        sessionStorage.setItem("name", response.data.user.name);
        sessionStorage.setItem("token", response.data.token);

        // sessionStorage.setItem('movieState', 'movie')
        // sessionStorage.removeItem('genreId')
        // sessionStorage.removeItem('option')
        // sessionStorage.setItem('page', 1)
        // sessionStorage.setItem('term', '')
        setMovieState(!movieState);

        setEmail("");
        setPassword("");
        setError("");
        setIsPending(false);

        navigate("/");
      }

      // Update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.response.data.message);

        setTimeout(() => {
          setError("");
        }, 2000);

        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(false);
    };
  }, []);

  // ----------------------- Logout user ---------------------------
  const logout = () => {
    // if (window.location.pathname === '/watchlist') {
    //   sessionStorage.removeItem('option')
    // }
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    setMovieState(!movieState);
  };

  return { register, login, logout, error, isPending };
};
