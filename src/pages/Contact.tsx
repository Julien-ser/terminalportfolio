import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Contact: React.FC = () => {
  useDocumentTitle({ title: 'Contact' });

  const { contact, isLoading, error } = usePortfolioStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Focus the first error field for keyboard users
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      // Announce errors via live region
      const errorCount = Object.keys(errors).length;
      const errorMessages = Object.values(errors).join('. ');
      const liveRegion = document.getElementById('form-status-live');
      if (liveRegion) {
        liveRegion.textContent = `Form submission failed. ${errorCount} error${errorCount > 1 ? 's' : ''}: ${errorMessages}`;
      }
      return;
    }
    // In a real implementation, this would send the data to a backend
    alert(`Thanks for your message, ${formData.name}! I'll get back to you soon.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(true);
    setErrors({});
    // Keep success message visible longer for screen readers (5 seconds)
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center" role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center" role="alert" aria-live="assertive">
        Error: {error}
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center" role="alert" aria-live="assertive">
        No contact data available.
      </div>
    );
  }

  const { email, phone, location, social, contactForm } = contact;

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-green-400">Contact</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Get in touch with me</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="bg-gray-900 border border-green-800 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Email</h3>
                <a
                  href={`mailto:${email}`}
                  className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-green-400 hover:underline text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                  aria-label={`Send email to ${email}`}
                >
                  {email}
                </a>
              </div>

              <div className="bg-gray-900 border border-green-800 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Phone</h3>
                <p className="text-gray-300 text-sm">{phone}</p>
              </div>

              <div className="bg-gray-900 border border-green-800 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Location</h3>
                <p className="text-gray-300 text-sm">
                  {location.city}, {location.state}, {location.country}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">{location.timezone}</p>
              </div>
            </div>

            <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-4 mt-8">Social Media</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.entries(social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center bg-gray-900 border border-green-800 hover:border-green-600 transition-colors capitalize text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                  aria-label={`Visit ${platform} profile`}
                >
                  {platform}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-green-400 mb-4">Send a Message</h2>
            {/* Screen reader live region for form status */}
            <div id="form-status-live" aria-live="polite" aria-atomic="true" className="sr-only" />
            {contactForm.enabled ? (
              <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-label="Contact form">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2">
                      Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full bg-gray-900 border border-green-800 rounded px-3 sm:px-4 py-2 text-white focus:border-green-400 focus:outline-none text-sm sm:text-base focus:ring-2 focus:ring-green-400"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs sm:text-sm text-red-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2">
                      Email <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full bg-gray-900 border border-green-800 rounded px-3 sm:px-4 py-2 text-white focus:border-green-400 focus:outline-none text-sm sm:text-base focus:ring-2 focus:ring-green-400"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs sm:text-sm text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-2">
                      Subject <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className="w-full bg-gray-900 border border-green-800 rounded px-3 sm:px-4 py-2 text-white focus:border-green-400 focus:outline-none text-sm sm:text-base focus:ring-2 focus:ring-green-400"
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-xs sm:text-sm text-red-400" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2">
                      Message <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={5}
                      className="w-full bg-gray-900 border border-green-800 rounded px-3 sm:px-4 py-2 text-white focus:border-green-400 focus:outline-none resize-none text-sm sm:text-base focus:ring-2 focus:ring-green-400"
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs sm:text-sm text-red-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                 <button
                   type="submit"
                   className="w-full bg-green-800 hover:bg-green-700 text-white py-3 px-4 min-h-[44px] rounded transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
                 >
                   Send Message
                 </button>
              </form>
            ) : (
              <p className="text-gray-400 text-sm sm:text-base">Contact form is disabled. Please email me directly.</p>
            )}

            {submitted && (
              <div className="mt-4 p-3 bg-green-900 border border-green-600 rounded text-green-200 text-sm">
                Message sent successfully!
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
