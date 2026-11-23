import {
  ArrowUpRight,
} from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface SecurityPrivacyProps {
  language: 'en' | 'ko';
}

export default function SecurityPrivacy({ language }: SecurityPrivacyProps) {
  const revealRef = useRevealOnScroll<HTMLElement>();
  const pillars = language === 'ko' ? [
    {
      number: '01',
      title: '내 데이터는 내가 소유',
      description: '마인즈의 기억은 온전히 사용자의 것이에요. 서비스를 떠나거나 초기화해도 데이터는 사용자와 함께해요. 광고 중개업체와 공유하지 않아요.',
      tag: '직접 관리',
    },
    {
      number: '02',
      title: '암호화된 작업 공간',
      description: '루틴과 확인 작업은 사용자만 승인할 수 있는 분리된 비공개 환경에서 실행돼요.',
      tag: '정보 유출 방지',
    },
    {
      number: '03',
      title: 'Moca Network 기반',
      description: '탈중앙화 신원 기술을 바탕으로 복잡한 설정 없이도 높은 수준의 보안을 제공해요.',
      tag: '탈중앙화 ID',
      hasReadMore: true,
    },
  ] : [
    {
      number: '01',
      title: 'True Data Ownership',
      description: 'You own your data and preferences. If you leave or reset, your data goes with you. No advertiser brokers, ever.',
      tag: 'Self-Custody',
    },
    {
      number: '02',
      title: 'Encrypted Task Sandboxes',
      description: 'Routines and checks execute in isolated, private environments that only you can authorize.',
      tag: 'Zero-Leak',
    },
    {
      number: '03',
      title: 'Powered by Moca Network',
      description: 'Built on decentralized identity tech, delivering institutional-grade security with zero complicated setup.',
      tag: 'Decentralized ID',
      hasReadMore: true,
    },
  ];

  return (
    <section id="security" data-section="security" ref={revealRef} className="reveal-on-scroll relative overflow-hidden bg-gradient-to-r from-[#EAF3FF]/70 via-slate-50 to-[#FF6B4A]/8 py-[24px] sm:py-[44px]">
      <div className="privacy-grain pointer-events-none absolute inset-0 -z-0" />

      <div className="relative z-10 mx-auto max-w-5xl px-[24px] sm:px-[40px] lg:px-[48px]">
        {/* 1. Section Header & Copy */}
        <div className="reveal-item mb-[12px] w-full text-left sm:mb-[24px]" style={{ ['--reveal-delay' as string]: '0ms' }}>
          <h2 className="mb-[8px] text-2xl font-bold tracking-tight text-slate-950 text-balance sm:text-4xl xl:text-5xl">
            <span className="block">
              {language === 'ko' ? '개인정보는 엄격하게 보호돼요.' : 'Your data stays yours.'}
            </span>
            <span className="block">
              {language === 'ko' ? '데이터는 저희가 책임질 테니, 걱정 말아요.' : "Don't worry — we specialize in digital identity."}
            </span>
          </h2>
        </div>

        {/* Main Content Grid: Highly Visual Digital Identity Card on Left, 3 Micro-Pillars on Right */}
        <div className="grid grid-cols-1 items-stretch gap-[12px] sm:p-[16px] lg:grid-cols-12 lg:gap-[28px]">
          
          {/* 1. Visual Element: Highly Visual, Clean Digital Identity Card (Left on Desktop, 5 columns) */}
          <div className="reveal-item flex justify-center lg:col-span-6 lg:justify-start lg:pr-4" style={{ ['--reveal-delay' as string]: '80ms' }}>
            <div className="@container relative group w-[86%] max-w-[360px] [container-type:inline-size] lg:w-full lg:max-w-[520px]">
              <div className="pointer-events-none absolute -inset-2 -z-10 hidden" />

              <div className="relative flex flex-col overflow-hidden rounded-[16px] border border-white/50 bg-gradient-to-br from-[#405FDF] via-[#3D7EED] to-[#FF6B4A] p-2.5 text-white aspect-[1.586/1]">
                <div className="pointer-events-none absolute inset-x-0 z-30 h-[2px] animate-card-scanner bg-gradient-to-r from-[#FF6B4A]/35 via-[#FF6B4A] to-[#FF6B4A]/35 shadow-[0_0_16px_rgba(255,107,74,0.9),0_0_5px_rgba(255,107,74,1)]" />
                <div className="pointer-events-none absolute inset-x-0 z-20 h-8 -translate-y-6 animate-card-scanner bg-gradient-to-b from-[#FF6B4A]/55 via-[#FF6B4A]/18 to-transparent" />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#FF6B4A]/20" />

                <div className="glass-card-v2 glass-static relative z-10 my-auto flex h-full min-h-0 w-full flex-1 flex-col justify-center overflow-hidden rounded-xl border border-white/70 px-[20px] py-[5cqi]">
                  <div className="id-panel-texture" aria-hidden="true" />
                  <div className="relative z-10 mb-[3.7cqi] border-b border-slate-200/70 pb-[2.4cqi]">
                    <span className="text-[clamp(0.6875rem,3.2cqi,0.875rem)] font-semibold uppercase tracking-wider text-slate-500">
                      {language === 'ko' ? '사용자 개인 정보' : 'User ID Card'}
                    </span>
                  </div>
                  <div className="relative z-10 grid grid-cols-[26%_minmax(0,1fr)] items-center gap-4">
                    <div
                      className="relative aspect-[80/88] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                      role="img"
                      aria-label={language === 'ko' ? '프로필 자리 표시' : 'Profile placeholder'}
                    >
                      <div className="absolute left-1/2 top-[18%] h-[41%] w-[45%] -translate-x-1/2 rounded-full bg-slate-300" />
                      <div className="absolute -bottom-[27%] left-1/2 h-[73%] w-[90%] -translate-x-1/2 rounded-full bg-slate-300" />
                    </div>
                    <div className="min-w-0 space-y-[2.4cqi]">
                      <div>
                        <span className="mb-1 block text-[clamp(0.6875rem,3.2cqi,0.875rem)] font-semibold uppercase tracking-wider text-slate-500">
                          {language === 'ko' ? '이름' : 'Name'}
                        </span>
                        <span className="block truncate text-[clamp(1rem,5.2cqi,1.5rem)] font-bold leading-tight tracking-tight text-slate-950">
                          {language === 'ko' ? '김지호' : 'Ji Ho Kim'}
                        </span>
                      </div>
                      <div>
                        <span className="mb-1 block text-[clamp(0.6875rem,3.2cqi,0.875rem)] font-semibold uppercase tracking-wider text-slate-500">
                          {language === 'ko' ? '디지털 ID' : 'Digital ID'}
                        </span>
                        <span className="block truncate font-mono text-[clamp(0.75rem,3.6cqi,1rem)] text-slate-600">@jiho.moca</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Micro-Pillars (Right on Desktop, 7 columns) */}
          <div className="privacy-pillars-scroll no-scrollbar flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain overscroll-y-none touch-pan-x lg:col-span-6 lg:grid lg:h-auto lg:grid-rows-3 lg:snap-none lg:gap-2 lg:overflow-visible lg:overscroll-auto lg:touch-auto lg:pl-4">
            {pillars.map((pillar, index) => {
              return (
                <div
                  key={pillar.number}
                  className="reveal-item flex h-[10.5rem] min-h-0 w-[min(80%,280px)] shrink-0 snap-start self-stretch overflow-hidden lg:h-full lg:min-h-[8.5rem] lg:w-auto lg:shrink lg:overflow-visible"
                  style={{ ['--reveal-delay' as string]: `${80 + index * 100}ms` }}
                >
                <div className="glass-card-v2 group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl px-[12px] py-[6px] shadow-[0_10px_28px_-8px_rgba(51,65,85,0.22)] transition-all duration-200">
                  <div className="flex h-full items-center gap-2.5 sm:gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#FF6B4A]/25 bg-[#FF6B4A]/10 text-xs font-bold tabular-nums tracking-tight text-[#FF6B4A] shadow-2xs transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:text-sm">
                      {pillar.number}
                    </div>

                    <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center">
                      <h3 className="mb-[2px] text-base font-bold tracking-tight text-slate-950 sm:mb-[4px] sm:text-lg">
                        {pillar.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {pillar.description}
                      </p>

                      {/* Click to read more button for Moca Network pillar */}
                      {pillar.hasReadMore && (
                        <div className="mt-1.5 sm:mt-2">
                          <button
                            type="button"
                            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#FF6B4A] transition-colors hover:text-[#E55538] group/link"
                          >
                            <span>{language === 'ko' ? '자세히 보기' : 'Click to read more'}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </button>
                        </div>
                      )}
                    </div>
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
