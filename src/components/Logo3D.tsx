import { useEffect, useRef } from "react";

interface Logo3DProps {
  isDark: boolean;
  className?: string;
}

export const Logo3D = ({ isDark, className = "" }: Logo3DProps) => {
  const modelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Force model-viewer to update when theme changes
    if (modelRef.current) {
      const modelViewer = modelRef.current as any;
      modelViewer.style.setProperty('--poster-color', 'transparent');
    }
  }, [isDark]);

  return (
    <model-viewer
      ref={modelRef}
      src="/assets/IM3D-LOGO.gltf"
      alt="IM 3D Logo"
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="30deg"
      camera-orbit="0deg 75deg 2.5m"
      field-of-view="30deg"
      interaction-prompt="none"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        filter: isDark ? 'none' : 'invert(1)',
        '--poster-color': 'transparent',
      } as React.CSSProperties}
    />
  );
};
