import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post('/api/user/forgot-password', { email });
      
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate('/login'), 3000);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 className="h3 text-gray-900 dark:text-n-1">Forgot Password?</h1>
                <p className="body-2 text-n-4 dark:text-n-3">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-n-3/30 dark:border-n-5/30 bg-white/50 dark:bg-n-8/50 text-gray-900 dark:text-n-1 outline-none transition-all duration-300 focus:border-color-1 focus:bg-white dark:focus:bg-n-7"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-color-1 to-color-5 text-white shadow-lg shadow-color-1/30 hover:shadow-xl hover:shadow-color-1/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
