import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import agorita from "../assets/agorita.png";

function Login() {
    const navigate = useNavigate();

    const [modo, setModo] = useState("login");

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("");

    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);

        setError("");
        setMensaje("");

        setNombre("");
        setApellido("");
        setCorreo("");
        setContrasena("");
        setRol("");
    };

    const handleRegistro = async (e) => {
        e.preventDefault();

        setError("");
        setMensaje("");

        if (
            !nombre.trim() ||
            !apellido.trim() ||
            !correo.trim() ||
            !contrasena.trim() ||
            !rol
        ) {
            setError("Por favor completa todos los campos.");
            return;
        }

        if (contrasena.length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres."
            );
            return;
        }

        if (rol !== "estudiante" && rol !== "profesor") {
            setError("Selecciona un rol válido.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/usuarios",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre.trim(),
                        apellido: apellido.trim(),
                        correo: correo.trim(),
                        contrasena,
                        rol,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.mensaje ||
                    "No se pudo crear la cuenta."
                );
            }

            setMensaje("¡Cuenta creada correctamente!");

            setTimeout(() => {
                if (rol === "estudiante") {
                    navigate("/indexestudiante");
                } else if (rol === "profesor") {
                    navigate("/profesor");
                } else {
                    navigate("/");
                }
            }, 1000);

        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "No se pudo conectar con el servidor."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setMensaje("");

        if (!correo.trim() || !contrasena.trim()) {
            setError(
                "Ingresa tu correo y contraseña."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        correo: correo.trim(),
                        contrasena,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.mensaje ||
                    "Correo o contraseña incorrectos."
                );
            }

            localStorage.setItem(
                "usuario",
                JSON.stringify(data.usuario)
            );

            if (data.usuario.rol === "estudiante") {
                navigate("/indexestudiante");
            } else if (data.usuario.rol === "profesor") {
                navigate("/profesor");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.error(err);

            setError(
                err.message ||
                "No se pudo iniciar sesión."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleGuest = () => {
        navigate("/");
    };

    return (
        <main className="login-page">

            <div className="login-card">

                <section className="welcome-panel">

                    <div className="welcome-content">

                        <h1>
                            Bienvenid@
                            <br />
                            <span>a Ágora</span>
                        </h1>

                        <div className="welcome-line"></div>

                        <p className="welcome-description">
                            ¡Aquí aprenderás sobre política y democracia, además podrás participar directamente en los procesos democráticos del colegio!
                        </p>

                        <div className="mascot-wrapper">

                            <div className="mascot-circle"></div>

                            <img
                                src={agorita}
                                alt="Agorita, mascota de Ágora"
                                className="agorita"
                            />

                        </div>

                    </div>

                </section>

                <section className="login-panel">

                    <div className="login-content">

                        <div className="auth-tabs">

                            <button
                                type="button"
                                className={
                                    modo === "login"
                                        ? "auth-tab active"
                                        : "auth-tab"
                                }
                                onClick={() =>
                                    cambiarModo("login")
                                }
                            >
                                Iniciar sesión
                            </button>

                            <button
                                type="button"
                                className={
                                    modo === "registro"
                                        ? "auth-tab active"
                                        : "auth-tab"
                                }
                                onClick={() =>
                                    cambiarModo("registro")
                                }
                            >
                                Crear cuenta
                            </button>

                        </div>

                        <div className="login-header">

                            <h2>
                                {modo === "login"
                                    ? "Iniciar sesión"
                                    : "Crear cuenta"
                                }
                            </h2>

                            <p>
                                {modo === "login"
                                    ? "Ingresa a tu cuenta para continuar"
                                    : "Regístrate para comenzar a utilizar Ágora"
                                }
                            </p>

                        </div>

                        <form
                            onSubmit={
                                modo === "login"
                                    ? handleLogin
                                    : handleRegistro
                            }
                        >

                            {modo === "registro" && (
                                <div className="form-group">

                                    <label htmlFor="nombre">
                                        Nombre
                                    </label>

                                    <div className="input-container">

                                        <input
                                            id="nombre"
                                            type="text"
                                            placeholder="Ingresa tu nombre"
                                            value={nombre}
                                            onChange={(e) =>
                                                setNombre(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>
                            )}

                            {modo === "registro" && (
                                <div className="form-group">

                                    <label htmlFor="apellido">
                                        Apellido
                                    </label>

                                    <div className="input-container">

                                        <input
                                            id="apellido"
                                            type="text"
                                            placeholder="Ingresa tu apellido"
                                            value={apellido}
                                            onChange={(e) =>
                                                setApellido(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>
                            )}

                            <div className="form-group">

                                <label htmlFor="correo">
                                    Correo electrónico
                                </label>

                                <div className="input-container">

                                    <input
                                        id="correo"
                                        type="email"
                                        placeholder="tu.correo@ejemplo.com"
                                        value={correo}
                                        onChange={(e) =>
                                            setCorreo(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label htmlFor="contrasena">
                                    Contraseña
                                </label>

                                <div className="input-container">

                                    <input
                                        id="contrasena"
                                        type={
                                            mostrarContrasena
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Ingresa tu contraseña"
                                        value={contrasena}
                                        onChange={(e) =>
                                            setContrasena(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="show-password"
                                        onClick={() =>
                                            setMostrarContrasena(
                                                !mostrarContrasena
                                            )
                                        }
                                    >
                                        {mostrarContrasena ? "." : "👁"}
                                    </button>

                                </div>

                            </div>

                            {modo === "registro" && (
                                <div className="form-group">

                                    <label htmlFor="rol">
                                        Rol
                                    </label>

                                    <div className="input-container">

                                        <select
                                            id="rol"
                                            value={rol}
                                            onChange={(e) =>
                                                setRol(e.target.value)
                                            }
                                        >

                                            <option value="">
                                                Selecciona tu rol
                                            </option>

                                            <option value="estudiante">
                                                Estudiante
                                            </option>

                                            <option value="profesor">
                                                Profesor
                                            </option>

                                        </select>

                                    </div>

                                </div>
                            )}

                            {modo === "login" && (
                                <div className="password-options">

                                    <button
                                        type="button"
                                        className="forgot-password"
                                        onClick={() =>
                                            alert(
                                                "La recuperación de contraseña estará disponible próximamente."
                                            )
                                        }
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>

                                </div>
                            )}

                            {error && (
                                <div className="login-error">
                                    {error}
                                </div>
                            )}

                            {mensaje && (
                                <div className="login-success">
                                    {mensaje}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="spinner"></span>

                                        {modo === "login"
                                            ? "Iniciando sesión..."
                                            : "Creando cuenta..."
                                        }
                                    </>
                                ) : (
                                    <>
                                        {modo === "login"
                                            ? "Iniciar sesión"
                                            : "Crear cuenta"
                                        }

                                        <span className="arrow">
                                            →
                                        </span>
                                    </>
                                )}

                            </button>

                        </form>

                        <div className="guest-container">

                            <div className="separator">
                                <span></span>
                                <p>o</p>
                                <span></span>
                            </div>

                            <button
                                type="button"
                                className="guest-button"
                                onClick={handleGuest}
                            >
                                Continuar como invitado
                            </button>

                        </div>

                        <div className="login-footer">

                            <span>Ágora</span>

                            <span>•</span>

                            <span>
                                Aprende · Participa · Decide
                            </span>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default Login;