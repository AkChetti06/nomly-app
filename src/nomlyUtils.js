const key = (uid) => `nomly:v2:${uid}`;
export function loadData(uid) {
  try { const raw = localStorage.getItem(key(uid)); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export function saveData(uid, data) {
  try { localStorage.setItem(key(uid), JSON.stringify(data)); return true; } catch { return false; }
}
const normalized = (item) => `${item.ingredients || ''} ${(Array.isArray(item.menu) ? item.menu : []).join(' ')} ${item.name || ''}`.toLowerCase();
export function isSafeForDiet(item, prefs = []) {
  const selected = prefs.filter((p) => p !== 'No Restrictions');
  if (!selected.length) return true;
  const text = normalized(item);
  if (selected.some((p) => ['Halal', 'Kosher', 'Gluten-Free', 'Nut Allergy', 'Shellfish Allergy', 'Dairy-Free'].includes(p))) return false;
  const forbidden = {
    Vegetarian: /\b(chicken|beef|pork|fish|tuna|prawns?|shrimps?|meat|gelatin|seafood|shellfish)\b/,
    Vegan: /\b(chicken|beef|pork|fish|tuna|prawns?|shrimps?|meat|eggs?|milk|cheese|mayo|yoghurt|honey|seafood|shellfish|butter|cream)\b/,
    Pescatarian: /\b(chicken|beef|pork|meat)\b/,
    'Egg-Free': /\b(eggs?|mayo)\b/,
    'No Beef': /\bbeef\b/,
    'No Pork': /\bpork\b/,
  };
  return selected.every((p) => !forbidden[p] || !forbidden[p].test(text));
}
export function matchesCuisine(item, prefs = []) {
  if (!prefs.length || prefs.includes('Open to Exploring') || item.category === 'Recipe') return true;
  return prefs.some((p) => `${item.cuisine || ''} ${item.type || ''}`.toLowerCase().includes(p.toLowerCase()));
}
export function getTravelMinutes(value) { const n = Number.parseInt(String(value), 10); return Number.isFinite(n) ? n : Infinity; }
