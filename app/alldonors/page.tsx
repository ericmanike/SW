'use client';


import  { useState, useMemo } from 'react';
import { Search, Heart, TrendingUp, Users, DollarSign } from 'lucide-react';

const DonorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('amount-desc');

  // Sample donor data
  const donors = [
    { id: 1, name: 'Sarah Johnson', amount: 5000, date: '2024-12-01', message: 'Happy to support this amazing cause!' },
    { id: 2, name: 'Michael Chen', amount: 2500, date: '2024-12-02', message: 'Keep up the great work!' },
    { id: 3, name: 'Emily Rodriguez', amount: 1000, date: '2024-12-03', message: '' },
    { id: 4, name: 'David Thompson', amount: 500, date: '2024-12-04', message: 'Proud to contribute!' },
    { id: 5, name: 'Lisa Anderson', amount: 250, date: '2024-12-05', message: '' },
    { id: 6, name: 'James Wilson', amount: 3000, date: '2024-12-05', message: 'For a better future!' },
    { id: 7, name: 'Maria Garcia', amount: 750, date: '2024-12-06', message: 'Love what you do!' },
    { id: 8, name: 'Robert Lee', amount: 150, date: '2024-12-07', message: '' },
    { id: 9, name: 'Jennifer Kim', amount: 10000, date: '2024-11-28', message: 'Honored to be part of this journey!' },
    { id: 10, name: 'Anonymous', amount: 500, date: '2024-12-08', message: '' },
  ];

  // Calculate stats
  const totalRaised = donors.reduce((sum, donor) => sum + donor.amount, 0);
  const totalDonors = donors.length;
  const averageDonation = totalRaised / totalDonors;

  // Filter and sort donors
  const filteredAndSortedDonors = useMemo(() => {
    let result = [...donors];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(donor =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [donors, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mt-15 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Amazing Donors</h1>
          <p className="text-gray-600">Thank you for making this project possible</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Raised</p>
                <p className="text-3xl font-bold text-green-600">${totalRaised.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Donors</p>
                <p className="text-3xl font-bold text-blue-600">{totalDonors}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Donation</p>
                <p className="text-3xl font-bold text-purple-600">${Math.round(averageDonation).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search donors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Donors List */}
        <div className="space-y-4">
          {filteredAndSortedDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{donor.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="font-medium text-green-600">
                      ${donor.amount.toLocaleString()}
                    </span>
                    <span>•</span>
                    <span>{new Date(donor.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  {donor.message && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-gray-700 italic">"{donor.message}"</p>
                    </div>
                  )}
                </div>
                
                <Heart className="w-6 h-6 text-red-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedDonors.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No donors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorsPage;