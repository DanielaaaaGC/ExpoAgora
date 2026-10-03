import React, { useEffect, useState } from "react";
import "./carrusel.css";

import imagen1 from "../assets/1.jpg";
import imagen2 from "../assets/2.jpg";
import imagen3 from "../assets/3.jpg";
import imagen4 from "../assets/4.jpg";

const slides = [
  {
    imagen: imagen1,
    etiqueta: "Bienvenidos a Ágora",
    titulo: "Entender para participar.",
    texto:
      "Ágora es un espacio educativo creado para acercar la política a las personas jóvenes, fomentando la información, el diálogo y la participación activa en la sociedad."
  },
  {
    imagen: imagen2,
    etiqueta: "Nuestro propósito",
    titulo: "¿Qué buscamos hacer?",
    texto:
      "Buscamos formar una comunidad crítica, informada y comprometida, brindando herramientas claras y accesibles para comprender cómo funciona nuestro sistema político."
  },
  {
    imagen: imagen3,
    etiqueta: "Aprende con Ágora",
    titulo: "¿Qué vas a aprender?",
    texto:
      "Aprenderás sobre instituciones, procesos políticos, derechos ciudadanos y las diferentes formas en las que puedes participar y hacer escuchar tu voz."
  },
  {
    imagen: imagen4,
    etiqueta: "La importancia de participar",
    titulo: "¿Por qué esto es importante?",
    texto:
      "Una democracia necesita personas informadas y participativas. Comprender la política es el primer paso para tomar mejores decisiones y transformar nuestra realidad."
  }
];

function Carrusel() {
  const [actual, setActual] = useState(0);

  // Cambiar automáticamente cada 6 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(intervalo);
  }, []);

  const siguiente = () => {
    setActual((prev) => (prev + 1) % slides.length);
  };

  const anterior = () => {
    setActual((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero">

      {/* IMAGEN */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${slides[actual].imagen})`
        }}
      ></div>

      {/* FILTRO */}
      <div className="hero-overlay"></div>

      {/* CONTENIDO */}
      <div className="hero-content">

        <div className="hero-text" key={actual}>

          <span className="hero-label">
            {slides[actual].etiqueta}
          </span>

          <h1>
            {slides[actual].titulo}
          </h1>

          <p>
            {slides[actual].texto}
          </p>

          <button className="hero-button">
            Conoce más
          </button>

        </div>

      </div>

      {/* FLECHA IZQUIERDA */}
      <button
        className="hero-arrow hero-arrow-left"
        onClick={anterior}
        aria-label="Imagen anterior"
      >
        ‹
      </button>

      {/* FLECHA DERECHA */}
      <button
        className="hero-arrow hero-arrow-right"
        onClick={siguiente}
        aria-label="Imagen siguiente"
      >
        ›
      </button>

      {/* INDICADORES */}
      <div className="hero-dots">

        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${
              actual === index ? "active" : ""
            }`}
            onClick={() => setActual(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          ></button>
        ))}

      </div>

    </section>
  );
}

export default Carrusel;