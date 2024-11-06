import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGameState } from '../contexts/GameStateContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredState?: string[];
  requiredLocations?: string[];  // Locations that must be visited
  preventIfVisited?: string[];   // Locations that should not be revisited
  redirectTo?: string;
  condition?: (gameState: any) => boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredState = [], 
  requiredLocations = [],
  preventIfVisited = [],
  redirectTo = '/', 
  condition
}) => {
  const { gameState, setGameState } = useGameState();

  // Initialize locations array if it doesn't exist
  React.useEffect(() => {
    if (!gameState.locations) {
      setGameState(prev => ({
        ...prev,
        locations: []
      }));
    }
  }, [gameState, setGameState]);

  // Check required state
  const hasRequiredState = requiredState.every(key => 
    gameState && key in gameState
  );

  // Check required locations
  const hasVisitedRequired = requiredLocations.every(location => 
    gameState?.locations?.includes(location)
  );

  // Check if user has visited prevented locations
  const hasVisitedPrevented = preventIfVisited.some(location => 
    gameState?.locations?.includes(location)
  );

  // Check custom condition if provided
  const passesCustomCondition = condition ? condition(gameState) : true;

  if (!hasRequiredState || !hasVisitedRequired || hasVisitedPrevented || !passesCustomCondition) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;