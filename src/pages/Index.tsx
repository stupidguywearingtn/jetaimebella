import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageCard from "@/components/MessageCard";
import ActionButton from "@/components/ActionButton";
import FloatingHearts from "@/components/FloatingHearts";

type Step = "selection" | "question" | "response-ok" | "response-talk";

interface Message {
  emoji: string;
  text: string;
}

const messages: Message[] = [
  { emoji: "💔", text: "Tu me manques un peu là..." },
  { emoji: "😔", text: "Ce que tu m'as dit m'a blessé" },
  { emoji: "💬", text: "Il faut qu'on parle d'un truc" },
  { emoji: "✨", text: "Il faut qu'on mette les choses au clair" },
];

const Index = () => {
  const [step, setStep] = useState<Step>("selection");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setStep("question");
  };

  const handleReset = () => {
    setStep("selection");
    setSelectedMessage(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-secondary/50 via-background to-muted/30 -z-10" />
      
      <AnimatePresence mode="wait">
        {/* STEP 1: Selection */}
        {step === "selection" && (
          <motion.div
            key="selection"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md mx-auto"
          >
            <div className="text-center mb-8 sm:mb-10">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 sm:mb-4"
              >
                Hey... j'avais besoin de te dire un truc{" "}
                <span className="inline-block animate-pulse-soft">💭</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base sm:text-lg text-muted-foreground font-medium"
              >
                Choisis ce qui correspond le mieux à ce que tu ressens :
              </motion.p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {messages.map((message, index) => (
                <MessageCard
                  key={index}
                  emoji={message.emoji}
                  text={message.text}
                  onClick={() => handleSelectMessage(message)}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Question */}
        {step === "question" && selectedMessage && (
          <motion.div
            key="question"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <span className="text-4xl sm:text-5xl mb-3 inline-block animate-pulse-soft">
                {selectedMessage.emoji}
              </span>
              <p className="text-lg sm:text-xl text-muted-foreground font-semibold">
                {selectedMessage.text}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-8 sm:mb-10"
            >
              Est-ce que tout va bien entre nous ?{" "}
              <span className="text-heart">💕</span>
            </motion.h2>

            <div className="flex flex-col gap-3 sm:gap-4">
              <ActionButton
                variant="primary"
                onClick={() => setStep("response-ok")}
                delay={0.5}
              >
                Oui, tout va bien ❤️
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={() => setStep("response-talk")}
                delay={0.6}
              >
                On peut parler ? 💬
              </ActionButton>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleReset}
              className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              ← Retour
            </motion.button>
          </motion.div>
        )}

        {/* Response: All good */}
        {step === "response-ok" && (
          <motion.div
            key="response-ok"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md mx-auto text-center relative"
          >
            <FloatingHearts />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <span className="text-6xl sm:text-7xl mb-6 inline-block animate-pulse-soft">
                🥰
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Ouf, ça me rassure
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground font-semibold">
                Je t'aime tu sais <span className="text-heart">❤️</span>
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleReset}
              className="mt-10 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium relative z-10"
            >
              ← Retour
            </motion.button>
          </motion.div>
        )}

        {/* Response: Need to talk */}
        {step === "response-talk" && (
          <motion.div
            key="response-talk"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-5xl sm:text-6xl mb-6 inline-block animate-pulse-soft">
                💕
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                Je suis là quand tu veux.
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-semibold mb-8 sm:mb-10">
                Pour de vrai. 💕
              </p>
            </motion.div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <ActionButton
                variant="contact"
                href="https://instagram.com/stupidguy.fx"
                delay={0.4}
              >
                💌 M'envoyer un message
              </ActionButton>
              <ActionButton
                variant="contact"
                href="https://wa.me/33668823396?text=Hey%20j%27ai%20vu%20ton%20message"
                delay={0.5}
              >
                📱 M'appeler sur WhatsApp
              </ActionButton>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleReset}
              className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              ← Retour
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
