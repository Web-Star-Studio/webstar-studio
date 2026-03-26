'use client';

import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';
import { MetricCard } from '../../../types';
import { PAGE_HERO_IMAGES } from '@/data/publicMedia';
import { MetricGrid, PublicCTA, PublicPageHero, PublicSection, SectionIntro } from '@/components/public/PublicPrimitives';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type OfficeItem = { title: string; detail: string };
type ChannelItem = { title: string; detail: string };
type LegalBlock = {
  eyebrow: string;
  legalName: string;
  cnpj: string;
  note: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
};

export default function ContactPage() {
  const { t } = useTranslation();
  const trust = t('contact.trust.items', { returnObjects: true }) as MetricCard[];
  const officeItems = t('contact.offices.items', { returnObjects: true }) as OfficeItem[];
  const legal = t('contact.legal', { returnObjects: true }) as LegalBlock;
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const channels: ChannelItem[] = [
    t('contact.channels.email', { returnObjects: true }) as ChannelItem,
    t('contact.channels.scope', { returnObjects: true }) as ChannelItem,
    t('contact.channels.reply', { returnObjects: true }) as ChannelItem,
  ];

  const validateStepOne = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = t('contact.form.errors.name');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = t('contact.form.errors.email');
    return next;
  };

  const validateStepTwo = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.message.trim() || form.message.trim().length < 12) next.message = t('contact.form.errors.message');
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 1) {
      const next = validateStepOne();
      setErrors(next);
      if (Object.keys(next).length) return;
      setStep(2);
      return;
    }

    const next = validateStepTwo();
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('success');
    setForm(initialForm);
    setErrors({});
    setStep(1);
  };

  return (
    <SiteShell>
      <div className="relative z-10 w-full overflow-x-hidden bg-[#0f0f10] text-white">
        <PublicPageHero
          id="contact-hero"
          eyebrow={t('contact.hero.eyebrow')}
          title={t('contact.hero.title')}
          description={t('contact.hero.description')}
          image={PAGE_HERO_IMAGES.contact}
          railItems={trust}
        />

        <PublicSection className="bg-[#101011] py-16 md:py-24">
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {channels.map((channel, index) => (
              <article key={`${channel.title}-${index}`} className="public-grid-card bg-[#101011]">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-sans text-[1.7rem] leading-[1.02] tracking-[-0.05em] text-white md:text-[2.3rem]">
                  {channel.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">{channel.detail}</p>
              </article>
            ))}
          </div>
        </PublicSection>

        <PublicSection className="bg-[#0f0f10] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <SectionIntro
              eyebrow={t('contact.formBlock.eyebrow')}
              title={t('contact.formBlock.title')}
              description={t('contact.formBlock.description')}
            />

            <div className="public-panel p-6 md:p-8">
              {status === 'success' ? (
                <div>
                  <p className="text-base leading-relaxed text-white/84 md:text-lg">{t('contact.form.success')}</p>
                  <PublicCTA href="/services" label={t('contact.form.submit')} className="mt-8" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {step === 1 ? (
                    <>
                      <label className="block">
                        <span className="public-eyebrow">{t('contact.form.name')}</span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                          className="mt-4 w-full border-b border-white/20 bg-transparent pb-4 text-[1.8rem] leading-none tracking-[-0.04em] text-white outline-none focus:border-white"
                        />
                        {errors.name ? <span className="mt-3 block text-sm text-white/52">{errors.name}</span> : null}
                      </label>

                      <label className="block">
                        <span className="public-eyebrow">{t('contact.form.email')}</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                          className="mt-4 w-full border-b border-white/20 bg-transparent pb-4 text-[1.8rem] leading-none tracking-[-0.04em] text-white outline-none focus:border-white"
                        />
                        {errors.email ? <span className="mt-3 block text-sm text-white/52">{errors.email}</span> : null}
                      </label>

                      <label className="block">
                        <span className="public-eyebrow">{t('contact.form.company')}</span>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                          className="mt-4 w-full border-b border-white/20 bg-transparent pb-4 text-[1.8rem] leading-none tracking-[-0.04em] text-white outline-none focus:border-white"
                        />
                      </label>

                      <button type="submit" className="public-cta">
                        {t('contact.form.continue')}
                      </button>
                    </>
                  ) : (
                    <>
                      <label className="block">
                        <span className="public-eyebrow">{t('contact.form.message')}</span>
                        <textarea
                          value={form.message}
                          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                          className="mt-4 min-h-[220px] w-full border border-white/12 bg-white/[0.02] px-4 py-4 text-base leading-relaxed text-white outline-none focus:border-white"
                        />
                        {errors.message ? <span className="mt-3 block text-sm text-white/52">{errors.message}</span> : null}
                      </label>

                      <div className="flex gap-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/44 transition-colors hover:text-white"
                        >
                          Back
                        </button>
                        <button type="submit" className="public-cta">
                          {t('contact.form.submit')}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </div>
        </PublicSection>

        <PublicSection className="bg-[#101011] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionIntro
              eyebrow={t('contact.offices.eyebrow')}
              title={t('contact.offices.title')}
              description={t('contact.offices.description')}
            />
            <div className="space-y-4">
              {officeItems.map((item, index) => (
                <article key={`${item.title}-${index}`} className="public-panel p-6 md:p-8">
                  <p className="font-sans text-[1.7rem] uppercase tracking-[-0.05em] text-white md:text-[2.3rem]">{item.title}</p>
                  <p className="mt-4 text-base leading-relaxed text-white/66 md:text-lg">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </PublicSection>

        <PublicSection id="legal" className="bg-[#0f0f10] py-16 md:py-24">
          <div className="public-panel p-6 md:p-8">
            <p className="public-eyebrow">{legal.eyebrow}</p>
            <h2 className="mt-4 font-sans text-[2rem] leading-[1] tracking-[-0.05em] text-white md:text-[3rem]">{legal.legalName}</h2>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/42">{legal.cnpj}</p>
            <p className="mt-5 max-w-[820px] text-base leading-relaxed text-white/66 md:text-lg">{legal.note}</p>
          </div>
        </PublicSection>

        <Footer />
      </div>
    </SiteShell>
  );
}
