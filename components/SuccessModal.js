export default function SuccessModal({ title, msg, onClose }) {
  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.9)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:5000, padding:'20px' }}>
      <div className="ks-card" style={{ maxWidth:'500px', textAlign:'center', width:'100%' }}>
        <h1 style={{ fontWeight:'1000', fontSize:'32px', color:'var(--ks-red)' }}>{title}</h1>
        <p style={{ fontWeight:'700', fontSize:'18px', margin:'20px 0' }}>{msg}</p>
        <button className="ks-btn" style={{ background:'#000' }} onClick={onClose}>CLOSE TERMINAL</button>
      </div>
    </div>
  );
}
