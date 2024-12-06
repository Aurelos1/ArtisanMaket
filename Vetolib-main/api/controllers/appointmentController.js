
const e = require('express');
const db = require('../databases/database');

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await db.query('SELECT * FROM Appointment');
        res.json(appointments);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [appointment] = await db.query('SELECT * FROM Appointment WHERE appointment_id = ?', [id]);
        if (!appointment) {
            return res.status(404).send('Appointment not found');
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getAppointmentsByUserId = async (req, res) => {
    const { userId } = req.params; 

    try {
        const query = `SELECT * FROM Appointment WHERE owner_id = ?  ORDER BY appointment_date ASC`; 
        const appointments = await db.query(query, [userId]);

        if (appointments.length > 0) {
            res.json(appointments);
        } else {
            res.status(404).json({ message: "Pas de rendez vous en vue MR" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving appointments", error: "Pas de rendez vous en vue MR" });
    }
};    

exports.getAppointmentsByCabinetId = async (req, res) => {
    const { cabinet_id } = req.params; 

    try {
        const query = `SELECT * FROM Appointment WHERE cabinet_id = ?  ORDER BY appointment_date ASC`; 
        const appointments = await db.query(query, [cabinet_id]);

        if (appointments.length > 0) {
            res.json(appointments);
        } else {
            res.status(404).json({ message: "Pas de rendez vous en vue MR" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving appointments", error: "Pas de rendez vous en vue MR" });
    }
};  

exports.createAppointment = async (req, res) => {
    const { cabinet_id,owner_id, appointment_date, status, reason } = req.body;
    try {
        const result = await db.query('INSERT INTO Appointment (cabinet_id, owner_id, appointment_date, status, reason) VALUES (?, ?,?, ?, ?)', [cabinet_id, owner_id, appointment_date, status, reason]);
        res.status(201).json({ message: 'RDV created', appointmentId: result.appointment_id  });
        
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { status, reason } = req.body;
    try {
        await db.query('UPDATE Appointment SET status = ?, reason = ? WHERE appointment_id = ?', [status, reason, id]);
        res.json({ message: 'Appointment updated' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Appointment WHERE appointment_id = ?', [id]);
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
