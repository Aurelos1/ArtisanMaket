import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Button, TextField, Typography, Container, Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from '../../utils/AuthContext'; 
const UserEdit = () => {
    const { user } = useAuth(); 
    const [formData, setFormData] = useState({});
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitEchec, setSubmitEchec] = useState(false);
    const [message , setMessage] = useState('');
    const { logout } = useAuth();
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        fecthUser();
      }
    }, [user]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const fecthUser = async () => {
      try {
        const response = await axios.get(`/user/${user.user_id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.put(`/user/${user.user_id}`, formData);
        setMessage(response.data.message);
        setSubmitSuccess(true);
      } catch (error) {
        setSubmitEchec(true);
        console.error("Erreur lors de la mise à jour du profil :", error);
      }
    };
  
    const handleDeleteAccount = async () => {
      try {
        await axios.delete(`/user/${user.user_id}`);
        navigate('/');
        setMessage('Votre compte a été supprimé avec succès !');
        setSubmitSuccess(true);
        logout();
      } catch (error) {
        setSubmitEchec(true);
        console.error("Erreur lors de la suppression du compte :", error);
      }
    };
  
    const handleOpenDeleteDialog = () => {
      setOpenDeleteDialog(true);
    };
  
    const handleCloseDeleteDialog = () => {
      setOpenDeleteDialog(false);
    };
  
    const handleCloseSnackbar = () => {
      setSubmitSuccess(false);
      setSubmitEchec(false);
    }; 
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}className='mt-5 py-5' style={{height : '75vh'}}>
        <Paper elevation={6} sx={{ p: 3 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Modifier Profil
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={formData.email  ? "" : "Email"}
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="nom"
                  label={formData.nom  ? "" : "Nom"}
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="prenom"
                  label={formData.prenom  ? "" : "Prenom"}
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Sauvegarder
            </Button>
            <Button fullWidth variant="outlined" color="secondary" onClick={handleOpenDeleteDialog}>
              Supprimer Compte
            </Button>
          </form>
        </Paper>
  
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Êtes-vous sûr ?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cette action supprimera définitivement votre compte et toutes les données associées. Cette action ne peut pas être annulée.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={handleDeleteAccount} color="secondary">
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {message ? message : 'Les modifications ont été enregistrées avec succès !'}
        </Alert>
      </Snackbar>
      <Snackbar open={submitEchec} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Erreur lors de la soumission, le serveur ne répond pas.
        </Alert>
      </Snackbar>
      </Container>
    );
  };
  
  export default UserEdit;
  