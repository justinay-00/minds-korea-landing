import { ArrowRight } from 'lucide-react';
import LaptopDemo from './LaptopDemo';

interface HeroProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function Hero({ onOpenModal, language }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-[40px] sm:pt-[60px]">
      {/* Radial Glow in light mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] glow-radial pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-[24px] text-center relative z-10">
        {/* Value Proposition */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-none mx-auto leading-relaxed font-normal mb-[20px]">
          {language === 'ko'
            ? '할 일은 더 수월하게, 마음은 더 든든하게'
            : 'Always in your corner: stepping up before you ask, handling the tedious work, and delivering real progress.'}
        </p>

        {/* Refined Display Headline */}
        <h1 className="mb-[24px] text-3xl font-extrabold leading-tight tracking-tight text-slate-950 text-balance sm:text-5xl sm:leading-[1.2] xl:text-6xl">
          <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-sky-600 bg-clip-text text-transparent">
            {language === 'ko' ? (
              <>
                <span className="lg:whitespace-nowrap">당신의 일상을 함께 움직이는 AI,</span>
                <br />
                마인즈 (Minds)
              </>
            ) : (
              'Meet Your AI Partner, Minds.'
            )}
          </span>
        </h1>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[12px]">
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-br from-sky-500/85 via-blue-600/85 to-cyan-700/85 px-[24px] py-[16px] text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:from-sky-400 hover:via-blue-500 hover:to-cyan-600 active:scale-[0.98] cursor-pointer sm:px-[36px] sm:text-base"
          >
            <span>{language === 'ko' ? '무료로 시작하기' : 'Try Now for Free'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-[48px] sm:mt-[60px]">
          <LaptopDemo language={language} />
        </div>
      </div>
    </section>
  );
}
