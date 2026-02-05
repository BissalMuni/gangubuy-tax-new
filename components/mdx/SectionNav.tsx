'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-16 z-[100] bg-[var(--bg-color)] py-3 mb-6 -mt-4">
      <div className="grid grid-cols-5 gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              activeSection === section.id
                ? 'border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 font-semibold'
                : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-normal hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
