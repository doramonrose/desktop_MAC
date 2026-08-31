(() => {
  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  const track = (event, payload = {}) => {
    const safe = { event, ...payload };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(safe);
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }
  };

  document.addEventListener("click", (event) => {
    const quotePrefill = event.target.closest("[data-quote-destination]");
    if (quotePrefill) {
      const dest = document.getElementById("destination");
      const tripType = document.getElementById("trip_type");
      const destValue = quotePrefill.getAttribute("data-quote-destination") || "";
      const tripValue = quotePrefill.getAttribute("data-quote-trip") || "";
      if (dest && destValue) dest.value = destValue;
      if (tripType && tripValue) tripType.value = tripValue;
    }

    const target = event.target.closest("[data-analytics]");
    if (!target) return;
    const name = target.getAttribute("data-analytics");
    if (!name) return;
    const payload = {};
    ["button-position", "vehicle", "route", "price-item"].forEach((key) => {
      const value = target.getAttribute(`data-${key}`);
      if (value) payload[key.replace("-", "_")] = value;
    });
    track(name, payload);
  });

  const menuToggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("drawer-backdrop");

  const setDrawer = (open) => {
    if (!drawer || !backdrop || !menuToggle) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    backdrop.hidden = !open;
  };

  menuToggle?.addEventListener("click", () => {
    setDrawer(!drawer.classList.contains("is-open"));
  });
  backdrop?.addEventListener("click", () => setDrawer(false));
  drawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setDrawer(false));
  });

  const dateInput = document.getElementById("travel_date");
  if (dateInput) {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    dateInput.min = iso;
  }

  const quoteForm = document.getElementById("quote-form");
  quoteForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fields = ["travel_date", "pickup", "destination", "passengers", "luggage", "vehicle_type", "trip_type"];
    const data = {};
    for (const id of fields) {
      const el = document.getElementById(id);
      data[id] = el ? String(el.value).trim() : "";
    }
    if (!data.travel_date || !data.pickup || !data.destination || !data.passengers || !data.vehicle_type || !data.trip_type) {
      const status = document.getElementById("quote-status");
      status?.classList.remove("hidden");
      if (status) status.textContent = "กรุณากรอกวันที่ จุดรับ ปลายทาง จำนวนคน ประเภทรถ และรูปแบบทริป";
      return;
    }

    const message = [
      "สวัสดีครับ/ค่ะ สนใจใช้บริการเชียงใหม่พาไป",
      `วันที่เดินทาง: ${data.travel_date}`,
      `จุดรับ: ${data.pickup}`,
      `ปลายทาง: ${data.destination}`,
      `จำนวนผู้โดยสาร: ${data.passengers}`,
      `จำนวนกระเป๋า: ${data.luggage || "-"}`,
      `ประเภทรถ: ${data.vehicle_type}`,
      `รูปแบบทริป: ${data.trip_type}`,
      "รบกวนช่วยตรวจสอบคิวและแนะนำราคาให้ด้วยครับ/ค่ะ",
    ].join("\n");

    const lineId = quoteForm.getAttribute("data-line-id") || "";
    const fallbackLineUrl = quoteForm.getAttribute("data-line-url") || "";
    const lineMessageUrl = lineId
      ? `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(message)}`
      : fallbackLineUrl;

    try {
      await navigator.clipboard.writeText(message);
    } catch (_err) {
      const area = document.createElement("textarea");
      area.value = message;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }

    const lineBtn = document.getElementById("quote-line-btn");
    if (lineBtn && lineMessageUrl) {
      lineBtn.href = lineMessageUrl;
      lineBtn.classList.remove("hidden");
    }

    const status = document.getElementById("quote-status");
    status?.classList.remove("hidden");
    if (lineMessageUrl) {
      if (status) status.textContent = `เปิดแชท LINE Official ${lineId || "@553jixof"} แล้ว กดส่งข้อความใน LINE เพื่อให้เจ้าหน้าที่ได้รับ หากแอปไม่เปิด ให้กดปุ่มคุยผ่าน LINE อีกครั้ง`;
      window.location.href = lineMessageUrl;
    } else if (status) {
      status.textContent = "คัดลอกข้อความขอราคาแล้ว โทรหาเจ้าหน้าที่เพื่อเช็กคิว";
    }
    track("submit_quote", { trip_type: data.trip_type, vehicle_type: data.vehicle_type, via: "line" });
  });

  document.querySelectorAll("[data-vehicle-selector]").forEach((root) => {
    root.querySelectorAll("[data-group]").forEach((button) => {
      button.addEventListener("click", () => {
        root.querySelectorAll("[data-group]").forEach((el) => el.classList.remove("is-active"));
        button.classList.add("is-active");
        const group = button.getAttribute("data-group");
        root.querySelectorAll("[data-groups]").forEach((card) => {
          const match = (card.getAttribute("data-groups") || "").split(/\s+/).includes(group);
          card.hidden = !match;
        });
        track("select_vehicle", { group });
      });
    });
  });

  const filters = document.querySelector("[data-price-filters]");
  filters?.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      filters.querySelectorAll("[data-filter]").forEach((el) => el.classList.remove("is-active"));
      button.classList.add("is-active");
      const key = button.getAttribute("data-filter");
      document.querySelectorAll(".price-card").forEach((card) => {
        const tokens = (card.getAttribute("data-filters") || "").split(/\s+/);
        card.hidden = key !== "all" && !tokens.includes(key);
      });
      track("view_price", { filter: key });
    });
  });

  const copyBank = document.getElementById("copy-bank");
  copyBank?.addEventListener("click", async () => {
    const account = copyBank.getAttribute("data-account") || "";
    try {
      await navigator.clipboard.writeText(account);
    } catch (_err) {
      const area = document.createElement("textarea");
      area.value = account;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    const status = document.getElementById("copy-bank-status");
    status?.classList.remove("hidden");
    if (status) status.textContent = "คัดลอกเลขบัญชีแล้ว ตรวจสอบชื่อบัญชีก่อนโอน";
    track("copy_bank");
  });

  const planner = document.getElementById("planner-form");
  planner?.addEventListener("submit", (event) => {
    event.preventDefault();
    const days = document.getElementById("plan_days")?.value || "1";
    const people = Number(document.getElementById("plan_people")?.value || 0);
    const children = document.getElementById("plan_children")?.value === "yes";
    const senior = document.getElementById("plan_senior")?.value === "yes";
    const stay = document.getElementById("plan_stay")?.value || "ยังไม่ระบุ";
    const styles = Array.from(document.querySelectorAll('input[name="plan_style"]:checked')).map((el) => el.value);

    let route = { name: "ม่อนแจ่ม", url: "/routes/mon-jam/", why: "ใกล้เมือง ใช้เวลารถไม่ยาว" };
    if (styles.includes("temple")) {
      route = { name: "ดอยสุเทพ", url: "/routes/doi-suthep/", why: "ทริปเช้าหรือครึ่งวันใกล้เมือง" };
    }
    if (styles.includes("mountain") || styles.includes("nature") || styles.includes("photography")) {
      route = days === "1"
        ? { name: "ดอยอินทนนท์ หรือแม่กำปอง", url: "/routes/doi-inthanon/", why: "ทริปเต็มวันบนดอย ควรออกเช้า" }
        : { name: "เชียงราย", url: "/routes/chiang-rai/", why: "ต่างจังหวัดแบบไม่เร่งใน 1 วัน" };
    }
    if (styles.includes("relax") || styles.includes("cafe") || styles.includes("family")) {
      route = { name: "ม่อนแจ่ม", url: "/routes/mon-jam/", why: "จังหวะครึ่งวันถึงวันเดียว เหมาะครอบครัว" };
    }
    if (days !== "1" && (styles.includes("mountain") || styles.length === 0)) {
      route = senior
        ? { name: "เชียงราย", url: "/routes/chiang-rai/", why: "ทางหลวงมากกว่าโค้งเขาปาย" }
        : { name: "ปาย หรือเชียงราย", url: "/routes/pai/", why: "หลายวันพอให้มีจุดพักและไม่บีบไปกลับ" };
    }
    if (senior && route.url === "/routes/pai/") {
      route = { name: "เชียงราย หรือม่อนแจ่ม", url: "/routes/chiang-rai/", why: "นั่งโค้งยาวน้อยกว่าเส้นปาย" };
    }

    let vehicle = "รถเก๋ง";
    if (people >= 6) vehicle = "รถตู้";
    else if (people >= 4 || children || senior) vehicle = "SUV";

    const box = document.getElementById("planner-result");
    if (box) {
      box.classList.remove("hidden");
      box.innerHTML = `
        <h2>เส้นทางเบื้องต้น</h2>
        <p>จากที่พัก: ${escapeHtml(stay)}</p>
        <p>แนะนำเริ่มที่ <a href="${escapeHtml(route.url)}">${escapeHtml(route.name)}</a> — ${escapeHtml(route.why)}</p>
        <p>รถที่ควรถามคิว: ${escapeHtml(vehicle)}</p>
        <p>นี่คือคำแนะนำจากเงื่อนไขที่เลือก ไม่ได้ทดแทนการคุยกับเจ้าหน้าที่</p>
      `;
    }

    const dest = document.getElementById("destination");
    if (dest && !dest.value) dest.value = route.name;
    track("select_route", { planner: "1" });
  });
})();
