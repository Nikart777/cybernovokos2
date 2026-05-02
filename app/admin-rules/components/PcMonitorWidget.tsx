'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, CheckCircle2, AlertTriangle, XCircle, HardDrive, Shield, Gamepad2, ChevronDown, ChevronUp, MapPin, Clock } from 'lucide-react';

const API_URL = '/api/pc-status';

const CLUB_LABELS: Record<string, string> = {
  novokosino: 'CyberX Новокосино',
  altufevo: 'CyberX Алтуфьево',
};

interface DiskInfo {
  drive: string;
  free_gb: number;
  total_gb: number;
  used_pct: number;
  status: string;
}

interface GameIssue {
  game: string;
  status: string;
  local?: string;
  ref?: string;
}

interface PcStatus {
  hostname: string;
  club: string;
  pc_number: string;
  updated: string;
  status: string;
  game_issues: GameIssue[];
  fac_issues: string[];
  fac_overall: string;
  disks: DiskInfo[];
  disk_low: boolean;
}

interface StatusData {
  total: number;
  ok: number;
  problems: number;
  pcs: PcStatus[];
}

interface ClubGroup {
  name: string;
  label: string;
  pcs: PcStatus[];
  ok: number;
  problems: number;
  lastUpdate: string;
}

export function PcMonitorWidget() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPc, setExpandedPc] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch {
        setError('Не удалось загрузить данные мониторинга');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const togglePc = (hostname: string) => {
    setExpandedPc(expandedPc === hostname ? null : hostname);
  };

  const pcNum = (hostname: string) => hostname.replace(/\D/g, '');

  // Group PCs by club
  const getClubGroups = (pcs: PcStatus[]): ClubGroup[] => {
    const groups: Record<string, PcStatus[]> = {};
    for (const pc of pcs) {
      const club = pc.club || 'unknown';
      if (!groups[club]) groups[club] = [];
      groups[club].push(pc);
    }

    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, clubPcs]) => {
        const okCount = clubPcs.filter(p => p.status === 'ok').length;
        // Find latest update time
        const lastUpdate = clubPcs.reduce((latest, pc) => {
          return pc.updated > latest ? pc.updated : latest;
        }, '');

        return {
          name,
          label: CLUB_LABELS[name] || name,
          pcs: clubPcs.sort((a, b) => {
            const numA = parseInt(pcNum(a.hostname)) || 0;
            const numB = parseInt(pcNum(b.hostname)) || 0;
            return numA - numB;
          }),
          ok: okCount,
          problems: clubPcs.length - okCount,
          lastUpdate,
        };
      });
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm mb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
            <Monitor size={24} />
          </div>
          <div>
            <h3 className="font-tactic font-black text-xl uppercase italic text-white mb-1">Мониторинг ПК</h3>
            <p className="font-chakra text-emerald-200 text-sm">Загрузка данных...</p>
          </div>
        </div>
        <div className="p-8 flex justify-center">
          <div className="w-8 h-8 border-3 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm mb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-sm">
            <Monitor size={24} />
          </div>
          <div>
            <h3 className="font-tactic font-black text-xl uppercase italic text-white mb-1">Мониторинг ПК</h3>
            <p className="font-chakra text-emerald-200 text-sm">
              Автоматическая проверка игр, Faceit AC и дисков · обновляется раз в сутки
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="p-6">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3">
            <XCircle className="text-rose-500 shrink-0" size={20} />
            <span className="font-chakra text-rose-700 text-sm">{error}</span>
          </div>
        </div>
      ) : data ? (
        <div className="p-6 md:p-8 space-y-8">
          {/* Club groups */}
          {getClubGroups(data.pcs).map((club) => (
            <div key={club.name}>
              {/* Club header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-indigo-500 shrink-0" size={20} />
                  <h4 className="font-tactic font-black text-lg uppercase italic text-slate-900">
                    {club.label}
                  </h4>
                  <div className="flex gap-2">
                    {club.problems === 0 ? (
                      <span className="bg-emerald-100 text-emerald-700 font-chakra font-bold text-xs px-3 py-1 rounded-lg">
                        ✅ Все {club.pcs.length} ПК в норме
                      </span>
                    ) : (
                      <>
                        <span className="bg-rose-100 text-rose-700 font-chakra font-bold text-xs px-2 py-1 rounded-lg">
                          ❗ {club.problems}/{club.pcs.length} с проблемами
                        </span>
                        {club.ok > 0 && (
                          <span className="bg-emerald-100 text-emerald-700 font-chakra font-bold text-xs px-2 py-1 rounded-lg">
                            {club.ok} ОК
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {club.lastUpdate && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={12} />
                    <span className="font-chakra text-xs">
                      Последняя проверка: {club.lastUpdate}
                    </span>
                  </div>
                )}
              </div>

              {/* PC cards for this club */}
              <div className="space-y-2">
                {club.pcs.map((pc) => {
                  const isExpanded = expandedPc === pc.hostname;
                  const isOk = pc.status === 'ok';
                  const num = pcNum(pc.hostname);

                  return (
                    <div
                      key={pc.hostname}
                      className={`rounded-2xl border overflow-hidden transition-all ${
                        isOk ? 'border-emerald-100 bg-emerald-50/30' : 'border-rose-100 bg-rose-50/30'
                      }`}
                    >
                      <button
                        onClick={() => togglePc(pc.hostname)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-tactic font-black text-sm italic ${
                            isOk ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {num}
                          </div>
                          <div className="font-tactic font-black text-base text-slate-900 uppercase italic">
                            ПК {num}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isOk ? (
                            <span className="bg-emerald-100 text-emerald-700 font-chakra font-bold text-xs px-3 py-1 rounded-lg">
                              ✅ ОК
                            </span>
                          ) : (
                            <div className="flex flex-wrap gap-1.5 justify-end">
                              {pc.game_issues.length > 0 && (
                                <span className="bg-amber-100 text-amber-700 font-chakra font-bold text-xs px-2 py-1 rounded-lg">
                                  🎮 {pc.game_issues.length}
                                </span>
                              )}
                              {pc.fac_issues.length > 0 && (
                                <span className="bg-rose-100 text-rose-700 font-chakra font-bold text-xs px-2 py-1 rounded-lg">
                                  🛡 FAC
                                </span>
                              )}
                              {pc.disk_low && (
                                <span className="bg-orange-100 text-orange-700 font-chakra font-bold text-xs px-2 py-1 rounded-lg">
                                  💾 Диск
                                </span>
                              )}
                            </div>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="text-slate-400 shrink-0" size={18} />
                          ) : (
                            <ChevronDown className="text-slate-400 shrink-0" size={18} />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 space-y-4 border-t border-slate-100">
                          {/* Games */}
                          {pc.game_issues.length > 0 && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Gamepad2 className="text-amber-500" size={16} />
                                <span className="font-chakra font-bold text-xs text-slate-500 uppercase tracking-widest">Игры</span>
                              </div>
                              <div className="space-y-1.5">
                                {pc.game_issues.map((g, i) => (
                                  <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-slate-100 text-sm">
                                    <span className="font-chakra text-slate-700 font-medium">{g.game}</span>
                                    {g.status === 'missing' ? (
                                      <span className="text-rose-500 font-chakra font-bold text-xs">❌ Не найдена</span>
                                    ) : (
                                      <span className="text-amber-600 font-chakra text-xs">
                                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">{g.local}</code>
                                        <span className="mx-1">→</span>
                                        <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[11px]">{g.ref}</code>
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* FAC */}
                          {pc.fac_issues.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="text-rose-500" size={16} />
                                <span className="font-chakra font-bold text-xs text-slate-500 uppercase tracking-widest">Faceit Anti-Cheat</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {pc.fac_issues.map((fi, i) => (
                                  <span key={i} className="bg-rose-50 border border-rose-200 text-rose-700 font-chakra font-bold text-xs px-3 py-1.5 rounded-lg">
                                    ❌ {fi}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Disks */}
                          {pc.disks.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <HardDrive className="text-blue-500" size={16} />
                                <span className="font-chakra font-bold text-xs text-slate-500 uppercase tracking-widest">Диски</span>
                              </div>
                              <div className="space-y-2">
                                {pc.disks.map((d, i) => {
                                  const barColor = d.used_pct > 90 ? 'bg-rose-500' : d.used_pct > 80 ? 'bg-amber-500' : 'bg-emerald-500';
                                  return (
                                    <div key={i} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-chakra text-sm text-slate-600 font-medium">{d.drive}</span>
                                        <span className={`font-chakra text-xs font-bold ${d.status === 'LOW' ? 'text-rose-500' : 'text-emerald-600'}`}>
                                          {d.free_gb} GB свободно / {d.total_gb} GB
                                        </span>
                                      </div>
                                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${d.used_pct}%` }} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* All OK */}
                          {pc.game_issues.length === 0 && pc.fac_issues.length === 0 && !pc.disk_low && (
                            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                              <CheckCircle2 className="text-emerald-500 mx-auto mb-2" size={24} />
                              <span className="font-chakra text-emerald-700 text-sm font-bold">Все проверки пройдены</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
