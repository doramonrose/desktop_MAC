(() => {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  const track = (event, params = {}) => dataLayer.push({ event, ...params });
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }
  document.addEventListener('click', e => {
    const phone = e.target.closest('a[href^="tel:"]');
    const line = e.target.closest('[data-line]');
    const vehicle = e.target.closest('[data-vehicle]');
    const tour = e.target.closest('[data-tour]');
    if (phone) track('click_phone', { link_url: phone.href, page_path: location.pathname });
    if (line) track('click_line', { link_url: line.href, page_path: location.pathname, placement: line.dataset.placement || 'content' });
    if (vehicle) track('view_vehicle', { vehicle_name: vehicle.dataset.vehicle, page_path: location.pathname });
    if (tour) track('view_tour', { tour_name: tour.dataset.tour, page_path: location.pathname });
  });
  const form = document.querySelector('#quote-form');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const f = new FormData(form);
      const message = [
        'สวัสดีค่ะ ต้องการสอบถามรถพร้อมคนขับ',
        `วันที่ ${f.get('pickup_date') || '…'} เวลา ${f.get('pickup_time') || '…'}`,
        `จำนวน ${f.get('passengers') || '…'} ท่าน กระเป๋า ${f.get('luggage') || '…'} ใบ`,
        `รับที่ ${f.get('pickup') || '…'}`,
        `ส่งที่ ${f.get('dropoff') || '…'}`,
        `เส้นทาง/สถานที่ ${f.get('route') || '…'}`,
        `ประเภทรถ ${f.get('vehicle') || 'ให้ทีมงานแนะนำ'} จำนวน ${f.get('days') || '1'} วัน`,
        `ชื่อ ${f.get('name') || '…'} ติดต่อ ${f.get('contact') || '…'}`
      ].join('\n');
      const url = `https://line.me/R/oaMessage/%40carrent-chiangmai/?${encodeURIComponent(message)}`;
      track('quote_submit', { form_name: 'line_quote', vehicle_type: f.get('vehicle'), page_path: location.pathname });
      status.textContent = 'กำลังเปิด LINE กรุณาตรวจข้อความแล้วกดส่งให้ทีมงาน';
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        navigator.clipboard?.writeText(message);
        status.textContent = 'เบราว์เซอร์ปิดกั้นหน้าต่างใหม่ เราคัดลอกข้อความแล้ว กรุณาเปิด LINE และวางข้อความ';
      }
    });
  }
})();
