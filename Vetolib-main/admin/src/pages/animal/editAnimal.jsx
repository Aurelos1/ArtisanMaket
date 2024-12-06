import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

function EditAnimal({animalId, onUpdate }) {
    const url = useLocation();  
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState({
    owner_id: "",
    animal_name: "",
    animal_type: "",
    race: "",
    sex: "inconnu",
    age: "",
    image: "",
    is_vaccinated: false,
    last_visit: "",
  });
  const [owners, setOwners] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitEchec, setSubmitEchec] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
    useEffect(() => {
    const fetchData = async () => {
      try {
        if (animalId) {
          const response = await axios.get(`/animal/${animalId}`);
          setAnimalData({
            ...response.data,
            last_visit: formatDate(response.data.last_visit),
          });
        }

        const responseOwners = await axios.get("/user?user_type=user");
        setOwners(responseOwners.data);
      } catch (error) {
        setSubmitEchec(true);
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, [animalId]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setAnimalData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (url.pathname.includes("/animal/add")) {
        await axios.post("/animal", animalData);
        navigate("/animal");
        setSubmitSuccess(true);
      } else {
        await axios.put(`/animal/${animalId}`, animalData);
        navigate(0);      
        setSubmitSuccess(true);
      }
      onUpdate();
      setTimeout(() => navigate("/animal"), 2000); 
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-CA').format(date);
  }

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitEchec(false);
  }; 
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Propriétaire</InputLabel>
          <Select
            name="owner_id"
            value={animalData.owner_id}
            onChange={handleInputChange}
            required
          >
            {owners.map((owner) => (
              <MenuItem key={owner.user_id} value={owner.user_id}>
                {owner.nom} {owner.prenom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Nom de l'Animal"
          name="animal_name"
          value={animalData.animal_name}
          onChange={handleInputChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Type d'animal"
          name="animal_type"
          value={animalData.animal_type}
          onChange={handleInputChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Race"
          name="race"
          value={animalData.race}
          onChange={handleInputChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Sexe</InputLabel>
          <Select
            name="sex"
            value={animalData.sex}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="femelle">Femelle</MenuItem>
            <MenuItem value="inconnu">Inconnu</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Âge"
          name="age"
          type="number"
          value={animalData.age}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Image (URL)"
          name="image"
          value={animalData.image}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={
            <Switch
              checked={animalData.is_vaccinated}
              onChange={handleInputChange}
              name="is_vaccinated"
            />
          }
          label="Vacciné"
        />

        <TextField
          fullWidth
          margin="normal"
          label="Dernière visite"
          type="date"
          name="last_visit"
          InputLabelProps={{ shrink: true }}
          value={animalData.last_visit}
          onChange={handleInputChange}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Enregistrer les changements
        </Button>
      </form>
      <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Les modifications ont été enregistrées avec succès !
        </Alert>
      </Snackbar>
      <Snackbar open={submitEchec} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Erreur lors de la soumission, le serveur ne répond pas.
        </Alert>
      </Snackbar>

    </div>
  );
}

export default EditAnimal;
