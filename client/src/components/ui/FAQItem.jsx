import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-black/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-right gap-4"
      >
        <span className="font-bold text-ink text-base">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gold-dark shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-slate-soft leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
