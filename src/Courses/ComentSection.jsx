import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BASE_URL from '../api/config';

function ComentSection() {
  const { t } = useTranslation('comments');
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');

    fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.comment,
        rating: Number(formData.rating),
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        setSuccess(json.message || t('successMessage'));
        setFormData({ comment: '', name: '', email: '', website: '', rating: 5 });
      })
      .catch(() => setError(t('errorMessage')))
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 lg:ml-40 mb-16 sm:mb-20 lg:mb-24">
      <div className="max-w-4xl mx-auto lg:mx-0 lg:ml-8 sm:lg:ml-12 lg:lg:ml-16">
        <div className="p-6 sm:p-8 lg:p-10 max-w-3xl">

          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {t('title')}
          </h2>
          <p className="text-black mb-8">
            {t('emailNote')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Comment Textarea */}
            <div>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder={t('commentPlaceholder')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Input Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('namePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('emailPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder={t('websitePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">{t('rating')}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-6 h-6 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Success / Error */}
            {success && <p className="text-green-600 text-sm font-medium">{success}</p>}
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-wave bg-black text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
              >
                {t('sendComment').split('').map((char, i) => (
                  <span key={i} className="letter">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ComentSection;