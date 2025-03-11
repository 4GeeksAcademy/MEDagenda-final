import React, { useContext, useEffect } from "react";
import DoctorCard from "../component/DoctorCard.jsx";
import { Context } from '../store/appContext'
const doctores = [
    { id: 1, name: "Doctor Diego Vazquez", especialidad: "Pediatra" },
    { id: 2, name: "Doctora Yarely Martinez", especialidad: "Pediatra" },
];

const Neurologia = () => { 
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
            <h2>Neurología</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul> 
            <div> 
            <ul>
            {Array.isArray (store.doctor) && store.doctor.filter((item) => item.specialty === "Neurologia").map((item) => (
                <li key={item.id}>{item.name} - {item.email}- {item.specialty}</li>
            ))}
        </ul> 
            </div>
        </div>
    );
};

export default Neurologia;