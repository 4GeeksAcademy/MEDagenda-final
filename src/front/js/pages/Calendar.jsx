import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
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
        actions.fetchAppointmentsForDoctor(); // Si es doctor, trae otras citas
      }
    }
  }, [store.token]); // Ejecutar solo cuando el token cambie

  // Función para agregar cita al hacer click en una fecha del calendario
  const handleDateClick = async (arg) => {
    const title = prompt("Ingresa el título de la cita:");
    if (title) {
      const userId = store.user?.id || localStorage.getItem("id"); // Obtener usuario autenticado

      // Aquí usamos el doctor_id directamente sin pedirlo
      const doctorId = doctor_id;

      if (!doctorId || !userId) {
        alert("Porfavor ve a Especialidades y escoje tu Doctor");
        return;
      }

      await actions.addAppointment(userId, doctorId, arg.dateStr, "09:00:00", "Pendiente");
    }
  };
  // Función para manejar edición o eliminación de citas
  const handleEventClick = async (clickInfo) => {
    if (window.confirm("¿Estás seguro de eliminar esta cita?")) {
      await actions.deleteAppointment(clickInfo.event.id);
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
    <div className="calendar-container">
      <h2 className="calendar-title">📅 Mi Agenda :D</h2>
      {role === "user" ? (<button onClick={handleAddButton}>Agregar Cita</button>
      ) : null}

      {/* Mostrar el botón de eliminar solo si hay citas */}
      {store.events.length > 0 && (
        <button onClick={() => alert("Haz clic en una cita para eliminarla")}>
          Eliminar Cita
        </button>
      )}

      <div className="calendar-box">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={store.events}

          dateClick={handleDateClick} 
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          height="auto"
        />
      </div>
    </div>
  );
};

export default Calendar;
