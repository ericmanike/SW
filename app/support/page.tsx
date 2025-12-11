'use client'
import { useToast } from '@/components/toastProvider';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    PaystackPop: any;
  }
}




export interface IPayment {
  _id: string; 
  id: string; 
  date?: string;
  reference: string;
  amount: number;
  status?: "success" | "failed" | "pending";
  currency?: string;
  paymentMethod?: string;
  cardLast4?: string;
  name?: string;
  email?: string;
  message?: string;
  createdAt?: string; // timestamps are usually strings when sent as JSON
  updatedAt?: string;
}


import React, { useState ,useEffect, use } from 'react';
import { Heart, TrendingUp, User, Mail, DollarSign, Calendar, CheckCircle, Users, } from 'lucide-react';
import Script from 'next/script';

export default function DonateSupport() {
  const [fetchdata, setFetchdata] = useState([]);
  const [numOfdonors, setNumOfDonors] = useState<number>(0);
  const [donationAmount, setDonationAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(12);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const { showToast } = useToast();
  const router = useRouter();



useEffect(() => {
         async function fetchInitialData() {
           try {
             const response = await fetch('/api/paymentverify/balance');
             const data = await response.json();
             console.log('Initial data fetched:', data.donations);
              setFetchdata(data.donations || []);
              setNumOfDonors(data.totalDonations || 0);
              

           } catch (error) {
             console.error('Error fetching initial data:', error);
                    }  
                  }  
         fetchInitialData();
}, []);


function calculateTotalRaised(donations: IPayment[]) {
    return donations.reduce((total, donation) => total + Number(donation?.amount),0);
  }


useEffect(() => {  async function fetchExchangeRate() {
  try {
    const saved = localStorage.getItem("usdToGhsRate");
    const savedTime = localStorage.getItem("usdToGhsTime");

    if (saved && savedTime && Date.now() - Number(savedTime) < 24 * 60 * 60 * 1000) {
      console.log("Using cached rate:", saved);
        setExchangeRate(Number(saved));
        return;
    }

    const res = await fetch(
      "https://v6.exchangerate-api.com/v6/92022bbda01955ebd077740b/latest/USD"
    );
    const data = await res.json();

    const rate = data.conversion_rates.GHS;
    console.log("Fetched fresh rate:", rate);
    setExchangeRate(rate);  
    localStorage.setItem("usdToGhsRate", rate.toString());
    localStorage.setItem("usdToGhsTime", Date.now().toString());
    return 

  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
}

fetchExchangeRate();



    const total = calculateTotalRaised(fetchdata as IPayment[]);
    console.log('Total amount raised:', total);
  }     , [fetchdata]);





  const amountRaised = calculateTotalRaised(fetchdata as IPayment[]);
  const targetAmount = 10000;
  const progressPercentage = (amountRaised / targetAmount) * 100;
  const donors: number = numOfdonors;
  

  const predefinedAmounts = ['5', '10', '50', '100', '250', '1000'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDonationSubmit = () => {
    const finalAmount = donationAmount || customAmount;
    if (!finalAmount || !formData.fullName || !formData.email) {
    
      return;
    }

  
  };



  const sendMail = async (to: string, subject: string, message: string) => {
    try {
      const response = await fetch('/api/paymentverify/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message })
      });
      const data = await response.json();
    
      setDonationAmount('');
      setCustomAmount('');
      setFormData({ fullName: '', email: '', phone: '', message: '' });
    
      console.log('Email sent response:', data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }


   const handleInlinePayment = () => {
    const { email } = formData;
    const usdAmount = donationAmount ? donationAmount : customAmount;
    const amount = exchangeRate && usdAmount ? (Number(usdAmount) * exchangeRate).toFixed(2) : null;
    if (!email || !amount) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: Number(amount ) * 100 , 
      currency: 'GHS', // or 'NGN', 'USD', 'ZAR'
      ref: 'PS_' + Math.floor((Math.random() * 1000000000) + 1),
      onClose: function() {
        showToast('Payment window closed', 'info');
      },
      callback: function(response: any) {
        verifyPayment(response.reference);      
        
      }
    });

    handler.openIframe();
  };

  const verifyPayment = async (reference:any) => {
    try {
      const response = await fetch(`/api/paymentverify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference,  
          name: formData.fullName,
           email: formData.email,
            message: formData.message })
      });
      const data = await response.json();
          console.log('Verification response data:', data.success);
      if (data.success) {
         showToast('Payment  successful!', 'success');
          sendMail( formData.email,
            'Thank you for your donation!',
            `Dear ${formData.fullName},<br/><br/>Thank you for your generous donation of $${donationAmount || customAmount}. 
            Your support helps us provide clean water to communities 
            in need.<br/><br/>Best regards,<br/>Savannah Water Team`);  
           window.location.reload();

        
      } else {
        showToast('Payment verification failed', 'error');
     
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <div className=" bg-linear-to-br from-gray-50 via-cyan-50 to-blue-50 min-h-screen">
       
       <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Paystack inline loaded")}
      />


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Support Clean Water for
            <span className="block mt-2 bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Northern Ghana
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every donation brings us closer to establishing sustainable water manufacturing plants
          </p>
        </div>

        {/* Fundraising Dashboard */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Raised</p>
                <p className="text-4xl font-bold text-cyan-600">
                  ${amountRaised.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Goal</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${targetAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-linear-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                style={{ width: `${progressPercentage}%` }}
              >
                <span className="text-xs font-bold text-white">
                  {progressPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{numOfdonors}</p>
                <p className="text-sm text-gray-600">Donors</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ${(targetAmount - amountRaised).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">To Goal</p>
              </div>
            </div>


            <div className="flex items-center space-x-4 p-4 bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />   
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2025/2026</p> 
                <p className="text-sm text-gray-600"></p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Donation Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Donation Selection */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Make a Donation</h3>
            </div>

            <div className="space-y-6">
              {/* Predefined Amounts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setDonationAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-xl border-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                        donationAmount === amount
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-600'
                          : 'border-gray-200 hover:border-cyan-300 text-gray-700'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={customAmount}
                    min={1}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount('');
                    }}
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg transition"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@gmail.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                    />
                  </div>
                </div>

               

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Share why you're supporting this cause..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition"
                  />
                </div>
              </div>
              <form id='paystackForm'>
           
            </form>
              <button
                onClick={() => {
                  handleInlinePayment();
                  handleDonationSubmit(); 
                }}
                className="cursor-pointer w-full py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
               
                <span>Give ${donationAmount || customAmount || '0'}</span>
              </button>
            </div>
          </div>

          {/* Right: Impact Information */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Why Your Support Matters</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <span>Building sustainable water manufacturing plants</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <span>Creating jobs for local communities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <span>Ensuring quality and safety standards</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <span>Providing access to 50,000+ people</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

     

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}