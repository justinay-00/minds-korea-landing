import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Mic, Plus, Wifi } from 'lucide-react';
import { getScenarios } from '../data/landingData';

export default function LaptopDemo({ language }: { language: 'en' | 'ko' }) {
  const scenarios = getScenarios(language);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const activeScenario = scenarios[activeScenarioIndex] || scenarios[0];
  const messages = activeScenario.messages?.length
    ? activeScenario.messages
    : [activeScenario.reachOutMessage];
  const hasSecondMessage = messages.length > 1;

  const scenarioHeaderColors: Record<string, string> = {
    'travel-shield': 'bg-[#4EA5F1]/18',
    'invoice-triage': 'bg-[#FFC34A]/18',
    'cafe-inventory': 'bg-[#FF6B4A]/16',
    'competitor-radar': 'bg-[#2ED9A0]/16',
  };
  const scenarioHeaderLogos: Record<string, { src: string; alt: string }> = {
    'travel-shield': { src: '/assets/aistudio/ktx-logo.webp', alt: 'KTX' },
    'competitor-radar': { src: '/assets/aistudio/mirae-asset-logo.jpg', alt: 'Mirae Asset' },
  };

  const [showTyping1, setShowTyping1] = useState(false);
  const [showMsg1, setShowMsg1] = useState(false);
  const [showTyping2, setShowTyping2] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showUserReply, setShowUserReply] = useState(false);
  const [showReadReceipt, setShowReadReceipt] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSwipingOut, setIsSwipingOut] = useState(false);
  const scenarioDuration = hasSecondMessage ? 7600 : 6200;

  const navigateScenario = (direction: -1 | 1) => {
    setIsSwipingOut(false);
    setActiveScenarioIndex((index) => (index + direction + scenarios.length) % scenarios.length);
  };

  useEffect(() => {
    setShowTyping1(false);
    setShowMsg1(false);
    setShowTyping2(false);
    setShowMsg2(false);
    setShowCard(false);
    setShowUserReply(false);
    setShowReadReceipt(false);
    setIsConfirmed(false);

    const timeouts: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setShowTyping1(true), 300),
      setTimeout(() => {
        setShowTyping1(false);
        setShowMsg1(true);
      }, 650),
    ];

    if (hasSecondMessage) {
      timeouts.push(
        setTimeout(() => setShowTyping2(true), 1250),
        setTimeout(() => {
          setShowTyping2(false);
          setShowMsg2(true);
        }, 1550),
        setTimeout(() => setShowCard(true), 2500),
        setTimeout(() => setShowUserReply(true), 3400),
        setTimeout(() => setShowReadReceipt(true), 3850),
        setTimeout(() => setIsConfirmed(true), 3900),
      );
    } else {
      timeouts.push(
        setTimeout(() => setShowCard(true), 1700),
        setTimeout(() => setShowUserReply(true), 2600),
        setTimeout(() => setShowReadReceipt(true), 3050),
        setTimeout(() => setIsConfirmed(true), 3100),
      );
    }

    const swipeDuration = 520;
    timeouts.push(
      setTimeout(() => setIsSwipingOut(true), scenarioDuration - swipeDuration),
      setTimeout(() => {
        setActiveScenarioIndex((index) => (index + 1) % scenarios.length);
        setIsSwipingOut(false);
      }, scenarioDuration),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [activeScenarioIndex, hasSecondMessage, scenarioDuration]);

  const getScenarioUserReply = (id: string) => {
    switch (id) {
      case 'travel-shield':
        return language === 'ko' ? '응, 오전 8시 표로 예약해 줘!' : 'Yes, please confirm the 8 am ticket!';
      case 'invoice-triage':
        return language === 'ko' ? '승인할게. 결제 진행해 줘.' : 'Approved, go ahead with the payment.';
      case 'cafe-inventory':
        return language === 'ko' ? '좋아. 재고 보충 주문해 줘.' : 'Looks good, please place the restock order.';
      case 'competitor-radar':
        return language === 'ko' ? '고마워. 종목 업데이트 확인해볼게.' : 'Thanks, I’ll review the stock update.';
      default:
        return language === 'ko' ? '확인했어. 진행해 줘!' : 'Confirmed, please proceed!';
    }
  };

  const messageBubble = (message: string, isTyping: boolean) => (
    <div
      className="flex w-full items-start gap-2 max-[375px]:gap-1 sm:w-[min(78%,400px)]"
    >
      <img
        src="/assets/aistudio/minds-character-orb.png"
        alt=""
        className="mt-1 h-9 w-9 shrink-0 rounded-full border-2 border-white bg-[#EAF3FF] object-contain shadow-lg"
      />
      <div className="animate-message-pop rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-[12px] text-left text-sm font-medium leading-snug text-slate-800 shadow-lg sm:p-[16px] sm:text-base sm:leading-relaxed">
        {isTyping ? (
          <span className="flex items-center gap-1.5 py-1">
            {[0, 150, 300].map((animationDelay) => (
              <span
                key={animationDelay}
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500"
                style={{ animationDelay: `${animationDelay}ms` }}
              />
            ))}
          </span>
        ) : (
          <>
            <span className="mb-1 block text-[11px] font-semibold text-slate-500">Minds</span>
            “{message}”
          </>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 glow-ambient" />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="relative mx-auto h-[640px] w-full max-w-[1040px] overflow-x-visible overflow-y-clip pt-[88px] sm:h-[760px] sm:pt-[140px]">
          <img
            src="/assets/aistudio/abbypeeking.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-44px] z-30 w-[320px] max-w-none -translate-x-1/2 sm:top-[-36px] sm:w-[460px]"
          />
          <div className="flex justify-center">
            <div className="relative h-[680px] w-full max-w-[560px] shrink-0 sm:h-[740px]">
              <div className="pointer-events-none absolute -left-[3px] top-[112px] z-20 h-7 w-[3px] rounded-l-[1.5px] bg-[#3a3a3c]" />
              <div className="pointer-events-none absolute -left-[3px] top-[148px] z-20 h-12 w-[3px] rounded-l-[1.5px] bg-[#3a3a3c]" />
              <div className="pointer-events-none absolute -left-[3px] top-[204px] z-20 h-12 w-[3px] rounded-l-[1.5px] bg-[#3a3a3c]" />
              <div className="pointer-events-none absolute -right-[3px] top-[168px] z-20 h-16 w-[3px] rounded-r-[1.5px] bg-[#3a3a3c]" />

              <div className="relative h-full rounded-[44px] bg-[#1c1c1e] p-[12px] shadow-[0_18px_30px_rgba(51,65,85,0.28),0_40px_80px_-16px_rgba(51,65,85,0.55)] ring-1 ring-black/50">
                <div className="pointer-events-none absolute inset-px z-20 rounded-[43px] ring-1 ring-inset ring-white/20" />
                <div className="relative h-full overflow-hidden rounded-[32px] bg-white">
                  <div
                    className="relative flex h-full w-full min-w-0 select-none flex-col overflow-hidden bg-[#EAF3FF]"
                    style={{
                      backgroundImage: "url('/assets/aistudio/Screenshot_2026-11-10_at_3.10.10_PM_e4e22b65.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="relative z-20">
                      <div
                        aria-hidden="true"
                        className={`phone-header-fill ${scenarioHeaderColors[activeScenario.id] ?? 'bg-[#4EA5F1]/18'}`}
                      />
                      <div className="relative flex h-11 items-center px-6">
                        <span className="text-[13px] font-semibold tabular-nums tracking-tight text-slate-900">9:41</span>
                        <div
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-7 w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)]"
                        >
                          <span className="absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#1a1a1c] ring-1 ring-white/15" />
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-slate-900" aria-hidden="true">
                          <span className="flex items-end gap-[2px]">
                            <span className="h-[5px] w-[3px] rounded-[0.5px] bg-slate-900" />
                            <span className="h-[7px] w-[3px] rounded-[0.5px] bg-slate-900" />
                            <span className="h-[9px] w-[3px] rounded-[0.5px] bg-slate-900" />
                            <span className="h-[11px] w-[3px] rounded-[0.5px] bg-slate-900" />
                          </span>
                          <Wifi className="ml-0.5 h-3.5 w-3.5" strokeWidth={2.5} />
                          <span className="ml-0.5 flex items-center gap-[1px]">
                            <span className="h-[11px] w-[22px] rounded-[3px] border-[1.5px] border-slate-900 p-px">
                              <span className="block h-full w-full rounded-[1px] bg-slate-900" />
                            </span>
                            <span className="h-[4px] w-[1.5px] rounded-r-[1px] bg-slate-900" />
                          </span>
                        </div>
                      </div>
                      <div className="relative flex items-center gap-2.5 px-5 pb-2.5 pt-0.5">
                        {scenarioHeaderLogos[activeScenario.id] ? (
                          <img
                            src={scenarioHeaderLogos[activeScenario.id].src}
                            alt={scenarioHeaderLogos[activeScenario.id].alt}
                            className="h-8 w-8 shrink-0 rounded-[9px] object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white/90"
                            aria-hidden="true"
                          >
                            <div className="grid grid-cols-2 gap-[2px]">
                              <span className="h-2 w-2 rounded-[2px] bg-[#3D7EED]" />
                              <span className="h-2 w-2 rounded-[2px] bg-[#FF6B4A]" />
                              <span className="h-2 w-2 rounded-[2px] bg-[#FFC34A]" />
                              <span className="h-2 w-2 rounded-[2px] bg-[#2ED9A0]" />
                            </div>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold leading-tight text-slate-900">
                            {activeScenario.title}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => navigateScenario(-1)}
                            aria-label={language === 'ko' ? '이전 사례' : 'Previous scenario'}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-600 transition hover:bg-white hover:text-slate-900"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigateScenario(1)}
                            aria-label={language === 'ko' ? '다음 사례' : 'Next scenario'}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-600 transition hover:bg-white hover:text-slate-900"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="min-h-0 flex-1" />

                    <div className="glass-card-v2 glass-static z-10 flex items-center gap-[8px] border-t border-slate-200/70 px-[16px] pb-6 pt-[12px]">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Plus className="h-4 w-4" />
                      </div>
                      <div className="flex min-w-0 flex-1 items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-400 shadow-sm">
                        <span>{language === 'ko' ? '마인즈에게 메시지 보내기...' : 'Message your Minds assistant...'}</span>
                        <Mic className="ml-3 h-3.5 w-3.5 shrink-0" />
                      </div>
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-slate-900/80"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-40">
                <div
                  key={activeScenarioIndex}
                  className={`${isSwipingOut ? 'scenario-swipe-out' : 'scenario-swipe-in'} absolute inset-0`}
                >
                  <div className="absolute inset-x-0 top-[118px] flex flex-col gap-2 max-[375px]:top-[106px] max-[375px]:gap-1">
                    <div className="ml-[-16px] flex w-full flex-col gap-2 max-[375px]:gap-1 sm:ml-[-80px]">
                      {(showTyping1 || showMsg1) && messageBubble(messages[0] || '', !showMsg1)}
                      {(showTyping2 || showMsg2) && messageBubble(messages[1] || '', !showMsg2)}
                    </div>

                    {showCard && activeScenario.interactivePayload && (
                      <div className="animate-card-pop -ml-4 flex w-[min(90%,440px)] items-end gap-2 sm:-ml-[80px]">
                      <img
                        src="/assets/aistudio/minds-character-orb.png"
                        alt=""
                        className="mb-1 h-9 w-9 shrink-0 rounded-full border-2 border-white bg-[#EAF3FF] object-contain shadow-lg"
                      />
                      <div className="relative min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-[16px] text-left shadow-lg">
                        <div className="mb-2 flex items-center justify-between gap-2 text-[11px] font-mono">
                          <span className="flex items-center gap-2 font-semibold uppercase tracking-wide text-blue-700">
                            {scenarioHeaderLogos[activeScenario.id] && (
                              <img
                                src={scenarioHeaderLogos[activeScenario.id].src}
                                alt={scenarioHeaderLogos[activeScenario.id].alt}
                                className="h-6 w-6 rounded-md border border-slate-200 object-cover"
                              />
                            )}
                            {language === 'ko' ? '제안' : 'Proposal'}
                          </span>
                          <span className="shrink-0 font-medium text-emerald-600">{activeScenario.details.confidence}</span>
                        </div>
                        <div className="mb-2 grid grid-cols-2 gap-1.5">
                          {Object.entries(activeScenario.interactivePayload.metadata).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="min-w-0 rounded-lg border border-slate-100 bg-slate-50 p-[8px]">
                              <span className="block truncate text-[11px] font-mono uppercase text-slate-400">{key}</span>
                              <span className="mt-0.5 block truncate text-xs font-medium text-slate-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-center text-xs font-semibold ${isConfirmed ? 'bg-emerald-50 text-emerald-800' : 'border border-slate-200 bg-slate-100 text-slate-700 shadow-inner'}`}>
                          <Check className={`h-3.5 w-3.5 ${isConfirmed ? 'text-emerald-600' : 'text-blue-700'}`} />
                          <span className="truncate">
                            {isConfirmed
                              ? language === 'ko' ? '확인 및 처리 완료' : 'Confirmed & Processed'
                              : activeScenario.interactivePayload.primaryActionLabel}
                          </span>
                        </div>
                      </div>
                      </div>
                    )}

                    {showUserReply && (
                      <div className="animate-user-pop ml-auto mr-[-16px] w-[min(70%,300px)] sm:mr-[-48px]">
                        <div className="rounded-2xl rounded-tr-sm bg-[#7165EA] px-3.5 py-2 text-center text-sm font-semibold leading-snug text-white shadow-[0_18px_44px_-12px_rgba(61,126,237,0.4)] max-[375px]:px-2.5 max-[375px]:py-1.5 sm:px-3.5 sm:py-2 sm:text-base">
                          {getScenarioUserReply(activeScenario.id)}
                          <span
                            className={`mt-1 block text-right text-[10px] font-medium tracking-wide text-white/75 transition-opacity duration-300 ${showReadReceipt ? 'opacity-100' : 'opacity-0'}`}
                          >
                            {language === 'ko' ? '읽음 19:46' : 'Read 19:46'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
