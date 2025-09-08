import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ScissorPosition {
  x: number;
  y: number;
}

const HackathonInauguration: React.FC = () => {
  const [scissorPosition, setScissorPosition] = useState<ScissorPosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [ribbonCut, setRibbonCut] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [showTextSplit, setShowTextSplit] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cuttingAudioRef = useRef<HTMLAudioElement>(null);
  const victoryAudioRef = useRef<HTMLAudioElement>(null);

  // Initialize audio elements
  useEffect(() => {
    // Create audio elements for cutting sound and victory music
    const cuttingAudio = new Audio('/cutting-sound.mp3');
    const victoryAudio = new Audio('/victory-music.mp3');
    
    cuttingAudio.preload = 'auto';
    victoryAudio.preload = 'auto';
    victoryAudio.loop = true;
    
    cuttingAudioRef.current = cuttingAudio;
    victoryAudioRef.current = victoryAudio;
    
    return () => {
      cuttingAudio.pause();
      victoryAudio.pause();
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - containerRect.top;
    const maxY = containerRect.height - 60; // Account for scissor height
    const clampedY = Math.max(0, Math.min(relativeY, maxY));
    
    const progress = Math.min(clampedY / maxY, 1);
    setDragProgress(progress);
    
    setScissorPosition({
      x: 0, // Keep centered horizontally
      y: clampedY
    });

    // Check if scissor reached the ribbon area (around middle of screen)
    const ribbonCenterY = containerRect.height * 0.5; // 50% down from top
    if (clampedY >= ribbonCenterY - 25 && clampedY <= ribbonCenterY + 25 && !ribbonCut) {
      setRibbonCut(true);
      setIsDragging(false);
      
      // Play cutting sound immediately
      if (cuttingAudioRef.current) {
        cuttingAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Play victory music after a short delay
      setTimeout(() => {
        if (victoryAudioRef.current) {
          victoryAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 500);
      
      // Show welcome text after ribbon animation
      setTimeout(() => {
        setShowWelcomeText(true);
        
          // Show text splitting effect after display
          setTimeout(() => {
            setShowTextSplit(true);
            
            // Show website popup after text split
            setTimeout(() => {
              setShowWelcomeText(false);
              setShowWebsite(true);
            }, 1500);
          }, 3500);
      }, 800);
    }
  }, [isDragging, ribbonCut]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeY = touch.clientY - containerRect.top;
    const maxY = containerRect.height - 60;
    const clampedY = Math.max(0, Math.min(relativeY, maxY));
    
    const progress = Math.min(clampedY / maxY, 1);
    setDragProgress(progress);
    
    setScissorPosition({
      x: 0, // Keep centered horizontally
      y: clampedY
    });

    // Check if scissor reached the ribbon area
    const ribbonCenterY = containerRect.height * 0.5; // 50% down from top
    if (clampedY >= ribbonCenterY - 25 && clampedY <= ribbonCenterY + 25 && !ribbonCut) {
      setRibbonCut(true);
      setIsDragging(false);
      
      if (cuttingAudioRef.current) {
        cuttingAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Play victory music after a short delay
      setTimeout(() => {
        if (victoryAudioRef.current) {
          victoryAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 300);
      
      setTimeout(() => {
        setShowWelcomeText(true);
        setTimeout(() => {
          setShowTextSplit(true);
          setTimeout(() => {
            setShowWelcomeText(false);
            setShowWebsite(true);
          }, 1500);
        }, 3500);
      }, 800);
    }
  }, [isDragging, ribbonCut]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-background via-space-blue to-space-purple cursor-grab select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-star rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Dotted Path Line */}
      <div className="absolute left-1/2 top-0 w-0.5 h-full transform -translate-x-1/2 border-l-2 border-dashed border-gold-primary/30 opacity-50" />

      {/* Ribbon */}
      <div 
        className="absolute left-0 right-0 h-16 flex flex-row"
        style={{ 
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        {/* Left part of ribbon */}
        <div 
          className={`h-full bg-gradient-to-r from-ribbon to-ribbon-dark border-2 border-ribbon-dark shadow-2xl ${
            ribbonCut ? 'animate-ribbon-cut-left' : ''
          }`}
          style={{ 
            flex: 1,
            clipPath: 'polygon(0 0, 90% 0, 85% 100%, 0 100%)'
          }}
        />
        
        {/* Decorative Bow in Center */}
        <div className="relative flex items-center justify-center w-72 z-10">
          <img 
            src="/ribbon.png" 
            alt="Ribbon" 
            className={`w-64 h-64 object-contain transition-opacity duration-1000 ${
              ribbonCut ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
        
        {/* Right part of ribbon */}
        <div 
          className={`h-full bg-gradient-to-r from-ribbon to-ribbon-dark border-2 border-ribbon-dark shadow-2xl ${
            ribbonCut ? 'animate-ribbon-cut-right' : ''
          }`}
          style={{ 
            flex: 1,
            clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 15% 100%)'
          }}
        />
      </div>

      {/* Scissor */}
      <div
        className={`absolute left-1/2 text-6xl transform -translate-x-1/2 transition-transform duration-100 ${
          isDragging ? 'scale-110 cursor-grabbing' : 'cursor-grab hover:scale-105'
        } ${ribbonCut ? 'pointer-events-none' : ''}`}
        style={{
          top: `${scissorPosition.y}px`,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          transform: `translateX(-50%) rotate(${dragProgress * 15}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        ✂️
      </div>

      {/* Cutting progress indicator */}
      {dragProgress > 0 && !ribbonCut && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gold-primary text-xl font-bold">
          {Math.round(dragProgress * 100)}%
        </div>
      )}

      {/* Welcome Text */}
      {showWelcomeText && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className={`text-center transition-all duration-1000 w-full ${showTextSplit ? 'animate-text-split' : ''}`}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black animate-golden-glow relative overflow-hidden leading-tight drop-shadow-2xl">
              <div className="relative inline-block w-full">
                {['W', 'E', 'L', 'C', 'O', 'M', 'E'].map((letter, i) => {
                  const colors = ['text-gold-primary', 'text-gold-accent', 'text-gold-secondary'];
                  const colorClass = colors[i % colors.length];
                  return (
                    <span
                      key={i}
                      className={`inline-block animate-letter-scatter ${colorClass} ${showTextSplit && i < 4 ? 'animate-letter-split-left' : showTextSplit ? 'animate-letter-split-right' : ''}`}
                      style={{
                        animationDelay: `${i * 0.08}s`,
                        '--random-x': `${(Math.random() - 0.5) * 400}px`,
                        '--random-y': `${(Math.random() - 0.5) * 300}px`,
                        '--random-rot': `${(Math.random() - 0.5) * 180}deg`,
                        '--bounce-height': `${Math.random() * 100 + 50}px`,
                      } as any}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
              <div className="mt-2 sm:mt-4">
                {['T', 'O'].map((letter, i) => {
                  const colors = ['text-gold-secondary', 'text-gold-primary'];
                  const colorClass = colors[i % colors.length];
                  return (
                    <span
                      key={i}
                      className={`inline-block animate-letter-scatter mr-4 ${colorClass} ${showTextSplit ? 'animate-letter-split-center' : ''}`}
                      style={{
                        animationDelay: `${(i + 7) * 0.08}s`,
                        '--random-x': `${(Math.random() - 0.5) * 400}px`,
                        '--random-y': `${(Math.random() - 0.5) * 300}px`,
                        '--random-rot': `${(Math.random() - 0.5) * 180}deg`,
                        '--bounce-height': `${Math.random() * 100 + 50}px`,
                      } as any}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
              <div className="mt-2 sm:mt-4">
                {['H', 'A', 'C', 'K', 'V', 'I', 'B', 'E'].map((letter, i) => {
                  const colors = ['text-gold-accent', 'text-gold-primary', 'text-gold-secondary'];
                  const colorClass = colors[i % colors.length];
                  return (
                    <span
                      key={i}
                      className={`inline-block animate-letter-scatter ${colorClass} ${showTextSplit && i < 4 ? 'animate-letter-split-left' : showTextSplit ? 'animate-letter-split-right' : ''}`}
                      style={{
                        animationDelay: `${(i + 9) * 0.08}s`,
                        '--random-x': `${(Math.random() - 0.5) * 400}px`,
                        '--random-y': `${(Math.random() - 0.5) * 300}px`,
                        '--random-rot': `${(Math.random() - 0.5) * 180}deg`,
                        '--bounce-height': `${Math.random() * 100 + 50}px`,
                      } as any}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
              
              {/* Golden shine sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-accent to-transparent opacity-30 animate-shine-sweep" />
              
              {/* Particle burst effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gold-accent rounded-full animate-particle-burst opacity-70"
                    style={{
                      left: '50%',
                      top: '50%',
                      '--burst-x': `${(Math.random() - 0.5) * 800}px`,
                      '--burst-y': `${(Math.random() - 0.5) * 600}px`,
                      animationDelay: `${Math.random() * 2}s`,
                    } as any}
                  />
                ))}
              </div>
            </h1>
          </div>
        </div>
      )}

      {/* Website Popup */}
      {showWebsite && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden animate-scale-in">
            <iframe
              src="https://hackvibe.in"
              className="w-full h-full border-0"
              title="HACKVIBE Website"
            />
          </div>
        </div>
      )}

      {/* Instructions */}
      {!ribbonCut && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-star text-lg md:text-xl mt-2 opacity-90 animate-pulse">
            Welcome to the HACKVIBE Inauguration
          </p>
        </div>
      )}
    </div>
  );
};

export default HackathonInauguration;