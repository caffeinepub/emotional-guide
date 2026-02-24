interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

interface ShareResult {
  success: boolean;
  method?: 'native' | 'clipboard';
  error?: string;
}

/**
 * Check if the Web Share API is supported
 */
export function checkWebShareSupport(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Share content using Web Share API with clipboard fallback
 */
export async function shareContent(data: ShareData): Promise<ShareResult> {
  // Try native Web Share API first
  if (checkWebShareSupport()) {
    try {
      await navigator.share(data);
      return { success: true, method: 'native' };
    } catch (error: any) {
      // User cancelled or share failed
      if (error.name === 'AbortError') {
        return { success: false, error: 'Share cancelled' };
      }
      // Fall through to clipboard fallback
    }
  }

  // Fallback to clipboard
  return copyToClipboard(data.url || data.text || '');
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text: string): Promise<ShareResult> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard' };
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return { success: true, method: 'clipboard' };
      } catch (err) {
        document.body.removeChild(textArea);
        return { success: false, error: 'Clipboard copy failed' };
      }
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to copy' };
  }
}

/**
 * Generate share text for conversation summary
 */
export function generateShareText(appName: string, url: string): string {
  return `Check out ${appName} - A safe space to share your feelings and receive supportive guidance. ${url}`;
}
