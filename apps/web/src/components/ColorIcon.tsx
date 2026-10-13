'use client';

import React from 'react';
import { 
  Bot, 
  MessageSquareCode, 
  Workflow, 
  Eye, 
  Cpu, 
  Lightbulb, 
  Award, 
  Users, 
  Target, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  Box, 
  CheckCircle2, 
  Clock, 
  Search, 
  FileText, 
  Code2, 
  Rocket,
  Database,
  LineChart,
  Sliders,
  Zap,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface ColorIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function ColorIcon({ name, size = 40, className = '' }: ColorIconProps) {
  // If we have custom generated 3D image renders for specific icons:
  const imageIcons: Record<string, string> = {
    'agents': '/icon_service_agents.png',
    'chatbot': '/icon_service_chatbot.png',
    'workflow': '/icon_service_workflow.png',
    'vision': '/icon_service_vision.png',
    'custom': '/icon_service_custom.png',
    'innovation': '/icon_val_innovation.png',
  };

  if (imageIcons[name]) {
    return (
      <div 
        className={`color-icon-wrap ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.28),
          overflow: 'hidden',
          background: 'radial-gradient(circle at 30% 30%, #0F2040 0%, #0A1628 100%)',
          boxShadow: '0 8px 20px rgba(0, 184, 148, 0.25), 0 2px 6px rgba(0,0,0,0.3)',
          border: '1.5px solid rgba(0, 184, 148, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <img 
          src={imageIcons[name]} 
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    );
  }

  // Colorful Gradient Themes for all other icons
  const iconConfigs: Record<string, { icon: React.ReactNode; bg: string; color: string; border: string; glow: string }> = {
    // Values & Features
    'excellence': {
      icon: <Award size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #FF9F43 0%, #FF6B6B 100%)',
      color: '#FFFFFF',
      border: 'rgba(255, 159, 67, 0.4)',
      glow: 'rgba(255, 159, 67, 0.3)',
    },
    'collaboration': {
      icon: <Users size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #7367F0 0%, #CE9FFC 100%)',
      color: '#FFFFFF',
      border: 'rgba(115, 103, 240, 0.4)',
      glow: 'rgba(115, 103, 240, 0.3)',
    },
    'customer': {
      icon: <Target size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #00B894 0%, #00CEC9 100%)',
      color: '#FFFFFF',
      border: 'rgba(0, 184, 148, 0.4)',
      glow: 'rgba(0, 184, 148, 0.3)',
    },
    // Contact
    'email': {
      icon: <Mail size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)',
      color: '#FFFFFF',
      border: 'rgba(9, 132, 227, 0.4)',
      glow: 'rgba(9, 132, 227, 0.3)',
    },
    'phone': {
      icon: <Phone size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #00B894 0%, #55E6C1 100%)',
      color: '#FFFFFF',
      border: 'rgba(0, 184, 148, 0.4)',
      glow: 'rgba(0, 184, 148, 0.3)',
    },
    'location': {
      icon: <MapPin size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #FF5252 0%, #FF7979 100%)',
      color: '#FFFFFF',
      border: 'rgba(255, 82, 82, 0.4)',
      glow: 'rgba(255, 82, 82, 0.3)',
    },
    // Products & Security
    'security': {
      icon: <ShieldCheck size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #10AC84 0%, #1DD1A1 100%)',
      color: '#FFFFFF',
      border: 'rgba(16, 172, 132, 0.4)',
      glow: 'rgba(16, 172, 132, 0.3)',
    },
    'architecture': {
      icon: <Layers size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
      color: '#FFFFFF',
      border: 'rgba(95, 39, 205, 0.4)',
      glow: 'rgba(95, 39, 205, 0.3)',
    },
    'team': {
      icon: <Users size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)',
      color: '#FFFFFF',
      border: 'rgba(255, 159, 243, 0.4)',
      glow: 'rgba(255, 159, 243, 0.3)',
    },
    'results': {
      icon: <BarChart3 size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)',
      color: '#FFFFFF',
      border: 'rgba(255, 107, 107, 0.4)',
      glow: 'rgba(255, 107, 107, 0.3)',
    },
    // Stats & Process
    'clients': {
      icon: <Users size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)',
      color: '#FFFFFF',
      border: 'rgba(72, 219, 251, 0.4)',
      glow: 'rgba(72, 219, 251, 0.3)',
    },
    'projects': {
      icon: <Box size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #10ac84 0%, #1dd1a1 100%)',
      color: '#FFFFFF',
      border: 'rgba(16, 172, 132, 0.4)',
      glow: 'rgba(16, 172, 132, 0.3)',
    },
    'satisfaction': {
      icon: <CheckCircle2 size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #feca57 0%, #ff9f43 100%)',
      color: '#FFFFFF',
      border: 'rgba(254, 202, 87, 0.4)',
      glow: 'rgba(254, 202, 87, 0.3)',
    },
    'support': {
      icon: <Clock size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)',
      color: '#FFFFFF',
      border: 'rgba(255, 159, 243, 0.4)',
      glow: 'rgba(255, 159, 243, 0.3)',
    },
    'discover': {
      icon: <Search size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #54a0ff 0%, #2e86de 100%)',
      color: '#FFFFFF',
      border: 'rgba(84, 160, 255, 0.4)',
      glow: 'rgba(84, 160, 255, 0.3)',
    },
    'plan': {
      icon: <FileText size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #00d2d3 0%, #01a3a4 100%)',
      color: '#FFFFFF',
      border: 'rgba(0, 210, 211, 0.4)',
      glow: 'rgba(0, 210, 211, 0.3)',
    },
    'build': {
      icon: <Code2 size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
      color: '#FFFFFF',
      border: 'rgba(95, 39, 205, 0.4)',
      glow: 'rgba(95, 39, 205, 0.3)',
    },
    'grow': {
      icon: <Rocket size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)',
      color: '#FFFFFF',
      border: 'rgba(255, 107, 107, 0.4)',
      glow: 'rgba(255, 107, 107, 0.3)',
    },
    'database': {
      icon: <Database size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)',
      color: '#FFFFFF',
      border: 'rgba(72, 219, 251, 0.4)',
      glow: 'rgba(72, 219, 251, 0.3)',
    },
    'analytics': {
      icon: <LineChart size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #10ac84 0%, #1dd1a1 100%)',
      color: '#FFFFFF',
      border: 'rgba(16, 172, 132, 0.4)',
      glow: 'rgba(16, 172, 132, 0.3)',
    },
    'studio': {
      icon: <Sliders size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
      color: '#FFFFFF',
      border: 'rgba(95, 39, 205, 0.4)',
      glow: 'rgba(95, 39, 205, 0.3)',
    },
    'zap': {
      icon: <Zap size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #feca57 0%, #ff9f43 100%)',
      color: '#FFFFFF',
      border: 'rgba(254, 202, 87, 0.4)',
      glow: 'rgba(254, 202, 87, 0.3)',
    },
    'trending': {
      icon: <TrendingUp size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #10ac84 0%, #1dd1a1 100%)',
      color: '#FFFFFF',
      border: 'rgba(16, 172, 132, 0.4)',
      glow: 'rgba(16, 172, 132, 0.3)',
    },
    'sparkles': {
      icon: <Sparkles size={Math.round(size * 0.52)} />,
      bg: 'linear-gradient(135deg, #00B894 0%, #00CEC9 100%)',
      color: '#FFFFFF',
      border: 'rgba(0, 184, 148, 0.4)',
      glow: 'rgba(0, 184, 148, 0.3)',
    }
  };

  const config = iconConfigs[name] || {
    icon: <Bot size={Math.round(size * 0.52)} />,
    bg: 'linear-gradient(135deg, #00B894 0%, #00CEC9 100%)',
    color: '#FFFFFF',
    border: 'rgba(0, 184, 148, 0.4)',
    glow: 'rgba(0, 184, 148, 0.3)',
  };

  return (
    <div 
      className={`color-icon-wrap ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: config.bg,
        color: config.color,
        boxShadow: `0 6px 18px ${config.glow}`,
        border: `1.5px solid ${config.border}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.25s ease',
      }}
    >
      {config.icon}
    </div>
  );
}
