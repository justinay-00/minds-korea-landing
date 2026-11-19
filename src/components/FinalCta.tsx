import { ArrowRight } from 'lucide-react';
import Footer from './Footer';

interface FinalCtaProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function FinalCta({ onOpenModal, language }: FinalCtaProps) {
  return (
    <section className="relative isolate flex min-h-[350px] flex-col overflow-hidden border-t border-slate-200 bg-sky-100 sm:aspect-[1376/520] sm:min-h-0">
      <img
        src="/assets/aistudio/hero-background.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 flex flex-1 items-center justify-center px-[24px] py-[36px] text-center sm:px-[40px]">
        <div className="glass-card-v2 w-full max-w-3xl rounded-2xl px-[24px] py-[36px] sm:px-[40px] sm:py-[48px]">
          <h2 className="mb-[16px] text-3xl font-extrabold tracking-tight text-slate-950 text-balance sm:text-4xl xl:text-5xl">
            {language === 'ko' ? '혼자보다 둘이 더 낫지 않나요?' : 'Two minds are always better than one!'}
          </h2>
          <p className="mx-auto mb-[24px] max-w-none text-base leading-relaxed text-slate-700">
            {language === 'ko'
              ? '할 일은 더 수월하게, 마음은 더 든든하게. 마인즈와 함께라면 일상은 한층 더 즐거워져요.'
              : 'Leave the busywork to Minds and focus on what matters most to you.'}
          </p>
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-br from-sky-500/85 via-blue-600/85 to-cyan-700/85 px-[24px] py-[16px] text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:from-sky-400 hover:via-blue-500 hover:to-cyan-600 active:scale-[0.98] sm:px-[36px] sm:text-base"
          >
            <span>{language === 'ko' ? '지금 무료로 시작하기' : 'Start for Free Now'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      <Footer onOpenModal={onOpenModal} language={language} />
    </section>
  );
}
