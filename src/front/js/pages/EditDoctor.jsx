import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const EditDoctor = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [docData, setDocData] = useState({
        name: store.doctor?.name || '',
        email: store.doctor?.email || '',
        password: store.doctor?.password || '',
    })




    const handleEdit = () => setIsEditing(!isEditing)

    const handleChange = (e) => {
        setDocData({ ...docData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            if (docData.password.trim() == '') {
                delete docData.password
            }
            await actions.editDoctor(docData, store.doctor?.id || localStorage.getItem('id'))
            setIsEditing(false)


        } catch (error) {
            console.error("No se edito correctamente", error)
        }
    }

    const deleteUs = async () => {
        const idDoc = store.doctor?.id || localStorage.getItem('id'); // Obtiene ID desde store o localStorage
        const confirmDelete = window.confirm("La cuenta se eliminara permanentemente estas seguro?")

        if (confirmDelete) {
            try {
                await actions.deleteDoctor(idDoc)
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
        if (store.doctor) {
            setDocData({
                name: store.doctor.name || '',
                email: store.doctor.email || '',
                password: store.doctor.password || ''
            });
        }
    }, [store.doctor]);

    let name = store.doctor?.name || localStorage.getItem('name');
    let email = store.doctor?.email || localStorage.getItem('email');

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
                    width: "40%", // Reduce el ancho de la tarjeta
                    minWidth: "350px", // Evita que sea demasiado pequeña
                    maxWidth: "450px",
                    margin: "0 auto",
                    marginBottom:"190px"

                }}>
                    {/* Columna de Información */}
                    <div style={{ flex: 1, textAlign: "left" }}>
                        <h2><strong>Mi Perfil</strong></h2>
                        <p className='name'>
                            👤 <strong>User: </strong>
                            {isEditing ? <input type='text' name='name' value={docData.name} onChange={handleChange} /> : name}
                        </p>
                        <p className='email'>
                            📧 <strong>Email: </strong>
                            {isEditing ? <input type='email' name='email' value={docData.email} onChange={handleChange} /> : email}
                        </p>
                    </div>
    
                    {/* Columna de Botones */}
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
    
                        {/* <button className='btn btn-danger' style={{ width: "150px" }} onClick={deleteUs}>🗑️ Delete User</button> */}
                    </div>
                </div>
            ) : (
                <p>No funcionó...</p>
            )}
        </div>
    );
    
};

export default EditDoctor;