import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────── DATA ─────────────── */
const SKILLS = [
  { name: "JavaScript", level: 95, color: "#F7DF1E", icon: "JS", desc: "ES6+, async/await, DOM, modules" },
  { name: "Discord.js", level: 98, color: "#5865F2", icon: "DJ", desc: "Slash commands, events, API v10" },
  { name: "Node.js", level: 92, color: "#339933", icon: "NJ", desc: "API REST, streams, CLI tools" },
  { name: "HTML/CSS", level: 95, color: "#E34F26", icon: "HC", desc: "Responsive, animations, Grid/Flex" },
  { name: "React", level: 80, color: "#61DAFB", icon: "RE", desc: "Hooks, context, SPA, composants" },
  { name: "MySQL", level: 90, color: "#0F6AB4", icon: "MY", desc: "Requêtes, jointures, ORM, BDD" },
  { name: "Lua/FiveM", level: 72, color: "#7C3AED", icon: "LU", desc: "Scripts RP, NUI, events serveur" },
];

const PROJECTS = [
  { name: "Sentinel", short: "Protection Discord", desc: "Sentinel est mon projet phare — un système de sécurité complet pour serveurs Discord. Anti-raid, anti-spam, et une Blacklist Globale inter-serveurs unique qui synchronise les bans entre communautés. Déployé sur des dizaines de serveurs.", tags: ["Discord.js", "MySQL", "Node.js"], rank: "S", color: "#FF6B35", link: "https://sites.google.com/view/sentinelbotfr/sentinel", year: "2023", users: "10k+" },
  { name: "yourquiz", short: "Protection Discord", desc: "YourQuiz — Bot quiz chill & fun créé par Mrex ! Vos potes posent les questions via un popup, vous répondez anonymement. Timer live, classement en temps réel et stats persistantes. Que le meilleur gagne !", tags: ["Discord.js", "JavaScript", "MySQL", "Node.js"], rank: "A", color: "#82264B", year: "2026", users: "500+" },
  { name: "InfraBot", short: "Infrastructure Discord", desc: "Un bot d'infrastructure pour administrateurs Discord. Gestion des backups automatiques, interface de configuration privée, logs détaillés et personnalisés. Pense à tout ce qu'un admin ne veut pas gérer manuellement — InfraBot le fait.", tags: ["Node.js", "MySQL"], rank: "A", color: "#00D4FF", year: "2023", users: "500+" },
  { name: "Arcadia", short: "Gamification", desc: "Arcadia transforme n'importe quel serveur Discord en terrain de jeu. Mini-jeux interactifs, système de progression, récompenses dynamiques. Les membres restent engagés, les communautés grandissent.", tags: ["Discord.js", "JavaScript"], rank: "A", color: "#8B5CF6", year: "2024", users: "2k+" },
  { name: "Parlon!", short: "Support anonyme", desc: "Un système de support unique qui préserve l'anonymat des utilisateurs. Tickets sécurisés, interface enrichie pour les modérateurs, historique chiffré. Idéal pour les serveurs avec des sujets sensibles.", tags: ["Discord.js", "MySQL", "Node.js"], rank: "A", color: "#10B981", year: "2024", users: "2000+" },
  { name: "WitchyBot", short: "Événements RP", desc: "WitchyBot crée une atmosphère mystique pour vos événements RP. Messages d'ambiance, interactions thématiques, système de sorts et de rituels. Une immersion totale pour vos communautés de roleplay.", tags: ["JavaScript", "Discord.js"], rank: "B", color: "#EC4899", year: "2023", users: "300+" },
  { name: "GTA FiveM Systems", short: "Scripting RP", desc: "Suite complète de scripts FiveM pour serveurs GTA RP. Commandes d'armes avancées, système de candidatures d'emploi, gestion des joueurs, modes immersifs comme /panicmode et /blackout. L'expérience RP ultime.", tags: ["Lua", "FiveM"], rank: "S", color: "#F59E0B", year: "2022", users: "1k+" },
];

const TIMELINE = [
  { year: "2022", title: "Les fondations", subtitle: "Premiers projets RP", desc: "Tout commence avec GTA FiveM. Scripts Lua, systèmes de jeu, premières interactions avec des milliers de joueurs. La passion pour le code est née là — créer des expériences que les gens vivent vraiment.", color: "#8B5CF6", icon: "🎮", detail: "Scripts FiveM · Lua · Premiers bots" },
  { year: "2023", title: "La montée en puissance", subtitle: "Systèmes avancés", desc: "L'année où tout s'accélère. Sentinel, InfraBot, systèmes vocaux dynamiques, anti-raid sophistiqués. Je construis des architectures modulaires, des handlers robustes. Le code devient une discipline.", color: "#00D4FF", icon: "⚙️", detail: "Discord.js · MySQL · Node.js · Architecture" },
  { year: "2024", title: "L'ère des interfaces", subtitle: "Automatisations & UI", desc: "Focus sur l'expérience utilisateur. Interfaces animées, automations complexes qui font gagner des heures. Arcadia, Parlon! — des projets qui mettent l'humain au centre. L'infrastructure devient invisible, l'expérience prend le devant.", color: "#FF6B35", icon: "🚀", detail: "React · UI/UX · Automations · APIs" },
  { year: "2025", title: "Intelligence artificielle", subtitle: "IA & Systèmes cognitifs", desc: "Le futur s'ouvre. Bots avec mémoire persistante, détection de comportements suspects en temps réel, IA conversationnelle qui s'adapte. Chaque projet intègre désormais une couche d'intelligence.", color: "#10B981", icon: "🧠", detail: "IA · Machine Learning · Systèmes adaptatifs" },
  { year: "2026", title: "Infrastructure connectée", subtitle: "J’ai transformé des serveurs Discord indépendants en une véritable infrastructure connectée. Les messages, les données et les systèmes ne sont plus isolés, mais circulent en temps réel entre plusieurs communautés. Chaque serveur devient un nœud d’un réseau global, capable d’interagir avec les autres comme une seule et même entité. Synchronisation des événements, partage d’informations, communication inter-serveurs… J’ai dépassé les limites classiques de Discord pour créer un écosystème unifié, dynamique et évolutif.", color: "#10B981", icon: "🌍", detail: "Réseau global • Inter-serveurs • Système unifié" },
];

const SERVICES = [
  { icon: "🤖", title: "Bots Discord", desc: "De la slash command basique au système complet avec dashboard, base de données et logs. Je crée des bots qui font vraiment la différence sur votre serveur.", color: "#5865F2", features: ["Slash commands", "Anti-raid", "Économie RP", "Tickets"] },
  { icon: "🎮", title: "Scripts FiveM", desc: "Scripts Lua immersifs pour serveurs GTA RP. Systèmes d'emploi, modes de jeu spéciaux, interfaces NUI personnalisées.", color: "#F59E0B", features: ["Commandes RP", "Gestion joueurs", "NUI customs", "Événements"] },
  { icon: "🌐", title: "Sites Web", desc: "Sites modernes et responsives avec React et Node.js. Design soigné, performances optimisées, expérience utilisateur irréprochable.", color: "#00D4FF", features: ["React / Node.js", "Design moderne", "Responsive", "Animations"] },
  { icon: "🛡️", title: "Sécurité Discord", desc: "Protection complète de votre communauté. Systèmes anti-raid, blacklist globale, audit logs et alertes en temps réel.", color: "#FF6B35", features: ["Anti-spam", "Blacklist GBL", "Audit logs", "Alertes live"] },
];

const TICKER = ["JavaScript","Node.js","Discord.js","React","MySQL","Lua","FiveM","HTML5","CSS3","REST API","Git","Bots Discord","GTA RP","Slash Commands","UI/UX","Animations","Architecture","TypeScript"];
const RANK_COLORS = { S: "#FF6B35", A: "#00D4FF", B: "#8B5CF6", C: "#10B981" };
const NAV = ["home","skills","projects","timeline","contact"];
const NAV_LABELS = { home:"Accueil", skills:"Skills", projects:"Projets", timeline:"Timeline", contact:"Contact" };

/* ─────────────── 3D TILT HOOK ─────────────── */
function useTilt(intensity = 10) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rx = ((y - cy) / cy) * -intensity;
    const ry = ((x - cx) / cx) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    el.style.transition = "transform .05s ease";
    const shine = el.querySelector(".shine");
    if (shine) { shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.08), transparent 60%)`; shine.style.opacity = "1"; }
  }, [intensity]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    el.style.transition = "transform .4s cubic-bezier(.4,0,.2,1)";
    const shine = el.querySelector(".shine");
    if (shine) shine.style.opacity = "0";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* ─────────────── TILT CARD ─────────────── */
function TiltCard({ children, style, className }) {
  const tilt = useTilt(8);
  return (
    <div {...tilt} className={className} style={{ ...style, cursor: "default", transformStyle: "preserve-3d", willChange: "transform", position: "relative", overflow: "hidden" }}>
      <div className="shine" style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", zIndex: 10, transition: "opacity .3s", borderRadius: "inherit" }} />
      {children}
    </div>
  );
}

/* ─────────────── NAV ICONS ─────────────── */
const NAV_ICONS = {
  home:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>,
  skills:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  projects:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  timeline:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  contact:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

/* ─────────────── CONTACT SECTION ─────────────── */
const PROJECT_TYPES = [
  { id: "bot", label: "🤖 Bot Discord", color: "#5865F2" },
  { id: "fivem", label: "🎮 Script FiveM", color: "#F59E0B" },
  { id: "web", label: "🌐 Site Web", color: "#00D4FF" },
  { id: "security", label: "🛡️ Sécurité", color: "#FF6B35" },
  { id: "other", label: "✨ Autre", color: "#8B5CF6" },
];

// ⚠️  REMPLACE PAR TON WEBHOOK DISCORD :
// Discord → Paramètres du serveur → Intégrations → Webhooks → Nouveau webhook
const WEBHOOK_URL = "https://discord.com/api/webhooks/1490654845429092494/tZX_-oLnuSPalQgZgLYRQTSa7mJZT_db_ypsPSW2IIxjcYjhvEvonnX0IGTqcOGkihQ3";

function ContactSection({ paralaxStyleSlow, paralaxStyle, dotSvg }) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [charCount, setCharCount] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  const selectedType = PROJECT_TYPES.find(t => t.id === form.type);

  const handleChange = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (field === "message") setCharCount(val.length);
  };

  const send = async () => {
    if (!form.name || !form.message || !form.type) return;
    setStatus("sending");
    const embed = {
      title: `📬 Nouveau message — ${selectedType?.label || form.type}`,
      description: form.message,
      color: parseInt((selectedType?.color || "#00D4FF").replace("#", ""), 16),
      fields: [
        { name: "👤 Nom / Pseudo", value: form.name, inline: true },
        { name: "📧 Email", value: form.email || "*Non renseigné*", inline: true },
        { name: "🎯 Type de projet", value: selectedType?.label || form.type, inline: true },
      ],
      footer: { text: "mrex-portfolio.vercel.app • " + new Date().toLocaleString("fr-FR") },
      thumbnail: { url: "https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" },
    };
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "๖̶ζ͜͡Mrex Portfolio", avatar_url: "https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg", embeds: [embed] }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", type: "", message: "" }); setCharCount(0); }
      else setStatus("error");
    } catch { setStatus("error"); }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inputBase = (field) => ({
    width: "100%", padding: "13px 16px",
    background: focused === field ? "rgba(0,212,255,.04)" : "rgba(6,6,16,.9)",
    border: `1px solid ${focused === field ? "rgba(0,212,255,.5)" : "rgba(255,255,255,.08)"}`,
    color: "#E2E8F0", fontSize: "14px", outline: "none",
    fontFamily: "'Exo 2',sans-serif", transition: "all .25s",
    boxShadow: focused === field ? "0 0 0 3px rgba(0,212,255,.08), inset 0 0 20px rgba(0,212,255,.03)" : "none",
  });

  return (
    <div className="pi">
      {/* BANNER */}
      <div className="barea" style={{ position: "relative", overflow: "hidden", minHeight: "220px", padding: "50px 80px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: `url("data:image/svg+xml,${encodeURIComponent(dotSvg)}") repeat`, backgroundSize: "24px 24px", ...paralaxStyleSlow }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(16,185,129,.1) 0%,rgba(0,212,255,.05) 40%,rgba(5,5,14,.95) 70%,rgba(5,5,14,1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)" }} />
        <div className="bbt" style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", fontSize: "150px", fontWeight: 900, color: "#10B981", opacity: .05, pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>CONTACT</div>
        <div style={{ position: "absolute", top: "-20%", left: "10%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,.08),transparent 70%)", ...paralaxStyle, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 14px", border: "1px solid rgba(16,185,129,.3)", marginBottom: "10px", background: "rgba(16,185,129,.06)" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "9px", letterSpacing: ".35em", color: "#10B981", textTransform: "uppercase" }}>contact.init — en ligne · réponse sous 24h</span>
          </div>
          <h2 className="st fu" style={{ fontSize: "62px", fontWeight: 900, lineHeight: .9, color: "#E2E8F0", marginBottom: "10px" }}>Contact</h2>
          <p style={{ fontSize: "14px", color: "#5A6478", maxWidth: "480px" }}>Un projet en tête ? Remplis le formulaire — ton message arrive directement dans mon Discord.</p>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,#10B981,transparent)", marginTop: "14px" }} />
        </div>
      </div>

      <div className="sp" style={{ padding: "44px 80px" }}>
        <div className="contg" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "48px", alignItems: "start" }}>

          {/* ── LEFT : infos + liens ── */}
          <div>
            <p style={{ fontSize: "14px", color: "#5A6478", lineHeight: 1.85, marginBottom: "10px" }}>
              Développeur indépendant passionné, je construis des expériences numériques depuis 2022. Bots Discord, scripts FiveM, sites web — chaque projet est traité avec soin et professionnalisme.
            </p>
            <p style={{ fontSize: "13px", color: "#3A4560", lineHeight: 1.75, marginBottom: "32px" }}>
              Mon approche : comprendre ton besoin avant de coder. Pas de solution copier-coller — du travail sur mesure.
            </p>

            {/* LINKS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {[
                { label: "GitHub", value: "github.com/Mrexdev", link: "https://github.com/Mrexdev", color: "#E2E8F0", icon: "◈", sub: "Code source & projets" },
                { label: "Site Sentinel", value: "sentinelbotfr", link: "https://sites.google.com/view/sentinelbotfr/sentinel", color: "#FF6B35", icon: "🛡️", sub: "Mon bot de sécurité Discord" },
                { label: "Discord", value: "Sur demande via le formulaire", color: "#5865F2", icon: "💬", sub: "Réponse garantie sous 24h" },
              ].map((c, i) => (
                <TiltCard key={c.label} className={`ci${i + 1}`} style={{ padding: "16px 18px", background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderLeft: `3px solid ${c.color}`, display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", background: `${c.color}10`, border: `1px solid ${c.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "9px", letterSpacing: ".18em", color: "#3A4560", textTransform: "uppercase", marginBottom: "2px" }}>{c.label}</div>
                    {c.link ? <a href={c.link} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: c.color, textDecoration: "none" }}>{c.value}</a> : <span style={{ fontSize: "12px", color: "#8892A4" }}>{c.value}</span>}
                    <div style={{ fontSize: "10px", color: "#3A4560", marginTop: "1px" }}>{c.sub}</div>
                  </div>
                  {c.link && <span style={{ color: "#3A4560" }}>→</span>}
                </TiltCard>
              ))}
            </div>

            {/* STATUS CARD */}
            <div style={{ padding: "20px 22px", background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderTop: "2px solid #10B981", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,.1),transparent 70%)", pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 7px #10B981", animation: "pulse 2s ease-in-out infinite" }} />
                <span style={{ fontSize: "10px", color: "#10B981", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>Disponible · Open to work</span>
              </div>
              <p style={{ fontSize: "12px", color: "#5A6478", lineHeight: 1.7 }}>Actuellement disponible pour de nouvelles collaborations. Les messages envoyés via le formulaire arrivent directement dans mon Discord privé.</p>
            </div>
          </div>

          {/* ── RIGHT : FORM ── */}
          <div>
            {/* Discord preview toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ fontSize: "9px", letterSpacing: ".3em", color: "#3A4560", textTransform: "uppercase" }}>// envoyer un message</div>
              <button onClick={() => setPreviewMode(p => !p)}
                style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: previewMode ? "#5865F2" : "#3A4560", background: previewMode ? "rgba(88,101,242,.1)" : "transparent", border: `1px solid ${previewMode ? "rgba(88,101,242,.35)" : "rgba(255,255,255,.08)"}`, padding: "5px 12px", cursor: "pointer", transition: "all .2s", letterSpacing: ".05em" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                Aperçu Discord
              </button>
            </div>

            {/* DISCORD PREVIEW */}
            {previewMode && (
              <div style={{ marginBottom: "16px", padding: "16px", background: "#36393f", border: "1px solid rgba(255,255,255,.1)", animation: "cardIn .3s ease both", fontFamily: "'Whitney',sans-serif" }}>
                <div style={{ fontSize: "9px", letterSpacing: ".1em", color: "#72767d", marginBottom: "10px", textTransform: "uppercase" }}>Aperçu — Embed Discord</div>
                <div style={{ borderLeft: `4px solid ${selectedType?.color || "#5865F2"}`, paddingLeft: "12px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>📬 Nouveau message — {selectedType?.label || "Type non sélectionné"}</div>
                  <div style={{ fontSize: "13px", color: "#dcddde", marginBottom: "10px", lineHeight: 1.5 }}>{form.message || "*Votre message apparaîtra ici...*"}</div>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <div><div style={{ fontSize: "10px", color: "#72767d", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700, marginBottom: "2px" }}>👤 Nom</div><div style={{ fontSize: "12px", color: "#dcddde" }}>{form.name || "—"}</div></div>
                    <div><div style={{ fontSize: "10px", color: "#72767d", textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 700, marginBottom: "2px" }}>📧 Email</div><div style={{ fontSize: "12px", color: "#dcddde" }}>{form.email || "—"}</div></div>
                  </div>
                  <div style={{ fontSize: "10px", color: "#72767d", marginTop: "8px" }}>mrex-portfolio.vercel.app • {new Date().toLocaleString("fr-FR")}</div>
                </div>
              </div>
            )}

            {/* FORM */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "9px", letterSpacing: ".2em", color: "#3A4560", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Nom / Pseudo <span style={{ color: "#FF6B35" }}>*</span></label>
                  <input value={form.name} onChange={e => handleChange("name", e.target.value)}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    placeholder="๖̶ζ͜͡Mrex..." style={inputBase("name")} />
                </div>
                <div>
                  <label style={{ fontSize: "9px", letterSpacing: ".2em", color: "#3A4560", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Email (optionnel)</label>
                  <input value={form.email} onChange={e => handleChange("email", e.target.value)}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    placeholder="ton@email.com" style={inputBase("email")} />
                </div>
              </div>

              {/* Type selector */}
              <div>
                <label style={{ fontSize: "9px", letterSpacing: ".2em", color: "#3A4560", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Type de projet <span style={{ color: "#FF6B35" }}>*</span></label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {PROJECT_TYPES.map(t => (
                    <button key={t.id} onClick={() => handleChange("type", t.id)}
                      style={{ padding: "8px 16px", background: form.type === t.id ? `${t.color}20` : "rgba(6,6,16,.9)", border: `1px solid ${form.type === t.id ? t.color : "rgba(255,255,255,.08)"}`, color: form.type === t.id ? t.color : "#3A4560", fontSize: "12px", cursor: "pointer", transition: "all .2s", transform: form.type === t.id ? "translateY(-2px)" : "none", boxShadow: form.type === t.id ? `0 6px 18px ${t.color}22` : "none", fontFamily: "'Exo 2',sans-serif" }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "9px", letterSpacing: ".2em", color: "#3A4560", textTransform: "uppercase" }}>Message <span style={{ color: "#FF6B35" }}>*</span></label>
                  <span style={{ fontSize: "9px", color: charCount > 900 ? "#FF6B35" : "#3A4560" }}>{charCount}/1000</span>
                </div>
                <textarea value={form.message} onChange={e => handleChange("message", e.target.value)}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  maxLength={1000} rows={5}
                  placeholder="Décris ton projet, tes besoins, ta vision... Plus c'est détaillé, mieux je peux t'aider."
                  style={{ ...inputBase("message"), resize: "vertical", minHeight: "130px", lineHeight: 1.7 }} />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <button onClick={send}
                  disabled={status === "sending" || !form.name || !form.message || !form.type}
                  style={{
                    padding: "14px 32px", fontSize: "12px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
                    cursor: (status === "sending" || !form.name || !form.message || !form.type) ? "not-allowed" : "pointer",
                    border: "none", transition: "all .3s",
                    background: status === "success" ? "linear-gradient(135deg,#10B981,#059669)" : status === "error" ? "#EF4444" : status === "sending" ? "rgba(0,212,255,.5)" : "linear-gradient(135deg,#5865F2,#4752c4)",
                    color: "#fff",
                    opacity: (!form.name || !form.message || !form.type) && status === "idle" ? .5 : 1,
                    boxShadow: status === "success" ? "0 0 30px rgba(16,185,129,.4)" : status === "idle" && form.name && form.message && form.type ? "0 0 24px rgba(88,101,242,.35)" : "none",
                    transform: status === "success" ? "scale(1.02)" : "none",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                  {status === "sending" && <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "rotRing .7s linear infinite" }} />}
                  {status === "success" && "✓"}
                  {status === "error" && "✕"}
                  {status === "sending" ? "Envoi en cours..." : status === "success" ? "Message envoyé !" : status === "error" ? "Erreur — réessaie" : "Envoyer via Discord →"}
                </button>

                {/* Discord badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "rgba(88,101,242,.08)", border: "1px solid rgba(88,101,242,.2)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                  <span style={{ fontSize: "10px", color: "#5865F2", letterSpacing: ".06em" }}>Livré sur Discord</span>
                </div>
              </div>

              {/* Note webhook */}
              {WEBHOOK_URL === "REMPLACE_PAR_TON_WEBHOOK_DISCORD" && (
                <div style={{ padding: "10px 14px", background: "rgba(255,107,53,.06)", border: "1px solid rgba(255,107,53,.2)", fontSize: "11px", color: "#FF6B35", lineHeight: 1.6 }}>
                  ⚠️ Configure ton webhook Discord dans <code style={{ background: "rgba(255,107,53,.15)", padding: "1px 5px" }}>App.jsx</code> — ligne <code style={{ background: "rgba(255,107,53,.15)", padding: "1px 5px" }}>WEBHOOK_URL</code>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM QUOTE */}
        <div style={{ marginTop: "48px", padding: "28px", background: "rgba(255,107,53,.04)", border: "1px solid rgba(255,107,53,.12)", borderLeft: "3px solid #FF6B35", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "13px", fontStyle: "italic", color: "#8892A4", lineHeight: 1.75, marginBottom: "6px" }}>"Créer des bots stylés, fluides et intelligents — ce n'est pas juste un travail, c'est une façon de voir le code comme un art."</p>
            <span style={{ fontSize: "10px", color: "#FF6B35", letterSpacing: ".07em" }}>— ๖̶ζ͜͡Mrex</span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer" style={{ width: "38px", height: "38px", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3A4560", textDecoration: "none", transition: "all .2s" }} onMouseOver={e => { e.currentTarget.style.color = "#E2E8F0"; e.currentTarget.style.borderColor = "rgba(226,232,240,.3)"; }} onMouseOut={e => { e.currentTarget.style.color = "#3A4560"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://sites.google.com/view/sentinelbotfr/sentinel" target="_blank" rel="noreferrer" style={{ width: "38px", height: "38px", border: "1px solid rgba(88,101,242,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#5865F2", textDecoration: "none", transition: "all .2s", background: "rgba(88,101,242,.06)" }} onMouseOver={e => { e.currentTarget.style.background = "rgba(88,101,242,.15)"; }} onMouseOut={e => { e.currentTarget.style.background = "rgba(88,101,242,.06)"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN APP ─────────────── */
export default function App() {
  const [active, setActive] = useState("home");
  const [skillsAnim, setSkillsAnim] = useState(false);
  const [counters, setCounters] = useState({});
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [particles] = useState(() => Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, size: Math.random() * 2 + .5,
    speed: Math.random() * 22 + 12, delay: Math.random() * 14, opacity: Math.random() * .3 + .07
  })));
  const roles = ["Développeur Discord Bots", "Fullstack Web Dev", "Architecte RP Systems", "UI/UX Craftsman"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const c = roles[roleIdx]; let t;
    if (!del) { if (typed.length < c.length) t = setTimeout(() => setTyped(c.slice(0, typed.length + 1)), 78); else t = setTimeout(() => setDel(true), 2200); }
    else { if (typed.length > 0) t = setTimeout(() => setTyped(c.slice(0, typed.length - 1)), 38); else { setDel(false); setRoleIdx(i => (i + 1) % roles.length); } }
    return () => clearTimeout(t);
  }, [typed, del, roleIdx]);

  useEffect(() => {
    if (active === "skills") {
      setTimeout(() => setSkillsAnim(true), 160);
      SKILLS.forEach((sk, i) => {
        let n = 0;
        const iv = setInterval(() => { n += 2; if (n >= sk.level) { n = sk.level; clearInterval(iv); } setCounters(p => ({ ...p, [sk.name]: n })); }, 13 + i * 2);
      });
    } else setSkillsAnim(false);
  }, [active]);

  useEffect(() => {
    const move = e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

useEffect(() => {
  const texts = [
    "Mrex — Portfolio",
    "Développeur Discord",
    "Fullstack Dev",
    "FiveM Architect"
  ];

    let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout;

  const loop = () => {
    const current = texts[index];

    // ✅ IMPORTANT → on met +1 ici
    document.title = current.substring(0, charIndex + 1);

    if (!isDeleting) {
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        timeout = setTimeout(loop, 1500);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
      }
    }

    timeout = setTimeout(loop, isDeleting ? 40 : 90);
  };

  loop();

  return () => clearTimeout(timeout);
}, []);
  
  const go = s => setActive(s);

  const circuitSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><circle cx='40' cy='40' r='1.5' fill='%2300D4FF' opacity='.4'/><path d='M40 40 L60 40 L60 20' stroke='%2300D4FF' stroke-width='.4' fill='none' opacity='.18'/><path d='M40 40 L20 40 L20 60' stroke='%2300D4FF' stroke-width='.4' fill='none' opacity='.18'/><circle cx='60' cy='20' r='2' fill='none' stroke='%2300D4FF' stroke-width='.4' opacity='.25'/><circle cx='20' cy='60' r='2' fill='none' stroke='%2300D4FF' stroke-width='.4' opacity='.25'/></svg>`;
  const hexSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='52'><polygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%23FF6B35' stroke-width='.4' opacity='.14'/></svg>`;
  const diagSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 40 L40 0' stroke='%238B5CF6' stroke-width='.4' opacity='.14'/></svg>`;
  const dotSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='2' cy='2' r='1' fill='%2310B981' opacity='.22'/></svg>`;

  const paralaxStyle = { transform: `translate(${mouse.x * -18}px, ${mouse.y * -12}px)`, transition: "transform .3s ease-out" };
  const paralaxStyleSlow = { transform: `translate(${mouse.x * -8}px, ${mouse.y * -6}px)`, transition: "transform .5s ease-out" };

  return (
    <div style={{ fontFamily: "'Exo 2','Segoe UI',sans-serif", background: "#05050E", color: "#E2E8F0", minHeight: "100vh", display: "flex", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-8px) rotate(.5deg)}66%{transform:translateY(-4px) rotate(-.5deg)}}
        @keyframes scanline{0%{top:-10%}100%{top:110%}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes rotRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes rotRingRev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
        @keyframes ptcl{0%{transform:translateY(0);opacity:0}8%{opacity:1}92%{opacity:.6}100%{transform:translateY(-100vh);opacity:0}}
        @keyframes cardIn{from{opacity:0;transform:translateY(36px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes numUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowNav{0%,100%{box-shadow:0 0 10px rgba(0,212,255,.18)}50%{box-shadow:0 0 28px rgba(0,212,255,.5)}}
        @keyframes borderAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes slideIn{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes wobble{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
        @keyframes countUp{from{transform:scale(.8) translateY(5px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        @keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-tap-highlight-color:transparent;scroll-behavior:smooth}
        *::-webkit-scrollbar{width:3px}*::-webkit-scrollbar-thumb{background:rgba(0,212,255,.22);border-radius:2px}
        .tk{overflow:hidden;width:100%}.ti{display:flex;width:max-content;animation:ticker 45s linear infinite}.ti:hover{animation-play-state:paused}
        .fu{animation:fadeUp .65s ease both}
        .pi{animation:fadeIn .35s ease both}
        .ci1{animation:cardIn .6s .05s ease both}
        .ci2{animation:cardIn .6s .13s ease both}
        .ci3{animation:cardIn .6s .21s ease both}
        .ci4{animation:cardIn .6s .29s ease both}
        .ci5{animation:cardIn .6s .37s ease both}
        .ci6{animation:cardIn .6s .45s ease both}
        .ci7{animation:cardIn .6s .53s ease both}
        .nb:hover{color:#00D4FF!important;background:rgba(0,212,255,.1)!important;border-color:rgba(0,212,255,.35)!important}
        .btn-c{transition:all .25s}.btn-c:hover{background:#1ae3ff!important;box-shadow:0 0 36px rgba(0,212,255,.55)!important;transform:translateY(-3px) scale(1.02)!important}
        .btn-g{transition:all .25s}.btn-g:hover{border-color:rgba(226,232,240,.4)!important;background:rgba(226,232,240,.08)!important;transform:translateY(-3px)!important}
        .sf{transition:width 1.4s cubic-bezier(.4,0,.2,1)}
        .gcard{background:rgba(10,10,22,.92);border:1px solid rgba(255,255,255,.07);backdropFilter:blur(12px)}
        .tilt-card{transition:transform .4s cubic-bezier(.4,0,.2,1),box-shadow .4s ease}
        /* MOBILE */
        @media(max-width:768px){
          .sb{display:none!important}.bnav{display:flex!important}
          .mc{margin-left:0!important;padding-bottom:72px!important}
          .hw{flex-direction:column-reverse!important;padding:24px 18px 32px!important;min-height:auto!important;gap:20px!important}
          .hr{width:100%!important;align-items:center!important}
          .hl{text-align:center!important}.hl h1{font-size:clamp(42px,13vw,68px)!important}
          .hb{justify-content:center!important}.hs{justify-content:center!important}
          .sp{padding:32px 18px!important}
          .g4{grid-template-columns:1fr 1fr!important}
          .g3{grid-template-columns:1fr!important}
          .g7{grid-template-columns:repeat(4,1fr)!important}
          .sg{grid-template-columns:1fr 1fr!important}
          .cg{grid-template-columns:1fr!important}
          .tg{grid-template-columns:1fr!important}
          .contg{grid-template-columns:1fr!important}
          .qr{flex-direction:column!important;gap:8px!important}
          .st{font-size:clamp(32px,9vw,46px)!important}
          .barea{padding:28px 18px 24px!important;min-height:130px!important}
          .bbt{font-size:clamp(60px,18vw,90px)!important}
        }
        @media(max-width:420px){
          .g4{grid-template-columns:1fr!important}.g7{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>

      {/* ── PARTICLES + BG ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {particles.map(p => <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, bottom: "-4px", width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: "#00D4FF", opacity: p.opacity, animation: `ptcl ${p.speed}s ${p.delay}s linear infinite` }} />)}
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,.05) 0%,transparent 60%)", ...paralaxStyleSlow }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 60%)", ...paralaxStyleSlow }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,.03) 0%,transparent 60%)", ...paralaxStyle }} />
      </div>

      {/* ── SIDEBAR ── */}
      <nav className="sb" style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "72px", background: "rgba(8,8,18,.98)", borderRight: "1px solid rgba(0,212,255,.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 100, backdropFilter: "blur(24px)" }}>
        <div style={{ position: "absolute", top: "18px", width: "40px", height: "40px", border: "1.5px solid #00D4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 900, color: "#00D4FF", animation: "glowNav 3s ease-in-out infinite" }}>M</div>
        {NAV.map(s => (
          <button key={s} className="nb" onClick={() => go(s)} title={NAV_LABELS[s]}
            style={{ width: "46px", height: "46px", border: active === s ? "1px solid rgba(0,212,255,.5)" : "1px solid rgba(255,255,255,.05)", background: active === s ? "rgba(0,212,255,.13)" : "transparent", color: active === s ? "#00D4FF" : "#3A4560", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s", boxShadow: active === s ? "0 0 20px rgba(0,212,255,.28),inset 0 0 12px rgba(0,212,255,.06)" : "none", transform: active === s ? "scale(1.07)" : "scale(1)" }}>
            {NAV_ICONS[s]}
          </button>
        ))}
        <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer" style={{ position: "absolute", bottom: "18px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3A4560", textDecoration: "none", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color = "#E2E8F0"} onMouseOut={e => e.currentTarget.style.color = "#3A4560"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
        </a>
      </nav>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="bnav" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, height: "64px", background: "rgba(6,6,16,.98)", borderTop: "1px solid rgba(0,212,255,.1)", zIndex: 100, backdropFilter: "blur(20px)", alignItems: "center", justifyContent: "space-around", padding: "0 6px" }}>
        {NAV.map(s => (
          <button key={s} onClick={() => go(s)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", background: "none", border: "none", cursor: "pointer", color: active === s ? "#00D4FF" : "#3A4560", transition: "all .2s", padding: "8px 6px", flex: 1 }}>
            {NAV_ICONS[s]}
            <span style={{ fontSize: "8px", letterSpacing: ".04em", textTransform: "uppercase" }}>{s}</span>
          </button>
        ))}
      </nav>

      {/* ══════════════════════════════════ MAIN ══════════════════════════════════ */}
      <main className="mc" style={{ marginLeft: "72px", flex: 1, minHeight: "100vh", position: "relative", zIndex: 1, overflowY: "auto" }}>

        {/* ════════ HOME ════════ */}
        {active === "home" && (
          <div className="pi">
            {/* HERO */}
            <div className="hw" style={{ display: "flex", alignItems: "center", padding: "56px 80px 48px", gap: "40px", position: "relative", overflow: "hidden", minHeight: "520px" }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: .18, filter: "saturate(.5)", ...paralaxStyle }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(5,5,14,.98) 0%,rgba(5,5,14,.8) 55%,rgba(5,5,14,.1) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 40%,rgba(5,5,14,1) 100%)" }} />
              </div>
              {/* LEFT */}
              <div className="hl fu" style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                  <div style={{ padding: "4px 14px", border: "1px solid #FF6B35", fontSize: "10px", letterSpacing: ".35em", textTransform: "uppercase", color: "#FF6B35", fontWeight: 700, boxShadow: "0 0 16px rgba(255,107,53,.35)", animation: "wobble 4s 2s ease-in-out infinite" }}>S — RANK</div>
                  <span style={{ fontSize: "10px", letterSpacing: ".2em", color: "#3A4560", textTransform: "uppercase" }}>Developer A.K.A</span>
                </div>
                <h1 style={{ fontSize: "clamp(48px,7vw,100px)", fontWeight: 900, lineHeight: .88, letterSpacing: "-.03em", marginBottom: "8px", background: "linear-gradient(130deg,#E2E8F0 10%,rgba(0,212,255,.6) 50%,rgba(226,232,240,.4) 100%)", backgroundSize: "200% 200%", animation: "gradMove 6s ease infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>๖̶ζ͜͡Mrex</h1>
                <div style={{ height: "34px", display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ color: "#00D4FF", fontSize: "16px", fontWeight: 300, letterSpacing: ".05em" }}>
                    {typed}<span style={{ display: "inline-block", width: "2px", height: "16px", background: "#00D4FF", marginLeft: "2px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
                  </span>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.85, color: "#8892A4", marginBottom: "10px", maxWidth: "440px" }}>
                  Je suis <span style={{ color: "#E2E8F0", fontWeight: 500 }}>Mrex</span>, développeur passionné spécialisé dans les <span style={{ color: "#5865F2" }}>bots Discord</span>, les <span style={{ color: "#F59E0B" }}>systèmes FiveM RP</span> et le <span style={{ color: "#61DAFB" }}>développement web</span>.
                </p>
                <p style={{ fontSize: "13px", lineHeight: 1.75, color: "#5A6478", marginBottom: "28px", maxWidth: "420px" }}>
                  Depuis 2022, je construis des expériences numériques immersives — des bots qui protègent des milliers de serveurs, des scripts RP qui font vivre des aventures, des interfaces qui marquent.
                </p>
                <div className="hb" style={{ display: "flex", gap: "12px", marginBottom: "36px", flexWrap: "wrap" }}>
                  <button className="btn-c" onClick={() => go("projects")} style={{ padding: "12px 26px", background: "#00D4FF", color: "#05050E", border: "none", fontSize: "12px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer", boxShadow: "0 0 22px rgba(0,212,255,.28)" }}>Voir les projets →</button>
                  <button className="btn-g" onClick={() => go("contact")} style={{ padding: "12px 26px", background: "transparent", color: "#E2E8F0", border: "1px solid rgba(226,232,240,.18)", fontSize: "12px", fontWeight: 400, letterSpacing: ".12em", textTransform: "uppercase", cursor: "pointer" }}>Me contacter</button>
                </div>
                <div className="hs" style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                  {[{ num: "6+", label: "Bots déployés" }, { num: "2022", label: "Depuis" }, { num: "7", label: "Technos" }, { num: "∞", label: "Passion" }].map((s, i) => (
                    <div key={s.label} style={{ animation: `numUp .5s ${i * .1}s ease both` }}>
                      <div style={{ fontSize: "26px", fontWeight: 800, color: "#00D4FF", lineHeight: 1 }}>{s.num}</div>
                      <div style={{ fontSize: "9px", letterSpacing: ".18em", color: "#3A4560", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* RIGHT */}
              <div className="hr" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", flexShrink: 0, position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", inset: "-14px", borderRadius: "50%", border: "1px solid rgba(0,212,255,.16)", animation: "rotRing 8s linear infinite" }} />
                  <div style={{ position: "absolute", inset: "-26px", borderRadius: "50%", border: "1px dashed rgba(255,107,53,.1)", animation: "rotRingRev 14s linear infinite" }} />
                  <div style={{ width: "180px", height: "180px", borderRadius: "50%", border: "1.5px solid rgba(0,212,255,.3)", overflow: "hidden", boxShadow: "0 0 40px rgba(0,212,255,.14)", animation: "float 6s ease-in-out infinite", position: "relative" }}>
                    <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="Mrex" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", left: 0, right: 0, height: "8%", background: "linear-gradient(transparent,rgba(0,212,255,.08),transparent)", animation: "scanline 3.5s linear infinite", pointerEvents: "none" }} />
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "14px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: ".2em", color: "#3A4560", textTransform: "uppercase", marginBottom: "6px" }}>MREXDEV</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981", animation: "pulse 2s ease-in-out infinite" }} />
                    <span style={{ fontSize: "11px", color: "#10B981", letterSpacing: ".1em" }}>Open to work</span>
                  </div>
                </div>
                <div style={{ padding: "10px 14px", background: "rgba(255,107,53,.06)", border: "1px solid rgba(255,107,53,.22)", display: "flex", alignItems: "center", gap: "10px", width: "180px" }}>
                  <div style={{ width: "30px", height: "30px", border: "1.5px solid #FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 900, color: "#FF6B35", boxShadow: "0 0 10px rgba(255,107,53,.3)", flexShrink: 0 }}>S</div>
                  <div><div style={{ fontSize: "8px", letterSpacing: ".2em", color: "#FF6B35", textTransform: "uppercase" }}>S-Rank Developer</div><div style={{ fontSize: "11px", color: "#8892A4", marginTop: "1px" }}>Bot Architect</div></div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="sp" style={{ padding: "0 80px 40px" }}>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "9px", letterSpacing: ".3em", color: "#3A4560", textTransform: "uppercase", marginBottom: "6px" }}>// ce que je construis</div>
                <p style={{ fontSize: "14px", color: "#5A6478", maxWidth: "600px" }}>Des solutions sur mesure pour chaque besoin — de la protection de serveur aux expériences RP immersives.</p>
              </div>
              <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
                {SERVICES.map((s, i) => (
                  <TiltCard key={s.title} className={`ci${i + 1}`} style={{ padding: "24px 20px", background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderTop: `2px solid ${s.color}` }}>
                    <div style={{ position: "absolute", right: "-8px", bottom: "-12px", fontSize: "70px", opacity: .04, pointerEvents: "none", lineHeight: 1 }}>{s.icon}</div>
                    <div style={{ fontSize: "26px", marginBottom: "12px" }}>{s.icon}</div>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px", color: "#E2E8F0" }}>{s.title}</h3>
                    <p style={{ fontSize: "11px", color: "#8892A4", lineHeight: 1.7, marginBottom: "14px" }}>{s.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {s.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                          <span style={{ fontSize: "10px", color: "#5A6478" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* FEATURED */}
            <div className="sp" style={{ padding: "0 80px 40px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "9px", letterSpacing: ".3em", color: "#3A4560", textTransform: "uppercase", marginBottom: "6px" }}>// projets phares</div>
                  <p style={{ fontSize: "13px", color: "#5A6478" }}>Les projets qui ont le plus d'impact sur les communautés.</p>
                </div>
                <button onClick={() => go("projects")} style={{ fontSize: "11px", color: "#00D4FF", background: "none", border: "1px solid rgba(0,212,255,.2)", cursor: "pointer", padding: "6px 14px", transition: "all .2s" }} onMouseOver={e => { e.currentTarget.style.background = "rgba(0,212,255,.08)"; }} onMouseOut={e => { e.currentTarget.style.background = "none"; }}>Tous les projets →</button>
              </div>
              <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                {PROJECTS.filter(p => p.rank === "S" || p.name === "Parlon!").slice(0, 3).map((p, i) => (
                  <TiltCard key={p.name} className={`ci${i + 1}`} style={{ background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}>
                    <div style={{ height: "70px", background: `linear-gradient(135deg,${p.color}25,rgba(10,10,22,.7))`, borderBottom: `1px solid ${p.color}22`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px 12px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "90px", height: "90px", borderRadius: "50%", background: `radial-gradient(circle,${p.color}30,transparent 70%)` }} />
                      <div><div style={{ fontSize: "9px", color: `${p.color}aa`, letterSpacing: ".15em", marginBottom: "2px" }}>{p.year}</div><h3 style={{ fontSize: "16px", fontWeight: 800, color: "#E2E8F0" }}>{p.name}</h3></div>
                      <div style={{ width: "30px", height: "30px", border: `2px solid ${RANK_COLORS[p.rank]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: RANK_COLORS[p.rank], boxShadow: `0 0 14px ${RANK_COLORS[p.rank]}55` }}>{p.rank}</div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <p style={{ fontSize: "11px", color: "#5A6478", lineHeight: 1.7, marginBottom: "12px" }}>{p.short}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                        {p.tags.map(t => <span key={t} style={{ fontSize: "9px", padding: "2px 7px", background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}28` }}>{t}</span>)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 5px #10B981" }} />
                          <span style={{ fontSize: "9px", color: "#10B981", letterSpacing: ".12em" }}>LIVE · {p.users}</span>
                        </div>
                        {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "10px", color: "#00D4FF", textDecoration: "none" }}>Voir →</a>}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* STACK */}
            <div className="sp" style={{ padding: "0 80px 36px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ fontSize: "9px", letterSpacing: ".3em", color: "#3A4560", textTransform: "uppercase" }}>// stack technique</div>
                <button onClick={() => go("skills")} style={{ fontSize: "11px", color: "#00D4FF", background: "none", border: "none", cursor: "pointer" }}>Détails →</button>
              </div>
              <div className="g7" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "10px" }}>
                {SKILLS.map(sk => (
                  <div key={sk.name} style={{ padding: "14px 10px", background: "rgba(10,10,22,.9)", border: `1px solid ${sk.color}20`, display: "flex", flexDirection: "column", alignItems: "center", gap: "7px", cursor: "default", transition: "all .25s", backdropFilter: "blur(6px)" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = sk.color + "55"; e.currentTarget.style.background = `${sk.color}09`; e.currentTarget.style.transform = "translateY(-4px) scale(1.03)"; e.currentTarget.style.boxShadow = `0 10px 24px ${sk.color}20`; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = sk.color + "20"; e.currentTarget.style.background = "rgba(10,10,22,.9)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ width: "34px", height: "34px", background: `${sk.color}18`, border: `1px solid ${sk.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 800, color: sk.color }}>{sk.icon}</div>
                    <div style={{ fontSize: "9px", color: "#8892A4", textAlign: "center", lineHeight: 1.2 }}>{sk.name}</div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: sk.color }}>{sk.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "13px 0", background: "rgba(8,8,18,.8)" }}>
              <div className="tk"><div className="ti">
                {[...TICKER, ...TICKER].map((item, i) => (
                  <span key={i} style={{ fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", color: i % 3 === 0 ? "#00D4FF" : i % 3 === 1 ? "#FF6B35" : "#1C1C2E", padding: "0 22px", whiteSpace: "nowrap" }}>
                    {item}<span style={{ color: "#0E0E1E", marginLeft: "22px" }}>◆</span>
                  </span>
                ))}
              </div></div>
            </div>
            <div className="qr sp" style={{ padding: "22px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
              <div style={{ borderLeft: "2px solid rgba(0,212,255,.2)", paddingLeft: "14px" }}>
                <p style={{ fontSize: "12px", fontStyle: "italic", color: "#3A4560" }}>"Créer des bots stylés, fluides et intelligents, c'est mon métier."</p>
                <span style={{ fontSize: "10px", color: "#00D4FF" }}>— ๖̶ζ͜͡Mrex</span>
              </div>
              <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer" style={{ fontSize: "10px", color: "#1A1A2C", letterSpacing: ".1em", fontFamily: "monospace", textDecoration: "none" }}>github.com/Mrexdev</a>
            </div>
          </div>
        )}

        {/* ════════ SKILLS ════════ */}
        {active === "skills" && (
          <div className="pi">
            <div className="barea" style={{ position: "relative", overflow: "hidden", minHeight: "220px", padding: "50px 80px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ position: "absolute", inset: 0, background: `url("data:image/svg+xml,${encodeURIComponent(circuitSvg)}") repeat`, backgroundSize: "80px 80px", ...paralaxStyleSlow }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,212,255,.12) 0%,rgba(5,5,14,.95) 65%,rgba(5,5,14,1) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)" }} />
              <div className="bbt" style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", fontSize: "180px", fontWeight: 900, color: "#00D4FF", opacity: .05, pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>SKILLS</div>
              <div style={{ position: "absolute", top: "-30%", left: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,212,255,.1) 0%,transparent 70%)", ...paralaxStyle }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 14px", border: "1px solid rgba(0,212,255,.3)", marginBottom: "10px", background: "rgba(0,212,255,.06)" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00D4FF", animation: "pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "9px", letterSpacing: ".35em", color: "#00D4FF", textTransform: "uppercase" }}>skills.exe — analyse en cours</span>
                </div>
                <h2 className="st fu" style={{ fontSize: "62px", fontWeight: 900, lineHeight: .9, color: "#E2E8F0", marginBottom: "10px" }}>Compétences</h2>
                <p style={{ fontSize: "14px", color: "#5A6478", maxWidth: "500px" }}>7 technologies maîtrisées, des centaines de projets construits. Chaque outil a été choisi pour sa puissance et sa pertinence.</p>
                <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,#00D4FF,transparent)", marginTop: "14px" }} />
              </div>
            </div>

            <div className="sp" style={{ padding: "44px 80px" }}>
              {/* Intro text */}
              <div style={{ marginBottom: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#E2E8F0", marginBottom: "10px" }}>Mon approche technique</h3>
                  <p style={{ fontSize: "13px", color: "#5A6478", lineHeight: 1.85 }}>Je crois que la maîtrise technique est le socle de tout projet réussi. Chaque technologie que j'utilise, je l'ai apprise en la pratiquant sur de vrais projets — pas juste des tutoriels. Du bot Discord avec 10 000 membres à l'interface FiveM vue par des milliers de joueurs.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#E2E8F0", marginBottom: "10px" }}>Spécialité Discord & RP</h3>
                  <p style={{ fontSize: "13px", color: "#5A6478", lineHeight: 1.85 }}>Discord.js et Lua/FiveM sont mes spécialités absolues. J'ai construit des systèmes de sécurité qui protègent des communautés de milliers de membres, des scripts RP qui créent des expériences de jeu uniques. C'est mon terrain de jeu naturel.</p>
                </div>
              </div>

              <div className="sg" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "40px" }}>
                {SKILLS.map((sk, i) => (
                  <TiltCard key={sk.name} className={`ci${Math.min(i + 1, 7)}`} style={{ padding: "22px", background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderTop: `2px solid ${sk.color}` }}>
                    <div style={{ position: "absolute", right: "-6px", bottom: "-12px", fontSize: "74px", fontWeight: 900, color: sk.color, opacity: .04, lineHeight: 1, pointerEvents: "none" }}>{sk.level}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div style={{ width: "38px", height: "38px", background: `${sk.color}18`, border: `1px solid ${sk.color}45`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: sk.color }}>{sk.icon}</div>
                      <div style={{ fontSize: "20px", fontWeight: 800, color: sk.color, animation: "countUp .4s ease both" }}>{counters[sk.name] || 0}%</div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#E2E8F0", marginBottom: "2px" }}>{sk.name}</div>
                    <div style={{ fontSize: "10px", color: "#3A4560", marginBottom: "14px" }}>{sk.desc}</div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,.06)", borderRadius: "2px", overflow: "hidden" }}>
                      <div className="sf" style={{ height: "100%", width: skillsAnim ? `${sk.level}%` : "0%", background: `linear-gradient(90deg,${sk.color},${sk.color}77)`, transition: `width ${.9 + i * .1}s cubic-bezier(.4,0,.2,1)`, boxShadow: `0 0 8px ${sk.color}55` }} />
                    </div>
                  </TiltCard>
                ))}
              </div>

              <div className="cg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
                {[
                  { title: "Backend", desc: "Le moteur de mes projets. Node.js pour les serveurs, MySQL pour la persistance, Discord.js pour tout ce qui touche à l'API Discord. Des architectures modulaires et robustes.", items: ["Node.js", "Express.js", "MySQL", "Discord.js", "REST APIs"], color: "#00D4FF", icon: "⚙️" },
                  { title: "Frontend", desc: "Les interfaces que les utilisateurs voient et vivent. React pour les applications dynamiques, HTML/CSS pour des designs qui impressionnent sur tous les écrans.", items: ["React", "HTML5", "CSS3", "Responsive", "Animations"], color: "#8B5CF6", icon: "🎨" },
                  { title: "Spécialisé", desc: "Ma différence. Lua pour FiveM, l'API Discord en profondeur, les systèmes RP complexes. Des compétences rares que peu de développeurs maîtrisent.", items: ["Lua/FiveM", "Discord API", "Bots RP", "GTA Systems"], color: "#FF6B35", icon: "🎮" },
                ].map((cat, i) => (
                  <TiltCard key={cat.title} className={`ci${i + 1}`} style={{ padding: "28px", background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderLeft: `3px solid ${cat.color}` }}>
                    <div style={{ position: "absolute", top: "-18px", right: "-14px", fontSize: "88px", opacity: .04, pointerEvents: "none" }}>{cat.icon}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                      <span style={{ fontSize: "10px", letterSpacing: ".25em", color: cat.color, textTransform: "uppercase", fontWeight: 700 }}>{cat.title}</span>
                    </div>
                    <div style={{ width: "40px", height: "2px", background: `linear-gradient(90deg,${cat.color},transparent)`, marginBottom: "12px" }} />
                    <p style={{ fontSize: "12px", color: "#5A6478", lineHeight: 1.7, marginBottom: "16px" }}>{cat.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                      {cat.items.map(item => <span key={item} style={{ fontSize: "11px", padding: "4px 10px", background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}28` }}>{item}</span>)}
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════ PROJECTS ════════ */}
        {active === "projects" && (
          <div className="pi">
            <div className="barea" style={{ position: "relative", overflow: "hidden", minHeight: "220px", padding: "50px 80px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ position: "absolute", inset: 0, background: `url("data:image/svg+xml,${encodeURIComponent(hexSvg)}") repeat`, backgroundSize: "60px 52px", ...paralaxStyleSlow }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,107,53,.12) 0%,rgba(5,5,14,.95) 65%,rgba(5,5,14,1) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)" }} />
              <div className="bbt" style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", fontSize: "155px", fontWeight: 900, color: "#FF6B35", opacity: .05, pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>PROJECTS</div>
              <div style={{ position: "absolute", top: "-20%", right: "25%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,53,.1) 0%,transparent 70%)", ...paralaxStyle }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 14px", border: "1px solid rgba(255,107,53,.3)", marginBottom: "10px", background: "rgba(255,107,53,.06)" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B35", animation: "pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "9px", letterSpacing: ".35em", color: "#FF6B35", textTransform: "uppercase" }}>projects.log — {PROJECTS.length} projets actifs</span>
                </div>
                <h2 className="st fu" style={{ fontSize: "62px", fontWeight: 900, lineHeight: .9, color: "#E2E8F0", marginBottom: "10px" }}>Projets</h2>
                <p style={{ fontSize: "14px", color: "#5A6478", maxWidth: "520px" }}>Chaque projet raconte une histoire — un problème rencontré, une solution construite, une communauté améliorée.</p>
                <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,#FF6B35,transparent)", marginTop: "14px" }} />
              </div>
            </div>

            <div className="sp" style={{ padding: "44px 80px" }}>
              <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "22px" }}>
                {PROJECTS.map((p, i) => (
                  <TiltCard key={p.name} className={`ci${Math.min(i + 1, 6)}`} style={{ background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", overflow: "hidden" }}
                    onMouseOver={e => { e.currentTarget.style.boxShadow = `0 28px 60px ${p.color}1A`; }}
                    onMouseOut={e => { e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ height: "90px", background: `linear-gradient(135deg,${p.color}28 0%,rgba(10,10,22,.8) 100%)`, borderBottom: `1px solid ${p.color}22`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 24px 14px", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: "-25px", right: "-25px", width: "110px", height: "110px", borderRadius: "50%", background: `radial-gradient(circle,${p.color}35,transparent 70%)` }} />
                      <div style={{ position: "absolute", top: "12px", left: "24px", fontSize: "9px", color: `${p.color}88`, letterSpacing: ".18em" }}>{p.year} · {p.short}</div>
                      <div><h3 style={{ fontSize: "20px", fontWeight: 800, color: "#E2E8F0" }}>{p.name}</h3></div>
                      <div style={{ width: "38px", height: "38px", border: `2px solid ${RANK_COLORS[p.rank]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 900, color: RANK_COLORS[p.rank], boxShadow: `0 0 16px ${RANK_COLORS[p.rank]}55`, background: `${RANK_COLORS[p.rank]}10` }}>{p.rank}</div>
                    </div>
                    <div style={{ padding: "20px 24px" }}>
                      <p style={{ fontSize: "13px", color: "#5A6478", lineHeight: 1.75, marginBottom: "16px" }}>{p.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
                        {p.tags.map(t => <span key={t} style={{ fontSize: "9px", padding: "3px 9px", background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}28` }}>{t}</span>)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
                          <span style={{ fontSize: "9px", color: "#10B981", letterSpacing: ".12em" }}>LIVE · {p.users} utilisateurs</span>
                        </div>
                        {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: "#00D4FF", textDecoration: "none", padding: "5px 12px", border: "1px solid rgba(0,212,255,.2)", background: "rgba(0,212,255,.06)", transition: "all .2s" }} onMouseOver={e => { e.currentTarget.style.background = "rgba(0,212,255,.15)"; }} onMouseOut={e => { e.currentTarget.style.background = "rgba(0,212,255,.06)"; }}>Voir →</a>}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════ TIMELINE ════════ */}
        {active === "timeline" && (
          <div className="pi">
            <div className="barea" style={{ position: "relative", overflow: "hidden", minHeight: "220px", padding: "50px 80px 44px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ position: "absolute", inset: 0, background: `url("data:image/svg+xml,${encodeURIComponent(diagSvg)}") repeat`, backgroundSize: "40px 40px", ...paralaxStyleSlow }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(139,92,246,.12) 0%,rgba(5,5,14,.95) 65%,rgba(5,5,14,1) 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)" }} />
              <div className="bbt" style={{ position: "absolute", right: "-10px", top: "50%", transform: "translateY(-50%)", fontSize: "145px", fontWeight: 900, color: "#8B5CF6", opacity: .05, pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>TIMELINE</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 14px", border: "1px solid rgba(139,92,246,.3)", marginBottom: "10px", background: "rgba(139,92,246,.06)" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8B5CF6", animation: "pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "9px", letterSpacing: ".35em", color: "#8B5CF6", textTransform: "uppercase" }}>history.log — 2022 → présent</span>
                </div>
                <h2 className="st fu" style={{ fontSize: "62px", fontWeight: 900, lineHeight: .9, color: "#E2E8F0", marginBottom: "10px" }}>Timeline</h2>
                <p style={{ fontSize: "14px", color: "#5A6478", maxWidth: "500px" }}>3 ans de code, de bugs, d'apprentissage et de projets qui ont changé des communautés entières.</p>
                <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg,#8B5CF6,transparent)", marginTop: "14px" }} />
              </div>
            </div>

            <div className="sp" style={{ padding: "44px 80px" }}>
              <div className="tg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px", maxWidth: "960px" }}>
                {TIMELINE.map((item, i) => (
                  <TiltCard key={item.year} className={`ci${i + 1}`} style={{ padding: "32px", background: "rgba(10,10,22,.92)", border: "1px solid rgba(255,255,255,.07)", borderLeft: `3px solid ${item.color}`, overflow: "hidden" }}>
                    <div style={{ position: "absolute", right: "-6px", bottom: "-14px", fontSize: "90px", fontWeight: 900, color: item.color, opacity: .04, lineHeight: 1, pointerEvents: "none" }}>{item.year}</div>
                    <div style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px", border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", background: `${item.color}08` }}>{item.icon}</div>
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "9px", letterSpacing: ".22em", color: item.color, textTransform: "uppercase", fontWeight: 700, marginBottom: "2px" }}>{item.year}</div>
                      <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#E2E8F0", paddingRight: "48px", lineHeight: 1.2 }}>{item.title}</h3>
                      <div style={{ fontSize: "12px", color: `${item.color}99`, marginTop: "3px" }}>{item.subtitle}</div>
                    </div>
                    <div style={{ width: "100%", height: "1px", background: `linear-gradient(90deg,${item.color}55,transparent)`, marginBottom: "16px" }} />
                    <p style={{ fontSize: "13px", color: "#5A6478", lineHeight: 1.8, marginBottom: "18px" }}>{item.desc}</p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", background: `${item.color}10`, border: `1px solid ${item.color}28` }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: item.color }} />
                      <span style={{ fontSize: "9px", color: item.color, letterSpacing: ".08em" }}>{item.detail}</span>
                    </div>
                  </TiltCard>
                ))}
                {/* Future */}
                <TiltCard className="ci5" style={{ padding: "30px", background: "rgba(10,10,22,.6)", border: "1px dashed rgba(255,255,255,.07)", gridColumn: "span 2", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "52px", height: "52px", border: "1.5px dashed rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>✨</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", letterSpacing: ".22em", color: "#3A4560", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>En cours — 2025 et au-delà</div>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#3A4560", marginBottom: "8px" }}>L'intelligence au service du code</h3>
                      <p style={{ fontSize: "13px", color: "#3A4560", lineHeight: 1.75 }}>IA conversationnelle avec mémoire persistante, détection de comportements suspects en temps réel, systèmes de sauvegarde intelligents. Le futur des bots Discord, c'est maintenant.</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        )}

        {/* ════════ CONTACT ════════ */}
        {active === "contact" && <ContactSection paralaxStyleSlow={paralaxStyleSlow} paralaxStyle={paralaxStyle} dotSvg={dotSvg} />}
      </main>
    </div>
  );
}
