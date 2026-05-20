import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

const BASE = "https://jsonplaceholder.typicode.com";

const ApiDemo = () => {
  // ── Fetch API state ─────────────────────────────────────
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  // Toggle to intentionally trigger a 404 for demo purposes
  const [triggerFetchError, setTriggerFetchError] = useState(false);

  // ── Axios state ──────────────────────────────────────────
  const [users, setUsers] = useState<User[]>([]);
  const [axiosLoading, setAxiosLoading] = useState(false);
  const [axiosError, setAxiosError] = useState("");

  // ── Fetch API handler ────────────────────────────────────
  const loadPostsWithFetch = async () => {
    setFetchLoading(true);
    setFetchError("");
    setPosts([]);

    const url = triggerFetchError
      ? `${BASE}/nonexistent-endpoint` // will return 404
      : `${BASE}/posts?_limit=10`;

    try {
      const response = await fetch(url);

      // fetch() does NOT throw on non-2xx responses — we must check manually
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      console.log("Raw response", response);
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      // finally always runs — clears the loading spinner whether success or error
      setFetchLoading(false);
    }
  };

  // ── Axios handler ────────────────────────────────────────
  const loadUsersWithAxios = async () => {
    setAxiosLoading(true);
    setAxiosError("");
    setUsers([]);

    try {
      // axios automatically throws on non-2xx AND parses JSON
      const { data } = await axios.get<User[]>(`${BASE}/users?_limit=5`);
      setUsers(data);
    } catch (err) {
      // axios.isAxiosError() narrows the type to AxiosError
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        setAxiosError(
          status
            ? `Axios Error ${status}: ${err.message}`
            : `Network error: ${err.message}`,
        );
      } else {
        setAxiosError("Unexpected error occurred");
      }
    } finally {
      setAxiosLoading(false);
    }
  };

  return (
    <section className="section api-section">
      <h2 className="section-title">API Calls Demo</h2>
      <p className="section-subtitle">
        Two ways to call an API in React: the built-in{" "}
        <strong>Fetch API</strong> and the <strong>Axios</strong> library — each
        with loading and error states.
      </p>

      <div className="api-grid">
        {/* ── FETCH API card ── */}
        <div className="api-card">
          <div className="api-card-header">
            <h3>Fetch API</h3>
            <span className="api-badge fetch">Built-in Browser API</span>
          </div>

          <div className="api-controls">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={triggerFetchError}
                onChange={() => setTriggerFetchError((prev) => !prev)}
              />
              Trigger 404 error
            </label>
            <button
              className="btn-primary"
              onClick={loadPostsWithFetch}
              disabled={fetchLoading}
            >
              {fetchLoading ? "Loading..." : "Fetch Posts"}
            </button>
          </div>

          {/* Loading state */}
          {fetchLoading && (
            <CircularProgress className="loading-spinner" />
            // <div className="loading-state">
            //   <div className="spinner" />
            //   <span>Fetching data...</span>
            // </div>
          )}

          {/* Error state */}
          {fetchError && !fetchLoading && (
            <div className="error-state">
              <span className="error-icon">!</span>
              <span>{fetchError}</span>
            </div>
          )}

          {/* Data — Lists & Mapping */}
          {posts.length > 0 && (
            <ul className="api-list">
              {posts.map((post) => (
                <li key={post.id} className="api-list-item">
                  <strong>#{post.id}</strong>
                  <span>{post.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── AXIOS card ── */}
        <div className="api-card">
          <div className="api-card-header">
            <h3>Axios</h3>
            <span className="api-badge axios">Third-party Library</span>
          </div>

          <div className="api-controls">
            <button
              className="btn-primary"
              onClick={loadUsersWithAxios}
              disabled={axiosLoading}
            >
              {axiosLoading ? "Loading..." : "Fetch Users"}
            </button>
          </div>

          {/* Loading state */}
          {axiosLoading && (
            <div className="loading-state">
              <div className="spinner" />
              <span>Fetching data...</span>
            </div>
          )}

          {/* Error state */}
          {axiosError && !axiosLoading && (
            <div className="error-state">
              <span className="error-icon">!</span>
              <span>{axiosError}</span>
            </div>
          )}

          {/* Data — Lists & Mapping */}
          {users.length > 0 && (
            <ul className="api-list">
              {users.map((user) => (
                <li key={user.id} className="api-list-item">
                  <strong>{user.name}</strong>
                  <span className="user-email">{user.email}</span>
                  <span className="user-company">{user.company.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Key differences comparison table */}
      <div className="api-comparison">
        <h3>Fetch vs Axios — Key Differences</h3>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Fetch API</th>
              <th>Axios</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Availability</td>
              <td>Built into browsers</td>
              <td>npm install axios</td>
            </tr>
            <tr>
              <td>Throws on non-2xx?</td>
              <td>No — must check response.ok</td>
              <td>Yes — auto-throws</td>
            </tr>
            <tr>
              <td>JSON parsing</td>
              <td>Manual: response.json()</td>
              <td>Automatic</td>
            </tr>
            <tr>
              <td>Request cancellation</td>
              <td>AbortController</td>
              <td>CancelToken / AbortController</td>
            </tr>
            <tr>
              <td>Interceptors</td>
              <td>Not built-in</td>
              <td>Built-in</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ApiDemo;
