import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-coal border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8" />
              <span className="text-2xl font-bold">FIRA</span>
            </Link>
            <p className="mt-4 text-sm text-metallic/80">
              Building the future of AI interaction, one conversation at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-sm text-metallic/80 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-metallic/80 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-metallic/80 hover:text-white">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/docs" className="text-sm text-metallic/80 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-metallic/80 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-metallic/80 hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-sm text-metallic/80 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-metallic/80 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800">
          <p className="text-center text-sm text-metallic/60">
            © {new Date().getFullYear()} FIRA AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;