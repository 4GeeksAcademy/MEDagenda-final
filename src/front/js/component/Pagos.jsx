import React, {useState, useContext} from 'react'
import { Context } from '../store/appContext';


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'



const Pagos = () => {
    const {store, actions} = useContext(Context);
    // const {preferenceId, setPreferenceId} = useState(null)
    const { preferenceId } = store;
    
    initMercadoPago('APP_USR-d8201b68-3e98-413d-a445-fd07919fe2c6', { locale: 'es-AR' });

    const handlePayment = async () => {
        const id =  await actions.createPreference();
        if (id) {
          actions.setPreferenceId(id);
        }   
        console.log("ID de la preferencia de pago:", store.paymentPreferenceId);
      };


  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "400px" }}>
        <h1 className="mb-3">Pagos</h1>

        <h3 className="text-primary">Consulta Médica</h3>
        <p className="fs-5 fw-bold">$50</p>

        {/* Espacio adicional para más información */}
        <p className="text-muted">Para agilizar los trámites, le sugerimos hacer un pago anticipado de la consulta médica. También tenemos disponible el pago en ventanilla.</p>

        <button className="btn btn-primary btn-lg mt-3" onClick={handlePayment}>
          Pagar con Mercado Pago
        </button>

        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} className="m-3 " />}
      </div>
    </div>
  )
}

export default Pagos