import { useEffect, useRef, useState } from "react";

export const Logo3DWatermark = () => {
  const [scrollRotation, setScrollRotation] = useState(0);
  const modelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = (scrollY * 0.1) % 360;
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

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 hidden md:block"
      style={{
        maskImage: 'radial-gradient(closest-side, rgba(0,0,0,0.12), transparent 70%)',
        WebkitMaskImage: 'radial-gradient(closest-side, rgba(0,0,0,0.12), transparent 70%)',
      }}
    >
      <model-viewer
        ref={modelRef}
        src="/assets/IM3D-LOGO.gltf"
        alt="Background logo watermark"
        camera-orbit={`${scrollRotation}deg 75deg 5m`}
        field-of-view="45deg"
        interaction-prompt="none"
        className="opacity-[0.06] dark:opacity-[0.08]"
        style={{
          width: '100%',
          height: '100%',
          '--poster-color': 'transparent',
          filter: 'sepia(1) saturate(3) hue-rotate(180deg) brightness(1.2)',
        } as React.CSSProperties}
      />
    </div>
  );
};
