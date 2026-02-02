import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = [];
    for (let i = 0; i < 12; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 3 + 4,
        delay: Math.random() * 2,
        drift: (Math.random() - 0.5) * 100,
      });
    }
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-heart"
          style={{
            left: `${heart.x}%`,
            bottom: "-50px",
            fontSize: heart.size,
            ["--drift" as string]: `${heart.drift}px`,
            ["--duration" as string]: `${heart.duration}s`,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: -window.innerHeight - 100,
            x: heart.drift,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
