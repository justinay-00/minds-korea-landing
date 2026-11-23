import { ArrowRight } from 'lucide-react';
import LaptopDemo from './LaptopDemo';

const TITLE_POSES = [
  '/assets/aistudio/minds-character-laptop.png',
  '/assets/aistudio/minds-character-cart.png',
  '/assets/aistudio/minds-character-book.png',
  '/assets/aistudio/minds-character-research.png',
];

const HERO_CONNECTORS = [
  { name: 'KakaoTalk', src: '/assets/app-icons/kakaotalk.svg' },
  { name: 'Cafe24', src: '/assets/app-icons/cafe24.png' },
  { name: 'Gmail', src: '/assets/app-icons/gmail.svg' },
  { name: 'Google Drive', src: '/assets/app-icons/googledrive.svg' },
  { name: 'Instagram', src: '/assets/app-icons/instagram.png' },
  { name: 'X', src: '/assets/app-icons/x.svg' },
  { name: 'TikTok', src: '/assets/app-icons/tiktok.png' },
  { name: 'Notion', src: '/assets/app-icons/notion.png' },
] as const;


function TitlePoseCycle() {
  return (
    <span className="hero-pose-cycle ml-[0.2em] inline-block h-[1.35em] w-[1.35em] align-[-0.22em]" aria-hidden="true">
      {TITLE_POSES.map((src, i) => (
        <img key={src} src={src} alt="" className={`hero-pose hero-pose-${i + 1}`} />
      ))}
    </span>
  );
}

interface HeroProps {
  language: 'en' | 'ko';
}

export default function Hero({ language }: HeroProps) {
  return (
    <section id="hero" data-section="hero" className="relative overflow-hidden pt-[12px] sm:pt-[20px]">
      {/* Radial Glow in light mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] glow-radial pointer-events-none -z-10" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="px-[32px] sm:px-[24px]">
            <p className="mb-[6px] text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
              {language === 'ko'
                ? '복잡한 일은 맡겨두고, 마음은 한결 가볍게'
                : 'Always in your corner: stepping up before you ask, handling the tedious work, and delivering real progress.'}
            </p>

            <h1 className="mb-[16px] whitespace-nowrap text-2xl font-extrabold leading-snug tracking-tight text-[#161616] sm:mb-[24px] sm:whitespace-normal sm:text-[2.75rem] sm:leading-[1.4] xl:text-5xl">
              {language === 'ko' ? (
                <>
                  <span className="sm:whitespace-nowrap">당신의 일상을 함께 움직이는 AI,</span>
                  <br />
                  마인즈 (Minds).
                  <TitlePoseCycle />
                </>
              ) : (
                <>
                  Meet Your AI Partner, Minds.
                  <TitlePoseCycle />
                </>
              )}
            </h1>
        </div>
      </div>

      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#FF6B4A]/18 via-[#EAF3FF]/60 to-[#EAF3FF] [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[70%] bg-gradient-to-t from-[#4EA5F1]/40 via-[#EAF3FF]/90 to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-72 bg-gradient-to-t from-[#EAF3FF] via-[#EAF3FF]/90 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="px-[32px] sm:px-[24px]">
            <div className="flex flex-col items-center justify-center gap-[12px] sm:flex-row">
              <button
                type="button"
                data-cta-id="cta_try_app"
                data-cta-position="hero"
                className="cta-light-sweep group inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-full btn-lit-blue px-[16px] py-[10px] text-sm font-bold text-white transition duration-200 cursor-pointer sm:px-[24px] sm:py-[12px] sm:text-lg"
              >
                <span>{language === 'ko' ? '무료로 시작하기' : 'Try Now for Free'}</span>
                <ArrowRight className="cta-arrow shrink-0" />
              </button>
            </div>
          </div>

          <div className="mt-[12px] sm:mt-[24px]">
            <LaptopDemo language={language} />
          </div>

          <div className="hero-connectors px-[16px] pb-[24px] pt-[16px] sm:px-[24px] sm:pb-[36px] sm:pt-[22px]">
            <p className="mb-[12px] text-[12px] font-medium tracking-[-0.01em] text-slate-500 sm:mb-[14px] sm:text-[13px]">
              {language === 'ko' ? '100+ 이상의 공식 파트너십' : '100+ official partnerships'}
            </p>
            <ul className="hero-connectors-list mx-auto flex w-full max-w-2xl flex-nowrap items-center justify-center gap-x-[8px] sm:gap-x-[28px]">
              {HERO_CONNECTORS.map((connector) => (
                <li key={connector.name} className="flex items-center justify-center">
                  <img
                    src={connector.src}
                    alt={connector.name}
                    title={connector.name}
                    className="hero-connector-logo h-6 w-auto shrink-0 object-contain sm:h-10"
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
