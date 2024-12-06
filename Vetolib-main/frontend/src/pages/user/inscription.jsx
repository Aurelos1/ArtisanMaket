import React, { useState } from 'react';
import axios from '../../utils/axios';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

function UserInscription() {
    const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    user_type: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    try {
      await axios.post('/user/', {
        ...formValues      });
      setSubmitSuccess(true);

      const response = await axios.post('/user/auth/login', {
        email: formValues.email,
        password: formValues.password,
      });
      console.log(response.data);
      login(response.data.token, response.data.user);
      navigate('/');
      
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la création de l\'utilisateur.');
      setSubmitError(true);
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  return (
    <div className='d-flex'>
        <img src="../../public/images/Skippy.jpg " width="50%" className="d-inline-block align-top me-2 rounded-2 mt-5" alt="" />
    
<div style={{ maxWidth: 600, margin: 'auto', paddingTop: '5rem', height : '75vh'}}>
      <h3 className='text-center text-primary'>NOUVEAU SUR VETOLIB ?</h3>
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Type d'utilisateur</InputLabel>
          <Select
            name="user_type"
            value={formValues.user_type}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="user">Je suis propriétaire d'un animal</MenuItem>
            <MenuItem value="propriétaire">Je suis professionnel de santé animale</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }} className='w-100'>
          S'inscrire
        </Button>
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
    </div>
    
  );
}

export default UserInscription;
