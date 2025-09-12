import { createClient } from '@supabase/supabase-js';

// Single, clean data service implementation
const LOCAL_KEY = 'shopifyProjects';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function ensureIds(arr) {
  return (arr || []).map(p => ({
    id: p.id || (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2,8)}`),
    ...p,
  }));
}

async function getProjectsLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const withIds = ensureIds(parsed);
    if (withIds.length !== parsed.length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(withIds));
    }
    return withIds;
  } catch (e) {
    console.error('Failed to read local projects', e);
    return [];
  }
}

async function saveAllLocal(projects) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(projects));
}

async function getProjectsRemote() {
  if (!supabase) return getProjectsLocal();
  const { data, error } = await supabase
    .from('projects')
    .select('id,title,desc,desktop_img,mobile_img,link,order_index,created_at')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    console.warn('Supabase fetch failed, falling back to local', error);
    return getProjectsLocal();
  }
  return (data || []).map(r => ({
    id: r.id,
    title: r.title,
    desc: r.desc,
    desktopImg: r.desktop_img,
    mobileImg: r.mobile_img,
    link: r.link,
  }));
}

async function saveAllRemote(projects) {
  if (!supabase) return saveAllLocal(projects);
  const rows = (projects || []).map((p, idx) => ({
    id: p.id,
    title: p.title,
    desc: p.desc,
    desktop_img: p.desktopImg,
    mobile_img: p.mobileImg,
    link: p.link,
    order_index: idx,
  }));
  const { error: upErr } = await supabase.from('projects').upsert(rows, { onConflict: 'id' });
  if (upErr) {
    console.error('Supabase upsert failed, saving local as fallback', upErr);
    return saveAllLocal(projects);
  }
  // Prune rows that are no longer present
  try {
    const keepIds = new Set(rows.map(r => r.id));
    const { data: existing, error: selErr } = await supabase.from('projects').select('id');
    if (!selErr && Array.isArray(existing)) {
      const staleIds = existing.map(r => r.id).filter(id => !keepIds.has(id));
      if (staleIds.length > 0) {
        const { error: delErr } = await supabase.from('projects').delete().in('id', staleIds);
        if (delErr) console.warn('Supabase delete of stale rows failed', delErr);
      }
    }
  } catch (e) {
    console.warn('Cleanup of stale rows failed', e);
  }
}

const dataService = {
  async getProjects() {
    return supabase ? getProjectsRemote() : getProjectsLocal();
  },
  async saveAll(projects) {
    return supabase ? saveAllRemote(projects) : saveAllLocal(projects);
  },
};

export default dataService;
