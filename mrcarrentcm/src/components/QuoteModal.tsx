import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { QuoteRequest, SiteSettings } from '../types';
import { X, CheckCircle, MessageCircle, Send, Users, ShieldCheck } from 'lucide-react';

export interface QuoteSubmitResult {
  quote: QuoteRequest;
  line_summary_text: string;
  line_direct_url: string;
}

interface QuoteModalProps {
  settings: SiteSettings;
  onSubmitQuote: (formData: QuoteFormPayload) => Promise<QuoteSubmitResult>;
}

export interface QuoteFormPayload {
  customer_name: string;
  customer_phone: string;
  customer_line_id: string;
  vehicle_type: string;
  travel_type: string;
  start_date: string;
  end_date: string;
  passengers: number;
  pickup_location: string;
  destination: string;
  special_notes: string;
  vehicle_id?: string;
  package_id?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ settings, onSubmitQuote }) => {
  const { language } = useLanguage();
  const { isOpen, prefill, preset, closeQuoteModal } = useQuoteModal();
  const activePrefill = prefill || preset || {};

  const [formData, setFormData] = useState<QuoteFormPayload>({
    customer_name: '',
    customer_phone: '',
    customer_line_id: '',
    vehicle_type: (activePrefill.vehicle_type as string) || 'van_10',
    travel_type: activePrefill.travel_type || 'full_day',
    start_date: activePrefill.start_date || '',
    end_date: activePrefill.end_date || '',
    passengers: activePrefill.passengers || 2,
    pickup_location: activePrefill.pickup_location || '',
    destination: activePrefill.destination || '',
    special_notes: '',
    vehicle_id: activePrefill.vehicle_id,
    package_id: activePrefill.package_id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successResult, setSuccessResult] = useState<QuoteSubmitResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        vehicle_type: (activePrefill.vehicle_type as string) || prev.vehicle_type,
        travel_type: activePrefill.travel_type || prev.travel_type,
        destination: activePrefill.destination || prev.destination,
        start_date: activePrefill.start_date || prev.start_date,
        end_date: activePrefill.end_date || prev.end_date,
        passengers: activePrefill.passengers || prev.passengers,
        pickup_location: activePrefill.pickup_location || prev.pickup_location,
        vehicle_id: activePrefill.vehicle_id || prev.vehicle_id,
        package_id: activePrefill.package_id || prev.package_id,
      }));
      setSuccessResult(null);
      setSubmitError('');
    }
  }, [isOpen, activePrefill]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.customer_name || !formData.customer_phone || !formData.start_date) {
      setSubmitError(
        language === 'th'
          ? 'กรุณากรอกชื่อ เบอร์โทรศัพท์ และวันที่เริ่มเดินทาง'
          : 'Please fill in Name, Phone number, and Start date.'
      );
      return;
    }

    if (!formData.pickup_location.trim() || !formData.destination.trim()) {
      setSubmitError(
        language === 'th'
          ? 'กรุณากรอกจุดรับและจุดหมาย'
          : 'Please enter pickup location and destination.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await onSubmitQuote(formData);
      setSuccessResult(created);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';
      setSubmitError(
        message ||
          (language === 'th'
            ? 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง'
            : 'Failed to send request. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenLine = () => {
    if (!successResult) return;
    if (successResult.line_direct_url) {
      window.open(successResult.line_direct_url, '_blank');
      return;
    }
    const encoded = encodeURIComponent(successResult.line_summary_text);
    window.open(`${settings.line_url}?text=${encoded}`, '_blank');
  };

  const quote = successResult?.quote;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-5 sm:p-6 flex items-start justify-between relative">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 inline-block mb-1">
              {language === 'th' ? 'เช็กคิวรถฟรี • ตอบไว' : 'Free Instant Quote Check'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'th' ? 'แบบฟอร์มเช็กคิวและขอราคาประเมิน' : 'Check Car Availability & Instant Quote'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'th'
                ? 'กรอกข้อมูลสั้นๆ ไม่ต้องชำระเงินทันที เจ้าหน้าที่จะสรุปราคาทาง LINE ภายใน 5 นาที'
                : 'Fill details below with zero upfront deposit pressure. Fast response via LINE.'}
            </p>
          </div>

          <button
            id="quote-modal-close-btn"
            onClick={closeQuoteModal}
            aria-label="Close quote modal"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {quote ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {language === 'th' ? 'ส่งข้อมูลเช็กคิวเรียบร้อยแล้ว!' : 'Request Sent Successfully!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                  {language === 'th'
                    ? `หมายเลขคำขอ ${quote.quote_code} ถูกบันทึกแล้ว กดปุ่มด้านล่างเพื่อทัก LINE รับราคาและล็อคคิว`
                    : `Request ${quote.quote_code} is logged. Click below to message our team on LINE.`}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">{language === 'th' ? 'หมายเลขคำขอ:' : 'Quote Code:'}</span>
                  <span className="font-extrabold text-amber-800">{quote.quote_code}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">{language === 'th' ? 'ชื่อผู้ติดต่อ:' : 'Name:'}</span>
                  <span className="font-extrabold text-slate-900">{quote.customer_name} ({quote.phone})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">{language === 'th' ? 'วันที่:' : 'Date:'}</span>
                  <span className="font-extrabold text-amber-800">{quote.travel_date} {quote.travel_time}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">{language === 'th' ? 'ประเภทรถ:' : 'Vehicle:'}</span>
                  <span className="font-extrabold text-slate-900 uppercase">{quote.vehicle_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">{language === 'th' ? 'จุดหมาย:' : 'Destination:'}</span>
                  <span className="font-extrabold text-slate-900">{quote.destination || 'จัดทริปอิสระ'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  id="quote-modal-line-direct-btn"
                  onClick={handleOpenLine}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{language === 'th' ? 'ทัก LINE เพื่อรับราคาและล็อคคิว' : 'Open LINE Chat Now'}</span>
                </button>

                <button
                  id="quote-modal-finish-btn"
                  onClick={closeQuoteModal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                >
                  {language === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  {language === 'th' ? '1. เลือกประเภทรถที่ต้องการ' : '1. Select Vehicle Type'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    { id: 'sedan', label_th: 'รถเก๋ง All-New (4 ที่นั่ง)', label_en: 'All-New Sedan (4 Seats)', desc_th: '1-3 ท่าน • Yaris Ativ / Altis', desc_en: '1-3 pax' },
                    { id: 'suv', label_th: 'รถ SUV All-New (7 ที่นั่ง)', label_en: 'All-New SUV (7 Seats)', desc_th: '1-5 ท่าน • Fortuner Leader', desc_en: '1-5 pax' },
                    { id: 'van_10', label_th: 'รถตู้ All-New VIP (10 ที่นั่ง)', label_en: 'All-New VIP Van (10 Seats)', desc_th: '1-10 ท่าน • Commuter VIP', desc_en: '1-10 pax' },
                    { id: 'majestic', label_th: 'รถตู้ Majestic VIP (9 ที่นั่ง)', label_en: 'Toyota Majestic VIP (9 Seats)', desc_th: '1-9 ท่าน • เก้าอี้กัปตันไฟฟ้า', desc_en: '1-9 pax • Captain Seats' },
                    { id: 'alphard', label_th: 'รถตู้ Alphard VIP (4-5 ที่นั่ง)', label_en: 'Toyota Alphard VIP (4-5 Seats)', desc_th: '1-5 ท่าน • First Class VIP', desc_en: '1-5 pax • First Class' },
                  ].map(item => (
                    <div
                      key={item.id}
                      onClick={() => setFormData(p => ({ ...p, vehicle_type: item.id }))}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.vehicle_type === item.id
                          ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">
                          {language === 'th' ? item.label_th : item.label_en}
                        </span>
                        <input
                          type="radio"
                          name="vehicle_type"
                          value={item.id}
                          checked={formData.vehicle_type === item.id}
                          onChange={() => {}}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {language === 'th' ? item.desc_th : item.desc_en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    {language === 'th' ? 'รูปการใช้งาน' : 'Rental Purpose'}
                  </label>
                  <select
                    value={formData.travel_type}
                    onChange={e => setFormData(p => ({ ...p, travel_type: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="full_day">{language === 'th' ? 'เหมาเที่ยวเต็มวัน (10 ชม.)' : 'Full Day Tour (10 hrs)'}</option>
                    <option value="half_day">{language === 'th' ? 'เหมาเที่ยวครึ่งวัน (5 ชม.)' : 'Half Day Tour (5 hrs)'}</option>
                    <option value="airport_transfer">{language === 'th' ? 'รับส่งสนามบินเชียงใหม่ (CNX)' : 'Airport Transfer'}</option>
                    <option value="inter_province">{language === 'th' ? 'เดินทางต่างจังหวัด (ปาย/เชียงราย)' : 'Inter-Province Trip'}</option>
                    <option value="multi_day">{language === 'th' ? 'เหมาเที่ยวหลายวัน' : 'Multi-Day Rental'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    {language === 'th' ? 'จำนวนผู้โดยสาร' : 'Passengers Count'}
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={formData.passengers}
                      onChange={e => setFormData(p => ({ ...p, passengers: parseInt(e.target.value) || 1 }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    {language === 'th' ? 'วันที่เริ่มเดินทาง *' : 'Start Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={e => setFormData(p => ({ ...p, start_date: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    {language === 'th' ? 'วันเดินทางกลับ (ถ้ามี)' : 'End Date (Optional)'}
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={e => setFormData(p => ({ ...p, end_date: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    {language === 'th' ? 'จุดรับ (โรงแรม / สนามบิน) *' : 'Pickup Point *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'th' ? 'เช่น สนามบินเชียงใหม่ / โรงแรมในเมือง' : 'e.g., Chiang Mai Airport / Hotel'}
                    value={formData.pickup_location}
                    onChange={e => setFormData(p => ({ ...p, pickup_location: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    {language === 'th' ? 'จุดหมาย / สถานที่ที่ต้องการไป *' : 'Destination / Route *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'th' ? 'เช่น ดอยอินทนนท์, แม่กำปอง, ม่อนแจ่ม' : 'e.g., Doi Inthanon, Mae Kampong'}
                    value={formData.destination}
                    onChange={e => setFormData(p => ({ ...p, destination: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                  {language === 'th' ? '2. ช่องทางรับการเสนอราคา' : '2. Contact Information'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'th' ? 'ชื่อผู้ติดต่อ *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'th' ? 'เช่น คุณสมชาย' : 'e.g. John Doe'}
                      value={formData.customer_name}
                      onChange={e => setFormData(p => ({ ...p, customer_name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'th' ? 'เบอร์โทรศัพท์ *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="081-234-5678"
                      value={formData.customer_phone}
                      onChange={e => setFormData(p => ({ ...p, customer_phone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'th' ? 'LINE ID (ถ้ามี)' : 'LINE ID (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder="Line ID"
                      value={formData.customer_line_id}
                      onChange={e => setFormData(p => ({ ...p, customer_line_id: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'th' ? 'หมายเหตุเพิ่มเติม (คาร์ซีท / กระเป๋าใหญ่ / อื่นๆ)' : 'Special Requests / Notes'}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'th' ? 'เช่น มีผู้สูงอายุ, ต้องการคาร์ซีทเด็ก, มีกระเป๋าใบใหญ่ 4 ใบ' : 'Special requests or flight numbers'}
                  value={formData.special_notes}
                  onChange={e => setFormData(p => ({ ...p, special_notes: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              {submitError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                  {submitError}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {isSubmitting
                      ? (language === 'th' ? 'กำลังส่งข้อมูล...' : 'Submitting...')
                      : (language === 'th' ? 'ส่งเช็กคิวและขอราคาฟรี' : 'Check Car Availability & Get Rate')}
                  </span>
                </button>

                <p className="text-[11px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'th' ? 'รับประกันคิวรถแน่นอน • ไม่มีค่าธรรมเนียมซ่อนเร้น' : '100% Guaranteed Fleet Availability'}</span>
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
