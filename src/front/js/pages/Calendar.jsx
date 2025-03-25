import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

import Pagos from "../component/Pagos.jsx";
const Calendar = () => {
  const { doctor_id } = useParams();  // Obtener el doctor_id de la URL

  const { store, actions } = useContext(Context);
  let admin = (localStorage.getItem('role'))
  let user = JSON.parse(localStorage.getItem('user'))?.role
  let doctor = JSON.parse(localStorage.getItem('doctor'))?.role
  let role = admin || user || doctor

  useEffect(() => {
    let admin = (localStorage.getItem('role'))
    let user = JSON.parse(localStorage.getItem('user'))?.role
    let doctor = JSON.parse(localStorage.getItem('doctor'))?.role
    let role = admin || user || doctor

    if (store.token) {
      if (role === "user") {
        actions.fetchAppointments();  // Si es usuario, trae sus citas
      } else if (role === "doctor") {
        actions.fetchAppointments2(); // Si es doctor, trae otras citas
      }
    }
  }, [store.token]); // Ejecutar solo cuando el token cambie

  // Función para agregar cita al hacer click en una fecha del calendario
  const handleDateClick = async (arg) => {
    let admin = (localStorage.getItem('role'))
    let user = JSON.parse(localStorage.getItem('user'))?.role
    let doctor = JSON.parse(localStorage.getItem('doctor'))?.role
    let role = admin || user || doctor

    // Solo permitir la función si el rol es "user"
    if (role !== "user") {
        alert("Solo los usuarios pueden agendar citas.");
        return;
    }

    const title = prompt("Ingresa el título de la cita:");
    if (title) {
        const userId = store.user?.id || localStorage.getItem("id"); // Obtener usuario autenticado
        const doctorId = doctor_id; // Se asume que doctor_id ya está definido en el contexto

        if (!doctorId || !userId) {
            alert("Por favor, ve a Especialidades y escoge tu Doctor.");
            return;
        }

        await actions.addAppointment(userId, doctorId, arg.dateStr, "09:00:00", "Pendiente");
    }
};


  // Botón visible para agregar cita manual
  const handleAddButton = async () => {
    const date = prompt("Ingresa la fecha para la cita (YYYY-MM-DD):");
    const title = prompt("Ingresa el título de la cita:");
    const userId = store.user?.id || localStorage.getItem("id");
    const doctorId = prompt("Ingresa el ID del doctor:");

    if (date && title && userId && doctorId) {
      await actions.addAppointment(userId, doctorId, date, "09:00:00", "Pendiente");
    } else {
      alert("Faltan datos para crear la cita.");
    }
  };


  return (
    <div className="container my-4">
      <div className="row g-3 d-flex flex-column flex-md-row">

        {/* Sección de botones */}
        <div className="col-12 col-md-3">
          {role === "user" && (
            <button className="btn btn-primary btn-lg w-100 mb-3" onClick={handleAddButton}>
              Agregar Cita
            </button>
          )}

          {store.events.length > 0 && (
            <button className="btn btn-danger btn-lg w-100" onClick={() => alert("Para ELIMINAR o REAGENDAR su cita debe enviar un mensaje al mail: contacto@medagenda.com")}>
              Eliminar Cita
            </button>
          )}
          {role === "user" && (
                            <>
          < Pagos />
          </>
          )}
        </div>

        {/* Sección del calendario */}
        <div className="col-12 col-md-9">
          <div className="card shadow p-3">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={store.events}
              dateClick={handleDateClick}
              // eventClick={handleEventClick}
              editable={true}
              selectable={true}
              height="auto"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Calendar;
