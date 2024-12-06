import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from '../../utils/axios';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


function UserProfile( user) {
  const userInfo = user.user;
  const [formValues, setFormValues] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/${userInfo.user_id}`);
      setFormValues(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    axios.put(`http://localhost:8000/user/${userInfo.user_id}`, formValues)
      .then((response) => {
        setSubmitSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
  };

  return (
    <div className="container pt-5 border rounded" style ={{height : "75vh"}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
            <Card>
              <CardContent>
                <div className="user-profile">
                  <Avatar src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
                  <Typography variant="h5">{userInfo && (userInfo.nom + " " + userInfo.prenom)}</Typography>
                  <Typography variant="subtitle1">{userInfo.email}</Typography>
                </div>
                <div className="about">
                  <Typography variant="h6">A propos</Typography>
                  <Typography>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">Détails</Typography>
                <Grid container spacing={2}>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="fullName"
                      label={formValues.nom  ? "" : "Nom"}
                      variant="outlined"
                      value={formValues.nom}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="prenom"
                      type="text"
                      label={formValues.prenom  ? "" : "Prenom"}
                      variant="outlined"
                      value={formValues.prenom}
                      onChange={handleChange}
                    />
                  </Grid>
              
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      type="email"
                      label={formValues.email  ? "" : "Email"}
                      variant="outlined"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="flex-end" mt={2}>
                  <Button variant="contained" color="success" type="submit">Enregistrer</Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
          Votre Profil a été enregistré avec succès !
        </Alert>
        </Snackbar>
    </div>
  );
}

export default UserProfile;
