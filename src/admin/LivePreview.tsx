import { useEffect, useRef, useState } from 'react';
import { SiteContent, Plan, Testimonial, Brand, Metric, Pillar, SiteTheme } from '../hooks/useSiteContent';
import { Monitor, Smartphone, RefreshCw } from 'lucide-react';

interface Props {
  content: SiteContent;
  plans: Plan[];
  testimonials: Testimonial[];
  brands: Brand[];
  metrics: Metric[];
  pillars: Pillar[];
  colors?: Record<string, string>;
}

type ViewMode = 'desktop' | 'mobile';

export default function LivePreview({ content, plans, testimonials, brands, metrics, pillars, colors }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const sendUpdate = () => {
    if (!iframeRef.current?.contentWindow) return;

    const theme: SiteTheme | null = colors && Object.keys(colors).length > 0
      ? { id: 'draft', colors, fonts: {}, effects: {} }
      : null;

    iframeRef.current.contentWindow.postMessage({
      type: 'PREVIEW_UPDATE',
      payload: {
        content,
        plans,
        testimonials,
        brands,
        metrics,
        pillars,
        theme,
      },
    }, '*');
  };

  useEffect(() => {
    if (iframeLoaded) sendUpdate();
  }, [content, plans, testimonials, brands, metrics, pillars, colors, iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const reloadIframe = () => {
    setIframeLoaded(false);
    if (iframeRef.current) {
      iframeRef.current.src = '/?preview=1';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-hairline bg-white/80 backdrop-blur-sm">
        <span className="label-mono text-silver-400 text-[10px]">LIVE PREVIEW</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded-lg transition ${viewMode === 'desktop' ? 'bg-ink text-white' : 'text-silver-500 hover:bg-silver-100'}`}
            title="Desktop"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded-lg transition ${viewMode === 'mobile' ? 'bg-ink text-white' : 'text-silver-500 hover:bg-silver-100'}`}
            title="Mobile"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-hairline mx-1" />
          <button
            onClick={reloadIframe}
            className="p-2 rounded-lg text-silver-500 hover:bg-silver-100 transition"
            title="Recarregar"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview container */}
      <div className="flex-1 overflow-hidden flex items-start justify-center p-4 bg-silver-100">
        <div
          className={`relative bg-white rounded-xl shadow-2xl border border-hairline overflow-hidden transition-all duration-500 ease-out ${
            viewMode === 'mobile'
              ? 'w-[375px] h-[812px] rounded-[2.5rem]'
              : 'w-full h-full rounded-xl'
          }`}
          style={viewMode === 'mobile' ? { boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), inset 0 0 0 4px #1a1a1a' } : {}}
        >
          {viewMode === 'mobile' && (
            <div className="absolute top-0 inset-x-0 h-7 bg-[#1a1a1a] z-10 flex items-center justify-center">
              <div className="w-20 h-4 bg-black rounded-full" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/?preview=1"
            onLoad={handleIframeLoad}
            className={`border-0 bg-white ${viewMode === 'mobile' ? 'w-full h-full pt-7' : 'w-full h-full'}`}
            style={{ display: 'block' }}
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}
