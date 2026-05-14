import { motion } from "framer-motion";
import "./SplashScreen.css";

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <motion.div
        className="bowl-wrapper"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="rice-bowl"
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <div className="rice"></div>
          <div className="face">
            <span className="eye"></span>
            <span className="eye"></span>
          </div>
          <div className="smile"></div>
          <div className="leaf"></div>
        </motion.div>
      </motion.div>

      <motion.h1
        className="nomly-title"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        Nomly
      </motion.h1>

      <motion.p
        className="tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2 }}
      >
        Eat smart. Spend better. Feel at home.
      </motion.p>
    </div>
  );
}