import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

/**
 * AppState Interface
 * Defines the shape of the global application state
 */
interface AppState {
  isMobileMenuOpen: boolean;
  currentBrand: string | null;
  scrollPosition: number;
  isHeaderSticky: boolean;
}

/**
 * AppContextType Interface
 * Defines the shape of the context value including state and actions
 */
interface AppContextType {
  state: AppState;
  actions: {
    toggleMobileMenu: () => void;
    setCurrentBrand: (brand: string | null) => void;
    updateScrollPosition: (position: number) => void;
  };
}

/**
 * AppProviderProps Interface
 * Defines props for the AppProvider component
 */
interface AppProviderProps {
  children: ReactNode;
}

/**
 * Create the AppContext with undefined as default
 * This ensures that useAppContext will throw an error if used outside of AppProvider
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * AppProvider Component
 * Provides global application state to all child components
 *
 * @component
 * @example
 * ```tsx
 * <AppProvider>
 *   <App />
 * </AppProvider>
 * ```
 *
 * @param {AppProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to wrap with context
 *
 * @returns {JSX.Element} Context provider wrapping children
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize state with default values
  const [state, setState] = useState<AppState>({
    isMobileMenuOpen: false,
    currentBrand: null,
    scrollPosition: 0,
    isHeaderSticky: false,
  });

  /**
   * Actions object containing all state update functions
   */
  const actions = {
    /**
     * Toggle mobile menu open/closed state
     */
    toggleMobileMenu: () => {
      setState((prev) => ({
        ...prev,
        isMobileMenuOpen: !prev.isMobileMenuOpen,
      }));
    },

    /**
     * Set the current active brand
     * @param {string | null} brand - Brand identifier or null to clear
     */
    setCurrentBrand: (brand: string | null) => {
      setState((prev) => ({
        ...prev,
        currentBrand: brand,
      }));
    },

    /**
     * Update scroll position and automatically update sticky header state
     * @param {number} position - Current scroll position in pixels
     */
    updateScrollPosition: (position: number) => {
      setState((prev) => ({
        ...prev,
        scrollPosition: position,
        isHeaderSticky: position > 100,
      }));
    },
  };

  return <AppContext.Provider value={{ state, actions }}>{children}</AppContext.Provider>;
};

/**
 * useAppContext Custom Hook
 * Provides access to the AppContext with error handling
 *
 * @throws {Error} If used outside of AppProvider
 *
 * @example
 * ```tsx
 * const { state, actions } = useAppContext();
 *
 * // Access state
 * console.log(state.isMobileMenuOpen);
 *
 * // Call actions
 * actions.toggleMobileMenu();
 * ```
 *
 * @returns {AppContextType} Context value containing state and actions
 */
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
};
