import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Download,
  Eye,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Search,
  HelpCircle,
  Twitter,
  Upload,
  MessageCircle,
  X,
  ChevronDown,
  Globe,
  Printer,
  Link as LinkIcon,
  Youtube
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'icon-arrow-left': ArrowLeft,
  'icon-arrow-right': ArrowRight,
  'icon-arrow-skew': ArrowUpRight,
  'icon-download': Download,
  'icon-eye': Eye,
  'icon-facebook': Facebook,
  'icon-instagram': Instagram,
  'icon-linkedin': Linkedin,
  'icon-location': MapPin,
  'icon-mail': Mail,
  'icon-search': Search,
  'icon-support': HelpCircle,
  'icon-twitter': Twitter,
  'icon-upload': Upload,
  'icon-whatsapp': MessageCircle,
  'icon-cross': X,
  'icon-close': X,
  'icon-mini-down': ChevronDown,
  'icon-map': Globe,
  'icon-printer': Printer,
  'icon-link': LinkIcon,
  'icon-youtube': Youtube,
  // Social media variants
  'icon-facebook-2': Facebook,
  'icon-linkedin-2': Linkedin,
  'icon-twitter-2': Twitter,
  'icon-mail-2': Mail,
};

export default function Icon({ name, className = '', size = 16, style }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      className={className} 
      size={size}
      strokeWidth={1.5}
      style={style}
    />
  );
}
