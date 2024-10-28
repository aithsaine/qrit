import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './card/ProductCard';

export default function CustomTabView({ categories }) {
  const [activeTab, setActiveTab] = useState(0);
  const products = useSelector(state => state.products);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-4">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 transition-colors duration-300 focus:outline-none ${
              activeTab === index
                ? 'border-b-4 border-red-500 text-red-500 font-bold dark:text-red-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ${
              activeTab === index ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {item.name}
            </h3>

            {/* Small Horizontal Cards */}
            <div className="space-y-4">
              {products
                .filter((pr) => pr.category == item.id)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    isHorizontal={true} // New prop to change the layout
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
