"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sendContact, type ContactState } from "@/app/actions/contact";

export interface ContactFormLabels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  invalid: string;
}

const initialState: ContactState = { status: "idle" };

export function ContactForm({ t }: { t: ContactFormLabels }) {
  const [state, formAction, isPending] = useActionState(sendContact, initialState);

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/25";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot anti-spam (invisible) */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">
          {t.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder={t.subjectPlaceholder}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder={t.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t.sending : t.send}
        </button>

        <AnimatePresence mode="wait">
          {state.status === "success" && (
            <Message key="ok" tone="ok">
              {t.success}
            </Message>
          )}
          {state.status === "error" && (
            <Message key="err" tone="err">
              {t.error}
            </Message>
          )}
          {state.status === "invalid" && (
            <Message key="inv" tone="err">
              {t.invalid}
            </Message>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Message({ children, tone }: { children: React.ReactNode; tone: "ok" | "err" }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      className={`text-sm ${tone === "ok" ? "text-accent" : "text-red-600 dark:text-red-400"}`}
    >
      {children}
    </motion.p>
  );
}
