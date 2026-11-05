/**
 * Entrepreneur-specific vocabulary: profile options and post categories.
 *
 * The id lists here are mirrored in firestore.rules — if you add or rename
 * a value, update the matching list there too or writes will be rejected.
 */

import type { IconName } from '@components/ui/hero-icon';

export const FOUNDER_ROLES = [
  'founder',
  'co-founder',
  'investor',
  'advisor'
] as const;

export type FounderRole = typeof FOUNDER_ROLES[number];

export const founderRoleLabels: Readonly<Record<FounderRole, string>> = {
  founder: 'Founder',
  'co-founder': 'Co-founder',
  investor: 'Investor',
  advisor: 'Advisor'
};

export const COMPANY_STAGES = [
  'idea',
  'pre-seed',
  'seed',
  'series-a-plus',
  'bootstrapped'
] as const;

export type CompanyStage = typeof COMPANY_STAGES[number];

export const companyStageLabels: Readonly<Record<CompanyStage, string>> = {
  idea: 'Idea',
  'pre-seed': 'Pre-seed',
  seed: 'Seed',
  'series-a-plus': 'Series A+',
  bootstrapped: 'Bootstrapped'
};

export const INDUSTRIES = [
  'ai',
  'saas',
  'fintech',
  'healthtech',
  'ecommerce',
  'marketplace',
  'climate',
  'edtech',
  'consumer',
  'hardware',
  'media',
  'services',
  'other'
] as const;

export type Industry = typeof INDUSTRIES[number];

export const industryLabels: Readonly<Record<Industry, string>> = {
  ai: 'AI & machine learning',
  saas: 'SaaS / B2B software',
  fintech: 'Fintech',
  healthtech: 'Health & biotech',
  ecommerce: 'E-commerce & retail',
  marketplace: 'Marketplaces',
  climate: 'Climate & energy',
  edtech: 'Education',
  consumer: 'Consumer apps',
  hardware: 'Hardware & robotics',
  media: 'Media & creator economy',
  services: 'Agencies & services',
  other: 'Other'
};

export const LOOKING_FOR = [
  'co-founder',
  'investors',
  'customers',
  'mentors',
  'hires'
] as const;

export type LookingFor = typeof LOOKING_FOR[number];

export const lookingForLabels: Readonly<Record<LookingFor, string>> = {
  'co-founder': 'Co-founder',
  investors: 'Investors',
  customers: 'Customers',
  mentors: 'Mentors',
  hires: 'Hires'
};

export const POST_CATEGORIES = [
  'ask',
  'win',
  'hiring',
  'co-founder',
  'feedback'
] as const;

export type PostCategory = typeof POST_CATEGORIES[number];

type CategoryMeta = {
  label: string;
  iconName: IconName;
  /** Tailwind classes for the label pill. */
  className: string;
  /** Composer hint shown once the category is picked. */
  placeholder: string;
};

export const postCategoryMeta: Readonly<Record<PostCategory, CategoryMeta>> = {
  ask: {
    label: 'Ask',
    iconName: 'QuestionMarkCircleIcon',
    className: 'bg-accent-blue/10 text-accent-blue',
    placeholder: 'What do you need help with?'
  },
  win: {
    label: 'Share a win',
    iconName: 'TrophyIcon',
    className: 'bg-accent-green/10 text-accent-green',
    placeholder: 'What did you ship, close or learn?'
  },
  hiring: {
    label: 'Hiring',
    iconName: 'BriefcaseIcon',
    className: 'bg-accent-orange/10 text-accent-orange',
    placeholder: 'Role, location/remote, and how to apply'
  },
  'co-founder': {
    label: 'Looking for co-founder',
    iconName: 'UserPlusIcon',
    className: 'bg-accent-purple/10 text-accent-purple',
    placeholder: 'What are you building and who are you looking for?'
  },
  feedback: {
    label: 'Feedback request',
    iconName: 'ChatBubbleLeftRightIcon',
    className: 'bg-accent-pink/10 text-accent-pink',
    placeholder: 'What should people review, and what kind of feedback helps?'
  }
};

function isOneOf<T extends string>(
  list: readonly T[],
  value: unknown
): value is T {
  return typeof value === 'string' && (list as readonly string[]).includes(value);
}

export const isFounderRole = (value: unknown): value is FounderRole =>
  isOneOf(FOUNDER_ROLES, value);

export const isCompanyStage = (value: unknown): value is CompanyStage =>
  isOneOf(COMPANY_STAGES, value);

export const isIndustry = (value: unknown): value is Industry =>
  isOneOf(INDUSTRIES, value);

export const isLookingFor = (value: unknown): value is LookingFor =>
  isOneOf(LOOKING_FOR, value);

export const isPostCategory = (value: unknown): value is PostCategory =>
  isOneOf(POST_CATEGORIES, value);
