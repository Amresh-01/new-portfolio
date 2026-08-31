'use client';
import { Home, Mail } from 'lucide-react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

export const SocialLinks = () => {
  const links = [
    { icon: Home, href: '#', label: 'Home' },
    { icon: FaGithub, href: 'https://github.com/Amresh-01', label: 'GitHub' },
    { icon: Mail, href: 'mailto:amresh.codes@gmail.com', label: 'Email' },
    { icon: FaXTwitter, href: 'https://x.com/Amresh__01', label: 'X' },
  ];

  return (
    <section>
      <div className="flex justify-center gap-6 py-8">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.href}
              aria-label={link.label}
              className="p-3 rounded-full bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            >
              <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </a>
          );
        })}
      </div>
    </section>
  );
};
