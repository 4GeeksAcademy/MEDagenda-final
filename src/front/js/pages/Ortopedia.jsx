import React, { useContext,useState, useEffect } from "react";
import DoctorCard from "../component/DoctorCard.jsx";
import { Context } from '../store/appContext'
const doctores = [
    { id: 1, name: "Doctor Diego Vazquez", especialidad: "Pediatra" },
    { id: 2, name: "Doctora Yarely Martinez", especialidad: "Pediatra" },
];

const Ortopedia = () => { 
   const { store, actions } = useContext(Context);
          const [doc, setDoctors] = useState([]);
      
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
            <h2>Medicina General</h2>
            {/* <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>  */}
            <div> 
            <ul>
            {Array.isArray (store.doctor) && store.doctor.filter((item) => item.specialty === "Ortopedia y Traumatologia").map((item) => (
                <li style={{
                    listStyleType: "none",
                    padding: "50px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    marginBottom: "10px",
                }} key={item.doctor_id}>{item.name} - {item.email}- {item.specialty} 
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
                        
                
                </li>
            ))}
        </ul> 
            </div>
        </div>
    );
};

export default Ortopedia;