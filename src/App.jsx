import { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "JavaScript", level: 90, color: "#F7DF1E", icon: "JS", desc: "ES6+, async/await" },
  { name: "Discord.js", level: 93, color: "#5865F2", icon: "DJ", desc: "Bots, slash cmds" },
  { name: "Node.js", level: 88, color: "#339933", icon: "NJ", desc: "API, serveurs, CLI" },
  { name: "HTML/CSS", level: 95, color: "#E34F26", icon: "HC", desc: "Responsive, anim" },
  { name: "React", level: 80, color: "#61DAFB", icon: "RE", desc: "Hooks, SPA" },
  { name: "MySQL", level: 75, color: "#0F6AB4", icon: "MY", desc: "BDD, requêtes" },
  { name: "Lua/FiveM", level: 72, color: "#7C3AED", icon: "LU", desc: "Scripts RP" },
];

const PROJECTS = [
  { name: "Sentinel", desc: "Système anti-raid/anti-spam avec Blacklist Globale inter-serveurs. Protection avancée.", tags: ["Discord.js", "MySQL", "Node.js"], rank: "S", color: "#FF6B35", link: "https://sites.google.com/view/sentinelbotfr/sentinel", year: "2023" },
  { name: "InfraBot", desc: "Backups auto, interface privée, logs personnalisés. Infrastructure Discord.", tags: ["Node.js", "MySQL"], rank: "A", color: "#00D4FF", year: "2023" },
  { name: "Arcadia", desc: "Mini-jeux interactifs avec système de récompenses et progression.", tags: ["Discord.js", "JS"], rank: "A", color: "#8B5CF6", year: "2024" },
  { name: "Parlon!", desc: "Support anonyme avec tickets sécurisés et interface enrichie.", tags: ["Discord.js", "MySQL"], rank: "A", color: "#10B981", year: "2024" },
  { name: "WitchyBot", desc: "Expérience mystique pour événements RP avec ambiance immersive.", tags: ["JS", "Discord.js"], rank: "B", color: "#EC4899", year: "2023" },
  { name: "GTA FiveM", desc: "Commandes RP avancées, gestion emplois, modes immersifs.", tags: ["Lua", "FiveM"], rank: "S", color: "#F59E0B", year: "2022" },
];

const TIMELINE = [
  { year: "2022", title: "Premiers projets RP", desc: "Scripts FiveM & premiers bots Discord.", color: "#8B5CF6", icon: "🎮" },
  { year: "2023", title: "Systèmes avancés", desc: "Anti-raid, économie RP, handlers modulaires.", color: "#00D4FF", icon: "⚙️" },
  { year: "2024", title: "Automatisations", desc: "Interfaces animées, infrastructure avancée.", color: "#FF6B35", icon: "🚀" },
  { year: "2025", title: "IA & Intelligence", desc: "Bots intelligents, détection comportementale.", color: "#10B981", icon: "🧠" },
];

const SERVICES = [
  { icon: "🤖", title: "Bots Discord", desc: "Slash commands, anti-raid, économie RP.", color: "#5865F2" },
  { icon: "🎮", title: "Scripts FiveM", desc: "Commandes RP, gestion joueurs immersive.", color: "#F59E0B" },
  { icon: "🌐", title: "Sites Web", desc: "React, Node.js, responsive & moderne.", color: "#00D4FF" },
  { icon: "🛡️", title: "Sécurité", desc: "Anti-spam, blacklist globale, audit.", color: "#FF6B35" },
];

const TICKER = ["JavaScript","Node.js","Discord.js","React","MySQL","Lua","FiveM","HTML5","CSS3","REST API","Git","Bots Discord","GTA RP","Slash Commands","UI/UX"];
const RANK_COLORS = { S: "#FF6B35", A: "#00D4FF", B: "#8B5CF6", C: "#10B981" };
const NAV = ["home","skills","projects","timeline","contact"];

export default function App() {
  const [active, setActive] = useState("home");
  const [skillsAnim, setSkillsAnim] = useState(false);
  const [counters, setCounters] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [particles] = useState(() => Array.from({length:28},(_,i)=>({
    id:i, x:Math.random()*100, y:Math.random()*100,
    size:Math.random()*2+0.5, speed:Math.random()*20+15,
    delay:Math.random()*10, opacity:Math.random()*0.4+0.1
  })));

  const roles = ["Développeur Discord Bots","Fullstack Web Dev","Architecte RP Systems","UI/UX Craftsman"];
  const [roleIdx,setRoleIdx] = useState(0);
  const [typed,setTyped] = useState("");
  const [del,setDel] = useState(false);

  useEffect(()=>{
    const c = roles[roleIdx]; let t;
    if(!del){ if(typed.length<c.length) t=setTimeout(()=>setTyped(c.slice(0,typed.length+1)),80); else t=setTimeout(()=>setDel(true),2200); }
    else{ if(typed.length>0) t=setTimeout(()=>setTyped(c.slice(0,typed.length-1)),40); else{setDel(false);setRoleIdx(i=>(i+1)%roles.length);} }
    return()=>clearTimeout(t);
  },[typed,del,roleIdx]);

  useEffect(()=>{
    if(active==="skills"){
      setTimeout(()=>setSkillsAnim(true),150);
      SKILLS.forEach((sk,i)=>{
        let count=0; const target=sk.level;
        const interval=setInterval(()=>{
          count+=2; if(count>=target){count=target;clearInterval(interval);}
          setCounters(prev=>({...prev,[sk.name]:count}));
        },15+i*3);
      });
    } else setSkillsAnim(false);
  },[active]);

  const go=(s)=>{ setActive(s); setMenuOpen(false); };

  const NAV_ICONS = {
    home:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>,
    skills:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    projects:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    timeline:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    contact:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  };

  return (
    <div style={{fontFamily:"'Exo 2','Segoe UI',sans-serif",background:"#07070F",color:"#E2E8F0",minHeight:"100vh",display:"flex",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(1deg)}}
        @keyframes scanline{0%{top:-10%}100%{top:110%}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(0,212,255,.2)}50%{box-shadow:0 0 30px rgba(0,212,255,.5)}}
        @keyframes particleFloat{0%{transform:translateY(0px) translateX(0px);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-120vh) translateX(30px);opacity:0}}
        @keyframes rotateRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.9);opacity:.6}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes slideRight{from{width:0%}to{width:var(--target)}}
        @keyframes cardIn{from{opacity:0;transform:translateY(30px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes numberUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-tap-highlight-color:transparent}
        *::-webkit-scrollbar{width:3px}
        *::-webkit-scrollbar-thumb{background:rgba(0,212,255,.25);border-radius:2px}
        .tk{overflow:hidden;width:100%}
        .ti{display:flex;width:max-content;animation:ticker 40s linear infinite}
        .ti:hover{animation-play-state:paused}
        .nav-item{transition:all .2s;cursor:pointer}
        .nav-item:hover{color:#00D4FF!important}
        .card-hover{transition:all .3s cubic-bezier(.4,0,.2,1)}
        .card-hover:hover{transform:translateY(-5px)}
        .btn-glow{transition:all .25s}
        .btn-glow:hover{box-shadow:0 0 30px rgba(0,212,255,.45)!important;background:#1ae3ff!important}
        .btn-outline:hover{background:rgba(226,232,240,.07)!important;border-color:rgba(226,232,240,.35)!important}
        .skill-bar{transition:width 1.2s cubic-bezier(.4,0,.2,1)}
        .fade-up{animation:fadeUp .6s ease both}
        .page-anim{animation:fadeIn .35s ease both}

        /* MOBILE */
        @media(max-width:768px){
          .sidebar{display:none!important}
          .bottom-nav{display:flex!important}
          .main-content{margin-left:0!important;padding-bottom:80px!important}
          .hero-inner{flex-direction:column-reverse!important;padding:24px 20px 32px!important;min-height:auto!important}
          .hero-right{width:100%!important;align-items:center!important;margin-bottom:24px!important}
          .hero-avatar{width:130px!important;height:130px!important}
          .hero-left{text-align:center!important}
          .hero-left h1{font-size:clamp(40px,12vw,64px)!important}
          .hero-btns{justify-content:center!important}
          .hero-stats{justify-content:center!important}
          .section-pad{padding:32px 20px 24px!important}
          .services-grid{grid-template-columns:1fr 1fr!important}
          .projects-home-grid{grid-template-columns:1fr!important}
          .skills-home-grid{grid-template-columns:repeat(4,1fr)!important}
          .skills-main-grid{grid-template-columns:1fr 1fr!important}
          .cat-grid{grid-template-columns:1fr!important}
          .proj-grid{grid-template-columns:1fr!important}
          .tl-grid{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
          .quote-row{flex-direction:column!important;gap:8px!important}
          .section-title{font-size:36px!important}
          h2.section-title{font-size:36px!important}
        }
        @media(max-width:400px){
          .services-grid{grid-template-columns:1fr!important}
          .skills-home-grid{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>

      {/* ── PARTICLES ── */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {particles.map(p=>(
          <div key={p.id} style={{position:"absolute",left:`${p.x}%`,bottom:"-10px",width:`${p.size}px`,height:`${p.size}px`,borderRadius:"50%",background:"#00D4FF",opacity:p.opacity,animation:`particleFloat ${p.speed}s ${p.delay}s linear infinite`}} />
        ))}
        <div style={{position:"absolute",top:"-15%",left:"-5%",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.06) 0%,transparent 65%)"}} />
        <div style={{position:"absolute",bottom:"-20%",right:"-5%",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.06) 0%,transparent 65%)"}} />
      </div>

      {/* ── SIDEBAR (desktop) ── */}
      <nav className="sidebar" style={{position:"fixed",left:0,top:0,bottom:0,width:"72px",background:"rgba(10,10,20,.97)",borderRight:"1px solid rgba(0,212,255,.1)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"8px",zIndex:100,backdropFilter:"blur(20px)"}}>
        <div style={{position:"absolute",top:"20px",width:"40px",height:"40px",border:"1.5px solid #00D4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:900,color:"#00D4FF",animation:"glow 3s ease-in-out infinite"}}>M</div>
        {NAV.map(s=>(
          <button key={s} className="nav-item" onClick={()=>go(s)} title={s}
            style={{width:"46px",height:"46px",border:active===s?"1px solid rgba(0,212,255,.5)":"1px solid rgba(255,255,255,.05)",background:active===s?"rgba(0,212,255,.12)":"transparent",color:active===s?"#00D4FF":"#3A4560",borderRadius:"10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",boxShadow:active===s?"0 0 16px rgba(0,212,255,.25)":"none",transform:active===s?"scale(1.05)":"none"}}>
            {NAV_ICONS[s]}
          </button>
        ))}
        <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer"
          style={{position:"absolute",bottom:"20px",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",color:"#3A4560",textDecoration:"none",transition:"color .2s"}}
          onMouseOver={e=>e.currentTarget.style.color="#E2E8F0"} onMouseOut={e=>e.currentTarget.style.color="#3A4560"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </nav>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="bottom-nav" style={{display:"none",position:"fixed",bottom:0,left:0,right:0,height:"64px",background:"rgba(8,8,18,.97)",borderTop:"1px solid rgba(0,212,255,.1)",zIndex:100,backdropFilter:"blur(20px)",alignItems:"center",justifyContent:"space-around",padding:"0 8px"}}>
        {NAV.map(s=>(
          <button key={s} onClick={()=>go(s)}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",background:"none",border:"none",cursor:"pointer",color:active===s?"#00D4FF":"#3A4560",transition:"all .2s",padding:"8px",flex:1}}>
            {NAV_ICONS[s]}
            <span style={{fontSize:"9px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{s}</span>
          </button>
        ))}
      </nav>

      {/* ── MAIN ── */}
      <main className="main-content" style={{marginLeft:"72px",flex:1,minHeight:"100vh",position:"relative",zIndex:1,overflowY:"auto"}}>

        {/* ══════ HOME ══════ */}
        {active==="home" && (
          <div className="page-anim" style={{display:"flex",flexDirection:"column"}}>

            {/* HERO */}
            <div className="hero-inner" style={{display:"flex",alignItems:"center",padding:"60px 80px 48px",gap:"40px",position:"relative",overflow:"hidden",minHeight:"520px"}}>
              <div style={{position:"absolute",inset:0,zIndex:0}}>
                <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",opacity:.2,filter:"saturate(.5)"}} />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(100deg,rgba(7,7,15,.97) 0%,rgba(7,7,15,.75) 55%,rgba(7,7,15,.15) 100%)"}} />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(7,7,15,.2) 0%,transparent 40%,rgba(7,7,15,1) 100%)"}} />
              </div>

              {/* LEFT */}
              <div className="hero-left fade-up" style={{flex:1,position:"relative",zIndex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px",flexWrap:"wrap"}}>
                  <div style={{padding:"4px 14px",border:"1px solid #FF6B35",fontSize:"10px",letterSpacing:"0.35em",textTransform:"uppercase",color:"#FF6B35",fontWeight:700,boxShadow:"0 0 14px rgba(255,107,53,.3)",animation:"glow 3s 1s ease-in-out infinite"}}>S — RANK</div>
                  <span style={{fontSize:"11px",letterSpacing:"0.2em",color:"#3A4560",textTransform:"uppercase"}}>Developer A.K.A</span>
                </div>
                <h1 style={{fontSize:"clamp(48px,7vw,100px)",fontWeight:900,lineHeight:.9,letterSpacing:"-.03em",marginBottom:"6px",background:"linear-gradient(130deg,#E2E8F0 0%,rgba(226,232,240,.4) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                  ๖̶ζ͜͡Mrex
                </h1>
                <div style={{height:"36px",display:"flex",alignItems:"center",marginBottom:"18px"}}>
                  <span style={{color:"#00D4FF",fontSize:"16px",fontWeight:300,letterSpacing:".05em"}}>
                    {typed}<span style={{display:"inline-block",width:"2px",height:"18px",background:"#00D4FF",marginLeft:"2px",verticalAlign:"middle",animation:"blink 1s step-end infinite"}} />
                  </span>
                </div>
                <p style={{fontSize:"14px",lineHeight:1.85,color:"#8892A4",marginBottom:"28px",maxWidth:"420px"}}>
                  Développeur fullstack spécialisé dans les <span style={{color:"#E2E8F0"}}>bots Discord</span>, l'automatisation <span style={{color:"#E2E8F0"}}>RP</span> et les projets immersifs.
                </p>
                <div className="hero-btns" style={{display:"flex",gap:"12px",marginBottom:"36px",flexWrap:"wrap"}}>
                  <button className="btn-glow" onClick={()=>go("projects")} style={{padding:"12px 26px",background:"#00D4FF",color:"#07070F",border:"none",fontSize:"12px",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",transition:"all .25s",boxShadow:"0 0 20px rgba(0,212,255,.25)"}}>Voir les projets →</button>
                  <button className="btn-outline" onClick={()=>go("contact")} style={{padding:"12px 26px",background:"transparent",color:"#E2E8F0",border:"1px solid rgba(226,232,240,.15)",fontSize:"12px",fontWeight:400,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",transition:"all .25s"}}>Me contacter</button>
                </div>
                <div className="hero-stats" style={{display:"flex",gap:"32px",flexWrap:"wrap"}}>
                  {[{num:"6+",label:"Bots déployés"},{num:"2022",label:"Depuis"},{num:"7",label:"Technologies"},{num:"∞",label:"Passion"}].map((s,i)=>(
                    <div key={s.label} style={{animation:`numberUp .5s ${i*.1}s ease both`}}>
                      <div style={{fontSize:"26px",fontWeight:800,color:"#00D4FF",lineHeight:1}}>{s.num}</div>
                      <div style={{fontSize:"9px",letterSpacing:".18em",color:"#3A4560",textTransform:"uppercase",marginTop:"4px"}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="hero-right fade-up" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",flexShrink:0,position:"relative",zIndex:1}}>
                <div style={{position:"relative"}}>
                  {/* Rotating ring */}
                  <div style={{position:"absolute",inset:"-12px",borderRadius:"50%",border:"1px solid rgba(0,212,255,.15)",animation:"rotateRing 8s linear infinite"}} />
                  <div style={{position:"absolute",inset:"-24px",borderRadius:"50%",border:"1px dashed rgba(255,107,53,.1)",animation:"rotateRing 12s linear infinite reverse"}} />
                  <div className="hero-avatar" style={{width:"180px",height:"180px",borderRadius:"50%",border:"1.5px solid rgba(0,212,255,.3)",overflow:"hidden",boxShadow:"0 0 40px rgba(0,212,255,.15),0 0 80px rgba(0,212,255,.05)",animation:"float 6s ease-in-out infinite",position:"relative"}}>
                    <img src="https://i.pinimg.com/736x/a4/a9/a6/a4a9a6a8e3bae75af733926c7cfec1b2.jpg" alt="Mrex" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                    <div style={{position:"absolute",left:0,right:0,height:"8%",background:"linear-gradient(transparent,rgba(0,212,255,.08),transparent)",animation:"scanline 3.5s linear infinite",pointerEvents:"none"}} />
                  </div>
                </div>
                <div style={{textAlign:"center",marginTop:"16px"}}>
                  <div style={{fontSize:"10px",letterSpacing:".2em",color:"#3A4560",textTransform:"uppercase",marginBottom:"6px"}}>MREXDEV</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"}}>
                    <div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 6px #10B981",animation:"pulse 2s ease-in-out infinite"}} />
                    <span style={{fontSize:"11px",color:"#10B981",letterSpacing:".1em"}}>Open to work</span>
                  </div>
                </div>
                <div style={{padding:"10px 16px",background:"rgba(255,107,53,.06)",border:"1px solid rgba(255,107,53,.22)",display:"flex",alignItems:"center",gap:"10px",width:"180px",backdropFilter:"blur(8px)"}}>
                  <div style={{width:"30px",height:"30px",border:"1.5px solid #FF6B35",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:900,color:"#FF6B35",boxShadow:"0 0 10px rgba(255,107,53,.3)",flexShrink:0}}>S</div>
                  <div><div style={{fontSize:"8px",letterSpacing:".2em",color:"#FF6B35",textTransform:"uppercase"}}>S-Rank Developer</div><div style={{fontSize:"11px",color:"#8892A4",marginTop:"2px"}}>Bot Architect</div></div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="section-pad" style={{padding:"0 80px 36px"}}>
              <div style={{fontSize:"10px",letterSpacing:".3em",color:"#3A4560",textTransform:"uppercase",marginBottom:"14px"}}>// ce que je fais</div>
              <div className="services-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px"}}>
                {SERVICES.map((s,i)=>(
                  <div key={s.title} className="card-hover"
                    style={{padding:"22px 18px",background:"rgba(14,14,28,.88)",border:`1px solid rgba(255,255,255,.06)`,borderTop:`2px solid ${s.color}`,cursor:"default",backdropFilter:"blur(6px)",animation:`cardIn .5s ${i*.08}s ease both`}}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor=s.color+"44"; e.currentTarget.style.background=`linear-gradient(135deg,${s.color}08,rgba(14,14,28,.95))`; }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,.06)"; e.currentTarget.style.background="rgba(14,14,28,.88)"; }}>
                    <div style={{fontSize:"24px",marginBottom:"10px"}}>{s.icon}</div>
                    <h3 style={{fontSize:"13px",fontWeight:700,marginBottom:"7px",color:"#E2E8F0"}}>{s.title}</h3>
                    <p style={{fontSize:"11px",color:"#8892A4",lineHeight:1.65}}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURED PROJECTS */}
            <div className="section-pad" style={{padding:"0 80px 36px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
                <div style={{fontSize:"10px",letterSpacing:".3em",color:"#3A4560",textTransform:"uppercase"}}>// projets phares</div>
                <button onClick={()=>go("projects")} style={{fontSize:"11px",color:"#00D4FF",background:"none",border:"none",cursor:"pointer",letterSpacing:".08em",transition:"opacity .2s"}} onMouseOver={e=>e.currentTarget.style.opacity=".7"} onMouseOut={e=>e.currentTarget.style.opacity="1"}>Voir tout →</button>
              </div>
              <div className="projects-home-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px"}}>
                {PROJECTS.filter(p=>p.rank==="S"||p.name==="Parlon!").slice(0,3).map((p,i)=>(
                  <div key={p.name} className="card-hover"
                    style={{padding:"20px",background:"rgba(14,14,28,.88)",border:"1px solid rgba(255,255,255,.06)",borderLeft:`3px solid ${p.color}`,position:"relative",cursor:"default",backdropFilter:"blur(6px)",animation:`cardIn .5s ${i*.1}s ease both`}}
                    onMouseOver={e=>{ e.currentTarget.style.boxShadow=`0 16px 40px ${p.color}18`; e.currentTarget.style.borderColor=`rgba(255,255,255,.1)`; }}
                    onMouseOut={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="rgba(255,255,255,.06)"; }}>
                    <div style={{position:"absolute",top:"14px",right:"14px",width:"26px",height:"26px",border:`1.5px solid ${RANK_COLORS[p.rank]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:900,color:RANK_COLORS[p.rank],boxShadow:`0 0 10px ${RANK_COLORS[p.rank]}44`}}>{p.rank}</div>
                    <h3 style={{fontSize:"15px",fontWeight:700,marginBottom:"7px",paddingRight:"32px",color:"#E2E8F0"}}>{p.name}</h3>
                    <p style={{fontSize:"11px",color:"#8892A4",lineHeight:1.65,marginBottom:"12px"}}>{p.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"10px"}}>
                      {p.tags.map(t=>(<span key={t} style={{fontSize:"9px",padding:"2px 7px",background:`${p.color}12`,color:p.color,border:`1px solid ${p.color}28`}}>{t}</span>))}
                    </div>
                    {p.link&&<a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#00D4FF",textDecoration:"none"}}>Voir →</a>}
                  </div>
                ))}
              </div>
            </div>

            {/* SKILLS */}
            <div className="section-pad" style={{padding:"0 80px 36px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
                <div style={{fontSize:"10px",letterSpacing:".3em",color:"#3A4560",textTransform:"uppercase"}}>// stack</div>
                <button onClick={()=>go("skills")} style={{fontSize:"11px",color:"#00D4FF",background:"none",border:"none",cursor:"pointer",letterSpacing:".08em"}} onMouseOver={e=>e.currentTarget.style.opacity=".7"} onMouseOut={e=>e.currentTarget.style.opacity="1"}>Détails →</button>
              </div>
              <div className="skills-home-grid" style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"10px"}}>
                {SKILLS.map(sk=>(
                  <div key={sk.name} style={{padding:"14px 10px",background:"rgba(14,14,28,.88)",border:`1px solid ${sk.color}20`,display:"flex",flexDirection:"column",alignItems:"center",gap:"7px",cursor:"default",transition:"all .2s",backdropFilter:"blur(6px)"}}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor=sk.color+"50"; e.currentTarget.style.background=`${sk.color}08`; e.currentTarget.style.transform="translateY(-3px)"; }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor=sk.color+"20"; e.currentTarget.style.background="rgba(14,14,28,.88)"; e.currentTarget.style.transform="none"; }}>
                    <div style={{width:"34px",height:"34px",background:`${sk.color}18`,border:`1px solid ${sk.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",fontWeight:800,color:sk.color}}>{sk.icon}</div>
                    <div style={{fontSize:"9px",color:"#8892A4",textAlign:"center",lineHeight:1.2}}>{sk.name}</div>
                    <div style={{fontSize:"10px",fontWeight:700,color:sk.color}}>{sk.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TICKER */}
            <div style={{borderTop:"1px solid rgba(255,255,255,.04)",borderBottom:"1px solid rgba(255,255,255,.04)",padding:"13px 0",background:"rgba(10,10,20,.7)",backdropFilter:"blur(10px)"}}>
              <div className="tk"><div className="ti">
                {[...TICKER,...TICKER].map((item,i)=>(
                  <span key={i} style={{fontSize:"10px",letterSpacing:".2em",textTransform:"uppercase",color:i%3===0?"#00D4FF":i%3===1?"#FF6B35":"#222232",padding:"0 24px",whiteSpace:"nowrap"}}>
                    {item} <span style={{color:"#111120",marginLeft:"24px"}}>◆</span>
                  </span>
                ))}
              </div></div>
            </div>

            {/* QUOTE */}
            <div className="quote-row section-pad" style={{padding:"24px 80px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
              <div style={{borderLeft:"2px solid rgba(0,212,255,.2)",paddingLeft:"16px"}}>
                <p style={{fontSize:"12px",fontStyle:"italic",color:"#3A4560",lineHeight:1.6}}>"Créer des bots stylés, fluides et intelligents, c'est mon métier."</p>
                <span style={{fontSize:"10px",color:"#00D4FF",letterSpacing:".08em"}}>— ๖̶ζ͜͡Mrex</span>
              </div>
              <a href="https://github.com/Mrexdev" target="_blank" rel="noreferrer" style={{fontSize:"10px",color:"#1E1E30",letterSpacing:".1em",fontFamily:"monospace",textDecoration:"none"}}>github.com/Mrexdev</a>
            </div>
          </div>
        )}

        {/* ══════ SKILLS ══════ */}
        {active==="skills" && (
          <div className="page-anim section-pad" style={{padding:"60px 80px",minHeight:"100vh",position:"relative",overflow:"hidden"}}>
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.025,pointerEvents:"none"}} xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00D4FF" strokeWidth=".5"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
            <div style={{position:"absolute",top:"5%",right:"5%",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.06) 0%,transparent 70%)",pointerEvents:"none"}} />
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:"10px",letterSpacing:".35em",color:"#FF6B35",textTransform:"uppercase",marginBottom:"6px"}}>// skills.exe</div>
              <h2 className="section-title fade-up" style={{fontSize:"52px",fontWeight:900,lineHeight:.95,marginBottom:"6px"}}>Compétences</h2>
              <p style={{color:"#3A4560",marginBottom:"48px",fontSize:"13px"}}>Technologies maîtrisées &amp; niveaux de progression</p>

              {/* SKILL CARDS */}
              <div className="skills-main-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginBottom:"48px"}}>
                {SKILLS.map((sk,i)=>(
                  <div key={sk.name} style={{padding:"22px",background:"rgba(14,14,28,.88)",border:`1px solid rgba(255,255,255,.06)`,borderTop:`2px solid ${sk.color}`,position:"relative",overflow:"hidden",backdropFilter:"blur(8px)",cursor:"default",transition:"all .3s",animation:`cardIn .5s ${i*.07}s ease both`}}
                    onMouseOver={e=>{ e.currentTarget.style.background=`linear-gradient(135deg,${sk.color}10,rgba(14,14,28,.95))`; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 30px ${sk.color}20`; }}
                    onMouseOut={e=>{ e.currentTarget.style.background="rgba(14,14,28,.88)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                    <div style={{position:"absolute",right:"-8px",bottom:"-16px",fontSize:"72px",fontWeight:900,color:sk.color,opacity:.04,lineHeight:1,pointerEvents:"none"}}>{sk.level}</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
                      <div style={{width:"38px",height:"38px",background:`${sk.color}18`,border:`1px solid ${sk.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:800,color:sk.color}}>{sk.icon}</div>
                      <div style={{fontSize:"20px",fontWeight:800,color:sk.color,fontVariantNumeric:"tabular-nums"}}>{counters[sk.name]||0}%</div>
                    </div>
                    <div style={{fontSize:"13px",fontWeight:600,color:"#E2E8F0",marginBottom:"3px"}}>{sk.name}</div>
                    <div style={{fontSize:"10px",color:"#3A4560",marginBottom:"14px"}}>{sk.desc}</div>
                    <div style={{height:"3px",background:"rgba(255,255,255,.06)",borderRadius:"2px",overflow:"hidden"}}>
                      <div className="skill-bar" style={{height:"100%",width:skillsAnim?`${sk.level}%`:"0%",background:`linear-gradient(90deg,${sk.color},${sk.color}88)`,transition:`width ${.8+i*.1}s cubic-bezier(.4,0,.2,1)`,boxShadow:`0 0 8px ${sk.color}55`}} />
                    </div>
                  </div>
                ))}
              </div>

              {/* CATEGORY */}
              <div className="cat-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
                {[
                  {title:"Backend",items:["Node.js","Express.js","MySQL","Discord.js","REST APIs"],color:"#00D4FF",icon:"⚙️"},
                  {title:"Frontend",items:["React","HTML5","CSS3","Responsive","Animations"],color:"#8B5CF6",icon:"🎨"},
                  {title:"Spécialisé",items:["Lua/FiveM","Discord API","Bots RP","GTA Systems"],color:"#FF6B35",icon:"🎮"},
                ].map((cat,i)=>(
                  <div key={cat.title} style={{padding:"26px",background:"rgba(14,14,28,.88)",border:"1px solid rgba(255,255,255,.06)",borderLeft:`3px solid ${cat.color}`,position:"relative",overflow:"hidden",backdropFilter:"blur(8px)",animation:`cardIn .5s ${i*.1+.4}s ease both`}}>
                    <div style={{position:"absolute",top:"-20px",right:"-20px",fontSize:"90px",opacity:.03,pointerEvents:"none"}}>{cat.icon}</div>
                    <div style={{fontSize:"10px",letterSpacing:".25em",color:cat.color,textTransform:"uppercase",marginBottom:"4px",fontWeight:700}}>{cat.icon} {cat.title}</div>
                    <div style={{width:"36px",height:"1px",background:cat.color,opacity:.3,marginBottom:"16px"}} />
                    <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                      {cat.items.map(item=>(<span key={item} style={{fontSize:"11px",padding:"4px 10px",background:`${cat.color}10`,color:cat.color,border:`1px solid ${cat.color}28`,letterSpacing:".03em"}}>{item}</span>))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ PROJECTS ══════ */}
        {active==="projects" && (
          <div className="page-anim section-pad" style={{padding:"60px 80px",minHeight:"100vh",position:"relative",overflow:"hidden"}}>
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.02,pointerEvents:"none"}} xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="d" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#FF6B35"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#d)" />
            </svg>
            <div style={{position:"absolute",top:"0",left:"0",right:"0",height:"250px",background:"linear-gradient(to bottom,rgba(255,107,53,.03),transparent)",pointerEvents:"none"}} />
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:"10px",letterSpacing:".35em",color:"#FF6B35",textTransform:"uppercase",marginBottom:"6px"}}>// projects.log</div>
              <h2 className="section-title fade-up" style={{fontSize:"52px",fontWeight:900,lineHeight:.95,marginBottom:"6px"}}>Projets</h2>
              <p style={{color:"#3A4560",marginBottom:"48px",fontSize:"13px"}}>Bots Discord, systèmes RP &amp; web</p>
              <div className="proj-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"20px"}}>
                {PROJECTS.map((p,i)=>(
                  <div key={p.name}
                    style={{background:"rgba(14,14,28,.9)",border:"1px solid rgba(255,255,255,.06)",overflow:"hidden",cursor:"default",transition:"all .35s cubic-bezier(.4,0,.2,1)",backdropFilter:"blur(8px)",animation:`cardIn .5s ${i*.08}s ease both`}}
                    onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.borderColor=p.color+"44"; e.currentTarget.style.boxShadow=`0 24px 60px ${p.color}18`; }}
                    onMouseOut={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.borderColor="rgba(255,255,255,.06)"; e.currentTarget.style.boxShadow="none"; }}>
                    {/* Color header */}
                    <div style={{height:"3px",background:`linear-gradient(90deg,${p.color},${p.color}33)`}} />
                    <div style={{padding:"22px 24px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}>
                        <div>
                          <div style={{fontSize:"10px",letterSpacing:".15em",color:"#3A4560",marginBottom:"3px"}}>{p.year}</div>
                          <h3 style={{fontSize:"18px",fontWeight:700,color:"#E2E8F0"}}>{p.name}</h3>
                        </div>
                        <div style={{width:"36px",height:"36px",border:`2px solid ${RANK_COLORS[p.rank]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",fontWeight:900,color:RANK_COLORS[p.rank],boxShadow:`0 0 14px ${RANK_COLORS[p.rank]}44`,flexShrink:0}}>{p.rank}</div>
                      </div>
                      <p style={{fontSize:"13px",color:"#8892A4",lineHeight:1.7,marginBottom:"18px"}}>{p.desc}</p>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"18px"}}>
                        {p.tags.map(t=>(<span key={t} style={{fontSize:"9px",padding:"3px 9px",background:`${p.color}12`,color:p.color,border:`1px solid ${p.color}28`,letterSpacing:".03em"}}>{t}</span>))}
                      </div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:"1px solid rgba(255,255,255,.04)",paddingTop:"14px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
                          <div style={{width:"5px",height:"5px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 5px #10B981"}} />
                          <span style={{fontSize:"9px",letterSpacing:".15em",color:"#10B981",textTransform:"uppercase"}}>LIVE</span>
                        </div>
                        {p.link&&<a href={p.link} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#00D4FF",textDecoration:"none",letterSpacing:".04em"}}>Voir →</a>}
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
          <div className="page-anim section-pad" style={{padding:"60px 80px",minHeight:"100vh",position:"relative",overflow:"hidden"}}>
            {[800,600,400].map(s=>(
              <div key={s} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:`${s}px`,height:`${s}px`,borderRadius:"50%",border:"1px solid rgba(255,255,255,.02)",pointerEvents:"none"}} />
            ))}
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:"10px",letterSpacing:".35em",color:"#FF6B35",textTransform:"uppercase",marginBottom:"6px"}}>// history.log</div>
              <h2 className="section-title fade-up" style={{fontSize:"52px",fontWeight:900,lineHeight:.95,marginBottom:"6px"}}>Timeline</h2>
              <p style={{color:"#3A4560",marginBottom:"56px",fontSize:"13px"}}>Évolution depuis les débuts</p>
              <div className="tl-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"24px",maxWidth:"900px"}}>
                {TIMELINE.map((item,i)=>(
                  <div key={item.year}
                    style={{padding:"28px",background:"rgba(14,14,28,.88)",border:"1px solid rgba(255,255,255,.06)",borderLeft:`3px solid ${item.color}`,position:"relative",overflow:"hidden",backdropFilter:"blur(8px)",cursor:"default",transition:"all .3s",animation:`cardIn .5s ${i*.1}s ease both`}}
                    onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 40px ${item.color}18`; }}
                    onMouseOut={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                    <div style={{position:"absolute",right:"-8px",bottom:"-18px",fontSize:"85px",fontWeight:900,color:item.color,opacity:.04,lineHeight:1,pointerEvents:"none"}}>{item.year}</div>
                    <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"18px"}}>
                      <div style={{width:"48px",height:"48px",border:`2px solid ${item.color}`,background:`${item.color}10`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",boxShadow:`0 0 20px ${item.color}33`,flexShrink:0}}>{item.icon}</div>
                      <div>
                        <div style={{fontSize:"10px",letterSpacing:".2em",color:item.color,textTransform:"uppercase",fontWeight:700}}>{item.year}</div>
                        <h3 style={{fontSize:"17px",fontWeight:700,color:"#E2E8F0",lineHeight:1.2}}>{item.title}</h3>
                      </div>
                    </div>
                    <div style={{width:"100%",height:"1px",background:`linear-gradient(90deg,${item.color}44,transparent)`,marginBottom:"14px"}} />
                    <p style={{fontSize:"13px",color:"#8892A4",lineHeight:1.75}}>{item.desc}</p>
                  </div>
                ))}
                <div style={{padding:"28px",background:"rgba(14,14,28,.5)",border:"1px dashed rgba(255,255,255,.06)",backdropFilter:"blur(8px)",gridColumn:"span 2",animation:"cardIn .5s .4s ease both",cursor:"default"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                    <div style={{width:"48px",height:"48px",border:"1.5px dashed rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>✨</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"10px",letterSpacing:".2em",color:"#3A4560",textTransform:"uppercase",fontWeight:700}}>En cours — 2025+</div>
                      <h3 style={{fontSize:"17px",fontWeight:700,color:"#3A4560",marginBottom:"6px"}}>La suite...</h3>
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
          <div className="page-anim section-pad" style={{padding:"60px 80px",minHeight:"100vh",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",bottom:"-10%",left:"-10%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,212,255,.04),transparent 70%)",pointerEvents:"none"}} />
            <div style={{position:"absolute",top:"20%",right:"10%",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.04),transparent 70%)",pointerEvents:"none"}} />
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:"10px",letterSpacing:".35em",color:"#FF6B35",textTransform:"uppercase",marginBottom:"6px"}}>// contact.init</div>
              <h2 className="section-title fade-up" style={{fontSize:"52px",fontWeight:900,lineHeight:.95,marginBottom:"6px"}}>Contact</h2>
              <p style={{color:"#3A4560",marginBottom:"48px",fontSize:"13px"}}>Pour toute demande de collaboration ou de projet</p>
              <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"start"}}>
                {/* LEFT */}
                <div>
                  <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                    {[
                      {label:"GitHub",value:"github.com/Mrexdev",link:"https://github.com/Mrexdev",color:"#E2E8F0",icon:"◈",sub:"Code & projets"},
                      {label:"Site Sentinel",value:"sentinelbotfr",link:"https://sites.google.com/view/sentinelbotfr/sentinel",color:"#FF6B35",icon:"🛡️",sub:"Bot de sécurité"},
                      {label:"Discord",value:"Sur demande",color:"#8B5CF6",icon:"💬",sub:"Réponse rapide"},
                    ].map((c,i)=>(
                      <div key={c.label}
                        style={{padding:"18px 22px",background:"rgba(14,14,28,.88)",border:`1px solid rgba(255,255,255,.06)`,borderLeft:`3px solid ${c.color}`,display:"flex",alignItems:"center",gap:"14px",backdropFilter:"blur(8px)",cursor:"default",transition:"all .25s",animation:`cardIn .5s ${i*.1}s ease both`}}
                        onMouseOver={e=>{ e.currentTarget.style.background="rgba(20,20,36,.95)"; e.currentTarget.style.transform="translateX(4px)"; }}
                        onMouseOut={e=>{ e.currentTarget.style.background="rgba(14,14,28,.88)"; e.currentTarget.style.transform="none"; }}>
                        <div style={{width:"42px",height:"42px",background:`${c.color}10`,border:`1px solid ${c.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",flexShrink:0}}>{c.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:"9px",letterSpacing:".18em",color:"#3A4560",textTransform:"uppercase",marginBottom:"2px"}}>{c.label}</div>
                          {c.link?<a href={c.link} target="_blank" rel="noreferrer" style={{fontSize:"13px",color:c.color,textDecoration:"none",display:"block"}}>{c.value}</a>:<span style={{fontSize:"13px",color:"#8892A4"}}>{c.value}</span>}
                          <div style={{fontSize:"10px",color:"#3A4560",marginTop:"2px"}}>{c.sub}</div>
                        </div>
                        {c.link&&<div style={{color:"#3A4560",fontSize:"14px",transition:"color .2s"}}>→</div>}
                      </div>
                    ))}
                  </div>
                </div>
                {/* RIGHT */}
                <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                  <div style={{padding:"28px",background:"rgba(14,14,28,.88)",border:"1px solid rgba(255,255,255,.06)",borderTop:"2px solid #10B981",backdropFilter:"blur(8px)",animation:"cardIn .5s .2s ease both",cursor:"default"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
                      <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#10B981",boxShadow:"0 0 8px #10B981",animation:"pulse 2s ease-in-out infinite"}} />
                      <span style={{fontSize:"11px",color:"#10B981",letterSpacing:".12em",textTransform:"uppercase",fontWeight:600}}>Disponible</span>
                    </div>
                    <h3 style={{fontSize:"18px",fontWeight:700,color:"#E2E8F0",marginBottom:"10px"}}>Travaillons ensemble</h3>
                    <p style={{fontSize:"13px",color:"#8892A4",lineHeight:1.75}}>Bot Discord sur mesure, système RP, site web moderne — chaque projet mérite une attention particulière.</p>
                  </div>
                  <div style={{padding:"24px",background:"rgba(14,14,28,.88)",border:"1px solid rgba(255,255,255,.06)",backdropFilter:"blur(8px)",animation:"cardIn .5s .3s ease both",cursor:"default"}}>
                    <div style={{fontSize:"9px",letterSpacing:".2em",color:"#3A4560",textTransform:"uppercase",marginBottom:"16px"}}>Stack utilisée</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                      {["Discord.js","Node.js","React","MySQL","Lua","HTML/CSS","FiveM"].map(t=>(
                        <span key={t} style={{fontSize:"10px",padding:"4px 10px",background:"rgba(0,212,255,.06)",color:"#00D4FF",border:"1px solid rgba(0,212,255,.15)",letterSpacing:".03em"}}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{padding:"22px",background:"rgba(255,107,53,.04)",border:"1px solid rgba(255,107,53,.12)",borderLeft:"3px solid #FF6B35",animation:"cardIn .5s .4s ease both",cursor:"default"}}>
                    <p style={{fontSize:"12px",fontStyle:"italic",color:"#8892A4",lineHeight:1.7,marginBottom:"7px"}}>"Créer des bots stylés, fluides et intelligents, c'est mon métier."</p>
                    <span style={{fontSize:"10px",color:"#FF6B35",letterSpacing:".08em"}}>— ๖̶ζ͜͡Mrex</span>
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
