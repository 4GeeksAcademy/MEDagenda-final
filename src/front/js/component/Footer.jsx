import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-black text-white py-4" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>MEDagenda</h5>
            <p>
              Dirección: Calle Ejemplo 123, Ciudad, País
              <br />
              Teléfono: (123) 456-7890
              <br />
              Email: contacto@medagenda.com
            </p>
          </div>
          <div className="col-md-6 text-md-right">
            <h5>Redes Sociales</h5>
            <a href="https://www.facebook.com/medagenda" className="text-white mr-3" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a><br />
            <a href="https://www.twitter.com" className="text-white mr-3" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a><br />
            <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://medicasur.com.mx/es/ms/Preguntas_Frecuentes_Asistencia" className="text-white" target="_blank" rel="noopener noreferrer">
            <i className="fa-regular fa-thought-bubble"></i> FAQs
                </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <small>&copy; {new Date().getFullYear()} MEDagenda. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
};

export default Footer;