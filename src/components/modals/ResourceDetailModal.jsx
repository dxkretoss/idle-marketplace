import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookOpen, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export const ResourceDetailModal = () => {
  const { selectedResource, setSelectedResource, setRoute } = useApp();

  if (!selectedResource) return null;

  return (
    <div 
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 !m-0"
      onClick={() => setSelectedResource(null)}
    >
      <div 
        className="glass-card bg-white max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl border border-idle-emerald/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 glass-header px-5 py-4 flex items-center justify-between border-b border-idle-line">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-idle-mint text-idle-emerald">
              {selectedResource.badge}
            </span>
            <span className="text-xs text-idle-muted">IDLE Platform Standard</span>
          </div>
          <button 
            onClick={() => setSelectedResource(null)}
            className="p-1.5 rounded-full text-idle-muted hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0d2e29]">
              {selectedResource.title}
            </h2>
            <p className="text-xs md:text-sm text-idle-muted mt-1 leading-relaxed">
              {selectedResource.summary}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8faf9] border border-idle-line space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172d28]">Detailed Guidelines</h4>
            <p className="text-xs md:text-sm text-[#274039] leading-relaxed">
              {selectedResource.content}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-idle-emerald font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliant with DFW pilot rules</span>
            </div>
            <button
              onClick={() => {
                setSelectedResource(null);
                setRoute('membership');
              }}
              className="text-xs font-bold text-idle-emerald hover:text-idle-teal flex items-center gap-1"
            >
              <span>View Membership Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
