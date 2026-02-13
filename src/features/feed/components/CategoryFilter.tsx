import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { IoPlay, IoMenu, IoClose } from "react-icons/io5";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (category: string) => {
    onSelect(category);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center gap-4 pb-4 pt-2 px-4 sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/5">
      {/* Logo Section */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <IoPlay size={20} className="text-white" />
        </div>
        <h1 className="text-lg font-bold text-white whitespace-nowrap">
          Video Player App
        </h1>
      </div>

      {/* Desktop Category Filter Section */}
      <div className="hidden md:flex gap-3  no-scrollbar items-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors relative",
              selectedCategory === category
                ? "text-black font-medium"
                : "text-white hover:bg-white/10 bg-white/5",
            )}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Open Categories"
      >
        <IoMenu size={28} />
      </button>

      {/* Mobile Category Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Sidebar/Modal Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed h-screen right-0 top-0 bottom-0 w-[80%] max-w-sm bg-zinc-900 z-[60] p-6 shadow-2xl flex flex-col gap-6 md:hidden"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Categories</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSelect(category)}
                    className={clsx(
                      "w-full text-left px-5 py-3 rounded-xl text-base font-medium transition-all",
                      selectedCategory === category
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryFilter;
