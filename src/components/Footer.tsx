interface FooterProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function Footer({ onOpenModal, language }: FooterProps) {
  return (
    <footer className="glass-card-v2 glass-static relative z-10 border-t border-slate-200/70 py-3 text-sm text-slate-700 shadow-[inset_0_-2px_0_0_#FF6B4A] sm:py-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-[12px] sm:flex-row sm:justify-between sm:px-[40px] lg:px-[48px]">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/minds-logo-blue.svg"
            alt={language === 'ko' ? '애니모카 브랜즈의 Minds' : 'Minds by Animoca Brands'}
            className="h-7 w-auto object-contain"
          />
          <span className="hidden border-l border-slate-200 pl-3 text-xs text-slate-400 sm:inline">
            {language === 'ko' ? '필요한 순간, 먼저 말을 거는 AI' : 'The AI that speaks to you first'}
          </span>
        </div>

        {/* Action & Legal Links */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <button
            onClick={onOpenModal}
            className="cursor-pointer text-xs font-semibold text-[#3D7EED] transition-colors hover:text-[#4EA5F1]"
          >
            {language === 'ko' ? '나만의 마인즈 (Minds) 만나기' : 'Meet your Minds assistant'}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-3 text-xs text-slate-500">
            <span>© 2026 Minds</span>
            <span className="text-slate-300">·</span>
            <button onClick={onOpenModal} className="cursor-pointer transition-colors hover:text-slate-800">
              {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
            </button>
            <span className="text-slate-300">·</span>
            <button onClick={onOpenModal} className="cursor-pointer transition-colors hover:text-slate-800">
              {language === 'ko' ? '이용약관' : 'Terms'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
