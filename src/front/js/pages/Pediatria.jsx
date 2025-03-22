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
                background: "linear-gradient(to right,rgba(69, 103, 183, 0.4) ,rgb(14, 95, 245) )",
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
                            padding: "22px 30px",  // Aumentado el padding horizontal y vertical
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            marginBottom: "15px",
                            background: "linear-gradient(to right,rgb(29, 168, 233),rgb(175, 230, 219))",
                            border: "none",
                            borderRadius: "50px",
                            boxShadow: "0px 4px 15px rgba(0,123,255,0.2)",
                            position: "relative",
                            fontFamily: "'Quicksand', sans-serif",
                            fontSize: "17px",
                            fontWeight: "500",
                            letterSpacing: "1.5px",
                            lineHeight: "1.6",
                            color: "#2c3e50",
                            overflow: "hidden",
                            zIndex: "1",
                            maxWidth: "50%",
                            margin: "0 auto 15px",


                            "&::before": {
                                content: "''",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                right: "0",
                                bottom: "0",
                                borderRadius: "50px",
                                padding: "3px",
                                background: "linear-gradient(to right, #0ea5e9, #06b6d4, #14b8a6)",
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                                zIndex: "-1"
                            }
                        }}
                            key={item.doctor_id}
                            className="flex gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6 shadow-md"
                        >
                            <h4 className="text-xl font-semibold text-gray-800 mb-3"><strong>{item.name}</strong>

                                <div className="flex text- items-center gap-2 text-sm text-gray-600">
                                    <i className="fa-solid fa-envelope text-blue-500"></i>
                                    <span>{item.email}</span>
                                </div>

                                <div className="flex items-center gap-2 mt-1 text-sm">
                                    <i className="fa-solid fa-stethoscope text-cyan-500"></i>
                                    <span className="rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 font-small text-gray-700">
                                        {item.specialty}
                                    </span>
                                </div></h4>


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
                            {/* <button
                                onClick={() => navigate("/Calendar")}
                                style={{
                                    marginLeft: "80px",
                                    padding: "10px 10px",
                                    backgroundColor: "#005f73", // Azul 
                                    color: "#FFFFFF", // Blanco
                                    border: "none",
                                    borderRadius: "70px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", // Sombra para dar profundidad
                                    // transition: "all 0.2s ease-in-out", // Transición para efectos de hover y active
                                    // "&:hover": {
                                    //   backgroundColor: "#0a9396", // Verde azulado calmante en hover
                                    //   boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Sombra más oscura en hover
                                    // },
                                    // "&:active": {
                                    //   backgroundColor: "#94d2bd", // Verde pastel en active para suavidad
                                    //   transform: "scale(0.95)", // Efecto de presión en active
                                    // },
                                }}
                            >
                                Agendar
                            </button> */}


                            {role === 'doctor' || role === 'user' ? (
                                <button
                                    onClick={() => navigate(`/Calendar/${item.doctor_id}`)} // Pasar el ID del doctor en la URL
                                    className="btn btn-primary">
                                    Mi Agenda
                                </button>
                            ) : null}
                        </li>

                    ))}
                </ul>


            </div>

        </div>
    );
};

export default Pediatria;