'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ProductItem,
  DEFAULT_PRODUCTS,
  getStoredProducts,
  saveStoredProducts,
  resetStoredProducts,
  PRODUCTS_UPDATED_EVENT,
} from '@/data/products';
import { syncDataToFile } from '@/lib/syncData';

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProducts(getStoredProducts());
    setIsLoaded(true);

    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<ProductItem[]>;
      if (customEvent.detail) {
        setProducts(customEvent.detail);
      } else {
        setProducts(getStoredProducts());
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'encelion_products_catalog_v1') {
        setProducts(getStoredProducts());
      }
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleCustomUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleCustomUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addProduct = useCallback((product: Omit<ProductItem, 'id'> & { id?: string }) => {
    setProducts(prev => {
      const id = product.id || `prod-${Date.now()}`;
      const next = [...prev, { ...product, id }];
      saveStoredProducts(next);
      syncDataToFile('products', next);
      return next;
    });
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<ProductItem>) => {
    setProducts(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      saveStoredProducts(next);
      syncDataToFile('products', next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => {
      const next = prev.filter(s => s.id !== id);
      saveStoredProducts(next);
      syncDataToFile('products', next);
      return next;
    });
  }, []);

  const saveAll = useCallback((list: ProductItem[]) => {
    setProducts(list);
    saveStoredProducts(list);
    syncDataToFile('products', list);
  }, []);

  const resetDefaults = useCallback(() => {
    const defaults = resetStoredProducts();
    setProducts(defaults);
    syncDataToFile('products', defaults);
    return defaults;
  }, []);

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    saveAll,
    resetDefaults,
  };
}
