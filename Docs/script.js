const EMAIL = "",
  RESUME = "",
  PORTRAIT = "";
const skills = {
  "Programming languages": ["Java", "JavaScript", "Python", "C"],
  Frontend: ["HTML5", "CSS3", "React.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "PHP"],
  Database: ["MongoDB", "MySQL", "SQL"],
  Tools: ["Git", "GitHub", "VS Code", "Postman", "Docker"],
};
const exp = [
  [
    "COMNET",
    "Field Deployment Engineer",
    "Working on field deployment operations, location coordination, technical installations, and troubleshooting.",
  ],
  [
    "UPTOSKILLS",
    "Backend Development Intern",
    "Working on backend development tasks, server-side technologies, and practical software development.",
  ],
  [
    "CODEALPHA",
    "Frontend Development Intern",
    "Built a Currency Converter, Age Calculator, Image Gallery and Music Player.",
  ],
  [
    "LEARN X",
    "Team Lead",
    "Leading technical activities, coordinating team tasks, and contributing to educational technology initiatives.",
  ],
];
const projs = [
  {
    n: "Tech X",
    t: "Learning platform",
    d: "An educational platform for study materials, notes, previous year questions, progress tracking and AI-powered doubt solving.",
    s: ["React", "Node.js", "MongoDB"],
    f: [
      "Study notes",
      "Previous year questions",
      "Progress tracking",
      "AI doubt solving",
    ],
  },
  {
    n: "Om Yogayur Healing",
    t: "Full stack",
    d: "A full-stack web app with authentication, backend functionality and database integration.",
    s: ["React", "Express", "MongoDB"],
    f: ["Authentication", "REST backend", "Database integration"],
  },
  {
    n: "Pinterest Clone",
    t: "Social",
    d: "An image-sharing platform with user authentication, image management and interactive features.",
    s: ["React", "Node.js", "MongoDB"],
    f: ["User accounts", "Image uploads", "Interactive boards"],
  },
  {
    n: "Nova Club",
    t: "Community",
    d: "A college technical club platform with events, activities, announcements, challenges and admin tools.",
    s: ["React", "Node.js", "MongoDB"],
    f: ["Events", "Announcements", "Challenges", "Admin panel"],
  },
  {
    n: "E-commerce Platform",
    t: "In development",
    d: "An e-commerce project covering online shopping, digital products, secure payments and order management.",
    s: ["React", "Node.js", "MongoDB"],
    f: ["Shopping", "Digital products", "Secure payments", "Order management"],
  },
];
const links = {}; // e.g. {"Tech X":{live:"https://…",github:"https://…"}}
const certs = [
  "Python – Great Learning",
  "SQL Certification",
  "Excel Certification",
  "Data Analytics & Visualization Job Simulation",
  "ChatGPT & AI Tools Workshop",
  "C Programming Certification",
];
const $ = (s) => document.querySelector(s);
const chips = (a) => a.map((x) => `<span class="chip">${x}</span>`).join("");
$("#skillGrid").innerHTML = Object.entries(skills)
  .map(
    ([k, v]) =>
      `<div class="card"><h3>${k}</h3><div class="chips">${chips(v)}</div></div>`,
  )
  .join("");
$("#tl").innerHTML = exp
  .map(
    (e) =>
      `<div class="card"><h3>${e[0]}</h3><div class="role">${e[1]}</div><p class="muted">${e[2]}</p></div>`,
  )
  .join("");
$("#projGrid").innerHTML = projs
  .map(
    (p, i) =>
      `<article class="card proj"><div class="shot">${p.n}<span class="badge">${p.t}</span></div><div class="body"><h3>${p.n}</h3><p class="muted">${p.d}</p><div class="chips">${chips(p.s)}</div><div class="acts"><button class="btn p" data-live="${i}">Live demo</button><button class="btn s" data-gh="${i}">GitHub</button><button class="btn s" data-d="${i}">Details</button></div></div></article>`,
  )
  .join("");
$("#certGrid").innerHTML = certs
  .map(
    (c) =>
      `<div class="card"><h3>${c}</h3><p class="muted">Issue date and credential link to be added</p></div>`,
  )
  .join("");
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.style.display = "block";
  clearTimeout(t._);
  t._ = setTimeout(() => (t.style.display = "none"), 3500);
}
function go(u, l) {
  u ? window.open(u, "_blank", "noopener") : toast(l + " link isn’t set yet.");
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-live],[data-gh],[data-d],[data-resume]");
  if (!b) return;
  if (b.dataset.resume !== undefined) {
    e.preventDefault();
    go(RESUME, "Resume");
  } else if (b.dataset.live)
    go((links[projs[b.dataset.live].n] || {}).live, "Live demo");
  else if (b.dataset.gh)
    go((links[projs[b.dataset.gh].n] || {}).github, "GitHub");
  else {
    const p = projs[b.dataset.d];
    $("#mbox").innerHTML =
      `<h3 style="font-size:34px">${p.n}</h3><p class="muted" style="margin:6px 0 14px">${p.t}</p><p>${p.d}</p><h3 style="font-size:22px;margin:18px 0 6px">Key features</h3><ul>${p.f.map((x) => `<li>${x}</li>`).join("")}</ul><div class="chips" style="margin:16px 0">${chips(p.s)}</div><button class="btn p" id="x">Close</button>`;
    $("#modal").classList.add("on");
    $("#x").focus();
  }
});
$("#modal").onclick = (e) => {
  if (e.target.id === "modal" || e.target.id === "x")
    $("#modal").classList.remove("on");
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") $("#modal").classList.remove("on");
});
$("#menu").onclick = () => {
  const o = $("#links").classList.toggle("on");
  $("#menu").setAttribute("aria-expanded", o);
};
$("#links").onclick = () => $("#links").classList.remove("on");
if (PORTRAIT)
  $("#pt").innerHTML =
    `<img src="${PORTRAIT}" alt="Sumit Verma" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;
(async () => {
  const g = $("#gh");
  try {
    const [u, r] = await Promise.all([
      fetch("https://api.github.com/users/sumit73150"),
      fetch(
        "https://api.github.com/users/sumit73150/repos?sort=updated&per_page=5",
      ),
    ]);
    if (!u.ok || !r.ok) throw 0;
    const a = await u.json(),
      b = await r.json();
    g.innerHTML =
      `<div style="display:flex;gap:30px;margin-bottom:10px"><div><div class="big">${a.public_repos}</div>Repositories</div><div><div class="big">${a.followers}</div>Followers</div></div>` +
      b
        .map(
          (x) =>
            `<div class="repo"><a href="${x.html_url}" target="_blank" rel="noopener">${x.name}</a><span>${x.language || ""}</span></div>`,
        )
        .join("");
  } catch {
    g.textContent =
      "GitHub stats are unavailable here. Open the profile to see repositories and contributions.";
  }
})();
$("#f").onsubmit = (e) => {
  e.preventDefault();
  const f = e.target,
    v = (n) => f[n].value.trim();
  let ok = true;
  const chk = {
    name: v("name").length >= 2,
    email: /^\S+@\S+\.\S+$/.test(v("email")),
    subject: v("subject").length >= 3,
    message: v("message").length >= 10,
  };
  const msg = {
    name: "Enter your name.",
    email: "Enter a valid email address.",
    subject: "Enter a subject.",
    message: "Write at least 10 characters.",
  };
  for (const k in chk) {
    f[k].parentElement.querySelector(".err").textContent = chk[k] ? "" : msg[k];
    if (!chk[k]) ok = false;
  }
  if (!ok || f.website.value) return;
  if (!EMAIL) {
    toast("Contact email isn’t set yet. Please reach out on LinkedIn.");
    return;
  }
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(v("subject"))}&body=${encodeURIComponent(v("message") + "\n\n" + v("name") + " (" + v("email") + ")")}`;
  toast("Opening your mail app…");
};
