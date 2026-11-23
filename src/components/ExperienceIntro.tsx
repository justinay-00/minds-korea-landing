import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface ExperienceIntroProps {
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

    let i = 0;
    let interval = 0;
    let pause = 0;

    const type = () => {
      interval = window.setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(interval);
          pause = window.setTimeout(() => {
            i = 0;
            setShown('');
            type();
          }, 1600);
        }
      }, 55);
    };

    setShown('');
    type();

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(pause);
    };
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

export default function ExperienceIntro({ language }: ExperienceIntroProps) {
  const revealRef = useRevealOnScroll<HTMLElement>();
  const message =
    language === 'ko'
      ? '오후에 미팅 있는 거 잊지 않았죠?\n자료는 제가 미리 챙겨 둘게요...'
      : 'Remember your meeting this afternoon?\nI’ll get the materials ready...';

  return (
    <section
      id="experience"
      data-section="experience"
      ref={revealRef}
      className="reveal-on-scroll relative overflow-hidden bg-slate-50 py-[28px] sm:py-[72px]"
    >
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 glow-ambient pointer-events-none" />

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-[16px] px-[24px] md:grid-cols-[1.15fr_0.85fr] md:gap-[40px] md:px-[40px] lg:gap-[60px] lg:px-[48px]">
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
              <>
                Think together,
                <br className="hidden sm:inline" />
                move forward together.
              </>
            )}
          </h2>

          <p
            className="reveal-item mb-[16px] text-sm leading-relaxed text-slate-600 sm:max-w-xl sm:text-lg md:mb-[24px]"
            style={{ ['--reveal-delay' as string]: '100ms' }}
          >
            {language === 'ko'
              ? '필요한 순간을 알아채고, 먼저 말을 걸어올 때도 있으니 너무 놀라지 마세요!'
              : 'Minds may notice when you need a hand and reach out first—so don’t be surprised!'}
          </p>

          <div className="reveal-item hidden md:block" style={{ ['--reveal-delay' as string]: '180ms' }}>
          <div className="inline-flex flex-col items-center">
          <a
            href="https://app.hellominds.ai/"
            data-cta-id="cta_launch_mind"
            data-cta-position="experience_intro"
            className="cta-light-sweep group inline-flex max-w-full items-center justify-center gap-[8px] whitespace-nowrap rounded-full btn-lit-blue px-[16px] py-[10px] text-sm font-bold leading-tight text-white transition duration-200 sm:px-[24px] sm:py-[12px] sm:text-lg"
          >
            <span>{language === 'ko' ? '나만의 마인즈 만들기' : 'Create your own Minds assistant'}</span>
            <ArrowRight className="cta-arrow shrink-0" />
          </a>
            {language === 'ko' ? (
              <p className="mt-2 text-center text-xs font-medium leading-snug text-slate-500 sm:text-sm">
                카카오로 3초 만에 가입해보세요
              </p>
            ) : (
              <p className="mt-2 text-center text-xs font-medium leading-snug text-slate-500 sm:text-sm">
                Sign up with Kakao in just 3 seconds
              </p>
            )}
          </div>
          </div>
        </div>

        <div
          className="reveal-item relative mt-[12px] w-full min-w-0 md:mt-0 md:ml-auto md:max-w-md"
          style={{ ['--reveal-delay' as string]: '160ms' }}
        >
          <div className="mx-auto flex w-fit max-w-full flex-col items-center justify-center gap-[16px] md:mx-0 md:w-full md:flex-row md:items-center md:justify-end">
          <div className="relative min-w-0 max-w-full md:w-full md:max-w-[312px]">
          <div className="relative z-10 mx-auto w-fit shrink-0 md:absolute md:left-2 md:top-8 md:mx-0">
            <span
              className="absolute -left-1.5 -top-1.5 z-20 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF3B30] px-1 text-[11px] font-bold leading-none text-white"
              aria-label={language === 'ko' ? '새 메시지 1개' : '1 new message'}
            >
              1
            </span>
            <div className="message-slide-from-badge">
              <div className="glass-card-v2 relative box-border w-fit shrink-0 rounded-2xl px-[16px] py-[12px] whitespace-pre text-center text-sm font-medium leading-relaxed text-slate-700 md:w-auto md:max-w-[230px] md:shrink md:whitespace-normal md:text-left">
                <TypedMessage text={message} />
              </div>
            </div>
          </div>
          <div className="relative mt-3 flex items-center justify-center md:mt-0 md:w-full md:max-w-[312px] md:justify-end">
            <div className="absolute inset-0 rounded-full bg-[#FF6B4A]/12 blur-3xl" />
            <div className="relative aspect-square w-[clamp(112px,34vw,176px)] md:w-full md:max-w-[312px]">
              <div
                aria-hidden="true"
                className="absolute -inset-10 rounded-full bg-gradient-to-br from-[#FF6B4A]/32 via-[#FF6B4A]/42 to-[#E55538]/32 blur-3xl [mask-image:radial-gradient(circle,black_22%,transparent_68%)] [-webkit-mask-image:radial-gradient(circle,black_22%,transparent_68%)]"
              />
              <img
                src="/assets/aistudio/minds-character-orb-glossy.png"
                alt={language === 'ko' ? 'Minds 캐릭터' : 'Minds character'}
                className="animate-character-float relative z-[1] h-full w-full object-contain drop-shadow-[0_22px_28px_rgba(22,22,22,0.35)]"
              />
            </div>
          </div>
          </div>

          <div className="reveal-item flex shrink-0 flex-col items-center justify-center md:hidden" style={{ ['--reveal-delay' as string]: '180ms' }}>
            <a
              href="https://app.hellominds.ai/"
              data-cta-id="cta_launch_mind"
              data-cta-position="experience_intro"
              className="cta-light-sweep group inline-flex max-w-full items-center justify-center gap-[8px] whitespace-nowrap rounded-full btn-lit-blue px-[16px] py-[10px] text-sm font-bold leading-tight text-white transition duration-200 sm:px-[24px] sm:py-[12px] sm:text-lg"
            >
              <span>{language === 'ko' ? '나만의 마인즈 만들기' : 'Create your own Minds assistant'}</span>
              <ArrowRight className="cta-arrow shrink-0" />
            </a>
            {language === 'ko' ? (
              <p className="mt-2 text-center text-xs font-medium leading-snug text-slate-500">
                {language === 'ko' ? '카카오로 3초 만에 가입해보세요' : 'Sign up with Kakao in just 3 seconds'}
              </p>
            ) : null}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
