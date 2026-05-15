import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/demo.css"; 

// =================================================================
// 1. MAPA DE IMÁGENES COMPASS
// =================================================================
const imageMap = {
    'step-1': 'https://i1-e.pinimg.com/736x/9e/87/5b/9e875bd853736d2bd6ce8f9fdba0c17f.jpg', // Responsabilidad
    'step-2': 'https://i.pinimg.com/736x/d9/81/e0/d981e0e0dd15b1a76bc11063a4164cd7.jpg', // Filosofía
    'step-3': 'https://i1-e.pinimg.com/736x/49/17/c7/4917c764b997f5ebff480f073a7ae286.jpg', // Motor ATLAS
    'step-4': 'https://i.pinimg.com/736x/fe/56/39/fe5639297ac94435c4375848dcaadc7a.jpg', // 5 Fases
    'step-5': 'https://i1-e.pinimg.com/736x/7d/7c/71/7d7c71fd196d34478dad77e5077f4a79.jpg', // Destino
};

const stepsData = [
    { 
        num: '01', 
        title: 'COMPASS: Responsabilidad Institucional', 
        desc: 'Transformamos la adopción improvisada de la IA en una responsabilidad compartida. En el ecosistema actual, no basta con usar la tecnología; es imperativo gobernarla para asegurar coherencia y propósito institucional.', 
        imageKey: 'step-1', 
        colorClass: 'color-darkblue',
        tag: 'EL IMPERATIVO'
    },
    { 
        num: '02', 
        title: 'Filosofía de Navegación Ética', 
        desc: 'Nos regimos por marcos de la UNESCO y la OCDE. Evaluamos el cumplimiento normativo, impacto pedagógico y supervisión humana para que la tecnología nunca sea el centro, sino la gobernanza humana.', 
        imageKey: 'step-2', 
        colorClass: 'color-lightgreen',
        tag: 'NUESTRA BRÚJULA'
    },
    { 
        num: '03', 
        title: 'ATLAS: Nuestro Motor Metodológico', 
        desc: 'Una arquitectura de transformación cultural diseñada para navegar esta era sin perder el rigor académico. Es el "cómo" hacemos realidad la promesa de COMPASS, convirtiendo el caos en estrategia.', 
        imageKey: 'step-3', 
        colorClass: 'color-tan',
        tag: 'EL MÉTODO'
    },
    { 
        num: '04', 
        title: 'Las 5 Fases de la Transformación', 
        desc: 'Auditar, Transformar, Liderar, Asegurar y Sostener. Cerramos la brecha de 20.7 puntos detectada entre la innovación docente y la capacidad de regulación institucional.', 
        imageKey: 'step-4', 
        colorClass: 'color-lightblue',
        tag: 'OPERATIVIDAD'
    },
    { 
        num: '05', 
        title: 'Ecosistema de Educación Inteligente', 
        desc: 'Certificamos la madurez institucional en niveles Foundation, Pro o Advanced. Lideramos la revolución de la IA con autoridad ética, convirtiendo islas de innovación en un sistema cohesionado.', 
        imageKey: 'step-5', 
        colorClass: 'color-darkgreen',
        tag: 'EL DESTINO'
    }
];

export const Demo = () => {
    const [activeStep, setActiveStep] = useState('01');
    const isScrolling = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDotClick = (stepNum) => {
        const stepElement = document.querySelector(`#step-${stepNum}`);
        if (stepElement) {
            isScrolling.current = true;
            window.scrollTo({
                top: stepElement.offsetTop,
                behavior: 'smooth'
            });
            setActiveStep(stepNum);
            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling.current) return;
            const steps = document.querySelectorAll('.step-section');
            let currentActiveStep = '01';

            steps.forEach((step) => {
                const stepTop = step.getBoundingClientRect().top;
                if (stepTop <= window.innerHeight / 2) {
                    currentActiveStep = step.getAttribute('data-step-number');
                }
            });
            setActiveStep(currentActiveStep);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="how-it-works-page presentation-mode">
            
            {/* Indicador Central Fijo - Actúa como HUD de presentación */}
            <div className="fixed-step-indicator">
                <div className="presentation-header">
                    <span className="gold-text">ATLAS + COMPASS</span>
                </div>
                
                <div className="step-circle-wrapper">
                    <div className="step-number-circle">
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={activeStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="step-number"
                            >
                                {activeStep}
                            </motion.span>
                        </AnimatePresence>
                        
                        {stepsData.map((step, index) => (
                            <div 
                                key={index}
                                className={`dot dot-${index + 1} ${activeStep === step.num ? 'dot-active' : ''}`}
                                onClick={() => handleDotClick(step.num)}
                                style={{ pointerEvents: 'auto' }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenedor de Secciones */}
            <div className="steps-container">
                {stepsData.map((step, index) => {
                    const isEven = (index + 1) % 2 === 0;
                    
                    return (
                        <section 
                            key={step.num} 
                            className={`step-section ${step.colorClass}`}
                            data-step-number={step.num}
                            id={`step-${step.num}`}
                        >
                            <div className="step-content-container">
                                
                                <div className={`step-half step-image-side ${isEven ? 'order-1' : 'order-2'}`}>
                                    <motion.div 
                                        className="image-wrapper"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <img 
                                            src={imageMap[step.imageKey]} 
                                            alt={step.title}
                                            className="step-image energy-glass" 
                                        />
                                    </motion.div>
                                </div>

                                <div className={`step-half step-text-side ${isEven ? 'order-2' : 'order-1'}`}>
                                    <motion.div 
                                        className="step-text-details"
                                        initial={{ x: isEven ? 50 : -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <span className="step-tag gold-text">{step.tag}</span>
                                        <h3 className="step-small-title">{step.title}</h3>
                                        <p className="step-description">{step.desc}</p>
                                        <div className="step-footer-line"></div>
                                    </motion.div>
                                </div>

                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
};