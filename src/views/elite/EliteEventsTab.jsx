import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, Check, ShieldCheck, ArrowRight } from 'lucide-react';

export const EliteEventsTab = ({ onOpenHostModal }) => {
  const [rsvpdEvents, setRsvpdEvents] = useState(['ev-1']);

  const events = [
    {
      id: 'ev-1',
      title: 'Members-Only Exotic Car Soirée & Sunset Drive',
      city: 'Frisco, TX',
      venue: 'Stonebriar Private Pavilion & Grounds',
      date: 'Saturday, Dec 19, 2026',
      time: '6:00 PM – 10:00 PM',
      capacity: '30 Members Maximum',
      rsvps: 22,
      host: 'Exotic Drive Collective DFW',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      description: 'An intimate evening of private collector supercars, curated wine tasting, and twilight drives through the North Texas corridor.'
    },
    {
      id: 'ev-2',
      title: 'Westlake Vineyard Executive Retreat & Helipad Access',
      city: 'Southlake, TX',
      venue: 'Private 12-Acre Executive Sanctuary',
      date: 'Friday, Nov 14, 2026',
      time: '4:00 PM – 9:00 PM',
      capacity: '20 VIP Guests',
      rsvps: 16,
      host: 'Westlake Private Landowners',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      description: 'Private board-level networking, sommelier pairings, and direct flight transfer coordination from McKinney National.'
    },
    {
      id: 'ev-3',
      title: 'Addison Hangar Reception & Aviation Preview',
      city: 'Addison, TX',
      venue: 'Million Air Addison Private FBO Ramp',
      date: 'Thursday, Nov 28, 2026',
      time: '5:30 PM – 8:30 PM',
      capacity: '40 Members',
      rsvps: 28,
      host: 'Lone Star Flight Group',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80',
      description: 'Exclusive tarmac showcase of fractional Pilatus PC-12 NG turboprops and Citation X empty-leg lease opportunities.'
    }
  ];

  const toggleRsvp = (id) => {
    setRsvpdEvents(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Host Event CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-black/60 border border-[#d7b467]/30 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b467] bg-[#d7b467]/20 px-2 py-0.5 rounded">
              The Members' Circle
            </span>
            <span className="text-xs text-gray-400">Curated private experiences</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-white mt-1">
            Exclusive Peer Gatherings & Private Showcases
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenHostModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Host a Private Experience</span>
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-5">
        {events.map(ev => {
          const isRsvpd = rsvpdEvents.includes(ev.id);
          const currentCount = ev.rsvps + (isRsvpd ? 1 : 0);

          return (
            <div
              key={ev.id}
              className="rounded-3xl border border-[#d7b467]/30 bg-[#090d11] overflow-hidden p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#d7b467] transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 min-w-0">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full sm:w-44 sm:h-36 rounded-2xl object-cover border border-[#d7b467]/30 shrink-0"
                />

                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b467] bg-[#d7b467]/20 px-2 py-0.5 rounded">
                      {ev.city}
                    </span>
                    <span className="text-xs text-gray-400">Hosted by {ev.host}</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-white leading-snug">
                    {ev.title}
                  </h4>

                  <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                    {ev.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1.5 text-[#faedd1] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#d7b467]" />
                      <span>{ev.date} · {ev.time}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d7b467]" />
                      <span>{ev.venue}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d7b467]" />
                      <span>{currentCount} Attending ({ev.capacity})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="w-full md:w-auto shrink-0 flex flex-col items-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                <button
                  type="button"
                  onClick={() => toggleRsvp(ev.id)}
                  className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isRsvpd
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                      : 'bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black hover:opacity-95'
                  }`}
                >
                  {isRsvpd && <Check className="w-3.5 h-3.5" />}
                  <span>{isRsvpd ? 'RSVP Confirmed' : 'Request Invitation / RSVP'}</span>
                </button>
                <span className="text-[10px] text-gray-400">Private Host Verified · NDA Protected</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

