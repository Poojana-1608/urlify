import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import { QRCodeCanvas } from "qrcode.react";

function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [showQR, setShowQR] = useState("");

  const token = localStorage.getItem("token");

  const BASE_URL = "https://urlify-backend-poojana.onrender.com";

  const fetchUrls = async () => {
    try {
      const res = await API.get("/url/myurls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUrls(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/url/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUrl = async () => {
    try {
      await API.post(
        "/url/shorten",
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOriginalUrl("");

      fetchUrls();
      fetchAnalytics();

      alert("Short URL Created Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUrl = async (id) => {
    try {
      await API.delete(`/url/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUrls();
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  const copyUrl = (shortCode) => {
    navigator.clipboard.writeText(
      `${BASE_URL}/${shortCode}`
    );

    alert("Short URL Copied");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchUrls();
    fetchAnalytics();
  }, []);

  return (
    <div className="dashboard">

      <nav className="navbar">
        <h2 className="logo">URLIFY</h2>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      <div className="hero">

        <h1>Shorten Your Long URLs 🚀</h1>

        <p>Track • Manage • Analyze</p>

        <div className="url-form">
          <input
            type="text"
            placeholder="Paste your URL here..."
            value={originalUrl}
            onChange={(e) =>
              setOriginalUrl(e.target.value)
            }
          />

          <button onClick={createUrl}>
            Shorten Now
          </button>
        </div>

      </div>

      <div className="stats">

        <div className="stat-card">
          <h3>Total URLs</h3>
          <h2>{analytics.totalUrls || 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Clicks</h3>
          <h2>{analytics.totalClicks || 0}</h2>
        </div>

      </div>

      <div className="table-container">

        <h2>My URLs</h2>

        <table>

          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
              <th>Created</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {urls.map((url) => (
              <>
                <tr key={url._id}>

                  <td>{url.originalUrl}</td>

                  <td>
                    <a
                      href={`${BASE_URL}/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#60a5fa",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      {BASE_URL}/{url.shortCode}
                    </a>
                  </td>

                  <td>{url.clicks}</td>

                  <td>
                    {new Date(
                      url.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {url.lastVisited
                      ? new Date(
                          url.lastVisited
                        ).toLocaleDateString()
                      : "Never"}
                  </td>

                  <td>

                    <button
                      className="copy-btn"
                      onClick={() =>
                        copyUrl(url.shortCode)
                      }
                    >
                      Copy
                    </button>

                    <button
                      className="qr-btn"
                      onClick={() =>
                        setShowQR(
                          showQR === url.shortCode
                            ? ""
                            : url.shortCode
                        )
                      }
                    >
                      QR
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUrl(url._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

                {showQR === url.shortCode && (
                  <tr>
                    <td colSpan="6">

                      <div className="qr-container">

                        <QRCodeCanvas
                          value={`${BASE_URL}/${url.shortCode}`}
                          size={150}
                        />

                      </div>

                    </td>
                  </tr>
                )}

              </>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;