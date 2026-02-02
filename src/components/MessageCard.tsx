import { motion } from "framer-motion";

interface MessageCardProps {
  emoji: string;
  text: string;
  onClick: () => void;
  delay?: number;
}

const MessageCard = ({ emoji, text, onClick, delay = 0 }: MessageCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-5 sm:p-6 card-romantic border border-border/50 
                 text-left transition-all duration-300
                 hover:border-primary/30 hover:bg-card/90
                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
                 group cursor-pointer"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-2xl sm:text-3xl group-hover:animate-wiggle">{emoji}</span>
        <span className="text-base sm:text-lg font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
          {text}
        </span>
      </div>
    </motion.button>
  );
};

export default MessageCard;
