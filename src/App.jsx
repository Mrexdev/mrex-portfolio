import { useState, useEffect } from "react";

const SKILLS = [
  { name: "JavaScript", level: 90, color: "#F7DF1E", icon: "JS" },
  { name: "Node.js", level: 88, color: "#339933", icon: "NJ" },
  { name: "HTML / CSS", level: 95, color: "#E34F26", icon: "HC" },
  { name: "React", level: 80, color: "#61DAFB", icon: "RE" },
  { name: "MySQL", level: 75, color: "#0F6AB4", icon: "MY" },
  { name: "Lua / FiveM", level: 72, color: "#7C3AED", icon: "LU" },
  { name: "Discord.js", level: 93, color: "#5865F2", icon: "DJ" },
];

const PROJECTS = [
  { name: "Sentinel", desc: "Système anti-raid/anti-spam autonome avec Blacklist Globale inter-serveurs (GBL). Protection avancée pour serveurs Discord.", tags: ["Discord.js", "MySQL", "Node.js"], status: "LIVE", rank: "S", color: "#FF6B35", link: "https://sites.google.com/view/sentinelbotfr/sentinel" },
  { name: "InfraBot", desc: "Backups automatiques, interface privée, logs personnalisés. Infrastructure Discord haut niveau.", tags: ["Node.js", "MySQL"], status: "LIVE", rank: "A", color: "#00D4FF" },
  { name: "Arcadia", desc: "Mini-jeux interactifs avec système de récompenses. Expérience immersive pour serveurs communautaires.", tags: ["Discord.js", "JavaScript"], status: "LIVE", rank: "A", color: "#8B5CF6" },
  { name: "Parlon!", desc: "Système de support anonyme avec tickets sécurisés et interface enrichie pour serveurs Discord.", tags: ["Discord.js", "MySQL", "Node.js"], status: "LIVE", rank: "A", color: "#10B981" },
  { name: "WitchyBot", desc: "Expérience mystique pour événements RP. Ambiance, immersion et interactions uniques.", tags: ["JavaScript", "Discord.js"], status: "LIVE", rank: "B", color: "#EC4899" },
  { name: "GTA FiveM Systems", desc: "Commandes d'armes avancées, gestion des emplois, modes immersifs (/panicmode, /blackout).", tags: ["Lua", "FiveM"], status: "LIVE", rank: "S", color: "#F59E0B" },
];

const TIMELINE = [
  { year: "2022", title: "Premiers projets RP", desc: "Début du développement de scripts FiveM et premiers bots Discord. Les fondations.", color: "#8B5CF6" },
  { year: "2023", title: "Systèmes avancés", desc: "Systèmes vocaux dynamiques, anti-raid, économie RP, handlers modulaires.", color: "#00D4FF" },
  { year: "2024", title: "Automatisations & UI", desc: "Automations complexes, interfaces animées, infrastructure avancée.", color: "#FF6B35" },
  { year: "2025", title: "IA & Intelligence", desc: "Intelligence conversationnelle, détection de comportements, systèmes intelligents.", color: "#10B981" },
];

const SERVICES = [
  { icon: "🤖", title: "Bots Discord", desc: "Slash commands, systèmes anti-raid, économie RP, logs, backups, tickets.", color: "#5865F2" },
  { icon: "🎮", title: "Scripts FiveM", desc: "Commandes RP, gestion des joueurs, modes immersifs, candidatures.", color: "#F59E0B" },
  { icon: "🌐", title: "Sites Web", desc: "Interfaces modernes, responsive, React & Node.js, bases de données.", color: "#00D4FF" },
  { icon: "🛡️", title: "Sécurité Discord", desc: "Anti-spam, anti-raid, blacklist globale inter-serveurs, audit logs.", color: "#FF6B35" },
];

const TICKER_ITEMS = ["JavaScript", "Node.js", "Discord.js", "React", "MySQL", "Lua", "FiveM", "HTML5", "CSS3", "REST API", "Git", "Bots Discord", "GTA RP", "Slash Commands", "UI/UX"];
const RANK_COLORS = { S: "#FF6B35", A: "#00D4FF", B: "#8B5CF6", C: "#10B981" };
const NAV = ["home", "skills", "projects", "timeline", "contact"];

const NAV_ICONS = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>,
  skills: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  projects: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  timeline: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  contact: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

export default function MrexPortfolio() {
  const [active, setActive] = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const roles = ["Développeur Discord Bots", "Fullstack Web Dev", "Architecte RP Systems", "UI/UX Craftsman"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleTyped, setRoleTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting) {
      if (roleTyped.length < current.length) t = setTimeout(() => setRoleTyped(current.slice(0, roleTyped.length + 1)), 80);
      else t = setTimeout(() => setDeleting(true), 2200);
    } else {
      if (roleTyped.length > 0) t = setTimeout(() => setRoleTyped(current.slice(0, roleTyped.length - 1)), 40);
      else { setDeleting(false); setRoleIdx((i) => (i + 1) % roles.length); }
    }
    return () => clearTimeout(t);
  }, [roleTyped, deleting, roleIdx]);

  useEffect(() => {
    if (active === "skills") setTimeout(() => setSkillsVisible(true), 120);
    else setSkillsVisible(false);
  }, [active]);

  return (
    <div style={{ fontFamily: "'Exo 2', 'Segoe UI', sans-serif", background: "#07070F", color: "#E2E8F0", minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.85)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes scanline{0%{top:-8%}100%{top:108%}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        *{box-sizing:border-box;margin:0;padding:0}
        *::-webkit-scrollbar{width:3px}
        *::-webkit-scrollbar-thumb{background:rgba(0,212,255,.2);border-radius:2px}
        .nb:hover{background:rgba(0,212,255,.08)!important;color:#00D4FF!important;border-color:rgba(0,212,255,.3)!important}
        .pc:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.12)!important}
        .sc:hover{transform:translateY(-4px)}
        .btn-p:hover{background:#1ae3ff!important;box-shadow:0 0 28px rgba(0,212,255,.5)!important}
        .btn-s:hover{border-color:rgba(226,232,240,.35)!important;background:rgba(226,232,240,.05)!important}
        .cr:hover{background:rgba(255,255,255,.03)!important}
        .tk{overflow:hidden;width:100%}
        .ti{display:flex;width:max-content;animation:ticker 35s linear infinite}
        .ti:hover{animation-play-state:paused}
      `}</style>

      {/* BG glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", left: "-5%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,.05) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", top: "40%", right: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,.04) 0%,transparent 65%)" }} />
      </div>

      {/* SIDEBAR */}
      <nav style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "72px", background: "rgba(10,10,20,.97)", borderRight: "1px solid rgba(0,212,255,.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", zIndex: 100, backdropFilter: "blur(20px)" }}>
        <div style={{ position: "absolute", top: "20px", width: "40px", height: "40px", border: "1.5px solid #00D4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 900, color: "#00D4FF", boxShadow: "0 0 16px rgba(0,212,255,.35),inset 0 0 16px rgba(0,212,255,.05)" }}>M</div>
        {NAV.map((s) => (
          <button key={s} className="nb" onClick={() => setActive(s)} title={s.charAt(0).toUpperCase() + s.slice(1)}
            style={{ width: "44px", height: "44px", border: active === s ? "1px solid rgba(0,212,255,.4)" : "1px solid rgba(255,255,255,.04)", background: active === s ? "rgba(0,212,255,.1)" : "transparent", color: active === s ? "#00D4FF" : "#3A4560", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: active === s ? "0 0 12px rgba(0,212,255,.2)" : "none" }}>
            {NAV_ICONS[s]}
          </button>
        ))}
        <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer"
          style={{ position: "absolute", bottom: "20px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3A4560", textDecoration: "none", transition: "color .2s" }}
          onMouseOver={e => e.currentTarget.style.color = "#E2E8F0"} onMouseOut={e => e.currentTarget.style.color = "#3A4560"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </nav>

      {/* MAIN */}
      <main style={{ marginLeft: "72px", flex: 1, minHeight: "100vh", position: "relative", zIndex: 1, overflowY: "auto" }}>

        {/* ════ HOME ════ */}
        {active === "home" && (
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* HERO */}
            <div style={{ display: "flex", alignItems: "center", padding: "60px 80px 48px", gap: "40px", position: "relative", overflow: "hidden", minHeight: "520px" }}>
              {/* BG image full bleed */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <img src="https://i.pinimg.com/1200x/08/af/22/08af22c8819ac35e7c0319b5f33b97f7.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.22, filter: "saturate(0.5)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(7,7,15,.97) 0%, rgba(7,7,15,.75) 50%, rgba(7,7,15,.2) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,7,15,.3) 0%, transparent 40%, rgba(7,7,15,1) 100%)" }} />
              </div>
              {/* LEFT */}
              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                  <div style={{ padding: "5px 16px", border: "1px solid #FF6B35", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#FF6B35", fontWeight: 700, boxShadow: "0 0 14px rgba(255,107,53,.3)" }}>S — RANK</div>
                  <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#3A4560", textTransform: "uppercase" }}>Developer A.K.A</span>
                </div>
                <h1 style={{ fontSize: "clamp(52px,7vw,100px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "4px", background: "linear-gradient(130deg,#E2E8F0 0%,rgba(226,232,240,.45) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ๖̶ζ͜͡Mrex
                </h1>
                <div style={{ height: "36px", display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <span style={{ color: "#00D4FF", fontSize: "17px", fontWeight: 300, letterSpacing: "0.06em" }}>
                    {roleTyped}<span style={{ display: "inline-block", width: "2px", height: "18px", background: "#00D4FF", marginLeft: "3px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
                  </span>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.85, color: "#8892A4", marginBottom: "32px", maxWidth: "420px" }}>
                  Développeur fullstack spécialisé dans les <span style={{ color: "#E2E8F0" }}>bots Discord</span>, l'automatisation <span style={{ color: "#E2E8F0" }}>RP</span> et les projets immersifs. Slash commands, systèmes avancés, web stylé &amp; responsive.
                </p>
                <div style={{ display: "flex", gap: "14px", marginBottom: "40px" }}>
                  <button className="btn-p" onClick={() => setActive("projects")} style={{ padding: "13px 28px", background: "#00D4FF", color: "#07070F", border: "none", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>Voir les projets →</button>
                  <button className="btn-s" onClick={() => setActive("contact")} style={{ padding: "13px 28px", background: "transparent", color: "#E2E8F0", border: "1px solid rgba(226,232,240,.15)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>Me contacter</button>
                </div>
                <div style={{ display: "flex", gap: "36px" }}>
                  {[{ num: "6+", label: "Bots déployés" }, { num: "2022", label: "Depuis" }, { num: "7", label: "Technologies" }, { num: "∞", label: "Passion" }].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: "28px", fontWeight: 800, color: "#00D4FF", lineHeight: 1 }}>{s.num}</div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#3A4560", textTransform: "uppercase", marginTop: "5px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* RIGHT — avatar */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", flexShrink: 0, position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative", width: "190px", height: "190px", borderRadius: "50%", border: "1.5px solid rgba(0,212,255,.25)", overflow: "hidden", boxShadow: "0 0 50px rgba(0,212,255,.12)", animation: "float 6s ease-in-out infinite" }}>
                  <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="Mrex" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, height: "8%", background: "linear-gradient(transparent,rgba(0,212,255,.06),transparent)", animation: "scanline 4s linear infinite", pointerEvents: "none" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#3A4560", textTransform: "uppercase", marginBottom: "7px" }}>MREXDEV</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981", animation: "pulse-dot 2s ease-in-out infinite" }} />
                    <span style={{ fontSize: "11px", color: "#10B981", letterSpacing: "0.1em" }}>Open to work</span>
                  </div>
                </div>
                <div style={{ padding: "12px 18px", background: "rgba(255,107,53,.05)", border: "1px solid rgba(255,107,53,.2)", display: "flex", alignItems: "center", gap: "12px", width: "190px" }}>
                  <div style={{ width: "32px", height: "32px", border: "1.5px solid #FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: "#FF6B35", boxShadow: "0 0 10px rgba(255,107,53,.3)" }}>S</div>
                  <div>
                    <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#FF6B35", textTransform: "uppercase" }}>S-Rank Developer</div>
                    <div style={{ fontSize: "12px", color: "#8892A4", marginTop: "2px" }}>Bot Architect</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div style={{ padding: "0 80px 40px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#3A4560", textTransform: "uppercase", marginBottom: "16px" }}>// ce que je fais</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
                {SERVICES.map(s => (
                  <div key={s.title} className="sc"
                    onMouseEnter={() => setHoveredService(s.title)} onMouseLeave={() => setHoveredService(null)}
                    style={{ padding: "24px 20px", background: "rgba(14,14,28,.9)", border: `1px solid ${hoveredService === s.title ? s.color + "44" : "rgba(255,255,255,.05)"}`, borderTop: `2px solid ${s.color}`, transition: "all 0.25s", cursor: "default" }}>
                    <div style={{ fontSize: "26px", marginBottom: "12px" }}>{s.icon}</div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px", color: "#E2E8F0" }}>{s.title}</h3>
                    <p style={{ fontSize: "12px", color: "#8892A4", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURED PROJECTS */}
            <div style={{ padding: "0 80px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#3A4560", textTransform: "uppercase" }}>// projets phares</div>
                <button onClick={() => setActive("projects")} style={{ fontSize: "11px", color: "#00D4FF", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}>Voir tout →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                {PROJECTS.filter(p => p.rank === "S" || p.name === "Parlon!").slice(0, 3).map(p => (
                  <div key={p.name} className="pc"
                    style={{ padding: "20px 22px", background: "rgba(14,14,28,.9)", border: "1px solid rgba(255,255,255,.05)", borderLeft: `3px solid ${p.color}`, position: "relative", transition: "all 0.25s" }}>
                    <div style={{ position: "absolute", top: "16px", right: "16px", width: "28px", height: "28px", border: `1.5px solid ${RANK_COLORS[p.rank]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 900, color: RANK_COLORS[p.rank], boxShadow: `0 0 10px ${RANK_COLORS[p.rank]}44` }}>{p.rank}</div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", paddingRight: "36px", color: "#E2E8F0" }}>{p.name}</h3>
                    <p style={{ fontSize: "12px", color: "#8892A4", lineHeight: 1.7, marginBottom: "14px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
                      {p.tags.map(t => (<span key={t} style={{ fontSize: "9px", padding: "2px 7px", background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}28`, letterSpacing: "0.04em" }}>{t}</span>))}
                    </div>
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#00D4FF", textDecoration: "none" }}>Voir le projet →</a>}
                  </div>
                ))}
              </div>
            </div>

            {/* SKILLS GRID */}
            <div style={{ padding: "0 80px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#3A4560", textTransform: "uppercase" }}>// stack technique</div>
                <button onClick={() => setActive("skills")} style={{ fontSize: "11px", color: "#00D4FF", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}>Détails →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "12px" }}>
                {SKILLS.map(sk => (
                  <div key={sk.name}
                    style={{ padding: "16px 12px", background: "rgba(14,14,28,.9)", border: `1px solid ${sk.color}22`, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.2s", cursor: "default" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = sk.color + "55"; e.currentTarget.style.background = `${sk.color}08`; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = sk.color + "22"; e.currentTarget.style.background = "rgba(14,14,28,.9)"; }}>
                    <div style={{ width: "36px", height: "36px", background: `${sk.color}18`, border: `1px solid ${sk.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: sk.color }}>{sk.icon}</div>
                    <div style={{ fontSize: "10px", color: "#8892A4", textAlign: "center", lineHeight: 1.3 }}>{sk.name}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: sk.color }}>{sk.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TICKER */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "14px 0", background: "rgba(10,10,20,.6)" }}>
              <div className="tk">
                <div className="ti">
                  {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                    <span key={i} style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: i % 3 === 0 ? "#00D4FF" : i % 3 === 1 ? "#FF6B35" : "#252535", padding: "0 28px", whiteSpace: "nowrap" }}>
                      {item} <span style={{ color: "#151520", marginLeft: "28px" }}>◆</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* QUOTE */}
            <div style={{ padding: "28px 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ borderLeft: "2px solid rgba(0,212,255,.2)", paddingLeft: "18px" }}>
                <p style={{ fontSize: "13px", fontStyle: "italic", color: "#3A4560", lineHeight: 1.6 }}>"Créer des bots stylés, fluides et intelligents, c'est mon métier."</p>
                <span style={{ fontSize: "11px", color: "#00D4FF", letterSpacing: "0.08em" }}>— ๖̶ζ͜͡Mrex</span>
              </div>
              <div style={{ fontSize: "11px", color: "#1A1A28", letterSpacing: "0.12em", fontFamily: "monospace" }}>github.com/Mrexdev</div>
            </div>
          </div>
        )}

        {/* ════ SKILLS ════ */}
        {active === "skills" && (
          <div style={{ minHeight: "100vh", padding: "80px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "14px" }}>// skills.exe</div>
            <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 0.95, marginBottom: "10px" }}>Compétences</h2>
            <p style={{ color: "#3A4560", marginBottom: "60px", fontSize: "14px" }}>Technologies maîtrisées &amp; niveaux de progression</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
              <div>
                {SKILLS.map((skill, i) => (
                  <div key={skill.name} style={{ marginBottom: "28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "30px", height: "30px", background: `${skill.color}18`, border: `1px solid ${skill.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 800, color: skill.color }}>{skill.icon}</div>
                        <span style={{ fontSize: "14px", fontWeight: 500 }}>{skill.name}</span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,.05)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: skillsVisible ? `${skill.level}%` : "0%", background: `linear-gradient(90deg,${skill.color} 0%,${skill.color}88 100%)`, transition: `width ${0.7 + i * 0.08}s cubic-bezier(.4,0,.2,1)`, boxShadow: `0 0 8px ${skill.color}55` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { title: "Backend", items: ["Node.js", "Express.js", "MySQL", "Discord.js", "REST APIs"], color: "#00D4FF" },
                  { title: "Frontend", items: ["React", "HTML5", "CSS3", "Responsive Design", "Animations"], color: "#8B5CF6" },
                  { title: "Spécialisé", items: ["Lua / FiveM", "Discord API", "Bots RP", "Systèmes GTA"], color: "#FF6B35" },
                ].map(cat => (
                  <div key={cat.title} style={{ padding: "24px 28px", background: "rgba(14,14,28,.9)", border: "1px solid rgba(255,255,255,.04)", borderLeft: `3px solid ${cat.color}` }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.25em", color: cat.color, textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>{cat.title}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {cat.items.map(item => (<span key={item} style={{ fontSize: "11px", padding: "4px 10px", background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}28`, letterSpacing: "0.04em" }}>{item}</span>))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ PROJECTS ════ */}
        {active === "projects" && (
          <div style={{ minHeight: "100vh", padding: "80px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "14px" }}>// projects.log</div>
            <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 0.95, marginBottom: "10px" }}>Projets</h2>
            <p style={{ color: "#3A4560", marginBottom: "60px", fontSize: "14px" }}>Bots Discord, systèmes RP &amp; applications web</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "20px" }}>
              {PROJECTS.map(project => (
                <div key={project.name} className="pc"
                  style={{ padding: "28px", background: "rgba(14,14,28,.92)", border: "1px solid rgba(255,255,255,.05)", borderLeft: `3px solid ${project.color}`, position: "relative", transition: "all 0.25s" }}>
                  <div style={{ position: "absolute", top: "20px", right: "20px", width: "34px", height: "34px", border: `1.5px solid ${RANK_COLORS[project.rank]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 900, color: RANK_COLORS[project.rank], boxShadow: `0 0 12px ${RANK_COLORS[project.rank]}44` }}>{project.rank}</div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "12px", color: "#E2E8F0", paddingRight: "48px" }}>{project.name}</h3>
                  <p style={{ fontSize: "13px", color: "#8892A4", lineHeight: 1.75, marginBottom: "20px" }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                    {project.tags.map(tag => (<span key={tag} style={{ fontSize: "10px", padding: "3px 9px", background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}28`, letterSpacing: "0.04em" }}>{tag}</span>))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 5px #10B981" }} />
                    <span style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#10B981", textTransform: "uppercase" }}>{project.status}</span>
                    {project.link && <a href={project.link} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", fontSize: "11px", color: "#00D4FF", textDecoration: "none" }}>Voir →</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ TIMELINE ════ */}
        {active === "timeline" && (
          <div style={{ minHeight: "100vh", padding: "80px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "14px" }}>// history.log</div>
            <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 0.95, marginBottom: "10px" }}>Timeline</h2>
            <p style={{ color: "#3A4560", marginBottom: "60px", fontSize: "14px" }}>Évolution depuis les débuts</p>
            <div style={{ maxWidth: "640px", position: "relative" }}>
              <div style={{ position: "absolute", left: "23px", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,.05)" }} />
              {TIMELINE.map(item => (
                <div key={item.year} style={{ display: "flex", gap: "32px", marginBottom: "48px", position: "relative" }}>
                  <div style={{ width: "48px", height: "48px", flexShrink: 0, border: `2px solid ${item.color}`, background: "#07070F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: item.color, boxShadow: `0 0 18px ${item.color}44`, zIndex: 1 }}>{item.year}</div>
                  <div style={{ paddingTop: "10px" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: item.color, textTransform: "uppercase", marginBottom: "6px" }}>{item.year}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#E2E8F0" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "#8892A4", lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: "32px", position: "relative" }}>
                <div style={{ width: "48px", height: "48px", flexShrink: 0, border: "1.5px dashed rgba(255,255,255,.1)", background: "#07070F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#3A4560", zIndex: 1 }}>?</div>
                <div style={{ paddingTop: "10px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#3A4560", textTransform: "uppercase", marginBottom: "6px" }}>En cours</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#3A4560" }}>La suite...</h3>
                  <p style={{ fontSize: "13px", color: "#3A4560", lineHeight: 1.75 }}>IA conversationnelle, détection comportementale &amp; systèmes intelligents.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ CONTACT ════ */}
        {active === "contact" && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.35em", color: "#FF6B35", textTransform: "uppercase", marginBottom: "14px" }}>// contact.init</div>
            <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 0.95, marginBottom: "10px" }}>Contact</h2>
            <p style={{ color: "#3A4560", marginBottom: "56px", fontSize: "14px", maxWidth: "380px", lineHeight: 1.7 }}>Pour toute demande de collaboration ou de projet, contactez-moi via Discord ou GitHub.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "420px" }}>
              {[
                { label: "GitHub", value: "github.com/Mrexdev", link: "https://github.com/Mrexdev", color: "#E2E8F0" },
                { label: "Site Sentinel", value: "sentinelbotfr — Google Sites", link: "https://sites.google.com/view/sentinelbotfr/sentinel", color: "#FF6B35" },
                { label: "Discord", value: "Disponible sur demande", color: "#8B5CF6" },
              ].map(c => (
                <div key={c.label} className="cr" style={{ padding: "20px 24px", background: "rgba(14,14,28,.9)", border: "1px solid rgba(255,255,255,.05)", borderLeft: `3px solid ${c.color}`, transition: "all 0.2s" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#3A4560", textTransform: "uppercase", marginBottom: "5px" }}>{c.label}</div>
                  {c.link ? <a href={c.link} target="_blank" rel="noreferrer" style={{ fontSize: "14px", color: c.color, textDecoration: "none" }}>{c.value}</a> : <span style={{ fontSize: "14px", color: "#8892A4" }}>{c.value}</span>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: "28px" }}>
              <p style={{ fontSize: "11px", color: "#1E2330", letterSpacing: "0.12em", fontFamily: "monospace" }}>// ๖̶ζ͜͡Mrex · Fullstack Developer · Discord &amp; Web · 2022 – 2025</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
