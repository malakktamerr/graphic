# Requirements Document

## Introduction

هذه الـ feature تضمن أن الرسائل القادمة من الـ backend (رسائل النجاح والخطأ) تُعرض للمستخدم بلغته الحالية في الموقع. يتم ذلك عن طريق إرسال query parameter باسم `lang` بقيمة `ar` أو `en` مع كل API request، بحيث يعرف الـ backend أي لغة يستخدم في ردوده.

المشروع يستخدم React مع i18next للترجمة، واللغة الحالية محفوظة في `localStorage` تحت مفتاح `i18nextLng`. يوجد بالفعل في `src/api/config.js` دالتان مساعدتان (`withLang` و `getHeaders`) لكنهما غير مُطبَّقتان على جميع الـ API files.

## Glossary

- **API_Client**: الكود المسؤول عن إرسال HTTP requests إلى الـ backend، الموجود في `src/api/`
- **Lang_Param**: الـ query parameter `lang` الذي يُرسَل مع كل request بقيمة `ar` أو `en`
- **withLang**: دالة مساعدة في `src/api/config.js` تُضيف `lang` query param إلى أي URL
- **getHeaders**: دالة مساعدة في `src/api/config.js` تُرجع headers موحدة تشمل `Accept-Language`
- **Language_Store**: `localStorage` الذي يحفظ اللغة الحالية تحت مفتاح `i18nextLng`
- **Supported_Languages**: اللغتان المدعومتان: `ar` (العربية) و `en` (الإنجليزية)
- **Normalized_Lang**: القيمة المُعالَجة للغة، حيث تُحوَّل أي قيمة تبدأ بـ `ar` (مثل `ar-EG`, `ar-SA`) إلى `ar`، وأي قيمة أخرى إلى `en`

---

## Requirements

### Requirement 1: إرسال Lang Param مع جميع API Requests

**User Story:** As a user, I want the backend messages to appear in my current language, so that I can understand success and error messages without switching context.

#### Acceptance Criteria

1. WHEN any API request is sent, THE API_Client SHALL append a `lang` query parameter to the request URL with the current Normalized_Lang value.
2. WHEN the Language_Store contains a value starting with `ar`, THE API_Client SHALL set the Lang_Param value to `ar`.
3. WHEN the Language_Store contains a value that does not start with `ar`, THE API_Client SHALL set the Lang_Param value to `en`.
4. WHEN the Language_Store is empty or undefined, THE API_Client SHALL default the Lang_Param value to `ar`.
5. THE API_Client SHALL use the `withLang` helper from `src/api/config.js` to append the Lang_Param to all request URLs.

---

### Requirement 2: توحيد الـ Headers عبر جميع API Files

**User Story:** As a developer, I want all API calls to use consistent headers, so that the backend receives the correct language signal through both the query param and the Accept-Language header.

#### Acceptance Criteria

1. THE API_Client SHALL use the `getHeaders` helper from `src/api/config.js` for all request headers instead of inline header objects.
2. WHEN `getHeaders` is called, THE API_Client SHALL include an `Accept-Language` header with the current Normalized_Lang value.
3. THE API_Client SHALL apply `withLang` and `getHeaders` to all files in `src/api/` that do not already use them: `auth.js`, `courses.js`, `checkout.js`, `videos.js`, `certificates.js`, and `freeLectures.js`.
4. WHEN a request requires an Authorization token, THE API_Client SHALL pass the token via `getHeaders` extra parameter without removing the language-related headers.

---

### Requirement 3: تطبيق صحيح لـ withLang على URLs المعقدة

**User Story:** As a developer, I want the lang param to be appended correctly regardless of whether the URL already has query parameters, so that the final URL is always valid.

#### Acceptance Criteria

1. WHEN a URL already contains a `?` character, THE `withLang` function SHALL append the Lang_Param using `&lang=` separator.
2. WHEN a URL does not contain a `?` character, THE `withLang` function SHALL append the Lang_Param using `?lang=` separator.
3. THE `withLang` function SHALL produce a valid URL in both cases without duplicate separators.

---

### Requirement 4: تزامن اللغة عند تغييرها

**User Story:** As a user, I want the language of backend messages to update immediately when I switch the site language, so that subsequent API calls reflect my new language choice.

#### Acceptance Criteria

1. WHEN the user changes the site language via `toggleLanguage`, THE Language_Store SHALL be updated with the new language value before the next API request is sent.
2. WHEN the next API request is sent after a language change, THE API_Client SHALL read the updated language from the Language_Store and send the correct Lang_Param.
3. THE API_Client SHALL read the language from the Language_Store at request time (not at module initialization time), so that language changes are always reflected.

---

### Requirement 5: معالجة الأخطاء والـ Fallback

**User Story:** As a user, I want the application to remain functional even if the language value is missing or malformed, so that API calls are never blocked due to a missing lang param.

#### Acceptance Criteria

1. IF the Language_Store value is null, undefined, or an empty string, THEN THE API_Client SHALL use `ar` as the fallback Lang_Param value.
2. IF the Language_Store value is a regional variant (e.g., `ar-EG`, `ar-SA`, `en-US`), THEN THE API_Client SHALL normalize it to `ar` or `en` respectively before sending.
3. WHEN an API call fails due to a network error, THE API_Client SHALL throw an error with the backend's message if available, or a default fallback message, regardless of the language setting.
