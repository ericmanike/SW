'use client'
import React, { useState } from 'react';
import {  MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/toastProvider';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';


export default function AboutPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { showToast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };


  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/paymentverify/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'manikeeric@gmail.com',
          subject: contactForm.subject,
          message: `New message! from <b>${contactForm.name}</b><br/>
          <p>message: ${contactForm.message} </p>
          `
        })})
        if (!response.ok) {
          throw new Error('Failed to send email');
        }
        else {
            setShowSuccess(true);
      setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
      const data = await response.json();
      
  }
    
    }
      
        catch (error) {
      console.error('Error sending email:', error);
    }

  };
      

  const handleSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill in all required fields', 'error');
   
      return;
    }
    
  
    handleSendEmail();
    setContactForm({ name: '', email: '', subject: '', message: '' });


  }




  return (
    <div className="bg-gray-50 min-h-screen">
  
      {/* Contact Form Section */}
      <section className="mt-10 py-20 bg-linear-to-br from-gray-50 via-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We&apos;d love to hear from you</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
     
             <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="cursor-pointer w-full py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>


















            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600">Northern Regional Office<br />Tamale, Ghana</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">0543442518</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">savannahwater@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
              {/* Social Media */}
<div className=" md:block mt-8 px-3">
  <h3 className="text-2xl font-bold mb-4">Follow Us</h3>

  <div className="flex space-x-6">
    <a
      href="https://facebook.com"
      target="_blank"
      className="flex items-center space-x-2 hover:text-blue-400 transition"
    >
      <Facebook className="w-6 h-6" />
      <span>Facebook</span>
    </a>

    <a
      href="https://twitter.com"
      target="_blank"
      className="flex items-center space-x-2 hover:text-blue-400 transition"
    >
      <Twitter className="w-6 h-6" />
      <span>Twitter</span>
    </a>

    <a
      href="https://instagram.com"
      target="_blank"
      className="flex items-center space-x-2 hover:text-blue-400 transition"
    >
      <Instagram className="w-6 h-6" />
      <span>Instagram</span>
    </a>

    <a
      href="https://linkedin.com"
      target="_blank"
      className="flex items-center space-x-2 hover:text-blue-400 transition"
    >
      <Linkedin className="w-6 h-6" />
      <span>LinkedIn</span>
    </a>
  </div>
</div>





            </div>

          
         
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-[scaleIn_0.3s_ease-out]">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. We&apos;ll get back to you as soon as possible.
              </p>
             
            </div>
          </div>
        </div>
      )}

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