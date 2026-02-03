
import React, { useState, useEffect } from 'react';
import { UserData, DetectionResult, AnalysisOutput } from './types';
import { analyzeEmail } from './services/geminiService';
import LanguageSelector from './components/LanguageSelector';
import MLProcess from './components/MLProcess';
import { COUNTRIES, getLanguagesForCountry } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    phoneNumber: '',
    country: 'India',
    language: 'en',
    isAuthenticated: false
  });

  const [loginStep, setLoginStep] = useState(1);
  const [emailText, setEmailText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisOutput | null>(null);

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem('spam_guard_user', JSON.stringify(user));
    }
  }, [user.isAuthenticated, user]);

  useEffect(() => {
    const saved = localStorage.getItem('spam_guard_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleStepOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.phoneNumber.length < 5) {
      alert("Please enter a valid phone number.");
      return;
    }
    const availableLangs = getLanguagesForCountry(user.country);
    if (!availableLangs.includes(user.language)) {
      setUser(prev => ({ ...prev, language: availableLangs[0] }));
    }
    setLoginStep(2); 
  };

  const handleFinalLogin = () => {
    setUser(prev => ({ ...prev, isAuthenticated: true }));
  };

  const handleDetection = async () => {
    if (!emailText.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    const analysis = await analyzeEmail(emailText, user.language);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const logout = () => {
    localStorage.removeItem('spam_guard_user');
    setLoginStep(1);
    setUser({
      phoneNumber: '',
      country: 'India',
      language: 'en',
      isAuthenticated: false
    });
  };

  const translations: Record<string, any> = {
    en: { title: "SpamGuard AI", subtitle: "Detect spam using ML", placeholder: "Paste email content here...", btn: "Check Spam", loginTitle: "Login", phone: "Phone Number", country: "Country", loginBtn: "Start", nextBtn: "Next", langTitle: "Choose Mother Tongue", analyzing: "Analyzing...", spam: "🚫 Spam", ham: "✅ Safe", confidence: "Confidence", reason: "Reasoning", logout: "Logout", back: "Back" },
    hi: { title: "स्पैमगार्ड एआई", subtitle: "ML का उपयोग करके स्पैम खोजें", placeholder: "ईमेल सामग्री यहाँ पेस्ट करें...", btn: "स्पैम जांचें", loginTitle: "लॉगिन", phone: "फ़ोन नंबर", country: "देश", loginBtn: "शुरू करें", nextBtn: "आगे", langTitle: "मातृभाषा चुनें", analyzing: "विश्लेषण...", spam: "🚫 स्पैम", ham: "✅ सुरक्षित", confidence: "विश्वास", reason: "कारण", logout: "लॉगआउट", back: "पीछे" },
    bn: { title: "স্প্যামগার্ড এআই", subtitle: "ML ব্যবহার করে স্প্যাম শনাক্ত করুন", placeholder: "এখানে ইমেল বিষয়বস্তু পেস্ট করুন...", btn: "স্প্যাম চেক করুন", loginTitle: "লগইন", phone: "ফোন নম্বর", country: "দেশ", loginBtn: "শুরু করুন", nextBtn: "পরবর্তী", langTitle: "মাতৃভাষা নির্বাচন করুন", analyzing: "বিশ্লেষণ করা হচ্ছে...", spam: "🚫 স্প্যাম", ham: "✅ নিরাপদ", confidence: "নিশ্চয়তা", reason: "কারণ", logout: "লগআউট", back: "পিছনে" },
    ta: { title: "ஸ்பேம்கார்டு AI", subtitle: "ML பயன்படுத்தி ஸ்பேம் கண்டறியவும்", placeholder: "மின்னஞ்சல் உள்ளடக்கத்தை இங்கே ஒட்டவும்...", btn: "ஸ்பேம் சரிபார்க்கவும்", loginTitle: "உள்நுழைவு", phone: "தொலைபேசி எண்", country: "நாடு", loginBtn: "தொடங்கு", nextBtn: "அடுத்து", langTitle: "தாய்மொழியைத் தேர்ந்தெடுக்கவும்", analyzing: "ஆராய்கிறது...", spam: "🚫 ஸ்பேம்", ham: "✅ பாதுகாப்பானது", confidence: "நம்பிக்கை", reason: "காரணம்", logout: "வெளியேறு", back: "பின்னால்" },
    te: { title: "స్పామ్‌గార్డ్ AI", subtitle: "ML ఉపయోగించి స్పామ్‌ను గుర్తించండి", placeholder: "ఇక్కడ ఇమెయిల్ కంటెంట్‌ను అతికించండి...", btn: "స్పామ్ తనిఖీ చేయండి", loginTitle: "లాగిన్", phone: "ఫోన్ నంబర్", country: "దేశ", loginBtn: "ప్రారంభించండి", nextBtn: "తదుపరి", langTitle: "మాతృభాషను ఎంచుకోండి", analyzing: "విశ్లేషిస్తోంది...", spam: "🚫 స్పామ్", ham: "✅ సురక్షితం", confidence: "విశ్వాసం", reason: "కారణం", logout: "లాగ్ అవుట్", back: "వెనుకకు" },
    mr: { title: "स्पॅमगार्ड एआय", subtitle: "ML वापरून स्पॅम ओळखा", placeholder: "ईमेल मजकूर येथे पेस्ट करा...", btn: "स्पॅम तपासा", loginTitle: "लॉगिन", phone: "फोन नंबर", country: "देश", loginBtn: "सुरू करा", nextBtn: "पुढील", langTitle: "मातृभाषा निवडा", analyzing: "विश्लेषण करत आहे...", spam: "🚫 स्पॅम", ham: "✅ सुरक्षित", confidence: "विश्वासार्हता", reason: "कारण", logout: "लॉगआउट", back: "मागे" },
    gu: { title: "સ્પૅમગાર્ડ AI", subtitle: "ML નો ઉપયોગ કરીને સ્પામ શોધો", placeholder: "અહીં ઇમેઇલ સામગ્રી પેસ્ટ કરો...", btn: "સ્પામ તપાસો", loginTitle: "લોગિન", phone: "ફોન નંબર", country: "દેશ", loginBtn: "શરૂ કરો", nextBtn: "આગળ", langTitle: "માતૃભાષા પસંદ કરો", analyzing: "વિશ્લેષણ...", spam: "🚫 સ્પામ", ham: "✅ સુરક્ષિત", confidence: "વિશ્વાસ", reason: "કારણ", logout: "લોગઆઉટ", back: "પાછળ" },
    kn: { title: "ಸ್ಪ್ಯಾಮ್‌ಗಾರ್ಡ್ AI", subtitle: "ML ಬಳಸಿ ಸ್ಪ್ಯಾಮ್ ಪತ್ತೆಹಚ್ಚಿ", placeholder: "ಇಮೇಲ್ ವಿಷಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...", btn: "ಸ್ಪ್ಯಾಮ್ ಪರಿಶೀಲಿಸಿ", loginTitle: "ಲಾಗಿನ್", phone: "ಫೋನ್ ಸಂಖ್ಯೆ", country: "ದೇಶ", loginBtn: "ಪ್ರಾರಂಭಿಸಿ", nextBtn: "ಮುಂದೆ", langTitle: "ತಾಯ್ನುಡಿ ಆಯ್ಕೆಮಾಡಿ", analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...", spam: "🚫 ಸ್ಪ್ಯಾಮ್", ham: "✅ ಸುರಕ್ಷಿತ", confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ", reason: "ಕಾರಣ", logout: "ಲಾಗ್ ಔಟ್", back: "ಹಿಂದೆ" },
    ml: { title: "സ്പാംഗാർഡ് AI", subtitle: "ML ഉപയോഗിച്ച് സ്പാം കണ്ടെത്തുക", placeholder: "ഇമെയിൽ ഉള്ളടക്കം ഇവിടെ ഒട്ടിക്കുക...", btn: "സ്പാം പരിശോധിക്കുക", loginTitle: "ലോഗിൻ", phone: "ഫോൺ നമ്പർ", country: "രാജ്യം", loginBtn: "തുടങ്ങുക", nextBtn: "അടുത്തത്", langTitle: "മാതൃഭാഷ തിരഞ്ഞെടുക്കുക", analyzing: "വിശകലനം ചെയ്യുന്നു...", spam: "🚫 സ്പാം", ham: "✅ സുരക്ഷിതം", confidence: "ആത്മവിശ്വാസം", reason: "कारण", logout: "ലോഗ് ഔട്ട്", back: "പിന്നിലേക്ക്" },
    pa: { title: "ਸਪੈਮਗਾਰਡ AI", subtitle: "ML ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਪੈਮ ਲੱਭੋ", placeholder: "ਈਮੇਲ ਸਮੱਗਰੀ ਇੱਥੇ ਪੇਸਟ ਕਰੋ...", btn: "ਸਪੈਮ ਚੈੱਕ ਕਰੋ", loginTitle: "ਲੌਗਇਨ", phone: "ਫੋਨ ਨੰਬਰ", country: "ਦੇਸ਼", loginBtn: "ਸ਼ੁਰੂ ਕਰੋ", nextBtn: "ਅਗਲਾ", langTitle: "ਮਾਂ ਬੋਲੀ ਚੁਣੋ", analyzing: "ਵਿਸ਼ਲੇਸ਼ਣ...", spam: "🚫 ਸਪੈਮ", ham: "✅ ਸੁਰੱਖਿਅਤ", confidence: "ਭਰੋਸਾ", reason: "ਕਾਰਣ", logout: "ਲੌਗਆਉਟ", back: "ਪਿੱਛੇ" },
    es: { title: "SpamGuard AI", subtitle: "Detecta spam con ML", placeholder: "Pegue el contenido aquí...", btn: "Comprobar", loginTitle: "Acceso", phone: "Teléfono", country: "País", loginBtn: "Empezar", nextBtn: "Siguiente", langTitle: "Elegir lengua materna", analyzing: "Analizando...", spam: "🚫 Spam", ham: "✅ Seguro", confidence: "Confianza", reason: "Razón", logout: "Salir", back: "Atrás" },
    fr: { title: "SpamGuard AI", subtitle: "Détecter le spam avec ML", placeholder: "Collez le contenu ici...", btn: "Vérifier", loginTitle: "Connexion", phone: "Téléphone", country: "Pays", loginBtn: "Démarrer", nextBtn: "Suivant", langTitle: "Choisir la langue maternelle", analyzing: "Analyse...", spam: "🚫 Spam", ham: "✅ Sûr", confidence: "Confiance", reason: "Raison", logout: "Déconnexion", back: "Retour" },
    ar: { title: "SpamGuard AI", subtitle: "كشف البريد العشوائي باستخدام ML", placeholder: "الصق محتوى البريد هنا...", btn: "فحص", loginTitle: "تسجيل الدخول", phone: "رقم الهاتف", country: "الدولة", loginBtn: "ابدأ", nextBtn: "التالي", langTitle: "اختر اللغة الأم", analyzing: "جاري التحليل...", spam: "🚫 رسالة عشوائية", ham: "✅ آمن", confidence: "ثقة", reason: "السبب", logout: "تسجيل الخروج", back: "رجوع" },
    pt: { title: "SpamGuard AI", subtitle: "Detectar spam usando ML", placeholder: "Cole o conteúdo aqui...", btn: "Verificar", loginTitle: "Login", phone: "Telefone", country: "País", loginBtn: "Começar", nextBtn: "Próximo", langTitle: "Escolher língua materna", analyzing: "Analisando...", spam: "🚫 Spam", ham: "✅ Seguro", confidence: "Confiança", reason: "Razão", logout: "Sair", back: "Voltar" },
    de: { title: "SpamGuard AI", subtitle: "Spam mit ML erkennen", placeholder: "Inhalt hier einfügen...", btn: "Prüfen", loginTitle: "Anmelden", phone: "Telefon", country: "Land", loginBtn: "Start", nextBtn: "Weiter", langTitle: "Muttersprache wählen", analyzing: "Analysiere...", spam: "🚫 Spam", ham: "✅ Sicher", confidence: "Vertrauen", reason: "Grund", logout: "Abmelden", back: "Zurück" },
    it: { title: "SpamGuard AI", subtitle: "Rileva spam con ML", placeholder: "Incolla il contenuto qui...", btn: "Controlla", loginTitle: "Accedi", phone: "Telefono", country: "Paese", loginBtn: "Inizia", nextBtn: "Avanti", langTitle: "Scegli lingua madre", analyzing: "Analisi...", spam: "🚫 Spam", ham: "✅ Sicuro", confidence: "Fiducia", reason: "Motivo", logout: "Esci", back: "Indietro" },
    ja: { title: "SpamGuard AI", subtitle: "MLでスパムを検出", placeholder: "内容を貼り付け...", btn: "チェック", loginTitle: "ログイン", phone: "電話番号", country: "国", loginBtn: "開始", nextBtn: "次へ", langTitle: "母国語を選択", analyzing: "分析中...", spam: "🚫 スパム", ham: "✅ 安全", confidence: "信頼度", reason: "理由", logout: "ログアウト", back: "戻る" },
    zh: { title: "SpamGuard AI", subtitle: "使用机器学习检测垃圾邮件", placeholder: "在这里粘贴内容...", btn: "检查", loginTitle: "登录", phone: "电话", country: "国家", loginBtn: "开始", nextBtn: "下一步", langTitle: "选择母语", analyzing: "分析中...", spam: "🚫 垃圾邮件", ham: "✅ 安全", confidence: "置信度", reason: "原因", logout: "登出", back: "返回" },
  };

  const t = translations[user.language] || translations.en;

  if (!user.isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full border border-slate-200 relative">
          {loginStep === 2 && (
            <button 
              onClick={() => setLoginStep(1)}
              className="absolute top-8 left-8 flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t.back}
            </button>
          )}

          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              {loginStep === 1 ? t.loginTitle : t.langTitle}
            </h1>
          </div>

          {loginStep === 1 ? (
            <form onSubmit={handleStepOneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.country}</label>
                <select 
                  value={user.country}
                  onChange={(e) => setUser(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t.phone}</label>
                <input 
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={user.phoneNumber}
                  onChange={(e) => setUser(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md transition active:scale-95"
              >
                {t.nextBtn}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <LanguageSelector 
                currentLang={user.language} 
                onSelect={(l) => setUser(prev => ({ ...prev, language: l }))} 
                filterCodes={getLanguagesForCountry(user.country)}
              />
              <button 
                onClick={handleFinalLogin}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-md transition active:scale-95"
              >
                {t.loginBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-slate-50" dir={user.language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              SpamGuard AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-slate-500">
              {user.phoneNumber} | {user.country} | <b>{user.language.toUpperCase()}</b>
            </span>
            <button 
              onClick={logout}
              className="text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1 rounded-md"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600">
            {t.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
          <div className="p-8">
            <textarea 
              className="w-full min-h-[220px] p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-lg text-slate-800 placeholder:text-slate-400"
              placeholder={t.placeholder}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            />
            
            <button 
              onClick={handleDetection}
              disabled={isAnalyzing || !emailText.trim()}
              className={`w-full mt-6 py-5 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                isAnalyzing || !emailText.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200'
              }`}
            >
              {isAnalyzing ? (
                 <div className="flex items-center gap-3">
                   <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   {t.analyzing}
                 </div>
              ) : t.btn}
            </button>

            {result && (
              <div className={`mt-8 p-8 rounded-3xl border-2 transition-all animate-in zoom-in-95 duration-500 ${
                result.classification === DetectionResult.SPAM ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <h3 className={`text-4xl font-black ${
                    result.classification === DetectionResult.SPAM ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {result.classification === DetectionResult.SPAM ? t.spam : t.ham}
                  </h3>
                  <div className="px-5 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm text-blue-600 font-bold text-lg">
                    {Math.round(result.confidence * 100)}% {t.confidence}
                  </div>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl shadow-inner border border-white/50">
                  <h4 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-widest">{t.reason}</h4>
                  <p className="text-slate-800 text-lg leading-relaxed">
                    {result.reasoning}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <MLProcess />

        <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-10 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4 tracking-tight">
            Documentation (Abstract)
          </h2>
          <div className="space-y-10 text-start">
            <section>
              <h3 className="text-xl font-bold text-blue-600 mb-3">Goal</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Empowering users in {user.country} to identify spam messages instantly in their mother tongue ({user.language.toUpperCase()}).
              </p>
            </section>
            <section>
              <h3 className="text-xl font-bold text-blue-600 mb-3">AI Engine</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Powered by Gemini 3 Flash for high-accuracy reasoning and natural language generation across all supported dialects.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
