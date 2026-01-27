'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import SuccessModal from '../../components/SuccessModal';

function BidContent() {
  const searchParams = useSearchParams();
  const carHash = searchParams.get('car');
  const buyer = decodeURIComponent(searchParams.get('buyer') || 'Partner');
  const [v, setV] = useState(null);
  const [amt, setAmt] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { if (carHash) fetch(`/api/get-vehicle?hash=${carHash}`).then(r => r.json()).then(d => { const vd = Array.isArray(d.vehicle) ? d.vehicle[0] : (Array.isArray(d) ? d[0] : (d.vehicle || d)); if(vd && (vd.vin || vd.year)) setV(vd); }); }, [carHash]);
  
  const submit = async () => {
    const res = await fetch('/api/submit-bid', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ carHash, buyerName: buyer, bidAmount: parseFloat(amt) }) });
    if (res.ok) setShowModal(true);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '50px auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', padding: '0 20px', fontFamily: 'sans-serif' }}>
      {showModal && <SuccessModal title="[ OFFER_SEALED ]" msg="ENTRY VERIFIED. 🤐" onClose={() => window.location.reload()} />}
      <div className="ks-card">
        <h1 style={{fontWeight:'1000'}}>{v ? `${v.year} ${v.make} ${v.model}` : 'AUCTION'}</h1>
        <p>WEIGHT: {v?.curb_weight_lbs || v?.curb_weight_used || '---'} LBS</p>
        {v?.hasAllWheels === 'no' && <div style={{ background:'var(--ks-red)', color:'#fff', padding:'15px', fontWeight:'1000', textAlign:'center' }}>⚠️ 4 WHEELS MISSING</div>}
      </div>
      <div className="ks-card" style={{ borderColor: 'var(--ks-red)' }}>
        <h3>PLACE BINDING BID</h3>
        <input className="ks-input" type="number" value={amt} onChange={e => setAmt(e.target.value)} />
        <button onClick={submit} className="ks-btn">CONFIRM BID</button>
      </div>
    </div>
  );
}
export default function BidPage() { return <Suspense fallback={null}><BidContent /></Suspense>; }
