'use client';
import { useMemo, useState } from 'react';
import SuccessModal from './SuccessModal';

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fd, setFd] = useState({ vin: '', mileage: '', street: '', city: '', zip: '', name: '', phone: '', email: '', runs: true, drives: true, hasTitle: true, hasKey: true, hasCatalytic: true, hasBattery: true, hasAllWheels: true, type: "vehicle_lead", photos: {} });
  
  const update = (k, v) => setFd(prev => ({ ...prev, [k]: v }));
  const toggle = (f) => setFd(p => ({...p, [f]: !p[f]}));

  const phoneDigits = useMemo(() => fd.phone.replace(/\D/g, ''), [fd.phone]);
  const canSubmit = useMemo(() => {
    return (
      fd.vin.trim().length >= 11 &&
      fd.street.trim() &&
      fd.city.trim() &&
      fd.zip.trim().length >= 5 &&
      fd.name.trim().length >= 2 &&
      phoneDigits.length >= 10
    );
  }, [fd, phoneDigits]);

  const submit = async () => {
    if (!canSubmit) {
      alert('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submit-lead', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(fd) });
      const raw = await res.json();
      const data = raw['First Item JSON'] ? raw['First Item JSON'] : (Array.isArray(raw) ? raw[0] : raw);
      const hash = data?.verification_hash || data?.hash;

      if (res.ok && hash) window.location.href = `/status/${hash}`;
      else setShowModal(true);
    } catch (e) {
      alert('OFFLINE');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ks-card fade-in" style={{ maxWidth: '550px', margin: '0 auto' }}>
      {showModal && <SuccessModal title="[ ASSET_LOGGED ]" msg="OFFER PROTOCOL ACTIVE. 🚀 STANDBY FOR UPLINK." onClose={() => window.location.reload()} />}
      {step < 5 && <div style={{textAlign:'center', fontSize:'10px', fontWeight:'1000', color: 'var(--ks-red)', marginBottom:'15px'}}>PHASE {step} / 4</div>}
      
      {step === 1 && (<div>
        <h2>VEHICLE ID</h2>
        <input className="ks-input" placeholder="17-DIGIT VIN" value={fd.vin} onChange={e => update('vin', e.target.value.toUpperCase())} />
        <input className="ks-input" type="number" placeholder="MILEAGE / ODOMETER" value={fd.mileage} onChange={e => update('mileage', e.target.value)} />
        <button className="ks-btn" onClick={() => (fd.vin.length > 10 ? setStep(2) : alert("VIN REQUIRED"))}>CONTINUE</button>
      </div>)}

      {step === 2 && (<div>
        <h2>CONDITION</h2>
        {['runs','drives','hasTitle','hasKey','hasAllWheels'].map(k => (
          <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0', borderBottom:'1px solid #eee'}}>
            <span style={{fontWeight:'800', fontSize:'12px'}}>{k.toUpperCase()}?</span>
            <button onClick={()=>toggle(k)} style={{padding:'8px 15px', background:fd[k]?'#000':'#ccc', color:'#fff', border:'none', fontWeight:'900'}}>{fd[k]?'YES':'NO'}</button>
          </div>
        ))}
        <button className="ks-btn" style={{marginTop:'15px'}} onClick={()=>setStep(3)}>NEXT</button>
      </div>)}

      {step === 3 && (<div>
        <h2>LOCATION</h2>
        <input className="ks-input" placeholder="STREET ADDRESS" onChange={e => update('street', e.target.value)} />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <input className="ks-input" placeholder="CITY" onChange={e => update('city', e.target.value)} />
            <input className="ks-input" placeholder="ZIP CODE" value={fd.zip} onChange={e => update('zip', e.target.value)} />
        </div>
        <button className="ks-btn" onClick={()=>setStep(4)}>LAST STEP</button>
      </div>)}

      {step === 4 && (<div>
        <h2>CONTACT</h2>
        <input className="ks-input" placeholder="NAME" onChange={e => update('name', e.target.value)} />
        <input className="ks-input" placeholder="PHONE" onChange={e => update('phone', e.target.value)} />
        <input className="ks-input" placeholder="EMAIL" onChange={e => update('email', e.target.value)} />
        <button disabled={loading || !canSubmit} className="ks-btn" onClick={submit}>GET OFFER</button>
      </div>)}
    </div>
  );
}
