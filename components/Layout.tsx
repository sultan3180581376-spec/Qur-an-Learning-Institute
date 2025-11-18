
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut, Phone, Mail, Shield, MessageCircle } from 'lucide-react';
import { User as UserType } from '../types';
import { logout } from '../services/authService';
import { CONTACT_DETAILS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: UserType | null;
  onUserChange: (user: UserType | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onUserChange }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    onUserChange(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-sand text-slate-800 relative">
      {/* Top Bar - Standard for Academies */}
      <div className="bg-emerald-800 text-white py-2 text-xs md:text-sm hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center hover:text-emerald-200 cursor-pointer"><Mail size={14} className="mr-2" /> {CONTACT_DETAILS.email}</span>
            <span className="flex items-center hover:text-emerald-200 cursor-pointer"><Phone size={14} className="mr-2" /> {CONTACT_DETAILS.phone} / {CONTACT_DETAILS.phone2}</span>
          </div>
          <div className="flex space-x-4">
             <span className="cursor-pointer hover:text-emerald-200">Students Portal</span>
             <span className="cursor-pointer hover:text-emerald-200">Teachers Portal</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <BookOpen className="h-8 w-8 text-emerald-600 mr-2" />
              <div>
                <span className="block text-lg font-bold text-midnight leading-none">Qur'an</span>
                <span className="block text-xs text-emerald-600 font-medium tracking-wider">LEARNING INST.</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`${isActive('/') ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'} transition-colors`}>Home</Link>
              <Link to="/courses" className={`${isActive('/courses') ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'} transition-colors`}>Courses</Link>
              <Link to="/pricing" className={`${isActive('/pricing') ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'} transition-colors`}>Fee Structure</Link>
              <Link to="/teachers" className={`${isActive('/teachers') ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'} transition-colors`}>Teachers</Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'admin' ? (
                     <Link 
                      to="/admin" 
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${isActive('/admin') ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Shield size={16} className="mr-2" /> Admin
                    </Link>
                  ) : (
                     <Link 
                      to="/dashboard" 
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard') ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-slate-400 hover:text-red-500">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                   <Link to="/login" className="text-slate-600 hover:text-emerald-600 font-medium">Login</Link>
                   <Link to="/pricing" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                     Enroll Now
                   </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-emerald-600 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Home</Link>
              <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Courses</Link>
              <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Fee Structure</Link>
              <Link to="/teachers" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Teachers</Link>
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-700 bg-emerald-50">Admin Dashboard</Link>
                  ) : (
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-700 bg-emerald-50">Dashboard</Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">Login</Link>
                  <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 text-center mt-4">Enroll Now</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a 
          href={`mailto:${CONTACT_DETAILS.email}`}
          className="w-12 h-12 md:w-14 md:h-14 bg-slate-700 hover:bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
          title="Send Email"
        >
          <Mail size={20} className="md:w-6 md:h-6" />
        </a>
        <a 
          href={`https://wa.me/${CONTACT_DETAILS.phone.replace(/\D/g,'')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={24} className="md:w-7 md:h-7" />
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-midnight text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-emerald-400 mr-2" />
                <span className="text-lg font-bold text-white">Qur'an Inst.</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Leading online Qur'an academy providing one-on-one classes with certified teachers and advanced AI tools for students worldwide.
              </p>
              <div className="text-sm text-slate-400">
                <p className="flex items-center mb-2"><Phone size={14} className="mr-2" /> {CONTACT_DETAILS.phone}</p>
                <p className="flex items-center mb-2"><Phone size={14} className="mr-2" /> {CONTACT_DETAILS.phone2}</p>
                <p className="flex items-center"><Mail size={14} className="mr-2" /> {CONTACT_DETAILS.email}</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gold">Courses</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li><Link to="/courses" className="hover:text-white transition-colors">Noorani Qaida</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Reading (Nazra)</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Memorization (Hifz)</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Translation</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Islamic Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gold">Quick Links</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><Link to="/teachers" className="hover:text-white transition-colors">Our Teachers</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Fee Structure</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gold">Connect</h4>
              <p className="text-slate-300 text-sm mb-2">Follow us on social media for daily reminders.</p>
              <div className="flex space-x-4 mt-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">
                  <span className="text-xs font-bold">fb</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-colors">
                   <span className="text-xs font-bold">ig</span>
                </div>
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-sky-500 cursor-pointer transition-colors">
                   <span className="text-xs font-bold">tw</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-xs">© 2023 Qur'an Learning Institute. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0 items-center">
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 md:h-6 opacity-70 grayscale hover:grayscale-0 transition-all bg-white rounded px-1" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 md:h-8 opacity-70 grayscale hover:grayscale-0 transition-all bg-white rounded px-1" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 md:h-6 opacity-70 grayscale hover:grayscale-0 transition-all bg-white rounded px-1" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 md:h-7 opacity-70 grayscale hover:grayscale-0 transition-all bg-white rounded px-1" />
               <div className="text-slate-500 text-xs font-medium px-2 border-l border-slate-700 ml-2">
                 Bank Transfer Available
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};