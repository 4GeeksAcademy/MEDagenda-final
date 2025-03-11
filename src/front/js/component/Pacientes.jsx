import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

const data = [
  { id: 1, name: 'Helen V.', email: 'helen@v.com' },
  { id: 2, name: 'David C.', email: 'david@c.com' },
  { id: 3, name: 'Peter B. Parker', email: 'peter@p.com' },
];

const Pacientes = () => {
  const { store, actions } = useContext(Context) 
  const [patients, setPatients] = useState([]); // Estado local para manejar la lista de pacientes


  const patient = async () => {
    try {
      await actions.pacientesGet() 
      setPatients(store.user || []); // Actualiza el estado con los pacientes obtenidos


    } catch (error) {
      console.error("No se llamaron los Pacientes correctamente")
    }
  } 

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    
    if (confirmDelete) {
      try {
        await actions.deleteUser(id);
        setPatients(prevPatients => prevPatients.filter(item => item.id !== id)); // Actualiza el estado eliminando el usuario
      } catch (error) {
        console.error("No se pudo eliminar el usuario correctamente", error);
      }
    }
  };
  useEffect(() => {
    patient()
  }, [store.user])


  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <ul>
        {data.map((paciente) => (
          <li className='card card-body my-3' key={paciente.id}>
            <div className='d-flex'>
            <div><h3> <i className="fa-solid fa-user mx-3 my-3"></i></h3> </div>

              <div>
                <h5>{paciente.name}</h5> {paciente.email}
              </div> 
              <div>  <i class="fa-solid fa-trash"></i></div>
            </div> </li>
        ))}
      </ul>
      <div className='pacientes de Get'>
        <ul>
          {/* store.user && store.user.map se usta este metodo y no otro para decirle quye si no es un array aun no pasa nada pero si es un array que mapee*/}
          {Array.isArray(store.user) && store.user.map((item) => (

            <li className='card card-body my-3 ' key={item.id}>
              <div className='d-flex'>
                <div><h3> <i className="fa-solid fa-user mx-3 my-3"></i></h3> </div>
                <div >
                  <h5>{item.name}</h5>
                  {item.email} 
                
                </div> 
                <div className='mx-2'>  <i class="fa-solid fa-trash" onClick={()=> deleteUser(item.id)} ></i></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
export default Pacientes;