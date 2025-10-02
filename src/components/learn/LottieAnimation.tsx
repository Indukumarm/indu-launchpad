import { useState, useEffect } from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export const LottieAnimation = ({ 
  src, 
  loop = true, 
  autoplay = true,
  className = "" 
}: LottieAnimationProps) => {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setError(true));
  }, [src]);

  if (error) {
    return (
      <div className="my-8 p-6 bg-muted/30 rounded-lg border border-[hsl(var(--domain-accent))]/20 text-center">
        <p className="text-sm text-muted-foreground">
          Animation placeholder: {src.split('/').pop()}
        </p>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className="my-8 p-6 bg-muted/30 rounded-lg border border-[hsl(var(--domain-accent))]/20 animate-pulse">
        <div className="h-48 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading animation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};
