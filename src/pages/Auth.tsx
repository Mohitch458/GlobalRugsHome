import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginAdmin } from '@/lib/storage';
import { apiLogin, apiRegister } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state?.mode === 'register') {
      setIsLogin(false);
    } else if (location.state?.mode === 'login') {
      setIsLogin(true);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Check admin login first (local)
        if (loginAdmin(email, password)) {
          toast({ title: "Welcome back, Admin!" });
          navigate('/admin');
          return;
        }

        // Real backend login
        const data = await apiLogin(email, password);
        toast({ title: "Welcome back!", description: `Logged in as ${data.user.name}` });
        navigate('/reviews');
      } else {
        if (password.length < 6) {
          toast({
            title: "Registration Failed",
            description: "Password must be at least 6 characters.",
            variant: "destructive"
          });
          return;
        }

        // Real backend register
        const data = await apiRegister(name, email, password);
        toast({ title: "Registration Successful", description: `Welcome, ${data.user.name}!` });
        navigate('/reviews');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      toast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-gradient-warm overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-background shadow-elevated relative"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-foreground mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="font-sans text-sm text-muted-foreground">
            {isLogin ? 'Sign in to access your account' : 'Join us to review our exquisite collections'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {!isLogin && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2 mt-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="John Doe"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
              Email Address / Admin Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="you@example.com or admin"
            />
          </div>
          <div>
            <label className="font-sans text-xs tracking-luxury uppercase text-muted-foreground block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-muted border border-border font-sans text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn-luxury-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground tracking-luxury">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <SocialLoginButtons isLogin={isLogin} />
        </div>

        <p className="text-center mt-6 font-sans text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-gold hover:text-accent transition-colors"
          >
            {isLogin ? 'Register here' : 'Sign In here'}
          </button>
        </p>
      </motion.div>
    </main>
  );
};

export default Auth;
