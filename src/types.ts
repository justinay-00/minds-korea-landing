export interface Scenario {
  id: string;
  title: string;
  category: string;
  trigger: string;
  autonomousAction: string;
  reachOutMessage: string;
  messages?: string[];
  details: {
    source: string;
    target: string;
    timeTaken: string;
    confidence: string;
    savedTime: string;
  };
  steps: {
    time: string;
    description: string;
    status: 'completed' | 'active' | 'pending';
  }[];
  interactivePayload?: {
    type: 'rebooking' | 'invoice' | 'briefing' | 'intel';
    primaryActionLabel: string;
    secondaryActionLabel?: string;
    metadata: Record<string, string>;
  };
}

export interface CaseStudy {
  id: string;
  company: string;
  metric: string;
  metricContext: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface OnboardingData {
  role: string;
  primaryPains: string[];
  preferredChannel: string;
  email: string;
  fullName: string;
  companyName: string;
}
