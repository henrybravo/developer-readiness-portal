import { Link, Outlet } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className="layout-root">
      <nav className="layout-nav">
        <div className="layout-nav-inner">
          <div className="layout-nav-row">
            <div className="layout-brand-wrap">
              <h1 className="layout-brand">
                <Link to="/" className="nav-brand">Nefira Developer Readiness Portal</Link>
              </h1>
              <div className="layout-nav-links">
                <Link
                  to="/"
                  className="layout-nav-link"
                >
                  Teams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="layout-main bg-pattern">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <p>Nefira Developer Readiness Portal v1.0.0</p>
          <p className="layout-footer-sub">Empowering development teams for success</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
