import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../Styles/home.css";
import logoAtlas from "../assets/img/logo6.png";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// ESTO ES VITAL: Registra los componentes para que Chart.js funcione en React
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Componente de Video Optimizado
const FadingVideo = ({ src, className }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            muted autoPlay loop playsInline
            className={className}
        />
    );
};

// Configuración de la gráfica de la Auditoría Directiva
const directivosChartData = {
    labels: ['Política IA', 'Monitoreo', 'Ética', 'Presupuesto', 'Supervisión', 'Riesgo'],
    datasets: [
        {
            label: 'Nivel de Ejecución',
            data: [7, 1, 3, 4, 2, 2], // Datos reales de tu auditoría
            backgroundColor: 'rgba(209, 180, 153, 0.7)', // Dorado Atlas
            borderColor: '#d1b499',
            borderWidth: 5,
            hoverBackgroundColor: 'rgba(209, 180, 153, 1)',
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
    },
    scales: {
        y: { beginAtZero: true, max: 10, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#fff' } },
        x: { grid: { display: false }, ticks: { color: '#fff' } }
    }
};

// 1. Opciones específicas para las gráficas de la Fase Sostener
const sostenerOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: { color: '#e0e0e0', font: { size: 10 } }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            titleColor: '#d1b499',
            bodyColor: '#ffffff',
            borderColor: 'rgba(209, 180, 153, 0.3)',
            borderWidth: 1
        }
    },
    scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#888' } },
        y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#888' },
            max: 10 // Para la de marcos usamos 10 (total de respuestas aprox)
        }
    }
};

// 2. Datos: Conocimiento de Marcos Internacionales
const marcosData = {
    labels: ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5'],
    datasets: [
        {
            label: 'Antes',
            data: [3, 5, 1, 2, 0],
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 1,
        },
        {
            label: 'Después',
            data: [0, 0, 2, 8, 1],
            backgroundColor: 'rgba(209, 180, 153, 0.8)',
            borderColor: '#d1b499',
            borderWidth: 1,
        }
    ]
};

// 3. Datos: Promedios de Madurez Docente (Escala 1 a 5)
const madurezData = {
    labels: ['Antes del Piloto', 'Después del Piloto'],
    datasets: [
        {
            label: 'Uso Responsable de IA',
            // Promedio inicial (3.27) vs Promedio final tras el piloto (4.36)
            data: [3.27, 4.36],
            backgroundColor: [
                'rgba(255, 255, 255, 0.1)',  // Barra del "Antes" (Opaca/Línea de base)
                'rgba(209, 180, 153, 0.8)'   // Barra del "Después" (Dorado Atlas destacado)
            ],
            borderColor: [
                'rgba(255, 255, 255, 0.3)',
                '#d1b499'
            ],
            borderWidth: 2,
            barThickness: 45 // Barras más estilizadas y gruesas para diferenciar del Card 1
        }
    ]
};

// Gráfica 1: Incremento de Competencias Críticas (Antes vs Después)
const comparativaPilotoData = {
    labels: [
        'Marcos Internacionales',
        'Uso Responsable de IA en el Aula'
    ],
    datasets: [
        {
            label: 'Antes del Piloto',
            data: [2.18, 3.27], // Medias exactas calculadas de tus datos
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            borderWidth: 2,
        },
        {
            label: 'Después del Piloto',
            data: [3.91, 4.36], // Saltos cualitativos reales
            backgroundColor: 'rgba(209, 180, 153, 0.8)', // Dorado Atlas
            borderColor: '#d1b499',
            borderWidth: 2,
        }
    ]
};

// Gráfica 2: Radar de Dimensiones de Madurez Final (Promedios Reales)
// Nota: Si usas gráfico tipo Radar, recuerda importar Radar de react-chartjs-2 y registrarlo.
// Si prefieres mantener la simplicidad, puedes renderizarlo como Bar. Usaremos Bar con opciones estilizadas.
const dimensionesMadurezData = {
    labels: ['Agencia Humana', 'Privacidad de Datos', 'Uso Ético', 'Supervisión y Validación'],
    datasets: [
        {
            label: 'Nivel Consolidado',
            data: [4.09, 4.27, 4.27, 4.00], // Promedios de las respuestas (Escala 1-5)
            backgroundColor: 'rgba(209, 180, 153, 0.4)',
            borderColor: '#d1b499',
            borderWidth: 2,
            barThickness: 30
        }
    ]
};

// Gráfica 3: Indicadores de Retorno y Validación de la Plataforma
const valorPercibidoData = {
    labels: ['Experiencia de Usuario (UX)', 'Utilidad Profesional', 'Índice de Recomendación'],
    datasets: [
        {
            label: 'Calificación (Sobre 5.0)',
            data: [4.27, 4.18, 4.45], // Datos exactos del formulario
            backgroundColor: [
                'rgba(255, 255, 255, 0.2)',
                'rgba(255, 255, 255, 0.3)',
                'rgba(209, 180, 153, 0.9)'
            ],
            borderColor: ['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.5)', '#d1b499'],
            borderWidth: 2,
            barThickness: 40
        }
    ]
};

// Opciones compartidas para mantener las gráficas estilizadas dentro del dashboard
const opcionesEjesCinco = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: '#fff', font: { family: 'sans-serif' } } }
    },
    scales: {
        x: { ticks: { color: 'rgba(255, 255, 255, 0.7)' }, grid: { display: false } },
        y: { min: 0, max: 5, ticks: { color: 'rgba(255, 255, 255, 0.5)', stepSize: 1 }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
    }
};



export const Home = () => {
    const VIDEO_URL = "https://res.cloudinary.com/deafueoco/video/upload/v1715698941/27669-365224683_medium_hnaemz.mp4";

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="atlas-page-wrapper">
            {/* --- HERO SECTION: DISTRIBUCIÓN IDENTICA A REFERENCIA --- */}
            <section className="hero-section">
                <div className="hero-video-container">
                    <FadingVideo src={VIDEO_URL} className="hero-video-side" />
                    {/* El overlay es ahora un sutil degradado radial para no tapar el video a la izquierda */}
                    <div className="video-overlay-gradient"></div>
                </div>

                <div className="hero-content-wrapper">
                    {/* PARTE IZQUIERDA: Texto Potente y Corto */}
                    <motion.div
                        className="hero-text-main"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="hero-kicker font-body">IA Responsable en educación</span>

                        {/* 2. REEMPLAZO DEL H1 POR EL LOGO */}
                        <div className="hero-logo-container">
                            <img
                                src={logoAtlas}
                                alt="Compass Logo"
                                className="hero-main-logo"
                            />
                        </div>

                        {/* 3. PÁRRAFO CON CLASE DE JUSTIFICADO */}
                        <p className="hero-description font-body text-justified">
                            El futuro de la IA en educación no depende de las herramientas, sino de las decisiones.
                            <strong>COMPASS</strong> ayuda a las instituciones a transformar el uso de IA en una
                            práctica ética, estratégica y sostenible tanto a docentes como a directivos.
                        </p>
                    </motion.div>

                    {/* PARTE DERECHA: Botón Circular Flotante (Como Imagen 2 y 3) */}
                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <button
                            className="explore-btn-circular"
                            onClick={() => scrollToSection('about')}
                        >
                            <span className="btn-text">INICIA <br /> EL VIAJE</span>
                            {/* Los anillos se controlan vía CSS con la clase .ring */}
                            <div className="ring ring-1"></div>
                            <div className="ring ring-2"></div>
                            <div className="ring ring-3"></div>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* --- SECCIÓN 1: COMPASS & FILOSOFÍA (Párrafos 1 y 2) --- */}
            {/* --- SECCIÓN 1: COMPASS (Párrafos 1 y 2) --- */}
            <section id="about" className="ecosystem-detailed">
                <div className="content-container">
                    <div className="info-grid">
                        <div className="text-block">
                            <h2 className="section-title font-heading italic">COMPASS: Responsabilidad Institucional</h2>
                            <p className="highlight-text gold-text">
                                "Transformar la adopción improvisada en una responsabilidad compartida."
                            </p>
                            <p className="body-text">
                                COMPASS es una solución EdTech que nace de una necesidad urgente. En el ecosistema educativo actual, no basta con saber usar la tecnología; es imperativo gobernarla. Aportamos coherencia y propósito para distinguir entre la IA que simplemente automatiza tareas + optimiza tiempos y una que potencia el pensamiento crítico y el desarrollo de habilidades bajo estándares internacionales de ética y responsabilidad.
                            </p>

                            {/* FILOSOFÍA CON LOGOS ESTANDARIZADOS */}
                            <div className="philosophy-box energy-glass">
                                <h3 className="gold-text">Nuestra Filosofía de Navegación Ética</h3>

                                <div className="logo-standard-grid">
                                    <div className="logo-wrapper">
                                        <img src="https://i1-e.pinimg.com/1200x/ee/e3/50/eee3503c894be321f31a99d1294ccd7b.jpg" alt="UNESCO" />
                                    </div>
                                    <div className="logo-wrapper">
                                        <img src="https://www.valoraanalitik.com/wp-content/uploads/2018/10/Ocde.jpg" alt="OCDE" />
                                    </div>
                                    <div className="logo-wrapper">
                                        <img src="https://images.vexels.com/media/users/3/134556/isolated/svg/afb341ad81df853598297b365cfef467.svg" alt="UE" />
                                    </div>
                                </div>

                                <p className="dimensions-text">
                                    Evaluamos 5 dimensiones: Cumplimiento Normativo • Madurez Tecnológica • Impacto Pedagógico • Supervisión Humana • Alineación Sistématica.
                                </p>
                            </div>
                        </div>

                        {/* CARDS CON ESPACIADO MEJORADO */}
                        <div className="cards-list-vertical">
                            <div className="mini-card energy-glass-premium">
                                <span className="card-number gold-text">01</span>
                                <h4>Brecha Crítica</h4>
                                <p>Puntos de diferencia detectados entre la innovación docente y la capacidad de regulación institucional.</p>
                            </div>

                            <div className="mini-card energy-glass-premium">
                                <span className="card-number gold-text">02</span>
                                <h4>Misión Central</h4>
                                <p>Que la tecnología nunca sea el centro, sino que la gobernanza humana dicte el rumbo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN 1: COMPASS & FILOSOFÍA (Párrafos 1 y 2) --- */}
            <section id="about" className="ecosystem-detailed">
                <div className="content-container">
                    <div className="info-grid">
                        <div className="text-block">
                            {/* Párrafo 1: El Imperativo */}
                            <h2 className="section-title font-heading italic">COMPASS: Responsabilidad Institucional</h2>
                            <p className="highlight-text gold-text">
                                Transformando la adopción improvisada de IA en una visión institucional compartida.
                            </p>
                            <p className="body-text">
                                En los ecosistemas educativos actuales, no basta con incorporar inteligencia artificial; es necesario <strong>gobernarla</strong> con criterio.
                                COMPASS ayuda a las instituciones a convertir el uso aislado de IA en una estrategia coherente, ética y alineada con el desarrollo académico, la supervisión humana y la toma de decisiones responsables.
                            </p>

                            {/* Párrafo 2: Filosofía de Navegación */}
                            <div className="philosophy-content" style={{ marginTop: '40px' }}>
                                <div className="philosophy-tag energy-glass">
                                    <span className="gold-text">FILOSOFÍA DE NAVEGACIÓN ÉTICA</span>
                                </div>
                                <p className="body-text small" style={{ opacity: 0.8, marginTop: '15px' }}>
                                    Traducimos marcos globales de la <strong>UNESCO, OCDE y la UE</strong> en un modelo operativo real, evaluando dimensiones críticas como el cumplimiento normativo, la madurez tecnológica, el impacto pedagógico, la supervisión humana y la alineación sistémica.
                                </p>
                            </div>
                        </div>

                        <div className="cards-list">
                            <div className="mini-card energy-glass">
                                <div className="card-glow"></div>
                                <span className="card-number gold-text">01</span>
                                <h4>Ruta de Navegación Docente</h4>
                                <p>Fortalece el uso responsable de IA en planeación, ejecución y evaluación de experiencias de aprendizaje mediante el desarrollo de competencias docentes, supervisión humana, prompting ético y toma de decisiones pedagógicas.</p>
                            </div>
                            <div className="mini-card energy-glass" style={{ marginTop: '20px' }}>
                                <div className="card-glow"></div>
                                <span className="card-number gold-text">02</span>
                                <h4>Ruta de Navegación Directiva</h4>
                                <p>Permite monitorear riesgos, generar políticas abarcando liderazgo institucional y niveles de adopción mediante dashboards, seguimiento pedagógico y gobernanza de IA.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN 2: MODELO ATLAS Y DESTINO (Párrafos 3, 4 y 5) --- */}
            <section id="modelo" className="atlas-phases-section">
                <div className="content-container">

                    {/* Párrafo 3: ATLAS como Motor (Ampliado para tu oratoria) */}
                    <div className="section-header-center">
                        <h2 className="phases-main-title font-heading italic">El Modelo ATLAS: Nuestro Motor Metodológico</h2>
                        <div className="atlas-intro-text">
                            <p className="body-text centered">
                                Para ejecutar esta visión, nos regimos por un modelo de transformación cultural diseñado para navegar esta era sin perder el rigor académico <strong>ATLAS</strong> .
                                Este modelo tiene 5 etapas secuenciales diferenciadas para los roles docente y directivo. En esta ruta de navegación se impulsa la madurez y desarrollo de habilidades de IA responsable y ética al tiempo que se promueve la innovación individual en una estrategia institucional conjunta y protegida
                            </p>
                        </div>
                    </div>

                    {/* Párrafo 4: Las 5 Fases Operativas (Mantenemos la cuadrícula que te gusta) */}
                    <div className="phases-grid">
                        {[
                            { f: "A", n: "Auditar", d: "Entender la realidad de la institución y el panorama de riesgos éticos y de responsabilidad en el uso de la IA." },
                            { f: "T", n: "Transformar", d: "Rediseño intencional de la pedagogía académica." },
                            { f: "L", n: "Liderar", d: "Empoderamiento de la interacción con la IA refinamiento y toma de decisiones." },
                            { f: "A", n: "Asegurar", d: "Incorporación de capas de ética y responsabilidad al uso internacional de IA" },
                            { f: "S", n: "Sostener", d: "Cultura de mejora y evolución constante." }
                        ].map((phase, i) => (
                            <motion.div
                                key={i}
                                className="phase-item energy-glass"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="phase-letter font-heading gold-text">{phase.f}</div>
                                <h3>{phase.n}</h3>
                                <p>{phase.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NUEVA SECCIÓN: GRUPO FOCAL / CASO DE ESTUDIO --- */}
            <section id="focus-group" className="focus-group-section">
                <div className="content-container">
                    <div className="focus-grid">

                        {/* LADO IZQUIERDO: El Escenario */}
                        <div className="focus-text-main">
                            <span className="gold-text-tag">CASO DE ÉXITO: PILOTO COMPASS</span>
                            <h2 className="section-title font-heading italic">
                                Departamento de lenguas extranjeras (miembros de los siguientes idiomas: Japonés, Inglés, Francés, Inglés) <br />
                            </h2>
                            <p className="body-text">
                                El departamento de Lenguas extranjeras representó un espacio muy interesante para observar el impacto de la IA generativa.
                                Desde la traducción contextual hasta la redacción automatizada, es aquí donde la IA altera profundamente
                                la producción textual y la honestidad académica.
                            </p>

                            <div className="institution-highlight energy-glass">
                                <div className="inst-header">
                                    <div>
                                        <h4>Universidad de los Andes</h4>
                                        <p className="gold-text">Validación en Entorno de Alta Exigencia</p>
                                    </div>
                                </div>
                                <p className="inst-desc">
                                    El piloto ATLAS demuestra que el desafío no es el uso de la IA, sino cómo las instituciones
                                    <strong> regulan, supervisan y resignifican</strong> pedagógicamente ese uso.
                                </p>
                            </div>
                        </div>

                        {/* LADO DERECHO: Métricas y Paradoja */}
                        <div className="focus-metrics">
                            {/* Card de Participantes */}
                            <div className="metric-box energy-glass-premium">
                                <div className="metric-split">
                                    <div className="metric-item">
                                        <span className="big-num gold-text">07</span>
                                        <p>Docentes <br /> Investigadores</p>
                                    </div>
                                    <div className="divider-v"></div>
                                    <div className="metric-item">
                                        <span className="big-num gold-text">04</span>
                                        <p>Directivos <br /> Estratégicos</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card de la Paradoja */}
                            <div className="paradox-card energy-glass-strong">
                                <h4 className="gold-text">La Paradoja de la Evaluación</h4>
                                <p>
                                    Identificamos una asimetría metodológica: las competencias técnicas de los profesores avanzan con rapidez, mientras que las normativas heredadas continúan ligadas a evidencias tradicionales.
                                </p>
                                <div className="warning-note">
                                    <p>El uso de herramientas generativas reduce el esfuerzo operativo del alumno, impulsando la necesidad de rediseñar instrumentos que evalúen el control humano del proceso.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- SECCIÓN DE RESULTADOS DE AUDITORÍA: CARGA COMPLETA DE DATOS --- */}
            {/* --- SECCIÓN DE RESULTADOS DE AUDITORÍA: ESTRUCTURA ÚNICA --- */}
            <section id="atlas-audit-results-unique" className="atlas-audit-section">
                <div className="atlas-content-container">

                    {/* 1. AUDITORÍA DOCENTE */}
                    <div id="atlas-block-docentes" className="atlas-audit-block">
                        <div className="atlas-section-header">
                            <span className="atlas-gold-tag">FASE 1: AUDITAR - CUERPO DOCENTE</span>
                            <h2 className="atlas-main-title">Resultados: Departamento de lenguas extranjeras</h2>
                        </div>

                        <div className="atlas-grid-layout atlas-grid-docentes">
                            {/* PRIMER DIV: Métricas Descriptivas Resumidas */}
                            <div className="atlas-col-stats">
                                <div className="atlas-card-unique atlas-glass-basic">
                                    <h3 className="atlas-card-title">Resultados Globales</h3>
                                    <div className="atlas-analysis-text">
                                        <p className="atlas-p">
                                            El diagnóstico registra una media global del <strong>56.4%</strong> y una desviación estándar del <strong>14.2%</strong>. Estos datos confirman un ecosistema con asimetrías importantes en los niveles de adopción entre las distintas áreas de la facultad.
                                        </p>
                                    </div>
                                    <div className="atlas-insight-box" style={{ marginTop: '15px' }}>
                                        <h4 className="atlas-gold-sub">Estado Actual</h4>
                                        <p className="atlas-p">
                                            Fase de <strong>Uso Incipiente</strong>: existe una sólida intención pedagógica y destreza técnica empírica (moda de 3.75), pero el entorno aún carece de una arquitectura institucional homogénea.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SEGUNDO DIV: Análisis Principal de la Línea de Base */}
                            <div className="atlas-col-main">
                                <div className="atlas-card-unique atlas-glass-premium">
                                    <h3 className="atlas-card-title">Comportamiento de la Línea de Base</h3>
                                    <p className="atlas-p">
                                        El punto de partida de la facultad estuvo marcado por una exploración intuitiva y atomizada. Predominaba un uso de la IA enfocado en resolver tareas operativas y funcionales rápidas (como la corrección gramatical y la traducción contextual de textos), orientándose a la optimización de productos entregables más que al andamiaje de procesos cognitivos profundos.
                                    </p>
                                    <p className="atlas-p" style={{ marginTop: '15px' }}>
                                        Esta dinámica inicial generó una alta dispersión metodológica. El análisis estratégico demuestra que el núcleo del cuerpo docente ya ha consolidado un nivel táctico e individual por cuenta propia; por lo tanto, el reto identificado en esta fase no radica en la falta de interés del docente, sino en la necesidad urgente de mecanismos institucionales que transformen la adopción improvisada en un criterio pedagógico guiado, unificado y protegido.
                                    </p>
                                </div>
                            </div>
                        </div>



                        {/* Perfiles */}
                        <div className="atlas-profiles-row">
                            <div className="atlas-profile-mini atlas-glass-basic">
                                <h4 className="atlas-gold-sub">Docente 1 • Pioneer</h4>
                                <p className="atlas-p-small">Rediseña rúbricas con criterios de uso responsable e integración real.</p>
                            </div>
                            <div className="atlas-profile-mini atlas-glass-basic">
                                <h4 className="atlas-blue-sub">Docente 2 • Integration Leader</h4>
                                <p className="atlas-p-small">Utiliza IA para andamiaje cognitivo en comprensión lectora de japonés.</p>
                            </div>
                            <div className="atlas-profile-mini atlas-glass-basic">
                                <h4 className="atlas-red-sub">Docente 3 • Ethical Resistance</h4>
                                <p className="atlas-p-small">Manifiesta miedo institucional a la pérdida de habilidades básicas.</p>
                            </div>
                        </div>
                    </div>

                    {/* ==========================================
    SECCIÓN 2: MESA DIRECTIVA Y ESTRATEGIA
    ========================================== */}
                    <div id="atlas-block-directiva" className="atlas-audit-block">
                        <div className="atlas-section-header atlas-text-right">
                            <span className="atlas-gold-tag">FASE 1: AUDITAR - MESA DIRECTIVA</span>
                            <h2 className="atlas-main-title">Gobernanza y Estrategia</h2>
                        </div>

                        <div className="atlas-grid-layout atlas-grid-directiva">
                            {/* LADO DE LA GRÁFICA (ROBUSTECIDO) */}
                            <div className="atlas-col-chart">
                                <div className="atlas-card-unique atlas-glass-strong">
                                    <div className="atlas-chart-container">
                                        <Bar data={directivosChartData} options={chartOptions} />
                                    </div>
                                    <p className="atlas-p" style={{ marginTop: '20px' }}>
                                        La fase inicial de auditoría a directivos revela una <strong>Desconexión Normativa</strong> sistémica. Aunque existe una clara intención estratégica en el despliegue del software, los datos demuestran la necesidad urgente de robustecer al equipo directivo en competencias operativas clave.
                                    </p>
                                    <p className="atlas-p" style={{ marginTop: '12px' }}>
                                        Se detectaron oportunidades críticas de desarrollo institucional en términos de: <strong>Políticas institucionales</strong> estandarizadas, marcos de <strong>Ética y privacidad</strong> de datos, herramientas de <strong>Seguimiento pedagógico</strong> y protocolos formales para la mitigación de <strong>Riesgos algorítmicos</strong>. Sin estos pilares, la capacidad de supervisar y regular el uso de herramientas generativas en las facultades permanece inactiva.
                                    </p>
                                </div>
                            </div>

                            {/* LADO DE LAS MÉTRICAS ESTADÍSTICAS */}
                            <div className="atlas-col-results">
                                <div className="atlas-card-unique atlas-glass-basic">
                                    <h3 className="atlas-card-title">Resultados Directivos</h3>
                                    <div className="atlas-analysis-text">
                                        <p><strong>Media de Cumplimiento:</strong> 35.7%</p>
                                        <p><strong>Mediana:</strong> 34.0%</p>
                                        <p><strong>Desviación Estándar:</strong> 8.7%</p>
                                    </div>
                                    <div className="atlas-verdict-box" style={{ marginTop: '25px' }}>
                                        <h4 className="atlas-red-sub">Veredicto COMPASS</h4>
                                        <p className="atlas-p-small">
                                            <strong>Intención Estratégica sin Capacidad Operativa:</strong> La mesa directiva tiene la voluntad de guiar el cambio cultural, pero carece de la infraestructura metodológica para auditar los sesgos y consolidar la transparencia algorítmica.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* GAP NUMBER (Aterrizado y sincronizado matemáticamente) */}
                        <div className="atlas-card-unique atlas-gap-card" style={{ marginTop: '30px' }}>
                            <h2 className="atlas-main-title">LA BRECHA CRÍTICA</h2>
                            <div className="atlas-giant-number">20.7%</div>
                            <p className="atlas-p">
                                Puntos de asincronía métrica entre el nivel de <strong>Innovación Docente Práctica (56.4%)</strong> y la <strong>Capacidad de Regulación Institucional (35.7%)</strong>.
                            </p>
                            <p className="atlas-p-small" style={{ marginTop: '10px', opacity: 0.85, fontStyle: 'italic' }}>
                                *Nota Metodológica ATLAS: Una brecha superior a 15 puntos porcentuales indica un escenario de riesgo reputacional y operativo. Los profesores están integrando herramientas generativas en el aula a un ritmo que la estructura de gobernanza actual no alcanza a normar ni proteger.
                            </p>
                        </div>
                    </div>
                    {/* 3. HEATMAP */}
                    <div id="atlas-block-heatmap" className="atlas-audit-block">
                        <h2 className="atlas-main-title"><i className="fas fa-fire"></i> Mapa de Riesgo Institucional</h2>
                        <div className="atlas-card-unique atlas-glass-premium">
                            {[
                                { label: "Innovación Docente", val: 58, color: "#00f2ff" },
                                { label: "Gobernanza", val: 35, color: "#d1b499" },
                                { label: "Supervisión Humana", val: 32, color: "#1a3a60" },
                                { label: "Transparencia Algorítmica", val: 5, color: "#ff4d6d" },
                                { label: "Monitoreo de Sesgos", val: 0, color: "#ff0000" }
                            ].map((item, index) => (
                                <div key={index} className="atlas-heatmap-row">
                                    <div className="atlas-heatmap-label">
                                        <span className="atlas-white">{item.label}</span>
                                        <span style={{ color: item.color, fontWeight: 'bold' }}>{item.val}%</span>
                                    </div>
                                    <div className="atlas-heatmap-bar-bg">
                                        <div className="atlas-heatmap-bar-fill" style={{ width: `${item.val}%`, background: item.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. ANÁLISIS GLOBAL */}
                    <div id="atlas-block-global" className="atlas-audit-block">
                        <h2 className="atlas-main-title"><i className="fas fa-earth-americas"></i> Análisis Global del Ecosistema</h2>
                        <div className="atlas-grid-layout atlas-grid-half">
                            <div className="atlas-card-unique atlas-glass-basic">
                                <h3 className="atlas-card-title">Hallazgos Transversales</h3>
                                <ul className="atlas-list">
                                    <li>Los participantes del piloto evidencian haber generado mayor conciencia en el uso estratégico de IA, pero gran vacío en términos de seguridad operativa.</li>
                                    <li>Se revela un <strong>"agujero negro" institucional</strong> actualmente al no haber un monitoreo de sesgos o transparencia algorítmica en el uso de IA por parte de los equipos docentes.</li>
                                    <li>El cuerpo docente participante cuenta con madurez técnica y tecnológica, pero manifiesta validación normativa.</li>
                                </ul>
                            </div>
                            <div className="atlas-card-unique atlas-glass-basic">
                                <h3 className="atlas-card-title">Mapa de Comportamiento</h3>
                                <div className="atlas-behavior-list">
                                    <div className="atlas-behavior-item atlas-border-blue">
                                        <h4 className="atlas-blue-sub">Exploradores Activos</h4>
                                        <p className="atlas-p-small">Docentes pioneros listos para la integración estratégica.</p>
                                    </div>
                                    <div className="atlas-behavior-item atlas-border-gold">
                                        <h4 className="atlas-gold-sub">Administradores en Espera</h4>
                                        <p className="atlas-p-small">Directivos con voluntad pero sin metodología operativa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VERDICTO FINAL */}
                        <div className="atlas-final-verdict atlas-glass-strong">
                            <h2 className="atlas-main-title">Veredicto Estratégico Global</h2>
                            <p className="atlas-p-large">
                                Los docentes y directivos participantes del piloto en el departamento de lenguas extranjeras no parecen enfrentar un problema tecnológico, sino una <strong>desarticulación sistémica</strong> entre innovación y supervisión. La brecha de 20.7 puntos representa actualmente el mayor riesgo reputacional de la institución.
                            </p>
                            <p className="atlas-p-large atlas-gold-sub" style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                EL SIGUIENTE PASO:  Activar protocolos de madurez de IA Responsable con una implementación sistémica y robusta de COMPASS. Asimismo, se sugiere crear un Comité de Gobernanza de IA y construir protocolos de supervisión humana significativa.
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            {/* ==========================================
    SECCIÓN 1: COMPORTAMIENTO METODOLÓGICO Y MUESTRA 
    ========================================== */}
            <section id="atlas-sostener-metodologia" className="atlas-audit-block">
                <div className="atlas-section-header atlas-text-right">
                    <span className="atlas-gold-tag">FASE 4: SOSTENER - METODOLOGÍA</span>
                    <h2 className="atlas-main-title">Universo de Análisis y Muestra</h2>
                </div>

                <div className="atlas-grid-layout atlas-grid-2col">
                    <div className="atlas-card-unique atlas-glass-strong">
                        <h3>Distribución del Grupo Focal</h3>
                        <p className="atlas-p">
                            El universo de análisis para este cierre de ciclo está compuesto por un grupo focal de <strong>11 usuarios activos</strong> pertenecientes a la Facultad de Lenguas. La distribución de roles evidencia una muestra equilibrada y altamente representativa para la validación de un modelo de gobernanza institucional. Cuantitativamente, la fase registra un nivel de deserción nulo, lo que dota de una validez estadística absoluta al contraste de percepciones.
                        </p>
                        <div className="atlas-metrics-strip">
                            <div className="metric-item">
                                <span className="metric-value">7</span>
                                <span className="metric-label">Docentes de Aula</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">4</span>
                                <span className="metric-label">Directivos Líderes</span>
                            </div>
                            <div className="metric-item">
                                <span className="metric-value">100%</span>
                                <span className="metric-label">Retención (N=11)</span>
                            </div>
                        </div>
                    </div>

                    <div className="atlas-card-unique atlas-glass-strong">
                        <h3>Mapeo de Usuarios y Roles del Ecosistema</h3>
                        <div className="atlas-table-responsive">
                            <table className="atlas-data-table">
                                <thead>
                                    <tr>
                                        <th>Rol</th>
                                        <th>Huella IA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>93.52</td></tr>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>88.04</td></tr>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>86.96</td></tr>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>83.01</td></tr>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>82.56</td></tr>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>81.39</td></tr>
                                    <tr><td><span className="badge-docente">DOCENTE</span></td><td>79.29</td></tr>
                                    <tr><td><span className="badge-directivo">DIRECTIVO</span></td><td>85.76</td></tr>
                                    <tr><td><span className="badge-directivo">DIRECTIVO</span></td><td>83.84</td></tr>
                                    <tr><td><span className="badge-directivo">DIRECTIVO</span></td><td>89.32</td></tr>
                                    <tr><td><span className="badge-directivo">DIRECTIVO</span></td><td>88.24</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
    SECCIÓN 2: ANÁLISIS CUANTITATIVO Y TRANSICIÓN DE NIVELES
    ========================================== */}
            <section id="atlas-sostener-cuantitativo" className="atlas-audit-block">
                <div className="atlas-section-header">
                    <span className="atlas-gold-tag">FASE 4: SOSTENER - ANÁLISIS CUANTITATIVO</span>
                    <h2 className="atlas-main-title">Impacto Normativo y Desplazamiento de Niveles</h2>
                </div>

                <div className="atlas-grid-layout atlas-grid-3col">
                    {/* Card 1: Conocimiento de Marcos Internacionales */}
                    <div className="atlas-card-unique atlas-glass-strong">
                        <div className="card-icon">⚖️</div>
                        <h3>Marcos Internacionales (UNESCO / UE / OCDE)</h3>
                        <p className="atlas-p">
                            El impacto más contundente del piloto se observa en el conocimiento regulatorio. En el diagnóstico inicial, el <strong>72.7%</strong> de los participantes se ubicaba en los niveles de ignorancia del marco (valores 1 y 2). Tras COMPASS, el <strong>81.8%</strong> de la muestra se consolidó en los niveles de excelencia (valores 4 y 5), con un 72.7% concentrado específicamente en el valor 4.
                        </p>
                        <div style={{ height: "220px", marginTop: "20px" }}>
                            {/* Gráfica comparativa Antes vs Después de Marcos Internacionales usando las nuevas constantes */}
                            <Bar data={marcosData} options={sostenerOptions} />
                        </div>
                    </div>

                    {/* Card 2: Madurez Docente Aula */}
                    <div className="atlas-card-unique atlas-glass-strong">
                        <div className="card-icon">📈</div>
                        <h3>Transición de Madurez en Aula (Docentes)</h3>
                        <p className="atlas-p">
                            Los datos duros confirman una migración cualitativa desde la ejecución empírica hacia la práctica planificada. El 100% de la planta docente superó la fase informal. El  cuerpo docente se estabilizó de manera consistente en el <strong>Nivel 3: Docente Estratégico</strong> (promedios de 3.71 a 4.17), mientras que perfiles líderes alcanzaron el <strong>Nivel 4: Referente Institucional</strong>.
                        </p>
                        <div style={{ height: "220px", marginTop: "20px" }}>
                            {/* Gráfica de los Promedios Globales Docentes ajustando el eje Y al máximo de 5 */}
                            <Bar data={madurezData} options={{
                                ...sostenerOptions,
                                scales: {
                                    ...sostenerOptions.scales,
                                    y: { ...sostenerOptions.scales.y, max: 5 }
                                }
                            }} />
                        </div>
                    </div>

                    {/* Card 3: Brecha de Gobernanza Directiva */}
                    <div className="atlas-card-unique atlas-glass-strong alert-border">
                        <div className="card-icon">🏛️</div>
                        <h3>La brecha crítica (Mesa Directiva)</h3>
                        <p className="atlas-p">
                            Se evidencia una asimetría crítica en el estamento directivo. Mientras algunos participantes se alinea en un nivel óptimo (Nivel 3, promedio 3.79), las respuestas de otros (1.67), (1.58) activaron alertas explícitas de <strong>"Riesgo en formación docente y bajo impacto pedagógico institucional"</strong>. Esto demuestra que la mesa directiva aún experimenta fragmentación en su capacidad operativa.
                        </p>
                        <div className="status-indicator-box" style={{ marginTop: "35px" }}>
                            <span className="status-dot red"></span>
                            <span className="status-text">Gobernanza Actual: "Buenos resultados"</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
    SECCIÓN 3: ANÁLISIS CUALITATIVO Y TRANSICIÓN DE PERFILES
    ========================================== */}
            <section id="atlas-sostener-cualitativo" className="atlas-audit-block">
                <div className="atlas-section-header atlas-text-right">
                    <span className="atlas-gold-tag">FASE 4: SOSTENER - EVIdENCIA CUALITATIVA</span>
                    <h2 className="atlas-main-title">Evolución Pedagógica y Diario Reflexivo</h2>
                </div>

                <div className="atlas-grid-layout atlas-grid-directiva">
                    {/* Columna de la Gran Narrativa de Aula */}
                    <div className="atlas-col-chart">
                        <div className="atlas-card-unique atlas-glass-strong">
                            <h3>Tránsito del Foco Cognitivo: Del Producto al Proceso</h3>
                            <p className="atlas-p">
                                Las reflexiones cualitativas revelan una metamorfosis en la ingeniería de prompts y el diseño de experiencias. El grupo profesoral comprendió que el riesgo real de la IA no es el plagio superficial, sino la delegación del esfuerzo intelectual. La nueva consigna metodológica de la facultad busca que el estudiante mantenga el control mediante la justificación de decisiones, garantizando la supervisión humana y la evaluación de la comprensión auténtica.
                            </p>

                            <div className="atlas-quote-container">
                                <span className="quote-mark">“</span>
                                <blockquote>
                                    Antes el uso de IA estaba orientado a resolver tareas de manera rápida y eficiente (corrección gramatical). La práctica se enfocaba más en completar productos que en desarrollar procesos de pensamiento profundo, metacognición o autonomía lingüística... El principal cambio fue pasar de utilizarla como herramienta funcional a integrarla estratégicamente como apoyo al aprendizaje y al desarrollo del pensamiento crítico.
                                </blockquote>
                                <span className="quote-author">— Diana Katherine Salazar (Docente Estratégico, Promedio 4.08)</span>
                            </div>
                        </div>
                    </div>

                    {/* Columna de Desplazamiento de Perfiles Críticos */}
                    <div className="atlas-col-results">
                        <div className="atlas-card-unique atlas-glass-strong">
                            <h3>Migración de Perfiles: De la Resistencia a la Transparencia</h3>
                            <p className="atlas-p">
                                El piloto demostró efectividad para canalizar el escepticismo inicial (perfil de <em>Ethical Resistance</em>) hacia un enfoque de veeduría y gobernanza compartida en el aula.
                            </p>

                            <div className="profile-migration-box">
                                <div className="migration-step">
                                    <span className="migration-label-title">Laura Hurtado (Docente Estratégico - 4.00)</span>
                                    <p className="migration-text">
                                        Transicionó del temor a la pérdida de habilidades hacia una exigencia de política institucional de transparencia simétrica:
                                    </p>
                                    <span className="migration-quote">
                                        "Siempre ser transparente con el uso de la IA pero no solo por parte de los alumnos. El uso docente debe ser explicado de la misma manera que se espera que los alumnos compartan el uso que le dan, el cómo y el porqué."
                                    </span>
                                </div>

                                <div className="migration-step" style={{ marginTop: '15px' }}>
                                    <span className="migration-label-title">Marcela Vargas (Docente Estratégico - 4.17)</span>
                                    <p className="migration-text">
                                        Desarrolló una autoinfraestructura de control de sesgos algorítmicos en sus procesos evaluativos:
                                    </p>
                                    <span className="migration-quote">
                                        "No creo que haya delegado más de lo necesario, pero me di cuenta que es necesario que los estudiantes estén enterados de cómo hago uso de la IA en la evaluación de actividades... soy más cuidadosa en la forma en la que escribo los 'prompts' para evitar sesgos."
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
    SECCIÓN 4: VIABILIDAD INSTITUCIONAL Y MEJORA CONTINUA
    ========================================== */}
            {/* ==========================================
    SECCIÓN 4: RESULTADOS DEL PILOTO E IMPACTO INSTITUCIONAL
    ========================================== */}
            <section id="atlas-block-resultados" className="atlas-audit-block" style={{ marginTop: '60px' }}>
                <div className="atlas-section-header">
                    <span className="atlas-gold-tag">FASE 4: SOSTENER - ANALÍTICA DE IMPACTO</span>
                    <h2 className="atlas-main-title">Resultados Consolidados del Piloto (N=11)</h2>
                    <p className="atlas-p-subtitle" style={{ color: '#aaa', marginTop: '5px' }}>
                        Evidencia cuantitativa y cualitativa del cambio cultural y la adopción de COMPASS.
                    </p>
                </div>

                {/* METRICAS HIGHLIGHTS (TARJETAS GRANDES DE IMPACTO) */}
                <div className="atlas-grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    <div className="atlas-card-unique atlas-glass-basic" style={{ textAlign: 'center', padding: '25px' }}>
                        <h4 style={{ color: '#d1b499', fontSize: '0.9rem', uppercase: 'true' }}>Conocimiento Regulatorio</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0', color: '#fff' }}>+79%</div>
                        <p className="atlas-p-small" style={{ opacity: 0.8 }}>Incremento brutal en la comprensión de los marcos UNESCO, UE y OCDE.</p>
                    </div>
                    <div className="atlas-card-unique atlas-glass-basic" style={{ textAlign: 'center', padding: '25px' }}>
                        <h4 style={{ color: '#d1b499', fontSize: '0.9rem', uppercase: 'true' }}>Uso Responsable IA</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0', color: '#fff' }}>+33%</div>
                        <p className="atlas-p-small" style={{ opacity: 0.8 }}>Evolución del uso intuitivo y exploratorio hacia un nivel estratégico planeado.</p>
                    </div>
                    <div className="atlas-card-unique atlas-glass-basic" style={{ textAlign: 'center', padding: '25px' }}>
                        <h4 style={{ color: '#d1b499', fontSize: '0.9rem', uppercase: 'true' }}>Recomendación del Modelo</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0', color: '#fff' }}>4.45 <span style={{ fontSize: '1.2rem', color: '#888' }}>/ 5</span></div>
                        <p className="atlas-p-small" style={{ opacity: 0.8 }}>Validación de valor y tracción sobresaliente dentro del grupo focal docente.</p>
                    </div>
                    <div className="atlas-card-unique atlas-glass-basic" style={{ textAlign: 'center', padding: '25px' }}>
                        <h4 style={{ color: '#d1b499', fontSize: '0.9rem', uppercase: 'true' }}>Experiencia de Usuario</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0', color: '#fff' }}>4.27 <span style={{ fontSize: '1.2rem', color: '#888' }}>/ 5</span></div>
                        <p className="atlas-p-small" style={{ opacity: 0.8 }}>Sólida usabilidad de la infraestructura EdTech para despliegues a escala.</p>
                    </div>
                </div>

                {/* BLOQUE DE GRÁFICAS PRINCIPALES */}
                <div className="atlas-grid-layout atlas-grid-docentes" style={{ marginBottom: '40px' }}>
                    {/* GRÁFICA 1: EVOLUCIÓN */}
                    <div className="atlas-col-stats">
                        <div className="atlas-card-unique atlas-glass-strong">
                            <h3 className="atlas-card-title">Hito Evolutivo: De Herramienta a Criterio</h3>
                            <div style={{ height: '240px', marginTop: '15px' }}>
                                <Bar data={comparativaPilotoData} options={opcionesEjesCinco} />
                            </div>
                            <p className="atlas-p-small" style={{ marginTop: '15px', opacity: 0.9 }}>
                                Los datos demuestran que COMPASS no enseña "prompts", desarrolla <strong>alfabetización institucional y regulatoria</strong>. El salto de <strong>2.18 a 3.91</strong> en el dominio de marcos internacionales comprueba que el profesorado adquirió la base jurídica indispensable para auditar su propia práctica pedagógica.
                            </p>
                        </div>
                    </div>

                    {/* GRÁFICA 2: DIMENSIONES DE MADUREZ */}
                    <div className="atlas-col-main">
                        <div className="atlas-card-unique atlas-glass-premium">
                            <h3 className="atlas-card-title">Consolidación de Dimensiones Críticas</h3>
                            <div style={{ height: '240px', marginTop: '15px' }}>
                                <Bar data={dimensionesMadurezData} options={{ ...opcionesEjesCinco, plugins: { legend: { display: false } } }} />
                            </div>
                            <p className="atlas-p-small" style={{ marginTop: '15px', opacity: 0.9 }}>
                                El ecosistema del profesorado se estabilizó de manera madura por encima de la barrera de los 4.0 puntos. Destacan las dimensiones de <strong>Privacidad de Datos (4.27)</strong> y <strong>Uso Ético (4.27)</strong>, evidenciando un cambio profundo en cómo el docente <em>piensa</em> y estructura sus dinámicas académicas de forma segura.
                            </p>
                        </div>
                    </div>
                </div>

                {/* BLOQUE INFERIOR: VALIDACIÓN DE PRODUCTO Y EVIDENCIA CUALITATIVA */}
                <div className="atlas-grid-layout atlas-grid-directiva" style={{ gap: '20px' }}>
                    {/* GRÁFICA VALOR PERCIBIDO */}
                    <div className="atlas-col-chart">
                        <div className="atlas-card-unique atlas-glass-strong">
                            <h3 className="atlas-card-title">Validación del Modelo EdTech</h3>
                            <div style={{ height: '230px', marginTop: '15px' }}>
                                <Bar data={valorPercibidoData} options={{ ...opcionesEjesCinco, plugins: { legend: { display: false } } }} />
                            </div>
                            <div className="atlas-insight-box" style={{ marginTop: '15px' }}>
                                <h4 className="atlas-gold-sub">Insight Diferenciador</h4>
                                <p className="atlas-p-small">
                                    Los resultados no reflejan la satisfacción de un "curso convencional de IA". El piloto valida un <strong>cambio cultural inicial y escalable</strong>. La alta utilidad profesional (4.18) y recomendación (4.45) garantizan la viabilidad de adopción del modelo en otras facultades de la universidad.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* APRENDIZAJES DEL PILOTO (ALERTAS AMARILLAS QUE DAN CREDIBILIDAD) */}
                    <div className="atlas-col-results">
                        <div className="atlas-card-unique atlas-glass-basic" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h3 className="atlas-card-title">Aprendizajes Críticos del Piloto</h3>
                                <p className="atlas-p-small" style={{ marginBottom: '15px' }}>
                                    Para blindar la transparencia institucional ante el comité, el modelo identifica las fricciones operativas declaradas por los usuarios:
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <p className="atlas-p-small">
                                        ⚠️ <strong>Uso Intuitivo Previo:</strong> Antes del despliegue dominaba la exploración empírica, enfocada en optimizar productos rápidos (como corrección de textos) en lugar de procesos reflexivos.
                                    </p>
                                    <p className="atlas-p-small">
                                        ⚠️ <strong>Saturación de Tiempos:</strong> El cuerpo docente señaló dificultades para completar actividades autogestionadas cuando se cruzaban con periodos de receso académico o alta carga evaluativa.
                                    </p>
                                    <p className="atlas-p-small">
                                        ⚠️ <strong>Ventana de Trabajo Óptima:</strong> El <strong>63.6%</strong> de los participantes determinó que para consolidar con éxito estas competencias éticas y regulatorias, se requiere un acompañamiento institucional continuo estructurado entre <strong>4 a 6 meses</strong>.
                                    </p>
                                </div>
                            </div>
                            <div className="atlas-verdict-box" style={{ marginTop: '15px', background: 'rgba(209, 180, 153, 0.08)', borderColor: 'rgba(209, 180, 153, 0.3)' }}>
                                <h4 style={{ color: '#d1b499', margin: 0, fontSize: '0.85rem' }}>Conclusión Estratégica</h4>
                                <p className="atlas-p-small" style={{ fontStyle: 'italic', margin: '5px 0 0 0' }}>
                                    "El hallazgo clave no fue tecnológico, sino institucional: la universidad necesita estructuras formales para transformar el uso intuitivo de la IA en un criterio ético compartido."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
};