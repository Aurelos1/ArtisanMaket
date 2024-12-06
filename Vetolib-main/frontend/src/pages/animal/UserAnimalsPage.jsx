import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Table, TableBody,Snackbar, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, FormControlLabel, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../utils/AuthContext';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

function UserAnimalsPage() {
  const { user } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitEchec, setSubmitEchec] = useState(false);
  const id = useParams();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [animalDialogData, setAnimalDialogData] = useState({
    animal_name: '',
    animal_type: '',
    owner_id : user.user_id || id.id,
    race: '',
    sex: 'inconnu',
    age: '',
    image: '',
    is_vaccinated: false,
    last_visit: ''
  });

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/animal/owner/'+user.user_id || id.id); 
      setAnimals(response.data);
    } catch (error) {
      setSubmitEchec(false);
      console.error("Error fetching animals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogOpen = (animal = {}) => {
    setAnimalDialogData(animal);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveAnimal = async () => {
    const ownerId = user.user_id || id.id; 
  
    try {
      if (animalDialogData.animal_id) {
        await axios.put(`/animal/${animalDialogData.animal_id}`, animalDialogData);
      } else {
        await axios.post('/animal', { ...animalDialogData, owner_id: ownerId });
      }
      fetchAnimals(); 
      handleDialogClose(); 
      setSubmitSuccess(true); 
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'animal:", error);
      setSubmitError(true); 
    }
  };
  

  const handleDelete = async (animalId) => {
    setIsLoading(true);
    try {
      await axios.delete(`/animal/${animalId}`);
      setSubmitSuccess(true);
      fetchAnimals();
    } catch (error) {
      setSubmitEchec(true);
      console.error("Error deleting animal:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitEchec(false);
  }; 
  return (
    <div className='d-flex'>
      <Paper sx={{ margin: 4, position: 'relative' }} className='mt-5 w-75' style={{height : "80vh"}}>
        {isLoading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
        <Button startIcon={<AddIcon />} sx={{ margin: 2 }} variant="contained" onClick={() => handleDialogOpen()}>Ajouter un Animal</Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Race</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map((animal) => (
                <TableRow key={animal.animal_id}>
                  <TableCell>
                    <img src={animal.image} alt={animal.animal_name} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell>{animal.animal_name}</TableCell>
                  <TableCell>{animal.animal_type}</TableCell>
                  <TableCell>{animal.age}</TableCell>
                  <TableCell>{animal.sex}</TableCell>
                  <TableCell>{animal.race}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDialogOpen(animal)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(animal.animal_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{animalDialogData.animal_id ? 'Modifier' : 'Ajouter'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="animal_name"
              label="Nom de l'animal"
              type="text"
              fullWidth
              value={animalDialogData.animal_name}
              onChange={(e) => setAnimalDialogData({ ...animalDialogData, animal_name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="animal_type"
              label="Type d'animal"
              type="text"
              fullWidth
              value={animalDialogData.animal_type}
              onChange={(e) => setAnimalDialogData({ ...animalDialogData, animal_type: e.target.value })}
            />
            <TextField
              margin="dense"
              id="race"
              label="Race"
              type="text"
              fullWidth
              value={animalDialogData.race}
              onChange={(e) => setAnimalDialogData({ ...animalDialogData, race: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Sexe</InputLabel>
              <Select
                id="sex"
                value={animalDialogData.sex}
                onChange={(e) => setAnimalDialogData({ ...animalDialogData, sex: e.target.value })}
              >
                <MenuItem value="male">Mâle</MenuItem>
                <MenuItem value="femelle">Femelle</MenuItem>
                <MenuItem value="inconnu">Inconnu</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="age"
              label="Âge"
              type="number"
              fullWidth
              value={animalDialogData.age}
              onChange={(e) => setAnimalDialogData({ ...animalDialogData, age: e.target.value })}
            />
            <TextField
              margin="dense"
              id="image"
              label="URL de l'image"
              type="text"
              fullWidth
              value={animalDialogData.image}
              onChange={(e) => setAnimalDialogData({ ...animalDialogData, image: e.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={animalDialogData.is_vaccinated}
                  onChange={(e) => setAnimalDialogData({ ...animalDialogData, is_vaccinated: e.target.checked })}
                />
              }
              label="Vacciné"
            />
            <TextField
              margin="dense"
              id="last_visit"
              label="Dernière visite (YYYY-MM-DD)"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={animalDialogData.last_visit}
              onChange={(e) => setAnimalDialogData({ ...animalDialogData, last_visit: e.target.value })}
  />
</DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveAnimal} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

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
    </Paper>
    <div className='w-25 ms-auto mt-5'>
    <h4>
        Retrouver ici la liste de vos animaux, vous pouvez les modifier ou les supprimer.
      </h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, veritatis corporis. Ut quisquam nisi eos nam natus non quibusdam? Magni amet molestias optio illum, nisi doloremque vero eveniet pariatur dolorem!
      </p>
    <img src="../../../public/images/add.jpg" className='mt-5 py-5' width="100%" height="50%" alt="" />

    </div>
    </div>
  );
}

export default UserAnimalsPage;
