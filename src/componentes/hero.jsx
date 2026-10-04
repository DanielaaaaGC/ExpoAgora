import React from "react";
import agoritaImg from "../assets/agorita.png";
import "./hero.css";

import {
  IconRecursos,
  IconPartidos,
  IconVotaciones,
} from "../assets/icons/Icon"

const puntos = [
  {
    icon: IconRecursos,
    titulo: "Información clara",
    texto: "Conoce propuestas y trayectorias",
  },
  {
    icon: IconPartidos,
    titulo: "Partidos políticos",
    texto: "Descubre quiénes son y qué proponen",
  },
  {
    icon: IconVotaciones,
    titulo: "Simulacro de voto",
    texto: "Practica tu voto paso a paso",
  },
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Fondos Decorativos */}
      <div className="hero-bg-layer">
        <div className="blob blob-lila" />
        <div className="blob blob-azul" />
        <div className="blob blob-celeste" />
      </div>

      {/* Contenido Principal */}
      <div className="hero-container">
        {/* Columna Izquierda */}
        <div className="hero-left">
          <span className="badge">
            Aprende sobre democracia divirtiendote
          </span>

          <h1 className="hero-title">
            Bienvenid@ a
        <br />
            <span className="hero-title-highlight">Ágora</span>
            </h1>
          <p className="hero-desc">
            ¡Conoce los candidatos, los partidos, practica tu voto, comparte tus opiniones y aprende!
          </p>

          {/* Botones */}
          <div className="hero-actions">
            <a href="#practica" className="btn btn-primary">
              Conoce los partidos
            </a>
            <a href="#modulos" className="btn btn-secondary">
              Ver módulos educaativos
            </a>
          </div>

          {/* Puntos Informativos */}
          <div className="features-grid">
            {puntos.map(({ icon: IconComponent, titulo, texto }) => (
              <div key={titulo} className="feature-item">
                <div className="feature-icon">
                  <IconComponent size={22} />
                </div>
                <div>
                  <p className="feature-title">{titulo}</p>
                  <p className="feature-text">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="hero-right">
          <div className="avatar-bg-wrapper">
            <div className="avatar-blob" />
          </div>

          <img
            src={agoritaImg}
            alt="Agorita, asistente virtual de Ágora"
            className="hero-avatar"
          />
        </div>
      </div>
    </section>
  );
}