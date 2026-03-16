import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const Contact: React.FC = () => {
  const { contact, isLoading, error } = usePortfolioStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the data to a backend
    alert(`Thanks for your message, ${formData.name}! I'll get back to you soon.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        No contact data available.
      </div>
    );
  }

  const { email, phone, location, social, contactForm } = contact;

  return (
    <div className="min-h-screen bg-black text-gray-300 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-400">Contact</h1>
          <p className="text-gray-400 mt-2">Get in touch with me</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="bg-gray-900 border border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <a href={`mailto:${email}`} className="text-green-400 hover:underline">
                  {email}
                </a>
              </div>

              <div className="bg-gray-900 border border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Phone</h3>
                <p className="text-gray-300">{phone}</p>
              </div>

              <div className="bg-gray-900 border border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-300">
                  {location.city}, {location.state}, {location.country}
                </p>
                <p className="text-gray-500 text-sm">{location.timezone}</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-green-400 mb-4 mt-8">Social Media</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-green-800 px-4 py-2 rounded hover:border-green-600 transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Send a Message</h2>
            {contactForm.enabled ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-green-800 rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-green-800 rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-green-800 rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-gray-900 border border-green-800 rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <p className="text-gray-400">Contact form is disabled. Please email me directly.</p>
            )}

            {submitted && (
              <div className="mt-4 p-3 bg-green-900 border border-green-600 rounded text-green-200">
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
