import { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Mic, Plus } from 'lucide-react';
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
    'travel-shield': 'bg-sky-50/90 border-sky-200/70',
    'invoice-triage': 'bg-amber-50/90 border-amber-200/70',
    'cafe-inventory': 'bg-orange-50/90 border-orange-200/70',
    'competitor-radar': 'bg-emerald-50/90 border-emerald-200/70',
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
        setTimeout(() => setIsConfirmed(true), 3900),
      );
    } else {
      timeouts.push(
        setTimeout(() => setShowCard(true), 1700),
        setTimeout(() => setShowUserReply(true), 2600),
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
        return language === 'ko' ? '네, 오전 8시 표로 예약해 주세요!' : 'Yes, please confirm the 8 am ticket!';
      case 'invoice-triage':
        return language === 'ko' ? '승인할게요. 결제를 진행해 주세요.' : 'Approved, go ahead with the payment.';
      case 'cafe-inventory':
        return language === 'ko' ? '좋아요. 재고 보충 주문을 진행해 주세요.' : 'Looks good, please place the restock order.';
      case 'competitor-radar':
        return language === 'ko' ? '고마워요. 종목 업데이트를 확인해 볼게요.' : 'Thanks, I’ll review the stock update.';
      default:
        return language === 'ko' ? '확인했어요. 진행해 주세요!' : 'Confirmed, please proceed!';
    }
  };

  const messageBubble = (message: string, isTyping: boolean) => (
    <div
      className="flex w-full items-start gap-2 max-[375px]:gap-1 sm:w-[min(78%,400px)]"
    >
      <img
        src="/assets/aistudio/images_e51d87e1.jpg"
        alt=""
        className="mt-1 h-9 w-9 shrink-0 rounded-full border-2 border-white object-cover shadow-lg"
      />
      <div className="animate-message-pop glass-card-v2 rounded-2xl rounded-tl-sm p-[12px] text-left text-xs leading-snug text-slate-800 sm:p-[16px] sm:text-sm sm:leading-relaxed">
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
            <span className="mb-1 block text-[10px] font-semibold text-slate-500">Minds</span>
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
        <div className="relative mx-auto h-[665px] w-full max-w-[1040px] overflow-x-visible overflow-y-clip sm:h-[725px]">
          <div className="flex justify-center">
            <div className="relative h-[680px] w-[88%] max-w-[560px] shrink-0 rounded-[52px] border border-slate-300/90 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 p-[10px] shadow-2xl shadow-slate-400/60 sm:h-[740px] sm:p-3">
              <div className="rounded-[44px] border border-slate-700 bg-slate-800 p-1.5 shadow-inner sm:rounded-[46px]">
                <div className="overflow-hidden rounded-[36px] bg-white sm:rounded-[38px]">
                  <div
                    className="relative flex h-[640px] w-full min-w-0 select-none flex-col overflow-hidden bg-gradient-to-br from-[#E2ECFF] via-[#EFF4FF] to-[#FFF9F2] sm:h-[700px]"
                    style={{
                      backgroundImage: "url('/assets/aistudio/Screenshot_2026-11-10_at_3.10.10_PM_e4e22b65.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div
                      key={activeScenarioIndex}
                      className={`${isSwipingOut ? 'scenario-swipe-out' : 'scenario-swipe-in'} flex min-h-0 flex-1 flex-col`}
                    >
                      <div className={`z-10 flex items-center justify-between border-b py-2.5 pl-4 pr-20 shadow-2xs backdrop-blur-md ${scenarioHeaderColors[activeScenario.id] ?? 'bg-white/80 border-slate-200/60'}`}>
                        {scenarioHeaderLogos[activeScenario.id] && (
                          <img
                            src={scenarioHeaderLogos[activeScenario.id].src}
                            alt={scenarioHeaderLogos[activeScenario.id].alt}
                            className="mr-3 h-9 w-9 shrink-0 rounded-lg border border-white/80 object-cover shadow-sm"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-bold leading-tight text-slate-900">
                            {activeScenario.title}
                          </span>
                          <span className="block truncate text-[10px] text-slate-600">
                            {activeScenario.autonomousAction}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-3 top-2.5 z-20 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => navigateScenario(-1)}
                        aria-label={language === 'ko' ? '이전 사례' : 'Previous scenario'}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/70 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateScenario(1)}
                        aria-label={language === 'ko' ? '다음 사례' : 'Next scenario'}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/70 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="glass-card-v2 glass-static z-10 flex items-center gap-[8px] border-t border-slate-200/70 px-[16px] py-[12px]">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Plus className="h-4 w-4" />
                      </div>
                      <div className="flex min-w-0 flex-1 items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-400 shadow-sm">
                        <span>{language === 'ko' ? '마인즈에게 메시지 보내기...' : 'Message your Minds assistant...'}</span>
                        <Mic className="ml-3 h-3.5 w-3.5 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-40">
                <div
                  key={activeScenarioIndex}
                  className={`${isSwipingOut ? 'scenario-swipe-out' : 'scenario-swipe-in'} absolute inset-0`}
                >
                  <div className="absolute inset-x-0 top-[85px] flex flex-col gap-2 max-[375px]:top-[70px] max-[375px]:gap-1">
                    <div className="ml-[-16px] flex w-full flex-col gap-2 max-[375px]:gap-1 sm:ml-[-80px]">
                      {(showTyping1 || showMsg1) && messageBubble(messages[0] || '', !showMsg1)}
                      {(showTyping2 || showMsg2) && messageBubble(messages[1] || '', !showMsg2)}
                    </div>

                    {showCard && activeScenario.interactivePayload && (
                      <div className="animate-card-pop -ml-4 flex w-[min(90%,440px)] items-end gap-2 sm:-ml-[80px]">
                      <img
                        src="/assets/aistudio/images_e51d87e1.jpg"
                        alt=""
                        className="mb-1 h-9 w-9 shrink-0 rounded-full border-2 border-white object-cover shadow-lg"
                      />
                      <div className="relative min-w-0 flex-1 glass-card-v2 rounded-2xl rounded-bl-sm p-[16px] text-left">
                        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-mono">
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
                              <span className="block truncate text-[9px] font-mono uppercase text-slate-400">{key}</span>
                              <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-center text-[11px] font-semibold ${isConfirmed ? 'border border-emerald-300 bg-emerald-50 text-emerald-800' : 'border border-slate-200 bg-slate-100 text-slate-700 shadow-inner'}`}>
                          <Check className={`h-3.5 w-3.5 ${isConfirmed ? 'text-emerald-600' : 'text-blue-700'}`} />
                          <span className="truncate">
                            {isConfirmed
                              ? language === 'ko' ? '확인 및 처리 완료' : 'Confirmed & Processed'
                              : activeScenario.interactivePayload.primaryActionLabel}
                          </span>
                        </div>
                        <span aria-hidden="true" className="glass-bubble-tail absolute -bottom-1 left-4 h-2.5 w-2.5 rotate-45 border-b border-l border-white/80" />
                      </div>
                      </div>
                    )}

                    {showUserReply && (
                      <div className="animate-user-pop ml-auto mr-[-16px] w-[min(70%,300px)] sm:mr-[-48px]">
                        <div className="rounded-2xl rounded-tr-sm bg-slate-700 p-3.5 text-left text-xs font-medium leading-relaxed text-white shadow-[0_18px_44px_-12px_rgba(15,23,42,0.4)] max-[375px]:p-2.5 sm:p-4 sm:text-sm">
                          {getScenarioUserReply(activeScenario.id)}
                        </div>
                        <span className="mt-1 block text-right text-[10px] font-mono text-slate-500">
                          {language === 'ko' ? '읽음 19:46' : 'Seen 19:46'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-72 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
