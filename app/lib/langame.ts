"use server";


const API_TOKEN = process.env.LANGAME_API_TOKEN || "";
const BASE_URL = process.env.LANGAME_API_URL || "";


const RAW_PC_MAPPING: Record<string, [string, string]> = {
    "03560274-043C-05E0-6C06-340700080009": ["Standard", "18"],
    "03560274-043C-05E0-6A06-940700080009": ["Standard", "25"],
    "03560274-043C-05E0-6A06-960700080009": ["Standard", "24"],
    "03560274-043C-05E0-6A06-9D0700080009": ["Standard", "23"],
    "03560274-043C-05E0-6906-B50700080009": ["Standard", "21"],
    "03560274-043C-05E0-6C06-930700080009": ["Standard", "20"],
    "03560274-043C-05E0-6C06-840700080009": ["Standard", "19"],
    "03560274-043C-05E0-6A06-190700080009": ["Standard", "17"],
    "03560274-043C-05E0-6A06-CC0700080009": ["Standard", "15"],
    "03560274-043C-05E0-6D06-7D0700080009": ["Standard", "16"],
    "03560274-043C-05E0-6C06-850700080009": ["Standard", "14"],
    "03560274-043C-05E0-6A06-950700080009": ["Standard", "13"],
    "03560274-043C-05E0-6C06-D50700080009": ["Standard", "11"],
    "03560274-043C-05E0-6A06-160700080009": ["Standard", "12"],
    "03560274-043C-05E0-6C06-350700080009": ["Standard", "22"],
    
    // Duo
    "03560274-043C-05E0-6A06-CF0700080009": ["Duo", "29"],
    "03560274-043C-05E0-6C06-A80700080009": ["Duo", "30"],
    
    // Bootcamp
    "03560274-043C-05E0-6A06-110700080009": ["Bootcamp", "10"],
    "03560274-043C-05E0-6A06-120700080009": ["Bootcamp", "9"],
    "03560274-043C-05E0-6A06-CB0700080009": ["Bootcamp", "8"],
    "03560274-043C-05E0-6D06-2C0700080009": ["Bootcamp", "7"],
    "03560274-043C-05E0-6A06-140700080009": ["Bootcamp", "6"],
    
    // VIP
    "03560274-043C-05E0-6906-F30700080009": ["VIP", "1"],
    "03560274-043C-05E0-6906-B70700080009": ["VIP", "2"],
    "03560274-043C-05E0-6906-F10700080009": ["VIP", "3"],
    "03560274-043C-05E0-6906-EF0700080009": ["VIP", "4"],
    "03560274-043C-05E0-6A06-040700080009": ["VIP", "5"],
    
    // Solo
    "03FF0210-04E0-056C-6106-350700080009": ["Solo Pro", "31"],
    "03FF0210-04E0-056C-6006-4A0700080009": ["Solo Pro", "32"],
    "03FF0210-04E0-056C-6006-420700080009": ["Solo Premium", "33"],
    "03FF0210-04E0-056C-6006-7D0700080009": ["Solo Premium", "34"],
    
    // Sim
    "03560274-043C-05E0-6A06-AD0700080009": ["Sim", "1"],
    "03560274-043C-05E0-6A06-130700080009": ["Sim", "2"],
    "F9E05B73-A420-D814-A1FB-345A60D4D6A0": ["Sim", "3"],
    "D6D40997-4848-D914-AB7E-345A60D4D6C0": ["Sim", "4"],

    // PS5
    "rele_192.168.88.155": ["PS5 VIP", "TV1"],
    "rele_192.168.88.156": ["PS5 Standard", "TV2"]
};

// --- 2. ГРУППИРОВКА И ПЕРЕИМЕНОВАНИЕ ---
type ZoneInfo = { title: string, uuids: string[], color: string };
const ZONES_STRUCTURE: Record<string, ZoneInfo> = {};

Object.entries(RAW_PC_MAPPING).forEach(([uuid, info]) => {
  const originalZoneName = info[0];
  
  // ПЕРЕИМЕНОВАНИЕ ДЛЯ КЛИЕНТА (Сделаем названия понятными)
  let displayTitle = originalZoneName;
  if (originalZoneName === "Standard") displayTitle = "Общий зал";
  if (originalZoneName === "VIP") displayTitle = "VIP Bootcamp";
  if (originalZoneName === "Sim") displayTitle = "Автосимулятор";
  if (originalZoneName === "PS5 VIP") displayTitle = "PS5 VIP Комната";
  if (originalZoneName === "PS5 Standard") displayTitle = "PS5 Lounge";
  
  if (!ZONES_STRUCTURE[originalZoneName]) {
    let color = "#00F0FF"; 
    if (originalZoneName.includes("VIP")) color = "#FFD700"; 
    if (originalZoneName.includes("Bootcamp")) color = "#FF2E63"; 
    if (originalZoneName.includes("Sim")) color = "#FF8C00"; 
    if (originalZoneName.includes("Solo")) color = "#B900FF"; 
    if (originalZoneName.includes("Duo")) color = "#00FF7F"; 
    if (originalZoneName.includes("PS5")) color = "#FFFFFF";

    ZONES_STRUCTURE[originalZoneName] = {
      title: displayTitle,
      uuids: [],
      color: color
    };
  }
  ZONES_STRUCTURE[originalZoneName].uuids.push(uuid.toLowerCase());
});


export type LangameSession = {
  id: number;
  guest_id: number;
  date_start: string;
  date_stop: string | null; 
  UUID?: string; 
};

type LangameResponse = {
  status: boolean;
  data: LangameSession[];
  on_page: number;
  total_pages: number;
};

export type ClubZone = {
  id: number;
  title: string;
  pc_count: number;
  free_pc_count: number;
  color?: string;
};

async function fetchLangame<T>(endpoint: string): Promise<T | null> {
  // ПРОВЕРКА НАЛИЧИЯ ТОКЕНА
  if (!API_TOKEN) {
    console.error("Langame API Token is missing in environment variables!");
    return null;
  }

  try {
    const url = `${BASE_URL}${endpoint}?page=1&page_limit=60`;
    
    // В серверных компонентах Next.js console.log выводится только в терминал сервера,
    // пользователь его не увидит.
    // console.log(`Fetching: ${url}`); 
    
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-API-KEY": API_TOKEN },
      next: { revalidate: 10 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("Fetch Error:", e);
    return null;
  }
}

export async function getClubStatus(): Promise<ClubZone[] | null> {
  
  const response = await fetchLangame<LangameResponse>("/guests/sessions");
  
  let sessions: LangameSession[] = [];
  if (Array.isArray(response)) sessions = response;
  else if (response && typeof response === 'object') {
     const arr = Object.values(response).find(v => Array.isArray(v));
     if (arr) sessions = arr as LangameSession[];
  }

  const now = new Date();
  const activeUUIDs = new Set<string>();

  sessions.forEach(s => {
    if (!s.UUID) return;

    let isActive = false;
    if (!s.date_stop) {
      isActive = true;
    } else {
      // Корректировка часового пояса (Москва +3)
      const stopIso = s.date_stop.replace(" ", "T") + "+03:00"; 
      const stopTime = new Date(stopIso);
      if (stopTime > now) {
        isActive = true;
      }
    }

    if (isActive) activeUUIDs.add(s.UUID.toLowerCase());
  });

  const stats: ClubZone[] = Object.values(ZONES_STRUCTURE).map((zone, idx) => {
    const totalPc = zone.uuids.length;
    const busyPc = zone.uuids.filter(uuid => activeUUIDs.has(uuid)).length;
    
    return {
      id: idx + 1,
      title: zone.title, 
      pc_count: totalPc,
      free_pc_count: Math.max(0, totalPc - busyPc),
      color: zone.color
    };
  });

  return stats.sort((a, b) => b.pc_count - a.pc_count);
}