import { useEffect, useRef, useState } from "react";

interface Logo3DProps {
  className?: string;
}

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

export const Logo3D = ({ className = "" }: Logo3DProps) => {
  const modelRef = useRef<HTMLElement>(null);
  const isDark = useTheme();

  useEffect(() => {
    // Force model-viewer to update when theme changes
    if (modelRef.current) {
      const modelViewer = modelRef.current as any;
      modelViewer.style.setProperty('--poster-color', 'transparent');
    }
  }, []);

  return (
    <model-viewer
      ref={modelRef}
      src={isDark ? "/assets/IM3DLoGo-White.glb" : "/assets/IM3D-LOGO.gltf"}
      alt="IM 3D Logo"
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="30deg"
      camera-orbit="0deg 75deg 4.5m"
      field-of-view="45deg"
      interaction-prompt="none"
      className={`filter transition-[filter] duration-300 brightness-0 dark:brightness-[3] dark:invert dark:contrast-125 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        '--poster-color': 'transparent',
      } as React.CSSProperties}
    />
  );
};
