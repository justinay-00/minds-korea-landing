import { ArrowRight } from 'lucide-react';
import Footer from './Footer';

interface FinalCtaProps {
  language: 'en' | 'ko';
}

export default function FinalCta({ language }: FinalCtaProps) {
  return (
    <section id="final-cta" data-section="final_cta" className="relative isolate flex min-h-[350px] flex-col overflow-hidden bg-slate-50 sm:aspect-[1376/520] sm:min-h-0">
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
              ? '복잡한 일은 맡겨두고, 마음은 한결 가볍게. 마인즈와 함께라면 일상은 한층 더 즐거워져요.'
              : 'Leave the busywork to Minds and focus on what matters most to you.'}
          </p>
          <button
            type="button"
            data-cta-id="cta_try_app"
            data-cta-position="final_cta"
            className="cta-light-sweep group inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-full btn-lit-blue px-[16px] py-[10px] text-sm font-bold text-white transition duration-200 sm:px-[24px] sm:py-[12px] sm:text-lg"
          >
            <span>{language === 'ko' ? '지금 무료로 시작하기' : 'Start for Free Now'}</span>
            <ArrowRight className="cta-arrow shrink-0" />
          </button>
        </div>
      </div>
      <Footer language={language} />
    </section>
  );
}
