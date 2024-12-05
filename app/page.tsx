import HomeContent from '@/components/HomeContent';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <HomeContent />
    </div>
  );
}
