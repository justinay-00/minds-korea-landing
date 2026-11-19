import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FAQS, FAQS_KO } from '../data/landingData';

export default function Faq({ language }: { language: 'en' | 'ko' }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const faqs = language === 'ko' ? FAQS_KO : FAQS;

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative border-t border-slate-200 bg-slate-50/80 py-[36px] sm:py-[40px]">
      <div className="max-w-3xl mx-auto px-[24px] sm:px-[40px] lg:px-[48px]">
        <div className="mb-[20px] text-center sm:mb-[24px]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-[8px] mb-[12px] text-balance">
            {language === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
          </h2>
        </div>

        {/* Clean Accordion List matching the user's example layout */}
        <div className="glass-card-v2 rounded-2xl divide-y divide-slate-200 overflow-hidden">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="transition-colors hover:bg-slate-50/50">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[16px] px-[20px] py-[12px] text-left focus-visible:bg-slate-50 focus-visible:outline-none sm:px-[24px] sm:py-[16px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`p-[4px] text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-90 text-blue-700' : ''
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-[20px] pb-[12px] pt-0 text-sm leading-relaxed text-slate-600 animate-in fade-in duration-150 sm:px-[24px]">
                    <p className="pt-[4px]">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
