import NavbarContent from './NavbarContent';

export default function Navbar({ showLogin = true }) {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-10">
      <NavbarContent showLogin={showLogin} />
    </nav>
  );
} 