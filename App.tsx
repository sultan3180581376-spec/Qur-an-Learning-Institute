
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AITutor } from './components/AITutor';
import { PricingCard } from './components/PricingCard';
import { AdminDashboard } from './components/AdminDashboard';
import { getStoredUser, createTrialUser, loginUser, sendEmailNotification } from './services/authService';
import { User } from './types';
import { MOCK_COURSES, PRICING_PLANS, TEACHERS, CONTACT_DETAILS, ACADEMY_STATS, COUNTRY_CODES, LANGUAGES } from './constants';
import { Play, Star, ShieldCheck, Clock, ArrowRight, Lock, CheckCircle, Mail, Phone, MapPin, Users, Video, Globe, Calendar, Award, Monitor, BookOpen, FileText, ChevronDown, Send } from 'lucide-react';

// --- PAGES ---

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-midnight text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-sm">
            <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">Online Quran Academy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Learn Quran Online with <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Expert Live Tutors</span> & AI
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10">
            Join thousands of students worldwide. One-on-one live classes for Kids & Adults. 3 Days Free Trial Included with all enrollments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/pricing')} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-1">
              Enroll Now
            </button>
            <button onClick={() => navigate('/courses')} className="px-8 py-4 bg-transparent border border-slate-600 hover:bg-slate-800 text-white rounded-full font-semibold text-lg transition-all">
              View All Courses
            </button>
          </div>
          <div className="mt-12 flex items-center space-x-8 text-slate-400 text-sm flex-wrap justify-center">
            <div className="flex items-center m-2"><ShieldCheck size={16} className="mr-2 text-emerald-500" /> Money Back Guarantee</div>
            <div className="flex items-center m-2"><Calendar size={16} className="mr-2 text-emerald-500" /> 3 Days Free Trial</div>
            <div className="flex items-center m-2"><Globe size={16} className="mr-2 text-emerald-500" /> Multilingual Support</div>
          </div>
        </div>
      </section>

      {/* Stats Section - Professional Counters */}
      <section className="py-12 bg-emerald-900 border-b border-emerald-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {ACADEMY_STATS.map((stat, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-emerald-200 text-sm md:text-base uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-midnight mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 -z-10 transform -translate-y-1/2"></div>
             
             <div className="bg-white p-6 relative">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 mb-6 shadow-sm border-4 border-white">1</div>
                <h3 className="text-xl font-bold mb-3">Select Plan</h3>
                <p className="text-slate-500">Browse our fee structure and choose the schedule that fits your needs.</p>
             </div>
             <div className="bg-white p-6 relative">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 mb-6 shadow-sm border-4 border-white">2</div>
                <h3 className="text-xl font-bold mb-3">Take 3-Day Trial</h3>
                <p className="text-slate-500">Start with 3 free trial classes. Experience our quality teaching first.</p>
             </div>
             <div className="bg-white p-6 relative">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 mb-6 shadow-sm border-4 border-white">3</div>
                <h3 className="text-xl font-bold mb-3">Continue Learning</h3>
                <p className="text-slate-500">Satisfied? Continue your spiritual journey with your assigned tutor.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Features / AI Demo Teaser */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-4">UNIQUE FEATURE</div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-midnight mb-6">Practice with AI Ustad</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                In addition to live classes, use our exclusive AI Ustad for unlimited practice. It listens to your recitation and detects mistakes in pronunciation (Makharij) instantly.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time pronunciation analysis",
                  "Visual mistake highlighting",
                  "Available 24/7 for homework practice",
                  "Supports English, Urdu, Arabic, Turkish"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3">
                      <CheckCircle size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/pricing')} className="px-6 py-3 bg-midnight text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">Enroll & Try AI</button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-200/30 rounded-full blur-3xl"></div>
              <div className="relative">
                <AITutor />
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Course Carousel Preview */}
       <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-midnight">Our Courses</h2>
            <p className="text-slate-500 mt-2">Comprehensive Islamic education for all ages</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_COURSES.slice(0,3).map(course => (
              <div key={course.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer" onClick={() => navigate('/courses')}>
                <div className="h-48 overflow-hidden relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-midnight mt-1 mb-2">{course.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-emerald-600 text-sm font-medium">
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
             <button onClick={() => navigate('/courses')} className="px-8 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 font-medium transition-colors">View All Courses</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-20 bg-midnight text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-heading font-bold">Why Choose Qur'an Institute?</h2>
             <p className="text-slate-400 mt-3">We provide the best online environment for Islamic learning.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                 <Users className="text-emerald-400 w-10 h-10 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Expert Tutors</h3>
                 <p className="text-slate-400 text-sm">Highly qualified, certified male and female teachers from Egypt and Pakistan.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                 <Clock className="text-emerald-400 w-10 h-10 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Flexible Timing</h3>
                 <p className="text-slate-400 text-sm">Classes available 24/7. Choose the time that suits your schedule best.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                 <ShieldCheck className="text-emerald-400 w-10 h-10 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Safe Environment</h3>
                 <p className="text-slate-400 text-sm">Secure, monitored one-on-one classrooms ensuring privacy and focus.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                 <Globe className="text-emerald-400 w-10 h-10 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Multilingual</h3>
                 <p className="text-slate-400 text-sm">Learn in English, Urdu, Arabic, or your preferred local language.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-heading font-bold text-center mb-12 text-midnight">What Parents Say</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {name: "Sarah K.", loc: "UK", text: "My son has improved his Tajweed significantly in just 3 months. The teacher is very patient."},
                {name: "Ahmed M.", loc: "USA", text: "The combination of live classes and the AI tool for homework is a game changer. Highly recommended!"},
                {name: "Fatima Z.", loc: "Canada", text: "We were looking for a female tutor for my daughter and found the perfect match here. Professional and kind."}
              ].map((t, i) => (
                <div key={i} className="bg-sand p-8 rounded-2xl relative">
                   <div className="flex text-yellow-400 mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                   </div>
                   <p className="text-slate-700 mb-6 italic">"{t.text}"</p>
                   <div>
                     <p className="font-bold text-midnight">{t.name}</p>
                     <p className="text-xs text-slate-500">{t.loc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

const TeachersPage = () => {
  return (
    <div className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-midnight mb-4">Our Expert Instructors</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We select only the top 5% of applicants. All our teachers are Hafiz-e-Quran with Ijazah and extensive online teaching experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEACHERS.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-shadow">
              <img src={teacher.image} alt={teacher.name} className="w-full h-64 object-cover object-top" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-midnight">{teacher.name}</h3>
                <p className="text-emerald-600 text-sm font-medium mb-3">{teacher.role}</p>
                <p className="text-slate-500 text-sm mb-4">{teacher.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {teacher.languages.map(lang => (
                    <span key={lang} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // 1. Send Email
    const emailSuccess = await sendEmailNotification(`New Contact: ${formData.subject}`, formData);
    
    // 2. Send WhatsApp
    const waNumber = "923165876804";
    const waMessage = `*New Contact Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
    
    if (emailSuccess) {
      window.open(waUrl, '_blank');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      // Even if email fails, try to open WhatsApp as backup
      window.open(waUrl, '_blank');
      setStatus('success'); // Show success to user since WhatsApp opened
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-midnight mb-4">Get in Touch & Join Now</h1>
          <p className="text-slate-600">We are available 24/7 to answer your queries. Join our community today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           <div className="p-6 bg-emerald-50 rounded-xl flex items-start">
             <Mail className="text-emerald-600 mr-4 flex-shrink-0" />
             <div>
               <h3 className="font-bold mb-1">Email</h3>
               <p className="text-sm text-slate-600 break-all">{CONTACT_DETAILS.email}</p>
             </div>
           </div>
           <div className="p-6 bg-emerald-50 rounded-xl flex items-start">
             <Phone className="text-emerald-600 mr-4 flex-shrink-0" />
             <div>
               <h3 className="font-bold mb-1">WhatsApp</h3>
               <p className="text-sm text-slate-600">{CONTACT_DETAILS.phone}</p>
               <p className="text-sm text-slate-600">{CONTACT_DETAILS.phone2}</p>
             </div>
           </div>
           <div className="p-6 bg-emerald-50 rounded-xl flex items-start">
             <Monitor className="text-emerald-600 mr-4 flex-shrink-0" />
             <div>
               <h3 className="font-bold mb-1">Microsoft Teams</h3>
               <p className="text-sm text-slate-600">{CONTACT_DETAILS.teams}</p>
             </div>
           </div>
           <div className="p-6 bg-emerald-50 rounded-xl flex items-start">
             <Video className="text-emerald-600 mr-4 flex-shrink-0" />
             <div>
               <h3 className="font-bold mb-1">Zoom ID</h3>
               <p className="text-sm text-slate-600">{CONTACT_DETAILS.zoomId}</p>
             </div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border border-slate-200 p-8 rounded-2xl shadow-sm bg-white relative">
          <h3 className="text-xl font-bold text-midnight mb-2">Send us a message</h3>
          
          {status === 'success' && (
            <div className="absolute inset-0 z-10 bg-white/90 flex items-center justify-center flex-col rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-emerald-800">Message Sent!</h3>
              <p className="text-slate-500 mt-2">Opening WhatsApp to complete your request...</p>
              <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 bg-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-200">Send Another</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-emerald-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-emerald-500 outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <input 
              type="text" 
              required
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-emerald-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea 
              rows={4} 
              required
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-emerald-500 outline-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-midnight text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            {status === 'sending' ? 'Sending...' : <><Send size={18} className="mr-2" /> Send Message</>}
          </button>
        </form>
      </div>
    </div>
  );
};

const PrivacyPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <div className="prose prose-slate">
      <p>Last updated: October 2023</p>
      <p>At Qur'an Learning Institute, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.</p>
      <h3>Information We Collect</h3>
      <ul>
        <li>Personal identification (Name, Email, Phone number)</li>
        <li>Audio recordings for educational purposes (AI analysis)</li>
        <li>Payment information (processed securely via Stripe/PayPal)</li>
      </ul>
      <h3>Audio Data Usage</h3>
      <p>Your audio recordings are used solely for providing feedback on your recitation. We process these recordings using our secure AI servers and do not share them with third parties for marketing.</p>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <div className="prose prose-slate">
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
      <h3>2. Classes & Scheduling</h3>
      <p>Classes missed by the student without 24-hour notice may not be made up. Teachers will wait 15 minutes for a student to join.</p>
      <h3>3. Refund Policy</h3>
      <p>We offer a 7-day money-back guarantee for all new paid subscriptions. Contact support within 7 days of payment for a full refund.</p>
    </div>
  </div>
);

// Renamed from TrialSignup to EnrollmentForm
const EnrollmentForm = ({ onSignup, planName }: { onSignup: (name: string) => void, planName?: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [language, setLanguage] = useState('English');
  const [course, setCourse] = useState(MOCK_COURSES[0].title);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES.find(c => c.code === '+92')?.code || '+92');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const fullPhone = `${countryCode} ${phone}`;
    const selectedPlan = planName || 'Standard';
    const message = `*New Student Enrollment*\n\n*Name:* ${name}\n*Age:* ${age}\n*Gender:* ${gender}\n*Language:* ${language}\n*Course:* ${course}\n*Email:* ${email}\n*Phone:* ${fullPhone}\n*Plan:* ${selectedPlan}\n\nPlease contact me to start my classes.`;

    // 1. Send Email Automatically in background
    await sendEmailNotification("New Enrollment", {
      Name: name,
      Age: age,
      Gender: gender,
      Language: language,
      Course: course,
      Email: email,
      Phone: fullPhone,
      Plan: selectedPlan,
      Date: new Date().toLocaleString()
    });

    // 2. Open WhatsApp (Secondary)
    const waNumber = "923165876804";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    // 3. Simulate API call for enrollment locally
    setTimeout(() => {
      createTrialUser(name, email); // Creates user with fresh state (0 progress)
      onSignup(name);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-sand py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <Award className="text-emerald-600" size={32} />
          </div>
          <h2 className="text-2xl font-heading font-bold text-midnight">Complete Enrollment</h2>
          <p className="text-slate-500 mt-2">{planName ? `For ${planName}` : 'Join Qur\'an Institute'}</p>
          <p className="text-emerald-600 text-xs font-bold mt-2 bg-emerald-50 py-1 px-2 rounded-full inline-block">3 Days Free Trial Included</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="e.g. Ahmed Ali" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <input required type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Age" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
               <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.name}>{l.name}</option>
                  ))}
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Course</label>
               <select value={course} onChange={e => setCourse(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
                  {MOCK_COURSES.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
               </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="ahmed@example.com" />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone / WhatsApp</label>
            <div className="flex rounded-lg shadow-sm ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-emerald-500 overflow-hidden">
              <div className="relative bg-slate-50 border-r border-slate-300">
                 <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-full pl-3 pr-8 py-3 bg-transparent focus:outline-none text-sm font-medium text-slate-700 cursor-pointer appearance-none"
                    style={{ minWidth: '110px' }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown size={14} />
                  </div>
              </div>
              <input 
                required 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                className="flex-1 px-4 py-3 bg-white outline-none min-w-0" 
                placeholder="300 1234567" 
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md transition-all flex justify-center items-center">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Confirm Enrollment"}
          </button>
        </form>
        <p className="text-xs text-center text-slate-400 mt-6">
          By enrolling, you agree to our terms. 100% Money Back Guarantee.
        </p>
      </div>
    </div>
  );
};

const Dashboard = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const timeLeft = Math.max(0, user.trialEndsAt - Date.now());
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  // Logic to determine active courses. 
  // If user.progress is empty (new user), we show a default "Noorani Qaida" as enrolled with 0 progress.
  const enrolledCourses = user.progress.length > 0 ? user.progress.map(p => {
    const course = MOCK_COURSES.find(c => c.id === p.courseId);
    return { ...p, ...course };
  }) : [
    {
        courseId: 'c1',
        completedLessons: 0,
        totalLessons: 28,
        title: 'Noorani Qaida (Beginner)',
        // Updated to match constants image
        image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80',
        type: 'QAIDA'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Trial Banner */}
      {!user.hasPaid && user.plan === 'TRIAL' && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
               <Calendar className="text-emerald-600" />
            </div>
            <div>
              <p className="font-bold text-emerald-800 text-lg">Welcome to your 3-Day Free Trial!</p>
              <p className="text-sm text-emerald-700">You have {daysLeft} days remaining. Your tutor will contact you via WhatsApp shortly.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
             <button onClick={() => navigate('/contact')} className="px-5 py-2 bg-white border border-emerald-200 text-emerald-700 text-sm font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                Contact Support
             </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-heading font-bold text-midnight mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">

           {/* Stats Row */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                   <Video className="text-blue-500" size={20} />
                </div>
                <div>
                   <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Classes</p>
                   <p className="text-xl font-bold text-slate-800">0 Attended</p>
                </div>
             </div>
             <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                   <Clock className="text-purple-500" size={20} />
                </div>
                <div>
                   <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Practice</p>
                   <p className="text-xl font-bold text-slate-800">0 Hours</p>
                </div>
             </div>
             <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mr-4">
                   <Star className="text-amber-500" size={20} />
                </div>
                <div>
                   <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Grade</p>
                   <p className="text-xl font-bold text-slate-800">-</p>
                </div>
             </div>
           </div>

           {/* Active Courses Section */}
           <div>
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-midnight flex items-center">
                  <BookOpen className="mr-2 text-emerald-600" size={22} /> Active Courses
                </h2>
                <button onClick={() => navigate('/courses')} className="text-sm text-emerald-600 hover:underline">Browse All</button>
             </div>
             
             <div className="space-y-4">
                {enrolledCourses.map((course, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-5 items-center transition-all hover:shadow-md">
                    <div className="relative w-full sm:w-32 h-32 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={course.image || 'https://via.placeholder.com/150'} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow w-full text-center sm:text-left">
                      <h3 className="font-bold text-lg text-midnight">{course.title}</h3>
                      <div className="flex items-center justify-center sm:justify-start text-xs text-slate-500 mb-2 space-x-3">
                         <span className="bg-slate-100 px-2 py-0.5 rounded">Module 1</span>
                         <span>{course.completedLessons} / {course.totalLessons} Lessons</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.max(5, (course.completedLessons / course.totalLessons) * 100)}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-400 text-right">{Math.round((course.completedLessons / course.totalLessons) * 100)}% Completed</p>
                    </div>
                    <button onClick={() => navigate('/classroom')} className="w-full sm:w-auto px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm shadow-sm hover:shadow">
                      Continue
                    </button>
                  </div>
                ))}
             </div>
           </div>

           {/* Practice Log */}
           <div>
              <h2 className="text-xl font-bold text-midnight mb-4 flex items-center">
                <FileText className="mr-2 text-emerald-600" size={22} /> Practice Log
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                        <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Activity</th>
                        <th className="px-6 py-3">Duration</th>
                        <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                           <td className="px-6 py-4 whitespace-nowrap text-slate-400 italic" colSpan={4}>
                             No practice sessions recorded yet. Use the AI Tutor to start practicing.
                           </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
              </div>
           </div>

           {/* Certificates */}
           <div>
              <h2 className="text-xl font-bold text-midnight mb-4 flex items-center">
                <Award className="mr-2 text-emerald-600" size={22} /> Certificates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {/* Locked Certificate Placeholder */}
                 <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 text-center opacity-75 flex flex-col items-center justify-center h-full min-h-[160px]">
                    <div className="w-12 h-12 bg-slate-200/50 rounded-full flex items-center justify-center mb-3">
                      <Lock className="text-slate-400" size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-700">Noorani Qaida Completion</h3>
                    <p className="text-xs text-slate-500 mt-1">Complete 28 lessons to unlock</p>
                 </div>
                 <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 text-center opacity-75 flex flex-col items-center justify-center h-full min-h-[160px]">
                    <div className="w-12 h-12 bg-slate-200/50 rounded-full flex items-center justify-center mb-3">
                      <Lock className="text-slate-400" size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-700">Juz Amma Memorization</h3>
                    <p className="text-xs text-slate-500 mt-1">Pass Hifz assessment to unlock</p>
                 </div>
              </div>
           </div>

        </div>

        {/* Sidebar: AI Practice & Schedule */}
        <div className="lg:col-span-1 space-y-6">
          {/* Next Class Card */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-bl-lg">UPCOMING</div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-midnight">Class Schedule</h3>
              </div>
              <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                <div className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm">
                  <Calendar className="text-emerald-600" size={24} />
                </div>
                <p className="text-slate-600 font-medium mb-1">Schedule Pending</p>
                <p className="text-xs text-slate-400 px-4">Your teacher will contact you shortly to set a permanent time.</p>
              </div>
              <button onClick={() => navigate('/contact')} className="w-full mt-4 py-2 text-emerald-600 border border-emerald-200 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
                Request Specific Time
              </button>
           </div>

          {/* AI Tutor Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-600">
              <h3 className="font-bold text-white flex items-center">
                <Monitor className="mr-2" size={18} /> AI Ustad
              </h3>
              <p className="text-emerald-100 text-xs mt-1">Practice anytime, anywhere</p>
            </div>
            <div className="p-0">
               <AITutor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Classroom = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-midnight">Assessment Mode</h1>
          <p className="text-slate-500">Initial Evaluation</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
           <div className="text-center">
             <p className="text-slate-500 mb-8">Please recite Surah Al-Fatiha for assessment:</p>
             <div className="text-4xl mb-8 font-arabic leading-normal text-midnight">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
           </div>
        </div>
        <div className="h-full">
          <AITutor />
        </div>
      </div>
    </div>
  );
};

const PricingPage = ({ onSelectPlan }: { onSelectPlan: (id: string) => void }) => {
  return (
    <div className="bg-sand min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
           <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold text-sm mb-6">
              <ShieldCheck size={16} className="mr-2" /> 100% Satisfaction Guaranteed
           </div>
          <h1 className="text-4xl font-heading font-bold text-midnight mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Choose a schedule that works for you. All plans come with a <span className="font-bold text-emerald-600">3-Day Free Trial</span> and Money Back Guarantee.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING_PLANS.map(plan => (
            <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>

        {/* Accepted Payment Methods */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4 font-medium">Secure Payment Methods Accepted</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-10" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
             <span className="text-slate-400 font-bold text-sm border border-slate-300 rounded px-3 py-1 bg-white">Bank Transfer</span>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="bg-white p-6 rounded-xl shadow-sm">
              <Calendar className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">3 Days Free Trial</h3>
              <p className="text-slate-500 text-sm">Try our classes for free. If you're not satisfied, you pay nothing.</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm">
              <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Money Back Guarantee</h3>
              <p className="text-slate-500 text-sm">We offer a full refund within the first week if you are not happy with the progress.</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Family Discount</h3>
              <p className="text-slate-500 text-sm">Get 10% off for the 2nd student and 20% off for the 3rd student.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const TrialExpired = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 bg-midnight/90 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-midnight mb-2">Subscription Required</h2>
        <p className="text-slate-600 mb-8">
          To continue your classes, please activate your subscription plan.
        </p>
        <button onClick={() => navigate('/pricing')} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors mb-4">
          View Plans
        </button>
        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-700 text-sm">
          Back to Home
        </button>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginUser(email);
    
    if (user) {
      onLogin(user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Invalid credentials or user inactive. Try admin@quran.com');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
       <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-sm w-full border border-slate-100">
         <h2 className="text-xl font-bold mb-6 text-midnight">Login to Portal</h2>
         {error && (
           <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg">
             {error}
           </div>
         )}
         <form onSubmit={handleSubmit} className="space-y-4">
           <input 
             type="email" 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Email (e.g., admin@quran.com)" 
             className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" 
             required
           />
           <input 
             type="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Password" 
             className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" 
             required
           />
           <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white py-3 rounded-lg font-medium">
             Login
           </button>
         </form>
         <p className="text-slate-500 mt-6 text-sm">Don't have an account?</p>
         <a href="#/pricing" className="text-emerald-600 hover:underline font-medium text-sm">Enroll Now</a>
         
         <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400">
           <p>Demo Admin: admin@quran.com</p>
         </div>
       </div>
    </div>
  );
};

// --- MAIN APP ---

const checkTrialStatus = (currentUser: User) => {
  if (!currentUser.hasPaid && currentUser.plan === 'TRIAL') {
    if (Date.now() > currentUser.trialEndsAt) {
      return false; // Expired
    }
  }
  return true; // Active or Paid
};

const CoursesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-20 bg-sand min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4 text-center font-heading text-midnight">Our Courses</h1>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">We offer a comprehensive curriculum covering all aspects of Islamic education, tailored for children and adults.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                  <img src={c.image} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" alt={c.title}/>
              </div>
              <div className="p-6 flex-grow">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">{c.type}</span>
                <h3 className="font-bold text-xl text-midnight mb-2">{c.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{c.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 text-sm text-slate-400">
                    <span>{c.lessonsCount} Lessons</span>
                    <span className="flex items-center text-yellow-500"><Star size={14} fill="currentColor" className="mr-1" /> {c.rating}</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button onClick={() => navigate('/pricing')} className="text-emerald-700 font-bold text-sm hover:underline">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
  role?: 'admin' | 'student';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children, role }) => {
  if (!user) return <Navigate to="/login" />;
  
  if (role && user.role !== role) {
    return <Navigate to="/" />; // Unauthorized redirect
  }

  if (user.role === 'student') {
    const isTrialActive = checkTrialStatus(user);
    if (!isTrialActive) return <TrialExpired />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUserChange = (newUser: User | null) => {
    setUser(newUser);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    window.location.hash = '#/enroll';
  };

  return (
    <HashRouter>
      <Layout user={user} onUserChange={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          
          <Route path="/pricing" element={<PricingPage onSelectPlan={handleSelectPlan} />} />
          
          <Route path="/enroll" element={
            user ? <Navigate to="/dashboard" /> : <EnrollmentForm 
              planName={selectedPlan || undefined} 
              onSignup={(name) => {
                const newUser = getStoredUser();
                handleUserChange(newUser);
              }} 
            />
          } />
          
          <Route path="/trial" element={<Navigate to="/pricing" replace />} />

          <Route path="/login" element={
             <LoginPage onLogin={handleUserChange} />
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Student Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute user={user} role="student">
              <Dashboard user={user!} />
            </ProtectedRoute>
          } />
           <Route path="/classroom" element={
            <ProtectedRoute user={user} role="student">
              <Classroom />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
