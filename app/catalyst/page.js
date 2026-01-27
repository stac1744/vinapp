'use client';
import { useState } from 'react';
import SuccessModal from '../../components/SuccessModal';
export default function Catalyst() {
  const [fd, setFd] = useState({ serialNumber: '', sellerName: '', phone: '', email: '' });
  const [showModal, setShowModal] = useState(false);
  const submit = async () => { const res = await fetch('/api/submit-catalyst', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(fd) }); if (res.ok) setShowModal(true); };
  return (
    <div className="ks-card" style={{ maxWidth: '550px', margin: '50px auto' }}>
      {showModal && <SuccessModal title="[ PGM_AUDIT_OPENED ]" msg="SETTLEMENT PENDING. SYNCING... 💎" onClose={() => window.location.reload()} />}
      <h2 style={{ fontWeight: '1000' }}>CATALYST QUOTE</h2>
      <input className="ks-input" placeholder="SERIAL NUMBER" onChange={e => setFd({...fd, serialNumber: e.target.value.toUpperCase()})} />
      <input className="ks-input" placeholder="NAME" onChange={e => setFd({...fd, sellerName: e.target.value})} />
      <input className="ks-input" placeholder="PHONE" onChange={e => setFd({...fd, phone: e.target.value})} />
      <button className="ks-btn" onClick={submit} style={{background:'#000'}}>GET MARKET VALUE</button>
    </div>
  );
}
