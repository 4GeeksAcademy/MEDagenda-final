import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const EditAdmin = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: store.admin?.name || '',
    email: store.admin?.email || '',
    password: store.admin?.password || ''
  })

 
  const handleEdit = () => setIsEditing(!isEditing)

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value })
  }


  const handleSave = async () => {
    try {
      if (adminData.password.trim() == '') {
        delete adminData.password
      }
      await actions.editAdmin(adminData, store.admin?.id || localStorage.getItem('id'))
      setIsEditing(false)


    } catch (error) {
      console.error("No se edito correctamente", error)
    }
  }

  const deleteUs = async () => {
    const idAdmin = store.admin?.id || localStorage.getItem('id'); // Obtiene ID desde store o localStorage
    const confirmDelete = window.confirm("La cuenta se eliminara permanentemente estas seguro?")

    if (confirmDelete) {
      try {
        await actions.deleteAdmin(idAdmin)
        navigate('/')
      } catch (error) {
        console.error("No se elimino Correctamente", error)

      }
    } else {
      console.log("Eliminacion de Cuenta Cancelada")

    }
  } 
  const handleLogout = () => {

    actions.logOut();
    navigate("/");
};
  useEffect(() => {
    if (store.admin) {
      setAdminData({
        name: store.admin.name || '',
        email: store.admin.email || '',
        password: store.admin.password || ''
      });
    }
  }, [store.admin]);

  let name = store.admin?.name || localStorage.getItem('name');
  let email = store.admin?.email || localStorage.getItem('email');

  return (
    <div>
      <i className="fa-solid fa-user"></i><h3>Mi Perfil</h3>
      {
        name ? (
          <>
            <div className='card card-body'>
              <h2>Mi Perfil</h2>
              <h2> <i className="fa-solid fa-user"></i> </h2>
              <p className='name'>
                User: {isEditing ? <input type='text' name='name' value={adminData.name} onChange={handleChange} /> : name}
              </p>
              <p className='email'>
                Email: {isEditing ? <input type='email' name='email' value={adminData.email} onChange={handleChange} /> : email}
              </p>
              <p className='password'>
                Password: {isEditing && <input type='password' name='password' value={adminData.password} onChange={handleChange} />}
              </p>

              {isEditing ? (
                <>
                  <button className='btn btn-primary btn-lg w-40 ' style={{ width: "50%" }} onClick={handleSave}>Guardar</button>
                  <button className='btn btn-secondary btn-lg' onClick={handleEdit}>Cancelar</button>
                </>

              ) : (
                <button className='btn btn-lg btn-primary' onClick={handleEdit} type="submit">Edit User</button>


              )}


              <button className='btn-danger btn-lg my-2' onClick={deleteUs} type="submit">Delete User</button> 
              <button className='btn-warning btn-lg my-2' onClick={handleLogout} type="submit">LogOut</button>

            </div>
          </>) : (
          <p>no funciono.......</p>
        )}
    </div>
  )
}

export default EditAdmin          