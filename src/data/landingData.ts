import { Scenario, CaseStudy, FaqItem } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'travel-shield',
    title: 'Busan Travel Booking',
    category: 'Travel & Commute',
    trigger: 'Weekly routine: Tomorrow’s scheduled trip to Busan',
    autonomousAction: 'Monitored ticket pricing, checked 8:00 AM vs 10:30 AM fares',
    reachOutMessage: 'Good evening! Remember you have your weekly trip to Busan tomorrow - I checked tickets and the cheapest one is 29000 won, at 8 am . Should I confirm the ticket order? There is one that is 5000won more expensive at 10:30 - Let me know.',
    messages: [
      'Good evening! Remember you have your weekly trip to Busan tomorrow.',
      'I checked tickets and the cheapest one is 29,000 won, at 8 am. Should I confirm the ticket order? There is one that is 5,000 won more expensive at 10:30 — let me know.'
    ],
    details: {
      source: 'Korail & Air Busan Telemetry',
      target: 'Telegram, Google Calendar',
      timeTaken: '1.8s',
      confidence: '99.8%',
      savedTime: '25 mins search & booking',
    },
    steps: [
      { time: '19:45:01', description: 'Routine check: Detected upcoming weekly Busan trip on tomorrow’s schedule', status: 'completed' },
      { time: '19:45:02', description: 'Queried ticket inventory: 8:00 AM fare available at 29,000 won (Cheapest)', status: 'completed' },
      { time: '19:45:03', description: 'Checked alternate option: 10:30 AM fare available at 34,000 won (+5,000 won)', status: 'completed' },
      { time: '19:45:04', description: 'Held 8:00 AM seat draft and dispatched proactive reach-out inquiry', status: 'completed' },
    ],
    interactivePayload: {
      type: 'rebooking',
      primaryActionLabel: 'Confirm 8:00 AM Ticket (29,000 won)',
      secondaryActionLabel: 'Book 10:30 AM (34,000 won)',
      metadata: {
        'Destination': 'Busan (Weekly Routine)',
        'Recommended': '8:00 AM Departure · 29,000 won',
        'Alternate': '10:30 AM Departure · 34,000 won',
        'Status': 'Awaiting your 1-tap confirmation',
      },
    },
  },
  {
    id: 'invoice-triage',
    title: 'Invoice ready for review',
    category: 'Bills & Payments',
    trigger: 'A new $4,850 invoice arrived from Studio Forma',
    autonomousAction: 'Checked the invoice against the order and completed work, then prepared payment for your approval',
    reachOutMessage: 'Studio Forma sent a $4,850 invoice. I checked the charges against your order and the completed work—everything matches. The payment is ready for your approval.',
    messages: [
      'Studio Forma sent a $4,850 invoice.',
      'I checked it against your order and the completed work—everything matches. The payment is ready for your approval.'
    ],
    details: {
      source: 'Gmail attachment & Stripe Invoicing',
      target: 'QuickBooks & Bank Relay',
      timeTaken: '8.6s',
      confidence: '98.8%',
      savedTime: '30 mins cross-checking',
    },
    steps: [
      { time: '11:04:12', description: 'Parsed PDF invoice #INV-9821 from vendor email', status: 'completed' },
      { time: '11:04:14', description: 'Queried Linear & GitHub for "Design System Tokens v2" milestone sign-off', status: 'completed' },
      { time: '11:04:16', description: 'Verified tax ID, payment terms (Net-30), and zero price delta vs PO-4412', status: 'completed' },
      { time: '11:04:19', description: 'Generated accounting ledger entry and scheduled bank release draft', status: 'completed' },
    ],
    interactivePayload: {
      type: 'invoice',
      primaryActionLabel: 'Approve $4,850 payment',
      secondaryActionLabel: 'Review invoice',
      metadata: {
        'From': 'Studio Forma',
        'Invoice total': '$4,850',
        'Order check': 'All items match',
        'Payment': 'Ready for your approval',
      },
    },
  },
  {
    id: 'cafe-inventory',
    title: 'Cafe Stock Check',
    category: 'Cafe Operations',
    trigger: 'Today’s stock check: oat milk is running low',
    autonomousAction: 'Checked supplies and prepared a restock order for your approval',
    reachOutMessage: 'You’re down to two cartons of oat milk, and your espresso beans will likely run out tomorrow. I prepared a restock order so you can review it before anything is purchased.',
    messages: [
      'You’re down to two cartons of oat milk.',
      'Your espresso beans may run out tomorrow, too. I prepared a restock order for you to review—nothing will be purchased until you approve it.'
    ],
    details: {
      source: 'Cafe inventory and supplier list',
      target: 'Restock order for your approval',
      timeTaken: '8.2s',
      confidence: '99.8%',
      savedTime: 'Time spent checking and ordering stock',
    },
    steps: [
      { time: '09:15:00', description: 'Checked current oat milk and espresso bean stock', status: 'completed' },
      { time: '09:15:03', description: 'Compared stock with typical daily cafe usage', status: 'completed' },
      { time: '09:15:06', description: 'Prepared a restock order from your saved supplier', status: 'completed' },
      { time: '09:15:08', description: 'Sent the order for your approval before purchase', status: 'completed' },
    ],
    interactivePayload: {
      type: 'invoice',
      primaryActionLabel: 'Approve restock order',
      secondaryActionLabel: 'Edit order',
      metadata: {
        'Oat milk': '2 cartons left',
        'Espresso beans': 'Likely out tomorrow',
        'Supplier': 'Your saved cafe supplier',
        'Purchase': 'Only after your approval',
      },
    },
  },
  {
    id: 'competitor-radar',
    title: 'Stock Watch Update',
    category: 'Investing',
    trigger: 'A watched stock had a notable price change today',
    autonomousAction: 'Checked the price move and gathered the latest company news',
    reachOutMessage: 'One of your watched stocks moved today. I checked the latest company news and prepared a quick summary for you to review.',
    messages: [
      'One of your watched stocks moved today.',
      'I checked the latest company news and prepared a quick summary for you. No trades were made.'
    ],
    details: {
      source: 'Market data and company news',
      target: 'Your phone',
      timeTaken: '6.4s',
      confidence: '99.1%',
      savedTime: 'Time spent checking updates',
    },
    steps: [
      { time: '09:30:22', description: 'Checked the price of a stock on your watchlist', status: 'completed' },
      { time: '09:30:24', description: 'Reviewed recent company announcements and news', status: 'completed' },
      { time: '09:30:26', description: 'Prepared a plain-language summary of the movement', status: 'completed' },
      { time: '09:30:28', description: 'Sent the update to your phone for review', status: 'completed' },
    ],
    interactivePayload: {
      type: 'intel',
      primaryActionLabel: 'View stock update',
      secondaryActionLabel: 'Read company news',
      metadata: {
        'Watchlist': 'Stock price update',
        'What changed': 'Notable daily movement',
        'Summary': 'Latest company news checked',
        'Next step': 'Review the update',
      },
    },
  },
];

const SCENARIO_TRANSLATIONS: Record<string, {
  title: string;
  category: string;
  trigger: string;
  autonomousAction: string;
  reachOutMessage: string;
  messages: string[];
  source: string;
  target: string;
  savedTime: string;
  steps: string[];
  primaryActionLabel: string;
  secondaryActionLabel: string;
  metadata: Record<string, string>;
}> = {
  'travel-shield': {
    title: '부산 출장 예약',
    category: '여행 및 이동',
    trigger: '매주 반복되는 일정: 내일 부산행',
    autonomousAction: '승차권 가격을 확인하고 오전 8시와 10시 30분 요금을 비교했어요',
    reachOutMessage: '좋은 저녁이에요! 내일은 매주 가시는 부산 출장 날이라 승차권을 확인해 봤어요. 가장 저렴한 표는 오전 8시 출발, 29,000원이에요. 이 표로 예약할까요? 오전 10시 30분 표는 5,000원 더 비싸요. 편한 시간으로 알려 주세요.',
    messages: [
      '좋은 저녁이에요! 내일은 매주 가시는 부산 출장 날이에요.',
      '승차권을 확인해 보니 가장 저렴한 표는 오전 8시 출발, 29,000원이에요. 이 표로 예약할까요? 오전 10시 30분 표는 5,000원 더 비싸요. 편한 시간으로 알려 주세요.',
    ],
    source: '코레일 및 에어부산 운항 정보',
    target: '텔레그램, Google 캘린더',
    savedTime: '검색 및 예약 시간 25분 절약',
    steps: [
      '반복 일정 확인: 내일 예정된 부산 출장 일정을 찾았어요',
      '승차권 조회: 오전 8시 출발, 29,000원 표를 확인했어요 (최저가)',
      '대안 확인: 오전 10시 30분 출발, 34,000원 표를 확인했어요 (+5,000원)',
      '오전 8시 좌석을 임시로 확보하고 확인 메시지를 보냈어요',
    ],
    primaryActionLabel: '오전 8시 표 예약하기 (29,000원)',
    secondaryActionLabel: '오전 10시 30분 표 예약하기 (34,000원)',
    metadata: {
      '목적지': '부산 (주간 일정)',
      '추천 일정': '오전 8시 출발 · 29,000원',
      '다른 선택': '오전 10시 30분 출발 · 34,000원',
      '상태': '한 번의 탭으로 확인을 기다리는 중',
    },
  },
  'invoice-triage': {
    title: '검토할 청구서가 도착했어요',
    category: '청구 및 결제',
    trigger: 'Studio Forma에서 4,850달러 청구서를 보냈어요',
    autonomousAction: '주문 내역 및 완료된 작업과 대조한 뒤, 승인 대기 결제를 준비했어요',
    reachOutMessage: 'Studio Forma에서 4,850달러 청구서를 보냈어요. 주문 내역 및 완료된 작업과 대조해 보니 모두 일치해요. 결제를 승인하실 수 있도록 준비해 두었어요.',
    messages: [
      'Studio Forma에서 4,850달러 청구서를 보냈어요.',
      '주문 내역 및 완료된 작업과 대조해 보니 모두 일치해요. 결제를 승인하실 수 있도록 준비해 두었어요.',
    ],
    source: 'Gmail 첨부 파일 및 Stripe 청구서',
    target: 'QuickBooks 및 은행 중계',
    savedTime: '대조 작업 30분 절약',
    steps: [
      '거래처 이메일에서 PDF 청구서 #INV-9821을 확인했어요',
      '"Design System Tokens v2" 마일스톤 승인 내역을 Linear 및 GitHub에서 확인했어요',
      '세금 ID, 결제 조건(Net-30), 주문서 PO-4412 대비 금액 차이 없음을 확인했어요',
      '회계 장부 항목을 만들고 은행 송금 초안을 준비했어요',
    ],
    primaryActionLabel: '4,850달러 결제 승인',
    secondaryActionLabel: '청구서 검토',
    metadata: {
      '보낸 곳': 'Studio Forma',
      '청구 금액': '4,850달러',
      '주문 대조': '모든 항목 일치',
      '결제': '승인 대기 중',
    },
  },
  'cafe-inventory': {
    title: '카페 재고 확인',
    category: '카페 운영',
    trigger: '오늘 재고 확인: 귀리 우유가 얼마 남지 않았어요',
    autonomousAction: '재고를 확인하고 승인받을 수 있도록 추가 주문을 준비했어요',
    reachOutMessage: '귀리 우유가 두 팩 남았고 에스프레소 원두도 내일이면 다 떨어질 것 같아요. 구매 전에 검토하실 수 있도록 재고 보충 주문을 준비해 뒀어요.',
    messages: [
      '귀리 우유가 두 팩 남았어요.',
      '에스프레소 원두도 내일이면 다 떨어질 것 같아요. 아직 구매된 상품은 없고, 검토하실 수 있도록 보충 주문만 준비해 뒀어요.',
    ],
    source: '카페 재고 및 공급업체 목록',
    target: '승인 대기 중인 재고 보충 주문',
    savedTime: '재고 확인 및 주문 시간 절약',
    steps: [
      '현재 귀리 우유와 에스프레소 원두 재고를 확인했어요',
      '일반적인 하루 사용량과 현재 재고를 비교했어요',
      '저장된 공급업체를 통해 재고 보충 주문을 준비했어요',
      '구매 전 확인하실 수 있도록 주문을 보냈어요',
    ],
    primaryActionLabel: '재고 보충 주문 승인',
    secondaryActionLabel: '주문 수정',
    metadata: {
      '귀리 우유': '2팩 남음',
      '에스프레소 원두': '내일 소진 예상',
      '공급업체': '저장된 카페 공급업체',
      '구매': '승인 후 진행',
    },
  },
  'competitor-radar': {
    title: '관심 종목 업데이트',
    category: '투자',
    trigger: '관심 종목의 주가가 오늘 크게 변동했어요',
    autonomousAction: '주가 변동을 확인하고 최신 기업 소식을 모았어요',
    reachOutMessage: '관심 종목 중 하나의 주가가 오늘 움직였어요. 최신 기업 소식을 확인하고 검토하실 수 있도록 간단히 정리해 뒀어요.',
    messages: [
      '관심 종목 중 하나의 주가가 오늘 움직였어요.',
      '최신 기업 소식을 확인하고 간단히 정리해 뒀어요. 매매는 진행하지 않았어요.',
    ],
    source: '시장 데이터 및 기업 소식',
    target: '내 휴대폰',
    savedTime: '업데이트 확인 시간 절약',
    steps: [
      '관심 종목의 주가를 확인했어요',
      '최근 기업 공시 및 뉴스를 살펴봤어요',
      '주가 변동을 알기 쉽게 요약했어요',
      '검토하실 수 있도록 휴대폰으로 업데이트를 보냈어요',
    ],
    primaryActionLabel: '종목 업데이트 보기',
    secondaryActionLabel: '기업 소식 읽기',
    metadata: {
      '관심 목록': '주가 업데이트',
      '변동 내용': '눈에 띄는 일일 변동',
      '요약': '최신 기업 소식 확인 완료',
      '다음 단계': '업데이트 검토하기',
    },
  },
};

export function getScenarios(language: 'en' | 'ko'): Scenario[] {
  if (language === 'en') return SCENARIOS;
  return SCENARIOS.map((scenario) => {
    const translation = SCENARIO_TRANSLATIONS[scenario.id];
    return {
      ...scenario,
      title: translation.title,
      category: translation.category,
      trigger: translation.trigger,
      autonomousAction: translation.autonomousAction,
      reachOutMessage: translation.reachOutMessage,
      messages: translation.messages,
      details: {
        ...scenario.details,
        source: translation.source,
        target: translation.target,
        savedTime: translation.savedTime,
      },
      steps: scenario.steps.map((step, index) => ({
        ...step,
        description: translation.steps[index],
      })),
      interactivePayload: scenario.interactivePayload && {
        ...scenario.interactivePayload,
        primaryActionLabel: translation.primaryActionLabel,
        secondaryActionLabel: translation.secondaryActionLabel,
        metadata: translation.metadata,
      },
    };
  });
}

export const TRUSTED_COMPANIES = [
  { name: 'Linear', domain: 'Issue Tracking & Product' },
  { name: 'Stripe', domain: 'Payments Infrastructure' },
  { name: 'Figma', domain: 'Design Systems' },
  { name: 'Notion', domain: 'Connected Workspace' },
  { name: 'Ramp', domain: 'Corporate Finance' },
  { name: 'Retool', domain: 'Internal Tooling' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-capital',
    company: 'Aura Capital',
    tag: 'Venture Capital',
    metric: '14.2 hrs',
    metricContext: 'Reclaimed weekly per partner during active deal pipeline',
    quote: 'Minds doesn’t wait around for prompts like ChatGPT. When our founders schedule calls, it prepares their background, checks past portfolio touches, and handles the follow-up logistics before I even open my laptop.',
    author: 'Marcus Vance',
    role: 'Managing Partner, Aura Capital',
  },
  {
    id: 'northstar-logistics',
    company: 'Northstar Freight',
    tag: 'Global Logistics',
    metric: '0 missed',
    metricContext: 'Customs clearance filings across 3,400 monthly freight manifests',
    quote: 'We have 200 daily container shipments. Minds proactively reconciles customs documentation mismatches and pings brokers with the exact missing forms without my operations team lifting a finger.',
    author: 'Elena Rostova',
    role: 'VP of Global Operations, Northstar',
  },
  {
    id: 'metric-labs',
    company: 'Metric Labs',
    tag: 'AI Infrastructure',
    metric: '84%',
    metricContext: 'Reduction in executive context-switching & calendar friction',
    quote: 'The fundamental paradigm shift is that Minds initiates communication with you, not the other way around. It feels like having a world-class chief of staff who never sleeps.',
    author: 'Devon Patel',
    role: 'Founder & CEO, Metric Labs',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'what-is-minds',
    category: 'Product',
    question: 'What is Minds?',
    answer: 'Minds is a personal AI partner that remembers you and takes care of real tasks. It keeps working on what you’ve asked it to do, even when you step away, and reaches out when it needs your input.',
  },
  {
    id: 'how-is-minds-different',
    category: 'Product',
    question: 'How is Minds different from other AI tools?',
    answer: 'Other AI tools often answer a question and lose the context. Minds remembers you across conversations, keeps working on assigned tasks while you’re away from the chat, and lets you know when something needs your attention.',
  },
  {
    id: 'passwords-card-numbers',
    category: 'Security',
    question: 'Can Minds see my passwords or card details?',
    answer: 'No. Minds does not store your full card number; payments are processed by a third-party payment provider. Wallet private keys are encrypted and cannot be viewed directly by the AI.',
  },
  {
    id: 'works-while-away',
    category: 'Product',
    question: 'Will Minds keep working while I’m away?',
    answer: 'Yes. Minds can continue working on the tasks you’ve assigned while you’re away or busy, and will reach out when it needs your input.',
  },
  {
    id: 'pay-or-book-without-asking',
    category: 'Sovereignty',
    question: 'Can Minds make a payment or booking without my approval?',
    answer: 'Important actions like payments and bookings are only carried out within the permissions you set. Minds can prepare and handle tasks you assign, but you decide what it is allowed to do.',
  },
];

export const FAQS_KO: FaqItem[] = [
  {
    id: 'what-is-minds',
    category: '제품',
    question: '마인즈 (Minds)는 어떤 서비스인가요?',
    answer: '마인즈는 나를 기억하고, 실제 일까지 대신 처리해 주는 개인 AI 파트너예요. 한 번 맡긴 일은 내가 자리를 비워도 이어서 진행하고, 확인이 필요할 땐 먼저 말을 걸어 줘요.',
  },
  {
    id: 'how-is-minds-different',
    category: '제품',
    question: '기존 AI와 무엇이 다른가요?',
    answer: '기존 AI는 질문을 받고 답을 한 뒤, 다음 대화에서 맥락이 잘 이어지지 않는 경우가 많아요. 마인즈는 나를 기억한 채로 대화를 이어 가고, 내가 채팅창에 없어도 맡긴 일을 진행한 다음, 확인이 필요할 때 먼저 알려 줘요.',
  },
  {
    id: 'passwords-card-numbers',
    category: '보안',
    question: '마인즈는 비밀번호나 카드 정보를 볼 수 있나요?',
    answer: '아니요. 결제 시 전체 카드 번호는 마인즈가 저장하지 않고, 결제는 외부 결제사를 통해 처리돼요. 지갑 개인키도 암호화되어 보관되며, AI가 직접 볼 수 없어요.',
  },
  {
    id: 'works-while-away',
    category: '제품',
    question: '내가 자리를 비워도 일하나요?',
    answer: '네. 마인즈는 내가 자리를 비우거나 다른 일을 하는 동안에도 맡긴 일을 이어 가고, 확인이 필요하면 먼저 알려 줘요.',
  },
  {
    id: 'pay-or-book-without-asking',
    category: '사용자 권한',
    question: '마인즈가 확인 없이 결제하거나 예약할 수 있나요?',
    answer: '결제나 예약처럼 중요한 실행은 내가 허용한 범위 안에서만 진행돼요. 맡긴 일을 준비하고 대신 처리할 수는 있지만, 무엇을 실행할지는 사용자가 정할 수 있어요.',
  },
];

export const FEATURE_PILLARS = [
  {
    number: '01',
    title: 'Autonomous Environmental Awareness',
    description: 'Minds quietly observes your communication streams, calendar holds, and project boards. It detects anomalies and bottlenecks before they disrupt your day.',
    details: 'Zero manual prompt drafting. Minds tracks changes across Gmail, Outlook, Slack, Stripe, and Delta APIs in real-time.',
  },
  {
    number: '02',
    title: 'Sovereign Human-in-the-Loop Guardrails',
    description: 'Micro-routines execute silently in the background. High-impact transactions pause for your 1-tap affirmative consent.',
    details: 'You define exact thresholds: approve payments over $500, confirm external emails, or let low-risk calendar reshuffling flow automatically.',
  },
  {
    number: '03',
    title: 'Proactive Outreach Across Your Preferred Channels',
    description: 'Instead of forcing you into another noisy dashboard, Minds reaches out where you already live: Telegram, SMS, Slack, or audio voice briefings.',
    details: 'Receive concise 2-sentence morning briefings and interactive actionable cards right when you wake up or land.',
  },
];
