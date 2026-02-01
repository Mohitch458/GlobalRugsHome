import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-warm pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-luxury text-center"
      >
        <span className="font-sans text-xs tracking-luxury uppercase text-gold mb-4 block">
          Error 404
        </span>
        <h1 className="font-serif text-6xl md:text-8xl text-foreground mb-4">
          Page Not Found
        </h1>
        <div className="gold-line-center mb-8" />
        <p className="font-sans text-muted-foreground max-w-md mx-auto mb-10">
          The page you're looking for seems to have wandered off. 
          Let us guide you back to our beautiful collection.
        </p>
        <Link to="/" className="btn-luxury-gold">
          Return Home
        </Link>
      </motion.div>
    </main>
  );
};

export default NotFound;
