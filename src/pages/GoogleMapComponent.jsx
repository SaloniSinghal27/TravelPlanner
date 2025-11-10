import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ---- GRAPH with coordinates ----
const cities = {
  Delhi: [28.6139, 77.209],
  Agra: [27.1767, 78.0081],
  Jaipur: [26.9124, 75.7873],
  Lucknow: [26.8467, 80.9462],
  Mumbai: [19.076, 72.8777],
  Pune: [18.5204, 73.8567],
  Surat: [21.1702, 72.8311],
  Ahmedabad: [23.0225, 72.5714],
  Bhopal: [23.2599, 77.4126],
};

// ---- GRAPH distances ----
const graph = {
  Delhi: { Agra: 233, Jaipur: 281, Lucknow: 497 },
  Agra: { Delhi: 233, Jaipur: 240 },
  Jaipur: { Delhi: 281, Agra: 240, Ahmedabad: 657 },
  Ahmedabad: { Jaipur: 657, Surat: 263 },
  Surat: { Ahmedabad: 263, Mumbai: 280 },
  Mumbai: { Surat: 280, Pune: 150 },
  Pune: { Mumbai: 150, Bhopal: 789 },
  Lucknow: { Delhi: 497 },
  Bhopal: { Pune: 789 },
};

// ---- DIJKSTRA ----
const dijkstra = (graph, start, end) => {
  const distances = {};
  const previous = {};
  const nodes = Object.keys(graph);

  for (let node of nodes) {
    distances[node] = node === start ? 0 : Infinity;
  }

  while (nodes.length > 0) {
    nodes.sort((a, b) => distances[a] - distances[b]);
    const closest = nodes.shift();
    if (closest === end) break;
    if (distances[closest] === Infinity) break;

    for (let neighbor in graph[closest]) {
      const newDist = distances[closest] + graph[closest][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = closest;
      }
    }
  }

  const path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return { distance: distances[end], path };
};

// ---- DFS for all possible paths ----
const findAllPaths = (graph, start, end, visited = {}, path = [], allPaths = []) => {
  visited[start] = true;
  path.push(start);

  if (start === end) {
    allPaths.push([...path]);
  } else {
    for (let neighbor in graph[start]) {
      if (!visited[neighbor]) {
        findAllPaths(graph, neighbor, end, visited, path, allPaths);
      }
    }
  }

  path.pop();
  visited[start] = false;
  return allPaths;
};

// ---- COMPONENT ----
const TravelPlanner = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [allPaths, setAllPaths] = useState([]);
  const [shortestPath, setShortestPath] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!graph[source] || !graph[destination]) {
      alert("Please enter valid cities from the list.");
      return;
    }

    const paths = findAllPaths(graph, source, destination);
    const shortest = dijkstra(graph, source, destination);

    setAllPaths(paths);
    setShortestPath(shortest);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Poppins" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "30%",
          background: "#0b0c10",
          color: "#fff",
          padding: "30px",
          overflowY: "auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🌍 Travel Planner</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <label>Source City</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. Delhi"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              background: "#1f2833",
              color: "#fff",
              border: "1px solid #45a29e",
              borderRadius: "6px",
            }}
          />

          <label>Destination City</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Mumbai"
            style={{
              width: "100%",
              padding: "10px",
              background: "#1f2833",
              color: "#fff",
              border: "1px solid #45a29e",
              borderRadius: "6px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#66fcf1",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Find Routes
          </button>
        </form>

        {allPaths.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>🛣️ All Possible Paths</h3>
            {allPaths.map((p, idx) => (
              <p key={idx}>{idx + 1}. {p.join(" → ")}</p>
            ))}
          </div>
        )}

        {shortestPath && (
          <div style={{ marginTop: "25px" }}>
            <h3>🏁 Shortest Path</h3>
            <p><b>Path:</b> {shortestPath.path.join(" → ")}</p>
            <p><b>Distance:</b> {shortestPath.distance} km</p>
          </div>
        )}
      </div>

      {/* Map Section */}
      <div style={{ width: "70%", height: "100%" }}>
        <MapContainer
          center={[23.2599, 77.4126]} // Center of India
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Show all paths (gray) */}
          {allPaths.map((path, index) => (
            <Polyline
              key={index}
              positions={path.map((city) => cities[city])}
              color="#808080"
              weight={3}
              opacity={0.6}
            />
          ))}

          {/* Highlight shortest path (blue) */}
          {shortestPath && (
            <Polyline
              positions={shortestPath.path.map((city) => cities[city])}
              color="blue"
              weight={6}
            />
          )}

          {/* Markers */}
          {shortestPath &&
            shortestPath.path.map((city, index) => (
              <Marker key={index} position={cities[city]}>
                <Popup>{city}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TravelPlanner;
