'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ServiceItem,
  DEFAULT_SERVICES,
  getStoredServices,
  saveStoredServices,
  resetStoredServices,
  SERVICES_UPDATED_EVENT,
} from '@/data/services';
import { syncDataToFile } from '@/lib/syncData';

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setServices(getStoredServices());
    setIsLoaded(true);

    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ServiceItem[]>;
      if (customEvent.detail) {
        setServices(customEvent.detail);
      } else {
        setServices(getStoredServices());
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'encelion_services_catalog_v1') {
        setServices(getStoredServices());
      }
    };

    window.addEventListener(SERVICES_UPDATED_EVENT, handleCustomUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(SERVICES_UPDATED_EVENT, handleCustomUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addService = useCallback((service: Omit<ServiceItem, 'id'> & { id?: string }) => {
    setServices(prev => {
      const id = service.id || `srv-${Date.now()}`;
      const next = [...prev, { ...service, id }];
      saveStoredServices(next);
      syncDataToFile('services', next);
      return next;
    });
  }, []);

  const updateService = useCallback((id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => {
      const next = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      saveStoredServices(next);
      syncDataToFile('services', next);
      return next;
    });
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => {
      const next = prev.filter(s => s.id !== id);
      saveStoredServices(next);
      syncDataToFile('services', next);
      return next;
    });
  }, []);

  const saveAll = useCallback((list: ServiceItem[]) => {
    setServices(list);
    saveStoredServices(list);
    syncDataToFile('services', list);
  }, []);

  const resetDefaults = useCallback(() => {
    const defaults = resetStoredServices();
    setServices(defaults);
    syncDataToFile('services', defaults);
    return defaults;
  }, []);

  return {
    services,
    isLoaded,
    addService,
    updateService,
    deleteService,
    saveAll,
    resetDefaults,
  };
}
