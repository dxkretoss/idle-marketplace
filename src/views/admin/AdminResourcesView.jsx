import React from 'react';
import { ExternalLink, Grid, ShieldCheck, Zap } from 'lucide-react';

const INTEGRATIONS = [
  { name: 'Tint.ai Underwriting Engine', cat: 'Insurance & Protection', desc: 'Real-time automated risk underwriting and certificate issuance ($12.50/day).', status: 'Connected' },
  { name: 'Stripe Connect Custom Accounts', cat: 'Payments & Escrow', desc: 'Pre-authorized holds, automatic 97.5% lender / 2.5% platform escrow splits.', status: 'Connected' },
  { name: 'Single-Use QR Custody Protocol', cat: 'Custody Handoffs', desc: 'Cryptographic dynamic QR code generator for equipment exchange and condition verification.', status: 'Active' },
  { name: 'FAA Part 135 Registry Feed', cat: 'Elite Aviation', desc: 'Automated air carrier certificate lookup and charter tail registration verification.', status: 'Connected' },
  { name: 'Checkr Commercial KYC', cat: 'Identity & Safety', desc: 'Driver license biometric scans and identity verification for heavy equipment rentals.', status: 'Active' },
  { name: 'Mapbox / OpenStreetMap Tiles', cat: 'Geospatial Hub', desc: 'North Texas regional clustering, radius filtering, and FBO tarmac routing coordinates.', status: 'Active' }
];

export const AdminResourcesView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0c302c]">Integrated Partner Infrastructure</h3>
          <p className="text-xs text-gray-500">
            Core third-party APIs, escrow gateways, and regulatory verification channels powering IDLE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTEGRATIONS.map((tool, idx) => (
            <div key={idx} className="p-4 rounded-2xl border border-gray-100 hover:border-[#d9b972]/60 hover:bg-gray-50/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#795a1a] bg-[#fbf3db] px-2 py-0.5 rounded-full border border-[#d9b972]/30">
                  {tool.cat}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {tool.status}
                </span>
              </div>

              <h4 className="font-bold text-sm text-gray-900">{tool.name}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

