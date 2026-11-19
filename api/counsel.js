// 상담 신청 중계 (Vercel Serverless Function)
// coway/index.html 의 '제품 상담 신청서' 모달 → 이 함수 → goodlife.cowaymall.co.kr 상담 게시판(bo_table=counsel)
//
// goodlife.cowaymall.co.kr 의 상담 폼은 그누보드 write_update.php 로 접수되며,
// 같은 세션에서 발급한 1회용 쓰기 토큰(write_token.php)이 있어야 합니다.
// 다른 도메인의 브라우저에서는 이 세션·토큰을 받을 수 없어서, 서버에서 사이트와 같은 순서로
// ① 메인 페이지 접속(세션·폼 기본값) → ② 쓰기 토큰 발급 → ③ 상담 신청서 제출 을 진행합니다.

const BASE = "https://goodlife.cowaymall.co.kr";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const CA_NAME = "상담신청_하단"; // 사이트 폼 주석의 분류: 상담신청_하단, 상담신청_배너, 상세페이지_상담, 상세페이지_주문

function cookiesFrom(res) {
  const list = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [res.headers.get("set-cookie")];
  const jar = new Map();
  for (const c of list.filter(Boolean)) {
    const [pair] = c.split(";");
    const i = pair.indexOf("=");
    if (i > 0) jar.set(pair.slice(0, i).trim(), pair.slice(i + 1).trim());
  }
  return jar;
}
const jarToHeader = (jar) => [...jar].map(([k, v]) => `${k}=${v}`).join("; ");

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => { try { resolve(JSON.parse(raw || "{}")); } catch { resolve({}); } });
  });
}

module.exports = async (req, res) => {
  const reply = (status, body) => { res.statusCode = status; res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(body)); };
  if (req.method !== "POST") return reply(405, { ok: false, message: "POST 만 허용됩니다." });

  const b = await readBody(req);
  if (b.company) return reply(200, { ok: true }); // 스팸 봇(숨은 칸 입력) — 접수하지 않음

  const name = String(b.wr_name || "").trim();
  const p1 = String(b.wr_1 || "");
  const p2 = String(b.wr_2 || "");
  const p3 = String(b.wr_3 || "");
  const interests = String(b.wr_7 || "미선택").slice(0, 40);
  const memo = String(b.wr_content || "").slice(0, 80);
  if (!/^[ㄱ-힣a-zA-Z]{1,9}$/.test(name)) return reply(400, { ok: false, message: "이름을 확인해 주세요." });
  if (!/^01[016789]$/.test(p1) || !/^\d{3,4}$/.test(p2) || !/^\d{4}$/.test(p3)) return reply(400, { ok: false, message: "연락처를 확인해 주세요." });
  if (b.agree !== true) return reply(400, { ok: false, message: "개인정보 수집 및 이용에 동의해 주세요." });

  try {
    // ① 메인 페이지: 세션 쿠키 + 상담 폼(uid, wr_password) 기본값
    const r1 = await fetch(`${BASE}/`, { headers: { "User-Agent": UA, Accept: "text/html" } });
    const html = await r1.text();
    const jar = cookiesFrom(r1);
    const block = html.slice(html.indexOf("cta-popup-noProduct"));
    const uid = (block.match(/name="uid" value="(\d+)"/) || [])[1] || "";
    const pw = (block.match(/name="wr_password"[^>]*value="(\d+)"/) || [])[1] || String(Date.now()).slice(-10);

    // ② 쓰기 토큰
    const r2 = await fetch(`${BASE}/bbs/write_token.php`, {
      method: "POST",
      headers: { "User-Agent": UA, Cookie: jarToHeader(jar), "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest", Referer: `${BASE}/` },
      body: "bo_table=counsel",
    });
    for (const [k, v] of cookiesFrom(r2)) jar.set(k, v);
    const tk = await r2.json().catch(() => ({}));
    if (!tk.token) return reply(502, { ok: false, message: "상담 접수 창구에 연결하지 못했습니다." });

    // ③ 상담 신청서 제출 (사이트 모달과 같은 필드)
    const form = new URLSearchParams({
      token: tk.token, uid, w: "", bo_table: "counsel", ca_name: CA_NAME, wr_id: "",
      sca: "", sfl: "", stx: "", spt: "", sst: "", sod: "", page: "", secret: "secret",
      returl: "/content/complete02", wr_password: pw, wr_subject: "제품상담 신청이 접수되었습니다.",
      wr_7: interests, wr_name: name, wr_1: p1, wr_2: p2, wr_3: p3, wr_content: memo, wr_content_2301: "",
    });
    const r3 = await fetch(`${BASE}/bbs/write_update.php`, {
      method: "POST",
      redirect: "manual",
      headers: { "User-Agent": UA, Cookie: jarToHeader(jar), "Content-Type": "application/x-www-form-urlencoded", Referer: `${BASE}/`, Origin: BASE },
      body: form.toString(),
    });
    const loc = r3.headers.get("location") || "";
    const text = r3.status >= 300 && r3.status < 400 ? "" : await r3.text();
    if (/complete02/.test(loc) || /complete02/.test(text)) return reply(200, { ok: true });

    const alertMsg = (text.match(/alert\(["']([^"']+)["']\)/) || [])[1];
    console.error("counsel relay: unexpected response", r3.status, loc, alertMsg || text.slice(0, 200));
    return reply(502, { ok: false, message: alertMsg || "상담 접수에 실패했습니다." });
  } catch (err) {
    console.error("counsel relay error", err);
    return reply(502, { ok: false, message: "상담 접수 중 오류가 발생했습니다." });
  }
};
