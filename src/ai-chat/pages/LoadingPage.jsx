import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext' 
import Loading from './Loading' 
import toast from 'react-hot-toast'

const LoadingPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { fetchUser } = useAppContext()
  const payment = searchParams.get('payment')

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (payment === 'success') {
        // Wait for loading animation (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Refresh user data to get updated credits
        if (fetchUser) {
          await fetchUser()
        }
        
        // Show success message and redirect to credits page
        toast.success('Payment successful! Credits added to your account.')
        navigate('/credits', { replace: true })
      } else {
        // If accessed directly without payment parameter, redirect to credits
        navigate('/credits', { replace: true })
      }
    }

    handlePaymentSuccess()
  }, [payment, navigate, fetchUser])

  return <Loading duration={1500} />
}

export default LoadingPage
