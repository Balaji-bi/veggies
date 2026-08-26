"use client";
import { useState, useMemo, useEffect } from "react";

const VEGETABLES = [
  // Leafy Greens
  { id: 1, en: "Spinach", ta: "கீரை (Keerai)", category: "Leafy Greens" },
  { id: 2, en: "Amaranth Leaves", ta: "முளைக்கீரை (Mulaikeerai)", category: "Leafy Greens" },
  { id: 3, en: "Drumstick Leaves", ta: "முருங்கைக்கீரை (Murungaikeerai)", category: "Leafy Greens" },
  { id: 4, en: "Fenugreek Leaves", ta: "வெந்தயக்கீரை (Vendhayakeerai)", category: "Leafy Greens" },
  { id: 5, en: "Coriander Leaves", ta: "கொத்தமல்லி (Kothamalli)", category: "Leafy Greens" },
  { id: 6, en: "Curry Leaves", ta: "கறிவேப்பிலை (Kariveppilai)", category: "Leafy Greens" },
  { id: 7, en: "Mint Leaves", ta: "புதினா (Pudhina)", category: "Leafy Greens" },
  { id: 8, en: "Cabbage", ta: "முட்டைகோஸ் (Muttaikose)", category: "Leafy Greens" },
  { id: 9, en: "Lettuce", ta: "லெட்யூஸ் (Lettuce)", category: "Leafy Greens" },
  { id: 10, en: "Palak / Indian Spinach", ta: "பசலைக்கீரை (Pasalaikeerai)", category: "Leafy Greens" },
  { id: 11, en: "Agathi Keerai", ta: "அகத்திக்கீரை (Agathikeerai)", category: "Leafy Greens" },
  { id: 12, en: "Ponnanganni Keerai", ta: "பொன்னாங்கண்ணிக்கீரை", category: "Leafy Greens" },
  { id: 13, en: "Manathakkali Keerai", ta: "மணத்தக்காளிக்கீரை", category: "Leafy Greens" },

  // Gourds
  { id: 14, en: "Bottle Gourd", ta: "சுரைக்காய் (Suraikkay)", category: "Gourds" },
  { id: 15, en: "Bitter Gourd", ta: "பாகற்காய் (Pagarkay)", category: "Gourds" },
  { id: 16, en: "Ridge Gourd", ta: "பீர்க்கங்காய் (Peerkangay)", category: "Gourds" },
  { id: 17, en: "Snake Gourd", ta: "புடலங்காய் (Pudalangay)", category: "Gourds" },
  { id: 18, en: "Ash Gourd", ta: "சாம்பல் பூசணிக்காய் (Poosanikkay)", category: "Gourds" },
  { id: 19, en: "Ivy Gourd / Tindora", ta: "கோவைக்காய் (Kovakkay)", category: "Gourds" },
  { id: 20, en: "Pointed Gourd", ta: "கோவைக்காய் (Kombuppagal)", category: "Gourds" },
  { id: 21, en: "Pumpkin", ta: "பரங்கிக்காய் (Parangikkay)", category: "Gourds" },
  { id: 22, en: "Cucumber", ta: "வெள்ளரிக்காய் (Vellarikkay)", category: "Gourds" },
  { id: 23, en: "Chow Chow / Chayote", ta: "சௌ சௌ (Chow Chow)", category: "Gourds" },

  // Root Vegetables
  { id: 24, en: "Potato", ta: "உருளைக்கிழங்கு (Urulaikizhangu)", category: "Root Vegetables" },
  { id: 25, en: "Onion", ta: "வெங்காயம் (Vengayam)", category: "Root Vegetables" },
  { id: 26, en: "Shallots", ta: "சின்ன வெங்காயம் (Chinna Vengayam)", category: "Root Vegetables" },
  { id: 27, en: "Garlic", ta: "பூண்டு (Poondu)", category: "Root Vegetables" },
  { id: 28, en: "Ginger", ta: "இஞ்சி (Inji)", category: "Root Vegetables" },
  { id: 29, en: "Turmeric (fresh)", ta: "மஞ்சள் (Manjal)", category: "Root Vegetables" },
  { id: 30, en: "Carrot", ta: "கேரட் (Carrot)", category: "Root Vegetables" },
  { id: 31, en: "Beetroot", ta: "பீட்ரூட் (Beetroot)", category: "Root Vegetables" },
  { id: 32, en: "Radish", ta: "முள்ளங்கி (Mullangi)", category: "Root Vegetables" },
  { id: 33, en: "Sweet Potato", ta: "சர்க்கரைவள்ளிக்கிழங்கு (Sakkaravalli)", category: "Root Vegetables" },
  { id: 34, en: "Tapioca / Cassava", ta: "மரவள்ளிக்கிழங்கு (Maravalli)", category: "Root Vegetables" },
  { id: 35, en: "Yam (Elephant)", ta: "சேனைக்கிழங்கு (Senaikizhangu)", category: "Root Vegetables" },
  { id: 36, en: "Colocasia / Taro", ta: "சேப்பங்கிழங்கு (Seppankizhangu)", category: "Root Vegetables" },
  { id: 37, en: "Purple Yam", ta: "கருணைக்கிழங்கு (Karunaikizhangu)", category: "Root Vegetables" },
  { id: 38, en: "Turnip", ta: "டர்னிப் (Turnip)", category: "Root Vegetables" },

  // Beans & Pods
  { id: 39, en: "French Beans", ta: "பீன்ஸ் (Beans)", category: "Beans & Pods" },
  { id: 40, en: "Broad Beans / Avarakkai", ta: "அவரைக்காய் (Avarakkai)", category: "Beans & Pods" },
  { id: 41, en: "Cluster Beans", ta: "கொத்தவரங்காய் (Kothavarangay)", category: "Beans & Pods" },
  { id: 42, en: "Drumstick", ta: "முருங்கைக்காய் (Murungakkay)", category: "Beans & Pods" },
  { id: 43, en: "Green Peas", ta: "பட்டாணி (Pattani)", category: "Beans & Pods" },
  { id: 44, en: "Double Beans / Lima Beans", ta: "மொச்சை (Mochai)", category: "Beans & Pods" },
  { id: 45, en: "Sword Beans", ta: "வாள்அவரைக்காய் (Vaalavarakkai)", category: "Beans & Pods" },
  { id: 46, en: "Cowpea (Long Beans)", ta: "காராமணி (Karamani)", category: "Beans & Pods" },
  { id: 47, en: "Okra / Ladies Finger", ta: "வெண்டைக்காய் (Vendaikkai)", category: "Beans & Pods" },

  // Brinjal, Tomato & Peppers
  { id: 48, en: "Brinjal / Eggplant", ta: "கத்திரிக்காய் (Kathirikkay)", category: "Brinjal, Tomato & Peppers" },
  { id: 49, en: "Tomato", ta: "தக்காளி (Thakkali)", category: "Brinjal, Tomato & Peppers" },
  { id: 50, en: "Green Chilli", ta: "பச்சை மிளகாய் (Pachai Milagai)", category: "Brinjal, Tomato & Peppers" },
  { id: 51, en: "Capsicum / Bell Pepper", ta: "குடைமிளகாய் (Kudai Milagai)", category: "Brinjal, Tomato & Peppers" },
  { id: 52, en: "Red Chilli (dried)", ta: "வற்றல் மிளகாய் (Vatral Milagai)", category: "Brinjal, Tomato & Peppers" },

  // Cauliflower & Broccoli
  { id: 53, en: "Cauliflower", ta: "காலிஃப்ளவர் (Cauliflower)", category: "Cauliflower & Broccoli" },
  { id: 54, en: "Broccoli", ta: "ப்ரோக்கோலி (Broccoli)", category: "Cauliflower & Broccoli" },
  { id: 55, en: "Knol Khol / Kohlrabi", ta: "நூல்கோல் (Noolkol)", category: "Cauliflower & Broccoli" },

  // Banana & Plantain
  { id: 56, en: "Raw Banana", ta: "வாழைக்காய் (Vazhaikkay)", category: "Banana & Plantain" },
  { id: 57, en: "Banana Stem", ta: "வாழைத்தண்டு (Vazhaithantu)", category: "Banana & Plantain" },
  { id: 58, en: "Banana Flower", ta: "வாழைப்பூ (Vazhaipoo)", category: "Banana & Plantain" },

  // Others
  { id: 59, en: "Corn / Maize", ta: "சோளம் (Cholam)", category: "Others" },
  { id: 60, en: "Raw Papaya", ta: "பப்பாளிக்காய் (Pappalikkai)", category: "Others" },
  { id: 61, en: "Raw Mango", ta: "மாங்காய் (Mangai)", category: "Others" },
  { id: 62, en: "Raw Jackfruit", ta: "பலாக்காய் (Palakkai)", category: "Others" },
  { id: 63, en: "Breadfruit", ta: "சீமைப்பலா (Seemaipala)", category: "Others" },
  { id: 64, en: "Spring Onion", ta: "வெங்காயத்தாள் (Vengayathal)", category: "Others" },
  { id: 65, en: "Celery", ta: "செலரி (Celery)", category: "Others" },
  { id: 66, en: "Asparagus", ta: "தண்ணீர்விட்டான் கிழங்கு", category: "Others" },
  { id: 67, en: "Mushroom", ta: "காளான் (Kaalan)", category: "Others" },
  { id: 68, en: "Baby Corn", ta: "பேபி கார்ன் (Baby Corn)", category: "Others" },
  { id: 69, en: "Zucchini", ta: "சீமைச்சுரைக்காய் (Seemaisuraikkay)", category: "Others" },
  { id: 70, en: "Artichoke", ta: "ஆர்ட்டிச்சோக்", category: "Others" },
  { id: 71, en: "Chicken", ta: "கோழிக்கறி (Kozhikkari)", category: "Others" },
  { id: 72, en: "Mutton", ta: "ஆட்டுக்கறி (Aattukkari)", category: "Others" },
  { id: 73, en: "Fish", ta: "மீன் (Meen)", category: "Others" },
];

const CATEGORIES = [...new Set(VEGETABLES.map(v => v.category))];

export default function Home() {
  const [prefs, setPrefs] = useState({});
  const [notes, setNotes] = useState({});
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showSend, setShowSend] = useState(false);
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState({ mobile: false, canShare: false });
  const [toast, setToast] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState({});

  // navigator isn't available while the static export is prerendered, so detect on mount.
  useEffect(() => {
    setPlatform({
      mobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
      canShare: typeof navigator.share === "function"
    });
  }, []);

  const setPref = (id, value) => {
    setPrefs(p => ({ ...p, [id]: p[id] === value ? null : value }));
  };

  const setNote = (id, value) => {
    setNotes(n => ({ ...n, [id]: value }));
  };

  const toggleNote = (id) => {
    setExpandedNotes(e => ({ ...e, [id]: !e[id] }));
  };

  const filtered = useMemo(() => {
    let list = VEGETABLES;
    if (activeCategory !== "All") list = list.filter(v => v.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(v => v.en.toLowerCase().includes(q) || v.ta.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const filledCount = Object.values(prefs).filter(v => v).length;

  const buildMailBody = () => {
    const liked = VEGETABLES.filter(v => prefs[v.id] === "like");
    const disliked = VEGETABLES.filter(v => prefs[v.id] === "dislike");

    let body = "🥬 MY VEGETABLE PREFERENCES\n";
    body += "═══════════════════════════\n\n";

    if (liked.length) {
      body += "✅ LIKED VEGETABLES:\n";
      liked.forEach(v => {
        body += `  • ${v.en} — ${v.ta}`;
        if (notes[v.id]) body += `\n    📝 ${notes[v.id]}`;
        body += "\n";
      });
      body += "\n";
    }

    if (disliked.length) {
      body += "❌ DISLIKED VEGETABLES:\n";
      disliked.forEach(v => {
        body += `  • ${v.en} — ${v.ta}`;
        if (notes[v.id]) body += `\n    📝 ${notes[v.id]}`;
        body += "\n";
      });
      body += "\n";
    }

    const noted = VEGETABLES.filter(v => notes[v.id] && !prefs[v.id]);
    if (noted.length) {
      body += "📝 NOTES ONLY (no preference set):\n";
      noted.forEach(v => {
        body += `  • ${v.en} — ${v.ta}\n    📝 ${notes[v.id]}\n`;
      });
    }

    return body;
  };

  // Gmail's mobile web redirects ?view=cm to the legacy inbox (/mail/mu/mp/...) and throws
  // away to/su/body, so that URL can never prefill a draft on a phone. Everything below
  // routes around it: mailto: hands off to the installed Gmail/mail app, the native share
  // sheet is the backup, and the clipboard is the always-works floor.
  const SUBJECT = "My Vegetable Preferences List";

  // Mail apps silently truncate long mailto: URLs. Tamil letters and emoji cost 9 chars each
  // once percent-encoded, so the pretty body blows past any safe limit almost immediately.
  const MAILTO_MAX = 1800;

  const buildCompactBody = () => {
    const line = v => `- ${v.en}${notes[v.id] ? ` (${notes[v.id]})` : ""}`;
    const liked = VEGETABLES.filter(v => prefs[v.id] === "like");
    const disliked = VEGETABLES.filter(v => prefs[v.id] === "dislike");
    const noted = VEGETABLES.filter(v => notes[v.id] && !prefs[v.id]);

    let body = "MY VEGETABLE PREFERENCES\n\n";
    if (liked.length) body += `LIKED:\n${liked.map(line).join("\n")}\n\n`;
    if (disliked.length) body += `DISLIKED:\n${disliked.map(line).join("\n")}\n\n`;
    if (noted.length) body += `NOTES ONLY:\n${noted.map(line).join("\n")}\n`;
    return body;
  };

  // Slicing mid-emoji leaves a lone surrogate and encodeURIComponent throws on it.
  const sliceSafe = (text, n) => {
    const out = text.slice(0, n);
    return /[\uD800-\uDBFF]$/.test(out) ? out.slice(0, -1) : out;
  };

  const buildMailtoUrl = () => {
    let body = buildMailBody();
    if (encodeURIComponent(body).length > MAILTO_MAX) body = buildCompactBody();
    if (encodeURIComponent(body).length > MAILTO_MAX) {
      const tail = "\n\n[Trimmed to fit your mail app - the full list is on your clipboard, paste it here.]";
      const budget = MAILTO_MAX - encodeURIComponent(tail).length;
      let cut = body.length;
      while (cut > 0 && encodeURIComponent(sliceSafe(body, cut)).length > budget) cut -= 20;
      body = sliceSafe(body, Math.max(cut, 0)) + tail;
    }
    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;
  };

  const fullText = () => `${SUBJECT}\n\n${buildMailBody()}`;

  const copyBody = async () => {
    const text = fullText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openSend = () => {
    if (!email) {
      setToast("Please enter your email address");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setCopied(false);
    setShowSend(true);
  };

  const openMailApp = async () => {
    await copyBody(); // so a trimmed draft can still be completed with a paste
    window.location.href = buildMailtoUrl();
    setToast("Opening your mail app - full list copied too");
    setTimeout(() => setToast(null), 4000);
  };

  const openGmailWeb = () => {
    const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${encodeURIComponent(email)}` +
      `&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(buildMailBody())}`;
    window.open(url, "_blank", "noopener");
    setShowSend(false);
  };

  const shareBody = async () => {
    try {
      await navigator.share({ title: SUBJECT, text: fullText() });
      setShowSend(false);
    } catch {
      // share sheet dismissed - leave the sheet open so another option can be picked
    }
  };

  const sheetBtn = (primary) => ({
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    width: "100%", padding: "13px 14px", borderRadius: 10, marginBottom: 9,
    fontSize: 14.5, fontWeight: 700, fontFamily: "inherit",
    border: primary ? "none" : "1.5px solid #c8dcc8",
    background: primary ? "#2d6a2d" : "#fff",
    color: primary ? "#fff" : "#2d6a2d",
    cursor: "pointer", boxSizing: "border-box"
  });

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(v => {
      if (!map[v.category]) map[v.category] = [];
      map[v.category].push(v);
    });
    return map;
  }, [filtered]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 780, margin: "0 auto", padding: "20px 16px", background: "#fafdf7", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 38, marginBottom: 4 }}>🥦</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a3a1a", margin: 0, letterSpacing: "-0.3px" }}>
          Vegetable Preferences
        </h1>
        <p style={{ fontSize: 13, color: "#5a7a5a", margin: "6px 0 0" }}>
          English & Tamil — {VEGETABLES.length} vegetables · {filledCount} rated
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <input
          type="text"
          placeholder="Search vegetables in English or Tamil..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "10px 14px 10px 36px", borderRadius: 10,
            border: "1.5px solid #c8dcc8", fontSize: 14, background: "#fff",
            outline: "none", boxSizing: "border-box", color: "#1a3a1a"
          }}
        />
        <span style={{ position: "absolute", left: 12, top: 11, fontSize: 15, opacity: 0.45 }}>🔍</span>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {["All", ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              border: activeCategory === cat ? "1.5px solid #2d6a2d" : "1.5px solid #d0e0d0",
              background: activeCategory === cat ? "#2d6a2d" : "#fff",
              color: activeCategory === cat ? "#fff" : "#3a6a3a",
              cursor: "pointer", transition: "all 0.15s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vegetable Cards */}
      {Object.entries(grouped).map(([category, vegs]) => (
        <div key={category} style={{ marginBottom: 22 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px",
            color: "#5a8a5a", marginBottom: 8, paddingLeft: 2
          }}>
            {category}
          </div>

          {vegs.map(v => {
            const pref = prefs[v.id];
            const hasNote = expandedNotes[v.id];
            return (
              <div
                key={v.id}
                style={{
                  background: "#fff",
                  border: pref === "like" ? "1.5px solid #4caf50" : pref === "dislike" ? "1.5px solid #e07a7a" : "1.5px solid #e0ece0",
                  borderRadius: 10, padding: "10px 14px", marginBottom: 6,
                  transition: "all 0.15s"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a3a1a" }}>{v.en}</div>
                    <div style={{ fontSize: 12.5, color: "#6a8a6a", marginTop: 1 }}>{v.ta}</div>
                  </div>

                  <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                    <button
                      onClick={() => setPref(v.id, "like")}
                      title="Like"
                      style={{
                        width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer",
                        fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                        background: pref === "like" ? "#e8f5e9" : "#f5f5f5",
                        transform: pref === "like" ? "scale(1.1)" : "scale(1)",
                        transition: "all 0.12s"
                      }}
                    >
                      {pref === "like" ? "💚" : "👍"}
                    </button>
                    <button
                      onClick={() => setPref(v.id, "dislike")}
                      title="Dislike"
                      style={{
                        width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer",
                        fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                        background: pref === "dislike" ? "#fce4ec" : "#f5f5f5",
                        transform: pref === "dislike" ? "scale(1.1)" : "scale(1)",
                        transition: "all 0.12s"
                      }}
                    >
                      {pref === "dislike" ? "💔" : "👎"}
                    </button>
                    <button
                      onClick={() => toggleNote(v.id)}
                      title="Add notes"
                      style={{
                        width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer",
                        fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                        background: notes[v.id] ? "#fff8e1" : "#f5f5f5",
                        transition: "all 0.12s"
                      }}
                    >
                      {notes[v.id] ? "📝" : "✏️"}
                    </button>
                  </div>
                </div>

                {hasNote && (
                  <div style={{ marginTop: 8 }}>
                    <textarea
                      placeholder="How do you like it cooked? Any preference..."
                      value={notes[v.id] || ""}
                      onChange={e => setNote(v.id, e.target.value)}
                      rows={2}
                      style={{
                        width: "100%", padding: "8px 10px", borderRadius: 8,
                        border: "1.5px solid #d8e8d8", fontSize: 13, resize: "vertical",
                        background: "#fafdf7", outline: "none", boxSizing: "border-box",
                        fontFamily: "inherit", color: "#1a3a1a"
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#8aaa8a", fontSize: 14 }}>
          No vegetables match your search.
        </div>
      )}

      {/* Send Section */}
      <div style={{
        position: "sticky", bottom: 0, background: "#f0f7f0", borderTop: "1.5px solid #c8dcc8",
        padding: "14px 16px", margin: "30px -16px 0", borderRadius: "14px 14px 0 0",
        boxShadow: "0 -4px 20px rgba(0,60,0,0.06)"
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#2d6a2d", marginBottom: 8 }}>
          📩 Send my preferences via email
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              flex: 1, padding: "10px 12px", borderRadius: 8,
              border: "1.5px solid #c8dcc8", fontSize: 14, outline: "none",
              background: "#fff", color: "#1a3a1a"
            }}
          />
          <button
            onClick={openSend}
            disabled={filledCount === 0}
            style={{
              padding: "10px 22px", borderRadius: 8, border: "none",
              background: filledCount > 0 ? "#2d6a2d" : "#b0c8b0",
              color: "#fff", fontWeight: 700, fontSize: 14, cursor: filledCount > 0 ? "pointer" : "default",
              transition: "all 0.15s", whiteSpace: "nowrap"
            }}
          >
            Send ✉️
          </button>
        </div>
        {filledCount === 0 && (
          <div style={{ fontSize: 11.5, color: "#8aaa8a", marginTop: 6 }}>
            Rate at least one vegetable to enable sending.
          </div>
        )}
      </div>

      {/* Send Sheet — Gmail's mobile web can't be prefilled, so offer routes that can */}
      {showSend && (
        <div
          onClick={() => setShowSend(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(10,30,10,0.45)", zIndex: 200,
            display: "flex", alignItems: "flex-end", justifyContent: "center"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", width: "100%", maxWidth: 780, boxSizing: "border-box",
              borderRadius: "16px 16px 0 0", padding: "16px 16px 22px",
              maxHeight: "88vh", overflowY: "auto", boxShadow: "0 -6px 30px rgba(0,40,0,0.25)"
            }}
          >
            <div style={{ width: 38, height: 4, borderRadius: 2, background: "#d8e8d8", margin: "0 auto 14px" }} />

            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a3a1a", marginBottom: 3 }}>
              Send to {email}
            </div>
            <div style={{ fontSize: 12.5, color: "#5a7a5a", marginBottom: 16 }}>
              {filledCount} vegetables rated · pick how you'd like to send it
            </div>

            {platform.mobile ? (
              <>
                <button onClick={openMailApp} style={sheetBtn(true)}>
                  📧 Open Gmail / mail app
                </button>
                {platform.canShare && (
                  <button onClick={shareBody} style={sheetBtn(false)}>
                    📤 Share to an app
                  </button>
                )}
              </>
            ) : (
              <>
                <button onClick={openGmailWeb} style={sheetBtn(true)}>
                  📧 Open Gmail in a new tab
                </button>
                <button onClick={openMailApp} style={sheetBtn(false)}>
                  ✉️ Open my default mail app
                </button>
              </>
            )}

            <button onClick={copyBody} style={sheetBtn(false)}>
              {copied ? "✅ Copied to clipboard" : "📋 Copy the whole list"}
            </button>

            <div style={{ fontSize: 11.5, color: "#8aaa8a", lineHeight: 1.5, margin: "12px 0 10px" }}>
              Long lists get trimmed by some mail apps. The full text is copied to your clipboard
              whenever you open a draft — just paste it in if anything is missing.
            </div>

            <details>
              <summary style={{ fontSize: 12.5, color: "#3a6a3a", cursor: "pointer", fontWeight: 600 }}>
                Preview / select the text
              </summary>
              <textarea
                readOnly
                value={fullText()}
                onFocus={e => e.target.select()}
                rows={9}
                style={{
                  width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 8,
                  border: "1.5px solid #d8e8d8", fontSize: 12.5, background: "#fafdf7",
                  color: "#1a3a1a", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical"
                }}
              />
            </details>

            <button
              onClick={() => setShowSend(false)}
              style={{
                width: "100%", padding: "11px", marginTop: 12, borderRadius: 10, border: "none",
                background: "transparent", color: "#8aaa8a", fontSize: 13.5, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
          background: "#1a3a1a", color: "#fff", padding: "10px 20px", borderRadius: 10,
          fontSize: 13, fontWeight: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          zIndex: 100, animation: "fadeIn 0.2s"
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
