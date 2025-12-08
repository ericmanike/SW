'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Droplet, Factory, Users, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SavannahWater() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const router = useRouter();

  const images = [
    'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=800&q=80'
  ];

  const impactItems = [
    {
      icon: Factory,
      title: 'Manufacturing Plants',
      description: 'Building state-of-the-art water purification facilities across Northern Ghana to ensure consistent supply.'
    },
    {
      icon: Users,
      title: 'Community Partnership',
      description: 'Collaborating with local communities to create jobs and sustainable water distribution networks.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Maintaining international standards in water purification and quality testing for safe consumption.'
    }
  ];

  const updateCarousel = (index: number) => {
    setImageOpacity(0);
    setTimeout(() => {
      setCurrentIndex(index);
      setImageOpacity(1);
    }, 300);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    updateCarousel(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      updateCarousel(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 mt-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Clean Water for
                <span className="block mt-2 bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Northern Ghana
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                Establishing pure water manufacturing companies to provide sustainable access to clean, safe drinking water across Northern Ghana's communities.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href={'/support'}>
              <button className="cursor-pointer px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition font-semibold text-lg flex items-center space-x-2 group">
                <span>Join the Mission</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              </Link>
              <Link href="/about">
              <button className="cursor-pointer px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-cyan-500 hover:text-cyan-600 transition font-semibold text-lg">
                Learn More
              </button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-bold text-cyan-600">50K+</p>
                <p className="text-sm text-gray-600 mt-1">Lives Impacted</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-600">12</p>
                <p className="text-sm text-gray-600 mt-1">Communities</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-600">5</p>
                <p className="text-sm text-gray-600 mt-1">Plants Planned</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
              <img 
                src={images[currentIndex]} 
                alt="Northern Ghana Community" 
                className="w-full h-[500px] object-cover transition-opacity duration-300"
                style={{ opacity: imageOpacity }}
              />
              
              <button 
                onClick={handlePrev}
                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={handleNext}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur text-white px-6 py-3 rounded-full">
                <p className="text-sm font-semibold text-center whitespace-nowrap">A PROJECT FOR NORTHERN GHANA&apos;S FUTURE</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => updateCarousel(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-8 bg-cyan-600' 
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transforming lives through sustainable water solutions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {impactItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-linear-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl hover:shadow-lg transition">
                  <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}