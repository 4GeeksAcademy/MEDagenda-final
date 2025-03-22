import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import styles from '../../styles/PreguntasFrecuentes.module.css';

const PreguntasFrecuentes = () => {
  const { store, actions } = useContext(Context);
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [respuestasInputs, setRespuestasInputs] = useState({});

  const handleAgregarPregunta = () => {
    if (nuevaPregunta.trim() === '') return;
    actions.agregarPregunta(nuevaPregunta);
    setNuevaPregunta('');
  };

  const handleAgregarRespuesta = (index) => {
    const respuesta = respuestasInputs[index];
    if (!respuesta || respuesta.trim() === '') return;
    actions.agregarRespuesta(index, respuesta);
    setRespuestasInputs((prev) => ({ ...prev, [index]: '' }));
  };

  const handleBorrarPregunta = (index) => {
    actions.borrarPregunta(index);
  };

  const handleBorrarRespuesta = (preguntaIndex, respuestaIndex) => {
    actions.borrarRespuesta(preguntaIndex, respuestaIndex);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Foro de Preguntas Frecuentes</h1>
      <section>
        <input 
          className={styles.input}
          value={nuevaPregunta} 
          onChange={(e) => setNuevaPregunta(e.target.value)} 
          placeholder="Haz una nueva pregunta..." 
        />
        <button 
          className={styles.button}
          onClick={handleAgregarPregunta}
        >
          Agregar Pregunta
        </button>
      </section>
      <section>
        {store.faqs && store.faqs.map((faq, index) => (
          <article key={index} className={styles.card}>
            <div className={styles.questionRow}>
              <h2 className={styles.questionTitle}>{faq.pregunta}</h2>
              <button 
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleBorrarPregunta(index)}
              >
                Borrar Pregunta
              </button>
            </div>
            {faq.respuesta && <p className={styles.answerText}>{faq.respuesta}</p>}
            <div>
              <input 
                className={styles.input}
                value={respuestasInputs[index] || ''}
                onChange={(e) => 
                  setRespuestasInputs({ ...respuestasInputs, [index]: e.target.value })
                } 
                placeholder="Responde esta pregunta..." 
              />
              <button 
                className={styles.button}
                onClick={() => handleAgregarRespuesta(index)}
              >
                Agregar Respuesta
              </button>
            </div>
            {faq.respuestas && faq.respuestas.length > 0 && (
              <div>
                <h3 className={styles.responsesHeader}>Respuestas:</h3>
                {faq.respuestas.map((respuesta, i) => (
                  <div key={i} className={styles.responseRow}>
                    <p className={styles.responseText}>- {respuesta}</p>
                    <button 
                      className={`${styles.button} ${styles.deleteButton}`}
                      onClick={() => handleBorrarRespuesta(index, i)}
                    >
                      Borrar Respuesta
                    </button>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};

export default PreguntasFrecuentes;
