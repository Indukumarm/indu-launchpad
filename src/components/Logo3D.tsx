import { useEffect, useRef } from "react";

interface Logo3DProps {
  className?: string;
}

export const Logo3D = ({ className = "" }: Logo3DProps) => {
  const modelRef = useRef<HTMLElement>(null);

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
      src="/assets/IM3DLoGo-White.glb"
      alt="IM 3D Logo"
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="30deg"
      camera-orbit="0deg 75deg 3.5m"
      field-of-view="35deg"
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
