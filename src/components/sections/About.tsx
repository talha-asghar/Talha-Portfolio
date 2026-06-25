import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import Section from '../Section';

const PROFILE_IMAGE = '/assets/images/profile/IMG_20230617_112838_124751.jpg';
const HIGHLIGHTS = ['React.js Expert', 'Agentic AI', 'RAG Systems', 'MCP Servers', 'React Native', 'Node.js'];

export default function About() {
  return (
    <Section id="about" title="About Me" subtitle="A snapshot of my professional journey, expertise, and academic foundation." alt>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-200 to-violet-200 blur-xl" />
            <div className="absolute -inset-1 rounded-3xl border border-slate-200" />
            <div className="absolute -bottom-4 -right-4 z-10 bg-white rounded-2xl px-4 py-2 shadow-lg border border-slate-100">
              <p className="text-xs font-semibold text-slate-700">4+ Years Exp.</p>
            </div>
            <div className="absolute -top-4 -left-4 z-10 bg-white rounded-2xl px-3 py-1.5 shadow-lg border border-slate-100">
              <p className="text-xs font-semibold text-blue-600">Full-Stack & AI Dev</p>
            </div>
            <img src={PROFILE_IMAGE} alt="Talha Asghar" className="relative w-72 h-80 object-cover object-top rounded-3xl shadow-xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h3 className="font-display text-3xl font-bold text-slate-900 leading-tight">
            Crafting <span className="text-gradient">intelligent</span> digital experiences
          </h3>
          <p className="text-slate-600 leading-relaxed">
            I'm a Full-Stack & AI Developer at <span className="font-semibold text-blue-600">f3 technologies</span>, where I build
            enterprise-scale web and mobile solutions. I specialize in bridging modern frontend excellence with cutting-edge AI integrations.
          </p>
          <p className="text-slate-600 leading-relaxed">
            My focus lies in Agentic AI architectures, RAG pipelines, and MCP server configurations that connect LLMs to real-world data.
            I hold a BS in Software Engineering from COMSATS University Islamabad.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {HIGHLIGHTS.map((h) => (
              <span key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-3 h-3 text-blue-600" /> {h}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </span>
            Experience
          </h3>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-lg">Full-Stack & AI Developer</h4>
                <p className="text-blue-600 font-medium text-sm">f3 technologies</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> July 2023 — Present</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Pakistan</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'Building scalable web and mobile applications with React.js, Next.js, and React Native.',
                    'Designing RAG workflows and configuring MCP servers to connect LLMs with custom data sources.',
                    'Orchestrating Agentic AI models and automating complex multi-step workflows.',
                  ].map((p, j) => (
                    <li key={j} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-blue-600 mt-0.5 shrink-0">▹</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-display text-xl font-semibold text-slate-900 flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </span>
            Education
          </h3>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-violet-500/10 transition-shadow h-[calc(100%-3.75rem)]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white mb-5">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h4 className="font-display text-xl font-bold text-slate-900">BS in Software Engineering</h4>
            <p className="text-violet-600 font-medium mt-1">COMSATS University Islamabad</p>
            <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
              <Calendar className="w-4 h-4" /> 2019 — 2023
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['4 Years', 'Software Eng.', 'Honors'].map((stat) => (
                <div key={stat} className="text-center p-3 rounded-xl bg-slate-50">
                  <p className="text-sm font-semibold text-slate-700">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
