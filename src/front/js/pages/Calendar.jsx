import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Context } from "../store/appContext";

const Calendar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token) {
        actions.fetchAppointments();
    }
}, [store.token]); // Ejecutar solo cuando el token cambie

  // Función para agregar cita al hacer click en una fecha del calendario
  const handleDateClick = async (arg) => {
    const title = prompt("Ingresa el título de la cita:");
    if (title) {
      const userId = store.user?.id || localStorage.getItem("id"); // Obtener usuario autenticado
      const doctorId = prompt("Ingresa el ID del doctor:");

      if (!doctorId || !userId) {
        alert("Falta información de usuario o doctor.");
        return;
      }

      await actions.addAppointment(userId, doctorId, arg.dateStr, "09:00:00", "Pendiente");
    }
  };

  // Función para manejar edición o eliminación de citas
  const handleEventClick = async (clickInfo) => {
    const action = prompt(
      "¿Qué deseas hacer?\nEscribe 'eliminar' para borrar o 'editar' para modificar la cita:"
    );

    if (action?.toLowerCase() === "eliminar") {
      if (window.confirm("¿Estás seguro de eliminar esta cita?")) {
        await actions.deleteAppointment(clickInfo.event.id);
      }
    } else if (action?.toLowerCase() === "editar") {
      const newTitle = prompt("Ingresa el nuevo título para la cita:", clickInfo.event.title);
      if (newTitle) {
        const updatedData = {
          title: newTitle,
          date: clickInfo.event.start.toISOString().split("T")[0], // Formato YYYY-MM-DD
        };
        await actions.updateAppointment(clickInfo.event.id, updatedData);
      }
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
      <button onClick={handleAddButton}>Agregar Cita</button>
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
