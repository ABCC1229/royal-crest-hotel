import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Components from './components-simple';

const {
  Header,
  LoadingScreen3D,
  HeroSection3D,
  SpecificationsSection3D,
  FeaturesSection3D,
  SafetySection3D,
  ApplicationForm3D,
  Footer3D
} = Components;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollY / windowHeight);
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {isLoading && <LoadingScreen3D progress={loadingProgress} />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Header />
          <main>
            <HeroSection3D />
            <SpecificationsSection3D />
            <FeaturesSection3D />
            <SafetySection3D />
            <ApplicationForm3D />
          </main>
          <Footer3D />
        </motion.div>
      )}
    </div>
  );
}

export default App;