import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logoA from "../assets/logoA.png";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-brand">
        <img
          src={logoA}
          alt="Logo de Ágora"
          className="navbar-logo"
        />

        <span className="navbar-title">
          Ágora
        </span>
      </div>

      {/* Acciones */}
      <div className="navbar-actions">

        <Link
          to="/login"
          className="navbar-link login-link"
        >
          <span>Iniciar sesión</span>
        </Link>

        <Link
          to="/login"
          className="navbar-link navbar-enter"
        >
          Entrar
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;

