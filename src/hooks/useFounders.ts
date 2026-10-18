'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Founder,
  DEFAULT_FOUNDERS,
  STORAGE_KEY,
  getStoredFounders,
  saveStoredFounders,
  resetStoredFounders,
  FOUNDERS_UPDATED_EVENT,
} from '@/data/founders';

export function useFounders() {
  const [founders, setFounders] = useState<Founder[]>(DEFAULT_FOUNDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state from storage on mount
  useEffect(() => {
    setFounders(getStoredFounders());
    setIsLoaded(true);

    // Listen for custom in-tab updates
    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<Founder[]>;
      if (customEvent.detail) {
        setFounders(customEvent.detail);
      } else {
        setFounders(getStoredFounders());
      }
    };

    // Listen for cross-tab storage updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === 'encelion_founders_data_v1') {
        setFounders(getStoredFounders());
      }
    };

    window.addEventListener(FOUNDERS_UPDATED_EVENT, handleCustomUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(FOUNDERS_UPDATED_EVENT, handleCustomUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Update a single founder by ID
  const updateFounder = useCallback((id: string, updates: Partial<Founder>) => {
    setFounders(prev => {
      const next = prev.map(f => (f.id === id ? { ...f, ...updates } : f));
      saveStoredFounders(next);
      return next;
    });
  }, []);

  // Add a new founder
  const addFounder = useCallback((newFounder: Omit<Founder, 'id'> & { id?: string }) => {
    setFounders(prev => {
      const id = newFounder.id || `founder-${Date.now()}`;
      const full: Founder = { ...newFounder, id, order: prev.length + 1 };
      const next = [...prev, full];
      saveStoredFounders(next);
      return next;
    });
  }, []);

  // Delete a founder
  const deleteFounder = useCallback((id: string) => {
    setFounders(prev => {
      const next = prev.filter(f => f.id !== id);
      saveStoredFounders(next);
      return next;
    });
  }, []);

  // Save full list
  const saveAll = useCallback((list: Founder[]) => {
    setFounders(list);
    saveStoredFounders(list);
  }, []);

  // Reset to original defaults
  const resetDefaults = useCallback(() => {
    const defaults = resetStoredFounders();
    setFounders(defaults);
    return defaults;
  }, []);

  return {
    founders,
    isLoaded,
    updateFounder,
    addFounder,
    deleteFounder,
    saveAll,
    resetDefaults,
  };
}
