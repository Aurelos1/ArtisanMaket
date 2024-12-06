import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Snackbar,
} from "@mui/material";
import { useAuth } from "../../utils/AuthContext";
import { useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();
  const id = useParams();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitEchec, setSubmitEchec] = useState(false);
  const [error, setError] = useState(null);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const userId = user.user_id || id.id;
      const response = await axios.get(`/appointments/user/${userId}`);
      const appointmentsWithCabinetInfo = await Promise.all(
        response.data.map(async (appointment) => {
          try {
            const cabinetResponse = await axios.get(
              `/cabinet/${appointment.cabinet_id}`
            );
            return { ...appointment, cabinet: cabinetResponse.data };
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des informations du cabinet :",
              error
            );
            return appointment;
          }
        })
      );
      setAppointments(appointmentsWithCabinetInfo);
    } catch (error) {
      setSubmitEchec(true);
      console.error("Erreur lors de la récupération des rendez-vous :", error);
    }
  };
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/appointments/${appointmentId}`);
      setSubmitSuccess(true);
      fetchAppointments();
    } catch (error) {
      setError(error);
      console.error("Erreur lors de l'annulation du rendez-vous :", error);
    }
  };
  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitEchec(false);
  };
  console.log(error);
  return (
    <div className="my-5 container" style={{ height: "80vh" }}>
      <h5>Mes Rendez-vous</h5>
      <hr />

      <Grid container spacing={4}>
        {appointments ? (
          appointments.map((appointment) => (
            <Grid item key={appointment.appointment_id} xs={4} sm={3} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={appointment.cabinet.image}
                  alt="Image du cabinet"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {appointment.cabinet.cabinet_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Adresse: {appointment.cabinet.address},{" "}
                    {appointment.cabinet.city}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Téléphone: {appointment.cabinet.phone_number}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {appointment.cabinet.email || "Non fourni"}
                  </Typography>
                  <Typography variant="body2">
                    Rendez-vous le: {appointment.appointment_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={
                      appointment.status === "Confirmer"
                        ? "text-success"
                        : "text-primary"
                    }
                  >
                    Statut: {appointment.status}
                  </Typography>
                  <Typography variant="body2">
                    Raison: {appointment.reason}
                  </Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleCancelAppointment(appointment.appointment_id)
                    }
                    sx={{ mt: 2 }}
                  >
                    Annuler
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">
            Vous n'avez pas de rendez-vous
          </Typography>
        )}
      </Grid>

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
          Les modifications ont été enregistrées avec succès !
        </Alert>
      </Snackbar>
      <Snackbar
        open={submitEchec}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {error
            ? error.message
            : "Pas de rendez vous en vue MR"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Appointment;
