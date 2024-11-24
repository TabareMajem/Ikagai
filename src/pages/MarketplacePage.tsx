import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, Grid, List } from 'lucide-react';
import Navigation from '../components/Navigation';
import ListingsGrid from '../components/marketplace/ListingsGrid';
import ListingsList from '../components/marketplace/ListingsList';
import ListingModal from '../components/marketplace/ListingModal';
import NewListingModal from '../components/marketplace/NewListingModal';
import CategoryFilter from '../components/marketplace/CategoryFilter';

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

export type ViewMode = 'grid' | 'list';
export type Category = 'all' | 'health' | 'cultural' | 'services' | 'goods';

export default function MarketplacePage({ onNavigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [showNewListing, setShowNewListing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-medium text-gray-800">コミュニティマーケット</h1>
            <button
              onClick={() => setShowNewListing(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Plus className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="リストを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <CategoryFilter
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40">
        <div className="max-w-screen-xl mx-auto px-4">
          {viewMode === 'grid' ? (
            <ListingsGrid
              searchQuery={searchQuery}
              category={selectedCategory}
              onSelect={setSelectedListing}
            />
          ) : (
            <ListingsList
              searchQuery={searchQuery}
              category={selectedCategory}
              onSelect={setSelectedListing}
            />
          )}
        </div>
      </main>

      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={onNavigate} />

      {/* Listing Modal */}
      {selectedListing && (
        <ListingModal
          listingId={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}

      {/* New Listing Modal */}
      {showNewListing && (
        <NewListingModal onClose={() => setShowNewListing(false)} />
      )}
    </div>
  );
}