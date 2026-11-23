import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
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
  const scenarioDuration = hasSecondMessage ? 6000 : 4800;

  const navigateScenario = (direction: -1 | 1) => {
    setIsSwipingOut(false);
    setActiveScenarioIndex((index) => (index + direction + scenarios.length) % scenarios.length);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [skipEnterAnimation, setSkipEnterAnimation] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const dragWidthRef = useRef(1);
  const axisLock = useRef<'x' | 'y' | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipEnterRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPanelRef = useRef<HTMLDivElement>(null);
  const currentPanelRef = useRef<HTMLDivElement>(null);
  const nextPanelRef = useRef<HTMLDivElement>(null);
  const autoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animateToScenarioRef = useRef<(direction: -1 | 1) => void>(() => {});
  const prevScenario = scenarios[(activeScenarioIndex - 1 + scenarios.length) % scenarios.length];
  const nextScenario = scenarios[(activeScenarioIndex + 1) % scenarios.length];
  const slideMs = 320;


  const mindsLabelText = language === 'ko' ? '마인즈 (Minds)' : 'Minds';

  const scenarioLogo = (scenario: (typeof scenarios)[number]) =>
    scenarioHeaderLogos[scenario.id] ? (
      <img
        src={scenarioHeaderLogos[scenario.id].src}
        alt={scenarioHeaderLogos[scenario.id].alt}
        className="h-6 w-6 shrink-0 rounded-[7px] object-cover sm:h-8 sm:w-8 sm:rounded-[9px]"
      />
    ) : (
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-white/90 sm:h-8 sm:w-8 sm:rounded-[9px]"
        aria-hidden="true"
      >
        <div className="grid grid-cols-2 gap-[2px]">
          <span className="h-2 w-2 rounded-[2px] bg-[#3D7EED]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#FF6B4A]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#FFC34A]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#2ED9A0]" />
        </div>
      </div>
    );

  const scenarioTitleRow = (scenario: (typeof scenarios)[number]) => (
    <div className="px-[8px] sm:px-[12px]">
      <div className="flex items-center px-3 pb-2.5 pt-0.5 sm:px-5">
        <span className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" aria-hidden="true" />
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2">
          {scenarioLogo(scenario)}
          <div className="min-w-0 max-w-[70%]">
            <span className="invisible block truncate text-center text-[11px] font-semibold leading-tight" aria-hidden="true">
              {mindsLabelText}
            </span>
            <span className="block truncate text-center text-[12px] font-semibold leading-tight text-slate-900 sm:text-[15px]">
              {scenario.title}
            </span>
          </div>
        </div>
        <span className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" aria-hidden="true" />
      </div>
    </div>
  );

  const isMobileSwipeEnabled = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;

  const setPanelTransforms = (x: number, withTransition: boolean) => {
    const timing = withTransition ? `transform ${slideMs}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none';
    const apply = (el: HTMLDivElement | null, value: string) => {
      if (!el) return;
      el.style.transition = timing;
      el.style.transform = value;
    };
    apply(prevPanelRef.current, `translate3d(calc(-100% + ${x}px), 0, 0)`);
    apply(currentPanelRef.current, `translate3d(${x}px, 0, 0)`);
    apply(nextPanelRef.current, `translate3d(calc(100% + ${x}px), 0, 0)`);
  };

  const animateToScenario = (direction: -1 | 1) => {
    if (!isMobileSwipeEnabled()) {
      navigateScenario(direction);
      return;
    }
    if (settleTimer.current) return;
    autoTimersRef.current.forEach(clearTimeout);
    autoTimersRef.current = [];
    const width = overlayRef.current?.getBoundingClientRect().width || dragWidthRef.current || 1;
    dragWidthRef.current = width;
    setIsDragging(false);
    setPanelTransforms(direction === 1 ? -width : width, true);
    settleTimer.current = setTimeout(() => {
      skipEnterRef.current = true;
      setSkipEnterAnimation(true);
      navigateScenario(direction);
      settleTimer.current = null;
    }, slideMs);
  };
  animateToScenarioRef.current = animateToScenario;

  const onScenarioPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isMobileSwipeEnabled()) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (settleTimer.current) return;
    autoTimersRef.current.forEach(clearTimeout);
    autoTimersRef.current = [];
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    axisLock.current = null;
    dragWidthRef.current = event.currentTarget.getBoundingClientRect().width || 1;
    dragXRef.current = 0;
    setPanelTransforms(0, false);
    setIsDragging(true);
  };

  const onScenarioPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current == null || pointerStartY.current == null) return;
    const dx = event.clientX - pointerStartX.current;
    const dy = event.clientY - pointerStartY.current;
    if (!axisLock.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axisLock.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (axisLock.current !== 'x') return;
    event.preventDefault();
    dragXRef.current = dx;
    setPanelTransforms(dx, false);
  };

  const finishScenarioPointer = () => {
    if (pointerStartX.current == null) return;
    const dx = dragXRef.current;
    const width = dragWidthRef.current;
    pointerStartX.current = null;
    pointerStartY.current = null;
    const committed = axisLock.current === 'x' && Math.abs(dx) >= Math.min(48, width * 0.18);
    axisLock.current = null;
    setIsDragging(false);
    if (!committed) {
      setPanelTransforms(0, true);
      return;
    }
    const direction: -1 | 1 = dx < 0 ? 1 : -1;
    setPanelTransforms(direction === 1 ? -width : width, true);
    settleTimer.current = setTimeout(() => {
      skipEnterRef.current = true;
      setSkipEnterAnimation(true);
      navigateScenario(direction);
      settleTimer.current = null;
    }, slideMs);
  };

  useLayoutEffect(() => {
    setPanelTransforms(0, false);
  }, [activeScenarioIndex]);

  useEffect(() => {
    if (skipEnterRef.current) {
      skipEnterRef.current = false;
      const clearSkip = window.setTimeout(() => setSkipEnterAnimation(false), 40);
      autoTimersRef.current.push(clearSkip);
    } else {
      setSkipEnterAnimation(false);
    }
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
    const track = (id: ReturnType<typeof setTimeout>) => {
      autoTimersRef.current.push(id);
      return id;
    };
    autoTimersRef.current = [];
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches) {
      timeouts.push(track(setTimeout(() => animateToScenarioRef.current(1), scenarioDuration)));
    } else {
      timeouts.push(
        track(setTimeout(() => setIsSwipingOut(true), scenarioDuration - swipeDuration)),
        track(setTimeout(() => {
          setActiveScenarioIndex((index) => (index + 1) % scenarios.length);
          setIsSwipingOut(false);
        }, scenarioDuration)),
      );
    }

    return () => {
      timeouts.forEach(clearTimeout);
      autoTimersRef.current = [];
    };
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

  const messageBubble = (message: string, isTyping: boolean, showAvatar = true, showName = true, animate = true) => (
    <div
      className="flex w-full items-start gap-2 max-[375px]:gap-1 sm:w-[min(78%,400px)]"
    >
      {showAvatar ? (
        <img
          src="/assets/aistudio/minds-character-orb.png"
          alt=""
          className="mt-1 h-9 w-9 shrink-0 rounded-full border-2 border-white bg-[#EAF3FF] object-contain shadow-lg"
        />
      ) : (
        <span className="mt-1 h-9 w-9 shrink-0" aria-hidden="true" />
      )}
      <div className={`${animate ? "animate-message-pop " : ""}rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-[12px] text-left text-[12px] font-medium leading-snug text-slate-800 shadow-lg sm:p-[12px] sm:text-[15px] sm:leading-snug`}>
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
            {showName && (
              <span className="mb-1 block text-[11px] font-semibold text-slate-500">Minds</span>
            )}
            “{message}”
          </>
        )}
      </div>
    </div>
  );

  const scenarioThread = (
    scenario: (typeof scenarios)[number],
    options: {
      complete?: boolean;
      showTyping1?: boolean;
      showMsg1?: boolean;
      showTyping2?: boolean;
      showMsg2?: boolean;
      showCard?: boolean;
      showUserReply?: boolean;
      showReadReceipt?: boolean;
      isConfirmed?: boolean;
    } = {},
  ) => {
    const complete = options.complete === true;
    const animate = !complete;
    const threadMessages = scenario.messages?.length ? scenario.messages : [scenario.reachOutMessage];
    const showTyping1 = complete ? false : !!options.showTyping1;
    const showMsg1 = complete ? true : !!options.showMsg1;
    const showTyping2 = complete ? false : !!options.showTyping2;
    const showMsg2 = complete ? Boolean(threadMessages[1]) : !!options.showMsg2;
    const showCard = complete ? Boolean(scenario.interactivePayload) : !!options.showCard;
    const showUserReply = complete ? true : !!options.showUserReply;
    const showReadReceipt = complete ? true : !!options.showReadReceipt;
    const isConfirmed = complete ? false : !!options.isConfirmed;

    return (
      <div className="flex flex-col gap-2 max-[375px]:gap-1 sm:pt-4">
        <div className="ml-[-24px] flex w-full flex-col gap-2 max-[375px]:gap-1 sm:ml-[-80px]">
          {(showTyping1 || showMsg1) && messageBubble(threadMessages[0] || '', showTyping1 && !showMsg1, false, false, animate)}
          {(showTyping2 || showMsg2) && messageBubble(threadMessages[1] || '', showTyping2 && !showMsg2, false, false, animate)}
        </div>

        {showCard && scenario.interactivePayload && (
          <div className={`${animate ? 'animate-card-pop ' : ''}-ml-[24px] flex w-[min(90%,440px)] items-end gap-2 pr-[20px] sm:-ml-[80px] sm:pr-0`}>
            <span className="mb-1 h-9 w-9 shrink-0" aria-hidden="true" />
            <div className="relative min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-[12px] text-left shadow-lg sm:p-[12px]">
              <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-mono sm:mb-2">
                <span className="flex items-center gap-2 font-semibold uppercase tracking-wide text-blue-700">
                  {scenarioHeaderLogos[scenario.id] && (
                    <img
                      src={scenarioHeaderLogos[scenario.id].src}
                      alt={scenarioHeaderLogos[scenario.id].alt}
                      className="h-5 w-5 rounded-md border border-slate-200 object-cover sm:h-6 sm:w-6"
                    />
                  )}
                </span>
                <span className="shrink-0 font-medium text-emerald-600">{scenario.details.confidence}</span>
              </div>
              <div className="mb-1.5 grid grid-cols-2 gap-1 sm:mb-2 sm:gap-1.5">
                {Object.entries(scenario.interactivePayload.metadata).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="min-w-0 rounded-lg border border-slate-100 bg-slate-50 px-[6px] py-[5px] sm:p-[8px]">
                    <span className="block truncate text-[10px] font-mono uppercase text-slate-400 sm:text-[11px]">{key}</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-900 sm:text-xs">{value}</span>
                  </div>
                ))}
              </div>
              <div className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-center text-[11px] font-semibold sm:py-2 sm:text-xs ${isConfirmed ? 'bg-emerald-50 text-emerald-800' : 'border border-slate-200 bg-slate-100 text-slate-700 shadow-inner'}`}>
                <Check className={`h-3.5 w-3.5 ${isConfirmed ? 'text-emerald-600' : 'text-blue-700'}`} />
                <span className="truncate">
                  {isConfirmed
                    ? language === 'ko' ? '확인 및 처리 완료' : 'Confirmed & Processed'
                    : scenario.interactivePayload.primaryActionLabel}
                </span>
              </div>
            </div>
          </div>
        )}

        {showUserReply && (
          <div className={`${animate ? 'animate-user-pop ' : ''}ml-auto mr-[20px] w-[min(72%,300px)] sm:mr-[-48px] sm:w-[min(70%,300px)]`}>
            <div className="rounded-2xl rounded-tr-sm bg-[#6076BE] px-3.5 py-2 text-center text-[12px] font-semibold leading-snug text-white shadow-[0_18px_44px_-12px_rgba(61,126,237,0.4)] max-[375px]:px-2.5 max-[375px]:py-1.5 sm:px-3 sm:py-1.5 sm:text-[15px]">
              {getScenarioUserReply(scenario.id)}
              <span
                className={`mt-1 block text-right text-[10px] font-medium tracking-wide text-white/75 transition-opacity duration-300 ${showReadReceipt ? 'opacity-100' : 'opacity-0'}`}
              >
                {language === 'ko' ? '읽음 19:46' : 'Read 19:46'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 glow-ambient" />

      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        <div className="relative mx-auto h-auto w-full max-w-[1040px] overflow-x-visible overflow-y-visible pt-[84px] pb-5 sm:h-[704px] sm:overflow-y-clip sm:pt-[140px] sm:pb-0">
          <div className="flex justify-center">
            <div className="relative w-[80%] max-w-[276px] shrink-0 sm:h-[740px] sm:w-full sm:max-w-[560px]">
              <div className="pointer-events-none absolute left-1/2 top-0 z-30 aspect-square w-[320px] max-w-full -translate-x-1/2 sm:top-[-176px] sm:w-[460px] sm:max-w-none">
                <img
                  src="/assets/aistudio/abbypeeking.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 top-[calc(8px-310/768*100%)] w-full max-w-none sm:top-0"
                />
              </div>
              <div className="pointer-events-none absolute -left-[3px] top-[112px] z-20 h-7 w-[3px] rounded-l-[1.5px] bg-[#48484a]" />
              <div className="pointer-events-none absolute -left-[3px] top-[148px] z-20 h-12 w-[3px] rounded-l-[1.5px] bg-[#48484a]" />
              <div className="pointer-events-none absolute -left-[3px] top-[204px] z-20 h-12 w-[3px] rounded-l-[1.5px] bg-[#48484a]" />
              <div className="pointer-events-none absolute -right-[3px] top-[168px] z-20 h-16 w-[3px] rounded-r-[1.5px] bg-[#48484a]" />

              <div className="absolute inset-0 rounded-[40px] bg-[#2a2a2c] p-[8px] shadow-[0_18px_30px_rgba(51,65,85,0.28),0_40px_80px_-16px_rgba(51,65,85,0.55)] ring-1 ring-black/50 sm:rounded-[44px] sm:p-[12px]">
                <div className="pointer-events-none absolute inset-px z-20 rounded-[43px] ring-1 ring-inset ring-white/20" />
                <div className="relative h-full overflow-hidden rounded-[28px] bg-white sm:rounded-[32px]">
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
                      <div className="relative flex h-11 items-center px-3 sm:px-6">
                        <span className="text-[13px] font-semibold tabular-nums tracking-tight text-slate-900">9:41</span>
                        <div
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-[18px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)] sm:h-7 sm:w-[92px]"
                        >
                          <span className="absolute right-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#1a1a1c] ring-1 ring-white/15 sm:right-2.5 sm:h-2.5 sm:w-2.5" />
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
                      <div
                        className="relative flex items-center px-3 pb-2.5 pt-0.5 sm:px-5"
                        aria-hidden="true"
                      >
                        <span className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2">
                          <span className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
                          <div className="min-w-0 max-w-[70%]">
                            <span className="block truncate text-center text-[11px] font-semibold leading-tight">&nbsp;</span>
                            <span className="block truncate text-center text-[12px] font-semibold leading-tight sm:text-[15px]">&nbsp;</span>
                          </div>
                        </div>
                        <span className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                      </div>
                    </div>

                    <div className="min-h-0 flex-1" />

                    <div className="glass-card-v2 glass-static z-10 hidden items-center gap-[8px] border-t border-slate-200/70 px-[16px] pb-6 pt-[12px] sm:flex">
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
              <div className="invisible grid sm:hidden" aria-hidden="true">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="col-start-1 row-start-1 pt-[52px] pb-8"
                  >
                    {scenarioTitleRow(scenario)}
                    {scenarioThread(scenario, { complete: true })}
                  </div>
                ))}
              </div>
              <img
                src="/assets/aistudio/minds-character-orb.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-[-16px] top-[122px] z-50 h-9 w-9 rounded-full border-2 border-white bg-[#EAF3FF] object-contain shadow-lg max-[375px]:top-[110px] sm:left-[-80px] sm:top-[138px]"
              />
              <div
                ref={overlayRef}
                className="absolute inset-x-0 bottom-[8px] top-[52px] z-40 touch-none overflow-hidden sm:bottom-[12px] sm:top-[56px] sm:touch-auto sm:overflow-visible"
                onPointerDown={onScenarioPointerDown}
                onPointerMove={onScenarioPointerMove}
                onPointerUp={finishScenarioPointer}
                onPointerCancel={finishScenarioPointer}
              >
                <div
                  ref={prevPanelRef}
                  className="absolute inset-0 will-change-transform sm:hidden"
                  style={{ transform: 'translate3d(-100%, 0, 0)' }}
                >
                  {scenarioTitleRow(prevScenario)}
                  {scenarioThread(prevScenario, { complete: true })}
                </div>
                <div
                  ref={currentPanelRef}
                  key={activeScenarioIndex}
                  className={`${!isDragging && !skipEnterAnimation ? (isSwipingOut ? 'scenario-swipe-out' : 'scenario-swipe-in') : ''} absolute inset-0 will-change-transform`}
                >
                  <div className="absolute inset-0">
                    {scenarioTitleRow(activeScenario)}
                    {scenarioThread(activeScenario, {
                      showTyping1,
                      showMsg1,
                      showTyping2,
                      showMsg2,
                      showCard,
                      showUserReply,
                      showReadReceipt,
                      isConfirmed,
                    })}
                  </div>
                </div>
                <div
                  ref={nextPanelRef}
                  className="absolute inset-0 will-change-transform sm:hidden"
                  style={{ transform: 'translate3d(100%, 0, 0)' }}
                >
                  {scenarioTitleRow(nextScenario)}
                  {scenarioThread(nextScenario, { complete: true })}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-[52px] z-50 sm:top-[56px]">
                <div className="px-[8px] sm:px-[12px]">
                  <div className="flex items-center px-3 pb-2.5 pt-0.5 sm:px-5">
                    <button
                      type="button"
                      onClick={() => animateToScenario(-1)}
                      aria-label={language === 'ko' ? '이전 사례' : 'Previous scenario'}
                      className="pointer-events-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#161616] text-white transition hover:bg-black sm:h-7 sm:w-7"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                    <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 sm:gap-2">
                      <span className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" aria-hidden="true" />
                      <div className="min-w-0 max-w-[70%]">
                        <span className="block truncate text-center text-[11px] font-semibold leading-tight text-slate-500">
                          {mindsLabelText}
                        </span>
                        <span className="invisible block truncate text-center text-[12px] font-semibold leading-tight sm:text-[15px]" aria-hidden="true">
                          &nbsp;
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => animateToScenario(1)}
                      aria-label={language === 'ko' ? '다음 사례' : 'Next scenario'}
                      className="pointer-events-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#161616] text-white transition hover:bg-black sm:h-7 sm:w-7"
                    >
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
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
