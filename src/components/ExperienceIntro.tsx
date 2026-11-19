import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface ExperienceIntroProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

function TypedMessage({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setShown('');
    setStarted(false);

    const el = wrapRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(text);
      return;
    }

    let startTimer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        startTimer = window.setTimeout(() => setStarted(true), 560);
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(startTimer);
    };
  }, [text]);

  useEffect(() => {
    if (!started) return;

    setShown('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 55);

    return () => window.clearInterval(id);
  }, [started, text]);

  return (
    <div ref={wrapRef} className="relative">
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {shown}
        {started && shown.length < text.length ? <span className="typing-caret" /> : null}
        {started && shown.length >= text.length ? <span className="typing-caret" /> : null}
      </span>
      <span className="sr-only">{text}</span>
    </div>
  );
}

export default function ExperienceIntro({ onOpenModal, language }: ExperienceIntroProps) {
  const revealRef = useRevealOnScroll<HTMLElement>();
  const message =
    language === 'ko'
      ? '오후에 미팅 있는 거 잊지 않았죠? 자료는 제가 미리 챙겨 둘게요...'
      : 'Happy Monday! Reminder from last week’s meeting…';

  return (
    <section
      id="experience"
      ref={revealRef}
      className="reveal-on-scroll relative overflow-hidden border-t border-slate-200/60 bg-slate-50 py-[48px] sm:py-[72px]"
    >
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 glow-ambient pointer-events-none" />

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-[24px] px-[16px] md:grid-cols-[1.15fr_0.85fr] md:gap-[40px] md:px-[40px] lg:gap-[60px] lg:px-[48px]">
        <div className="min-w-0 text-left">
          <h2
            className="reveal-item mb-[16px] whitespace-nowrap text-2xl font-bold tracking-tight text-slate-950 sm:mb-[20px] sm:whitespace-normal sm:text-4xl xl:text-5xl"
            style={{ ['--reveal-delay' as string]: '0ms' }}
          >
            {language === 'ko' ? (
              <>
                함께 생각하고,
                <br className="hidden sm:inline" />
                함께 나아가요.
              </>
            ) : (
              'Minds, the AI that prompts to you first.'
            )}
          </h2>

          <p
            className="reveal-item mb-[24px] text-sm leading-relaxed text-slate-600 sm:max-w-xl sm:text-lg"
            style={{ ['--reveal-delay' as string]: '100ms' }}
          >
            {language === 'ko'
              ? '필요한 순간을 알아채고, 먼저 말을 걸어올 때도 있으니 너무 놀라지 마세요!'
              : 'Minds thinks ahead while you’re busy, takes the tedious work off your plate, and pings you with real results.'}
          </p>

          <div className="reveal-item" style={{ ['--reveal-delay' as string]: '180ms' }}>
          <button
            onClick={onOpenModal}
            className="cta-light-sweep group inline-flex max-w-full items-center justify-center gap-[8px] whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-br from-[#405FDF] via-[#3D7EED] to-[#4EA5F1] px-[20px] py-[12px] text-base font-bold leading-tight text-white shadow-lg shadow-[#405FDF]/25 transition duration-200 hover:from-[#3D7EED] hover:via-[#3D7EED] hover:to-[#4EA5F1] active:scale-[0.98] sm:px-[24px] sm:text-lg"
          >
            <span>{language === 'ko' ? '나만의 마인즈 (Minds) 만들기' : 'Create your own Minds assistant'}</span>
            <ArrowRight className="cta-arrow shrink-0" />
          </button>
          </div>
        </div>

        <div
          className="reveal-item relative mx-auto flex w-full min-w-0 max-w-md items-center justify-center md:justify-end"
          style={{ ['--reveal-delay' as string]: '160ms' }}
        >
          <div className="absolute inset-0 rounded-full bg-[#FF6B4A]/12 blur-3xl" />
          <div className="glass-card-v2 absolute right-0 top-0 z-10 max-w-[230px] rounded-2xl rounded-bl-sm px-[16px] py-[12px] text-left text-sm font-medium leading-relaxed text-slate-700 md:left-2 md:right-auto md:top-8">
            <TypedMessage text={message} />
            <span aria-hidden="true" className="glass-bubble-tail absolute -bottom-1 left-5 h-2.5 w-2.5 rotate-45 border-b border-l border-white/80" />
          </div>
          <div className="relative aspect-square w-full max-w-[220px] sm:max-w-[360px]">
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-full bg-gradient-to-br from-[#FF6B4A]/32 via-[#FF6B4A]/42 to-[#E55538]/32 blur-3xl [mask-image:radial-gradient(circle,black_22%,transparent_68%)] [-webkit-mask-image:radial-gradient(circle,black_22%,transparent_68%)]"
            />
            <img
              src="/assets/aistudio/minds-character-orb.png"
              alt={language === 'ko' ? 'Minds 캐릭터' : 'Minds character'}
              className="animate-character-float relative z-[1] h-full w-full object-contain drop-shadow-[0_22px_28px_rgba(22,22,22,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
