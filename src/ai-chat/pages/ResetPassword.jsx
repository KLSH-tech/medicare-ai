import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match!");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);
    
    try {
      const { data } = await axios.post(`/api/user/reset-password/${token}`, { password });
      
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white dark:bg-gradient-to-br dark:from-n-8 dark:via-n-7 dark:to-n-8">
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute top-20 left-1/4 w-96 h-96 bg-radial-gradient from-color-1/20 to-transparent blur-3xl animate-pulse'></div>
          <div className='absolute bottom-20 right-1/4 w-96 h-96 bg-radial-gradient from-color-5/15 to-transparent blur-3xl animate-pulse [animation-delay:1s]'></div>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="relative z-10 w-full max-w-md"
        >
          <div className="relative rounded-3xl overflow-hidden bg-white/70 dark:bg-n-7/70 backdrop-blur-2xl border border-n-3/30 dark:border-n-5/30 shadow-2xl p-8 sm:p-10">
            
            <div className='absolute inset-0 bg-gradient-to-br from-color-1/5 via-transparent to-color-5/5 pointer-events-none'></div>

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-color-1 to-color-5 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="h3 text-gray-900 dark:text-n-1">Reset Password</h1>
                <p className="body-2 text-n-4 dark:text-n-3">
                  Enter your new password below
                </p>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 outline-none transition-all duration-300 focus:border-color-1 focus:bg-white dark:focus:bg-n-7"
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-n-4 hover:text-color-1 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 outline-none transition-all duration-300 focus:border-color-1 focus:bg-white dark:focus:bg-n-7"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    required
                    minLength={6}
                  />
                </div>

                {password && (
                  <div className="text-xs text-n-4 dark:text-n-3 space-y-1">
                    <p className={password.length >= 6 ? "text-green-500" : ""}>
                      {password.length >= 6 ? "✓" : "○"} At least 6 characters
                    </p>
                    <p className={password === confirmPassword && confirmPassword ? "text-green-500" : ""}>
                      {password === confirmPassword && confirmPassword ? "✓" : "○"} Passwords match
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || password !== confirmPassword || password.length < 6}
                className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-color-1 to-color-5 text-white shadow-lg shadow-color-1/30 hover:shadow-xl hover:shadow-color-1/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-color-1 hover:text-color-5 font-medium transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
