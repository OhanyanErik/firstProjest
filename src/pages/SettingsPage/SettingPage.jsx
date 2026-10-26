import { useEffect, useState } from "react";
import "./SettingsPage.css";

const defaults = {
  notifications: true,
  theme: "light",
  hidePersonalInfo: false,
  language: "en",
};

function readSettings() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("jobTrackerSettings") || "{}"
    );
    return { ...defaults, ...saved };
  } catch {
    return defaults;
  }
}

export default function SettingPage() {
  const [settings, setSettings] = useState(readSettings);

  function updateSetting(name, value) {
    setSettings((current) => ({ ...current, [name]: value }));
  }

  useEffect(() => {
    try {
      localStorage.setItem("jobTrackerSettings", JSON.stringify(settings));
    } catch {
      // Browser storage might be unavailable.
    }

    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.lang = settings.language;
  }, [settings]);

  return (
    <div className="setting-page">
      <h1>Settings</h1>
      <p>Choose how the application works for you.</p>

      <section className="settings-options">
        <label className="setting-option">
          <span>
            <strong>Notifications</strong>
            <small>Enable follow-up reminder preferences.</small>
          </span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(event) =>
              updateSetting("notifications", event.target.checked)
            }
          />
        </label>

        <label className="setting-option">
          <span>
            <strong>Dark / Light Mode</strong>
            <small>Choose the application appearance.</small>
          </span>
          <select
            value={settings.theme}
            onChange={(event) => updateSetting("theme", event.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label className="setting-option">
          <span>
            <strong>Privacy</strong>
            <small>Hide email and phone on application cards.</small>
          </span>
          <input
            type="checkbox"
            checked={settings.hidePersonalInfo}
            onChange={(event) =>
              updateSetting("hidePersonalInfo", event.target.checked)
            }
          />
        </label>

        <label className="setting-option">
          <span>
            <strong>Language</strong>
            <small>Choose your preferred language.</small>
          </span>
         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
         <option value="hy">Հայերեն</option>
        </select>
        </label>
      </section>
    </div>
  );
}

