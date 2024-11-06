const lastVisitedToRoute = (lastVisited: string) => {
    const route = lastVisited.toLowerCase().replace(/\s/g, '-');
    return route;
};

export default lastVisitedToRoute;