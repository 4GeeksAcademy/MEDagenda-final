import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { FaTrashAlt } from 'react-icons/fa';
import styles from '../../styles/PreguntasFrecuentes.module.css';

const PreguntasFrecuentes = () => {
  const { store, actions } = useContext(Context);
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [respuestasInputs, setRespuestasInputs] = useState({});
  const admin = localStorage.getItem('role');
  const role = admin

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

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [store.faqs]);


  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Foro de Preguntas Frecuentes</h1>
      <section className={styles.section}>
        <input
          className={styles.input}
          value={nuevaPregunta}
          onChange={(e) => setNuevaPregunta(e.target.value)}
          placeholder="Haz una nueva pregunta..."
        />
        <button
          className={styles.addButton}
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
              {role === "admin" && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleBorrarPregunta(index)}
                  title="Eliminar pregunta"
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
            {faq.respuesta && <p className={styles.answerText}>{faq.respuesta}</p>}
            <div className={styles.responseInputRow}>
              <input
                className={styles.input}
                value={respuestasInputs[index] || ''}
                onChange={(e) =>
                  setRespuestasInputs({ ...respuestasInputs, [index]: e.target.value })
                }
                placeholder="Responde esta pregunta..."
              />
              <button
                className={styles.addButton}
                onClick={() => handleAgregarRespuesta(index)}
              >
                Agregar Respuesta
              </button>
            </div>
            {faq.respuestas && faq.respuestas.length > 0 && (
              <div className={styles.responsesContainer}>
                <h3 className={styles.responsesHeader}>Respuestas:</h3>
                {faq.respuestas.map((respuesta, i) => (
                  <div key={i} className={styles.responseRow}>
                    <p className={styles.responseText}>- {respuesta}</p>
                    {role === "admin" && (
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleBorrarPregunta(index)}
                        title="Eliminar pregunta"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
      <div style={{height: "25vh"}}>
            </div>
    </div>
  );
};

export default PreguntasFrecuentes;
