import { Link, Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gold text-white shadow-lg border-b-2 border-gold-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-extrabold tracking-tight">
                <Link to="/" className="nav-brand transition-colors">Nefira Developer Readiness Portal</Link>
              </h1>
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className="nav-link px-4 py-2 rounded-md hover:bg-gold-dark transition-colors font-medium"
                >
                  Teams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl bg-pattern">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base font-medium">Nefira Developer Readiness Portal v1.0.0</p>
          <p className="text-sm text-gray-400 mt-2">Empowering development teams for success</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
