/**
 * Synchronize content data from the admin dashboard to the local code files in src/data/*.ts.
 * This ensures that admin changes are instantly written to the source code on disk.
 */
export async function syncDataToFile(
  type: 'services' | 'products' | 'founders' | 'contactInfo',
  data: any
): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      console.warn(`[AdminSync] Failed to sync ${type}:`, errJson);
      return false;
    }

    const result = await res.json();
    console.log(`[AdminSync] ${type} saved to disk:`, result);
    return true;
  } catch (err) {
    console.warn(`[AdminSync] Network error syncing ${type}:`, err);
    return false;
  }
}
