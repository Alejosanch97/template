import React, { useState, useEffect } from "react";
import "../Styles/home.css"; 

const API_URL = 'https://script.google.com/macros/s/AKfycbyUXFZIu4Qb6ZTtbEH5wcWhaGYZIqn-bjfN_85jhlGwjUt0b_vZJy0ttXvlW2SqdJmrGg/exec';

// Lista base de emojis
const BASE_EMOJIS = [
    "🐶", "🍎", "🚗", "🍕", "🌈", 
    "👀", "🏀", "🌙", "👧", "🍦", 
    "📚", "🎸", "🦋", "🐈", "🍟", 
    "🌻", "🚀", "💎", "🧸", "🔒"
];

export const Home = () => {
    // --- ESTADOS DE CONTROL ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState("table");
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPanicMode, setIsPanicMode] = useState(false);
    const [editId, setEditId] = useState(null);

    // --- ESTADO PARA EMOJIS ALEATORIOS ---
    const [shuffledEmojis, setShuffledEmojis] = useState([]);

    // --- ESTADO DEL FORMULARIO ---
    const [formData, setFormData] = useState({
        servicio: '', usuario: '', contraseña: '', url: '', nota: '', categoria: ''
    });

    // --- ESTADO DEL LOGIN ---
    const [userSequence, setUserSequence] = useState([]);
    const [error, setError] = useState(false);
    const userName = "Valentina Lesmes";
    const correctSequence = ["👀", "👧", "📚", "🐈"];

    // --- FUNCIÓN PARA BARAJAR (Algoritmo Fisher-Yates) ---
    const shuffle = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Al cargar la página por primera vez, barajamos
    useEffect(() => {
        setShuffledEmojis(shuffle(BASE_EMOJIS));
    }, []);

    // --- LÓGICA DE CIERRE DE SESIÓN ---
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserSequence([]); // Limpiamos la secuencia de emojis
        setError(false);
        setView("table");
        setShuffledEmojis(shuffle(BASE_EMOJIS)); // Volvemos a barajar para el próximo intento
    };

    // --- LÓGICA DE API ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setPasswords(data);
        } catch (err) {
            console.error("Error cargando datos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const action = editId ? 'update' : 'create';
        const body = { action, ...formData, rowId: editId };

        try {
            await fetch(API_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(body)
            });
            
            setTimeout(() => {
                resetForm();
                fetchData();
                setView("table");
            }, 1000);
        } catch (err) {
            alert("Error al conectar con la base de datos");
            setLoading(false);
        }
    };

    const handleDelete = async (rowId) => {
        if (!window.confirm("¿Estás segura de eliminar esta contraseña?")) return;
        setLoading(true);
        try {
            await fetch(API_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ action: 'delete', rowId })
            });
            setTimeout(() => fetchData(), 1000);
        } catch (err) {
            setLoading(false);
        }
    };

    // --- FUNCIONES AUXILIARES ---
    const resetForm = () => {
        setFormData({ servicio: '', usuario: '', contraseña: '', url: '', nota: '', categoria: '' });
        setEditId(null);
    };

    const handleEmojiClick = (emoji) => {
        if (userSequence.length < 4) {
            setUserSequence([...userSequence, emoji]);
            setError(false);
        }
    };

    const handleLogin = () => {
        if (JSON.stringify(userSequence) === JSON.stringify(correctSequence)) {
            setIsLoggedIn(true);
            fetchData();
        } else {
            setError(true);
            setUserSequence([]);
            setShuffledEmojis(shuffle(BASE_EMOJIS)); // Si falla, también barajamos
        }
    };

    const startEdit = (item) => {
        setEditId(item.rowId);
        setFormData({
            servicio: item.servicio,
            usuario: item.usuario,
            contraseña: item.contraseña,
            url: item.url,
            nota: item.nota,
            categoria: item.categoria
        });
        setView("form");
    };

    // --- RENDERIZADO ---

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <div className="login-info-side">
                    <div className="brand">
                        <div className="logo-icon">✔</div>
                        <span>Dory Time</span>
                    </div>
                    <div className="info-content">
                        <h1>Hey, Holaaaa! 💙</h1>
                        <p className="subtitle">Bienvenida a tu lugar seguro</p>
                        <p className="description">Aquí vive todo lo importante que a veces se nos olvida 😅</p>
                    </div>
                </div>

                <div className="login-form-side">
                    <div className="login-card">
                        <h2>Acceso Seguro</h2>
                        <div className="user-fixed">
                            <label>Usuario</label>
                            <div className="fixed-input">{userName}</div>
                        </div>
                        <div className="emoji-slots">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className="slot">
                                    {userSequence[i] || ""}
                                </div>
                            ))}
                        </div>
                        <div className="emoji-grid">
                            {shuffledEmojis.map((e, i) => (
                                <button 
                                    key={i} 
                                    className="emoji-btn" 
                                    onClick={() => handleEmojiClick(e)}
                                    disabled={userSequence.length >= 4}
                                >
                                    {e}
                                </button>
                            ))}
                        </div>
                        {error && <p className="error-text">Secuencia incorrecta.</p>}
                        <button className="btn-login" onClick={handleLogin}>Entrar</button>
                        <button className="reset-link" onClick={() => {
                            setUserSequence([]);
                            setShuffledEmojis(shuffle(BASE_EMOJIS)); // También baraja al reiniciar manualmente
                        }}>
                            Reiniciar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dash-header">
                <div>
                    <h1>Mis Contraseñas 🐠</h1>
                    <p>Hola, {userName}</p>
                </div>
                <div className="header-btns">
                    <button 
                        className={`panic-btn ${isPanicMode ? 'active' : ''}`} 
                        onClick={() => setIsPanicMode(!isPanicMode)}
                    >
                        {isPanicMode ? "MOSTRAR DATOS" : "BOTÓN DE PÁNICO 🚨"}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </header>

            {view === "table" ? (
                <div className="table-section">
                    <div className="table-actions">
                        <button className="btn-new" onClick={() => { resetForm(); setView("form"); }}>+ Nueva Contraseña</button>
                    </div>
                    
                    {loading ? <div className="loader">Sincronizando datos...</div> : (
                        <div className="table-responsive">
                            <table className="pass-table">
                                <thead>
                                    <tr>
                                        <th>Servicio</th>
                                        <th>Usuario</th>
                                        <th>Contraseña</th>
                                        <th>Categoría</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwords.map((item) => (
                                        <tr key={item.rowId}>
                                            <td className="bold">{item.servicio}</td>
                                            <td>{isPanicMode ? "********" : item.usuario}</td>
                                            <td>{isPanicMode ? "********" : item.contraseña}</td>
                                            <td><span className="badge">{item.categoria}</span></td>
                                            <td>
                                                <button className="btn-edit" onClick={() => startEdit(item)}>✏️</button>
                                                <button className="btn-delete" onClick={() => handleDelete(item.rowId)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <div className="form-section">
                    <form className="pass-form" onSubmit={handleSave}>
                        <h3>{editId ? "Editar Registro" : "Nuevo Registro"}</h3>
                        <div className="form-grid">
                            <input placeholder="Servicio (ej: Netflix)" value={formData.servicio} onChange={e => setFormData({...formData, servicio: e.target.value})} required />
                            <input placeholder="Usuario" value={formData.usuario} onChange={e => setFormData({...formData, usuario: e.target.value})} required />
                            <input placeholder="Contraseña" value={formData.contraseña} onChange={e => setFormData({...formData, contraseña: e.target.value})} required />
                            <input placeholder="URL" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
                            <input placeholder="Categoría" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} />
                            <textarea placeholder="Notas adicionales" value={formData.nota} onChange={e => setFormData({...formData, nota: e.target.value})} />
                        </div>
                        <div className="form-btns">
                            <button type="submit" className="btn-save" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
                            <button type="button" className="btn-cancel" onClick={() => setView("table")}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};