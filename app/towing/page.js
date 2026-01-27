'use client';
import { useState } from 'react';
import SuccessModal from '../../components/SuccessModal';
export default function Roadside() {
  const [fd, setFd] = useState({ type: 'Towing', pStreet: '', dStreet: '', phone: '', email: '', year: '', make: '', model: '' });
  const [showModal, setShowModal] = useState(false);
  const services = [{n:'Towing', i:'🚚'}, {n:'Jump Start', i:'⚡'}, {n:'Lockout', i:'🔑'}, {n:'Flat Tire', i:'🚗'}, {n:'Fuel', i:'⛽'}, {n:'Winch Out', i:'🚜'}, {n:'Long Distance', i:'🗺️'}, {n:'Accident', i:'🚔'}];
  const update = (k, v) => setFd(p => ({ ...p, [k]: v }));
  const submit = async (e) => { e.preventDefault(); const res = await fetch('/api/submit-roadside', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fd) }); if (res.ok) setShowModal(true); };
  return (
    <div className="ks-card" style={{ maxWidth: '800px', margin: '50px auto' }}>
      {showModal && <SuccessModal title="[ DISPATCH_LOCKED ]" msg="UNIT ACQUIRED. WE’RE ROLLING. 🚛" onClose={() => window.location.reload()} />}
      <h1 style={{ fontWeight: '1000', color: 'var(--ks-red)' }}>ROADSIDE DISPATCH</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px, 1fr))', gap:'10px', marginBottom:'30px' }}>
        {services.map(s => <button key={s.n} onClick={() => setFd({...fd, type: s.n})} style={{ padding:'15px', border: fd.type === s.n ? '4px solid var(--ks-red)' : '2px solid #eee', background: fd.type === s.n ? '#fff5f5' : '#fff', fontWeight:'1000', cursor:'pointer' }}>{s.i} {s.n.toUpperCase()}</button>)}
      </div>
      <form onSubmit={submit}>
        <input className="ks-input" placeholder="PICKUP STREET" onChange={e => setFd({...fd, pStreet: e.target.value})} required />
        <input className="ks-input" placeholder="DROP-OFF STREET" onChange={e => setFd({...fd, dStreet: e.target.value})} required />
        <input className="ks-input" placeholder="PHONE" onChange={e => setFd({...fd, phone: e.target.value})} required />
        <button className="ks-btn">INITIATE DISPATCH</button>
      </form>
    </div>
  );
}
