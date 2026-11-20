import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS, FAQS_KO } from '../data/landingData';

export default function Faq({ language }: { language: 'en' | 'ko' }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const faqs = language === 'ko' ? FAQS_KO : FAQS;

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative border-t border-[#CCD5E8]/60 bg-gradient-to-r from-[#EAEFFF]/70 via-[#FBFCFE] to-[#FD8D1D]/8 py-[24px] sm:py-[28px]">
      <div className="max-w-3xl mx-auto px-[24px] sm:px-[40px] lg:px-[48px]">
        <div className="mb-[12px] text-center sm:mb-[16px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2330] tracking-tight mt-0 mb-[8px] text-balance">
            {language === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
          </h2>
        </div>

        {/* Clean Accordion List matching the user's example layout */}
        <div className="glass-card-v2 rounded-2xl divide-y divide-[#CCD5E8] overflow-hidden">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="transition-colors hover:bg-[#F7F9FD]/50">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-[16px] px-[20px] py-[10px] text-left focus-visible:bg-[#F7F9FD] focus-visible:outline-none sm:px-[24px] sm:py-[12px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold tracking-tight text-[#1E2330] sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`shrink-0 p-[4px] text-[#FD8D1D] transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-[20px] pb-[10px] pt-0 text-sm leading-relaxed text-[#4F5670] animate-in fade-in duration-150 sm:px-[24px]">
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
