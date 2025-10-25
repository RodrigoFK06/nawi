// src/components/Navigation.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

const navLinks = [
  { href: "/trabajos", label: "Trabajos" },
  { href: "/#manifiesto", label: "Manifiesto" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/galeria", label: "Galería" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative px-6 md:px-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between gap-6 pt-6 pb-6">
        <BrandMark />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-white/80">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 p-2 rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            className="w-6 h-6 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl z-50 md:hidden"
              style={{
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Gradient Overlay for neo-glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10 pointer-events-none" />
              
              {/* Close Button (top right inside panel) */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 px-8 pt-24 pb-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 px-6 text-lg font-semibold tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Decorative Element */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="mt-4 text-center text-xs text-white/40 tracking-widest uppercase">
                  Ñawi Productora
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}