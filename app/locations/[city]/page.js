'use client';
import { useParams } from 'next/navigation';
import LeadForm from '../../../components/LeadForm';
export default function CityPage() {
  const params = useParams();
  const name = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return (
    <main>
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '50px', fontWeight: '1000', fontStyle: 'italic' }}>FLIP YOUR CLUNKER IN {name.toUpperCase()}</h1>
      </div>
      <LeadForm />
    </main>
  );
}
