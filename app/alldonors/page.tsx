'use client';


import  { useState, useMemo , useEffect} from 'react';
import { Search, Heart, TrendingUp, Users, DollarSign } from 'lucide-react';


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






const DonorsPage = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('amount-desc');
  const [donors, setDonors] = useState<IPayment[]>([]);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch('/api/paymentverify/balance');
        const data: { donations: IPayment[]; totalDonations: number } = await response.json();
        console.log('Fetched donors data:', data);
        // Transform the data to match expected format
        const transformedDonors = (data.donations || []).map(donation => ({
          ...donation,
          id: donation._id,
          amount: Number(donation.amount),  
          date: donation.createdAt
        }));
        setDonors(transformedDonors);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    }
    fetchDonors();
  }, [])


  // Calculate stats
  const totalRaised = donors.reduce((sum, donor) => sum + Number(donor.amount), 0);
  const totalDonors = donors.length;
  const averageDonation = totalRaised ? totalRaised / totalDonors :0;

const filteredAndSortedDonors = useMemo(() => {
  if (!donors || donors.length === 0) return []; // check if donors exist

  let result = [...donors];

  // Filter by search term safely
  if (searchTerm) {
    result = result.filter(donor =>
      donor.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort safely
  result.sort((a, b) => {
    switch (sortBy) {
      case 'amount-desc':
        return (b.amount ?? 0) - (a.amount ?? 0);
      case 'amount-asc':
        return (a.amount ?? 0) - (b.amount ?? 0);
      case 'date-desc':
        return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
      case 'date-asc':
        return new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime();
      case 'name':
        return (a.name ?? "").localeCompare(b.name ?? "");
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
                    <span>{donor.createdAt}</span>
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