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
    <div>
      <h1>Lista de Pacientes</h1>
  
      <div className='pacientes de Get'>
        <ul>
          {/* store.user && store.user.map se usta este metodo y no otro para decirle quye si no es un array aun no pasa nada pero si es un array que mapee*/}
          {Array.isArray(store.user) && store.user.map((item) => (

            <li className='card card-body my-3 ' key={item.user_id}>
              <div className='d-flex'>
                <div><h3> <i className="fa-solid fa-user mx-3 my-3"></i></h3> </div>
                
                <div >
                  <h5>{item.name}</h5>
                  {item.email} 
                
                </div> 
               
               {role ==="admin" &&( 
                
                <div className='mx-2'>   
                  
                  <i className="fa-solid fa-trash" style={{color:'red'}} onClick={() => {
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