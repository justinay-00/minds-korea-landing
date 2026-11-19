import {
  ArrowUpRight,
} from 'lucide-react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface SecurityPrivacyProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function SecurityPrivacy({ onOpenModal, language }: SecurityPrivacyProps) {
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
    <section id="security" ref={revealRef} className="reveal-on-scroll relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-r from-[#EAF3FF]/70 via-slate-50 to-[#FF6B4A]/8 py-[24px] sm:py-[44px]">
      <div className="privacy-grain pointer-events-none absolute inset-0 -z-0" />

      <div className="relative z-10 mx-auto max-w-5xl px-[24px] sm:px-[40px] lg:px-[48px]">
        {/* 1. Section Header & Copy */}
        <div className="reveal-item mb-[12px] w-full text-left sm:mb-[24px] sm:text-center" style={{ ['--reveal-delay' as string]: '0ms' }}>
          <h2 className="mb-[8px] text-2xl font-bold tracking-tight text-slate-950 text-balance sm:text-4xl xl:text-5xl">
            <span className="block">
              {language === 'ko' ? '개인정보는 엄격하게 보호돼요.' : 'Your data stays yours.'}
            </span>
            <span className="block">
              {language === 'ko' ? '데이터는 저희가 책임질 테니, 걱정 말아요.' : "Don't worry — we specialize in digital identity."}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-lg">
            {language === 'ko'
              ? '모든 기억과 실행 권한은 오직 나만 직접 관리할 수 있어요.'
              : 'You stay in control of every memory and permission.'}
          </p>
        </div>

        {/* Main Content Grid: Highly Visual Digital Identity Card on Left, 3 Micro-Pillars on Right */}
        <div className="grid grid-cols-1 items-start gap-[12px] sm:p-[16px] lg:grid-cols-12 lg:gap-[28px]">
          
          {/* 1. Visual Element: Highly Visual, Clean Digital Identity Card (Left on Desktop, 5 columns) */}
          <div className="reveal-item flex justify-center lg:col-span-6 lg:justify-start lg:pr-4" style={{ ['--reveal-delay' as string]: '80ms' }}>
            <div className="relative group w-full max-w-[520px]">
              <div className="pointer-events-none absolute -inset-2 -z-10 hidden" />

              <div className="relative flex flex-col overflow-hidden rounded-[16px] border border-white/50 bg-gradient-to-br from-[#405FDF] via-[#3D7EED] to-[#FF6B4A] p-2.5 text-white  aspect-[1.586/1] sm:p-3">
                <div className="pointer-events-none absolute inset-x-0 z-30 h-px animate-card-scanner bg-gradient-to-r from-transparent via-[#FF6B4A] to-transparent shadow-[0_0_8px_rgba(255,107,74,0.55)]" />
                <div className="pointer-events-none absolute inset-x-0 z-20 h-8 -translate-y-7 animate-card-scanner bg-gradient-to-b from-[#FF6B4A]/12 via-[#FF6B4A]/4 to-transparent" />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#FF6B4A]/20" />

                <div className="glass-card-v2 glass-static relative z-10 my-auto flex h-full min-h-0 w-full flex-1 flex-col justify-center overflow-hidden rounded-xl border border-white/70 px-[20px] py-[16px] sm:px-[32px] sm:py-[28px]">
                  <div className="mb-3 border-b border-slate-200/70 pb-2 sm:mb-5 sm:pb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
                      {language === 'ko' ? '사용자 개인 정보' : 'User ID Card'}
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-6">
                    <div
                      className="relative h-[88px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-[128px]"
                      role="img"
                      aria-label={language === 'ko' ? '프로필 자리 표시' : 'Profile placeholder'}
                    >
                      <div className="absolute left-1/2 top-[16px] h-9 w-9 -translate-x-1/2 rounded-full bg-slate-300 sm:top-[22px] sm:h-12 sm:w-12" />
                      <div className="absolute -bottom-6 left-1/2 h-16 w-[4.5rem] -translate-x-1/2 rounded-full bg-slate-300" />
                    </div>
                    <div className="min-w-0 space-y-2 sm:space-y-4">
                      <div>
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
                          {language === 'ko' ? '이름' : 'Name'}
                        </span>
                        <span className="block truncate text-lg font-bold tracking-tight text-slate-950 sm:text-2xl">
                          {language === 'ko' ? '김지호' : 'Ji Ho Kim'}
                        </span>
                      </div>
                      <div>
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
                          {language === 'ko' ? '디지털 ID' : 'Digital ID'}
                        </span>
                        <span className="block truncate font-mono text-sm text-slate-600 sm:text-base">@jiho.moca</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Micro-Pillars (Right on Desktop, 7 columns) */}
          <div className="lg:col-span-6 space-y-1.5 sm:space-y-2 lg:pl-4">
            {pillars.map((pillar, index) => {
              return (
                <div
                  key={pillar.number}
                  className="reveal-item"
                  style={{ ['--reveal-delay' as string]: `${80 + index * 100}ms` }}
                >
                <div className="glass-card-v2 group rounded-2xl p-[12px] shadow-[0_10px_28px_-8px_rgba(51,65,85,0.22)] transition-all duration-200 sm:p-[16px]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#FF6B4A]/25 bg-[#FF6B4A]/10 text-xs font-bold tabular-nums tracking-tight text-[#FF6B4A] shadow-2xs transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:text-sm">
                      {pillar.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="mb-[4px] text-base font-bold tracking-tight text-slate-950 sm:mb-[8px] sm:text-lg">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Click to read more button for Moca Network pillar */}
                      {pillar.hasReadMore && (
                        <div className="mt-2 sm:mt-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenModal();
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B4A] transition-colors hover:text-[#E55538] cursor-pointer group/link"
                          >
                            <span>{language === 'ko' ? '자세히 보기' : 'Click to read more'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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
