import { useEffect, useState } from "react"

const Loading = ({ duration = 1500 }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const incrementAmount = 100 / (duration / 50) 
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + incrementAmount
      })
    }, 50)

    return () => clearInterval(interval)
  }, [duration])

  return (
    <div className='relative flex items-center justify-center h-screen w-screen overflow-hidden bg-n-8'>
      {/* Animated gradient orbs with depth */}
      <div className='absolute top-0 left-0 w-[600px] h-[600px] bg-radial-gradient from-color-1/30 via-color-5/20 to-transparent blur-[120px] animate-pulse'></div>
      <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-color-6/25 via-color-2/15 to-transparent blur-[100px] animate-pulse [animation-delay:0.5s]'></div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gradient from-color-5/20 via-transparent to-transparent blur-[130px] animate-pulse [animation-delay:1s]'></div>
      
      {/* Glassmorphism central container */}
      <div className='relative z-10 flex flex-col items-center gap-12'>
        
        {/* Multi-layer spinner with glassmorphism */}
        <div className='relative w-32 h-32 flex items-center justify-center'>
          {/* Outer glow ring */}
          <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-color-1/20 via-color-5/20 to-color-6/20 blur-xl animate-pulse'></div>
          
          {/* Glass container */}
          <div className='relative w-24 h-24 rounded-full bg-n-1/5 backdrop-blur-md border border-n-1/10 shadow-[0_8px_32px_0_rgba(172,106,255,0.2)]'>
            {/* Inner rotating border */}
            <div className='absolute inset-0 rounded-full border-[3px] border-transparent border-t-n-1 border-r-n-1/70 animate-spin [animation-duration:1.5s]'></div>
            
            {/* Counter-rotating accent */}
            <div className='absolute inset-2 rounded-full border-[2px] border-transparent border-b-color-1 border-l-color-5 animate-spin [animation-direction:reverse] [animation-duration:2s]'></div>
            
            {/* Center dot pulse */}
            <div className='absolute inset-0 m-auto w-3 h-3 rounded-full bg-gradient-to-br from-color-1 to-color-5 animate-pulse shadow-[0_0_20px_rgba(172,106,255,0.6)]'></div>
          </div>
        </div>

        {/* Elegant progress bar with glassmorphism */}
        <div className='w-80 space-y-4'>
          {/* Glass bar container */}
          <div className='relative h-1.5 rounded-full bg-n-1/5 backdrop-blur-sm border border-n-1/10 overflow-hidden shadow-[0_4px_16px_0_rgba(0,0,0,0.3)]'>
            {/* Animated gradient fill */}
            <div 
              className='h-full bg-gradient-to-r from-color-1 via-color-5 to-color-6 transition-all duration-300 ease-out relative'
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'></div>
            </div>
          </div>
          
          {/* Progress info */}
          <div className='flex items-center justify-between'>
            <p className='caption text-n-3 tracking-[0.3em]'>LOADING</p>
            <p className='caption text-n-2 font-medium tabular-nums'>{Math.round(progress)}%</p>
          </div>
        </div>

        {/* Animated tagline */}
        <div className='relative overflow-hidden h-6'>
          <p className='tagline text-n-3 animate-[fadeIn_0.8s_ease-in-out]'>
            PREPARING YOUR EXPERIENCE
          </p>
        </div>
      </div>

      {/* Floating particles for depth */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-color-1/30 animate-[float_6s_ease-in-out_infinite]'></div>
        <div className='absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-color-5/40 animate-[float_8s_ease-in-out_infinite] [animation-delay:1s]'></div>
        <div className='absolute bottom-[30%] left-[25%] w-1 h-1 rounded-full bg-color-6/30 animate-[float_7s_ease-in-out_infinite] [animation-delay:2s]'></div>
        <div className='absolute top-[40%] right-[30%] w-2 h-2 rounded-full bg-color-2/25 animate-[float_9s_ease-in-out_infinite] [animation-delay:0.5s]'></div>
      </div>
    </div>
  )
}

export default Loading
