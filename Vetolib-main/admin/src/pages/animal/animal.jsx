import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import TableauAdmin from "../../components/TableauAdmin";
import ModifyButton from "../../components/ModifyButton";
import DeleteButton from "../../components/DeleteButton";
import CustomModal from "../../components/CustomModal";
import EditAnimal from "./editAnimal";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Animal = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [actionType, setActionType] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitEchec, setSubmitEchec] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/animal");
        setAnimals(response.data);
      } catch (error) {
        setSubmitEchec(true);
        console.error("Erreur lors de la récupération des Animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  const handleModify = (animal) => {
    setSelectedAnimal(animal);
    setActionType("modify");
    setModalShow(true);
  };

  const handleDelete = (animal) => {
    setSelectedAnimal(animal);
    setActionType("delete");
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedAnimal(null);
    setActionType("");
  };

  const handleUpdateAnimal = (updatedAnimal) => {
    const updatedAnimals = animals.map((c) => {
      if (c.animal_id === updatedAnimal.animal_id) {
        return updatedAnimal;
      }
      return c;
    });
    setAnimals(updatedAnimals);
    handleCloseModal();
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/animal/${selectedAnimal.animal_id}`
      );
      const response = await axios.get("http://localhost:8000/animal");
      setAnimals(response.data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du Animal:", error);
    }

    handleCloseModal();
  };
  const imageRenderer = (params) => {
    return (
      <div className="">
        {" "}
        <img
          src={params.value}
          className="rounded-2"
          style={{ width: "50%", height: "auto" }}
          alt="image"
        />
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "ID",
      field: "animal_id",
      sortable: true,
      hide: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "image",
      field: "image",
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: imageRenderer,
    },
    { headerName: "Nom", field: "animal_name", sortable: true, filter: true },
    { headerName: "Type", field: "animal_type", sortable: true, filter: true },
    { headerName: "Race", field: "race", sortable: true, filter: true },
    { headerName: "Sex", field: "sex", sortable: true, filter: true },
    { headerName: "Age", field: "age", sortable: true, filter: true },
    {
      headerName: "Dernière visite",
      field: "last_visit",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Modifier",
      cellRenderer: (params) => (
        <ModifyButton onModify={() => handleModify(params.data)} />
      ),
      filter: false,
      width: 120,
      sortable: false,
      pinned: "right",
    },
    {
      headerName: "Supprimer",
      cellRenderer: (params) => (
        <DeleteButton onDelete={() => handleDelete(params.data)} />
      ),
      filter: false,
      width: 120,
      sortable: false,
      pinned: "right",
    },
  ];
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitEchec(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <h3 className="text-start ms-3 mt-5 text-primary">
            Liste des Animaux
          </h3>
          <Link className="nav-link" to="/animal/add">
            <button className="btn btn-success btn-sm ms-3 mt-5">
              Ajouter un animal
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <TableauAdmin rowData={animals} columnDefs={columnDefs} />
      <CustomModal
        show={modalShow}
        onHide={handleCloseModal}
        title={actionType === "modify" ? "Modifier Animal" : "Supprimer Animal"}
        body={
          actionType === "modify" ? (
            <EditAnimal
              animalId={selectedAnimal?.animal_id}
              onUpdate={handleUpdateAnimal}
            />
          ) : (
            "Êtes-vous sûr de vouloir supprimer ce Animal ?"
          )
        }
        onMainAction={actionType === "modify" ? () => {} : handleConfirmDelete}
        mainActionButtonText={
          actionType === "modify" ? "Enregistrer les changements" : "Supprimer"
        }
      />
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          animal supprimé avec succès !
        </Alert>
      </Snackbar>

      <Snackbar
        open={submitEchec}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Erreur lors de la soumission, le serveur ne répond pas.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Animal;
