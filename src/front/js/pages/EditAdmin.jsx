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
    <div style={{paddingTop:'10px'}}>
      {
        name ? (
          <>
            <div className='card card-body' style={{
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
                        }}>
              <h2><strong>Mi Perfil</strong></h2>
              <p className='name'>
              👤 User: {isEditing ? <input type='text' name='name' value={adminData.name} onChange={handleChange} /> : name}
              </p>
              <p className='email'>
              📧  Email: {isEditing ? <input type='email' name='email' value={adminData.email} onChange={handleChange} /> : email}
              </p>
              {/* <p className='password'>
                Password: {isEditing && <input type='password' name='password' value={adminData.password} onChange={handleChange} />}
              </p> */}

              {isEditing ? (
                <>
                  <button className='btn btn-primary btn-lg w-40'  onClick={handleSave}>Guardar</button>
                  <button className='btn btn-secondary btn-lg' style={{marginTop:'5px'}} onClick={handleEdit}>Cancelar</button>
                </>

              ) : (
                <button
                style={{
                  background: "linear-gradient(to right, rgb(57, 78, 237), rgb(136, 225, 255))",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  transition: "0.3s ease-in-out"
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "linear-gradient(to right, rgb(32, 55, 182), rgb(130, 195, 224))") // Más intenso al pasar el mouse
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "linear-gradient(to right, rgb(57, 78, 237), rgb(136, 225, 255))") // Vuelve al normal
                }
                onClick={handleEdit}
                type="submit"
              >
                ✏️ Edit User
              </button>


              )}


<button
  className="btn btn-lg my-2"
  style={{
    background: "linear-gradient(to right, rgb(233, 29, 29), rgb(230, 175, 175))",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.3s ease-in-out"
  }}
  onMouseEnter={(e) =>
    (e.target.style.background = "linear-gradient(to right, rgb(172, 5, 5), rgb(240, 108, 108))") // Más intenso al pasar el mouse
  }
  onMouseLeave={(e) =>
    (e.target.style.background = "linear-gradient(to right, rgb(233, 29, 29), rgb(230, 175, 175))") // Vuelve al normal
  }
  onClick={deleteUs}
  type="submit"
>
  🗑️ Delete User
</button>
            </div>
          </>) : (
          <p>no funciono.......</p>
        )}
    </div>
  )
}

export default EditAdmin          