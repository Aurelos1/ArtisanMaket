import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAuth } from "../../utils/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Accueil = () => {
  const { isAuthenticated, logout } = useAuth();
  const [cabinet, setCabinet] = useState([]);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:8000/cabinet/",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        const formattedData = response.data.map((cabinet) => ({
          label: `${cabinet.cabinet_name} - ${cabinet.city}`,
          ...cabinet,
        }));
        setCabinet(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmitFilter = (event) => {
    event.preventDefault();
  
    if (!selectedCabinet) {
      console.log("Aucun cabinet sélectionné");
      return;
    }

    if (selectedCabinet) {
      const id_cabinet = selectedCabinet.cabinet_id;
      console.log("Cabinet sélectionné", selectedCabinet);
      navigate(`/cabinet/${id_cabinet}`); // Redirection vers la page de détails
    } else {
      console.log("Aucun cabinet sélectionné");
    }
  
  };
  
  

  return (
    <>
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-7">
            <h2 className="text-start">
              Prenez soin de vos animaux avec Vetolib
            </h2>
            <p className="text-muted text-start">
              Chez Vetolib, nous comprenons l'importance d'un accès rapide et
              fiable aux soins vétérinaires.C'est pourquoi nous mettons à votre
              disposition un réseau de professionnels passionnés et attentifs à
              la santé de vos compagnons à fourrure.
              <br />
              Rejoignez-nous et bénéficiez d'un suivi personnalisé pour chaque
              étape de la vie de votre animal !
            </p>

            <form className=" mt-5" onSubmit={handleSubmitFilter}>
              <div className=" d-flex">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cabinet}
                  sx={{ width: 660 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Recherche un vétérinaire" />
                  )}
                  onChange={(event, newValue) => {
                    setSelectedCabinet(newValue);
                  }}
                />

                <button
                  className="ms-2 ms-auto btn btn-success"
                  style={{ width: "10%" }}
                  type="submit"
                >
                  <i className="bi bi-search-heart fs-4"></i>
                </button>
              </div>
            </form>

            <div className="row py-5">
              <div className="col-6 d-flex">
                <i className="bi bi-search-heart fs-1 me-3 text-success"></i>
                <div>
                  <h6 className="text-start">Consultations personnalisées</h6>
                  <p
                    className="text-muted text-start"
                    style={{ fontSize: "14px" }}
                  >
                    Des soins adaptés pour chaque animal, parce que chaque
                    compagnon mérite une attention unique.
                  </p>
                </div>
              </div>
              <div className="col-6 d-flex">
                <i className="bi bi-calendar2-heart fs-1 me-3 text-success"></i>
                <div>
                  <h6 className="text-start">Engagement pour le bien-être</h6>
                  <p
                    className="text-muted text-start"
                    style={{ fontSize: "14px" }}
                  >
                    Soins vétérinaires avec cœur, pour le bien-être de chaque
                    animal qui nous est confié.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="text-end">
              <img
                src="../../public/images/dogAccueil.jpg"
                className="rounded-2"
                width="60%"
                alt=""
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <h2 className="text-center">Nos vétérinaires partenaires</h2>
            <p className="text-center text-muted">
              Découvrez les vétérinaires partenaires de Vetolib, qui s'engagent
              à offrir des soins de qualité pour vos animaux.
            </p>
          </div>
          <div className="col-4">
            <div className="card pb-4">
              <img
                src="../../public/images/docteur1.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <h5 className="card-title">Dr. Jean Dupont</h5>
                <p className="card-text">
                  Spécialisé en soins canins et félins, le Dr. Jean Dupont vous
                  accueille dans son cabinet de Saint-Denis.
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card pb-4">
              <img
                src="../../public/images/docteur2.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body pb-3">
                <h5 className="card-title">Dr. Marie Durand</h5>
                <p className="card-text">
                  Spécialisée en soins équins, le Dr. Marie Durand vous
                  accueille dans son cabinet de Saint-Pierre.
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <img
                src="../../public/images/docteur3.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Paul Lefevre</h5>
                <p className="card-text">
                  Spécialisé en soins pour animaux exotiques, le Dr. Paul
                  Lefevre vous accueille dans son cabinet de Saint-Leu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accueil;
