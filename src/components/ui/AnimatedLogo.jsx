import React, { useState, useRef, useEffect } from 'react';

const AnimatedLogo = ({ width = "64", height = "64" }) => {
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActivated, setEasterEggActivated] = useState(false);
  const [colorPhase, setColorPhase] = useState(0);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Function to handle the easter egg click sequence
  const handleNucleusClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;

      // Activate easter egg on 5 clicks
      if (newCount === 5) {
        setEasterEggActivated(true);
        return 0; // Reset the counter
      }

      // Provide subtle feedback on each click before the easter egg
      if (newCount < 5) {
        const clickFeedback = ["Hmm?", "Curious...", "Interesting...", "Almost there..."];
        console.log(clickFeedback[newCount - 1]);
      }

      return newCount;
    });
  };

  // Animation loop for the easter egg effect
  useEffect(() => {
    if (!easterEggActivated) return;

    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Update color phase for rainbow effect
      setColorPhase(prev => (prev + deltaTime * 0.002) % 1);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Add confetti effect when easter egg is activated
    const createConfetti = () => {
      // Create a confetti canvas if it doesn't exist
      let confettiCanvas = document.getElementById('confetti-canvas');
      if (!confettiCanvas) {
        confettiCanvas = document.createElement('canvas');
        confettiCanvas.id = 'confetti-canvas';
        confettiCanvas.style.position = 'fixed';
        confettiCanvas.style.top = '0';
        confettiCanvas.style.left = '0';
        confettiCanvas.style.width = '100%';
        confettiCanvas.style.height = '100%';
        confettiCanvas.style.pointerEvents = 'none';
        confettiCanvas.style.zIndex = '9999';
        document.body.appendChild(confettiCanvas);

        // Set canvas dimensions
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
      }

      const ctx = confettiCanvas.getContext('2d');
      const confettiCount = 200;
      const confettiColors = ['#f01169', '#ff4d8d', '#ff85b3', '#ffb5d0', '#d3d3d3'];
      const confettiPieces = [];

      for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * -confettiCanvas.height,
          size: Math.random() * 10 + 5,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          speed: Math.random() * 5 + 1,
          angle: Math.random() * 2 * Math.PI,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        let anyVisible = false;

        confettiPieces.forEach(piece => {
          ctx.save();
          ctx.translate(piece.x, piece.y);
          ctx.rotate((piece.rotation * Math.PI) / 180);

          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);

          ctx.restore();

          // Update position
          piece.y += piece.speed;
          piece.x += Math.sin(piece.angle) * 2;
          piece.rotation += piece.rotationSpeed;

          // Check if any confetti is still visible
          if (piece.y < confettiCanvas.height) {
            anyVisible = true;
          }
        });

        // Continue animation if any confetti is still visible
        if (anyVisible) {
          requestAnimationFrame(animate);
        } else {
          // Remove canvas when done
          confettiCanvas.remove();
        }
      };

      animate();
    };

    createConfetti();

    // Set a timeout to automatically deactivate the easter egg
    const timeout = setTimeout(() => {
      setEasterEggActivated(false);
    }, 8000);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [easterEggActivated]);

  // Generate rainbow color based on phase
  const getRainbowColor = () => {
    const hue = (colorPhase * 360) % 360;
    return `hsl(${hue}, 100%, 60%)`;
  };

  // Generate custom styles for the easter egg
  const easterEggStyle = easterEggActivated ?
    `
    @keyframes pulse {
      0% { r: 11.42; }
      50% { r: 18; }
      100% { r: 11.42; }
    }
    .react-nucleus {
      animation: pulse 0.8s ease-in-out infinite;
      fill: ${getRainbowColor()};
      transform-origin: center;
    }
    
    .orbit-1 {
      transform-origin: 64.78px 57.92px;
      animation: orbit-spin 3s linear infinite;
    }
    
    .orbit-2 {
      transform-origin: 64.78px 57.92px;
      animation: orbit-spin-reverse 4s linear infinite;
    }
    
    .orbit-3 {
      transform-origin: 64.78px 57.92px;
      animation: orbit-spin 5s linear infinite;
    }
    ` : `
    .react-nucleus {
    }
    `;

  return (
    <div className={` flex justify-center items-center`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 129.56 115.83"
        style={{
          transition: 'transform 0.2s ease',
          width: `${width}rem`,
          height: `${height}rem`
        }}
      >
        <defs>
          <style>
            {`
              @keyframes pathReveal {
                from { stroke-dashoffset: 500; }
                to { stroke-dashoffset: 0; }
              }
              
              @keyframes fillIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              
              /* Base styles */
              .cls-1 { fill: #f01169; }
              .cls-2 { fill: #d3d3d3; }
              
              /* Path animation */
              .highlight-path {
                fill: none;
                stroke: #f01169;
                stroke-width: 1;
                stroke-dasharray: 500;
                stroke-dashoffset: 500;
                animation: pathReveal 1s ease-out forwards;
              }
              
              .fill-path {
                opacity: 0;
                animation: fillIn 1s ease-out 1s forwards;
              }
              
              ${easterEggStyle}
            `}
          </style>
        </defs>

        <g id="Livello_2" data-name="Livello 2">
          <g id="Guide">
            {/* Three orbital rings with subtle animations */}
            <path className="cls-2 orbit-ring orbit-1"
              d="M64.78,84.81C33.38,84.81,0,75.39,0,57.92S33.38,31,64.78,31s64.78,9.42,64.78,26.9S96.18,84.81,64.78,84.81Zm0-46.79C30.73,38,7,48.5,7,57.92S30.73,77.81,64.78,77.81s57.78-10.48,57.78-19.89S98.83,38,64.78,38Z" />

            <path className="cls-2 orbit-ring orbit-2"
              d="M90.2,115.83c-15,0-35.24-21.13-48.72-44.47-8.39-14.53-14.12-29.5-16.15-42.14-2.21-13.77.3-23.5,7.06-27.4,15.14-8.74,40,15.45,55.68,42.65h0c15.7,27.19,24.23,60.81,9.1,69.54A13.72,13.72,0,0,1,90.2,115.83ZM39.34,7a6.73,6.73,0,0,0-3.45.84c-3.95,2.28-5.31,9.84-3.65,20.23,1.9,11.82,7.33,25.94,15.31,39.75,17,29.49,38,44.8,46.12,40.09S99,77.45,82,48h0C67,22,49,7,39.34,7Z" />

            <path className="cls-2 orbit-ring orbit-3"
              d="M39.36,115.83a13.7,13.7,0,0,1-7-1.82c-6.76-3.9-9.27-13.63-7.06-27.4C27.36,74,33.09,59,41.48,44.47,57.19,17.27,82-6.92,97.17,1.82s6.6,42.35-9.1,69.54h0C74.6,94.7,54.38,115.83,39.36,115.83ZM90.22,7C80.56,7,62.54,22,47.55,48c-8,13.81-13.41,27.93-15.31,39.75-1.66,10.39-.3,18,3.65,20.23C44,112.66,65,97.35,82,67.86s19.81-55.28,11.66-60A6.76,6.76,0,0,0,90.22,7Z" />

            {/* Animated highlight path for the pink accent */}
            <path className="highlight-path"
              d="M102.82,35.91s0,0,0,0c-.53,2.19-1.17,4.42-1.9,6.68A138.52,138.52,0,0,1,95,57.92c-1.26,2.75-2.6,5.49-4,8.19q-1.39,2.65-2.9,5.25T85,76.5c-1.62,2.58-3.32,5.12-5.08,7.58a137.83,137.83,0,0,1-10.27,12.8q-2.4,2.64-4.84,5l-.49.47c-8.61,8.2-17.43,13.48-24.94,13.48a13.66,13.66,0,0,1-7-1.82c-6.76-3.9-9.27-13.63-7.06-27.4.35-2.17.8-4.41,1.37-6.71s1.16-4.43,1.89-6.71c2.12.61,4.38,1.19,6.75,1.7,0,0,0,0,0,0-.73,2.27-2.82,10.81-3.13,12.79-1.67,10.39-.3,18,3.65,20.23,4.75,2.75,13.88-1.33,24-11.07q2.39-2.3,4.85-5c2-2.2,4-4.59,6-7.18C72.53,82.42,74.3,80,76,77.41c2-3,4-6.18,6-9.55s3.71-6.7,5.29-10q2-4.2,3.67-8.2c1.24-3,2.3-5.94,3.21-8.74,0,0,0,0,0,0-2.87-.63-5.94-1.16-9.17-1.6-2.86-.38-5.84-.69-8.94-.91-3.61-.26-7.37-.4-11.27-.4s-7.66.14-11.26.4q-4.6.31-8.87.9a0,0,0,0,1,0,0h0a17.44,17.44,0,0,1,14.07-8.14h.1q3-.11,6-.11c2,0,4,0,6,.11,3.06.12,6.11.32,9.13.61a139.47,139.47,0,0,1,16.19,2.49C98.41,34.73,100.66,35.29,102.82,35.91Z" />

            {/* Fill path that appears after the stroke animation */}
            <path className="cls-1 fill-path"
              d="M102.82,35.91s0,0,0,0c-.53,2.19-1.17,4.42-1.9,6.68A138.52,138.52,0,0,1,95,57.92c-1.26,2.75-2.6,5.49-4,8.19q-1.39,2.65-2.9,5.25T85,76.5c-1.62,2.58-3.32,5.12-5.08,7.58a137.83,137.83,0,0,1-10.27,12.8q-2.4,2.64-4.84,5l-.49.47c-8.61,8.2-17.43,13.48-24.94,13.48a13.66,13.66,0,0,1-7-1.82c-6.76-3.9-9.27-13.63-7.06-27.4.35-2.17.8-4.41,1.37-6.71s1.16-4.43,1.89-6.71c2.12.61,4.38,1.19,6.75,1.7,0,0,0,0,0,0-.73,2.27-2.82,10.81-3.13,12.79-1.67,10.39-.3,18,3.65,20.23,4.75,2.75,13.88-1.33,24-11.07q2.39-2.3,4.85-5c2-2.2,4-4.59,6-7.18C72.53,82.42,74.3,80,76,77.41c2-3,4-6.18,6-9.55s3.71-6.7,5.29-10q2-4.2,3.67-8.2c1.24-3,2.3-5.94,3.21-8.74,0,0,0,0,0,0-2.87-.63-5.94-1.16-9.17-1.6-2.86-.38-5.84-.69-8.94-.91-3.61-.26-7.37-.4-11.27-.4s-7.66.14-11.26.4q-4.6.31-8.87.9a0,0,0,0,1,0,0h0a17.44,17.44,0,0,1,14.07-8.14h.1q3-.11,6-.11c2,0,4,0,6,.11,3.06.12,6.11.32,9.13.61a139.47,139.47,0,0,1,16.19,2.49C98.41,34.73,100.66,35.29,102.82,35.91Z" />

            {/* Electron nucleus with easter egg activation on click */}
            <circle
              className="cls-1 react-nucleus fill-path"
              onClick={handleNucleusClick}
              cx="64.78"
              cy="57.92"
              r="11.42"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo;

const AnimatedLogoWithText = ({ width = "64", height = "64" }) => {
  return (
    <div className="flex justify-center items-center flex-row">
      <AnimatedLogo width={width} height={height} className="" />
      {/* overlap "jaikiTemplate a little to the left of the logo" */}
      <style>
        {`
      @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
      }

      .fade-in {
    opacity: 0;
    animation: fadeIn 1s ease-in-out 1s forwards;
      }
    `}
      </style>
      <div className="fade-in -ml-1.5">aikiTemplate</div>
    </div>

  );
}

export { AnimatedLogoWithText };