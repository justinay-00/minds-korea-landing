import { ArrowRight } from 'lucide-react';

interface ExperienceIntroProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function ExperienceIntro({ onOpenModal, language }: ExperienceIntroProps) {
  return (
    <section id="experience" className="relative overflow-hidden border-t border-slate-200/60 bg-slate-50 py-[48px] sm:py-[72px]">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 glow-ambient pointer-events-none" />

      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-[24px] px-[16px] md:grid-cols-[1.15fr_0.85fr] md:gap-[40px] md:px-[40px] lg:gap-[60px] lg:px-[48px]">
        <div className="min-w-0 text-left">
          <h2 className="mb-[16px] text-3xl font-extrabold tracking-tight text-slate-950 text-balance sm:mb-[20px] sm:text-4xl xl:text-5xl">
            {language === 'ko' ? (
              <>
                함께 생각하고,
                <br />
                함께 나아가요
              </>
            ) : (
              'Minds, the AI that prompts to you first.'
            )}
          </h2>

          <p className="mb-[24px] text-base leading-relaxed text-slate-600 sm:max-w-xl sm:text-lg">
            {language === 'ko'
              ? '필요한 순간을 알아채고, 먼저 말을 걸어올 때도 있으니 너무 놀라지 마세요!'
              : 'Minds thinks ahead while you’re busy, takes the tedious work off your plate, and pings you with real results.'}
          </p>

          <button
            onClick={onOpenModal}
            className="group inline-flex max-w-full items-center justify-center gap-[8px] whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-br from-sky-500/85 via-blue-600/85 to-cyan-700/85 px-[24px] py-[16px] text-sm font-semibold leading-tight text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:from-sky-400 hover:via-blue-500 hover:to-cyan-600 active:scale-[0.98] sm:px-[36px] sm:text-base"
          >
            <span>{language === 'ko' ? '나만의 마인즈 (Minds) 만들기' : 'Create your own Minds assistant'}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="relative mx-auto flex w-full min-w-0 max-w-md items-center justify-center md:justify-end">
          <div className="absolute inset-8 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="glass-card-v2 absolute right-0 top-0 z-10 max-w-[230px] rounded-2xl rounded-bl-sm px-[16px] py-[12px] text-left text-sm font-medium leading-relaxed text-slate-700 md:left-2 md:right-auto md:top-8">
            {language === 'ko' ? '지난주 회의 내용, 지금 바로 알려 줄게요.' : 'Happy Monday! Reminder from last week’s meeting…'}
            <span aria-hidden="true" className="glass-bubble-tail absolute -bottom-1 left-5 h-2.5 w-2.5 rotate-45 border-b border-l border-white/80" />
          </div>
          <img
            src="/assets/aistudio/images_e51d87e1.jpg"
            alt={language === 'ko' ? 'Minds 캐릭터' : 'Minds character'}
            className="animate-character-float relative aspect-square w-full max-w-[360px] rounded-full object-cover shadow-2xl shadow-blue-900/15 ring-1 ring-white/80"
          />
        </div>
      </div>
    </section>
  );
}
