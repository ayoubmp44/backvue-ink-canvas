import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  const toggleLanguage = (lang: 'en' | 'ar') => {
    setCurrentLang(lang);
    
    // Apply font and direction changes to document
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' font-arabic';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.className = document.documentElement.className.replace(/font-\w+/g, '') + ' font-sans';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem 
          onClick={() => toggleLanguage('en')}
          className={currentLang === 'en' ? 'bg-accent' : ''}
        >
          <span className="text-sm">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => toggleLanguage('ar')}
          className={currentLang === 'ar' ? 'bg-accent' : ''}
        >
          <span className="text-sm font-arabic">العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};