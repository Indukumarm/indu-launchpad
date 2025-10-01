import { useEffect, useRef, useState } from "react";

interface Logo3DWatermarkProps {
  isDark: boolean;
}

export const Logo3DWatermark = ({ isDark }: Logo3DWatermarkProps) => {
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
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
      <model-viewer
        ref={modelRef}
        src="/assets/IM3D-LOGO.gltf"
        alt="Background logo watermark"
        camera-orbit={`${scrollRotation}deg 75deg 5m`}
        field-of-view="45deg"
        interaction-prompt="none"
        style={{
          width: '100%',
          height: '100%',
          opacity: isDark ? 0.05 : 0.08,
          filter: isDark ? 'none' : 'invert(1)',
          '--poster-color': 'transparent',
        } as React.CSSProperties}
      />
    </div>
  );
};
