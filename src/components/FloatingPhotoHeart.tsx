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

  const sizeClasses = {
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
      {/* Heart shape container with image */}
      <div 
        className={`${sizeClasses[size]} relative`}
        style={{
          clipPath: "path('M 50 85 C 20 60, 0 35, 10 20 C 20 5, 35 5, 50 20 C 65 5, 80 5, 90 20 C 100 35, 80 60, 50 85 Z')",
        }}
      >
        <img 
          src={imageSrc} 
          alt="Memory" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Heart border/glow effect */}
      <div 
        className={`absolute inset-0 ${sizeClasses[size]}`}
        style={{
          clipPath: "path('M 50 85 C 20 60, 0 35, 10 20 C 20 5, 35 5, 50 20 C 65 5, 80 5, 90 20 C 100 35, 80 60, 50 85 Z')",
          boxShadow: "0 0 20px hsl(var(--heart) / 0.4)",
        }}
      />
    </motion.div>
  );
};

export default FloatingPhotoHeart;
