import { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "JavaScript", level: 90, color: "#F7DF1E", icon: "JS", desc: "ES6+, async/await, DOM" },
  { name: "Discord.js", level: 93, color: "#5865F2", icon: "DJ", desc: "Bots, slash commands" },
  { name: "Node.js", level: 88, color: "#339933", icon: "NJ", desc: "API REST, serveurs" },
  { name: "HTML/CSS", level: 95, color: "#E34F26", icon: "HC", desc: "Responsive, animations" },
  { name: "React", level: 80, color: "#61DAFB", icon: "RE", desc: "Hooks, SPA, composants" },
  { name: "MySQL", level: 75, color: "#0F6AB4", icon: "MY", desc: "BDD, requêtes, ORM" },
  { name: "Lua/FiveM", level: 72, color: "#7C3AED", icon: "LU", desc: "Scripts RP, NUI" },
];

const PROJECTS = [
  { name: "Sentinel", desc: "Système anti-raid/anti-spam avec Blacklist Globale inter-serveurs. Protection avancée pour serveurs Discord.", tags: ["Discord.js", "MySQL", "Node.js"], rank: "S", color: "#FF6B35", link: "https://sites.google.com/view/sentinelbotfr/sentinel", year: "2023" },
  { name: "InfraBot", desc: "Backups automatiques, interface privée, logs personnalisés. Infrastructure Discord haut niveau.", tags: ["Node.js", "MySQL"], rank: "A", color: "#00D4FF", year: "2023" },
  { name: "Arcadia", desc: "Mini-jeux interactifs avec système de récompenses et progression des joueurs.", tags: ["Discord.js", "JavaScript"], rank: "A", color: "#8B5CF6", year: "2024" },
  { name: "Parlon!", desc: "Support anonyme avec tickets sécurisés et interface enrichie pour Discord.", tags: ["Discord.js", "MySQL", "Node.js"], rank: "A", color: "#10B981", year: "2024" },
  { name: "WitchyBot", desc: "Expérience mystique pour événements RP avec ambiance et immersion totale.", tags: ["JavaScript", "Discord.js"], rank: "B", color: "#EC4899", year: "2023" },
  { name: "GTA FiveM", desc: "Commandes RP avancées, gestion emplois, modes immersifs (/panicmode).", tags: ["Lua", "FiveM"], rank: "S", color: "#F59E0B", year: "2022" },
];

const TIMELINE = [
  { year: "2022", title: "Premiers projets RP", desc: "Scripts FiveM & premiers bots Discord.", color: "#8B5CF6", icon: "🎮", side: "left" },
  { year: "2023", title: "Systèmes avancés", desc: "Anti-raid, économie RP, handlers modulaires.", color: "#00D4FF", icon: "⚙️", side: "right" },
  { year: "2024", title: "Automatisations & UI", desc: "Interfaces animées, infrastructure avancée.", color: "#FF6B35", icon: "🚀", side: "left" },
  { year: "2025", title: "IA & Intelligence", desc: "Bots intelligents, détection comportementale.", color: "#10B981", icon: "🧠", side: "right" },
];

const SERVICES = [
  { icon: "🤖", title: "Bots Discord", desc: "Slash commands, anti-raid, économie RP, tickets.", color: "#5865F2" },
  { icon: "🎮", title: "Scripts FiveM", desc: "Commandes RP, gestion joueurs, modes immersifs.", color: "#F59E0B" },
  { icon: "🌐", title: "Sites Web", desc: "React, Node.js, responsive & moderne.", color: "#00D4FF" },
  { icon: "🛡️", title: "Sécurité", desc: "Anti-spam, blacklist globale, audit logs.", color: "#FF6B35" },
];

const TICKER = ["JavaScript","Node.js","Discord.js","React","MySQL","Lua","FiveM","HTML5","CSS3","REST API","Git","Bots Discord","GTA RP","Slash Commands","UI/UX"];
const RANK_COLORS = { S: "#FF6B35", A: "#00D4FF", B: "#8B5CF6", C: "#10B981" };
const NAV = ["home","skills","projects","timeline","contact"];

const NAV_ICONS = {
  home:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>,
  skills:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  projects:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  timeline:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  contact:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

export default function App() {
  const [active, setActive] = useState("home");
  const [skillsAnim, setSkillsAnim] = useState(false);
  const [counters, setCounters] = useState({});
  const [particles] = useState(() => Array.from({length:30},(_,i)=>({
    id:i, x:Math.random()*100, size:Math.random()*2+.5,
    speed:Math.random()*20+15, delay:Math.random()*12, opacity:Math.random()*.35+.08
  })));
  const roles = ["Développeur Discord Bots","Fullstack Web Dev","Architecte RP Systems","UI/UX Craftsman"];
  const [roleIdx,setRoleIdx]=useState(0);
  const [typed,setTyped]=useState("");
  const [del,setDel]=useState(false);

  useEffect(()=>{
    const c=roles[roleIdx]; let t;
    if(!del){ if(typed.length<c.length) t=setTimeout(()=>setTyped(c.slice(0,typed.length+1)),80); else t=setTimeout(()=>setDel(true),2200); }
    else{ if(typed.length>0) t=setTimeout(()=>setTyped(c.slice(0,typed.length-1)),40); else{setDel(false);setRoleIdx(i=>(i+1)%roles.length);} }
    return()=>clearTimeout(t);
  },[typed,del,roleIdx]);

  useEffect(()=>{
    if(active==="skills"){
      setTimeout(()=>setSkillsAnim(true),150);
      SKILLS.forEach((sk,i)=>{
        let count=0;
        const iv=setInterval(()=>{ count+=2; if(count>=sk.level){count=sk.level;clearInterval(iv);} setCounters(p=>({...p,[sk.name]:count})); },14+i*2);
      });
    } else setSkillsAnim(false);
  },[active]);

  const go=(s)=>setActive(s);

  // SVG patterns as inline data
  const circuitPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect fill='none' width='80' height='80'/><circle cx='40' cy='40' r='1.5' fill='%2300D4FF' opacity='.4'/><path d='M40 40 L60 40 L60 20' stroke='%2300D4FF' stroke-width='.4' fill='none' opacity='.2'/><path d='M40 40 L20 40 L20 60' stroke='%2300D4FF' stroke-width='.4' fill='none' opacity='.2'/><circle cx='60' cy='20' r='2' fill='none' stroke='%2300D4FF' stroke-width='.4' opacity='.3'/><circle cx='20' cy='60' r='2' fill='none' stroke='%2300D4FF' stroke-width='.4' opacity='.3'/></svg>`;
  const hexPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='52'><polygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%23FF6B35' stroke-width='.4' opacity='.15'/></svg>`;
  const diagPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 40 L40 0' stroke='%238B5CF6' stroke-width='.4' opacity='.15'/></svg>`;
  const dotPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='2' cy='2' r='1' fill='%2310B981' opacity='.25'/></svg>`;

  return (
    <div style={{fontFamily:"'Exo 2','Segoe UI',sans-serif",background:"#05050E",color:"#E2E8F0",minHeight:"100vh",display:"flex",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes scanline{0%{top:-10%}100%{top:110%}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes rotateRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.88);opacity:.55}}
        @keyframes particleUp{0%{transform:translateY(0);opacity:0}10%{opacity:1}90%{opacity:.7}100%{transform:translateY(-100vh);opacity:0}}
        @keyframes cardIn{from{opacity:0;transform:translateY(32px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes numberUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 12px rgba(0,212,255,.2)}50%{box-shadow:0 0 32px rgba(0,212,255,.55)}}
        @keyframes borderSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes bannerShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes lineGrow{from{scaleX:0}to{scaleX:1}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-tap-highlight-color:transparent}
        *::-webkit-scrollbar{width:3px}*::-webkit-scrollbar-thumb{background:rgba(0,212,255,.25);border-radius:2px}
        .tk{overflow:hidden;width:100%}.ti{display:flex;width:max-content;animation:ticker 40s linear infinite}.ti:hover{animation-play-state:paused}
        .fade-up{animation:fadeUp .65s ease both}
        .page-in{animation:fadeIn .3s ease both}
        .card-in-1{animation:cardIn .55s .05s ease both}
        .card-in-2{animation:cardIn .55s .12s ease both}
        .card-in-3{animation:cardIn .55s .19s ease both}
        .card-in-4{animation:cardIn .55s .26s ease both}
        .card-in-5{animation:cardIn .55s .33s ease both}
        .card-in-6{animation:cardIn .55s .4s ease both}
        .glow-border{position:relative;}.glow-border::before{content:'';position:absolute;inset:-1px;background:linear-gradient(135deg,#00D4FF33,transparent,#FF6B3533,transparent,#8B5CF633);border-radius:inherit;z-index:-1;}
        .hover-lift{transition:all .3s cubic-bezier(.4,0,.2,1)}.hover-lift:hover{transform:translateY(-6px)!important}
        .btn-cyan{transition:all .25s}.btn-cyan:hover{background:#1ae3ff!important;box-shadow:0 0 35px rgba(0,212,255,.5)!important;transform:translateY(-2px)!important}
        .btn-ghost:hover{border-color:rgba(226,232,240,.35)!important;background:rgba(226,232,240,.07)!important;transform:translateY(-2px)!important}
        .nav-btn{transition:all .2s}.nav-btn:hover{color:#00D4FF!important;background:rgba(0,212,255,.09)!important;border-color:rgba(0,212,255,.3)!important}
        .skill-fill{transition:width 1.3s cubic-bezier(.4,0,.2,1)}
        /* ═══ MOBILE ═══ */
        @media(max-width:768px){
          .sidebar{display:none!important}.bottom-nav{display:flex!important}
          .main{margin-left:0!important;padding-bottom:72px!important}
          .hero-wrap{flex-direction:column-reverse!important;padding:24px 18px 32px!important;min-height:auto!important;gap:24px!important}
          .hero-right{width:100%!important;align-items:center!important}
          .hero-avatar-wrap{width:130px!important;height:130px!important}
          .hero-left{text-align:center!important}
          .hero-left h1{font-size:clamp(42px,13vw,68px)!important}
          .hero-btns{justify-content:center!important}
          .hero-stats{justify-content:center!important}
          .sp{padding:32px 18px 24px!important}
          .grid4{grid-template-columns:1fr 1fr!important}
          .grid3{grid-template-columns:1fr!important}
          .grid3h{grid-template-columns:1fr!important}
          .grid7{grid-template-columns:repeat(4,1fr)!important}
          .skills-grid{grid-template-columns:1fr 1fr!important}
          .cat-grid{grid-template-columns:1fr!important}
          .tl-wrap{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .quote-row{flex-direction:column!important;gap:8px!important}
          .sec-title{font-size:clamp(32px,9vw,44px)!important}
          .banner-area{padding:28px 18px 24px!important;min-height:140px!important}
          .banner-bg-text{font-size:clamp(64px,20vw,100px)!important;opacity:.04!important}
        }
        @media(max-width:420px){
          .grid4{grid-template-columns:1fr!important}
          .grid7{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>

      {/* ── GLOBAL PARTICLES ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {particles.map(p=>(
          <div key={p.id} style={{position:"absolute",left:`${p.x}%`,bottom:"-5px",width:`${p.size}px`,height:`${p.size}px`,borderRadius:"50%",background:"#00D4FF",opacity:p.opacity,animation:`particleUp ${p.speed}s ${p.delay}s linear infinite`}} />
        ))}
        <div style={{position:"absolute",top:"-20%",left:"-10%",width:"800px",height:"800px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.05) 0%,transparent 60%)"}} />
        <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 60%)"}} />
      </div>

      {/* ── SIDEBAR desktop ── */}
      <nav className="sidebar" style={{position:"fixed",left:0,top:0,bottom:0,width:"72px",background:"rgba(8,8,18,.98)",borderRight:"1px solid rgba(0,212,255,.1)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"8px",zIndex:100,backdropFilter:"blur(24px)"}}>
        <div style={{position:"absolute",top:"18px",width:"40px",height:"40px",border:"1.5px solid #00D4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:900,color:"#00D4FF",animation:"glowPulse 3s ease-in-out infinite"}}>M</div>
        {NAV.map(s=>(
          <button key={s} className="nav-btn" onClick={()=>go(s)} title={s}
            style={{width:"46px",height:"46px",border:active===s?"1px solid rgba(0,212,255,.5)":"1px solid rgba(255,255,255,.05)",background:active===s?"rgba(0,212,255,.13)":"transparent",color:active===s?"#00D4FF":"#3A4560",borderRadius:"10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",boxShadow:active===s?"0 0 18px rgba(0,212,255,.28),inset 0 0 12px rgba(0,212,255,.05)":"none",transform:active===s?"scale(1.06)":"scale(1)"}}>
            {NAV_ICONS[s]}
          </button>
        ))}
        <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer"
          style={{position:"absolute",bottom:"18px",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",color:"#3A4560",textDecoration:"none",transition:"color .2s"}}
          onMouseOver={e=>e.currentTarget.style.color="#E2E8F0"} onMouseOut={e=>e.currentTarget.style.color="#3A4560"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </nav>

      {/* ── BOTTOM NAV mobile ── */}
      <nav className="bottom-nav" style={{display:"none",position:"fixed",bottom:0,left:0,right:0,height:"64px",background:"rgba(6,6,16,.98)",borderTop:"1px solid rgba(0,212,255,.1)",zIndex:100,backdropFilter:"blur(20px)",alignItems:"center",justifyContent:"space-around",padding:"0 6px"}}>
        {NAV.map(s=>(
          <button key={s} onClick={()=>go(s)}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",background:"none",border:"none",cursor:"pointer",color:active===s?"#00D4FF":"#3A4560",transition:"all .2s",padding:"8px 6px",flex:1}}>
            {NAV_ICONS[s]}
            <span style={{fontSize:"8px",letterSpacing:".04em",textTransform:"uppercase"}}>{s}</span>
          </button>
        ))}
      </nav>

      {/* ══════════════════════════════ MAIN ══════════════════════════════ */}
      <main className="main" style={{marginLeft:"72px",flex:1,minHeight:"100vh",position:"relative",zIndex:1,overflowY:"auto"}}>

        {/* ══════ HOME ══════ */}
        {active==="home" && (
          <div className="page-in">
            {/* HERO */}
            <div className="hero-wrap" style={{display:"flex",alignItems:"center",padding:"56px 80px 48px",gap:"40px",position:"relative",overflow:"hidden",minHeight:"520px"}}>
              <div style={{position:"absolute",inset:0,zIndex:0}}>
                <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",opacity:.18,filter:"saturate(.5)"}} />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,rgba(5,5,14,.98) 0%,rgba(5,5,14,.78) 55%,rgba(5,5,14,.12) 100%)"}} />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,rgba(5,5,14,1) 100%)"}} />
              </div>
              <div className="hero-left fade-up" style={{flex:1,position:"relative",zIndex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px",flexWrap:"wrap"}}>
                  <div style={{padding:"4px 14px",border:"1px solid #FF6B35",fontSize:"10px",letterSpacing:".35em",textTransform:"uppercase",color:"#FF6B35",fontWeight:700,boxShadow:"0 0 16px rgba(255,107,53,.35)"}}>S — RANK</div>
                  <span style={{fontSize:"10px",letterSpacing:".2em",color:"#3A4560",textTransform:"uppercase"}}>Developer A.K.A</span>
                </div>
                <h1 style={{fontSize:"clamp(48px,7vw,100px)",fontWeight:900,lineHeight:.88,letterSpacing:"-.03em",marginBottom:"8px",background:"linear-gradient(130deg,#E2E8F0 0%,rgba(226,232,240,.38) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>๖̶ζ͜͡Mrex</h1>
                <div style={{height:"34px",display:"flex",alignItems:"center",marginBottom:"16px"}}>
                  <span style={{color:"#00D4FF",fontSize:"16px",fontWeight:300,letterSpacing:".05em"}}>
                    {typed}<span style={{display:"inline-block",width:"2px",height:"16px",background:"#00D4FF",marginLeft:"2px",verticalAlign:"middle",animation:"blink 1s step-end infinite"}} />
                  </span>
                </div>
                <p style={{fontSize:"14px",lineHeight:1.85,color:"#8892A4",marginBottom:"28px",maxWidth:"420px"}}>
                  Développeur fullstack spécialisé dans les <span style={{color:"#E2E8F0"}}>bots Discord</span>, l'automatisation <span style={{color:"#E2E8F0"}}>RP</span> et les projets immersifs.
                </p>
                <div className="hero-btns" style={{display:"flex",gap:"12px",marginBottom:"36px",flexWrap:"wrap"}}>
                  <button className="btn-cyan" onClick={()=>go("projects")} style={{padding:"12px 26px",background:"#00D4FF",color:"#05050E",border:"none",fontSize:"12px",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",transition:"all .25s",boxShadow:"0 0 22px rgba(0,212,255,.28)"}}>Voir les projets →</button>
                  <button className="btn-ghost" onClick={()=>go("contact")} style={{padding:"12px 26px",background:"transparent",color:"#E2E8F0",border:"1px solid rgba(226,232,240,.15)",fontSize:"12px",fontWeight:400,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",transition:"all .25s"}}>Me contacter</button>
                </div>
                <div className="hero-stats" style={{display:"flex",gap:"32px",flexWrap:"wrap"}}>
                  {[{num:"6+",label:"Bots déployés"},{num:"2022",label:"Depuis"},{num:"7",label:"Technos"},{num:"∞",label:"Passion"}].map((s,i)=>(
                    <div key={s.label} style={{animation:`numberUp .5s ${i*.1}s ease both`}}>
                      <div style={{fontSize:"26px",fontWeight:800,color:"#00D4FF",lineHeight:1}}>{s.num}</div>
                      <div style={{fontSize:"9px",letterSpacing:".18em",color:"#3A4560",textTransform:"uppercase",marginTop:"4px"}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-right fade-up" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",flexShrink:0,position:"relative",zIndex:1}}>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",inset:"-14px",borderRadius:"50%",border:"1px solid rgba(0,212,255,.18)",animation:"rotateRing 8s linear infinite"}} />
                  <div style={{position:"absolute",inset:"-26px",borderRadius:"50%",border:"1px dashed rgba(255,107,53,.1)",animation:"rotateRing 14s linear infinite reverse"}} />
                  <div className="hero-avatar-wrap" style={{width:"180px",height:"180px",borderRadius:"50%",border:"1.5px solid rgba(0,212,255,.3)",overflow:"hidden",boxShadow:"0 0 40px rgba(0,212,255,.15)",animation:"float 6s ease-in-out infinite",position:"relative"}}>
                    <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="Mrex" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                    <div style={{position:"absolute",left:0,right:0,height:"8%",background:"linear-gradient(transparent,rgba(0,212,255,.08),transparent)",animation:"scanline 3.5s linear infinite",pointerEvents:"none"}} />
                  </div>
                </div>
                <div style={{textAlign:"center",marginTop:"14px"}}>
                  <div style={{fontSize:"10px",letterSpacing:".2em",color:"#3A4560",textTransform:"uppercase",marginBottom:"6px"}}>MREXDEV</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
                    <div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px #10B981",animation:"pulse 2s ease-in-out infinite"}} />
                    <span style={{fontSize:"11px",color:"#10B981",letterSpacing:".1em"}}>Open to work</span>
                  </div>
                </div>
                <div style={{padding:"10px 14px",background:"rgba(255,107,53,.06)",border:"1px solid rgba(255,107,53,.22)",display:"flex",alignItems:"center",gap:"10px",width:"180px",backdropFilter:"blur(8px)"}}>
                  <div style={{width:"30px",height:"30px",border:"1.5px solid #FF6B35",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:900,color:"#FF6B35",boxShadow:"0 0 10px rgba(255,107,53,.3)",flexShrink:0}}>S</div>
                  <div><div style={{fontSize:"8px",letterSpacing:".2em",color:"#FF6B35",textTransform:"uppercase"}}>S-Rank Developer</div><div style={{fontSize:"11px",color:"#8892A4",marginTop:"1px"}}>Bot Architect</div></div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="sp" style={{padding:"0 80px 36px"}}>
              <div style={{fontSize:"9px",letterSpacing:".3em",color:"#3A4560",textTransform:"uppercase",marginBottom:"12px"}}>// ce que je fais</div>
              <div className="grid4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px"}}>
                {SERVICES.map((s,i)=>(
                  <div key={s.title} className={`hover-lift card-in-${i+1}`}
                    style={{padding:"22px 18px",background:"rgba(12,12,24,.9)",border:"1px solid rgba(255,255,255,.06)",borderTop:`2px solid ${s.color}`,cursor:"default",backdropFilter:"blur(8px)",position:"relative",overflow:"hidden"}}
                    onMouseOver={e=>{ e.currentTarget.style.background=`linear-gradient(135deg,${s.color}10,rgba(12,12,24,.96))`; e.currentTarget.style.borderColor=s.color+"44"; }}
                    onMouseOut={e=>{ e.currentTarget.style.background="rgba(12,12,24,.9)"; e.currentTarget.style.borderColor="rgba(255,255,255,.06)"; }}>
                    <div style={{position:"absolute",right:"-10px",bottom:"-14px",fontSize:"72px",opacity:.04,pointerEvents:"none"}}>{s.icon}</div>
                    <div style={{fontSize:"24px",marginBottom:"10px"}}>{s.icon}</div>
                    <h3 style={{fontSize:"13px",fontWeight:700,marginBottom:"6px",color:"#E2E8F0"}}>{s.title}</h3>
                    <p style={{fontSize:"11px",color:"#8892A4",lineHeight:1.65}}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURED PROJECTS */}
            <div className="sp" style={{padding:"0 80px 36px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
                <div style={{fontSize:"9px",letterSpacing:".3em",color:"#3A4560",textTransform:"uppercase"}}>// projets phares</div>
                <button onClick={()=>go("projects")} style={{fontSize:"11px",color:"#00D4FF",background:"none",border:"none",cursor:"pointer",letterSpacing:".05em"}} onMouseOver={e=>e.currentTarget.style.opacity=".65"} onMouseOut={e=>e.currentTarget.style.opacity="1"}>Voir tout →</button>
              </div>
              <div className="grid3h" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px"}}>
                {PROJECTS.filter(p=>p.rank==="S"||p.name==="Parlon!").slice(0,3).map((p,i)=>(
                  <div key={p.name} className={`card-in-${i+1}`}
                    style={{background:"rgba(12,12,24,.9)",border:"1px solid rgba(255,255,255,.06)",borderLeft:`3px solid ${p.color}`,position:"relative",overflow:"hidden",cursor:"default",transition:"all .3s cubic-bezier(.4,0,.2,1)",backdropFilter:"blur(8px)"}}
                    onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 20px 50px ${p.color}18`; e.currentTarget.style.borderColor=`rgba(255,255,255,.1)`; }}
                    onMouseOut={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="rgba(255,255,255,.06)"; }}>
                    <div style={{height:"3px",background:`linear-gradient(90deg,${p.color},${p.color}22)`}} />
                    <div style={{padding:"18px 20px"}}>
                      <div style={{position:"absolute",top:"18px",right:"16px",width:"26px",height:"26px",border:`1.5px solid ${RANK_COLORS[p.rank]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:900,color:RANK_COLORS[p.rank],boxShadow:`0 0 10px ${RANK_COLORS[p.rank]}44`}}>{p.rank}</div>
                      <h3 style={{fontSize:"15px",fontWeight:700,marginBottom:"6px",paddingRight:"34px",color:"#E2E8F0"}}>{p.name}</h3>
                      <p style={{fontSize:"11px",color:"#8892A4",lineHeight:1.65,marginBottom:"12px"}}>{p.desc}</p>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"10px"}}>
                        {p.tags.map(t=>(<span key={t} style={{fontSize:"9px",padding:"2px 7px",background:`${p.color}12`,color:p.color,border:`1px solid ${p.color}28`}}>{t}</span>))}
                      </div>
                      {p.link&&<a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#00D4FF",textDecoration:"none"}}>Voir le projet →</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STACK */}
            <div className="sp" style={{padding:"0 80px 36px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
                <div style={{fontSize:"9px",letterSpacing:".3em",color:"#3A4560",textTransform:"uppercase"}}>// stack technique</div>
                <button onClick={()=>go("skills")} style={{fontSize:"11px",color:"#00D4FF",background:"none",border:"none",cursor:"pointer"}} onMouseOver={e=>e.currentTarget.style.opacity=".65"} onMouseOut={e=>e.currentTarget.style.opacity="1"}>Détails →</button>
              </div>
              <div className="grid7" style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"10px"}}>
                {SKILLS.map(sk=>(
                  <div key={sk.name} style={{padding:"14px 10px",background:"rgba(12,12,24,.9)",border:`1px solid ${sk.color}20`,display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",cursor:"default",transition:"all .25s",backdropFilter:"blur(6px)"}}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor=sk.color+"55"; e.currentTarget.style.background=`${sk.color}09`; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 20px ${sk.color}18`; }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor=sk.color+"20"; e.currentTarget.style.background="rgba(12,12,24,.9)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                    <div style={{width:"34px",height:"34px",background:`${sk.color}18`,border:`1px solid ${sk.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",fontWeight:800,color:sk.color}}>{sk.icon}</div>
                    <div style={{fontSize:"9px",color:"#8892A4",textAlign:"center",lineHeight:1.2}}>{sk.name}</div>
                    <div style={{fontSize:"10px",fontWeight:700,color:sk.color}}>{sk.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TICKER */}
            <div style={{borderTop:"1px solid rgba(255,255,255,.04)",borderBottom:"1px solid rgba(255,255,255,.04)",padding:"13px 0",background:"rgba(8,8,18,.8)",backdropFilter:"blur(12px)"}}>
              <div className="tk"><div className="ti">
                {[...TICKER,...TICKER].map((item,i)=>(
                  <span key={i} style={{fontSize:"10px",letterSpacing:".2em",textTransform:"uppercase",color:i%3===0?"#00D4FF":i%3===1?"#FF6B35":"#1E1E32",padding:"0 22px",whiteSpace:"nowrap"}}>
                    {item}<span style={{color:"#101020",marginLeft:"22px"}}>◆</span>
                  </span>
                ))}
              </div></div>
            </div>
            <div className="quote-row sp" style={{padding:"22px 80px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
              <div style={{borderLeft:"2px solid rgba(0,212,255,.2)",paddingLeft:"14px"}}>
                <p style={{fontSize:"12px",fontStyle:"italic",color:"#3A4560"}}>"Créer des bots stylés, fluides et intelligents, c'est mon métier."</p>
                <span style={{fontSize:"10px",color:"#00D4FF",letterSpacing:".07em"}}>— ๖̶ζ͜͡Mrex</span>
              </div>
              <span style={{fontSize:"10px",color:"#1A1A2C",letterSpacing:".1em",fontFamily:"monospace"}}>github.com/Mrexdev</span>
            </div>
          </div>
        )}

        {/* ══════ SKILLS ══════ */}
        {active==="skills" && (
          <div className="page-in">
            {/* BANNER */}
            <div className="banner-area" style={{position:"relative",overflow:"hidden",minHeight:"200px",padding:"50px 80px 40px",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              {/* BG layers */}
              <div style={{position:"absolute",inset:0,background:`url("data:image/svg+xml,${encodeURIComponent(circuitPattern)}") repeat`,backgroundSize:"80px 80px"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,212,255,.12) 0%,rgba(5,5,14,.95) 60%,rgba(5,5,14,1) 100%)"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(5,5,14,.3) 0%,rgba(5,5,14,1) 100%)"}} />
              {/* Big BG text */}
              <div className="banner-bg-text" style={{position:"absolute",right:"-20px",top:"50%",transform:"translateY(-50%)",fontSize:"180px",fontWeight:900,letterSpacing:"-.05em",color:"#00D4FF",opacity:.05,pointerEvents:"none",lineHeight:1,userSelect:"none"}}>SKILLS</div>
              {/* Glow orb */}
              <div style={{position:"absolute",top:"-30%",left:"20%",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.12) 0%,transparent 70%)",pointerEvents:"none"}} />
              {/* Content */}
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"4px 14px",border:"1px solid rgba(0,212,255,.3)",marginBottom:"12px",background:"rgba(0,212,255,.06)"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#00D4FF",animation:"pulse 2s ease-in-out infinite"}} />
                  <span style={{fontSize:"9px",letterSpacing:".35em",color:"#00D4FF",textTransform:"uppercase"}}>skills.exe — chargement</span>
                </div>
                <h2 className="sec-title fade-up" style={{fontSize:"62px",fontWeight:900,lineHeight:.9,color:"#E2E8F0"}}>Compétences</h2>
                <div style={{width:"60px",height:"2px",background:"linear-gradient(90deg,#00D4FF,transparent)",marginTop:"14px"}} />
              </div>
            </div>

            {/* SKILL CARDS */}
            <div className="sp" style={{padding:"40px 80px"}}>
              <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"40px"}}>
                {SKILLS.map((sk,i)=>(
                  <div key={sk.name} className={`card-in-${Math.min(i+1,6)}`}
                    style={{padding:"24px",background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",borderTop:`2px solid ${sk.color}`,position:"relative",overflow:"hidden",cursor:"default",transition:"all .3s cubic-bezier(.4,0,.2,1)",backdropFilter:"blur(10px)"}}
                    onMouseOver={e=>{ e.currentTarget.style.background=`linear-gradient(135deg,${sk.color}12,rgba(10,10,22,.96))`; e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 16px 40px ${sk.color}22`; e.currentTarget.style.borderColor=sk.color+"55"; }}
                    onMouseOut={e=>{ e.currentTarget.style.background="rgba(10,10,22,.92)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; }}>
                    {/* shimmer on hover */}
                    <div style={{position:"absolute",top:0,left:"-100%",width:"60%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",pointerEvents:"none"}} />
                    <div style={{position:"absolute",right:"-6px",bottom:"-14px",fontSize:"76px",fontWeight:900,color:sk.color,opacity:.04,lineHeight:1,pointerEvents:"none"}}>{sk.level}</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
                      <div style={{width:"40px",height:"40px",background:`${sk.color}18`,border:`1px solid ${sk.color}45`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:800,color:sk.color}}>{sk.icon}</div>
                      <div style={{fontSize:"22px",fontWeight:800,color:sk.color,fontVariantNumeric:"tabular-nums"}}>{counters[sk.name]||0}%</div>
                    </div>
                    <div style={{fontSize:"13px",fontWeight:600,color:"#E2E8F0",marginBottom:"3px"}}>{sk.name}</div>
                    <div style={{fontSize:"10px",color:"#3A4560",marginBottom:"14px"}}>{sk.desc}</div>
                    <div style={{height:"3px",background:"rgba(255,255,255,.06)",borderRadius:"2px",overflow:"hidden"}}>
                      <div className="skill-fill" style={{height:"100%",width:skillsAnim?`${sk.level}%`:"0%",background:`linear-gradient(90deg,${sk.color},${sk.color}77)`,transition:`width ${.9+i*.1}s cubic-bezier(.4,0,.2,1)`,boxShadow:`0 0 8px ${sk.color}55`}} />
                    </div>
                  </div>
                ))}
              </div>

              {/* CATEGORIES */}
              <div className="cat-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
                {[
                  {title:"Backend",items:["Node.js","Express.js","MySQL","Discord.js","REST APIs"],color:"#00D4FF",icon:"⚙️"},
                  {title:"Frontend",items:["React","HTML5","CSS3","Responsive","Animations"],color:"#8B5CF6",icon:"🎨"},
                  {title:"Spécialisé",items:["Lua/FiveM","Discord API","Bots RP","GTA Systems"],color:"#FF6B35",icon:"🎮"},
                ].map((cat,i)=>(
                  <div key={cat.title} className={`card-in-${i+1}`}
                    style={{padding:"28px",background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",borderLeft:`3px solid ${cat.color}`,position:"relative",overflow:"hidden",backdropFilter:"blur(10px)",cursor:"default",transition:"all .3s"}}
                    onMouseOver={e=>{ e.currentTarget.style.background=`linear-gradient(135deg,${cat.color}08,rgba(10,10,22,.96))`; e.currentTarget.style.transform="translateY(-4px)"; }}
                    onMouseOut={e=>{ e.currentTarget.style.background="rgba(10,10,22,.92)"; e.currentTarget.style.transform="none"; }}>
                    <div style={{position:"absolute",top:"-18px",right:"-14px",fontSize:"88px",opacity:.04,pointerEvents:"none"}}>{cat.icon}</div>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                      <span style={{fontSize:"16px"}}>{cat.icon}</span>
                      <span style={{fontSize:"10px",letterSpacing:".25em",color:cat.color,textTransform:"uppercase",fontWeight:700}}>{cat.title}</span>
                    </div>
                    <div style={{width:"40px",height:"2px",background:`linear-gradient(90deg,${cat.color},transparent)`,marginBottom:"18px"}} />
                    <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                      {cat.items.map(item=>(<span key={item} style={{fontSize:"11px",padding:"5px 11px",background:`${cat.color}10`,color:cat.color,border:`1px solid ${cat.color}28`,letterSpacing:".03em"}}>{item}</span>))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ PROJECTS ══════ */}
        {active==="projects" && (
          <div className="page-in">
            {/* BANNER */}
            <div className="banner-area" style={{position:"relative",overflow:"hidden",minHeight:"200px",padding:"50px 80px 40px",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              <div style={{position:"absolute",inset:0,background:`url("data:image/svg+xml,${encodeURIComponent(hexPattern)}") repeat`,backgroundSize:"60px 52px"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,107,53,.1) 0%,rgba(5,5,14,.95) 65%,rgba(5,5,14,1) 100%)"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)"}} />
              <div className="banner-bg-text" style={{position:"absolute",right:"-10px",top:"50%",transform:"translateY(-50%)",fontSize:"160px",fontWeight:900,letterSpacing:"-.05em",color:"#FF6B35",opacity:.05,pointerEvents:"none",lineHeight:1,userSelect:"none"}}>PROJECTS</div>
              <div style={{position:"absolute",top:"-20%",right:"30%",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,53,.1) 0%,transparent 70%)",pointerEvents:"none"}} />
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"4px 14px",border:"1px solid rgba(255,107,53,.3)",marginBottom:"12px",background:"rgba(255,107,53,.06)"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#FF6B35",animation:"pulse 2s ease-in-out infinite"}} />
                  <span style={{fontSize:"9px",letterSpacing:".35em",color:"#FF6B35",textTransform:"uppercase"}}>projects.log — {PROJECTS.length} entrées</span>
                </div>
                <h2 className="sec-title fade-up" style={{fontSize:"62px",fontWeight:900,lineHeight:.9,color:"#E2E8F0"}}>Projets</h2>
                <div style={{width:"60px",height:"2px",background:"linear-gradient(90deg,#FF6B35,transparent)",marginTop:"14px"}} />
              </div>
            </div>

            <div className="sp" style={{padding:"40px 80px"}}>
              <div className="grid3" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"20px"}}>
                {PROJECTS.map((p,i)=>(
                  <div key={p.name} className={`card-in-${Math.min(i+1,6)}`}
                    style={{background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",overflow:"hidden",cursor:"default",transition:"all .35s cubic-bezier(.4,0,.2,1)",backdropFilter:"blur(10px)",position:"relative"}}
                    onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor=p.color+"44"; e.currentTarget.style.boxShadow=`0 24px 60px ${p.color}18,0 0 0 1px ${p.color}22`; }}
                    onMouseOut={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; e.currentTarget.style.boxShadow="none"; }}>
                    {/* Header gradient */}
                    <div style={{height:"80px",background:`linear-gradient(135deg,${p.color}22 0%,rgba(10,10,22,.6) 100%)`,borderBottom:`1px solid ${p.color}22`,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 22px 12px",position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",top:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:`radial-gradient(circle,${p.color}30,transparent 70%)`}} />
                      <div>
                        <div style={{fontSize:"9px",letterSpacing:".18em",color:`${p.color}bb`,marginBottom:"2px"}}>{p.year}</div>
                        <h3 style={{fontSize:"18px",fontWeight:800,color:"#E2E8F0"}}>{p.name}</h3>
                      </div>
                      <div style={{width:"38px",height:"38px",border:`2px solid ${RANK_COLORS[p.rank]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:900,color:RANK_COLORS[p.rank],boxShadow:`0 0 16px ${RANK_COLORS[p.rank]}55`,background:`${RANK_COLORS[p.rank]}10`,flexShrink:0}}>{p.rank}</div>
                    </div>
                    <div style={{padding:"18px 22px"}}>
                      <p style={{fontSize:"13px",color:"#8892A4",lineHeight:1.7,marginBottom:"16px"}}>{p.desc}</p>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"16px"}}>
                        {p.tags.map(t=>(<span key={t} style={{fontSize:"9px",padding:"3px 9px",background:`${p.color}12`,color:p.color,border:`1px solid ${p.color}28`,letterSpacing:".03em"}}>{t}</span>))}
                      </div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"14px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
                          <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px #10B981"}} />
                          <span style={{fontSize:"9px",letterSpacing:".15em",color:"#10B981",textTransform:"uppercase"}}>LIVE</span>
                        </div>
                        {p.link&&<a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#00D4FF",textDecoration:"none",padding:"5px 12px",border:"1px solid rgba(0,212,255,.2)",background:"rgba(0,212,255,.06)",transition:"all .2s"}} onMouseOver={e=>{ e.currentTarget.style.background="rgba(0,212,255,.15)"; }} onMouseOut={e=>{ e.currentTarget.style.background="rgba(0,212,255,.06)"; }}>Voir →</a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TIMELINE ══════ */}
        {active==="timeline" && (
          <div className="page-in">
            {/* BANNER */}
            <div className="banner-area" style={{position:"relative",overflow:"hidden",minHeight:"200px",padding:"50px 80px 40px",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              <div style={{position:"absolute",inset:0,background:`url("data:image/svg+xml,${encodeURIComponent(diagPattern)}") repeat`,backgroundSize:"40px 40px"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(139,92,246,.12) 0%,rgba(5,5,14,.95) 65%,rgba(5,5,14,1) 100%)"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)"}} />
              <div className="banner-bg-text" style={{position:"absolute",right:"-10px",top:"50%",transform:"translateY(-50%)",fontSize:"140px",fontWeight:900,letterSpacing:"-.04em",color:"#8B5CF6",opacity:.05,pointerEvents:"none",lineHeight:1,userSelect:"none"}}>TIMELINE</div>
              <div style={{position:"absolute",top:"-30%",left:"25%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)",pointerEvents:"none"}} />
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"4px 14px",border:"1px solid rgba(139,92,246,.3)",marginBottom:"12px",background:"rgba(139,92,246,.06)"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#8B5CF6",animation:"pulse 2s ease-in-out infinite"}} />
                  <span style={{fontSize:"9px",letterSpacing:".35em",color:"#8B5CF6",textTransform:"uppercase"}}>history.log — 2022 → now</span>
                </div>
                <h2 className="sec-title fade-up" style={{fontSize:"62px",fontWeight:900,lineHeight:.9,color:"#E2E8F0"}}>Timeline</h2>
                <div style={{width:"60px",height:"2px",background:"linear-gradient(90deg,#8B5CF6,transparent)",marginTop:"14px"}} />
              </div>
            </div>

            <div className="sp" style={{padding:"40px 80px"}}>
              <div className="tl-wrap" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",maxWidth:"950px"}}>
                {TIMELINE.map((item,i)=>(
                  <div key={item.year} className={`card-in-${i+1}`}
                    style={{padding:"30px",background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",borderLeft:`3px solid ${item.color}`,position:"relative",overflow:"hidden",backdropFilter:"blur(10px)",cursor:"default",transition:"all .3s cubic-bezier(.4,0,.2,1)"}}
                    onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 20px 50px ${item.color}20`; e.currentTarget.style.background=`linear-gradient(135deg,${item.color}08,rgba(10,10,22,.95))`; }}
                    onMouseOut={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.background="rgba(10,10,22,.92)"; }}>
                    <div style={{position:"absolute",right:"-6px",bottom:"-16px",fontSize:"88px",fontWeight:900,color:item.color,opacity:.04,lineHeight:1,pointerEvents:"none"}}>{item.year}</div>
                    <div style={{position:"absolute",top:"18px",right:"18px",width:"36px",height:"36px",border:`1px solid ${item.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",background:`${item.color}08`}}>{item.icon}</div>
                    <div style={{marginBottom:"18px"}}>
                      <div style={{fontSize:"9px",letterSpacing:".22em",color:item.color,textTransform:"uppercase",fontWeight:700,marginBottom:"3px"}}>{item.year}</div>
                      <h3 style={{fontSize:"18px",fontWeight:700,color:"#E2E8F0",paddingRight:"44px"}}>{item.title}</h3>
                    </div>
                    <div style={{width:"100%",height:"1px",background:`linear-gradient(90deg,${item.color}55,transparent)`,marginBottom:"14px"}} />
                    <p style={{fontSize:"13px",color:"#8892A4",lineHeight:1.75}}>{item.desc}</p>
                    {/* Year badge */}
                    <div style={{display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"16px",padding:"4px 12px",background:`${item.color}12`,border:`1px solid ${item.color}28`}}>
                      <div style={{width:"4px",height:"4px",borderRadius:"50%",background:item.color}} />
                      <span style={{fontSize:"9px",color:item.color,letterSpacing:".1em"}}>{item.year}</span>
                    </div>
                  </div>
                ))}
                {/* Future */}
                <div style={{padding:"30px",background:"rgba(10,10,22,.6)",border:"1px dashed rgba(255,255,255,.07)",backdropFilter:"blur(10px)",gridColumn:"span 2",cursor:"default",animation:"cardIn .55s .45s ease both",transition:"all .3s"}}
                  onMouseOver={e=>{ e.currentTarget.style.background="rgba(14,14,26,.85)"; }}
                  onMouseOut={e=>{ e.currentTarget.style.background="rgba(10,10,22,.6)"; }}>
                  <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
                    <div style={{width:"50px",height:"50px",border:"1.5px dashed rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>✨</div>
                    <div>
                      <div style={{fontSize:"9px",letterSpacing:".22em",color:"#3A4560",textTransform:"uppercase",fontWeight:700}}>En cours — 2025+</div>
                      <h3 style={{fontSize:"18px",fontWeight:700,color:"#3A4560",marginBottom:"5px"}}>La suite...</h3>
                      <p style={{fontSize:"13px",color:"#3A4560",lineHeight:1.7}}>IA conversationnelle, détection comportementale, systèmes de sauvegarde intelligents.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════ CONTACT ══════ */}
        {active==="contact" && (
          <div className="page-in">
            {/* BANNER */}
            <div className="banner-area" style={{position:"relative",overflow:"hidden",minHeight:"200px",padding:"50px 80px 40px",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
              <div style={{position:"absolute",inset:0,background:`url("data:image/svg+xml,${encodeURIComponent(dotPattern)}") repeat`,backgroundSize:"24px 24px"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(16,185,129,.1) 0%,rgba(0,212,255,.05) 40%,rgba(5,5,14,.95) 70%,rgba(5,5,14,1) 100%)"}} />
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(5,5,14,.2) 0%,rgba(5,5,14,1) 100%)"}} />
              <div className="banner-bg-text" style={{position:"absolute",right:"-10px",top:"50%",transform:"translateY(-50%)",fontSize:"150px",fontWeight:900,letterSpacing:"-.04em",color:"#10B981",opacity:.05,pointerEvents:"none",lineHeight:1,userSelect:"none"}}>CONTACT</div>
              <div style={{position:"absolute",top:"-20%",left:"10%",width:"450px",height:"450px",borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)",pointerEvents:"none"}} />
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"4px 14px",border:"1px solid rgba(16,185,129,.3)",marginBottom:"12px",background:"rgba(16,185,129,.06)"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#10B981",animation:"pulse 2s ease-in-out infinite"}} />
                  <span style={{fontSize:"9px",letterSpacing:".35em",color:"#10B981",textTransform:"uppercase"}}>contact.init — online</span>
                </div>
                <h2 className="sec-title fade-up" style={{fontSize:"62px",fontWeight:900,lineHeight:.9,color:"#E2E8F0"}}>Contact</h2>
                <div style={{width:"60px",height:"2px",background:"linear-gradient(90deg,#10B981,transparent)",marginTop:"14px"}} />
              </div>
            </div>

            <div className="sp" style={{padding:"40px 80px"}}>
              <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px",alignItems:"start"}}>
                {/* LEFT */}
                <div>
                  <p style={{fontSize:"14px",color:"#8892A4",lineHeight:1.85,marginBottom:"36px",maxWidth:"360px"}}>Pour toute demande de collaboration, de projet Discord ou web — je suis disponible.</p>
                  <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                    {[
                      {label:"GitHub",value:"github.com/Mrexdev",link:"https://github.com/Mrexdev",color:"#E2E8F0",icon:"◈",sub:"Code & open source"},
                      {label:"Site Sentinel",value:"sentinelbotfr",link:"https://sites.google.com/view/sentinelbotfr/sentinel",color:"#FF6B35",icon:"🛡️",sub:"Bot de sécurité Discord"},
                      {label:"Discord",value:"Sur demande",color:"#8B5CF6",icon:"💬",sub:"Réponse rapide garantie"},
                    ].map((c,i)=>(
                      <div key={c.label} className={`card-in-${i+1}`}
                        style={{padding:"18px 20px",background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",borderLeft:`3px solid ${c.color}`,display:"flex",alignItems:"center",gap:"14px",backdropFilter:"blur(10px)",cursor:"default",transition:"all .25s"}}
                        onMouseOver={e=>{ e.currentTarget.style.transform="translateX(5px)"; e.currentTarget.style.background=`linear-gradient(90deg,${c.color}08,rgba(10,10,22,.92))`; }}
                        onMouseOut={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.background="rgba(10,10,22,.92)"; }}>
                        <div style={{width:"44px",height:"44px",background:`${c.color}10`,border:`1px solid ${c.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>{c.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:"9px",letterSpacing:".18em",color:"#3A4560",textTransform:"uppercase",marginBottom:"2px"}}>{c.label}</div>
                          {c.link?<a href={c.link} target="_blank" rel="noreferrer" style={{fontSize:"13px",color:c.color,textDecoration:"none",display:"block"}}>{c.value}</a>:<span style={{fontSize:"13px",color:"#8892A4"}}>{c.value}</span>}
                          <div style={{fontSize:"10px",color:"#3A4560",marginTop:"2px"}}>{c.sub}</div>
                        </div>
                        {c.link&&<span style={{color:"#3A4560",fontSize:"14px"}}>→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                {/* RIGHT */}
                <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                  {/* Status */}
                  <div style={{padding:"28px",background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",borderTop:"2px solid #10B981",backdropFilter:"blur(10px)",animation:"cardIn .55s .1s ease both",cursor:"default",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:"-30px",right:"-30px",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,.12),transparent 70%)"}} />
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
                      <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 8px #10B981",animation:"pulse 2s ease-in-out infinite"}} />
                      <span style={{fontSize:"10px",color:"#10B981",letterSpacing:".14em",textTransform:"uppercase",fontWeight:600}}>Disponible pour des projets</span>
                    </div>
                    <h3 style={{fontSize:"19px",fontWeight:700,color:"#E2E8F0",marginBottom:"10px"}}>Travaillons ensemble</h3>
                    <p style={{fontSize:"13px",color:"#8892A4",lineHeight:1.75}}>Bot Discord sur mesure, système RP, site web moderne — chaque projet mérite attention.</p>
                  </div>
                  {/* Stack */}
                  <div style={{padding:"24px",background:"rgba(10,10,22,.92)",border:"1px solid rgba(255,255,255,.07)",backdropFilter:"blur(10px)",animation:"cardIn .55s .2s ease both",cursor:"default"}}>
                    <div style={{fontSize:"9px",letterSpacing:".2em",color:"#3A4560",textTransform:"uppercase",marginBottom:"14px"}}>Stack utilisée</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                      {["Discord.js","Node.js","React","MySQL","Lua","HTML/CSS","FiveM"].map(t=>(
                        <span key={t} style={{fontSize:"11px",padding:"4px 10px",background:"rgba(0,212,255,.06)",color:"#00D4FF",border:"1px solid rgba(0,212,255,.15)",letterSpacing:".03em",transition:"all .2s",cursor:"default"}}
                          onMouseOver={e=>{ e.currentTarget.style.background="rgba(0,212,255,.15)"; }} onMouseOut={e=>{ e.currentTarget.style.background="rgba(0,212,255,.06)"; }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Quote */}
                  <div style={{padding:"22px",background:"rgba(255,107,53,.04)",border:"1px solid rgba(255,107,53,.14)",borderLeft:"3px solid #FF6B35",backdropFilter:"blur(10px)",animation:"cardIn .55s .3s ease both",cursor:"default"}}>
                    <p style={{fontSize:"12px",fontStyle:"italic",color:"#8892A4",lineHeight:1.7,marginBottom:"8px"}}>"Créer des bots stylés, fluides et intelligents, c'est mon métier."</p>
                    <span style={{fontSize:"10px",color:"#FF6B35",letterSpacing:".07em"}}>— ๖̶ζ͜͡Mrex</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
