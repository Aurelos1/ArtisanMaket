import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";

const Connexion = () => {
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

      console.log(response.data);
      login(response.data.token, response.data.user);
      navigate('/');  // Redirige vers la page d'accueil après une connexion réussie
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
    <div className="container" style={{ height: "100vh" }}>
      <div className="row g-lg-5 py-5  ">
        <div className="col-lg-7 text-center text-lg-start">
          <h2 className="w-bold lh-1 text-body-emphasis mb-3">
            Rejoignez notre communauté Vetolib
          </h2>
          <p className="col-lg-10 fs-5">
            Bienvenue chez Vetolib, où la santé de votre animal est notre priorité.
            Inscrivez-vous pour accéder à nos services personnalisés, prendre rendez-vous
            facilement et suivre le bien-être de vos compagnons à quatre pattes.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Adresse email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Connexion
            </button>
            <hr className="my-4" />
            <small className="text-body-secondary">
              En cliquant sur Connexion, vous acceptez les termes d'utilisation.
            </small>
            <div className="form-floating mb-3">
              Vous n'avez pas de compte ?<Link to="/inscription">Inscrivez Vous!</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;