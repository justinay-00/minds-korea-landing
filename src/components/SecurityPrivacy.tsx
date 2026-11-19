import { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Sparkles, 
  Database, 
  Layers, 
  Wifi,
  ArrowUpRight 
} from 'lucide-react';

interface SecurityPrivacyProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function SecurityPrivacy({ onOpenModal, language }: SecurityPrivacyProps) {
  const [dataToggle, setDataToggle] = useState<boolean>(true);

  const pillars = language === 'ko' ? [
    {
      number: '01',
      title: '내 데이터는 내가 소유',
      description: 'Mind의 기억은 온전히 사용자의 것이에요. 서비스를 떠나거나 초기화해도 데이터는 사용자와 함께해요. 광고 중개업체와 공유하지 않아요.',
      icon: Database,
      tag: '직접 관리',
    },
    {
      number: '02',
      title: '암호화된 작업 공간',
      description: '루틴과 확인 작업은 사용자만 승인할 수 있는 분리된 비공개 환경에서 실행돼요.',
      icon: Lock,
      tag: '정보 유출 방지',
    },
    {
      number: '03',
      title: 'Moca Network 기반',
      description: '탈중앙화 신원 기술을 바탕으로 복잡한 설정 없이도 높은 수준의 보안을 제공해요.',
      icon: Layers,
      tag: '탈중앙화 ID',
      hasReadMore: true,
    },
  ] : [
    {
      number: '01',
      title: 'True Data Ownership',
      description: 'You own your data and preferences. If you leave or reset, your data goes with you. No advertiser brokers, ever.',
      icon: Database,
      tag: 'Self-Custody',
    },
    {
      number: '02',
      title: 'Encrypted Task Sandboxes',
      description: 'Routines and checks execute in isolated, private environments that only you can authorize.',
      icon: Lock,
      tag: 'Zero-Leak',
    },
    {
      number: '03',
      title: 'Powered by Moca Network',
      description: 'Built on decentralized identity tech, delivering institutional-grade security with zero complicated setup.',
      icon: Layers,
      tag: 'Decentralized ID',
      hasReadMore: true,
    },
  ];

  return (
    <section id="security" className="py-[60px] sm:py-[60px] bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] glow-ambient pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-[24px] sm:px-[40px] lg:px-[48px]">
        {/* 1. Section Header & Copy */}
        <div className="mx-auto mb-[24px] max-w-4xl text-center sm:mb-[40px]">
          <h2 className="mb-[12px] text-3xl font-extrabold tracking-tight text-slate-950 text-balance sm:text-4xl xl:text-5xl">
            <span className="block">
              {language === 'ko' ? '개인정보는 엄격하게 보호돼요.' : 'Your data stays yours.'}
            </span>
            <span className="block">
              {language === 'ko' ? '데이터는 저희가 책임질테니, 걱정말아요.' : "Don't worry — we specialize in digital identity."}
            </span>
          </h2>

        </div>

        {/* Main Content Grid: Highly Visual Digital Identity Card on Left, 3 Micro-Pillars on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[40px] items-center">
          
          {/* 1. Visual Element: Highly Visual, Clean Digital Identity Card (Left on Desktop, 5 columns) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start lg:pr-4">
            <div className="w-full max-w-[420px] relative group">
              {/* Luminous aura behind card */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-500/35 via-cyan-500/25 to-emerald-400/35 rounded-[36px] blur-xl opacity-80 group-hover:opacity-100 transition duration-500 pointer-events-none -z-10" />

              {/* The Physical-Digital Identity Card Container with Scanning Animation */}
              <div className="rounded-[30px] p-6 sm:p-7 bg-slate-950/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-white relative overflow-hidden transition-all duration-300">
                
                {/* Looping Top-to-Bottom Cyber Scanning Laser Bar + Beam Aura */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)] pointer-events-none z-30 animate-card-scanner" />
                <div className="absolute inset-x-0 h-14 bg-gradient-to-b from-cyan-400/15 via-cyan-400/5 to-transparent pointer-events-none z-20 animate-card-scanner -translate-y-12" />

                {/* Holographic Rainbow Foil Shimmer Strip across the top edge */}
                <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-amber-300 via-emerald-400 via-cyan-400 to-blue-500 rounded-full opacity-90 mb-5 shadow-xs" />

                {/* Subtle Guilloche / Cyber Background Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Cyber gradient light flares */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-500/25 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* TOP ROW: Green Glowing Status Indicator + Moca Network Pill Badge */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-400 tracking-wide uppercase">
                      {language === 'ko' ? '인증된 디지털 ID' : 'Verified Digital ID'}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-[11px] font-mono font-semibold tracking-wider flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-sky-300" />
                    Moca Network
                  </span>
                </div>

                {/* SMART CARD HARDWARE CHIP & NFC CONTACTLESS ZONE */}
                <div className="pt-3.5 pb-2 flex items-center justify-between relative z-10">
                  {/* Metallic EMV Gold Contact Chip */}
                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-200/80 shadow-md p-0.5 flex flex-col justify-between relative overflow-hidden">
                    <div className="h-[1px] bg-amber-700/50 w-full" />
                    <div className="flex justify-between items-center h-full px-0.5">
                      <div className="w-[1px] h-full bg-amber-700/50" />
                      <div className="w-3 h-2.5 rounded-xs border border-amber-700/60 bg-amber-300/40" />
                      <div className="w-[1px] h-full bg-amber-700/50" />
                    </div>
                    <div className="h-[1px] bg-amber-700/50 w-full" />
                  </div>

                  <Wifi className="w-4 h-4 rotate-90 text-sky-300/70" />
                </div>

                {/* Profile header */}
                <div className="py-2.5 flex items-center gap-4 relative z-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-400/10 text-lg font-bold tracking-wide text-sky-200 shadow-lg">
                    {language === 'ko' ? '김' : 'JH'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      <span className="truncate">{language === 'ko' ? '김지호' : 'Ji Ho Kim'}</span>
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    </div>
                    <span className="mt-1 block truncate text-xs font-mono text-slate-400">
                      @jiho.moca
                    </span>
                  </div>
                </div>

                {/* CLEAN SWITCH / TOGGLE ROW: "Data Access: Private to You Only" */}
                <div className="p-[16px] rounded-2xl bg-white/[0.05] border border-white/10 my-[12px] flex items-center justify-between gap-[8px] relative z-10">
                  <span className="min-w-0 pr-[8px] text-left text-xs sm:text-sm font-semibold leading-snug text-white">
                    {language === 'ko' ? '데이터 접근: 나만 볼 수 있어요' : 'Data Access: Private to You Only'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setDataToggle(!dataToggle)}
                    aria-label={language === 'ko' ? '데이터 접근 개인정보 설정 전환' : 'Toggle data access privacy'}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                      dataToggle ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        dataToggle ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* MICRO-METRIC ROW: "Encryption: 256-bit Sandbox" & "Ad-Tracking: Zero" */}
                <div className="grid grid-cols-2 gap-2.5 relative z-10 pt-0.5">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'ko' ? '암호화' : 'Encryption'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-sky-400" />
                      {language === 'ko' ? '256비트 샌드박스' : '256-bit Sandbox'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      {language === 'ko' ? '광고 추적' : 'Ad-Tracking'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {language === 'ko' ? '없음' : 'Zero'}
                    </span>
                  </div>
                </div>

                {/* BARCODE GRAPHIC (Visual Only, No Extra Text) */}
                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-[2px] h-3.5 opacity-40">
                    {[2, 3, 1, 4, 3, 2, 4, 1, 2, 4, 1, 3, 2, 5, 2, 3, 1, 4, 2, 3].map((w, i) => (
                      <div 
                        key={i} 
                        className="bg-white h-full rounded-xs" 
                        style={{ width: `${w}px` }} 
                      />
                    ))}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                </div>

              </div>
            </div>
          </div>

          {/* 2. Micro-Pillars (Right on Desktop, 7 columns) */}
          <div className="lg:col-span-7 space-y-3 lg:pl-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="glass-card-v2 p-[16px] rounded-2xl transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="mb-[8px] flex flex-wrap items-center justify-between gap-[8px]">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
                          {pillar.number}. {pillar.title}
                        </h3>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-blue-800 border border-sky-200 shrink-0">
                          {pillar.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Click to read more button for Moca Network pillar */}
                      {pillar.hasReadMore && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenModal();
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-sky-600 transition-colors cursor-pointer group/link"
                          >
                            <span>{language === 'ko' ? '자세히 보기' : 'Click to read more'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
