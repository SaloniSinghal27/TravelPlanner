// dijkstra.js
export function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  // Initialize distances
  for (let city in graph) {
    distances[city] = city === start ? 0 : Infinity;
  }

  while (unvisited.size > 0) {
    // Find city with smallest distance
    const current = [...unvisited].reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    unvisited.delete(current);

    // Stop if destination reached
    if (current === end) break;

    for (let neighbor in graph[current]) {
      const distance = distances[current] + graph[current][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
      }
    }
  }

  // Reconstruct shortest path
  const path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path,
  };
}
