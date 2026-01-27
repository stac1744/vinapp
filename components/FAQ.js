export default function FAQ() {
  const faqs = [{q:'HOW FAST IS THE FLIP?', a:'Most vehicles are recovered within 24 hours.'}, {q:'DO I NEED A TITLE?', a:'Ideally yes, but call us for SC title-less options.'}, {q:'WHAT IF IT DOES NOT RUN?', a:'We pay full price and tow for free regardless of state.'}];
  return (
    <section style={{ backgroundColor: '#fff', padding: '100px 10%' }}>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <h2 style={{ fontSize: '42px', fontWeight: '1000', marginBottom: '40px', textAlign:'center' }}>CLUNKER <span style={{color:'var(--ks-red)'}}>FAQ</span></h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ border: '3px solid #000', padding: '25px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '1000' }}>{f.q}</h3>
              <p style={{ margin: 0, color: '#666' }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
