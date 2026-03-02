import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const requestRef = useRef();
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);

  // Load images
  useEffect(() => {
    let active = true;
    for (let i = 1; i <= 240; i++) {
      const img = new Image();
      img.src = `/ezgif-33be98a2d885aeb2-jpg/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        if (!active) return;
        imagesRef.current[i - 1] = img;
      };
    }
    return () => {
      active = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const fn = (v) => {
      targetFrame.current = v * 239;
    };
    const unsubscribe = scrollYProgress.on("change", fn);
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });

    // Handle high DPI
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const loop = () => {
      // Eased interpolation
      currentFrame.current +=
        (targetFrame.current - currentFrame.current) * 0.08;

      let index = Math.round(currentFrame.current);
      index = Math.max(0, Math.min(239, index));

      const img = imagesRef.current[index];
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width;
      const height = canvas.height;

      // Draw background to match frame exact color
      context.fillStyle = "#050505";
      context.fillRect(0, 0, width, height);

      if (img && img.complete && img.width > 0) {
        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // "object-fit: contain" to ensure car entirely visible
        if (canvasRatio > imgRatio) {
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        }

        // Extremely slight slow cinematic push-in (scale up) for the first 15% scroll
        // At 0% (v=0), scale is 1.0. At 15% (v=0.15), scale is 1.05
        const v = targetFrame.current / 239;
        let pScale = 1;
        if (v <= 0.15) {
          pScale = 1 + (v / 0.15) * 0.05;
        } else {
          pScale = 1.05;
        }

        // Micro parallax depth shift: move Y slightly
        const pY = v <= 0.15 ? (v / 0.15) * (height * 0.02) : height * 0.02;

        const finalWidth = drawWidth * pScale;
        const finalHeight = drawHeight * pScale;
        const finalX = offsetX - (finalWidth - drawWidth) / 2;
        const finalY = offsetY - (finalHeight - drawHeight) / 2 + pY;

        context.drawImage(img, finalX, finalY, finalWidth, finalHeight);
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Motion transforms
  // Nav
  const navOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.05, 0.95, 1.0],
    [0, 0.5, 1, 1, 0],
  );
  const navY = useTransform(scrollYProgress, [0, 0.95, 1.0], [0, 0, -100]);

  // Text 1: 0-15% (Centered top)
  const o1 = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  // Text 2: 15-40% (Left)
  const o2 = useTransform(
    scrollYProgress,
    [0.12, 0.15, 0.37, 0.4],
    [0, 1, 1, 0],
  );
  const x2 = useTransform(scrollYProgress, [0.12, 0.15], [-40, 0]);

  // Text 3: 40-65% (Right)
  const o3 = useTransform(
    scrollYProgress,
    [0.37, 0.4, 0.62, 0.65],
    [0, 1, 1, 0],
  );
  const x3 = useTransform(scrollYProgress, [0.37, 0.4], [40, 0]);

  // Text 4: 65-85% (Left Bottom)
  const o4 = useTransform(
    scrollYProgress,
    [0.62, 0.65, 0.82, 0.85],
    [0, 1, 1, 0],
  );
  const y4 = useTransform(scrollYProgress, [0.62, 0.65], [40, 0]);

  // Text 5: 85-100% (Center Bottom lock)
  const o5 = useTransform(scrollYProgress, [0.82, 0.85, 1.0], [0, 1, 1]);
  const y5 = useTransform(scrollYProgress, [0.82, 0.85], [40, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050505]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden text-white font-sans">
        {/* Subtle Background Radial Gradient Bloom */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div
            className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #050815 0%, #050505 70%, transparent 100%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Canvas Render */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 w-full h-full object-cover"
        />

        {/* Global Nav */}
        <motion.nav
          style={{ opacity: navOpacity, y: navY }}
          className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 before:absolute before:inset-0 before:bg-[rgba(5,5,5,0.75)] before:backdrop-blur-md before:-z-10"
        >
          <div className="text-white text-xl font-bold tracking-widest font-sans">
            BRAND
          </div>
          <div className="hidden md:flex gap-8 text-white/50 text-sm font-medium tracking-wide">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a
              href="#powertrain"
              className="hover:text-white transition-colors"
            >
              Powertrain
            </a>
            <a href="#battery" className="hover:text-white transition-colors">
              Battery
            </a>
            <a
              href="#performance"
              className="hover:text-white transition-colors"
            >
              Performance
            </a>
            <a href="#specs" className="hover:text-white transition-colors">
              Specs
            </a>
          </div>
          <button className="bg-gradient-to-r from-[#050505] to-[#050505] border border-white/10 text-white px-6 py-2 rounded-full text-sm font-medium hover:border-[#00D6FF]/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0)] hover:shadow-[0_0_20px_rgba(0,214,255,0.2)]">
            Buy
          </button>
        </motion.nav>

        {/* Text Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none font-sans">
          {/* Text 1 */}
          <motion.div
            style={{ opacity: o1, y: y1 }}
            className="absolute inset-x-0 top-[15vh] flex flex-col items-center justify-start pointer-events-none px-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white/90">
              FLAGSHIP X
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mt-2 font-light">
              Pure electric dominance.
            </p>
            <p className="text-sm md:text-base text-white/50 max-w-xl text-center mt-6 leading-relaxed">
              Mastering the elements. Engineered for absolute silence,
              unrestrained control, and uncompromising performance.
            </p>
          </motion.div>

          {/* Text 2 */}
          <motion.div
            style={{ opacity: o2, x: x2 }}
            className="absolute inset-y-0 left-6 md:left-24 flex flex-col justify-center pointer-events-none max-w-sm lg:max-w-md"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/90 leading-tight">
              Precision-built
              <br />
              architecture.
            </h2>
            <div className="w-12 h-[2px] bg-white/20 my-6 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Unrivaled structural rigidity. High-speed stability. Aerodynamic
              intelligence seamlessly integrated into the carbon monocoque
              chassis.
            </p>
          </motion.div>

          {/* Text 3 */}
          <motion.div
            style={{ opacity: o3, x: x3 }}
            className="absolute inset-y-0 right-6 md:right-24 flex flex-col justify-center items-end pointer-events-none max-w-sm lg:max-w-md text-right"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#00D6FF] leading-tight drop-shadow-[0_0_15px_rgba(0,214,255,0.3)]">
              High-density
              <br />
              <span className="text-white/90">performance battery.</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#00D6FF] my-6 shadow-[0_0_10px_rgba(0,214,255,0.5)]"></div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Long-range lithium architecture. Active thermal regulation.
              Real-time intelligent energy management constantly pulsing through
              the system.
            </p>
          </motion.div>

          {/* Text 4 */}
          <motion.div
            style={{ opacity: o4, y: y4 }}
            className="absolute inset-x-0 bottom-[15vh] flex flex-col items-center justify-end pointer-events-none px-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/90">
              Instant torque.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050FF] to-[#00D6FF]">
                Absolute control.
              </span>
            </h2>
            <p className="text-white/60 text-sm md:text-base mt-4 max-w-2xl text-center leading-relaxed">
              Uncompromising propulsion precision. Adaptive drive algorithms.
              Next-generation regenerative intelligence tracking every wheel
              rotation.
            </p>
          </motion.div>

          {/* Text 5 */}
          <motion.div
            style={{ opacity: o5, y: y5 }}
            className="absolute inset-x-0 bottom-[10vh] flex flex-col items-center justify-end px-6 pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/90">
              Command the future.
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mt-3 font-light tracking-wide">
              Engineered in carbon. Powered by code.
            </p>
            <div className="flex gap-6 mt-10 pointer-events-auto">
              <button className="px-8 py-3 rounded-full text-white/90 font-medium text-sm transition-all shadow-[0_0_20px_rgba(0,214,255,0.15)] hover:shadow-[0_0_30px_rgba(0,214,255,0.35)] relative group overflow-hidden bg-white/5 backdrop-blur-sm">
                <span className="absolute inset-0 border border-white/20 rounded-full group-hover:border-[#00D6FF]/60 transition-colors duration-300"></span>
                <span className="relative z-10 text-white transition-colors">
                  Experience the Drive
                </span>
              </button>
              <button className="px-8 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">
                Explore Specifications
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
