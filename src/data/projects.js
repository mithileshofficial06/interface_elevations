const all = [
  '/images/projects/1`2`12`12.jpeg',
  '/images/projects/21.jpeg',
  '/images/projects/222.jpeg',
  '/images/projects/2222.jpeg',
  '/images/projects/22222222.jpeg',
  '/images/projects/d123.jpeg',
  '/images/projects/dsd.jpeg',
  '/images/projects/dsdsdfs.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.48.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.49.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.50.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.51.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.53.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.54.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.55.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.56.59.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.57.00.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.57.01.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.57.02.jpeg',
  '/images/projects/WhatsApp Image 2026-04-02 at 22.57.03.jpeg',
];

// Build a row of `count` items, cycling through `pool`
function buildRow(pool, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: 'Shop',
    image: pool[i % pool.length],
  }));
}

export const projectRows = [
  buildRow(all, 8),                    // row 1 — ltr
  buildRow([...all].reverse(), 8),     // row 2 — rtl (reversed order for variety)
  buildRow(all.slice(4), 8),           // row 3 — ltr (offset for variety)
];
