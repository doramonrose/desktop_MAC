import React from 'react';
import { SiteSettings } from '../types';

interface LineQrBlockProps {
  settings: SiteSettings;
  language: 'th' | 'en';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'light' | 'dark';
}

const sizeMap = {
  sm: 'w-28 h-28',
  md: 'w-36 h-36',
  lg: 'w-44 h-44',
};

export const LineQrBlock: React.FC<LineQrBlockProps> = ({
  settings,
  language,
  size = 'md',
  className = '',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <a
      href={settings.line_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex flex-col items-center gap-2 group ${className}`}
      aria-label={`LINE ${settings.line_id}`}
    >
      <div
        className={`rounded-2xl p-2 shadow-md transition-transform group-hover:scale-[1.02] ${
          isDark ? 'bg-white' : 'bg-white border border-emerald-200'
        }`}
      >
        <img
          src="/images/line-qr.png"
          alt={`LINE QR Code ${settings.line_id}`}
          width={176}
          height={176}
          className={`${sizeMap[size]} object-contain`}
          decoding="async"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <p className={`text-xs font-extrabold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          {language === 'th' ? 'สแกนเพิ่มเพื่อน LINE' : 'Scan to add on LINE'}
        </p>
        <p className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {settings.line_id}
        </p>
      </div>
    </a>
  );
};
