'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SellerStatus() {
  const { hash } = useParams();
  const [v, setV] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hash === 'confirmed') return;
    const fetchData = async () => {
      try {
        const r = await fetch(`/api/get-vehicle?hash=${hash}`);
        const d = await r.json();
        const raw = Array.isArray(d.vehicle) ? d.vehicle[0] : (Array.isArray(d) ? d[0] : (d.vehicle || d));
        if(raw && (raw.vin || raw.year)) setV(raw);
        setLoading(false);
      } catch (e) { console.error("Sync error"); }
    };
    fetchData();
  }, [hash]);

  if (hash === 'confirmed') return null;
  if (loading) return <div style={{padding:'100px', textAlign:'center', fontWeight:'1000'}}>[ UPLINKING... ]</div>;

  const floor = parseFloat(v?.finalValue || v?.final_value || 0);
  const high = parseFloat(v?.highest_bid || v?.highestBid || 0);
  const current = high > floor ? high : floor;

  return (
    <main style={{ padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="ks-card" style={{textAlign:'center'}}>
        <h1 style={{fontWeight:'1000', color:'var(--ks-red)', margin:0}}>SETTLEMENT TERMINAL</h1>
        <div style={{ margin: '40px 0' }}>
            <div style={{ fontSize: '12px', fontWeight: '1000', color: '#999' }}>AUTHORIZED PAYOUT</div>
            <div style={{ fontSize: '72px', fontWeight: '1000', margin: '10px 0', letterSpacing:'-4px' }}>
                ${current.toFixed(2)}
            </div>
            <p style={{color:'var(--ks-green)', fontWeight:'1000', fontSize:'12px'}}>✓ PRICE SECURED & VERIFIED</p>
        </div>
        <a href={`https://n8n.mrstac.com/webhook/accepted?vin=${v?.vin}&hash=${hash}`} className="ks-btn">ACCEPT & SCHEDULE PICKUP</a>
      </div>
    </main>
  );
}
