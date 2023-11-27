import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../hooks/useAuth";
import { paths } from "../../paths";

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }: AuthGuardType) {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(paths.index);
    }
  }, [isInitialized, isAuthenticated, router]);

  return isInitialized && isAuthenticated ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <React.Fragment />
  );
}

export default AuthGuard;
