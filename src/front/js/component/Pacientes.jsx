import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';


const Pacientes = () => {
  const { store, actions } = useContext(Context)
  const [patients, setPatients] = useState([]); // Estado local para manejar la lista de pacientes 


  let admin = (localStorage.getItem('role'))
  let user = JSON.parse(localStorage.getItem('user'))?.role
  let role = admin || user



  const patient = async () => {
    try {
      await actions.pacientesGet()
      setPatients(store.user || []); // Actualiza el estado con los pacientes obtenidos


    } catch (error) {
      console.error("No se llamaron los Pacientes correctamente")
    }
  }

  const deleteUser3 = async (user_id) => {
    if (!user_id || isNaN(user_id)) {  //Comprueba si user_id no es un número válido.
      console.error("Error: ID de usuario inválido", user_id);
      return;
    }

    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (confirmDelete) {
      try {
        await actions.deleteUser2(user_id);
        setPatients(prevPatients => prevPatients.filter(item => item.user_id !== user_id));
      } catch (error) {
        console.error("No se pudo eliminar el usuario correctamente", error);
      }
    }
  };
  useEffect(() => {
    patient()
  }, [store.users])


  return (
    <div className='vh-100' >
      <h1 style={{
        fontSize: "24px",
        fontWeight: "bold",
        fontFamily: "Montserrat, sans-serif",
        color: "#FFFFFF",
        marginBottom: "10px",
        textAlign: "center",
        textShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        background: "linear-gradient(to right,rgba(69, 103, 183, 0.4) ,rgb(3, 32, 87) )",
        backgroundSize: "100% 100%",
        padding: "10px",
        borderRadius: "0px",
      }}>Lista de Pacientes</h1>

      <div className='pacientes de Get'>
        <ul>
          {/* store.user && store.user.map se usta este metodo y no otro para decirle quye si no es un array aun no pasa nada pero si es un array que mapee*/}
          {Array.isArray(store.user) && store.user.map((item) => (

            <li style={{
              listStyleType: "none",
              padding: "22px 30px",  // Aumentado el padding horizontal y vertical
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "15px",
              background: "linear-gradient(to right,rgb(59, 170, 221),rgba(8, 18, 65, 0.28))",
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
              width: '550px',
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
                background: "linear-gradient(to right,rgb(6, 55, 78),rgba(6, 181, 212, 0.4),rgb(204, 236, 233))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                zIndex: "-1"
              }
            }}
              className="flex gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6 shadow-md"
              key={item.user_id}>
              <div className='d-flex'>
                {/* <div><h3> <i className="fa-solid fa-user mx-3 my-3"></i></h3> </div> */}

                <div >
                  <h4 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                  <i className="fa-solid fa-user mx-3 my-3"></i> <strong>{item.name}</strong> 
                  </h4>
                  <div className="flex text- items-center gap-1 text-sm text-gray-600">
                    <i className="fa-solid fa-envelope text-blue-500 me-2"></i>
                    <span>{item.email}</span>
                  </div>
                </div>

                {role === "admin" && (

                  <div className='mx-2'>

                    <i className="fa-solid fa-trash" style={{ color: 'red' }} onClick={() => {
                      if (item.user_id) {
                        deleteUser3(item.user_id);
                      } else {
                        console.error("Error: ID de usuario no definido", item);
                      }
                    }}

                    ></i>

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