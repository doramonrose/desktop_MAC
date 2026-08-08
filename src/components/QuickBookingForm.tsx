import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, MapPin, Users, Briefcase, Car, User, Phone, MessageCircle, AlertCircle, CheckCircle, Send, Sparkles } from 'lucide-react';
import { VehicleCategory, TripType, SiteSettings } from '../types';

interface QuickBookingFormProps {
  settings: SiteSettings;
  presetVehicleType?: VehicleCategory;
  presetDestination?: string;
  presetPackageId?: string;
  onSuccessSubmitted?: (quoteCode: string) => void;
}

export const QuickBookingForm: React.FC<QuickBookingFormProps> = ({
  settings,
  presetVehicleType,
  presetDestination,
  presetPackageId,
  onSuccessSubmitted
}) => {
  const { language, t } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    travel_date: '',
    travel_time: '08:00',
    pickup_location: '',
    destination: presetDestination || '',
    trip_type: 'day_trip_chiangmai' as TripType,
    passengers: 2,
    luggage: 2,
    vehicle_type: presetVehicleType || ('recommend' as VehicleCategory),
    customer_name: '',
    phone: '',
    line_id: '',
    email: '',
    note: '',
    consent: true,
    website_hp: '', // Honeypot
  });

  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    landing_page: '',
    referrer: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successResult, setSuccessResult] = useState<{
    quote_code: string;
    line_summary_text: string;
    line_direct_url: string;
  } | null>(null);

  // Set default tomorrow date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().slice(0, 10);
    setFormData(prev => ({ ...prev, travel_date: dateStr }));

    // Extract UTM parameters
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      landing_page: window.location.pathname,
      referrer: document.referrer || '',
    });
  }, []);

  useEffect(() => {
    if (presetVehicleType) {
      setFormData(prev => ({ ...prev, vehicle_type: presetVehicleType }));
    }
    if (presetDestination) {
      setFormData(prev => ({ ...prev, destination: presetDestination }));
    }
  }, [presetVehicleType, presetDestination]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!formData.customer_name.trim()) {
      setErrorMsg(language === 'th' ? 'กรุณากรอกชื่อผู้ติดต่อ' : 'Please enter your contact name');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMsg(language === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์' : 'Please enter your phone number');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
      setErrorMsg(language === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)' : 'Please enter a valid phone number');
      return;
    }

    if (!formData.travel_date) {
      setErrorMsg(language === 'th' ? 'กรุณาเลือกวันที่เดินทาง' : 'Please select travel date');
      return;
    }

    if (!formData.pickup_location.trim()) {
      setErrorMsg(language === 'th' ? 'กรุณากรอกจุดรับ' : 'Please enter pickup location');
      return;
    }

    if (!formData.destination.trim()) {
      setErrorMsg(language === 'th' ? 'กรุณากรอกจุดหมายปลายทาง' : 'Please enter destination');
      return;
    }

    if (!formData.consent) {
      setErrorMsg(language === 'th' ? 'กรุณายินยอมนโยบายความเป็นส่วนตัวเพื่อดำเนินการต่อ' : 'Please accept privacy policy');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          package_id: presetPackageId,
          language,
          ...utmParams
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      setSuccessResult({
        quote_code: data.quote_code,
        line_summary_text: data.line_summary_text,
        line_direct_url: data.line_direct_url
      });

      if (onSuccessSubmitted) {
        onSuccessSubmitted(data.quote_code);
      }

    } catch (err: any) {
      setErrorMsg(err.message || (language === 'th' ? 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง' : 'Failed to send request. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quick-booking" className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-8">
        
        {/* Form Title Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'th' ? 'บริการเช็กคิวด่วน สรุปราคาใน 5 นาที' : 'Fast 5-Min Quote Response'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('form.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {t('form.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{language === 'th' ? 'ไม่จำเป็นต้องชำระเงินทันทีในขั้นตอนเช็กคิว' : 'No instant payment required'}</span>
          </div>
        </div>

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="font-semibold">{errorMsg}</div>
          </div>
        )}

        {/* Success Screen */}
        {successResult ? (
          <div id="quote-success-panel" className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {t('form.success_title')}
              </h3>
              <p className="text-slate-700 text-sm mt-1">
                {t('form.success_msg')}{' '}
                <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 text-base">
                  {successResult.quote_code}
                </span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-lg mx-auto text-left text-xs font-mono text-slate-700 whitespace-pre-line shadow-xs">
              {successResult.line_summary_text}
            </div>

            <p className="text-xs text-slate-500">
              {language === 'th'
                ? 'กดปุ่มด้านล่างเพื่อเปิด LINE และส่งรายละเอียดข้อความที่กรอกไว้ไปยังเจ้าหน้าที่ได้ทันที'
                : 'Click below to open LINE with your pre-filled inquiry details:'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                id="success-open-line-btn"
                href={successResult.line_direct_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('form.open_line')}</span>
              </a>

              <button
                onClick={() => setSuccessResult(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                {language === 'th' ? 'ส่งคำขอราคาอีกครั้ง' : 'Submit Another Request'}
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form id="quote-request-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Honeypot Field */}
            <input
              type="text"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Row 1: Trip Type & Vehicle Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>{t('form.trip_type')} *</span>
                </label>
                <select
                  name="trip_type"
                  value={formData.trip_type}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                >
                  <option value="day_trip_chiangmai">{language === 'th' ? 'เหมารถเที่ยวเชียงใหม่ (รายวัน)' : 'Chiang Mai Sightseeing Day Trip'}</option>
                  <option value="airport_transfer">{language === 'th' ? 'รับ-ส่ง สนามบินเชียงใหม่' : 'Chiang Mai Airport Transfer'}</option>
                  <option value="inter_province">{language === 'th' ? 'เหมารถเดินทางต่างจังหวัด (เชียงราย/ปาย/อื่นๆ)' : 'Inter-Province Trip (Chiang Rai/Pai/etc)'}</option>
                  <option value="one_way">{language === 'th' ? 'เดินทางเที่ยวเดียว (One-Way)' : 'One-Way Transfer'}</option>
                  <option value="round_trip">{language === 'th' ? 'เดินทางไป-กลับ (Round-Trip)' : 'Round-Trip'}</option>
                  <option value="multi_day">{language === 'th' ? 'เดินทางหลายวัน (Multi-Day)' : 'Multi-Day Tour'}</option>
                  <option value="other">{language === 'th' ? 'อื่นๆ (โปรดระบุในหมายเหตุ)' : 'Other (Specify in note)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>{t('form.vehicle_type')} *</span>
                </label>
                <select
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                >
                  <option value="recommend">{language === 'th' ? '✨ ให้ทางร้านแนะนำตามจำนวนคน' : '✨ Recommend suitable option'}</option>
                  <option value="sedan">{language === 'th' ? '🚗 รถเก๋ง All-New (1-4 คน)' : '🚗 All-New Sedan (1-4 Passengers)'}</option>
                  <option value="suv">{language === 'th' ? '🚙 รถ SUV All-New Fortuner (1-6 คน)' : '🚙 All-New SUV Fortuner (1-6 Passengers)'}</option>
                  <option value="van">{language === 'th' ? '🚐 รถตู้ All-New Commuter VIP (1-10 คน)' : '🚐 All-New Commuter VIP Van (1-10 Passengers)'}</option>
                  <option value="majestic">{language === 'th' ? '🚐 รถตู้ All-New Majestic VIP 9 ที่นั่ง (1-9 คน)' : '🚐 Toyota Majestic VIP Van (1-9 Passengers)'}</option>
                  <option value="alphard">{language === 'th' ? '👑 รถตู้พรีเมียม Alphard / Vellfire VIP (1-5 คน)' : '👑 Toyota Alphard VIP Minivan (1-5 Passengers)'}</option>
                </select>
              </div>
            </div>

            {/* Row 2: Travel Date, Time, Passengers & Luggage */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>{t('form.travel_date')} *</span>
                </label>
                <input
                  type="date"
                  name="travel_date"
                  value={formData.travel_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{t('form.travel_time')}</span>
                </label>
                <input
                  type="time"
                  name="travel_time"
                  value={formData.travel_time}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{t('form.passengers')}</span>
                </label>
                <input
                  type="number"
                  name="passengers"
                  min="1"
                  max="30"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <span>{t('form.luggage')}</span>
                </label>
                <input
                  type="number"
                  name="luggage"
                  min="0"
                  max="30"
                  value={formData.luggage}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Row 3: Pickup Location & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{t('form.pickup')} *</span>
                </label>
                <input
                  type="text"
                  name="pickup_location"
                  placeholder={language === 'th' ? 'เช่น สนามบินเชียงใหม่ / โรงแรมในตัวเมือง' : 'e.g., CNX Airport / Downtown Hotel'}
                  value={formData.pickup_location}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{t('form.destination')} *</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  placeholder={language === 'th' ? 'เช่น แม่กำปอง / ดอยอินทนนท์ / ม่อนแจ่ม / ปาย' : 'e.g., Mae Kampong / Doi Inthanon / Pai'}
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Row 4: Contact Info (Name, Phone, LINE ID) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{t('form.name')} *</span>
                </label>
                <input
                  type="text"
                  name="customer_name"
                  placeholder={language === 'th' ? 'ชื่อ-นามสกุล หรือชื่อเรียก' : 'Full Name'}
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>{t('form.phone')} *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="08X-XXX-XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                  <span>{t('form.line_id')}</span>
                </label>
                <input
                  type="text"
                  name="line_id"
                  placeholder={language === 'th' ? 'LINE ID หรือ WhatsApp' : 'LINE ID or WhatsApp'}
                  value={formData.line_id}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Note & PDPA Consent */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                {t('form.note')}
              </label>
              <textarea
                name="note"
                rows={2}
                placeholder={language === 'th' ? 'รายละเอียดเพิ่มเติม เช่น ต้องการคาร์ซีตเด็ก, มีผู้สูงอายุเดินทางด้วย, ต้องการใบเสร็จ ฯลฯ' : 'Special requests e.g. child car seat, elderly passengers, receipt needed'}
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="pdpa-consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="pdpa-consent" className="text-xs text-slate-600 leading-tight cursor-pointer">
                {language === 'th'
                  ? 'ข้าพเจ้ายินยอมให้ MR Car Rent Chiang Mai ใช้ข้อมูลดังกล่าวเพื่อติดต่อกลับและจัดทำข้อเสนอการเดินทาง ตามนโยบายความเป็นส่วนตัว'
                  : 'I consent to MR Car Rent Chiang Mai storing and using my info to provide trip quotes according to the privacy policy.'}
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="submit-booking-quote-btn"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 font-black text-base shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <span>{language === 'th' ? 'กำลังส่งข้อมูล...' : 'Sending Request...'}</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{t('form.submit')}</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
