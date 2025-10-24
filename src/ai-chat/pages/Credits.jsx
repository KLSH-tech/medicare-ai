import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'
import toast, { Toaster } from 'react-hot-toast'

const Credits = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const { axios, user } = useAppContext()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get('/api/credit/plans')
      
      if (data.success) {
        setPlans(data.plans)
        console.log('Plans loaded:', data.plans) 
      } else {
        toast.error(data.message || 'Failed to fetch plans.')
      }
    } catch (error) {
      console.error('Fetch plans error:', error)
      toast.error(error.response?.data?.message || 'Failed to load plans')
    } finally {
      setLoading(false)
    }
  }

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post('/api/credit/purchase', { planId })
      if (data.success) {
        window.location.href = data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Purchase error:', error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  // Check for cancelled payment
  useEffect(() => {
    const payment = searchParams.get('payment')
    if (payment === 'cancelled') {
      toast.error('Payment was cancelled.')
      navigate('/credits', { replace: true })
    }
  }, [searchParams, navigate])

  useEffect(() => {
    fetchPlans()
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Toaster position="top-center" />
      <div className='flex-1 flex flex-col h-screen bg-white dark:bg-[#1A1A2E] overflow-y-scroll'>
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-radial-gradient from-color-1/10 to-transparent blur-3xl animate-pulse'></div>
          <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-radial-gradient from-color-5/10 to-transparent blur-3xl animate-pulse [animation-delay:1s]'></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24'>
          {/* Header with Current Credits */}
          <div className='text-center mb-16 space-y-4'>
            {user && (
              <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-color-1/20 to-color-5/20 border border-color-1/30 mb-4'>
                <svg className='w-5 h-5 text-color-1' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z'/>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z' clipRule='evenodd'/>
                </svg>
                <span className='text-sm font-semibold text-gray-900 dark:text-n-1'>
                  {user.credits} Credits Available
                </span>
              </div>
            )}

            <p className='tagline text-color-1'>FLEXIBLE PRICING</p>
            <h1 className='h2 text-gray-900 dark:text-n-1'>Choose Your Plan</h1>
            <p className='body-2 text-n-4 dark:text-n-3 max-w-2xl mx-auto'>
              Select the perfect credit package for your needs. All plans include premium features and priority support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {plans.map((plan) => {
              const isPopular = plan._id === "pro"
              
              return (
                <div
                  key={plan._id}
                  className={`relative group ${isPopular ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 z-20'>
                      <div className='px-4 py-1.5 rounded-full bg-gradient-to-r from-color-1 to-color-5 text-white text-xs font-semibold tracking-wider uppercase shadow-lg'>
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                      isPopular
                        ? 'bg-white/80 dark:bg-n-7/80 backdrop-blur-xl border-2 border-color-1/50 dark:border-color-1/30 shadow-[0_0_40px_rgba(172,106,255,0.15)] hover:shadow-[0_0_50px_rgba(172,106,255,0.25)]'
                        : 'bg-white/60 dark:bg-n-7/60 backdrop-blur-xl border border-n-3/20 dark:border-n-5/20 shadow-lg hover:shadow-xl'
                    } hover:-translate-y-1`}
                  >
                    {isPopular && (
                      <div className='absolute inset-0 bg-gradient-to-br from-color-1/5 via-transparent to-color-5/5 pointer-events-none'></div>
                    )}

                    <div className='relative p-8 flex flex-col h-full'>
                      {/* Plan Header */}
                      <div className='mb-6'>
                        <h3 className='h4 text-gray-900 dark:text-n-1 mb-2'>
                          {plan.name}
                        </h3>
                        <div className='flex items-baseline gap-1'>
                          <span className='text-4xl font-bold bg-gradient-to-r from-color-1 to-color-5 bg-clip-text text-transparent'>
                            ${plan.price}
                          </span>
                        </div>
                        <p className='caption text-n-4 dark:text-n-3 mt-1'>
                          {plan.credits} credits included
                        </p>
                      </div>

                      {/* Features List */}
                      <ul className='space-y-3 mb-8 flex-1'>
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className='flex items-start gap-3'>
                            <div className='flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-color-1/20 to-color-5/20 flex items-center justify-center mt-0.5'>
                              <svg
                                className='w-3 h-3 text-color-1'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={3}
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <span className='body-2 text-gray-700 dark:text-n-2'>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button 
                        onClick={() => {
                          toast.promise(
                            purchasePlan(plan._id),
                            {
                              loading: 'Processing...',
                              success: 'Redirecting to checkout...',
                              error: 'Failed to start checkout'
                            }
                          )
                        }}
                        className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 ${
                          isPopular
                            ? 'bg-gradient-to-r from-color-1 to-color-5 text-white shadow-lg shadow-color-1/30 hover:shadow-xl hover:shadow-color-1/40 hover:scale-[1.02]'
                            : 'bg-gray-900 dark:bg-n-1 text-white dark:text-n-8 hover:bg-gray-800 dark:hover:bg-n-2 hover:scale-[1.02]'
                        }`}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust Section */}
          <div className='mt-20 text-center'>
            <p className='caption text-n-4 dark:text-n-3 mb-6'>
              Trusted by thousands of users worldwide
            </p>
            <div className='flex flex-wrap items-center justify-center gap-8 opacity-50'>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-color-1' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                <span className='text-sm text-n-4 dark:text-n-3'>Secure Payment</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-color-1' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                <span className='text-sm text-n-4 dark:text-n-3'>Instant Access</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg className='w-5 h-5 text-color-1' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z' clipRule='evenodd' />
                </svg>
                <span className='text-sm text-n-4 dark:text-n-3'>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Credits
