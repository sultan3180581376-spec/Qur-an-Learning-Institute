
import { Course, CourseType, PricingPlan, Teacher, Language } from './types';

export const CONTACT_DETAILS = {
  email: "sultan3180581376@gmail.com",
  phone: "+92 316 5876804", // Primary WhatsApp
  phone2: "+92 318 0581376", // Secondary WhatsApp
  zoomId: "802 752 3809",
  teams: "Join Community"
};

export const ACADEMY_STATS = [
  { label: "Active Students", value: "1,500+", icon: "Users" },
  { label: "Certified Staff", value: "120+", icon: "Award" },
  { label: "Classes Conducted", value: "50k+", icon: "Video" },
  { label: "Countries Served", value: "25+", icon: "Globe" }
];

export const COUNTRY_CODES = [
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Noorani Qaida',
    description: 'The foundation of Quranic reading for beginners with correct pronunciation.',
    type: CourseType.QAIDA,
    // Image: Open Quran/Arabic letters text
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 28,
    rating: 5.0
  },
  {
    id: 'c2',
    title: 'Quran Reading (Nazra)',
    description: 'Fluent recitation of the Holy Quran with Tajweed rules applied.',
    type: CourseType.TAJWEED,
    // Image: Person holding/reading Quran
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 114,
    rating: 4.9
  },
  {
    id: 'c3',
    title: 'Hifz-e-Quran',
    description: 'Complete memorization of the Quran with revision and testing.',
    type: CourseType.HIFZ,
    // Image: Quran with candle/warm atmosphere
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 500,
    rating: 5.0
  },
  {
    id: 'c4',
    title: 'Translation & Tafseer',
    description: 'Understand the meaning and context of Quranic verses.',
    type: CourseType.ARABIC,
    // Image: Books/Library
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 60,
    rating: 4.8
  },
  {
    id: 'c5',
    title: 'Islamic Studies for Kids',
    description: 'Kalimas, Duas, Seerah, and basic fiqh for children.',
    type: CourseType.NAMAZ,
    // Image: Child Praying - Relevant for Kids Studies
    image: 'https://images.unsplash.com/photo-1564648351416-3eec9f3e85de?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 40,
    rating: 4.9
  },
  {
    id: 'c6',
    title: 'Arabic Language',
    description: 'Learn to speak and understand Quranic Arabic.',
    type: CourseType.ARABIC,
    // Image: Updated to match user request (Warm Quran/Candle aesthetic)
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80',
    lessonsCount: 50,
    rating: 4.7
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: '2days',
    name: 'Basic Plan',
    price: 30,
    period: 'month',
    features: ['2 Classes per Week', '30 Minutes Duration', '1-on-1 Live Teacher', '3-Day Free Trial', 'Money Back Guarantee']
  },
  {
    id: '3days',
    name: 'Standard Plan',
    price: 45,
    period: 'month',
    recommended: true,
    features: ['3 Classes per Week', '30 Minutes Duration', '1-on-1 Live Teacher', 'Full AI Bot Access', 'Progress Reports', 'Free Trial Included']
  },
  {
    id: '5days',
    name: 'Intensive Plan',
    price: 70,
    period: 'month',
    features: ['5 Classes per Week', '30 Minutes Duration', '1-on-1 Live Teacher', 'Full AI + Hifz Tools', 'Certificate of Completion', 'Priority Support']
  },
  {
    id: 'tafseer',
    name: 'Tarjuma & Tafseer',
    price: 100,
    period: 'month',
    features: ['3 Classes per Week', '45 Mins Detailed Study', 'Qualified Scholar', 'Deep Meaning & Context', 'Certificate of Mastery']
  },
  {
    id: 'hifz',
    name: 'Hifz Executive',
    price: 200,
    period: 'month',
    features: ['5 Classes per Week', '60 Mins Intensive', 'Dedicated Hifz Mentor', 'Daily Revision & Testing', 'Ijazah Preparation']
  },
  {
    id: 'weekend',
    name: 'Weekend Special',
    price: 25,
    period: 'month',
    features: ['Sat & Sun Only', '45 Minutes Duration', '1-on-1 Live Teacher', 'Full AI Access', 'Ideal for Busy Professionals']
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Sheikh Abdullah',
    role: 'Senior Tajweed Instructor',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    bio: 'Ijazah in 10 Qiraat from Al-Azhar University. 15 years teaching experience.',
    languages: ['Arabic', 'English']
  },
  {
    id: 't2',
    name: 'Ustadha Fatima',
    role: 'Kids & Beginners Specialist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Specializes in Noorani Qaida and child psychology. Hafiza of Quran.',
    languages: ['Urdu', 'English', 'Arabic']
  },
  {
    id: 't3',
    name: 'Qari Ibrahim',
    role: 'Hifz Mentor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Renowned reciter with a focus on melody and Maqamat.',
    languages: ['Turkish', 'Arabic', 'English']
  }
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', greeting: "Assalamu alaikum! I am UstadAI. I'm here to help you learn." },
  { code: 'ur', name: 'Urdu', greeting: "السلام علیکم! میں استاد AI ہوں۔ میں آپ کی قرآن سیکھنے میں مدد کروں گا۔", voiceName: 'Urdu Male' },
  { code: 'ar', name: 'Arabic', greeting: "السلام عليكم! أنا أستاذ AI. أنا هنا لمساعدتك في تعلم القرآن.", voiceName: 'Arabic Male' },
  { code: 'id', name: 'Indonesian', greeting: "Assalamu alaikum! Saya UstadAI. Saya di sini untuk membantu Anda belajar.", voiceName: 'Indonesian Male' },
  { code: 'tr', name: 'Turkish', greeting: "Selamün aleyküm! Ben UstadAI. Öğrenmenize yardımcı olmak için buradayım.", voiceName: 'Turkish Male' }
];
