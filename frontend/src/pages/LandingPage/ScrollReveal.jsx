// ScrollReveal.jsx
import { motion } from "framer-motion";

export default function ScrollReveal({ children, style }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ width: "100%", ...style }}
    >
      {children}
    </motion.div>
  );
}