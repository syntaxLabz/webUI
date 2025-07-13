import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  Code2, 
  Github, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Cpu, 
  Shield, 
  Users, 
  Zap, 
  Sparkles, 
  Lightbulb, 
  Infinity, 
  Compass, 
  Terminal, 
  Library, 
  PenTool as Tool, 
  Globe, 
  ChevronRight, 
  Star,
  Code,
  Server,
  Database,
  Layers,
  Workflow,
  Braces,
  FileCode,
  TerminalSquare,
  Search,
    CheckCircle 
} from 'lucide-react';

import { FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiGraphql, SiMongodb } from 'react-icons/si';
import Errors from './errors/Errors.tsx'

function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingIconVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      rotate: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        repeat: Infinity,
        duration: 3 + (i * 0.5),
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  // Controls for animations
  const toolsControls = useAnimation();
  const featuresControls = useAnimation();
  const librariesControls = useAnimation();
  const statsControls = useAnimation();
  const ctaControls = useAnimation();

  // Trigger animations earlier
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Trigger animations when section is 30% in view instead of waiting for full view
      if (scrollY > windowHeight * 0.3) {
        toolsControls.start("visible");
      }
      
      if (scrollY > windowHeight * 1.0) {
        featuresControls.start("visible");
        statsControls.start("visible");
      }
      
      if (scrollY > windowHeight * 1.7) {
        librariesControls.start("visible");
      }
      
      if (scrollY > windowHeight * 2.3) {
        ctaControls.start("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Start first animations immediately
    toolsControls.start("visible");
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toolsControls, featuresControls, librariesControls, statsControls, ctaControls]);

  // Typing effect for the headline
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Developer Ecosystem.';
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 grid-pattern opacity-30" style={{ zIndex: -1 }}></div>
      <div className="noise-overlay"></div>
      
      {/* Animated background gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="bg-brand-600 p-2 rounded-lg">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">SyntaxLabz</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#tools" className="nav-link">Tools</a>
              <a href="#libraries" className="nav-link">Libraries</a>
              <a href="#features" className="nav-link">Features</a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                className="btn btn-outline flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </motion.a>
            </div>
            <div className="md:hidden">
              <button className="p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Floating Tech Logos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { Icon: SiTypescript, color: "#3178C6", top: "15%", left: "10%", size: 40 },
            { Icon: FaReact, color: "#61DAFB", top: "25%", right: "15%", size: 48 },
            { Icon: SiJavascript, color: "#F7DF1E", top: "60%", left: "15%", size: 36 },
            { Icon: FaNodeJs, color: "#339933", top: "45%", right: "10%", size: 42 },
            { Icon: SiGraphql, color: "#E10098", bottom: "20%", left: "25%", size: 38 },
            { Icon: FaDocker, color: "#2496ED", bottom: "30%", right: "20%", size: 44 },
            { Icon: SiMongodb, color: "#47A248", top: "35%", left: "20%", size: 36 },
            { Icon: FaPython, color: "#3776AB", top: "20%", right: "25%", size: 40 },
            { Icon: FaJava, color: "#007396", bottom: "25%", left: "10%", size: 38 },
            { Icon: FaAws, color: "#FF9900", bottom: "15%", right: "15%", size: 42 }
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={floatingIconVariants}
              animate="animate"
              className="absolute"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                color: item.color,
                opacity: 0.7,
                filter: "drop-shadow(0 0 8px rgba(0,0,0,0.3))"
              }}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-block px-4 py-1.5 bg-brand-900/30 border border-brand-800/50 rounded-full text-brand-400 text-sm font-medium mb-6"
              >
                Developer Tools for the Modern Web
              </motion.span>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
                >
                  100x
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="block"
                >
                  {displayText}<span className="animate-pulse">|</span>
                </motion.span>
              </motion.h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed"
            >
              A platform where you'll find the right content to help you
              <br />improve your skills and grow your knowledge.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border border-neutral-700 rounded-lg bg-neutral-900/80 backdrop-blur-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Search for tools, libraries, or tutorials..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">Ctrl + K</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
  className="flex flex-wrap justify-center items-center gap-4 sm:gap-6"
>
  {/* Primary Button - Explore Tools */}
  <motion.a
    whileHover={{
      scale: 1.06,
      boxShadow: "0px 8px 20px rgba(30, 64, 175, 0.2)", // Soft blue glow
    }}
    whileTap={{ scale: 0.97 }}
    href="#explore"
    className="px-7 py-3 rounded-lg bg-[#1E40AF] hover:bg-[#1C3D99] text-white text-lg font-semibold flex items-center gap-2 shadow-md transition-all duration-300"
  >
    <span>Explore Tools</span>
    <ChevronRight className="w-5 h-5" />
  </motion.a>

  {/* Secondary Button - GitHub */}
  <motion.a
    whileHover={{
      scale: 1.06,
      boxShadow: "0px 6px 15px rgba(255, 255, 255, 0.1)", // Subtle white glow
    }}
    whileTap={{ scale: 0.97 }}
    href="https://github.com"
    target="_blank"
    rel="noopener noreferrer"
    className="px-7 py-3 rounded-lg bg-[#2D2F36] hover:bg-[#232529] text-white text-lg font-semibold flex items-center gap-2 shadow-md transition-all duration-300"
  >
    <Github className="w-5 h-5 text-gray-300" />
    <span>View on GitHub</span>
  </motion.a>
</motion.div>

            
           
          </motion.div>
        </div>
      </section>


      {/* Featured Tools Section */}
      <section className="py-32 relative preload-section" id="tools">
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={toolsControls}
            className="space-y-16"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-1.5 bg-brand-900/30 border border-brand-800/50 rounded-full text-brand-400 text-sm font-medium mb-6"
              >
                Developer Toolkit
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="section-title"
              >
                Powerful Developer Tools
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="section-subtitle"
              >
                Everything you need to build modern applications, from CLI tools to full-featured libraries
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="card card-hover"
              >
                <div className="bg-brand-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Tool className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
                <p className="text-neutral-400 mb-6">Powerful CLI tools and utilities to enhance your development workflow and boost productivity.</p>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-brand-400 flex items-center space-x-2 group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="card card-hover"
              >
                <div className="bg-accent-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Library className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Libraries</h3>
                <p className="text-neutral-400 mb-6">Modern, lightweight libraries built for performance and scalability with developer experience in mind.</p>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-accent-400 flex items-center space-x-2 group"
                >
                  <span>Explore libraries</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="card card-hover"
              >
                <div className="bg-brand-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Terminal className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">CLI Solutions</h3>
                <p className="text-neutral-400 mb-6">Command-line interfaces that make development tasks a breeze and streamline your workflow.</p>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-brand-400 flex items-center space-x-2 group"
                >
                  <span>View docs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative preload-section" id="features">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-accent-600/5 blur-[100px] rounded-full"></div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresControls}
            className="space-y-24"
          >
            <div className="text-center max-w-3xl mx-auto">
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-1.5 bg-accent-900/30 border border-accent-800/50 rounded-full text-accent-400 text-sm font-medium mb-6"
              >
                Why Choose Us
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="section-title"
              >
                Why Choose SyntaxLabz?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="section-subtitle"
              >
                Built with modern development practices and performance in mind
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={itemVariants}
                className="card card-hover"
              >
                <div className="bg-brand-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Cpu className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">High Performance</h3>
                <p className="text-neutral-400">
                  Optimized for speed and efficiency, our tools are built to handle your most demanding tasks without compromising on quality or reliability.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="card card-hover"
              >
                <div className="bg-accent-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Modern Architecture</h3>
                <p className="text-neutral-400">
                  Built with the latest technologies and best practices in mind, ensuring your projects are future-proof and maintainable.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="card card-hover"
              >
                <div className="bg-brand-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security First</h3>
                <p className="text-neutral-400">
                  Enterprise-grade security with regular updates and audits to ensure your applications remain protected against vulnerabilities.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="card card-hover"
              >
                <div className="bg-accent-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Active Community</h3>
                <p className="text-neutral-400">
                  Join thousands of developers building amazing things with our tools and contribute to our growing ecosystem.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative preload-section">
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsControls}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card card-hover text-center"
            >
              <div className="flex items-center justify-center space-x-2 text-4xl font-bold text-brand-400 mb-2">
                <Star className="w-6 h-6" />
                <span>10k+</span>
              </div>
              <p className="text-neutral-400">GitHub Stars</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card card-hover text-center"
            >
              <div className="text-4xl font-bold text-accent-400 mb-2">50+</div>
              <p className="text-neutral-400">Open Source Projects</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card card-hover text-center"
            >
              <div className="text-4xl font-bold text-brand-400 mb-2">1M+</div>
              <p className="text-neutral-400">Downloads</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card card-hover text-center"
            >
              <div className="text-4xl font-bold text-accent-400 mb-2">24/7</div>
              <p className="text-neutral-400">Support</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Libraries Section */}
      <section className="py-32 relative preload-section" id="libraries">
        <div className="absolute bottom-0 right-0 w-full h-[500px] bg-brand-600/5 blur-[100px] rounded-full"></div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={librariesControls}
            className="space-y-16"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.span 
                variants={itemVariants}
                className="inline-block px-4 py-1.5 bg-brand-900/30 border border-brand-800/50 rounded-full text-brand-400 text-sm font-medium mb-6"
              >
                Libraries
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="section-title"
              >
                Powerful Libraries for Every Need
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="section-subtitle"
              >
                From UI components to data processing, we've got you covered with our comprehensive suite of libraries
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="card card-hover h-full"
              >
                <div className="bg-brand-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">SyntaxUI</h3>
                <p className="text-neutral-400 mb-4">A comprehensive UI component library for modern web applications with accessibility built-in.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-brand">React</span>
                  <span className="badge badge-brand">Vue</span>
                  <span className="badge badge-brand">Angular</span>
                </div>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-brand-400 flex items-center space-x-2 group mt-auto"
                >
                  <span>View documentation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="card card-hover h-full"
              >
                <div className="bg-accent-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Infinity className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">DataFlow</h3>
                <p className="text-neutral-400 mb-4">Powerful data processing and state management library designed for performance and scalability.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-accent">JavaScript</span>
                  <span className="badge badge-accent">TypeScript</span>
                  <span className="badge badge-accent">Node.js</span>
                </div>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-accent-400 flex items-center space-x-2 group mt-auto"
                >
                  <span>Explore examples</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="card card-hover h-full"
              >
                <div className="bg-brand-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">TestNavigator</h3>
                <p className="text-neutral-400 mb-4">Comprehensive testing framework for modern applications with intuitive APIs and detailed reporting.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-brand">Unit Tests</span>
                  <span className="badge badge-brand">E2E</span>
                  <span className="badge badge-brand">Integration</span>
                </div>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="#"
                  className="text-brand-400 flex items-center space-x-2 group mt-auto"
                >
                  <span>View docs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
     <section className="relative py-24 text-white overflow-hidden">

      <div className="relative container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-600/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-12"
        >
          {/* Badge */}
          <div className="inline-block bg-blue-500 text-sm uppercase tracking-widest font-semibold px-4 py-2 rounded-full mb-4">
            🚀 Start Building Today
          </div>

          {/* Title */}
          <h2 className="text-4xl font-extrabold text-white">
            Take Your Projects to the Next Level
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 mt-3">
            Join thousands of developers creating high-performance applications with our cutting-edge tools.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-medium flex items-center gap-3 transition-all duration-300 shadow-lg"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-8 py-4 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 text-lg font-medium flex items-center gap-3 transition-all duration-300 border border-gray-700"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
              <span>Read Docs</span>
            </motion.a>
          </div>

          {/* Feature List */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {["100% Open Source", "Enterprise Support", "Continuous Updates"].map(
              (text, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">{text}</span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>

  

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-brand-600 p-2 rounded-lg">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <span className="text-xl font-bold">SyntaxLabz</span>
              </div>
              <p className="text-neutral-400">
                Building the future of development tools
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tools</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Libraries</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">CLI</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400">© 2025 SyntaxLabz. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
         <Errors/>
    </div>
  );
}

export default App;