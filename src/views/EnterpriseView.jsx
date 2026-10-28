import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ENTERPRISE_LANES } from '../data/mockData';
import { 
  Building2, 
  Users, 
  HardHat, 
  Truck, 
  Tent, 
  Wrench, 
  Video, 
  Plus, 
  Trash2, 
  Clock, 
  MapPin, 
  ShieldCheck,
  CheckCircle2,
  Crown
} from 'lucide-react';

const ICON_MAP = {
  HardHat,
  Truck,
  Tent,
  Building2,
  Wrench,
  Video
};

export const EnterpriseView = () => {
  const { 
    enterpriseTeam, 
    addEnterpriseMember, 
    removeEnterpriseMember, 
    enterpriseTasks, 
    addEnterpriseTask,
    plan,
    setRoute,
    setPlan,
    isAuthenticated,
    addToast
  } = useApp();

  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('Field Technician');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(enterpriseTeam[0]?.name || 'Marcus Chen');
  const [taskPriority, setTaskPriority] = useState('High');
  const [taskArea, setTaskArea] = useState('Frisco North');

  const isEnterpriseEligible = ['Business', 'Enterprise'].includes(plan);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to manage enterprise seats', 'info');
      setRoute('auth');
      return;
    }
    if (!memberName.trim()) return;
    addEnterpriseMember({
      name: memberName,
      role: memberRole,
      email: `${memberName.toLowerCase().replace(/\s+/g, '.')}@northline.com`
    });
    setMemberName('');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to dispatch tasks', 'info');
      setRoute('auth');
      return;
    }
    if (!taskTitle.trim()) return;
    addEnterpriseTask({
      title: taskTitle,
      assignee: taskAssignee,
      priority: taskPriority,
      area: taskArea,
      eta: 'In progress'
    });
    setTaskTitle('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Operations & Multi-Seat Workspaces
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          One workspace for teams, equipment and projects.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Coordinate inventory handoffs, field technicians, fleet calendars, and live dispatching with multi-tier role approvals.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#004f46]">10</span>
          <span className="text-xs font-semibold text-idle-muted">Baseline Named Enterprise Seats</span>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#004f46]">$90</span>
          <span className="text-xs font-semibold text-idle-muted">Monthly Enterprise Baseline</span>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold text-idle-gold">{enterpriseTasks.length}</span>
          <span className="text-xs font-semibold text-idle-muted">Active Dispatch Tasks</span>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold text-idle-gold">{enterpriseTeam.length}</span>
          <span className="text-xs font-semibold text-idle-muted">Team Members Assigned</span>
        </div>
      </div>

      {/* 6 Enterprise Service Lanes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-idle-line pb-2">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#082f2c]">
              Enterprise Service Lanes
            </h2>
            <p className="text-xs text-idle-muted">Configured operational sectors for commercial members</p>
          </div>
          <button
            onClick={() => setRoute('membership')}
            className="text-xs font-bold text-idle-emerald hover:text-idle-teal"
          >
            Manage Enterprise Seats &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENTERPRISE_LANES.map((lane, i) => {
            const Icon = ICON_MAP[lane.icon] || Building2;
            return (
              <div 
                key={i}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group border border-idle-line"
              >
                <div className="h-32 overflow-hidden bg-emerald-950/10 relative">
                  <img src={lane.image} alt={lane.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                  <div className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-[#002f2a]/85 backdrop-blur-md text-white">
                    <Icon className="w-4 h-4 text-idle-gold" />
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#112d26]">{lane.title}</h3>
                    <p className="text-xs text-idle-muted mt-1 leading-relaxed">{lane.description}</p>
                  </div>
                  <button
                    onClick={() => setRoute('explore')}
                    className="text-xs font-bold text-idle-emerald hover:text-idle-teal flex items-center gap-1 pt-1"
                  >
                    <span>View lane listings</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Operations Workbench & Dispatch Section */}
      <section className="space-y-4">
        <div className="border-b border-idle-line pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
            Operations Workbench
          </span>
          <h2 className="font-serif text-xl font-bold text-[#082f2c]">
            Team Seats, Dispatching & Live Tasks
          </h2>
        </div>

        {!isEnterpriseEligible ? (
          <div className="glass-card p-6 rounded-3xl border border-idle-gold/40 bg-gradient-to-r from-emerald-50/50 to-amber-50/50 space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#172d28]">
              Organizational Access Required
            </h3>
            <p className="text-xs text-idle-muted max-w-lg">
              Enterprise dispatch and team seat controls require a Business ($45/mo) or Enterprise ($90/mo) plan.
            </p>
            <button
              onClick={() => setPlan('Enterprise')}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md"
            >
              Test as Enterprise Member
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Team Manager (5 cols) */}
            <div className="lg:col-span-5 glass-card p-5 rounded-3xl border border-idle-line space-y-4">
              <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
                <Users className="w-4 h-4 text-idle-emerald" />
                <span>Named Team Seats ({enterpriseTeam.length} / 10)</span>
              </h3>

              {/* Add Member Form */}
              <form onSubmit={handleAddMember} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-idle-muted uppercase tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="e.g. Jordan Vance"
                    className="w-full px-3 py-2 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-idle-muted uppercase tracking-wider mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
                  >
                    <option value="Lead Dispatcher">Lead Dispatcher</option>
                    <option value="Field Technician">Field Technician</option>
                    <option value="Inventory Manager">Inventory Manager</option>
                    <option value="Driver / Hauler">Driver / Hauler</option>
                    <option value="Compliance Reviewer">Compliance Reviewer</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="emerald-gradient-btn w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Team Member</span>
                </button>
              </form>

              {/* Members List */}
              <div className="divide-y divide-idle-line max-h-64 overflow-y-auto no-scrollbar pt-2">
                {enterpriseTeam.map((m) => (
                  <div key={m.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <strong className="block text-[#172d28] font-bold">{m.name}</strong>
                      <span className="text-[11px] text-idle-emerald font-semibold">{m.role}</span>
                    </div>
                    <button
                      onClick={() => removeEnterpriseMember(m.id)}
                      className="p-1 rounded text-idle-muted hover:text-red-500 hover:bg-red-50"
                      title="Remove seat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Dispatch Board (7 cols) */}
            <div className="lg:col-span-7 glass-card p-5 rounded-3xl border border-idle-line space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-idle-emerald" />
                  <span>Field Task Dispatching</span>
                </h3>
                <span className="text-[11px] font-semibold text-idle-emerald bg-idle-mint px-2 py-0.5 rounded-full">
                  Live Dispatch
                </span>
              </div>

              {/* Quick Task Create */}
              <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Task title (e.g. Deliver Generator)"
                  className="sm:col-span-2 px-3 py-2 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
                />
                <button
                  type="submit"
                  className="gold-gradient-btn py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Dispatch Task</span>
                </button>
              </form>

              {/* Tasks List */}
              <div className="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar pt-1">
                {enterpriseTasks.map((t) => (
                  <div 
                    key={t.id}
                    className="p-3 rounded-2xl bg-white border border-idle-line hover:border-idle-emerald/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-sm"
                  >
                    <div>
                      <strong className="block text-[#172d28] font-bold text-xs sm:text-sm">
                        {t.title}
                      </strong>
                      <div className="flex items-center gap-2 text-[11px] text-idle-muted mt-0.5">
                        <span>Assigned: <strong className="text-idle-emerald">{t.assignee}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-idle-gold" /> {t.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.priority === 'Urgent'
                          ? 'bg-red-100 text-red-700'
                          : t.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {t.priority}
                      </span>
                      <span className="text-[11px] font-bold text-idle-muted bg-[#f4f7f5] px-2 py-0.5 rounded-lg border border-idle-line">
                        {t.eta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
