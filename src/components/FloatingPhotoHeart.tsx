import { motion } from "framer-motion";

interface FloatingPhotoHeartProps {
  imageSrc: string;
  position: "top-right" | "bottom-right" | "top-left" | "bottom-left" | "center-right" | "center-left";
  size?: "sm" | "md" | "lg";
  delay?: number;
}

const FloatingPhotoHeart = ({ imageSrc, position, size = "md", delay = 0 }: FloatingPhotoHeartProps) => {
  const positionClasses = {
    "top-right": "top-8 right-4 sm:top-12 sm:right-8",
    "bottom-right": "bottom-24 right-4 sm:bottom-32 sm:right-8",
    "top-left": "top-8 left-20 sm:top-12 sm:left-24",
    "bottom-left": "bottom-24 left-20 sm:bottom-32 sm:left-24",
    "center-right": "top-1/3 right-4 sm:right-8",
    "center-left": "top-1/3 left-20 sm:left-24",
  };

  // Taille du coeur (grand)
  const heartSizeClasses = {
    sm: "w-64 h-64 sm:w-80 sm:h-80",
    md: "w-80 h-80 sm:w-96 sm:h-96",
    lg: "w-96 h-96 sm:w-[28rem] sm:h-[28rem]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5, ease: "easeOut" },
        y: { 
          delay: delay + 0.5, 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
      className={`fixed ${positionClasses[position]} z-10 pointer-events-none`}
    >
      <div 
        className={`${heartSizeClasses[size]} relative`}
        style={{ filter: "drop-shadow(0 8px 25px hsl(var(--heart) / 0.5))" }}
      >
        {/* Image découpée en forme de coeur */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id={`heartClip-${position}-${delay}`}>
              <path d="M 50 88 C 15 55, -5 30, 12 15 C 25 2, 40 5, 50 18 C 60 5, 75 2, 88 15 C 105 30, 85 55, 50 88 Z" />
            </clipPath>
          </defs>
          
          {/* Bordure du coeur */}
          <path 
            d="M 50 88 C 15 55, -5 30, 12 15 C 25 2, 40 5, 50 18 C 60 5, 75 2, 88 15 C 105 30, 85 55, 50 88 Z"
            fill="hsl(var(--heart))"
            stroke="white"
            strokeWidth="3"
          />
          
          {/* Image dans le coeur */}
          <image 
            href={imageSrc}
            x="5"
            y="5"
            width="90"
            height="90"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#heartClip-${position}-${delay})`}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default FloatingPhotoHeart;
