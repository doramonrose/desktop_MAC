import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { QuoteRequest, SiteSettings, QuoteStatus } from '../types';
import { Lock, X, Check, Phone, MessageCircle, Save, Trash2, Calendar, Users, Filter, Car, RefreshCw } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  quotes: QuoteRequest[];
  onUpdateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  onUpdateQuoteStatus: (id: string, status: QuoteStatus) => Promise<void>;
  onDeleteQuote: (id: string) => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  settings,
  quotes,
  onUpdateSettings,
  onUpdateQuoteStatus,
  onDeleteQuote
}) => {
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'quotes' | 'settings'>('quotes');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [settingsForm, setSettingsForm] = useState({
    phone: settings.phone,
    line_id: settings.line_id,
    line_url: settings.line_url,
    address_th: settings.address_th,
    address_en: settings.address_en
  });

  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '8888') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await onUpdateSettings(settingsForm);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const filteredQuotes = quotes.filter(q => {
    if (statusFilter === 'all') return true;
    return q.status === statusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        
        {/* Top Bar */}
        <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                MR Car Rent Admin Portal
              </h2>
              <p className="text-[11px] text-slate-400">
                {language === 'th' ? 'ระบบจัดการข้อมูลการติดต่อและรายการขอเช็กคิว' : 'Backoffice Management Dashboard'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!isAuthenticated ? (
            /* PIN Protection Screen */
            <div className="max-w-md mx-auto my-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'th' ? 'เข้าสู่ระบบผู้ดูแลระบบ' : 'Admin PIN Authentication'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'th' ? 'กรอกรหัส PIN (รหัสทดสอบ: 1234)' : 'Enter PIN code (Default test PIN: 1234)'}
              </p>

              <form onSubmit={handleLogin} className="space-y-3 pt-2">
                <input
                  type="password"
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="PIN Code"
                  className="w-full text-center text-lg tracking-widest px-4 py-3 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />

                {pinError && (
                  <p className="text-xs text-rose-600 font-bold">
                    {language === 'th' ? 'รหัส PIN ไม่ถูกต้อง (ลองใช้ 1234)' : 'Incorrect PIN (Try 1234)'}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md"
                >
                  {language === 'th' ? 'ยืนยันเข้าสู่ระบบ' : 'Login to Admin'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      activeTab === 'quotes'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {language === 'th' ? `รายการขอเช็กคิว (${quotes.length})` : `Quote Leads (${quotes.length})`}
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      activeTab === 'settings'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {language === 'th' ? 'ตั้งค่าการติดต่อ' : 'Site Contact Settings'}
                  </button>
                </div>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  {language === 'th' ? 'ออกจากระบบ' : 'Logout'}
                </button>
              </div>

              {/* Tab 1: Quotes / Leads List */}
              {activeTab === 'quotes' && (
                <div className="space-y-4">
                  
                  {/* Status Filters */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {['all', 'new', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                          statusFilter === st
                            ? 'bg-slate-900 text-amber-400'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st === 'all' && (language === 'th' ? 'ทั้งหมด' : 'All')}
                        {st === 'new' && (language === 'th' ? 'ใหม่ 🔴' : 'New 🔴')}
                        {st === 'contacted' && (language === 'th' ? 'ติดต่อแล้ว 🟡' : 'Contacted 🟡')}
                        {st === 'quoted' && (language === 'th' ? 'เสนอราคาแล้ว 🔵' : 'Quoted 🔵')}
                        {st === 'confirmed' && (language === 'th' ? 'ยืนยันคิวแล้ว 🟢' : 'Confirmed 🟢')}
                        {st === 'completed' && (language === 'th' ? 'เสร็จสิ้น 🟣' : 'Completed 🟣')}
                        {st === 'cancelled' && (language === 'th' ? 'ยกเลิก ⚪' : 'Cancelled ⚪')}
                      </button>
                    ))}
                  </div>

                  {filteredQuotes.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
                      {language === 'th' ? 'ยังไม่มีรายการขอเช็กคิวตามสถานะนี้' : 'No quote requests match this status.'}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredQuotes.map(q => (
                        <div
                          key={q.id}
                          className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-amber-400 transition-all flex flex-col sm:flex-row justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-slate-900">{q.customer_name}</span>
                              <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                                {q.vehicle_type}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                q.status === 'new' ? 'bg-rose-100 text-rose-800' :
                                q.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-800'
                              }`}>
                                {q.status}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-3 text-slate-600">
                              <span>📞 {q.phone}</span>
                              {q.line_id && <span>📲 LINE: {q.line_id}</span>}
                              <span>👥 {q.passengers} ท่าน</span>
                            </div>

                            <div className="text-slate-800 font-bold bg-white p-2 rounded-lg border border-slate-200">
                              📅 {q.travel_date} | 🏔️ {q.destination || 'จัดทริปอิสระ'}
                            </div>

                            {q.note && (
                              <p className="text-slate-500 italic">
                                Note: {q.note}
                              </p>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                            <select
                              value={q.status}
                              onChange={e => onUpdateQuoteStatus(q.id, e.target.value as QuoteStatus)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                            >
                              <option value="new">ใหม่ (New)</option>
                              <option value="contacted">ติดต่อแล้ว</option>
                              <option value="quoted">เสนอราคาแล้ว</option>
                              <option value="confirmed">ยืนยันคิวแล้ว</option>
                              <option value="completed">เสร็จสิ้น</option>
                              <option value="cancelled">ยกเลิก</option>
                            </select>

                            <button
                              onClick={() => onDeleteQuote(q.id)}
                              className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 text-[11px]"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>ลบข้อมูล</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* Tab 2: Settings Form */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
                  {saveSuccess && (
                    <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>{language === 'th' ? 'บันทึกข้อมูลเรียบร้อยแล้ว!' : 'Settings updated successfully!'}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'th' ? 'เบอร์โทรศัพท์ติดต่อ' : 'Contact Phone'}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={e => setSettingsForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      LINE ID
                    </label>
                    <input
                      type="text"
                      value={settingsForm.line_id}
                      onChange={e => setSettingsForm(p => ({ ...p, line_id: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      LINE Official URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.line_url}
                      onChange={e => setSettingsForm(p => ({ ...p, line_url: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'th' ? 'ที่อยู่บริษัท (ภาษาไทย)' : 'Address (TH)'}
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address_th}
                      onChange={e => setSettingsForm(p => ({ ...p, address_th: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingSettings ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}</span>
                  </button>
                </form>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
