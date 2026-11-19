interface FooterProps {
  onOpenModal: () => void;
  language: 'en' | 'ko';
}

export default function Footer({ onOpenModal, language }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-slate-200/70 bg-white/45 py-3 text-sm text-slate-700 backdrop-blur-sm sm:py-4">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/minds-logo-blue-CNYWXNj8_1cee06dc.png"
            alt={language === 'ko' ? '애니모카 브랜즈의 Minds' : 'Minds by Animoca Brands'}
            className="h-7 w-auto object-contain"
          />
          <span className="text-xs text-slate-400 pl-3 border-l border-slate-200 hidden sm:inline">
            {language === 'ko' ? '필요한 순간, 먼저 말을 거는 AI' : 'The AI that speaks to you first'}
          </span>
        </div>

        {/* Action & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:gap-4">
          <button 
            onClick={onOpenModal} 
            className="hover:text-sky-600 transition-colors cursor-pointer font-semibold text-blue-700"
          >
            {language === 'ko' ? '나만의 마인즈 (Minds) 만나기' : 'Meet your Minds assistant'}
          </button>
          <span className="text-slate-300">·</span>
          <span>© 2026 Minds</span>
          <span className="text-slate-300">·</span>
          <button onClick={onOpenModal} className="hover:text-slate-800 transition-colors cursor-pointer">
            {language === 'ko' ? '개인정보 처리방침' : 'Privacy'}
          </button>
          <span className="text-slate-300">·</span>
          <button onClick={onOpenModal} className="hover:text-slate-800 transition-colors cursor-pointer">
            {language === 'ko' ? '이용약관' : 'Terms'}
          </button>
        </div>
      </div>
    </footer>
  );
}
