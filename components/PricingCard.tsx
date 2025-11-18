import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`relative p-8 bg-white rounded-2xl border transition-all duration-300 ${plan.recommended ? 'border-emerald-500 shadow-2xl scale-105 z-10' : 'border-slate-200 shadow-lg hover:shadow-xl'}`}>
      {plan.recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-midnight mb-2">{plan.name}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold text-emerald-600">${plan.price}</span>
        <span className="text-slate-500 ml-1">/{plan.period}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <Check size={18} className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
            <span className="text-slate-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSelect(plan.id)}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
          plan.recommended 
            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
            : 'bg-slate-100 text-midnight hover:bg-slate-200'
        }`}
      >
        Choose {plan.name}
      </button>
    </div>
  );
};