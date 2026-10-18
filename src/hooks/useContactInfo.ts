'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ContactInfo,
  DEFAULT_CONTACT_INFO,
  getStoredContactInfo,
  saveStoredContactInfo,
  resetStoredContactInfo,
  CONTACT_UPDATED_EVENT,
} from '@/data/contactInfo';
import { syncDataToFile } from '@/lib/syncData';

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setContactInfo(getStoredContactInfo());
    setIsLoaded(true);

    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ContactInfo>;
      if (customEvent.detail) {
        setContactInfo(customEvent.detail);
      } else {
        setContactInfo(getStoredContactInfo());
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'encelion_contact_info_v1') {
        setContactInfo(getStoredContactInfo());
      }
    };

    window.addEventListener(CONTACT_UPDATED_EVENT, handleCustomUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(CONTACT_UPDATED_EVENT, handleCustomUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateContactInfo = useCallback((updates: Partial<ContactInfo>) => {
    setContactInfo(prev => {
      const next: ContactInfo = {
        ...prev,
        ...updates,
        socialLinks: {
          ...prev.socialLinks,
          ...(updates.socialLinks || {}),
        },
      };
      saveStoredContactInfo(next);
      syncDataToFile('contactInfo', next);
      return next;
    });
  }, []);

  const saveContactInfo = useCallback((newInfo: ContactInfo) => {
    setContactInfo(newInfo);
    saveStoredContactInfo(newInfo);
    syncDataToFile('contactInfo', newInfo);
  }, []);

  const resetDefaults = useCallback(() => {
    const defaults = resetStoredContactInfo();
    setContactInfo(defaults);
    syncDataToFile('contactInfo', defaults);
    return defaults;
  }, []);

  return {
    contactInfo,
    isLoaded,
    updateContactInfo,
    saveContactInfo,
    resetDefaults,
  };
}
