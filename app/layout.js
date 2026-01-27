import "./globals.css";
export default function RootLayout({ children }) {
  const cities = ['Florence', 'Johnsonville', 'Hemingway', 'Charleston', 'Columbia', 'Myrtle Beach', 'Greenville'];
  return (
    <html lang="en">
      <body>
        <nav style={{ backgroundColor: '#fff', borderBottom: '4px solid #000', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%' }}>
            <a href="/" style={{ fontSize: '24px', fontWeight: '1000', color: 'var(--ks-red)', textDecoration: 'none', letterSpacing: '-1px' }}>KINGSTAC</a>
            <a href="tel:8439334086" className="ks-btn" style={{ padding: '8px 15px', fontSize: '11px', width: 'auto' }}>843-933-4086</a>
          </div>
          <div style={{ display: 'flex', gap: '20px', padding: '0 5% 10px 5%', overflowX: 'auto', scrollbarWidth: 'none' }}>
            <a href="/market" style={{ fontWeight: '1000', fontSize: '11px', color: '#000', textDecoration: 'none' }}>MARKET</a>
            <a href="/towing" style={{ fontWeight: '1000', fontSize: '11px', color: '#000', textDecoration: 'none' }}>ROADSIDE</a>
            <a href="/catalyst" style={{ fontWeight: '1000', fontSize: '11px', color: '#000', textDecoration: 'none' }}>CATALYST</a>
            <a href="/blog" style={{ fontWeight: '1000', fontSize: '11px', color: '#000', textDecoration: 'none' }}>THE_FEED</a>
          </div>
        </nav>
        {children}
        <footer style={{ background: '#000', color: '#fff', padding: '60px 10%', textAlign: 'center' }}>
          <h3 style={{ fontSize: '10px', color: 'var(--ks-red)', letterSpacing: '3px', marginBottom: '30px', fontWeight: '1000' }}>SERVICE AREAS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '15px', marginBottom: '40px' }}>
            {cities.map(c => <a key={c} href={`/locations/${c.toLowerCase()}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>{c.toUpperCase()}</a>)}
          </div>
          <p style={{ color: '#444', fontSize: '10px' }}>© 2026 KINGSTAC DISPATCH // SC-NODE</p>
        </footer>
      </body>
    </html>
  )
}
