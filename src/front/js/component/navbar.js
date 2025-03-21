import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const admin = localStorage.getItem('role')
    let user = localStorage.getItem('user')?.role
    let doctor = localStorage.getItem('doctor')?.role;

    const role = admin || doctor || user;

    const navigate = useNavigate();

    const handleLogout = () => {

        actions.logOut();
        navigate("/");
    };



    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundImage: "linear-gradient(to right, #56abf9,rgb(214, 228, 225))", // Color degradado azul-verde
                padding: "1rem",
            }}
        >
            <div className="container-fluid">
                <Link
                    to="/"
                    className="navbar-brand text-decoration-none"
                    style={{
                        color: "#ffffff", // Texto blanco
                        fontSize: "2.5rem", // Tamaño de fuente
                        fontWeight: "open sans", // Fuente negrita
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" fill="currentColor" class="bi bi-hospital" viewBox="0 0 16 16">
                        <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1zM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25z" />
                        <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1zm2 14h2v-3H7zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm0-14H6v1h4zm2 7v7h3V8zm-8 7V8H1v7z" />
                    </svg> NovaMed
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{
                        backgroundColor: "#33d9b2", // Botón verde claro
                        borderColor: "#33d9b2", // Borde verde claro
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <span style={{fontSize:"14px", marginLeft:"100px", color:"white"}}>¡Seguimos cuidando tu salud! Recuerda: el uso de cubrebocas es obligatorio durante tu estancia en el hospital; <br></br> con esto evitamos la propagación de enfermedades respiratorias.</span>  
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                    style={{
                        justifyContent: "flex-end", // Alinear items a la derecha
                    }}
                >
                    <ul className="navbar-nav" style={{ fontSize: "1.3rem" }}>

                        {/* Mostrar opciones de inicio de sesión si no hay usuario autenticado */}
                        {!role && (
                            <>
                                <li className="nav-item">
                                    <Link to="/logInDoc" className="nav-link">LogIn Doctor</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logInAdmin" className="nav-link">LogIn Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">LogIn</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registroPacientes" className="nav-link">Registrate</Link>
                                </li>
                            </>
                        )}

                        {/* Opciones específicas para cada rol */}
                        {role === "doctor" && (

                            <>
                                <li className="nav-item">
                                    <Link to="/editdoc" className="nav-link">Mi Perfil</Link>
                                </li>  {/* ✅ Se cierra correctamente */}

                                <li className="nav-item">
                                    <Link to="/pacientes" className="nav-link">Mis Pacientes</Link>
                                </li>
                            </>

                        )}

                        {role === "admin" && (
                            <>
                                <li className="nav-item">

                                    <Link to="/panel/admin" className="nav-link">Panel Admin</Link>
                                </li>
                                <li>
                                    <Link to="/editadmin" className="nav-link">Mi Perfil</Link>
                                </li>
                                <li>
                                    <Link to="/pacientes" className="nav-link">Mis Pacientes</Link>
                                </li>


                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="specialtiesDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Doctores
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="specialtiesDropdown">
                                        {[
                                            { name: "Medicina General", path: "/medicina-general" },
                                            { name: "Pediatría", path: "/pediatria" },
                                            { name: "Ginecología y Obstetricia", path: "/ginecologia" },
                                            { name: "Cardiología", path: "/cardiologia" },
                                            { name: "Dermatología", path: "/dermatologia" },
                                            { name: "Ortopedia y Traumatología", path: "/ortopedia" },
                                            { name: "Neurología", path: "/neurologia" },
                                            { name: "Oftalmología", path: "/oftalmologia" },
                                            { name: "Otorrinolaringología", path: "/otorrinolaringologia" },
                                            { name: "Endocrinología", path: "/endocrinologia" }
                                        ].map((item, index) => (
                                            <li key={index}>
                                                <Link className="dropdown-item" to={item.path}>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>




                            </>
                        )}

                        {role === "user" && (
                            <>
                                <li className="nav-item">
                                    <Link to="/edituser" className="nav-link">Mi Perfil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/calendar" className="nav-link">Agenda</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="specialtiesDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Especialidades
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="specialtiesDropdown">
                                        {[
                                            { name: "Medicina General", path: "/medicina-general" },
                                            { name: "Pediatría", path: "/pediatria" },
                                            { name: "Ginecología y Obstetricia", path: "/ginecologia" },
                                            { name: "Cardiología", path: "/cardiologia" },
                                            { name: "Dermatología", path: "/dermatologia" },
                                            { name: "Ortopedia y Traumatología", path: "/ortopedia" },
                                            { name: "Neurología", path: "/neurologia" },
                                            { name: "Oftalmología", path: "/oftalmologia" },
                                            { name: "Otorrinolaringología", path: "/otorrinolaringologia" },
                                            { name: "Endocrinología", path: "/endocrinologia" }
                                        ].map((item, index) => (
                                            <li key={index}>
                                                <Link className="dropdown-item" to={item.path}>{item.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </>
                        )}

                        {/* Botón de cerrar sesión (visible solo si hay usuario autenticado) */}
                        {role && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout} style={{ fontSize: "1.3rem" }}>Cerrar Sesión</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};