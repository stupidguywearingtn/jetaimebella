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

  // Taille du coeur (conteneur)
  const heartSizeClasses = {
    sm: "w-64 h-64 sm:w-80 sm:h-80",
    md: "w-80 h-80 sm:w-96 sm:h-96",
    lg: "w-96 h-96 sm:w-[28rem] sm:h-[28rem]",
  };

  // Taille de l'image (plus petite que le coeur)
  const imageSizeClasses = {
    sm: "w-16 h-16 sm:w-20 sm:h-20",
    md: "w-20 h-20 sm:w-24 sm:h-24",
    lg: "w-24 h-24 sm:w-32 sm:h-32",
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
      {/* Grand coeur en arrière-plan */}
      <div 
        className={`${heartSizeClasses[size]} relative flex items-center justify-center`}
      >
        {/* Coeur rose en fond */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: "drop-shadow(0 4px 20px hsl(var(--heart) / 0.4))" }}
        >
          <path 
            d="M 50 85 C 20 60, 0 35, 10 20 C 20 5, 35 5, 50 20 C 65 5, 80 5, 90 20 C 100 35, 80 60, 50 85 Z"
            fill="hsl(var(--heart))"
            fillOpacity="0.85"
          />
        </svg>
        
        {/* Image centrée dans le coeur */}
        <div 
          className={`${imageSizeClasses[size]} relative z-10 rounded-full overflow-hidden border-4 border-white/80 shadow-lg`}
        >
          <img 
            src={imageSrc} 
            alt="Memory" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingPhotoHeart;
