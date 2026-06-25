import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin } from 'lucide-react';
import Section from '../Section';
import { useToast } from '../../context/ToastContext';

const PHONE = '03089460061';
const EMAIL = 'ta449011@gmail.com';
const WHATSAPP_LINK = `https://wa.me/92${PHONE.slice(1)}`;
const MAIL_LINK = `mailto:${EMAIL}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.44.645 4.73 1.77 6.715L2 30l7.53-1.74A13.924 13.924 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.24 0-4.34-.607-6.14-1.66l-.44-.26-4.47 1.033 1.057-4.33-.29-.46A11.468 11.468 0 014.5 16c0-6.34 5.16-11.5 11.5-11.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5zm6.29-8.63c-.344-.172-2.037-1.005-2.352-1.12-.316-.115-.546-.172-.776.172-.23.344-.892 1.12-1.093 1.35-.2.23-.402.258-.747.086-.344-.172-1.452-.535-2.767-1.707-1.022-.913-1.712-2.04-1.912-2.384-.2-.344-.021-.53.15-.701.155-.155.344-.402.516-.603.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.672-.565-.58-.776-.59-.2-.01-.43-.012-.66-.012-.23 0-.603.086-.919.43-.316.344-1.207 1.18-1.207 2.877 0 1.697 1.235 3.337 1.408 3.567.172.23 2.43 3.71 5.89 5.206.822.354 1.464.565 1.965.723.826.262 1.578.225 2.172.137.663-.099 2.037-.832 2.323-1.636.287-.804.287-1.493.2-1.636-.086-.143-.316-.229-.66-.4z"/>
    </svg>
  );
}

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8.5v15A2.5 2.5 0 004.5 26h2.5V14.5L16 20l9-5.5V26h2.5A2.5 2.5 0 0030 23.5v-15a2.5 2.5 0 00-2.5-2.5H27l-11 6.5L5 6h-.5A2.5 2.5 0 002 8.5z" fill="#EA4335"/>
      <path d="M7 6H5l11 6.5L27 6h-2L16 11.5 7 6z" fill="#FBBC05"/>
    </svg>
  );
}

const CONTACT_ITEMS = [
  {
    href: WHATSAPP_LINK,
    label: 'Phone / WhatsApp',
    value: PHONE,
    cta: 'Chat Now →',
    Icon: WhatsAppIcon,
    iconBg: 'bg-[#25D366]',
    hoverClass: 'hover:shadow-lg hover:shadow-emerald-500/15',
    target: '_blank',
  },
  {
    href: MAIL_LINK,
    label: 'Email',
    value: EMAIL,
    cta: 'Mail Me →',
    Icon: GmailIcon,
    iconBg: 'bg-white',
    hoverClass: 'hover:shadow-lg hover:shadow-blue-500/15',
    target: undefined,
  },
];

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', email: '', message: '' });
      showToast('Message sent successfully! I will get back to you soon.', 'success');
    }, 1200);
  };

  return (
    <Section id="contact" title="Get In Touch" subtitle="Have a project in mind or just want to connect? My inbox is always open." alt>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {CONTACT_ITEMS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.target ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm ${item.hoverClass} transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                <item.Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                <p className="font-semibold text-slate-900 truncate">{item.value}</p>
              </div>
              <span className="text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform shrink-0">{item.cta}</span>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Location</p>
              <p className="font-semibold text-slate-900">Pakistan — Remote / On-site</p>
            </div>
          </motion.div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4"
        >
          {[
            { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your name',        value: form.name,  onChange: (v: string) => setForm((f) => ({ ...f, name: v })) },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com',  value: form.email, onChange: (v: string) => setForm((f) => ({ ...f, email: v })) },
          ].map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
              <input
                required
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60"
          >
            {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}
