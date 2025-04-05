
import { TwitchIcon, Github, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gaming-darker pt-12 pb-6 border-t border-pubg/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TwitchIcon className="h-6 w-6 text-pubg" />
              <span className="font-bold text-xl text-white">PUBG Central</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate hub for live PUBG action, rankings, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pubg transition-colors">
                <TwitchIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pubg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pubg transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pubg transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pubg transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">PUBG Developer API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Twitch Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Community Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Press Kit</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pubg transition-colors">DMCA Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {currentYear} PUBG Central. All rights reserved. Not affiliated with PUBG Corp or Twitch.</p>
          <p className="mt-1">PLAYERUNKNOWN'S BATTLEGROUNDS and PUBG are registered trademarks, trademarks or service marks of KRAFTON.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
