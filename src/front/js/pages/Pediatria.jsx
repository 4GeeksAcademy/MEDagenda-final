import React, { useContext, useState, useEffect } from "react";
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";
const Pediatria = () => {
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
        if (!doctor_id || isNaN(doctor_id)) {  //Comprueba si user_id no es un número válido.
            console.error("Error: ID de usuario inválido", doctor_id);
            return;
        }

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

        if (confirmDelete) {
            try {
                await actions.deleteDoctor(doctor_id);
                setDoctors(prevPatients => prevPatients.filter(item => item.doctor_id !== doctor_id));
            } catch (error) {
                console.error("No se pudo eliminar el usuario correctamente", error);
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
                marginBottom: "10px",
                textAlign: "center",
                textShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                background: "linear-gradient(to right, #4567b7 50%, #6495ed 50%)",
                backgroundSize: "100% 100%",
                padding: "10px",
                borderRadius: "10px",
            }}>
                Pediatria
            </h2>




            <div>
                <ul>
                    {Array.isArray(store.doctor) && store.doctor.filter((item) => item.specialty === "Pediatría").map((item) => (
                        <li style={{
                            listStyleType: "none",
                            padding: "20px",
                            border: "3px solid #007bff",
                            borderRadius: "50px",
                            marginBottom: "10px",
                            backgroundColor: "#ecf9f5",
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                        }} key={item.doctor_id}><h3> {item.name} </h3> <i class="fa-solid fa-envelope"></i> {item.email}  {item.specialty}

                            {role === 'admin' ? (
                                <i className="fa-solid fa-trash" style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
                                    onClick={() => {
                                        if (item.doctor_id) {
                                            deleteDoc(item.doctor_id);
                                        } else {
                                            console.error("Error: ID de usuario no definido", item);
                                        }
                                    }}
                                ></i>
                            ) : null}
                            <button
                                onClick={() => navigate("/Calendar")}
                                style={{
                                    marginLeft: "10px",
                                    padding: "10px 20px",
                                    backgroundColor: "#007bff", // Azul claro
                                    color: "#ffffff", // Blanco
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                Agendar
                            </button>

                        </li>

                    ))}
                </ul>


            </div>

        </div>
    );
};

export default Pediatria;