'use client';
import { useState, useEffect } from 'react';
export default function Market() {
  const [data, setData] = useState({});
  useEffect(() => { fetch('/api/get-market').then(r => r.json()).then(res => {
    const raw = Array.isArray(res) ? res : [];
    const groups = raw.reduce((acc, curr) => { const cat = curr.Category || 'Other'; if (!acc[cat]) acc[cat] = []; acc[cat].push(curr); return acc; }, {});
    setData(groups);
  }); }, []);
  return (
    <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontWeight: '1000', fontSize: '52px', borderLeft:'10px solid var(--ks-red)', paddingLeft:'20px', fontStyle:'italic' }}>RECYCLABLE PRICE SHEET</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '30px' }}>
        {Object.keys(data).map(cat => (
          <div key={cat} className="ks-card">
            <div style={{ background:'var(--ks-red)', color:'#fff', padding:'4px 12px', fontSize:'10px', fontWeight:'1000', marginBottom:'20px', display:'inline-block' }}>{cat.toUpperCase()}</div>
            {data[cat].map((item, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', borderBottom:'1px solid #eee', padding:'10px 0', fontSize:'14px', fontWeight:'800' }}>
                <span>{item.Commodity}</span><span>${parseFloat(item.VendorPrice).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
