import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Settings, ShieldCheck, Zap, ToggleLeft, ToggleRight } from 'lucide-react';

export const AdminAutomationsView = () => {
  const { adminData, toggleAutomation } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0c302c]">Automated Rule Control Room</h3>
          <p className="text-xs text-gray-500">
            Configure automated system triggers for underwriting, deposit releases, escrow splits, and reel lifecycles.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {adminData.automations.map(auto => (
            <div key={auto.id} className="py-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-gray-900">{auto.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    auto.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {auto.enabled ? 'Active Trigger' : 'Disabled'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
                  {auto.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleAutomation(auto.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  auto.enabled ? 'bg-[#0c302c]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    auto.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

