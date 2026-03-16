import { describe, it, expect } from 'vitest';
import { usePortfolioStore } from '../store/usePortfolioStore';

describe('usePortfolioStore', () => {
  it('should initialize with loading state', () => {
    const store = usePortfolioStore.getState();
    expect(store.isLoading).toBe(true);
    expect(store.error).toBeNull();
  });

  it('should have empty data initially', () => {
    const store = usePortfolioStore.getState();
    expect(store.personal).toBeUndefined();
    expect(store.projects).toEqual([]);
    expect(store.achievements).toEqual([]);
    expect(store.contact).toBeUndefined();
  });
});
