// src/app/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

/**
 * Custom hook to provide the typed dispatch function.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Custom hook to provide the typed selector function.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook to provide the typed store.
 */
export const useAppStore: () => AppStore = useStore;
