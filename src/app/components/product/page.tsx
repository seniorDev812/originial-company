
"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';    
import Image from 'next/image';
import Icon from '../ui/Icon';
import './style.css'

// Types for better TypeScript support
interface Product {
  id: string;
  oemNumber: string;
  manufacturer: string;
  description: string;
  category: string;
  subcategory: string;
  image?: string;
}

interface FilterState {
  auxiliary: string[];
  components: string[];
  products: string[];
  parts: string[];
}

const ProductFilter = () => {

  // Basic UI state
  const [activeAccordion, setActiveAccordion] = useState('auxiliary');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    auxiliary: [],
    components: [],
    products: [],
    parts: []
  });
  
  // Product data state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock product data - replace with API call
  const mockProducts: Product[] = [
    {
      id: '1',
      oemNumber: '5GDY74B2',
      manufacturer: 'GE',
      description: 'ALTERNATOR BLOWER - 5GDY74B2',
      category: 'auxiliary',
      subcategory: 'Cooling Fans and Blower Assemblies'
    },
    {
      id: '2',
      oemNumber: '5GDY90F1',
      manufacturer: 'GE',
      description: 'EXHAUSTER BLOWER',
      category: 'auxiliary',
      subcategory: 'Cooling Fans and Blower Assemblies'
    },
    {
      id: '3',
      oemNumber: '5GDY90K1',
      manufacturer: 'GE',
      description: 'EXHAUSTER BLOWER',
      category: 'auxiliary',
      subcategory: 'Cooling Fans and Blower Assemblies'
    },
    {
      id: '4',
      oemNumber: '5GDY100A1',
      manufacturer: 'GE',
      description: '5GDY100 Fan, traction alternator, centrifugal',
      category: 'auxiliary',
      subcategory: 'Cooling Fans and Blower Assemblies'
    },
    {
      id: '5',
      oemNumber: 'STATOR-001',
      manufacturer: 'EMD',
      description: 'Stator Assembly for AC Motor',
      category: 'components',
      subcategory: 'Stator Assemblies'
    },
    {
      id: '6',
      oemNumber: 'ARMATURE-001',
      manufacturer: 'EMD',
      description: 'Armature Assembly for DC Motor',
      category: 'components',
      subcategory: 'Armatures'
    },
    {
      id: '7',
      oemNumber: 'TRACTION-AC-001',
      manufacturer: 'GE',
      description: 'AC Traction Motor Assembly',
      category: 'products',
      subcategory: 'Traction Motors (AC & DC)'
    },
    {
      id: '8',
      oemNumber: 'BEARING-001',
      manufacturer: 'SKF',
      description: 'High-Speed Bearing Assembly',
      category: 'parts',
      subcategory: 'Bearings'
    }
  ];

  // Category mappings
  const categoryMappings = useMemo(() => ({
    auxiliary: {
      '139': 'Cooling Fans and Blower Assemblies',
      '140': 'Blower Assemblies',
      '141': 'Auxiliary Generators and Alternators',
      '142': 'Rectifiers'
    },
    components: {
      '143': 'Stator Assemblies',
      '144': 'Armatures',
      '145': 'Rotors',
      '147': 'Coils Sets',
      '148': 'Wheel-Sets'
    },
    products: {
      '135': 'Traction Motors (AC & DC)',
      '136': 'Combo Units',
      '137': 'Main Generators and Alternators',
      '138': 'Wind Power Generators'
    },
    parts: {
      '149': 'Bearings',
      '150': 'Brush Holders',
      '151': 'Cable Assemblies',
      '152': 'Commutators',
      '154': 'Cooling Fan Assemblies',
      '155': 'Lugs and Terminals',
      '156': 'Pinions',
      '157': 'Seals, O-Rings and Gaskets',
      '158': 'Shafts',
      '164': 'Starters'
    }
  }), []);

  // Load products on component mount
  useEffect(() => {
  
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
   
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, [mockProducts]); // Include mockProducts in dependency array

  // URL state management - sync filters with URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = urlParams.get('search');
    const filtersFromUrl = urlParams.get('filters');
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    
    if (filtersFromUrl) {
      try {
        const parsedFilters = JSON.parse(filtersFromUrl);
        setActiveFilters(parsedFilters);
      } catch (error) {
        console.error('Error parsing filters from URL:', error);
      }
    }
  }, []);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.oemNumber.toLowerCase().includes(query) ||
        product.manufacturer.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    Object.entries(activeFilters).forEach(([category, selectedFilters]) => {
      if (selectedFilters.length > 0) {
        filtered = filtered.filter(product => {
          if (product.category !== category) return false;
          if (selectedFilters.includes('Show All')) return true;
          
          return selectedFilters.some((filterId: string) => {
            const categoryMapping = categoryMappings[category as keyof typeof categoryMappings];
            const subcategory = categoryMapping?.[filterId as keyof typeof categoryMapping];
            return subcategory && product.subcategory === subcategory;
          });
        });
      }
    });

    return filtered;
  }, [products, searchQuery, activeFilters, categoryMappings]);

  // Handle accordion toggle
  const toggleAccordion = useCallback((section: string) => {
    setActiveAccordion(activeAccordion === section ? '' : section);
  }, [activeAccordion]);

  // Handle search input
  const handleSearch = useCallback((query: string, category?: string) => {
 
    if (category) {
      // Category-specific search (not implemented in UI but prepared)
    
    } else {
      // Global search
      
      setSearchQuery(query);
    }
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((category: keyof FilterState, filterId: string, checked: boolean) => {

    setActiveFilters(prev => {
      const currentFilters = prev[category] || [];
      
      if (filterId === 'Show All') {
        // If "Show All" is checked, clear other filters
        const newFilters = checked ? ['Show All'] : [];
       
        return {
          ...prev,
          [category]: newFilters
        };
      } else {
        // Remove "Show All" if other filters are selected
        let newFilters = currentFilters.filter(f => f !== 'Show All');
        
        if (checked) {
          newFilters.push(filterId);
        } else {
          newFilters = newFilters.filter(f => f !== filterId);
        }
    
        return {
          ...prev,
          [category]: newFilters
        };
      }
    });
  }, []);

  // Handle view mode toggle
  const handleViewToggle = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  // Handle product selection
  const openProductModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  // Handle quote request
  const handleQuoteRequest = useCallback(() => {
    if (selectedProduct) {
      // Implement quote request logic

      alert(`Quote request sent for ${selectedProduct.oemNumber}`);
    }
  }, [selectedProduct]);

  // Handle brochure download
  const handleBrochureDownload = useCallback(() => {
    if (selectedProduct) {
      // Implement brochure download logic

      alert(`Brochure download started for ${selectedProduct.oemNumber}`);
    }
  }, [selectedProduct]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setActiveFilters({
      auxiliary: [],
      components: [],
      products: [],
      parts: []
    });
    setSearchQuery('');
  }, []);

  // Get active filter count
  const getActiveFilterCount = useCallback(() => {
    return Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0);
  }, [activeFilters]);

  // Update URL when filters or search change
  useEffect(() => {
    const urlParams = new URLSearchParams();
    
    if (searchQuery) {
      urlParams.set('search', searchQuery);
    }
    
    if (getActiveFilterCount() > 0) {
      urlParams.set('filters', JSON.stringify(activeFilters));
    }
    
    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchQuery, activeFilters, getActiveFilterCount]);

  return (

    <>
      <section className="sei-product-filter" id="sw-product-parts-section">
        <div className="sei-product-filter-container">
          {/* Left Side Sidebar */}
          <div className="sei-product-filter-sidebar">
            <div className="sei-accordion">
              {/* Auxiliary Line */}
              <div className="sei-accordion-item">
                <button 
                  className={`sei-accordion-header sei-filter-oem-cat-tab-btn ${activeAccordion === 'auxiliary' ? 'active' : ''}`}
                  onClick={() => {

                    toggleAccordion('auxiliary');
                  }}
                  style={{ pointerEvents: 'auto' }}
                  data-id="133"
                >
                  Auxiliary Line
                  <span className="sei-arrow"><i className="fa fa-angle-down"></i></span>
                </button>
                
                <div className={`sei-accordion-content ${activeAccordion === 'auxiliary' ? 'open' : ''}`}>
                  <div className="sei-search-bar-container">
                    <input 
                      type="text" 
                      className="sei-search-bar sei-sw-part-filter-search-text" 
                      placeholder="Search products..." 
                      value={searchQuery}
                      onChange={(e) => {

                        handleSearch(e.target.value, 'auxiliary');
                      }}
                      style={{ pointerEvents: 'auto' }}
                    />
                    <span className="sei-search-icon sei-sw-part-filter-search-btn">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  
                  <ul className="sei-checkbox-list">
                    <li>
                      <label style={{ color: '#949ca3', fontWeight: 'bold' }}>
                        <input 
                          type="checkbox" 
                          value="Show All" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.auxiliary.includes('Show All')}
                          onChange={(e) => {

                            handleFilterChange('auxiliary', 'Show All', e.target.checked);
                          }}
                          style={{ pointerEvents: 'auto' }}
                          data-order="DESC" 
                          data-orderby="count" 
                        />
                        <span>Show All</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="139" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.auxiliary.includes('139')}
                          onChange={(e) => handleFilterChange('auxiliary', '139', e.target.checked)}
                        />
                        <span>Cooling Fans and Blower Assemblies</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="140" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.auxiliary.includes('140')}
                          onChange={(e) => handleFilterChange('auxiliary', '140', e.target.checked)}
                        />
                        <span>Blower Assemblies</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="141" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.auxiliary.includes('141')}
                          onChange={(e) => handleFilterChange('auxiliary', '141', e.target.checked)}
                        />
                        <span>Auxiliary Generators and Alternators</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="142" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.auxiliary.includes('142')}
                          onChange={(e) => handleFilterChange('auxiliary', '142', e.target.checked)}
                        />
                        <span>Rectifiers</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Components */}
              <div className="sei-accordion-item">
                <button 
                  className={`sei-accordion-header sei-filter-oem-cat-tab-btn ${activeAccordion === 'components' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('components')}
                  data-id="134"
                >
                  Components
                  <span className="sei-arrow"><i className="fa fa-angle-down"></i></span>
                </button>
                
                <div className={`sei-accordion-content ${activeAccordion === 'components' ? 'open' : ''}`}>
                  <div className="sei-search-bar-container">
                    <input 
                      type="text" 
                      className="sei-search-bar sei-sw-part-filter-search-text" 
                      placeholder="Search products..." 
                      onChange={(e) => handleSearch(e.target.value, 'components')}
                    />
                    <span className="sei-search-icon sei-sw-part-filter-search-btn">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  
                  <ul className="sei-checkbox-list">
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="Show All" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.components.includes('Show All')}
                          onChange={(e) => handleFilterChange('components', 'Show All', e.target.checked)}
                          data-order="DESC" 
                          data-orderby="count" 
                        />
                        <span>Show All</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="143" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.components.includes('143')}
                          onChange={(e) => handleFilterChange('components', '143', e.target.checked)}
                        />
                        <span>Stator Assemblies</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="144" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.components.includes('144')}
                          onChange={(e) => handleFilterChange('components', '144', e.target.checked)}
                        />
                        <span>Armatures</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="145" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.components.includes('145')}
                          onChange={(e) => handleFilterChange('components', '145', e.target.checked)}
                        />
                        <span>Rotors</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="147" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.components.includes('147')}
                          onChange={(e) => handleFilterChange('components', '147', e.target.checked)}
                        />
                        <span>Coils Sets</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="148" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.components.includes('148')}
                          onChange={(e) => handleFilterChange('components', '148', e.target.checked)}
                        />
                        <span>Wheel-Sets</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Product Line */}
              <div className="sei-accordion-item">
                <button 
                  className={`sei-accordion-header sei-filter-oem-cat-tab-btn ${activeAccordion === 'products' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('products')}
                  data-id="132"
                >
                  Products Line
                  <span className="sei-arrow"><i className="fa fa-angle-down"></i></span>
                </button>
                
                <div className={`sei-accordion-content ${activeAccordion === 'products' ? 'open' : ''}`}>
                  <div className="sei-search-bar-container">
                    <input 
                      type="text" 
                      className="sei-search-bar sei-sw-part-filter-search-text" 
                      placeholder="Search products..." 
                      onChange={(e) => handleSearch(e.target.value, 'products')}
                    />
                    <span className="sei-search-icon sei-sw-part-filter-search-btn">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  
                  <ul className="sei-checkbox-list">
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="Show All" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.products.includes('Show All')}
                          onChange={(e) => handleFilterChange('products', 'Show All', e.target.checked)}
                          data-order="DESC" 
                          data-orderby="count" 
                        />
                        <span>Show All</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="135" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.products.includes('135')}
                          onChange={(e) => handleFilterChange('products', '135', e.target.checked)}
                        />
                        <span>Traction Motors (AC & DC)</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="136" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.products.includes('136')}
                          onChange={(e) => handleFilterChange('products', '136', e.target.checked)}
                        />
                        <span>Combo Units</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="137" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.products.includes('137')}
                          onChange={(e) => handleFilterChange('products', '137', e.target.checked)}
                        />
                        <span>Main Generators and Alternators</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="138" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.products.includes('138')}
                          onChange={(e) => handleFilterChange('products', '138', e.target.checked)}
                        />
                        <span>Wind Power Generators</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Parts */}
              <div className="sei-accordion-item">
                <button 
                  className={`sei-accordion-header sei-filter-oem-cat-tab-btn ${activeAccordion === 'parts' ? 'active' : ''}`}
                  onClick={() => toggleAccordion('parts')}
                  data-id="131"
                >
                  Parts
                  <span className="sei-arrow"><i className="fa fa-angle-down"></i></span>
                </button>
                
                <div className={`sei-accordion-content ${activeAccordion === 'parts' ? 'open' : ''}`}>
                  <div className="sei-search-bar-container">
                    <input 
                      type="text" 
                      className="sei-search-bar sei-sw-part-filter-search-text" 
                      placeholder="Search products..." 
                      onChange={(e) => handleSearch(e.target.value, 'parts')}
                    />
                    <span className="sei-search-icon sei-sw-part-filter-search-btn">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  
                  <ul className="sei-checkbox-list">
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="Show All" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('Show All')}
                          onChange={(e) => handleFilterChange('parts', 'Show All', e.target.checked)}
                          data-order="DESC" 
                          data-orderby="count" 
                        />
                        <span>Show All</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="149" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('149')}
                          onChange={(e) => handleFilterChange('parts', '149', e.target.checked)}
                        />
                        <span>Bearings</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="150" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('150')}
                          onChange={(e) => handleFilterChange('parts', '150', e.target.checked)}
                        />
                        <span>Brush Holders</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="151" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('151')}
                          onChange={(e) => handleFilterChange('parts', '151', e.target.checked)}
                        />
                        <span>Cable Assemblies</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="152" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('152')}
                          onChange={(e) => handleFilterChange('parts', '152', e.target.checked)}
                        />
                        <span>Commutators</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="154" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('154')}
                          onChange={(e) => handleFilterChange('parts', '154', e.target.checked)}
                        />
                        <span>Cooling Fan Assemblies</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="155" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('155')}
                          onChange={(e) => handleFilterChange('parts', '155', e.target.checked)}
                        />
                        <span>Lugs and Terminals</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="156" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('156')}
                          onChange={(e) => handleFilterChange('parts', '156', e.target.checked)}
                        />
                        <span>Pinions</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="157" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('157')}
                          onChange={(e) => handleFilterChange('parts', '157', e.target.checked)}
                        />
                        <span>Seals, O-Rings and Gaskets</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="158" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('158')}
                          onChange={(e) => handleFilterChange('parts', '158', e.target.checked)}
                        />
                        <span>Shafts</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
                          value="164" 
                          className="sei-filter-oem-cat-cb" 
                          checked={activeFilters.parts.includes('164')}
                          onChange={(e) => handleFilterChange('parts', '164', e.target.checked)}
                        />
                        <span>Starters</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="sei-contact-cta">
              <div className="sei-cta-content">
                <h4>Need Help?</h4>
                <p>Contact our sales advisor today for expert guidance on your specific requirements.</p>
                <a href="#" className="sei-btn sei-btn-primary">Contact Sales</a>
              </div>
            </div>
          </div>

          {/* Right Side Product List */}
          <div className="sei-product-filter-Product-List">
            <div className="sei-filters-option">
              {/* Mobile Global Search */}
              <div className="sei-mobile-search" role="search">
                <input 
                  type="text" 
                  className="sei-mobile-global-search-input" 
                  placeholder="Search products..." 
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => {

                    handleSearch(e.target.value);
                  }}
                  style={{ pointerEvents: 'auto' }}
                />
                <button className="sei-mobile-global-search-btn" aria-label="Search">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
              
              {/* Filter Status and Clear Button */}
              {getActiveFilterCount() > 0 && (
                <div className="sei-filter-status">
                  <span className="sei-active-filters-count">
                    {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
                  </span>
                  <button 
                    className="sei-clear-filters-btn"
                    onClick={() => {

                      clearAllFilters();
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    Clear All
                  </button>
                </div>
              )}
              
              <div className="sei-col-option-filter">
                <a 
                  href="#" 
                  className={`sei-sw-layout-filter ${viewMode === 'list' ? 'active' : ''}`} 
                  data-view="list"
                  onClick={(e) => {
                    e.preventDefault();

                    handleViewToggle('list');
                  }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <i className="fa fa-th-list" aria-hidden="true"></i>
                </a>
                <a 
                  href="#" 
                  className={`sei-sw-layout-filter ${viewMode === 'grid' ? 'active' : ''}`} 
                  data-view="grid"
                  onClick={(e) => {
                    e.preventDefault();
   
                    handleViewToggle('grid');
                  }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <i className="fa fa-th" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            {/* Product List */}
            <div className={`sei-product-list sei-sw-right-prod-list-content ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {/* Loading Overlay */}
              {loading && (
                <div className="sei-loading-overlay">
                  <div className="sei-loading-spinner"></div>
                  <p>Loading products...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="sei-error-state">
                  <i className="fa fa-exclamation-triangle"></i>
                  <p>{error}</p>
                  <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
              )}
                {/* Product Details Description */}
                <div className="sei-product-details-discription">
                  {/* Product Description Start */}
                  <div className="sei-peodct-discription-content">
                    <div className="sei-product-img">
                      <Image 
                        src="/imgs/list.jpg" 
                        alt="Cooling Fans and Blower Assemblies"
                        width={300}
                        height={200}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="sei-product-content-d">
                      <h1 className="sei-product-title">Cooling Fans and Blower Assemblies</h1>
                      <p className="sei-product-content-c">
                        Cooling fan assemblies are vital for maintaining optimal engine temperatures. 
                        Sherwood Electromotion Inc. (SEI) provides new and remanufactured locomotive 
                        cooling fan assemblies, ensuring efficient heat dissipation and reliable 
                        performance in extreme conditions.
                      </p>
                      {/* Results count */}
                      <div className="sei-results-count">
                        Showing {filteredProducts.length} of {products.length} products
                        {searchQuery && ` for "${searchQuery}"`}
                      </div>
                    </div>
                  </div>
                  {/* Product Description End */}
                  
                  {/* Product Specification Start */}
                  <div className="sei-specification-heqadings">
                    <h6 className="sei-comman-s-heading sei-number-text">OEM NUMBER</h6>
                    <h6 className="sei-comman-s-heading sei-menufacture-text">MANUFACTURER</h6>
                    <h6 className="sei-comman-s-heading sei-discrption-text">DESCRIPTION</h6>
                  </div>
                  
                  <div className="sei-accordion-container">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div key={product.id} className="sei-accordion-column">
                          <div 
                            className="sei-accordion-main" 
                            onClick={() => {
             
                              openProductModal(product);
                            }}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <h6 className="sei-comman-s-heading sei-number-text">
                              <span className="sei-mobile-text-n">OEM Number</span>
                              {product.oemNumber}
                            </h6>
                            <h6 className="sei-comman-s-heading sei-menufacture-text">
                              <span className="sei-mobile-text-n">Manufacturer</span>
                              {product.manufacturer}
                            </h6>
                            <h6 className="sei-comman-s-heading sei-discrption-text">
                              <span className="sei-mobile-text-n">Description</span>
                              {product.description}
                            </h6>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="sei-no-results">
                        <Icon name="icon-search" size={16} />
                        <p>No products found matching your criteria.</p>
                        <button 
                          onClick={() => {

                            clearAllFilters();
                          }}
                          style={{ pointerEvents: 'auto' }}
                        >Clear Filters</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      </section>
      
      {/* Mobile Modal for Accordion Details */}
      <div 
        className={`sei-mobile-modal-overlay ${isModalOpen ? 'active' : ''}`} 
        onClick={() => {

          closeModal();
        }}
        style={{ pointerEvents: 'auto' }}
      ></div>
      <div className={`sei-mobile-modal ${isModalOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-labelledby="seiMobileModalTitle">
        <div className="sei-mobile-modal-grabber" aria-hidden="true"></div>
        <div className="sei-mobile-modal-header">
          <h3 id="seiMobileModalTitle">Product detail</h3>
          <button 
            className="sei-mobile-modal-close" 
            aria-label="Close" 
            onClick={() => {
              closeModal();
            }}
            style={{ pointerEvents: 'auto' }}
          >×</button>
        </div>
        <div className="sei-mobile-modal-content">
          {selectedProduct && (
            <div className="sei-two-cols">
              <div className="sei-left-side">
                <div className="sei-advisor-contact">
                  <span>
                    <Image 
                      src="/imgs/Auxilary-1-300x300.jpg" 
                      alt="Product image"
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </span>
                  <p className="sei-title">Contact a Sales<br />Advisor Today</p>
                </div>
              </div>
              <div className="sei-right-side">
                <div className="sei-site-table-main">
                  <div className="sei-site-table-wrap">
                    <p>Part Name</p>
                    <p>{selectedProduct.description}</p>
                  </div>
                  <div className="sei-site-table-wrap">
                    <p>Manufacturer</p>
                    <p>{selectedProduct.manufacturer}</p>
                  </div>
                  <div className="sei-site-table-wrap">
                    <p>OEM Manufacturer</p>
                    <p>{selectedProduct.oemNumber}</p>
                  </div>
                  <div className="sei-site-table-wrap">
                    <p>Category</p>
                    <p>{selectedProduct.subcategory}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="sei-mobile-modal-footer">
          <button 
            className="sei-btn-primary-lg" 
            type="button"
            onClick={() => {
  
              handleQuoteRequest();
            }}
            style={{ pointerEvents: 'auto' }}
          >
            Request Quote
          </button>
          <button 
            className="sei-btn-secondary-lg" 
            type="button"
            onClick={() => {
 
              handleBrochureDownload();
            }}
            style={{ pointerEvents: 'auto' }}
          >
            Download Brochure
          </button>
        </div>
      </div>
  </>
  );
};

export default ProductFilter;