import { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ko';
}

export default function OnboardingModal({ isOpen, onClose, language }: OnboardingModalProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [selectedFocus, setSelectedFocus] = useState('');
  const [customFocus, setCustomFocus] = useState('');
  const [mindName, setMindName] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const focusOptions = [
    { id: 'campus', label: language === 'ko' ? '학업 및 학점 관리' : 'Campus & GPA' },
    { id: 'career', label: language === 'ko' ? '커리어 및 자기소개서' : 'Career & Cover Letter' },
    { id: 'startup', label: language === 'ko' ? '1인 창업 및 스타트업' : 'Solo Founder & Startup' },
    { id: 'ecommerce', label: language === 'ko' ? '사이드 프로젝트 및 온라인 쇼핑몰' : 'Side Hustle & E-Commerce' },
    { id: 'productivity', label: language === 'ko' ? '일상 생산성' : 'Daily Productivity' },
    { id: 'other', label: language === 'ko' ? '기타' : 'Other' },
  ];

  const suggestedMindNames = ['Nova', 'Sage', 'Echo', 'Atlas'];
  const hasMindName = Boolean(mindName.trim());
  const selectedFocusLabel =
    selectedFocus === 'other'
      ? customFocus.trim()
      : focusOptions.find((focus) => focus.id === selectedFocus)?.label ?? '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative flex h-[min(560px,90vh,calc(100vw-2rem))] w-[min(560px,90vh,calc(100vw-2rem))] shrink-0 flex-col overflow-hidden rounded-3xl border border-[var(--line-strong-cool)] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 glow-radial opacity-60 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--line-strong-cool)] pb-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/minds-logo-blue-CNYWXNj8_1cee06dc.png"
              alt="Minds"
              className="h-6 w-auto object-contain"
            />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-label-cool)] hover:text-[var(--text-title-cool)] hover:bg-[var(--line-cool)] transition-colors"
            aria-label={language === 'ko' ? '창 닫기' : 'Close modal'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isCompleted ? (
          <div
            className={`flex min-h-0 flex-1 flex-col py-4 ${
              step === 0 || step === 1 ? 'overflow-hidden' : 'overflow-y-auto'
            }`}
          >
            {step === 0 && (
              <div className="my-auto mx-auto w-full max-w-sm text-center">
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text-title-cool)]">
                  {language === 'ko' ? 'Minds에 오신 것을 환영해요' : 'Welcome to Minds'}
                </h3>
                <img
                  src="/assets/aistudio/minds-login-team.webp"
                  alt={language === 'ko' ? '일상 업무를 돕는 도구와 함께한 Minds 캐릭터' : 'Minds character with tools for everyday tasks'}
                  className="mx-auto mt-3 h-40 w-full object-contain"
                />
                <p className="mt-2 text-sm text-[var(--text-muted-cool)]">
                  {language === 'ko' ? '이미 계정이 있으신가요?' : 'Already have an account?'}
                </p>
                <button
                  type="button"
                  onClick={() => setLoginMessage(language === 'ko' ? '로그인 기능은 아직 연결되지 않았어요.' : 'Login is not connected yet.')}
                  className="mt-2 text-sm font-semibold text-[var(--text-body-cool)] underline underline-offset-2 transition hover:text-indigo-700"
                >
                  {language === 'ko' ? '로그인' : 'Log in'}
                </button>
                <p className="mt-2 min-h-5 text-xs text-[var(--text-muted-cool)]" aria-live="polite">
                  {loginMessage}
                </p>
                <div className="mt-6 border-t border-[var(--line-strong-cool)] pt-6">
                  <p className="mb-4 text-sm text-[var(--text-muted-cool)]">{language === 'ko' ? 'Minds가 처음이신가요?' : 'New to Minds?'}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMessage('');
                      setStep(1);
                    }}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--orange-lit)] via-[var(--orange)] to-[#E87C0C] px-6 py-3 text-lg font-bold text-white backdrop-blur-md transition duration-200 hover:from-[var(--orange)] hover:via-[var(--orange-hover)] hover:to-[var(--orange-hover)]"
                  >
                    {language === 'ko' ? '시작하기' : 'Get Started'}
                    <ArrowRight className="cta-arrow shrink-0" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="my-auto mx-auto w-full max-w-sm text-center">
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text-title-cool)]">
                  {language === 'ko' ? '환영해요!' : 'Welcome!'}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted-cool)]">
                  {language === 'ko' ? (
                    <><span className="font-semibold text-[var(--text-body-cool)]">{mindName}</span>에게서 새 메시지가 도착했어요.</>
                  ) : (
                    <>You have a new message from <span className="font-semibold text-[var(--text-body-cool)]">{mindName}</span></>
                  )}
                </p>

                <div className="animate-character-float my-5 rounded-2xl border border-[var(--line-strong-cool)] bg-white p-4 text-left shadow-lg shadow-slate-900/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/images_e51d87e1.jpg"
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-[var(--text-title-cool)]">{mindName}</span>
                        <span className="shrink-0 text-[11px] text-[var(--text-label-cool)]">{language === 'ko' ? '지금' : 'now'}</span>
                      </div>
                      <span className="block text-xs text-[var(--text-muted-cool)]">{language === 'ko' ? '새 메시지' : 'New message'}</span>
                    </div>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
                  </div>
                  <p className="mt-3 select-none text-sm leading-relaxed text-[var(--text-body-cool)] blur-[3px]">
                    {language === 'ko'
                      ? `${selectedFocusLabel || '필요한 일'}을(를) 도와드릴 준비가 됐어요.`
                      : `I’m ready to help with ${selectedFocusLabel || 'whatever matters to you'}.`}
                  </p>
                </div>

                <p className="mb-4 text-sm text-[var(--text-muted-cool)]">
                  {language === 'ko' ? '원하는 방식으로 계정을 만들어 보세요.' : 'Choose how you’d like to create your account.'}
                </p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMessage('');
                      setStep(3);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800"
                  >
                    {language === 'ko' ? '이메일로 가입하기' : 'Sign up with email'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMessage(language === 'ko' ? '카카오 가입 기능은 아직 연결되지 않았어요.' : 'Kakao sign-up is not connected yet.')}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FEE500] bg-[#FEE500] px-5 py-3.5 text-sm font-semibold text-[#191919] transition hover:bg-[#F5DC00]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#191919] text-[11px] font-bold text-[#FEE500]">
                      K
                    </span>
                    {language === 'ko' ? '카카오로 가입하기' : 'Sign up with Kakao'}
                  </button>
                  <p className="min-h-5 text-xs text-[var(--text-muted-cool)]" aria-live="polite">
                    {loginMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Step 1: Focus selection */}
            {step === 1 && (
              <div className="flex min-h-0 flex-1 flex-col">
                <h3 className="mb-2 text-lg font-bold tracking-tight text-[var(--text-title-cool)]">
                  {language === 'ko' ? '마인즈 이름 짓기' : 'Name your Minds assistant'}
                </h3>
                <input
                  id="minds-name"
                  type="text"
                  required
                  maxLength={32}
                  value={mindName}
                  onChange={(event) => setMindName(event.target.value)}
                  placeholder={language === 'ko' ? '예: 노바' : 'e.g. Nova'}
                  aria-label={language === 'ko' ? '마인즈 이름' : 'Name your Minds assistant'}
                  className="w-full rounded-xl border border-[var(--line-strong-cool)] bg-white px-4 py-2.5 text-sm text-[var(--text-title-cool)] shadow-2xs placeholder:text-[var(--text-label-cool)] focus:border-indigo-500 focus:outline-none"
                />
                <div className="mt-2 mb-4 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-xs text-[var(--text-muted-cool)]">{language === 'ko' ? '추천 이름' : 'Suggestions'}</span>
                  {suggestedMindNames.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setMindName(suggestion)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                        mindName === suggestion
                          ? 'border-slate-700 bg-slate-700 text-white'
                          : 'border-[var(--line-strong-cool)] bg-white text-[var(--text-body-cool)] hover:border-slate-400 hover:bg-[#F6F7FA]'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div
                  aria-disabled={!hasMindName}
                  className={`transition-opacity ${
                    hasMindName ? 'opacity-100' : 'pointer-events-none opacity-40'
                  }`}
                >
                    <h3 className="mb-1.5 text-lg font-bold tracking-tight text-[var(--text-title-cool)]">
                      {language === 'ko' ? '마인즈가 어떤 일에 집중하면 좋을까요?' : 'What should your Minds assistant focus on?'}
                    </h3>
                    <p className="mb-3 text-xs text-[var(--text-muted-cool)]">
                      {language === 'ko' ? '원하는 항목을 선택해 나만의 파트너를 설정해 보세요.' : 'Select a focus to personalize your partner.'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {focusOptions.map((focus) => {
                        const isSelected = selectedFocus === focus.id;
                        return (
                          <button
                            key={focus.id}
                            type="button"
                            aria-pressed={isSelected}
                            disabled={!hasMindName}
                            onClick={() => setSelectedFocus(focus.id)}
                            className={`relative inline-flex min-h-9 max-w-full items-center whitespace-nowrap rounded-full border px-3.5 py-1.5 pr-9 text-left text-xs font-medium transition-all ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                                : 'border-[var(--line-strong-cool)] bg-white text-[var(--text-body-cool)] hover:border-slate-300 hover:bg-[#F6F7FA]'
                            }`}
                          >
                            <span>{focus.label}</span>
                            {isSelected && (
                              <Check className="absolute right-2.5 h-3.5 w-3.5 shrink-0 text-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {hasMindName && selectedFocus === 'other' && (
                      <input
                        type="text"
                        maxLength={100}
                        value={customFocus}
                        onChange={(event) => setCustomFocus(event.target.value)}
                        placeholder={language === 'ko' ? '마인즈가 어떤 일에 집중하면 좋을지 알려 주세요' : 'Tell us what your Minds assistant should focus on'}
                        aria-label={language === 'ko' ? '마인즈가 집중할 항목 직접 입력' : 'Custom Minds assistant focus'}
                        className="mt-3 w-full rounded-xl border border-[var(--line-strong-cool)] bg-white px-4 py-2.5 text-sm text-[var(--text-title-cool)] shadow-2xs placeholder:text-[var(--text-label-cool)] focus:border-indigo-500 focus:outline-none"
                      />
                    )}
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <button
                    onClick={() => setStep(2)}
                    disabled={
                      !hasMindName ||
                      !selectedFocus ||
                      (selectedFocus === 'other' && !customFocus.trim())
                    }
                    className="ml-auto flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-[var(--text-title-cool)] transition-all hover:border-sky-300 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span>{language === 'ko' ? '계속' : 'Continue'}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-600 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Email signup details */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-[var(--text-title-cool)] tracking-tight mb-2">
                  {language === 'ko' ? '나만의 마인즈를 만들어 볼게요' : 'Set up your dedicated Minds assistant'}
                </h3>
                <p className="text-sm text-[var(--text-body-cool)] mb-6">
                  {language === 'ko'
                    ? '안전한 전용 작업 공간을 준비하고 인증 링크를 보내 드릴게요.'
                    : 'We will provision your isolated sandbox and dispatch your secure authorization link.'}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-[var(--text-body-cool)] block mb-1.5">
                      {language === 'ko' ? '이름' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ko' ? '예: 홍길동' : 'e.g. Alex Mercer'}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-[var(--text-title-cool)] placeholder-slate-400 focus:outline-none focus:border-sky-600 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[var(--text-body-cool)] block mb-1.5">
                      {language === 'ko' ? '업무용 이메일' : 'Work Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-[var(--text-title-cool)] placeholder-slate-400 focus:outline-none focus:border-sky-600 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F6F7FA] border border-[var(--line-strong-cool)] mb-6 text-xs text-[var(--text-body-cool)] space-y-1">
                  <div className="flex justify-between">
                    <span>{language === 'ko' ? '집중 분야:' : 'Focus:'}</span>
                    <span className="text-right text-[var(--text-title-cool)] font-medium">
                      {selectedFocusLabel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ko' ? '마인즈 이름:' : 'Minds assistant name:'}</span>
                    <span className="text-right text-[var(--text-title-cool)] font-medium">{mindName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[var(--text-muted-cool)] hover:text-[var(--text-title-cool)]"
                  >
                    {language === 'ko' ? '뒤로' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-slate-900/20 transition-all hover:bg-slate-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{language === 'ko' ? '마인즈 전용 공간을 준비하는 중...' : 'Preparing your Minds workspace...'}</span>
                    ) : (
                      <>
                        <span>{language === 'ko' ? '내 마인즈 시작하기' : 'Activate Minds assistant'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation / Success Screen */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[var(--text-title-cool)] tracking-tight mb-2">
                {language === 'ko' ? `${mindName} 준비가 완료됐어요` : `${mindName} is ready`}
              </h3>
              <p className="text-sm text-[var(--text-body-cool)] max-w-md mx-auto leading-relaxed">
                {language === 'ko'
                  ? <>{name}님, 환영해요. 전용 작업 공간 준비를 시작했고 인증 링크를 <span className="text-[var(--text-title-cool)] font-mono font-medium">{email}</span>(으)로 보냈어요.</>
                  : <>Welcome, {name}. We’ve queued your isolated environment and dispatched the authorization token to <span className="text-[var(--text-title-cool)] font-mono font-medium">{email}</span>.</>}
              </p>
            </div>

            {/* Test Simulation Notification */}
            <div className="p-4 rounded-2xl bg-[#F6F7FA] border border-sky-200 text-left max-w-md mx-auto shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/aistudio/images_e51d87e1.jpg"
                    alt="Minds"
                    className="w-5 h-5 rounded-full object-cover border border-sky-200"
                  />
                  <span className="text-xs font-semibold text-[var(--text-title-cool)]">Minds</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted-cool)] font-mono">Minds</span>
              </div>
              <p className="text-xs text-[var(--text-body-cool)] leading-relaxed font-mono">
                {language === 'ko'
                  ? `"${name.split(' ')[0]}님, 안녕하세요! ${mindName}이 준비됐어요. 필요할 때 언제든 불러 주세요."`
                  : `"Hey ${name.split(' ')[0]}, ${mindName} is online. I'm ready when you are."`}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 font-semibold text-sm transition-all shadow-sm"
              >
                {language === 'ko' ? 'Minds 메인으로 돌아가기' : 'Return to Minds Overview'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
