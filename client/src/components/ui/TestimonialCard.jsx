import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-7 relative">
      <Quote className="w-8 h-8 text-gold/30 absolute top-6 left-6" strokeWidth={1.5} />
      <p className="text-charcoal leading-relaxed relative z-10">{testimonial.text}</p>
      <div className="mt-6 pt-4 border-t border-black/5">
        <p className="font-bold text-ink text-sm">{testimonial.name}</p>
      </div>
    </div>
  );
}
