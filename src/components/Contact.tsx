import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ContactProps {
  data: PortfolioData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger local direct mailto protocol for instant delivery without requiring external backend key
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open user's default email client
    const mailtoUrl = `mailto:${data.personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact & Collaboration
          </h2>
          <div className="h-1 w-12 bg-emerald-400 mt-3 rounded-full" />
          <p className="text-slate-400 text-sm mt-3">
            Available for software engineering internships, AI research discussions, and entry-level technical opportunities.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (5 cols): Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Email</div>
                    <a
                      href={`mailto:${data.personalInfo.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition-colors break-all"
                    >
                      {data.personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(data.personalInfo.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Phone & WhatsApp</div>
                    <a
                      href={`tel:${data.personalInfo.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-teal-400 transition-colors font-mono"
                    >
                      {data.personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(data.personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Location</div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    {data.personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">LinkedIn Profile</div>
                    <div className="text-sm font-semibold text-white">Aadhipradhap V</div>
                  </div>
                </div>

                <a
                  href={data.personalInfo.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your details below. This form triggers a pre-composed email dispatch via your default client to <span className="text-slate-300 font-mono">{data.personalInfo.email}</span>.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-base text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Message Ready for Sending</span>
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    Your email client has been opened with your inquiry prepared. If your mail client did not automatically launch, you can directly email <a href={`mailto:${data.personalInfo.email}`} className="underline font-semibold">{data.personalInfo.email}</a>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sundaram"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.name ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-rose-400">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Your Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.email ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Subject *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / AI Certificate Discussion"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.subject ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-rose-400">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Message *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Aadhipradhap, I would like to discuss..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-400">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
