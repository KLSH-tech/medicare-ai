import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isReturningUser, setIsReturningUser] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAppContext();

  const from = location.state?.from || '/chat';

  // Check if user has logged in before on this device
  useEffect(() => {
    const hasLoggedInBefore = localStorage.getItem('hasLoggedIn');
    if (hasLoggedInBefore === 'true') {
      setIsReturningUser(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock authentication
    const mockUser = { 
      name: name || email.split('@')[0], 
      email, 
      credits: 100 
    };
    
    setUser(mockUser);
    
    // Mark that user has logged in on this device
    localStorage.setItem('hasLoggedIn', 'true');
    localStorage.setItem('lastLoginEmail', email);
    
    // Redirect to intended destination
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white dark:bg-gradient-to-br dark:from-n-8 dark:via-n-7 dark:to-n-8">
      {/* Background gradient orbs */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-20 left-1/4 w-96 h-96 bg-radial-gradient from-color-1/20 to-transparent blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-1/4 w-96 h-96 bg-radial-gradient from-color-5/15 to-transparent blur-3xl animate-pulse [animation-delay:1s]'></div>
      </div>

      {/* Login Form Container */}
      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white/70 dark:bg-n-7/70 backdrop-blur-2xl border border-n-3/30 dark:border-n-5/30 shadow-2xl p-8 sm:p-10">
          
          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-color-1/5 via-transparent to-color-5/5 pointer-events-none'></div>

          <div className="relative z-10 space-y-8">
            {/* Header - Dynamic based on returning user */}
            <div className="text-center space-y-3">
              <h1 className="h3 text-gray-900 dark:text-n-1">
                {state === "login" 
                  ? (isReturningUser ? "Welcome Back" : "Welcome to Medicare")
                  : "Create Account"
                }
              </h1>
              <p className="body-2 text-n-4 dark:text-n-3">
                {state === "login" 
                  ? (isReturningUser 
                      ? "Sign in to continue to your health dashboard" 
                      : "Get started with your AI-powered health assistant")
                  : "Join our community to get started"}
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Name Field (Register only) */}
              {state === "register" && (
                <div className="relative">
                  <label 
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || name
                        ? '-top-2.5 text-xs bg-white dark:bg-n-7 px-2 text-color-1'
                        : 'top-3.5 text-sm text-n-4 dark:text-n-3'
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    value={name}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 outline-none transition-all duration-300 focus:border-color-1 focus:bg-white dark:focus:bg-n-7"
                    type="text"
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <label 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || email
                      ? '-top-2.5 text-xs bg-white dark:bg-n-7 px-2 text-color-1'
                      : 'top-3.5 text-sm text-n-4 dark:text-n-3'
                  }`}
                >
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  value={email}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 outline-none transition-all duration-300 focus:border-color-1 focus:bg-white dark:focus:bg-n-7"
                  type="email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'password' || password
                      ? '-top-2.5 text-xs bg-white dark:bg-n-7 px-2 text-color-1'
                      : 'top-3.5 text-sm text-n-4 dark:text-n-3'
                  }`}
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  value={password}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 outline-none transition-all duration-300 focus:border-color-1 focus:bg-white dark:focus:bg-n-7"
                  type="password"
                  required
                />
              </div>

              {/* Forgot Password (Login only) */}
              {state === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    className="caption text-color-1 hover:text-color-5 transition-colors duration-300"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-color-1 to-color-5 text-white shadow-lg shadow-color-1/30 hover:shadow-xl hover:shadow-color-1/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              {state === "register" ? "Create Account" : "Sign In"}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-n-3/30 dark:border-n-5/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 dark:bg-n-7/70 text-n-4 dark:text-n-3 caption">
                  OR
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 hover:bg-white dark:hover:bg-n-7 hover:border-color-1/50 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 hover:bg-white dark:hover:bg-n-7 hover:border-color-1/50 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>

            {/* Toggle Login/Register */}
            <div className="text-center">
              <p className="body-2 text-n-4 dark:text-n-3">
                {state === "register" 
                  ? "Already have an account? " 
                  : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setState(state === "login" ? "register" : "login")}
                  className="text-color-1 hover:text-color-5 font-medium transition-colors duration-300"
                >
                  {state === "register" ? "Sign In" : "Create Account"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="caption text-n-4 dark:text-n-3 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-color-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Secure authentication with end-to-end encryption
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
