import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const admin = localStorage.getItem('role');
    let user = localStorage.getItem('user')?.role;
    let doctor = localStorage.getItem('doctor')?.role;
    const role = admin || doctor || user;
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logOut();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-lg"
            style={{
                background: "linear-gradient(135deg,rgb(5, 3, 114), #2196F3)", 
                padding: "1rem",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)"
            }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white fw-bold" style={{ fontSize: "2rem", fontFamily: "Open Sans, sans-serif" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" fill="currentColor" className="bi bi-hospital" viewBox="0 0 16 16">
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
                        backgroundColor: "#2196F3",
                        borderColor: "#2196F3"
                    }}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav" style={{ fontSize: "1.2rem" }}>
                        {!role && (
                            <>
                                <li className="nav-item">
                                    <Link to="/logInDoc" className="nav-link text-white">👨‍⚕️ <strong> LogIn Doctor </strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logInAdmin" className="nav-link text-white">🛠️ <strong>LogIn Admin</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link text-white">🔑 <strong>LogIn</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registroPacientes" className="nav-link text-white">📝 <strong>Registrate</strong></Link>
                                </li>
                            </>
                        )}

                        {role === "doctor" && (
                            <>
                                <li className="nav-item">
                                    <Link to="/editdoc" className="nav-link text-white">💼 <strong>Mi Perfil</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/calendar" className="nav-link text-white">📅 <strong>Agenda</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pacientes" className="nav-link text-white">🩺 <strong>pacientes</strong></Link>
                                </li>
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <li className="nav-item">
                                    <Link to="/panel/admin" className="nav-link text-white">🖥️ <strong>Panel Admin</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/editadmin" className="nav-link text-white">⚙️ <strong>Mi Perfil</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/pacientes" className="nav-link text-white">🩺 <strong>Mis Pacientes</strong></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link text-white nav-link dropdown-toggle" 
                                        href="#"
                                        id="specialtiesDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        
                                    >
                                       🩺 <strong>Especialides</strong>
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
                                    <Link to="/edituser" className="nav-link text-white">👤 <strong>Mi Perfil</strong></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/calendar" className="nav-link text-white">🗓️ <strong>Agenda</strong></Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link text-white nav-link dropdown-toggle" 
                                        href="#"
                                        id="specialtiesDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        
                                    >
                                       🩺 <strong>Especialides</strong>
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

                        {role && (
                            <li className="nav-item">
                                <button className="nav-link text-white" onClick={handleLogout} style={{ backgroundColor: "transparent", border: "none" }}>
                                    🚪 <strong>Cerrar Sesión</strong>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
