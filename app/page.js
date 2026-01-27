import LeadForm from '../components/LeadForm';
import Comparison from '../components/Comparison';
import FAQ from '../components/FAQ';
export default function Home() {
  return (
    <main>
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '120px 20px', textAlign: 'center', backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("https://images.unsplash.com/photo-1597766354884-250328816f54?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', borderBottom: '8px solid var(--ks-red)' }}>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: '1000', margin: 0, fontStyle: 'italic', letterSpacing: '-4px', lineHeight: 0.85 }}>FLIP YOUR CLUNKER<br/><span style={{color:'var(--ks-red)', fontStyle:'normal'}}>FOR FAST CASH.</span></h1>
      </div>
      <div style={{ marginTop: '-80px', paddingBottom: '80px' }}><LeadForm /></div>
      <Comparison /><FAQ />
    </main>
  );
}
