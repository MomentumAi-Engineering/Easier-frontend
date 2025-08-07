import React, { useEffect, useState, useMemo, useRef } from 'react';
// Mock components for demonstration
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// Enhanced mock framer-motion components
const motion = {
  div: ({ children, className, initial, animate, transition, whileInView, whileHover, whileTap, style, ...props }) => (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  ),
  h2: ({ children, className, initial, whileInView, transition, ...props }) => (
    <h2 className={className} {...props}>
      {children}
    </h2>
  )
};

// Mock react-intersection-observer
const useInView = (options) => {
  return [React.useRef(), true]; // Always return true for demo
};

// Enhanced mock react-icons
const FiUpload = ({ className, size }) => <span className={className}>🔧</span>;
const FiMapPin = ({ className, size }) => <span className={className}>📍</span>;
const FiFileText = ({ className, size }) => <span className={className}>📄</span>;
const FiCheckCircle = ({ className, size }) => <span className={className}>✅</span>;
const FiClock = ({ className, size }) => <span className={className}>⏱️</span>;
const FiUsers = ({ className, size }) => <span className={className}>👥</span>;

function FeatureCard({ icon, title, description, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div
      ref={ref}
      className="feature-card-container"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay * 0.2}s`
      }}
    >
      <div className="feature-card">
        <div className="feature-icon">
          {icon}
        </div>
        <h5 className="feature-title">{title}</h5>
        <p className="feature-description">{description}</p>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, number, label, suffix = '', delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (inView) {
      const target = parseInt(number.replace(/\D/g, ''));
      const increment = target / 50;
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < target) {
            return Math.ceil(prev + increment);
          } else {
            clearInterval(timer);
            return target;
          }
        });
      }, 30);
      
      return () => clearInterval(timer);
    }
  }, [inView, number]);
  
  return (
    <motion.div
      ref={ref}
      className="stat-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay * 0.2}s`
      }}
    >
      <div className="stat-icon">{icon}</div>
      <h3 className="stat-number">{count}{suffix}</h3>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
}

function TestimonialCard({ name, role, content, avatar, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div
      ref={ref}
      className="testimonial-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay * 0.2}s`
      }}
    >
      <div className="testimonial-content">
        <p className="testimonial-text">"{content}"</p>
        <div className="testimonial-author">
          <div className="testimonial-avatar">{avatar}</div>
          <div>
            <h4 className="testimonial-name">{name}</h4>
            <p className="testimonial-role">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Prepare stable random values for floating elements
  const floatingElements = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 10 + Math.random() * 30,
      height: 10 + Math.random() * 30,
      opacity: 0.05 + Math.random() * 0.15,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 6,
      blur: Math.random() > 0.5 ? 'blur(1px)' : 'none',
    }));
  }, []);
  
  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "City Council Member",
      content: "SnapFix AI has revolutionized how we handle citizen reports. The AI classification saves us countless hours of manual sorting.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content: "When my storefront was damaged, SnapFix AI helped me report it instantly. The issue was resolved within 24 hours!",
      avatar: "👨‍💼"
    },
    {
      name: "Emma Rodriguez",
      role: "Community Volunteer",
      content: "I love how easy it is to report issues in my neighborhood. SnapFix AI makes community engagement effortless.",
      avatar: "👩‍🦱"
    }
  ];
  
  return (
    <div className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section with Parallax Effect */}
      <section className="hero-section" ref={heroRef}>
        <div 
          className="hero-bg" 
          style={{ 
            transform: `translateY(${scrollY * 0.4}px)`,
            background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #3182ce 100%)',
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Animated floating elements */}
          <div className="floating-elements">
            {floatingElements.map((item, i) => (
              <div
                key={i}
                className="floating-element"
                style={{
                  position: 'absolute',
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  filter: item.blur,
                  animation: `float ${item.animationDuration}s ease-in-out infinite`,
                  animationDelay: `${item.animationDelay}s`,
                  pointerEvents: 'none'
                }}
              />
            ))}
          </div>
          
          {/* Animated grid overlay */}
          <div className="grid-overlay"></div>
          
          <div className="hero-content">
            <motion.div
              className="hero-text"
              style={{
                textAlign: 'center',
                color: 'white',
                zIndex: 10,
                position: 'relative',
                maxWidth: '900px',
                padding: '0 20px'
              }}
            >
              <div className="hero-badge">AI-POWERED SOLUTION</div>
              <h1 className="hero-title">
                <span className="brand-name">SnapFix</span> AI
              </h1>
              <p className="hero-subtitle">
                Transform your community with intelligent issue reporting. Our AI analyzes and categorizes problems in real-time for faster resolution.
              </p>
              <div className="hero-cta">
                <Link to="/report" className="cta-button primary">
                  Report an Issue <span>→</span>
                </Link>
                <Link to="/demo" className="cta-button secondary">
                  Watch Demo
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <motion.div className="section-badge">CORE FEATURES</motion.div>
            <motion.h2 className="section-title">
              Why <span className="brand-highlight">SnapFix AI</span> Stands Apart
            </motion.h2>
            <p className="section-subtitle">
              Our advanced AI technology streamlines the entire issue resolution process
            </p>
          </div>
          
          <div className="features-grid">
            <FeatureCard
              icon={<FiUpload className="feature-icon-element" size={32} />}
              title="Smart AI Analysis"
              description="Our neural networks instantly classify issues as public or business-related with 95% accuracy."
              delay={0}
            />
            <FeatureCard
              icon={<FiMapPin className="feature-icon-element" size={32} />}
              title="Precision Location"
              description="GPS and visual data pinpoint exact locations for faster response times."
              delay={1}
            />
            <FeatureCard
              icon={<FiFileText className="feature-icon-element" size={32} />}
              title="Automated Reporting"
              description="Generate professional reports automatically sent to the appropriate authorities."
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-header light">
            <motion.div className="section-badge">IMPACT METRICS</motion.div>
            <motion.h2 className="section-title">
              Making a <span className="brand-highlight">Measurable Difference</span>
            </motion.h2>
          </div>
          
          <div className="stats-grid">
            <StatCard
              icon={<FiCheckCircle className="stat-icon-element" size={28} />}
              number="12K+"
              label="Issues Resolved"
              delay={0}
            />
            <StatCard
              icon={<FiClock className="stat-icon-element" size={28} />}
              number="18"
              label="Avg. Resolution (hours)"
              delay={1}
            />
            <StatCard
              icon={<FiUsers className="stat-icon-element" size={28} />}
              number="95%"
              label="User Satisfaction"
              suffix="%"
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <motion.div className="section-badge">SUCCESS STORIES</motion.div>
            <motion.h2 className="section-title">
              What Our <span className="brand-highlight">Users Say</span>
            </motion.h2>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div className="cta-content">
            <div className="cta-badge">JOIN THE MOVEMENT</div>
            <h2 className="cta-title">Ready to Improve Your Community?</h2>
            <p className="cta-subtitle">
              Join thousands of users making a difference with AI-powered issue reporting
            </p>
            <div className="cta-buttons">
              <Link to="/report" className="cta-button primary">
                Get Started Now
              </Link>
              <Link to="/features" className="cta-button secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="brand-name">SnapFix</span> AI
            </div>
            <div className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/features">Features</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} SnapFix AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .home-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .home-page.loaded {
          opacity: 1;
        }
        
        /* Hero Section */
        .hero-section {
          position: relative;
          overflow: hidden;
        }
        
        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: white;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hero-title {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          text-shadow: 0 4px 12px rgba(0,0,0,0.25);
          letter-spacing: -1px;
        }
        
        .brand-name {
          background: linear-gradient(90deg, #63b3ed, #90cdf4, #bee3f8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: none;
          position: relative;
          display: inline-block;
        }
        
        .brand-name::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: rgba(99, 179, 237, 0.3);
          border-radius: 4px;
          z-index: -1;
        }
        
        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          margin-bottom: 2.5rem;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 300;
        }
        
        .hero-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button.primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }
        
        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.5);
        }
        
        .cta-button.secondary {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-3px);
        }
        
        .cta-button span {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }
        
        .cta-button:hover span {
          transform: translateX(3px);
        }
        
        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 1;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        
        .scroll-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
        }
        
        /* Features Section */
        .features-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          position: relative;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-badge {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }
        
        .section-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .brand-highlight {
          color: #3b82f6;
          position: relative;
        }
        
        .brand-highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 3px;
          z-index: -1;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }
        
        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #3b82f6, #2563eb);
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 10px rgba(0, 0, 0, 0.08);
        }
        
        .feature-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
          border-radius: 20px;
          margin-bottom: 1.8rem;
          color: #3b82f6;
          font-size: 2.5rem;
          position: relative;
        }
        
        .feature-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }
        
        .feature-card:hover .feature-icon::after {
          opacity: 0.1;
        }
        
        .feature-icon-element {
          color: #3b82f6;
          font-size: 2.5rem;
        }
        
        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        
        .feature-description {
          color: #64748b;
          line-height: 1.7;
          margin: 0;
          font-size: 1.05rem;
        }
        
        /* Stats Section */
        .stats-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #1e40af, #1d4ed8, #2563eb);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIvPjwvcGF0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+');
          opacity: 0.4;
          z-index: 0;
        }
        
        .section-header.light .section-badge {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
        }
        
        .section-header.light .section-title {
          color: white;
        }
        
        .section-header.light .brand-highlight::after {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          position: relative;
          z-index: 1;
        }
        
        .stat-card {
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-10px);
        }
        
        .stat-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 1.8rem;
        }
        
        .stat-number {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1;
          background: linear-gradient(90deg, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .stat-label {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 300;
        }
        
        /* Testimonials Section */
        .testimonials-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        
        .testimonial-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 100%;
          overflow: hidden;
        }
        
        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 10px rgba(0, 0, 0, 0.08);
        }
        
        .testimonial-content {
          padding: 2rem;
        }
        
        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
        }
        
        .testimonial-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          margin-right: 1rem;
        }
        
        .testimonial-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          color: #1e293b;
        }
        
        .testimonial-role {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }
        
        /* CTA Section */
        .cta-section {
          padding: 6rem 0;
          background: linear-gradient(135deg, #1e293b, #334155);
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2), transparent 50%);
          z-index: 0;
        }
        
        .cta-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .cta-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.2);
          color: #90cdf4;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }
        
        .cta-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: white;
        }
        
        .cta-subtitle {
          font-size: 1.2rem;
          color: #cbd5e1;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-button.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        /* Footer */
        .footer {
          padding: 3rem 0;
          background: #0f172a;
          color: #94a3b8;
        }
        
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .footer-logo {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }
        
        .footer-links {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #3b82f6;
        }
        
        .footer-copyright {
          font-size: 0.9rem;
          opacity: 0.7;
        }
        
        /* Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        .floating-element {
          animation: float 8s ease-in-out infinite;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .hero-content {
            padding: 2rem 1rem;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }
        
        @media (max-width: 480px) {
          .feature-card {
            padding: 1.5rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .cta-button, .cta-button-secondary {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;