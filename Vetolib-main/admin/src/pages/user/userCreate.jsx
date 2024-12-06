import React, { useState } from 'react';
import axios from '../../utils/axios';
import { TextField, Button, Snackbar, Alert, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

function UserCreate() {
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    try {
      await axios.post('/user/', {
        ...formValues,
        user_type: 'admin', 
      });
      setSubmitSuccess(true);

      const response = await axios.post('/user/auth/login', {
        email: formValues.email,
        password: formValues.password,
      });
      console.log(response.data);
      login(response.data.token, response.data.user);
      navigate('/cabinet');
      
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la création de l\'utilisateur.');
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', paddingTop: '2rem', height: '75vh' }}>
      <h2>Inscription Administrateur</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Mot de passe"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Nom"
          name="nom"
          value={formValues.nom}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Prénom"
          name="prenom"
          value={formValues.prenom}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Créer le compte'}
          </Button>
        </Box>
      </form>
      <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          L'utilisateur a été créé avec succès !
        </Alert>
      </Snackbar>
      <Snackbar open={submitError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error || 'Erreur lors de la création de l\'utilisateur.'}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserCreate;
