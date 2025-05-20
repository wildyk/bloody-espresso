//'use client';

//import AnalitikSection from '@/app/ui/analitik/analitiksection';
//import GrafikPenjualan from '@/app/ui/analitik/grafikpenjualan';
//import AnalitikSkeleton from './analitikskeleton';

//export default function AnalitikClient() {
  // const [analytics, setAnalytics] = useState(null);
  // const [chartData, setChartData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resAnalytics = await fetch('/api/analytics');
  //       const resPenjualan = await fetch('/api/penjualan');
  //       const dataAnalytics = await resAnalytics.json();
  //       const dataPenjualan = await resPenjualan.json();
  //       setAnalytics(dataAnalytics);
  //       setChartData(dataPenjualan);
  //     } catch (error) {
  //       console.error('Gagal fetch data analitik:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();

  //   const interval = setInterval(fetchData, 30000);
  //   return () => clearInterval(interval);
  // }, []);

  // if (loading || !analytics || !chartData) {
  //   return <AnalitikSkeleton />;
  // }

//  return (

 //     <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Analitik</h1>
 //     <AnalitikSection data={null} />
 //     <GrafikPenjualan data={null} />
  
 // );
//}