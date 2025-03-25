import React, { useContext, useState, useEffect } from "react";
import DoctorCard from "../component/DoctorCard.jsx";
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Ortopedia = () => {
    const { store, actions } = useContext(Context);
    const [doc, setDoctors] = useState([]);
    const navigate = useNavigate()

    let admin = (localStorage.getItem('role'))
    let user = JSON.parse(localStorage.getItem('user'))?.role
    let role = admin || user




    const doctor = async () => {
        try {
            await actions.doctorsGet()
        } catch (error) {
            console.error(error);
        }
    }
    const deleteDoc = async (doctor_id) => {
        if (!doctor_id || isNaN(doctor_id)) {
            console.error("Error: ID de usuario inválido", doctor_id);
            return;
        }

        const confirmDelete = await swal({
            title: "¿Estás seguro?",
            text: "El doctor será eliminado permanentemente",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (confirmDelete) {
            try {
                await actions.deleteDoctor(doctor_id);
                setDoctors(prevDoctors => prevDoctors.filter(item => item.doctor_id !== doctor_id));
                swal("Eliminado", "El doctor ha sido eliminado", "success");
            } catch (error) {
                console.error("No se pudo eliminar el doctor correctamente", error);
                swal("Error", "No se pudo eliminar el doctor", "error");
            }
        }
    };



    useEffect(() => {
        doctor()

    }, [store.doctors])
    return (
        <div>

            <h2 style={{
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
                color: "#FFFFFF",
                marginBottom: "0px",
                textAlign: "center",
                textShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                background: "linear-gradient(to right,rgba(44, 89, 185, 0.99) ,rgb(14, 236, 70) )",
                padding: "10px",
                borderRadius: "0px",
            }}>
                🦵🦾  Ortopedia y Traumatología
            </h2>

            <div>
                <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 0,
                }}>
                    {Array.isArray(store.doctor) && store.doctor.filter(item => item.specialty === "Ortopedia y Traumatología").map(item => (
                        <li
                            key={item.doctor_id}
                            style={{
                                listStyleType: "none",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "linear-gradient(to right,rgb(29, 168, 233),rgba(58, 204, 248, 0.22))",
                                border: "none",
                                borderRadius: "40px",
                                boxShadow: "0px 4px 15px rgba(0,123,255,0.2)",
                                margin: "15px",
                                padding: "20px",
                                maxWidth: "100%", // Asegura que no exceda el 90% del ancho en pantallas pequeñas
                                width: "550px", // Tamaño predeterminado para pantallas grandes
                                transition: "transform 0.2s",
                            }}
                        >
                            <h4 style={{ fontSize: "1.2rem", fontWeight: "600", color: "#2c3e50" }}>
                                <strong>{item.name}</strong>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                                    <i className="fa-solid fa-envelope text-blue-500"></i>
                                    <span>{item.email}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                                    <i className="fa-solid fa-stethoscope text-cyan-500"></i>
                                    <span style={{ borderRadius: "20px", background: "rgba(204, 193, 90, 0.2)", padding: "5px 10px", color: "#2c3e50" }}>
                                        {item.specialty}
                                    </span>
                                </div>
                            </h4>

                            {role === 'admin' && (
                                <i className="fa-solid fa-trash" style={{ cursor: "pointer", marginTop: "10px", color: "red" }}
                                    onClick={() => deleteDoc(item.doctor_id)}
                                ></i>
                            )}

                            {(role === 'doctor' || role === 'user') && (
                                <button
                                    onClick={() => navigate(`/Calendar/${item.doctor_id}`)}
                                    style={{
                                        padding: "10px 15px",
                                        backgroundColor: "#005f73",
                                        color: "#FFFFFF",
                                        border: "none",
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        marginTop: "10px",
                                        width: "100%",
                                        maxWidth: "200px"
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.target.style.background = "linear-gradient(to right, rgb(14, 181, 247), rgba(130, 194, 224, 0.57))") // Más intenso al pasar el mouse
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.background = "linear-gradient(to right, rgb(211, 228, 243), rgba(66, 195, 238, 0.89))") // Vuelve al normal
                                      }
                                >
                                    <h6><i class="fa-solid fa-calendar-plus"></i> <span style={{ paddingLeft: "3px" }}>Agendar Cita</span></h6>
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Ortopedia;