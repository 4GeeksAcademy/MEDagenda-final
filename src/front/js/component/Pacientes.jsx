import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import swal from "sweetalert";

const Pacientes = () => {
  const { store, actions } = useContext(Context); 
  const [patients, setPatients] = useState([]); 

  let admin = localStorage.getItem('role');
  let user = JSON.parse(localStorage.getItem('user'))?.role;
  let role = admin || user;

  const patient = async () => {
    try {
      await actions.pacientesGet(); 
      setPatients(store.user || []);
    } catch (error) {
      console.error("No se llamaron los Pacientes correctamente");
    }
  }; 

  const deleteUser3 = async (user_id) => {
    if (!user_id || isNaN(user_id)) { 
        console.error("Error: ID de usuario inválido", user_id);
        return;
    }

    const confirmDelete = await swal({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este usuario!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    });
    
    if (confirmDelete) {
        try {
            await actions.deleteUser2(user_id);
            setPatients(prevPatients => prevPatients.filter(item => item.user_id !== user_id));
            swal("Usuario eliminado", "El usuario ha sido eliminado correctamente", "success");
        } catch (error) {
            console.error("No se pudo eliminar el usuario correctamente", error);
            swal("Error", "No se pudo eliminar el usuario", "error");
        }
    }
  };

  useEffect(() => {
    patient();
  }, [store.users]);

  return (
    <div>
      <h1 style={{
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
            }}>Lista de Pacientes</h1>
  
      <div className='pacientes de Get'>
        <ul>
          {Array.isArray(store.user) && store.user.map((item) => (
            <li style={{
              listStyleType: "none",
              padding: "22px 30px",
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
              maxWidth: "100%", 
              width:'550px',       
              margin: "0 auto 15px",  
          }} className="flex gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6 shadow-md"
          key={item.user_id}>
              <div className='d-flex'>
                <div><h3> <i className="fa-solid fa-user mx-3 my-3"></i></h3> </div>
                <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3"><strong>{item.name}</strong></h4>
                <div className="flex text- items-center gap-2 text-sm text-gray-600">
                        <i className="fa-solid fa-envelope text-blue-500"></i>
                        <span>{item.email}</span>
                      </div>                
                </div> 
               {role ==="admin" &&( 
                <div className='mx-2'>   
                  <i className="fa-solid fa-trash" style={{color:'red'}} onClick={() => {
                            if (item.user_id) {
                                deleteUser3(item.user_id);
                            } else {
                                console.error("Error: ID de usuario no definido", item);
                            }
                        }}></i> 
                </div> 
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Pacientes;
