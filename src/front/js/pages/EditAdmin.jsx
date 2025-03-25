import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: store.admin?.name || '',
    email: store.admin?.email || '',
    password: store.admin?.password || ''
  });

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (adminData.password.trim() === '') {
        delete adminData.password;
      }
      await actions.editAdmin(adminData, store.admin?.id || localStorage.getItem('id'));
      setIsEditing(false);
      swal("Guardado", "Los cambios se guardaron correctamente", "success");
    } catch (error) {
      console.error("No se editó correctamente", error);
      swal("Error", "No se pudo guardar los cambios", "error");
    }
  };

  const deleteUs = async () => {
    const idAdmin = store.admin?.id || localStorage.getItem('id');
    const confirmDelete = await swal({
      title: "¿Estás seguro?",
      text: "La cuenta se eliminará permanentemente",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        await actions.deleteAdmin(idAdmin);
        handleLogout();
        swal("Eliminado", "Tu cuenta ha sido eliminada", "success");
      } catch (error) {
        console.error("No se eliminó correctamente", error);
        swal("Error", "No se pudo eliminar la cuenta", "error");
      }
    }
  };

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
    <div style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }}>
      {name ? (
        <div className='card card-body' style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          padding: "20px",
          textAlign: "center",
          background: "linear-gradient(to right,rgb(29, 168, 233),rgb(175, 230, 219))",
          borderRadius: "20px",
          boxShadow: "0px 4px 15px rgba(0,123,255,0.2)",
          fontFamily: "'Quicksand', sans-serif",
          fontSize: "17px",
          fontWeight: "500",
          color: "#2c3e50",
          width: "40%",
          minWidth: "350px",
          maxWidth: "500px",
          margin: "0 auto",
          marginBottom: "190px"
        }}>
          <div style={{ flex: 1, textAlign: "left" }}>
            <h2><strong>Mi Perfil</strong></h2>
            <p className='name'>
              👤 <strong>User: </strong>
              {isEditing ? <input type='text' name='name' value={adminData.name} onChange={handleChange} /> : name}
            </p>
            <p className='email'>
              📧 <strong>Email: </strong>
              {isEditing ? <input type='email' name='email' value={adminData.email} onChange={handleChange} /> : email}
            </p>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
            {isEditing ? (
              <>
                <button className='btn btn-primary' style={{ width: "150px" }} onClick={handleSave}>Guardar</button>
                <button className='btn btn-secondary' style={{ width: "150px" }} onClick={handleEdit}>Cancelar</button>
              </>
            ) : (
              <button className='btn btn-primary' style={{ width: "150px" }} onClick={handleEdit}>✏️ Edit User</button>
            )}
            <button className='btn btn-danger' style={{ width: "150px" }} onClick={deleteUs}>🗑️ Delete User</button>
          </div>
        </div>
      ) : (
        <p>No funcionó...</p>
      )}
    </div>
  );
};

export default EditAdmin;
