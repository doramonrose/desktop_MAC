(() => {
  'use strict';

  const config = window.CMPP_CONFIG || {};

  const track = (eventName, params = {}) => {
    const clean = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        clean[key] = params[key];
      }
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...clean });
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, clean);
    }
  };

  const analyticsParams = (el) => ({
    button_position: el.getAttribute('data-button-position') || undefined,
    vehicle_type: el.getAttribute('data-vehicle-type') || undefined,
    destination: el.getAttribute('data-destination') || undefined,
    service_type: el.getAttribute('data-service-type') || undefined,
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-analytics]');
    if (!el) return;
    const eventName = el.getAttribute('data-analytics');
    if (!eventName) return;
    track(eventName, analyticsParams(el));
  });

  document.querySelectorAll('[data-prefill-destination]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dest = btn.getAttribute('data-prefill-destination');
      const input = document.getElementById('destination');
      if (dest && input) input.value = dest;
      const trip = document.getElementById('trip_type');
      if (trip && !trip.value) trip.value = 'เที่ยวเชียงใหม่';
    });
  });

  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-compact', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');

  const setDrawer = (open) => {
    if (!drawer || !backdrop || !openBtn) return;
    drawer.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      drawer.hidden = false;
      backdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn && closeBtn.focus();
    } else {
      document.body.style.overflow = '';
      window.setTimeout(() => {
        if (!drawer.classList.contains('is-open')) {
          drawer.hidden = true;
          backdrop.hidden = true;
        }
      }, 200);
      openBtn.focus();
    }
  };

  openBtn && openBtn.addEventListener('click', () => setDrawer(true));
  closeBtn && closeBtn.addEventListener('click', () => setDrawer(false));
  backdrop && backdrop.addEventListener('click', () => setDrawer(false));
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setDrawer(false);
  });

  const form = document.getElementById('quote-form');
  const statusEl = document.getElementById('quote-status');
  const lineBtn = document.getElementById('quote-line-btn');

  const buildMessage = (data) =>
    [
      'สวัสดีครับ/ค่ะ สนใจเช็กคิวรถพร้อมคนขับจากเชียงใหม่พาไป',
      '',
      `วันที่เดินทาง: ${data.travel_date || '-'}`,
      `จุดรับ: ${data.pickup || '-'}`,
      `จุดหมาย: ${data.destination || '-'}`,
      `จำนวนผู้โดยสาร: ${data.passengers || '-'}`,
      `จำนวนกระเป๋า: ${data.luggage || '-'}`,
      `ประเภทรถ: ${data.vehicle_type || '-'}`,
      `รูปแบบการเดินทาง: ${data.trip_type || '-'}`,
      '',
      'รบกวนตรวจสอบคิวและแจ้งราคาให้ด้วยครับ/ค่ะ',
    ].join('\n');

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = Object.fromEntries(new FormData(form).entries());
      const message = buildMessage(data);

      try {
        await copyText(message);
        track('copy_quote', {
          button_position: 'quick_quote',
          vehicle_type: data.vehicle_type || '',
          destination: data.destination || '',
          service_type: data.trip_type || '',
        });

        if (statusEl) {
          statusEl.classList.remove('hidden');
          if (config.lineReady && config.lineUrl) {
            statusEl.textContent = 'คัดลอกรายละเอียดแล้ว สามารถเปิด LINE OA เพื่อวางข้อความได้เลย';
            if (lineBtn) lineBtn.classList.remove('hidden');
          } else {
            statusEl.textContent =
              'คัดลอกรายละเอียดแล้ว สามารถโทรสอบถามได้ที่ ' +
              (config.phoneDisplay || '065-645-5104');
          }
        }
      } catch (err) {
        if (statusEl) {
          statusEl.classList.remove('hidden');
          statusEl.textContent =
            'ไม่สามารถคัดลอกอัตโนมัติได้ กรุณาคัดลอกข้อความด้วยตนเอง หรือโทรสอบถามโดยตรง';
        }
      }
    });
  }

  const paymentDetails = document.getElementById('payment-details');
  if (paymentDetails) {
    paymentDetails.addEventListener('toggle', () => {
      if (paymentDetails.open) track('view_payment', { button_position: 'payment' });
    });
  }

  const copyBankBtn = document.getElementById('copy-bank-btn');
  const copyBankStatus = document.getElementById('copy-bank-status');
  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', async () => {
      const value = copyBankBtn.getAttribute('data-copy') || '';
      try {
        await copyText(value);
        track('copy_bank_account', { button_position: 'payment' });
        if (copyBankStatus) {
          copyBankStatus.classList.remove('hidden');
          copyBankStatus.textContent = 'คัดลอกเลขบัญชีแล้ว';
        }
      } catch (err) {
        if (copyBankStatus) {
          copyBankStatus.classList.remove('hidden');
          copyBankStatus.textContent = 'คัดลอกไม่สำเร็จ กรุณาคัดลอกด้วยตนเอง';
        }
      }
    });
  }
})();
