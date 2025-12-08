'use client'
import { useRouter } from 'next/navigation'
import { Droplet, Phone,X, Menu } from 'lucide-react'
import Link from 'next/link';
import { useState } from 'react';

function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='fixed top-0 w-full  z-50'>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Droplet className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Savannah Water</h1>
                <p className="text-xs text-gray-500">Northern Ghana Initiative</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-cyan-600 font-medium transition">Home</Link>
              <Link href="/#impact" className="text-gray-700 hover:text-cyan-600 font-medium transition">Impact</Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-600 font-medium transition">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-600 font-medium transition"><Phone/></Link>
              <button 
                onClick={() => router.push('/support')}
                className="px-5 py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-medium"
              >
                Support Us
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-cyan-600 transition"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-cyan-600 font-medium transition py-2"
              >
                Home
              </Link>
              <Link 
                href="/#impact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-cyan-600 font-medium transition py-2"
              >
                Impact
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-cyan-600 font-medium transition py-2"
              >
                About
              </Link>
              <button 
                onClick={() => {
                  router.push('/support');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-5 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition font-medium"
              >
                Support Us
              </button>
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}

export default Navbar