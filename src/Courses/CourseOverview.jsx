import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BASE_URL from '../api/config';

function CourseOverview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [meta, setMeta] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    if (!courseId) return;
    fetch(`${BASE_URL}/courses/${courseId}/lectures`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    })
      .then((r) => r.json())
      .then((json) => {
        setMeta(json.meta || null);
        setModules(json.data || []);
        // Navigate directly to first lesson
        const firstLesson = json.data?.[0]?.lessons?.[0];
        if (firstLesson) {
          navigate(`/lecture/${firstLesson.id}`, { replace: true });
          return;
        }
        // expand all modules by default
        const expanded = {};
        (json.data || []).forEach((m) => { expanded[m.id] = true; });
        setExpandedModules(expanded);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId]);

  const toggleModule = (id) =>
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>&gt;</span>
          <Link to="/course-videos" className="hover:text-black">Courses</Link>
          <span>&gt;</span>
          <span className="text-black font-medium">{meta?.course_title || 'Course'}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          {meta?.thumbnail_url && (
            <img src={meta.thumbnail_url} alt="Course" className="w-32 h-20 object-cover rounded-xl flex-shrink-0" />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">{meta?.course_title}</h1>
            <p className="text-gray-500 text-sm">{meta?.lessons_count} lessons</p>
          </div>
        </div>

        {/* Modules */}
        {modules.map((mod) => (
          <div key={mod.id} className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-semibold text-black">{mod.title}</span>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                {mod.lessons?.length} lessons
                <svg className={`w-4 h-4 transition-transform ${expandedModules[mod.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </button>

            {expandedModules[mod.id] && (
              <div className="divide-y divide-gray-100">
                {mod.lessons?.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/lecture/${lesson.id}`)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">{lesson.title_en || lesson.title}</p>
                        {lesson.description_en && (
                          <p className="text-xs text-gray-400 mt-0.5">{lesson.description_en}</p>
                        )}
                      </div>
                      {lesson.is_free_preview && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Free</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {lesson.duration_minutes ? `${lesson.duration_minutes} min` : ''}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseOverview;
