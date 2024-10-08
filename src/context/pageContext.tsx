import { createContext, ReactNode, useMemo, useState } from "react";

interface PageContextProps {
  userId?: any;
  loading?: boolean;
  coursesInProgress?: any[];
  fetchProgress?: () => void;
  updateSessionId?: (userId: string) => void;
}

export const PageContext = createContext<PageContextProps>({});

export const PageProvider = ({ children }: { children: ReactNode; }) => {
  const [pageState, setPageState] = useState<PageContextProps>({});

  const updateSessionId = (userId: string) => {
    setPageState((prev) => ({ ...prev, userId }));
  }

  const contextValue = useMemo(() => ({ ...pageState, updateSessionId }), [pageState, updateSessionId]);

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};
