import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

function EditCabinet({ cabinetId, onUpdate }) {
  const [cabinetData, setCabinetData] = useState({
    cabinet_name: "",
    owner_id: "",
    address: "",
    city: "",
    phone_number: "",
    image: "",
    is_available: false,
  });
  const [owners, setOwners] = useState([]); // Pour stocker les propriétaires
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const url = useLocation();
  useEffect(() => {
    const fetchCabinetAndOwnersData = async () => {
      try {
        const cabinetResponse = await axios.get(
          `http://localhost:8000/cabinet/${cabinetId}`
        );
        setCabinetData(cabinetResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }

      try {
        const ownersResponse = await axios.get(
          "http://localhost:8000/user?user_type=propriétaire"
        );
        setOwners(ownersResponse.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des propriétaires:",
          error
        );
      }
    };

    fetchCabinetAndOwnersData();
  }, [cabinetId]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setCabinetData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       let  response ;
      if (url.pathname === "/cabinet/add") {
         response = await axios.post(
          `http://localhost:8000/cabinet/`,
          cabinetData
        );
        navigate("/cabinet");
        setSubmitSuccess(true); // Afficher le Snackbar
        onUpdate();
      } else {
         response = await axios.put(
            `http://localhost:8000/cabinet/${cabinetId}`,
            cabinetData
          );
          navigate(0);      
          setSubmitSuccess(true); 
          onUpdate();
        }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du cabinet:", error);
    }
  };
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false); 
  };
  console.log(owners);
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: "80vh" }}
    >
      <TextField
        label="Nom du Cabinet"
        name="cabinet_name"
        value={cabinetData.cabinet_name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>ID du Propriétaire</InputLabel>
        <Select
          label="ID du Propriétaire"
          name="owner_id"
          value={cabinetData.owner_id}
          onChange={handleInputChange}
        >
          {owners.map((owner) => (
            <MenuItem key={owner.user_id} value={owner.user_id}>
              {owner.nom} {owner.prenom}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Adresse"
        name="address"
        value={cabinetData.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ville"
        name="city"
        value={cabinetData.city}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Numéro de Téléphone"
        name="phone_number"
        value={cabinetData.phone_number}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image (URL)"
        name="image"
        value={cabinetData.image}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={cabinetData.is_available}
            onChange={handleInputChange}
            name="is_available"
            color="primary"
          />
        }
        label="Disponible"
      />
      <Button type="submit" variant="contained" color="primary">
        Enregistrer les changements
      </Button>
   <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
          Les modifications ont été enregistrées avec succès !
                  </Alert>
        </Snackbar>

    </form>
  );
}

export default EditCabinet;
