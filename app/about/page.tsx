'use client'
import React, { useState } from 'react';
import {  Target, Users, Award, MapPin, Phone, Mail, Send, CheckCircle, Heart, Shield, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all required fields');
      return;
    }

    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const teamMembers = [
    {
      name: 'Mr. Eric Manike Haare',
      role: 'Founder',
      image: '/eric.png'  },
    {
      name: 'Unknown',
      role: 'Operations Director',
      image: ''
    },
    {
      name: 'Unknown',
      role: 'Community Outreach',
      image: ''
    },
 
  ];

 

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-cyan-500 via-blue-600 to-cyan-700 text-white py-20 mt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Savannah Water</h1>
            <p className="text-xl lg:text-2xl text-cyan-50 max-w-3xl mx-auto leading-relaxed">
              Transforming lives through sustainable access to clean water in Northern Ghana
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To establish sustainable pure water manufacturing Industries across Northern Ghana, providing communities with reliable access to clean, safe drinking water while creating local employment opportunities and fostering economic growth.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                A Northern Ghana where every community has guaranteed access to clean, affordable water, and where local water manufacturing plants serve as economic hubs that empower communities and transform lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">Maintaining international water safety standards</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Empowering local communities through partnership</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Building solutions that last for generations</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Striving for the highest standards in everything</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals working to make a difference</p>
          </div>

          <div className="grid md:grid-cols-3  gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-4 text-center hover:shadow-xl transition">
                <img 
                  src={member?.image || '/imagenotfound.png'} 
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-3 border-white shadow-md"
                />
                <h3 className="text-base font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-cyan-600 font-medium">{member.role}</p>
              </div>
            ))}
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