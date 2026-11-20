import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import privacyHtml from '../data/privacy-policy.html?raw';
import termsHtml from '../data/terms-of-use.html?raw';

interface LegalPageProps {
  kind: 'privacy' | 'terms';
  language: 'en' | 'ko';
}

const PAGES = {
  privacy: {
    titleKo: '개인정보 처리방침',
    titleEn: 'Privacy Policy',
    source: 'https://www.hellominds.ai/privacy-policy',
    html: privacyHtml,
  },
  terms: {
    titleKo: '이용약관',
    titleEn: 'Terms of Use',
    source: 'https://www.hellominds.ai/terms-of-use',
    html: termsHtml,
  },
};

function stripOfficialTitle(html: string) {
  return html.replace(/<h1>[\s\S]*?<\/h1>/, '');
}

export default function LegalPage({ kind, language }: LegalPageProps) {
  const page = PAGES[kind];
  const title = language === 'ko' ? page.titleKo : page.titleEn;

  useEffect(() => {
    document.title = `${title} | Minds`;
    window.scrollTo(0, 0);
    return () => {
      document.title = 'Minds';
    };
  }, [title]);

  return (
    <div
      data-language={language}
      className="flex min-h-screen flex-col justify-between bg-slate-50 text-slate-900 selection:bg-[#FF6B4A] selection:text-white"
    >
      <Navbar language={language} />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-[16px] py-[40px] sm:px-[24px] sm:py-[56px]">
          <h1 className="mb-[12px] text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mb-[32px] text-sm leading-relaxed text-slate-500 sm:text-base">
            {language === 'ko' ? (
              <>
                공식 문서 원문을 그대로 담고 있어요. 영문 원본은{' '}
                <a
                  href={page.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#3D7EED] underline decoration-[#3D7EED]/30 underline-offset-2 hover:text-[#4EA5F1]"
                >
                  hellominds.ai
                </a>
                에서 확인할 수 있어요.
              </>
            ) : (
              <>
                This is the official policy text. You can also read the original on{' '}
                <a
                  href={page.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#3D7EED] underline decoration-[#3D7EED]/30 underline-offset-2 hover:text-[#4EA5F1]"
                >
                  hellominds.ai
                </a>
                .
              </>
            )}
          </p>
          <div
            className="legal-prose"
            dangerouslySetInnerHTML={{ __html: stripOfficialTitle(page.html) }}
          />
        </article>
      </main>
      <Footer language={language} />
    </div>
  );
}
