import { fetchAnalytics } from '@/app/lib/data';
import AnalitikSection from '@/app/ui/analitik/analitiksection';

export default async function AnalitikMetricSection() {
  const analytics = await fetchAnalytics();
  return <AnalitikSection data={analytics} />;
}
