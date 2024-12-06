import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Table, TableBody,Snackbar, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, FormControlLabel, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../utils/AuthContext';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

function CabinetsPage() {
  const { user } = useAuth();
  const [cabinets, setCabinets] = useState([]); 
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitEchec, setSubmitEchec] = useState(false);
  const [error, setError] = useState(null);
  const [message , setMessage] = useState('');
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [cabinetDialogData, setCabinetDialogData] = useState({
    cabinet_name: '',
    address: '',
    city: '',
    phone_number: '',
    email: '',
    image: '',
    is_available: true,
    opening_hours: '',
    services_offered: '',
  });

  useEffect(() => {
    fetchCabinets();
  }, []);

  const fetchCabinets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/cabinet/ownerCabinet/${user.user_id || useParams().id}`);
      setCabinets(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cabinets :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogOpen = (cabinet = {}) => {
    setCabinetDialogData(cabinet);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveCabinet = async () => {
    try {
      if (cabinetDialogData.cabinet_id) {
        await axios.put(`/cabinet/${cabinetDialogData.cabinet_id}`, cabinetDialogData);
      } else {
        await axios.post('/cabinet', { ...cabinetDialogData, owner_id: user.user_id });
      }
      fetchCabinets(); 
      handleDialogClose(); 
      setSubmitSuccess(true); 
    } catch (error) {
      setError(error);
      setSubmitEchec(true); 
    }
  };

  const handleDeleteCabinet = async (cabinetId) => {
    setIsLoading(true);
    try {
      await axios.delete(`/cabinet/${cabinetId}`);
      fetchCabinets();
      setSubmitSuccess(true);
    } catch (error) {
      setError(error);
      setSubmitEchec(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitEchec(false);
  }; 

  console.log(cabinets);
  return (
    <Paper sx={{ margin: 4, overflowX: 'auto', padding: 2 }} className='mt-5'>
      {isLoading && (
        <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      )}
      <Button startIcon={<AddIcon />} sx={{ marginBottom: 2 }} variant="contained" onClick={() => handleDialogOpen()}>
        Ajouter un Cabinet
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du Cabinet</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabinets && cabinets.map((cabinet) => (
              <TableRow key={cabinet.cabinet_id}>
                <TableCell>{cabinet.cabinet_name}</TableCell>
                <TableCell>{cabinet.address}</TableCell>
                <TableCell>{cabinet.city}</TableCell>
                <TableCell>{cabinet.phone_number}</TableCell>
                <TableCell>{cabinet.email}</TableCell>
                <TableCell>{cabinet.is_available ? 'Oui' : 'Non'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDialogOpen(cabinet)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCabinet(cabinet.cabinet_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{cabinetDialogData.cabinet_id ? 'Modifier Cabinet' : 'Ajouter Cabinet'}</DialogTitle>
        <DialogContent>
  <TextField
    autoFocus
    margin="dense"
    id="cabinet_name"
    label="Nom du Cabinet"
    type="text"
    fullWidth
    value={cabinetDialogData.cabinet_name}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, cabinet_name: e.target.value })}
  />
  <TextField
    margin="dense"
    id="address"
    label="Adresse"
    type="text"
    fullWidth
    value={cabinetDialogData.address}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, address: e.target.value })}
  />
  <TextField
    margin="dense"
    id="city"
    label="Ville"
    type="text"
    fullWidth
    value={cabinetDialogData.city}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, city: e.target.value })}
  />
  <TextField
    margin="dense"
    id="phone_number"
    label="Numéro de Téléphone"
    type="text"
    fullWidth
    value={cabinetDialogData.phone_number}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, phone_number: e.target.value })}
  />
  <TextField
    margin="dense"
    id="email"
    label="Email"
    type="email"
    fullWidth
    value={cabinetDialogData.email}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, email: e.target.value })}
  />
  <TextField
    margin="dense"
    id="image"
    label="URL de l'Image"
    type="text"
    fullWidth
    value={cabinetDialogData.image}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, image: e.target.value })}
  />
  <FormControlLabel
    control={
      <Switch
        checked={cabinetDialogData.is_available}
        onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, is_available: e.target.checked })}
      />
    }
    label="Disponible"
  />
  <TextField
    margin="dense"
    id="opening_hours"
    label="Heures d'Ouverture"
    type="text"
    fullWidth
    value={cabinetDialogData.opening_hours}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, opening_hours: e.target.value })}
  />
  <TextField
    margin="dense"
    id="services_offered"
    label="Services Offerts"
    type="text"
    fullWidth
    multiline
    rows={4}
    value={cabinetDialogData.services_offered}
    onChange={(e) => setCabinetDialogData({ ...cabinetDialogData, services_offered: e.target.value })}
  />
</DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveCabinet} color="primary">
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
          {error ? error.message : 'Une erreur s\'est produite !'}
        </Alert>
      </Snackbar>
    </Paper>
  );
  
}

export default CabinetsPage;
