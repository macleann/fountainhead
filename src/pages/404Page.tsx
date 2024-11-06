import React from "react";
import { Link } from "react-router-dom";
import { useGameState } from "../contexts/GameStateContext";

const NotFoundPage: React.FC = () => {
    const { gameState } = useGameState();
    let route = null;

    const lastVisitedToRoute = (lastVisited: string) => {
        const route = lastVisited.toLowerCase().replace(/\s/g, '-');
        return route;
    }

    if (gameState?.last_visited) {
        route = lastVisitedToRoute(gameState.last_visited);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-5 text-white">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p className="mt-4 text-wrap">You likely found yourself here because you wanted to explore more of the garden. How about you try a different way? Work towards the things that work towards you.</p>
        <Link to={route !== null ? route : '/'} className="mt-4 text-green-500 underline">Go Back</Link>
        </div>
    );
};

export default NotFoundPage;