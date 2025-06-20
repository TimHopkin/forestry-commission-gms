import React, { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://forestrycommissiongms.netlify.app',
  title = 'Forestry Commission Grant Management System',
  description = 'Digital Land Solutions Grant Management System for England\'s woodland creation initiatives. 2,847+ grants processed, 45,230+ hectares protected.',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + description)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[200px]">
            <div className="space-y-2">
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Facebook</span>
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Twitter</span>
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-800" />
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
              
              <hr className="border-gray-200" />
              
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;