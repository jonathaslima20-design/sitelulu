import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, X } from 'lucide-react';

const ICON_LIST = [
  'Compass', 'Crosshair', 'Sparkles', 'Globe', 'Globe2', 'Target', 'Zap', 'Lightbulb', 'Rocket',
  'Award', 'Shield', 'Star', 'Heart', 'Brain', 'Cpu', 'Database', 'Network', 'Layers',
  'BarChart', 'BarChart2', 'BarChart3', 'TrendingUp', 'TrendingDown', 'LineChart', 'PieChart',
  'Briefcase', 'Building', 'Building2', 'Store', 'Factory', 'Landmark', 'Banknote', 'Coins',
  'Users', 'User', 'UserCheck', 'UserPlus', 'HandShake', 'Crown', 'Medal', 'Trophy',
  'Megaphone', 'Mic', 'Radio', 'Broadcast', 'Send', 'Mail', 'MessageCircle', 'MessageSquare',
  'Eye', 'EyeOff', 'Search', 'Scan', 'Radar', 'Focus', 'Microscope', 'Telescope',
  'Map', 'MapPin', 'Navigation', 'Compass2', 'Route', 'Flag', 'Milestone',
  'Flame', 'Wind', 'Leaf', 'Tree', 'Sprout', 'Flower', 'Sun', 'Moon',
  'Diamond', 'Gem', 'Key', 'Lock', 'Unlock', 'Fingerprint', 'ShieldCheck',
  'Settings', 'Settings2', 'Sliders', 'ToggleLeft', 'ToggleRight', 'Wrench', 'Tool',
  'Code', 'Code2', 'Terminal', 'Laptop', 'Monitor', 'Smartphone', 'Tablet',
  'Image', 'ImagePlus', 'Camera', 'Video', 'Film', 'Palette', 'Paintbrush', 'Pen',
  'FileText', 'BookOpen', 'Book', 'GraduationCap', 'School', 'Pencil', 'ClipboardList',
  'CheckCircle', 'CheckCircle2', 'Check', 'CircleDot', 'Dot', 'Circle', 'Hexagon', 'Triangle',
  'ArrowRight', 'ArrowUpRight', 'ArrowUp', 'ChevronRight', 'ChevronsRight', 'Move',
  'Link', 'Link2', 'ExternalLink', 'Share', 'Share2', 'Rss', 'Wifi', 'Signal',
  'Clock', 'Timer', 'Calendar', 'CalendarCheck', 'Hourglass', 'RefreshCw', 'RotateCw',
  'Infinity', 'Repeat', 'Shuffle', 'GitBranch', 'GitMerge', 'Workflow', 'Network',
  'Package', 'PackageCheck', 'Box', 'Archive', 'Inbox', 'ShoppingBag', 'ShoppingCart',
  'Bolt', 'Activity', 'Pulse', 'HeartPulse', 'Stethoscope', 'Microscope', 'FlaskConical',
];

// Remove duplicates
const ICONS = [...new Set(ICON_LIST)];

interface Props {
  value: string;
  onChange: (icon: string) => void;
  onClose: () => void;
}

export default function IconPicker({ value, onChange, onClose }: Props) {
  const [search, setSearch] = useState('');

  const filtered = ICONS.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl border border-hairline w-full max-w-lg max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-hairline flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
            <input
              autoFocus
              type="text"
              placeholder="Buscar ícone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-bone border border-hairline rounded-lg pl-9 pr-4 py-2 text-sm text-ink focus:outline-none focus:border-ink"
            />
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bone text-silver-500 hover:text-ink transition">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-3 grid grid-cols-6 gap-1">
          {filtered.map(name => {
            const Icon = (LucideIcons as Record<string, unknown>)[name] as React.ComponentType<{ className?: string }>;
            if (!Icon) return null;
            const isSelected = value === name;
            return (
              <button
                key={name}
                onClick={() => { onChange(name); onClose(); }}
                title={name}
                className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition hover:bg-bone ${isSelected ? 'bg-ink text-white hover:bg-ink' : 'text-silver-600'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[8px] leading-tight truncate w-full text-center">{name}</span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-6 py-8 text-center text-sm text-silver-400">Nenhum ícone encontrado</div>
          )}
        </div>
      </div>
    </div>
  );
}
