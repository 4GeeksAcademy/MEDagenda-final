import React, { useContext, useEffect } from "react";
import DoctorCard from "../component/DoctorCard.jsx";
import { Context } from '../store/appContext'
const doctores = [
    { id: 1, name: "Doctor Diego Vazquez", especialidad: "Pediatra" },
    { id: 2, name: "Doctora Yarely Martinez", especialidad: "Pediatra" },
];

const MedicinaGeneral = () => { 
    const { store, actions } = useContext(Context);




        const doctor = async () => {
            try {
              await actions.doctorsGet() 
            } catch (error) {
              console.error(error);
            }
          }
        useEffect(()=>{doctor()
            
        },[])
    return (
        <div>
            <h2>Medicina General</h2>
          
              <ul>
            {Array.isArray(store.doctor) && store.doctor.filter((item) => item.specialty === "Medicina General").map((item) => (
                <li className="card card-body my-3" key={item.id}>{item.name} - {item.email}- {item.specialty}</li>
            ))}
        </ul> 

            </ul> 
            <div> 
            <ul>
            {Array.isArray (store.doctor) && store.doctor.filter((item) => item.specialty === "Medicina General").map((item) => (
                <li style={{
                    listStyleType: "none", 
                    padding: "50px", 
                    border: "1px solid #ddd", 
                    borderRadius: "5px", 
                    marginBottom: "10px",
                }} key={item.id}><h3> {item.name} </h3> {item.email}  {item.specialty}</li>
             </ul>
           
              <ul>
            {store.doctor && store.doctor.map((item) => (
                <li key={item.id}>{item.name} - {item.email}- {item.specialty}</li>

            ))}
        </ul> 
            </div>

        </div>
    );
};

export default MedicinaGeneral;