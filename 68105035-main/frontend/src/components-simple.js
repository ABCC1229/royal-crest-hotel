import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Environment, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// Simple 3D Aircraft Component
const SimpleAircraft3D = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 0.3, 0.3]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.1, 1.5]} />
        <meshStandardMaterial color="#0099cc" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Simple 3D Particles
const SimpleParticles = () => {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.1} transparent opacity={0.6} />
    </points>
  );
};

// Simple Loading Screen with 3D
const LoadingScreen3D = ({ progress }) => {
  return (
    <motion.div
      className="loading-screen-3d"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div style={{ width: '100%', height: '60%' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
            <SimpleAircraft3D position={[0, 0, 0]} scale={0.8} />
          </Float>
          
          <SimpleParticles />
          
          <Text
            position={[0, -2, 0]}
            fontSize={0.2}
            color="#00d4ff"
            anchorX="center"
            anchorY="middle"
          >
            THE FUTURE IS LOADING
          </Text>
        </Canvas>
      </div>
      
      <div className="loading-progress-3d">
        <div className="progress-bar-3d">
          <motion.div
            className="progress-fill-3d"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <span className="progress-text-3d">{progress}%</span>
      </div>
    </motion.div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { text: 'Home', url: '#' },
    { text: 'Aircraft', url: '#', active: true },
    { text: 'Prototypes', url: '#' },
    { text: 'Careers', url: '#' },
    { text: 'Press', url: '#' },
    { text: 'Investors', url: '#' },
  ];

  return (
    <motion.header
      className="header-3d"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="header-container">
        <motion.div
          className="logo-3d"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="logo-text-3d">BEYOND AERO</span>
        </motion.div>
        <nav className={`nav-3d ${isMenuOpen ? 'nav-open' : ''}`}>
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.url}
              className={`nav-link-3d ${item.active ? 'nav-link-active' : ''}`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.text}
            </motion.a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.header>
  );
};

const HeroSection3D = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="hero-3d">
      <div className="hero-canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} />
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <SimpleAircraft3D position={[3, 0, 0]} scale={1.2} />
          </Float>
          
          <SimpleParticles />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      <motion.div 
        className="hero-content-3d"
        style={{ y }}
      >
        <motion.div
          className="hero-text-3d"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="hero-title-3d">A new era of flying</h1>
          <p className="hero-subtitle-3d">World's first hydrogen business light jet</p>
          <motion.button
            className="hero-cta-3d"
            whileHover={{ scale: 1.05, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Download fact sheet
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const SpecificationsSection3D = () => {
  const specifications = [
    { label: "Max. certified altitude", value: "26,000 ft — 7,925 m" },
    { label: "Takeoff ground roll (TOGR)", value: "620 m (SL, ISA)" },
    { label: "Landing field length (LFL)", value: "760 m (SL, ISA)" },
    { label: "Low cabin altitude at 26,000 ft cruise", value: "6,000 ft — 1,800 m" },
    { label: "Cruise speeds (at 26,000 ft ISA)", value: "350 KTAS — 600 NM" },
    { label: "Takeoff distance to 50 ft (TOFL 50')", value: "1,130 m (SL,ISA)" },
    { label: "Hydrogen consumption for 800 NM", value: "180 kg (70 kg reserve)" },
    { label: "Max. take-off and landing weight", value: "19,000 lb — 8,618kg" },
    { label: "Max payload", value: "8 passengers + 2 pilots" }
  ];

  return (
    <section className="specifications-3d">
      <div className="container">
        <motion.h2
          className="section-title-3d"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Technical Specifications
        </motion.h2>
        
        <div className="specs-grid-3d">
          {specifications.map((spec, index) => (
            <motion.div
              key={index}
              className="spec-card-3d"
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                rotateX: 5,
                boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)"
              }}
              viewport={{ once: true }}
            >
              <dt className="spec-label-3d">{spec.label}</dt>
              <dd className="spec-value-3d">{spec.value}</dd>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection3D = () => {
  const features = [
    {
      title: "Electric Ducted Fan Propulsion",
      description: "Advanced electric propulsion system for maximum efficiency",
      icon: "⚡"
    },
    {
      title: "Ultra-quiet Cabins",
      description: "15 dB(A) reduction in cabin noise for enhanced comfort",
      icon: "🔇"
    },
    {
      title: "Single-pilot Operation",
      description: "Advanced automation reducing operational complexity",
      icon: "👨‍✈️"
    },
    {
      title: "Panoramic Views",
      description: "27% larger elliptical windows for superior cabin experience",
      icon: "🌟"
    },
    {
      title: "High-speed Connectivity",
      description: "Stay connected during your flight with reliable internet",
      icon: "📡"
    }
  ];

  return (
    <section className="features-3d">
      <div className="container">
        <motion.h2
          className="section-title-3d"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Five reasons to fly smarter
        </motion.h2>
        
        <div className="features-grid-3d">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card-3d"
              initial={{ opacity: 0, y: 100, rotateY: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                rotateY: 10,
                rotateX: 5,
                scale: 1.05,
                boxShadow: "0 30px 60px rgba(0, 212, 255, 0.4)"
              }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-3d">{feature.icon}</div>
              <h3 className="feature-title-3d">{feature.title}</h3>
              <p className="feature-description-3d">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SafetySection3D = () => {
  const safetyFeatures = [
    {
      title: "Redundancy & Scalability",
      description: "Multiple backup systems ensure maximum safety",
      icon: "🔄"
    },
    {
      title: "Fly-by-wire Technology",
      description: "Advanced flight control systems for enhanced safety",
      icon: "🎛️"
    },
    {
      title: "Damage-tolerant Structures",
      description: "Robust construction for extreme conditions",
      icon: "🛡️"
    },
    {
      title: "T-tail Design",
      description: "Optimized aerodynamic configuration for stability",
      icon: "✈️"
    }
  ];

  return (
    <section className="safety-3d">
      <div className="container">
        <motion.h2
          className="section-title-3d"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Advanced Safety Features
        </motion.h2>
        
        <div className="safety-grid-3d">
          {safetyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="safety-card-3d"
              initial={{ opacity: 0, z: -100, rotateX: 45 }}
              whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ 
                rotateX: 10,
                rotateZ: 2,
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0, 212, 255, 0.3)"
              }}
              viewport={{ once: true }}
            >
              <div className="safety-icon-3d">{feature.icon}</div>
              <h3 className="safety-title-3d">{feature.title}</h3>
              <p className="safety-description-3d">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="safety-showcase-3d"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
              <SimpleAircraft3D position={[0, 0, 0]} scale={1} />
            </Float>
            
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1}
            />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

const ApplicationForm3D = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    linkedin: '',
    resume: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="application-3d">
      <div className="container">
        <motion.h2
          className="section-title-3d"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join Beyond Aero
        </motion.h2>
        
        {submitted ? (
          <motion.div
            className="success-message-3d"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Application Sent Successfully!</h3>
            <p>We'll get back to you as soon as possible</p>
            <motion.button
              className="back-button-3d"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go back to careers
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            className="application-form-3d"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="form-row-3d">
              <div className="form-group-3d">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group-3d">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row-3d">
              <div className="form-group-3d">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group-3d">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row-3d">
              <div className="form-group-3d">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group-3d">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group-3d">
              <label>Resume (max 4MB) *</label>
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="submit-button-3d"
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Send Application
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

const Footer3D = () => (
  <motion.footer
    className="footer-3d"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="container">
      <div className="footer-content-3d">
        <motion.div
          className="footer-brand-3d"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>BEYOND AERO</h3>
          <p>Pioneering the future of sustainable aviation</p>
        </motion.div>
        
        <div className="footer-links-3d">
          <div className="footer-section-3d">
            <h4>Company</h4>
            <motion.a href="#" whileHover={{ x: 5 }}>About</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }}>Careers</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }}>Press</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }}>Investors</motion.a>
          </div>
          <div className="footer-section-3d">
            <h4>Legal</h4>
            <motion.a href="#" whileHover={{ x: 5 }}>Privacy Policy</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }}>Legal Mentions</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }}>Terms of Service</motion.a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom-3d">
        <p>&copy; 2025 Beyond Aero. All rights reserved.</p>
      </div>
    </div>
  </motion.footer>
);

const Components = {
  Header,
  LoadingScreen3D,
  HeroSection3D,
  SpecificationsSection3D,
  FeaturesSection3D,
  SafetySection3D,
  ApplicationForm3D,
  Footer3D
};

export default Components;