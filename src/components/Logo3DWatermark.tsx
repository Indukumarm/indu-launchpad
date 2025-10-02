import { useEffect, useRef, useState } from "react";

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

export const Logo3DWatermark = () => {
  const [scrollRotation, setScrollRotation] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const modelRef = useRef<HTMLElement>(null);
  const isDark = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      const rotation = (currentScrollY * 0.1) % 360;
      setScrollRotation(rotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (modelRef.current) {
      const modelViewer = modelRef.current as any;
      modelViewer.style.setProperty('--poster-color', 'transparent');
    }
  }, []);

  // Parallax effect calculation
  const parallaxY = scrollY * 0.3;
  const parallaxScale = 1 + (scrollY * 0.0001);

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 hidden md:block transition-transform duration-100"
      style={{
        maskImage: 'radial-gradient(closest-side, rgba(0,0,0,0.35), transparent 80%)',
        WebkitMaskImage: 'radial-gradient(closest-side, rgba(0,0,0,0.35), transparent 80%)',
        transform: `translateY(${parallaxY}px) scale(${Math.min(parallaxScale, 1.2)})`,
      }}
    >
      <model-viewer
        ref={modelRef}
        src={isDark ? "/assets/IM3DLoGo-White.glb" : "/assets/IM3D-LOGO.gltf"}
        alt="Background logo watermark"
        camera-orbit={`${scrollRotation}deg 75deg 6m`}
        field-of-view="40deg"
        interaction-prompt="none"
        className={isDark ? "opacity-[0.20] blur-sm" : "opacity-[0.08] blur-sm"}
        style={{
          width: '100%',
          height: '100%',
          '--poster-color': 'transparent',
          filter: isDark 
            ? 'sepia(0.8) saturate(2.8) hue-rotate(140deg) brightness(1.1)' 
            : 'sepia(0.3) saturate(1.5) hue-rotate(180deg) brightness(1.3)',
        } as React.CSSProperties}
      />
    </div>
  );
};
