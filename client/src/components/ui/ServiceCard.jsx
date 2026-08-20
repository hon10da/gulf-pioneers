export default function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <div className="group bg-white rounded-2xl border border-black/5 p-6 hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
        <Icon className="w-6 h-6 text-gold group-hover:text-ink transition-colors duration-300" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-bold text-ink mb-2">{service.title}</h3>
      <p className="text-sm text-slate-soft leading-relaxed">{service.shortDesc}</p>
    </div>
  );
}
