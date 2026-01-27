#!/bin/bash
# KingSTAC v21.2 - ATOMIC DEPLOYMENT (Next.js 15 Fix)

mkdir -p app/api/submit-lead app/market-index app/catalyst-quote app/towing components data

# 1. THE ROOT LAYOUT (The fix for your error)
cat << 'EOF' > app/layout.tsx
import './globals.css'; import Navigation from '../components/Navigation';
export const metadata = { title: 'KingSTAC | Flip That Clunker SC', description: 'Highest payouts for junk cars.' };
export default function RootLayout({ children }) {
  return ( <html lang="en"><body className="min-h-screen flex flex-col bg-[#fcfdfe] text-slate-950 antialiased"><Navigation /><div className="flex-grow">{children}</div></body></html> );
}
EOF

# 2. GLOBAL STYLES
cat << 'EOF' > app/globals.css
@tailwind base; @tailwind components; @tailwind utilities;
body { background-image: radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.04) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.04) 0, transparent 50%); }
.card-premium { @apply bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[40px] md:rounded-[56px] p-8 md:p-12 transition-all; }
.input-premium { @apply w-full p-4 md:p-6 bg-slate-100/50 border-2 border-transparent rounded-2xl md:rounded-3xl text-sm md:text-lg font-bold outline-none focus:border-brand-600 focus:bg-white; }
.btn-payout { @apply bg-brand-600 text-white font-black py-6 rounded-3xl shadow-xl hover:bg-slate-900 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95; }
.tile-select { @apply flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all font-black text-[9px] uppercase tracking-widest gap-2 active:scale-95 hover:border-brand-600; }
.animate-in { animation: fadeIn 0.8s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
EOF

# 3. NAVIGATION (Phone: 843-933-4086)
cat << 'EOF' > components/Navigation.tsx
"use client";
import Link from 'next/link'; import { Car, Phone, Zap } from 'lucide-react';
export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-900 font-black uppercase italic leading-none">
        <Link href="/" className="flex items-center gap-2 group leading-none"><div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-all"><Car size={18} /></div> KINGSTAC</Link>
        <div className="flex items-center gap-4">
          <a href="tel:8439334086" className="flex items-center gap-2 text-xs text-brand-600 font-black italic border border-brand-600/20 px-4 py-2 rounded-full hover:bg-brand-600 hover:text-white transition-all">843.933.4086</a>
          <div className="hidden md:flex gap-6 text-[9px] uppercase font-black tracking-widest text-slate-400"><Link href="/market-index">Prices</Link><Link href="/catalyst-quote">Catalyst</Link><Link href="/towing">Towing</Link></div>
        </div>
      </div>
    </nav>
  );
}
EOF

# 4. HOME PAGE (Flip That Clunker)
cat << 'EOF' > app/page.tsx
import VehicleWizard from '../components/VehicleWizard'; import Footer from '../components/Footer';
import { Newspaper, TrendingUp, HelpCircle, Plus } from 'lucide-react';
export default function Home() {
  return ( <><main className="pt-32 md:pt-48 pb-24 px-4 text-center overflow-hidden text-slate-950 font-black italic uppercase leading-none">
    <h1 className="text-[12vw] md:text-[170px] tracking-tighter leading-[0.7] mb-12 uppercase italic animate-in text-center">FLIP THAT <br/><span className="text-brand-600">CLUNKER.</span></h1><VehicleWizard />
    <div className="mt-56 max-w-5xl mx-auto text-left pb-40 px-4">
      <h2 className="text-6xl font-black italic uppercase mb-20 text-center tracking-tighter">Knowledge Base</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[ { q: "Instant Payouts?", a: "Funds released digitally once vehicle is loaded. 💰" }, { q: "Free Towing?", a: "100% free recovery. No hidden costs. 🗺️" } ].map((faq, i) => (
        <div key={i} className="card-premium p-10 flex flex-col gap-4 hover:border-brand-600/20 transition-all group"><h3 className="text-xl font-black uppercase italic group-hover:text-brand-600 transition-colors leading-none">{faq.q}</h3><p className="text-slate-500 italic font-medium leading-relaxed not-italic lowercase">{faq.a}</p></div>
      ))}</div>
    </div>
  </main><Footer /></> );
}
EOF

# 5. TOWING PAGE (Split Address Fields)
cat << 'EOF' > app/towing/page.tsx
"use client";
import { useState } from 'react'; import { Truck, CheckCircle, Car, Bike, Tractor, HardHat, Warehouse, Zap, Key, Battery, Trash2, Building, Anchor, MapPin, Droplets } from 'lucide-react';
import Footer from '../../components/Footer';
export default function TowingPage() {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Car Tow', pStreet: '', pCity: '', pZip: '', dStreet: '', dCity: '', dZip: '' });
  const update = (e) => setFormData({...formData, [e.target.name]: e.target.value.toUpperCase()});
  const onSubmit = async (e) => { e.preventDefault(); setStatus('loading'); await fetch('/api/submit-lead', { method: 'POST', body: JSON.stringify({...formData, type: 'towing'}) }); setStatus('success'); };
  const services = [{ label: "Car Tow", icon: Car }, { label: "Freight", icon: Truck }, { label: "Forklift", icon: HardHat }, { label: "Sheds", icon: Warehouse }, { label: "Waste Tires", icon: Trash2 }, { label: "Winch Out", icon: Zap }];
  if (status === 'success') return ( <main className="min-h-screen pt-48 px-6 text-center animate-in font-black uppercase italic leading-none text-slate-950"><div className="card-premium max-w-xl mx-auto border-b-8 border-brand-600 shadow-2xl"><h2>Dispatch Confirmed.</h2></div></main> );
  return (
    <><main className="pt-32 md:pt-48 pb-24 px-4 md:px-6 text-center text-slate-950">
        <h1 className="text-[12vw] md:text-[145px] font-black tracking-tighter leading-[0.7] mb-16 uppercase italic animate-in text-center leading-none">RECOVERY <br/><span className="text-brand-600">& LOGISTICS.</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left max-w-6xl mx-auto font-black italic uppercase leading-none">
            <div className="space-y-8 animate-in"><h2 className="text-3xl text-slate-900">Recovery Menu</h2><div className="grid grid-cols-2 gap-2">{services.map((s, i) => (<button key={i} type="button" onClick={() => setFormData({...formData, service: s.label})} className={`tile-select border-slate-100 text-slate-400 hover:border-brand-600 hover:text-brand-600 transition-all text-[12px]`}>{s.label}</button>))}</div></div>
            <form onSubmit={onSubmit} className="card-premium p-6 md:p-10 space-y-4 shadow-2xl border-white relative overflow-hidden italic leading-none">
                <div className="space-y-3 p-4 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[10px] text-brand-600 tracking-widest leading-none">Pickup Address</p><input required name="pStreet" placeholder="STREET" className="input-modern p-3 text-xs" onChange={update} /><div className="grid grid-cols-2 gap-2"><input required name="pCity" placeholder="CITY" className="input-modern p-3 text-xs" onChange={update} /><input required name="pZip" placeholder="ZIP" className="input-modern p-3 text-xs" onChange={update} /></div></div>
                <div className="space-y-3 p-4 bg-slate-50 rounded-3xl border border-slate-100"><p className="text-[10px] text-brand-600 tracking-widest leading-none">Destination</p><input required name="dStreet" placeholder="STREET" className="input-modern p-3 text-xs" onChange={update} /><div className="grid grid-cols-2 gap-2"><input required name="dCity" placeholder="CITY" className="input-modern p-3 text-xs" onChange={update} /><input required name="dZip" placeholder="ZIP" className="input-modern p-3 text-xs" onChange={update} /></div></div>
                <div className="grid grid-cols-2 gap-4"><input required name="name" placeholder="NAME" className="input-modern" onChange={update}/><input required name="phone" placeholder="PHONE" className="input-modern" onChange={update}/></div>
                <button type="submit" className="w-full bg-brand-600 text-white font-black py-8 rounded-[32px] text-lg uppercase shadow-2xl hover:bg-slate-950 transition-all italic leading-none">Authorize Node 🚀</button>
            </form>
        </div>
    </main><Footer /></>
  );
}
EOF

# 6. MARKET INDEX (Live Sync Fix)
cat << 'EOF' > app/market-index/page.tsx
import fs from 'fs/promises'; import path from 'path'; import Footer from '../../components/Footer';
import { ShieldCheck, Wifi } from 'lucide-react';
export const dynamic = 'force-dynamic'; export const revalidate = 0;
export default async function PricingPage() {
  let cats = []; try { const fp = path.join(process.cwd(), 'data', 'prices.json'); cats = JSON.parse(await fs.readFile(fp, 'utf8')); } catch (e) { cats = []; }
  return (
    <><main className="min-h-screen bg-[#fcfdfe] pt-48 pb-24 px-4 text-center text-slate-950 font-black italic uppercase leading-none">
      <div className="max-w-7xl mx-auto animate-in leading-none"><div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/10 rounded-full text-brand-600 font-black text-[9px] uppercase tracking-widest mb-6 animate-pulse italic leading-none"><Wifi size={12} /> Live Sync Active</div>
        <h1 className="text-6xl md:text-[120px] mb-12 text-brand-600 text-center leading-none">Market Index</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left leading-none">{cats.map((c, i) => (
            <div key={i} className="bg-white rounded-[32px] border overflow-hidden shadow-sm transition-all hover:border-brand-600">
              <div className="bg-slate-950 px-8 py-6 flex justify-between text-white font-black italic uppercase tracking-widest leading-none"><h2 className="text-sm uppercase">{c.title}</h2><ShieldCheck className="text-brand-500" size={20} /></div>
              <div className="p-2 overflow-x-auto text-slate-950"><table className="w-full"><tbody>{c.items.map((it, j) => (
                <tr key={j} className="flex justify-between p-5 border-b border-slate-50 last:border-0 font-black items-center leading-none min-w-[280px] hover:bg-slate-50 text-slate-950 text-lg italic uppercase"><td>{it.name}</td><td>{it.price}</td></tr>
              ))}</tbody></table></div>
            </div>
          ))}</div>
      </div></main><Footer /></>
  );
}
EOF

# 7. CATALYST HUB (Serial # + Split Address)
cat << 'EOF' > app/catalyst-quote/page.tsx
"use client";
import { useState } from 'react'; import { UploadCloud, CheckCircle, Camera, ShieldCheck } from 'lucide-react'; import Footer from '../../components/Footer';
export default function CatalystHub() {
  const [status, setStatus] = useState('idle'); const [formData, setFormData] = useState({ name: '', phone: '', email: '', street: '', city: '', zip: '', serial: '' });
  const update = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => { e.preventDefault(); setStatus('loading'); await fetch('/api/submit-lead', { method: 'POST', body: JSON.stringify({...formData, type:'catalyst_quote'}) }); setTimeout(()=>setStatus('success'), 1500); };
  if (status === 'success') return ( <main className="min-h-screen pt-48 px-6 text-center animate-in border-b-[16px] border-brand-600 shadow-xl font-black uppercase italic leading-none text-slate-950"><div className="glass-card p-12 md:p-20 shadow-2xl border-t-8 border-brand-600"><h2>Your information has been sent <br/> to a representative.</h2></div></main> );
  return ( <><main className="min-h-screen pt-32 px-6 text-center text-slate-950 font-black italic leading-none uppercase animate-in"><h1 className="text-6xl md:text-[100px] mb-12 tracking-tighter uppercase leading-none text-center font-black">Catalyst Quote</h1>
      <form onSubmit={onSubmit} className="max-w-xl mx-auto glass-card p-6 md:p-10 text-left overflow-hidden relative not-italic font-black uppercase italic leading-none">
        <label className="border-4 border-dashed rounded-[48px] p-16 flex flex-col items-center bg-slate-50 cursor-pointer hover:border-brand-600 transition-all leading-none">
            <Camera className="text-brand-600 mb-4" size={48}/><span className="text-xs text-slate-400">Upload Media</span><input type="file" multiple className="hidden"/></label>
        <input required name="serial" placeholder="SERIAL #" onChange={update} className="input-premium mt-6"/><input required name="name" placeholder="FULL NAME" onChange={update} className="input-modern"/><input required name="phone" placeholder="PHONE" onChange={update} className="input-modern"/><input required name="street" placeholder="STREET" onChange={update} className="input-modern"/><div className="grid grid-cols-2 gap-4"><input required name="city" placeholder="CITY" onChange={update} className="input-modern"/><input required name="zip" placeholder="ZIP" onChange={update} className="input-modern"/></div>
        <button type="submit" className="btn-payout w-full italic font-black uppercase leading-none">Get Analysis 💎</button>
      </form></main><Footer /></> );
}
EOF

# 8. FINALIZE & BUILD
cat << 'EOF' > components/VehicleWizard.tsx
"use client";
import { useState } from 'react'; import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, ArrowRight, Camera, Check, X, ShieldCheck, Car, Zap } from 'lucide-react';
export default function VehicleWizard() {
  const [step, setStep] = useState(1); const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ vin: '', runs: '', drives: '', shifts: '', street: '', city: '', zip: '', name: '', phone: '', email: '', issues: [] });
  const update = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const toggleIssue = (i) => setFormData(p => ({...p, issues: p.issues.includes(i) ? p.issues.filter(x => x !== i) : [...p.issues, i]}));
  const onSubmit = async (e) => { e.preventDefault(); setStatus('loading'); await fetch('/api/submit-lead', { method: 'POST', body: JSON.stringify({...formData, type: 'vehicle'}) }); setTimeout(() => setStatus('success'), 1500); };
  if (status === 'success') return ( <div className="card-premium p-10 md:p-20 text-center animate-in border-b-[16px] border-brand-600 text-slate-950 font-black italic leading-none"> <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 shadow-xl animate-bounce" /><h2>Offer Transmitted. <br/> Check Your Email.</h2></div> );
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-center mb-8 gap-4">{[1,2,3,4].map(i => (<div key={i} className={`h-1.5 transition-all duration-700 ${step === i ? 'w-16 bg-brand-600 shadow-lg' : 'w-4 bg-slate-100'}`} />))}</div>
      <form onSubmit={onSubmit} className="card-premium relative overflow-hidden text-left font-black uppercase italic leading-none">
        {step === 1 && ( <div className="text-center animate-in"><h2 className="text-3xl md:text-5xl mb-12 text-slate-950 tracking-tighter">Vehicle ID Number</h2><input required name="vin" placeholder="ENTER VIN" value={formData.vin} onChange={(e)=>setFormData({...formData, vin: e.target.value.toUpperCase()})} className="input-modern font-mono text-center tracking-widest" maxLength={17}/><button type="button" onClick={()=>setStep(2)} disabled={formData.vin.length<17} className="btn-payout w-full mt-10">Next Step</button></div> )}
        {step === 2 && ( <div className="text-center animate-in"><h2 className="text-3xl mb-10 text-brand-600">Audit Profile</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 text-slate-950">
          {[ { id: 'hasTitle', label: 'Title', icon: ShieldCheck }, { id: 'runs', label: 'Starts', icon: Zap }, { id: 'drives', label: 'Drives', icon: Car } ].map(item => ( <button key={item.id} type="button" onClick={() => update({target:{name:item.id, value:!formData[item.id]}})} className={`tile-select border-2 ${formData[item.id] ? 'border-brand-600 bg-brand-50' : 'border-slate-50 text-slate-400'}`}><item.icon size={18} /><span>{item.label}</span></button> ))}</div><input required name="mileage" type="number" placeholder="Actual Miles" onChange={update} className="input-modern text-center font-black" /><button type="button" onClick={()=>setStep(3)} className="btn-payout w-full mt-10 font-black italic">Next</button></div> )}
        {step === 3 && ( <div className="space-y-4 animate-in text-center italic font-black"><h2 className="text-4xl uppercase mb-10 text-brand-600 underline leading-none">Contact Info</h2><input required name="name" placeholder="FULL NAME" onChange={update} className="input-modern text-center" /><input required name="phone" placeholder="PHONE" onChange={update} className="input-modern text-center" /><input required name="email" type="email" placeholder="EMAIL" onChange={update} className="input-modern text-center" /><button type="submit" className="w-full bg-brand-600 text-white py-6 rounded-3xl shadow-xl mt-4 font-black uppercase italic leading-none">{status==='loading' ? "Deploying..." : "Get Payout 💰"}</button></div> )}
      </form>
    </div>
  );
}
EOF

cat << 'EOF' > Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx next build
EXPOSE 3000
CMD ["npm", "start"]
EOF

cat << 'EOF' > docker-compose.yml
services:
  vinapp:
    build: .
    container_name: vinapp
    restart: always
    ports: ["3000:3000"]
    volumes: ["/var/www/vinapp/data:/app/data"]
EOF

echo "🚀 Launching Omni-Node v21.2..."
docker rm -f vinapp || true
docker compose up -d --build
