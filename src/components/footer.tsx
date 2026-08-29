import Image from "next/image";
export function Footer() {
  return (
    <footer className="footer-section">

      {}
      <div className="footer-brand">
        <div className="footer-brand-row">
          <span className="footer-brand-label">Mark</span>
          <div className="footer-brand-mark">
            <Image 
              src="/signature.png" 
              alt="Abhijitam Dubey" 
              width={200} 
              height={60} 
              className="footer-signature"
            />
          </div>
        </div>
        <div className="footer-brand-divider" />
        <div className="footer-brand-row">
          <span className="footer-brand-label">Logotype</span>
          <div className="footer-brand-logotype">
            <Image 
              src="/favicon.svg" 
              alt="AD" 
              width={48} 
              height={48} 
              className="footer-logotype-mark"
            />
            <span className="footer-logotype-name">Abhijitam Dubey</span>
          </div>
        </div>
      </div>

      {}
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 Abhijitam Dubey. All rights reserved.</p>
<div className="footer-icons">
          <span className="footer-icon" title="Frontend">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span className="footer-icon-sep" />
          <span className="footer-icon" title="Database">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
            </svg>
          </span>
          <span className="footer-icon-sep" />
          <span className="footer-icon" title="Terminal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </span>
          <span className="footer-icon-sep" />
          <span className="footer-icon" title="Blockchain">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="6" height="10" rx="1" />
              <rect x="9" y="4" width="6" height="16" rx="1" />
              <rect x="16" y="7" width="6" height="10" rx="1" />
            </svg>
          </span>
          <span className="footer-icon-sep" />
          <span className="footer-icon" title="Cloud">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </span>
        </div>
      </div>
    </footer>
  );
}
