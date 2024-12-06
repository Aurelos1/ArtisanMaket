import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {useAuth} from "../utils/AuthContext";

const Accueil = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Crée une instance de useNavigate
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/auth/login', {
        email,
        password,
      });
      login(response.data.token, response.data.user);
      navigate('/cabinet');  // Redirige vers la page d'accueil après une connexion réussie
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Erreur lors de la connexion.');
      } else if (error.request) {
        setError('Aucune réponse du serveur.');
      } else {
        setError('Erreur lors de la connexion.');
      }
      console.error("Erreur lors de la connexion:", error.message);
    }
  };


  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary" style={{height : "75vh"}}>

      <main className="form-signin w-25 m-auto">

        <form onSubmit = {handleSubmit}>
            <div className="text-center">
            <img
            className="mb-4"
            src="../public/images/logo.png"
            alt=""
            width="72"
            height="57"
          />
            </div>
          
          <h1 className="h3 mb-3 fw-normal text-center">Connectez vous !</h1>

          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Connexion
          </button>
        </form>
      </main>
    </div>
  );
};

export default Accueil;
