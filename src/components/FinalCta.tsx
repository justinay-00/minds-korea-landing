import { ArrowRight } from 'lucide-react';
import Footer from './Footer';

interface FinalCtaProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function FinalCta({ onOpenModal, language }: FinalCtaProps) {
  return (
    <section className="relative isolate flex min-h-[350px] flex-col overflow-hidden border-t border-slate-200 bg-slate-50 sm:aspect-[1376/520] sm:min-h-0">
      <div className="relative z-10 flex flex-1 items-center justify-center px-[24px] py-[36px] text-center sm:px-[40px]">
        <div className="glass-card-v2 w-full max-w-3xl rounded-2xl px-[24px] py-[36px] sm:px-[40px] sm:py-[48px]">
          <h2 className="mb-[16px] text-3xl font-bold tracking-tight text-slate-950 text-balance sm:text-4xl xl:text-5xl">
            {language === 'ko' ? (
              <>
                혼자보다{' '}
                <br className="sm:hidden" />
                둘이 더 나을 거예요!
              </>
            ) : (
              'Two minds are always better than one!'
            )}
          </h2>
          <p className="mx-auto mb-[24px] max-w-none text-sm leading-relaxed text-slate-700 sm:text-base">
            {language === 'ko'
              ? '할 일은 더 수월하게, 마음은 더 든든하게. 마인즈와 함께라면 일상은 한층 더 즐거워져요.'
              : 'Leave the busywork to Minds and focus on what matters most to you.'}
          </p>
          <button
            onClick={onOpenModal}
            className="cta-light-sweep group inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-full border border-white/50 bg-gradient-to-br from-[#405FDF] via-[#3D7EED] to-[#4EA5F1] px-[20px] py-[12px] text-base font-bold text-white shadow-lg shadow-[#405FDF]/25 transition duration-200 hover:from-[#3D7EED] hover:via-[#3D7EED] hover:to-[#4EA5F1] active:scale-[0.98] sm:px-[24px] sm:text-lg"
          >
            <span>{language === 'ko' ? '지금 무료로 시작하기' : 'Start for Free Now'}</span>
            <ArrowRight className="cta-arrow shrink-0" />
          </button>
        </div>
      </div>
      <Footer onOpenModal={onOpenModal} language={language} />
    </section>
  );
}
