export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', dark = false }) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-right items-start';
  const titleColor = dark ? 'text-white' : 'text-ink';
  const subtitleColor = dark ? 'text-white/60' : 'text-slate-soft';
  const eyebrowColor = dark ? 'text-gold-light' : 'text-gold-dark';
  const ruleColor = dark ? 'bg-gold-light' : 'bg-gold-dark';

  return (
    <div className={`flex flex-col ${alignClass} max-w-2xl mb-12`}>
      {eyebrow && (
        <span className={`${eyebrowColor} font-bold text-sm tracking-wide mb-3 flex items-center gap-2`}>
          <span className={`w-6 h-px ${ruleColor}`} />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-extrabold ${titleColor} leading-snug`}>{title}</h2>
      {subtitle && <p className={`mt-4 ${subtitleColor} text-base leading-relaxed`}>{subtitle}</p>}
    </div>
  );
}
