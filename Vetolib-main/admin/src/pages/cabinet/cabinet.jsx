import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import TableauAdmin from "../../components/TableauAdmin";
import ModifyButton from "../../components/ModifyButton";
import DeleteButton from "../../components/DeleteButton";
import CustomModal from "../../components/CustomModal";
import EditCabinet from "./editCabinet";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Cabinet = () => {
  const [cabinets, setCabinets] = useState([]);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [actionType, setActionType] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitEchec, setSubmitEchec] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchCabinets = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cabinet");
        setCabinets(response.data);
      } catch (error) {
        setSubmitEchec(true);
        console.error("Erreur lors de la récupération des cabinets:", error);
      }
    };

    fetchCabinets();
  }, []);

  const handleModify = (cabinet) => {
    setSelectedCabinet(cabinet);
    setActionType("modify");
    setModalShow(true);
  };

  const handleDelete = (cabinet) => {
    setSelectedCabinet(cabinet);
    setActionType("delete");
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedCabinet(null);
    setActionType("");
  };

  const handleUpdateCabinet = (updatedCabinet) => {
    const updatedCabinets = cabinets.map((c) => {
      if (c.cabinet_id === updatedCabinet.cabinet_id) {
        return updatedCabinet;
      }
      return c;
    });
    setCabinets(updatedCabinets);
    handleCloseModal();
    navigate(0);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/cabinet/${selectedCabinet.cabinet_id}`
      );
      const response = await axios.get("http://localhost:8000/cabinet");
      setCabinets(response.data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du cabinet:", error);
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
      field: "cabinet_id",
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
    { headerName: "Nom", field: "cabinet_name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    {
      headerName: "Téléphone",
      field: "phone_number",
      sortable: true,
      filter: true,
    },
    { headerName: "Ville", field: "city", sortable: true, filter: true },
    { headerName: "Adresse", field: "address", sortable: true, filter: true },
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
            Liste des Cabinets
          </h3>
          <Link className="nav-link" to="/cabinet/add">
            <button className="btn btn-success btn-sm ms-3 mt-5">
              Ajouter un cabinet
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <TableauAdmin rowData={cabinets} columnDefs={columnDefs} />
      <CustomModal
        show={modalShow}
        onHide={handleCloseModal}
        title={
          actionType === "modify" ? "Modifier Cabinet" : "Supprimer Cabinet"
        }
        body={
          actionType === "modify" ? (
            <EditCabinet
              cabinetId={selectedCabinet?.cabinet_id}
              onUpdate={handleUpdateCabinet}
            />
          ) : (
            "Êtes-vous sûr de vouloir supprimer ce cabinet ?"
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
          Cabiner supprimé avec succès !
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

export default Cabinet;
