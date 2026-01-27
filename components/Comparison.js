export default function Comparison() {
  const rows = [{u:'True instant offer online', t:'Offers take hours/days', p:'Endless haggling'}, {u:'We pay on the spot', t:'Wait 1-2 weeks for check', p:'Insecure payment'}, {u:'Free towing always', t:'Hidden towing fees', p:'You pay for the tow'}, {u:'Rad People (Local)', t:'Robotic call centers', p:'Stranger danger'}];
  return (
    <section style={{ backgroundColor: '#000', color: '#fff', padding: '100px 10%' }}>
      <h2 style={{ fontSize: '36px', fontWeight: '1000', fontStyle: 'italic', textAlign:'center', marginBottom:'40px' }}>WE’RE DIFFERENT</h2>
      <div style={{ maxWidth: '1000px', margin: 'auto', border: '1px solid #333' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: '#111', padding: '20px', fontWeight: '1000', color: 'var(--ks-red)', borderBottom: '2px solid #333', fontSize: '12px' }}>
          <div>KINGSTAC</div><div>THE OTHER GUYS</div><div>PRIVATE SALE</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', padding: '15px 20px', borderBottom: '1px solid #222', fontSize: '13px' }}>
            <div style={{ fontWeight: '800' }}>{r.u}</div><div>{r.t}</div><div>{r.p}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
