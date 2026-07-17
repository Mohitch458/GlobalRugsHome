import { useCallback } from 'react';
import { getContactSettings } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

export const useContactLink = () => {
  const handleContactClick = useCallback((e?: React.MouseEvent, productOfInterest?: string) => {
    if (e) {
      e.preventDefault();
    }

    const settings = getContactSettings();
    let body = settings.bodyTemplate;
    
    if (productOfInterest) {
      body = body.replace('{{PRODUCT}}', productOfInterest);
    } else {
      body = body.replace('{{PRODUCT}}', 'N/A');
    }

    const mailtoUrl = `mailto:${encodeURIComponent(settings.email)}?subject=${encodeURIComponent(settings.subject)}&body=${encodeURIComponent(body)}`;

    // Try to copy to clipboard for fallback
    navigator.clipboard.writeText(settings.email).catch(() => {});

    // Show toast for fallback
    toast({
      title: "Opening your email app...",
      description: `If nothing happens, you can email us directly at ${settings.email} (Copied to clipboard!)`,
      duration: 5000,
    });

    // Attempt to open mailto link
    window.location.href = mailtoUrl;
  }, []);

  return { handleContactClick };
};
