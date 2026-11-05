import cn from 'clsx';
import {
  FOUNDER_ROLES,
  COMPANY_STAGES,
  INDUSTRIES,
  LOOKING_FOR,
  founderRoleLabels,
  companyStageLabels,
  industryLabels,
  lookingForLabels,
  isFounderRole,
  isCompanyStage,
  isIndustry
} from '@lib/founder';
import type { ChangeEvent } from 'react';
import type { FounderData, User } from '@lib/types/user';
import type { LookingFor } from '@lib/founder';

/** Fills in defaults so every founder field is defined (Firestore rejects undefined). */
export function getFounderData(
  user: Partial<User> | null
): Required<FounderData> {
  return {
    company: user?.company ?? null,
    role: user?.role ?? null,
    industry: user?.industry ?? null,
    stage: user?.stage ?? null,
    lookingFor: user?.lookingFor ?? [],
    canHelpWith: user?.canHelpWith ?? null
  };
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string | null;
  options: readonly string[];
  labels: Readonly<Record<string, string>>;
  onChange: (value: string) => void;
};

function SelectField({
  id,
  label,
  value,
  options,
  labels,
  onChange
}: SelectFieldProps): JSX.Element {
  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLSelectElement>): void => onChange(value);

  return (
    <div
      className='relative rounded ring-1 ring-light-line-reply transition-shadow duration-200
                 focus-within:ring-2 focus-within:!ring-main-accent dark:ring-dark-border'
    >
      <label
        className='absolute left-3 translate-y-1 text-sm text-light-secondary dark:text-dark-secondary'
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className='mt-6 w-full cursor-pointer bg-inherit px-2 pb-1 outline-none'
        id={id}
        value={value ?? ''}
        onChange={handleChange}
      >
        <option className='bg-main-background' value=''>
          Not specified
        </option>
        {options.map((option) => (
          <option className='bg-main-background' value={option} key={option}>
            {labels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}

type FounderFieldsEditorProps = {
  data: Required<FounderData>;
  onChange: (data: Required<FounderData>) => void;
};

/**
 * Structured founder fields for the Edit profile modal. The free-text fields
 * (company, can help with) are rendered by the parent with InputField so they
 * share its character counter.
 */
export function FounderFieldsEditor({
  data,
  onChange
}: FounderFieldsEditorProps): JSX.Element {
  const { role, industry, stage, lookingFor } = data;

  const toggleLookingFor = (item: LookingFor) => (): void =>
    onChange({
      ...data,
      lookingFor: lookingFor.includes(item)
        ? lookingFor.filter((current) => current !== item)
        : [...lookingFor, item]
    });

  return (
    <>
      <SelectField
        id='role'
        label='Role'
        value={role}
        options={FOUNDER_ROLES}
        labels={founderRoleLabels}
        onChange={(value): void =>
          onChange({ ...data, role: isFounderRole(value) ? value : null })
        }
      />
      <SelectField
        id='industry'
        label='Industry'
        value={industry}
        options={INDUSTRIES}
        labels={industryLabels}
        onChange={(value): void =>
          onChange({ ...data, industry: isIndustry(value) ? value : null })
        }
      />
      <SelectField
        id='stage'
        label='Stage'
        value={stage}
        options={COMPANY_STAGES}
        labels={companyStageLabels}
        onChange={(value): void =>
          onChange({ ...data, stage: isCompanyStage(value) ? value : null })
        }
      />
      <fieldset className='flex flex-col gap-2'>
        <legend className='mb-2 text-sm text-light-secondary dark:text-dark-secondary'>
          Looking for
        </legend>
        <div className='flex flex-wrap gap-2'>
          {LOOKING_FOR.map((item) => {
            const selected = lookingFor.includes(item);
            return (
              <button
                type='button'
                className={cn(
                  'custom-button accent-tab border px-3 py-1 text-sm font-bold transition',
                  selected
                    ? 'border-main-accent bg-main-accent text-white'
                    : 'border-light-line-reply hover:bg-main-accent/10 dark:border-dark-border'
                )}
                aria-pressed={selected}
                onClick={toggleLookingFor(item)}
                key={item}
              >
                {lookingForLabels[item]}
              </button>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}

type FounderDetailsProps = Partial<FounderData> & {
  compact?: boolean;
};

/** Read-only founder summary for profile pages and people cards. */
export function FounderDetails({
  company,
  role,
  industry,
  stage,
  lookingFor,
  canHelpWith,
  compact
}: FounderDetailsProps): JSX.Element | null {
  const roleLabel = role ? founderRoleLabels[role] : null;

  const headline =
    roleLabel && company ? `${roleLabel} at ${company}` : roleLabel ?? company;

  const tags = [
    industry ? industryLabels[industry] : null,
    stage ? companyStageLabels[stage] : null
  ].filter((tag): tag is string => !!tag);

  const wants = lookingFor ?? [];

  if (!headline && !tags.length && !wants.length && !canHelpWith) return null;

  return (
    <div className={cn('flex flex-col', compact ? 'gap-1' : 'gap-2')}>
      {(headline || tags.length > 0) && (
        <div className='flex flex-wrap items-center gap-2'>
          {headline && <p className='font-bold'>{headline}</p>}
          {tags.map((tag) => (
            <span
              className='rounded-full bg-main-sidebar-background px-2 py-0.5 text-sm
                         text-light-secondary dark:text-dark-secondary'
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {wants.length > 0 && (
        <div className='flex flex-wrap items-center gap-2 text-sm'>
          <span className='text-light-secondary dark:text-dark-secondary'>
            Looking for
          </span>
          {wants.map((item) => (
            <span
              className='rounded-full bg-main-accent/10 px-2 py-0.5 font-bold text-main-accent'
              key={item}
            >
              {lookingForLabels[item]}
            </span>
          ))}
        </div>
      )}
      {canHelpWith && !compact && (
        <p className='whitespace-pre-line break-words'>
          <span className='text-light-secondary dark:text-dark-secondary'>
            Can help with:{' '}
          </span>
          {canHelpWith}
        </p>
      )}
    </div>
  );
}
