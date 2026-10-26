import { useEffect, useState } from "react";
import { useLanguage } from "../../LanguageContext";
import "./SettingPage.css";

const defaultPreferences = {
  notifications: true,
  theme: "light",
  hidePersonalInfo: false,
};

function readPreferences() {
  try {
    return {
      ...defaultPreferences,
      ...JSON.parse(localStorage.getItem("jobTrackerSettings") || "{}"),
    };
  } catch {
    return defaultPreferences;
  }
}

export default function SettingPage() {
  const [preferences, setPreferences] = useState(readPreferences);
  const { language, setLanguage, t } = useLanguage();

  function updatePreference(name, value) {
    setPreferences((current) => ({ ...current, [name]: value }));
  }

  useEffect(() => {
    try {
      localStorage.setItem("jobTrackerSettings", JSON.stringify(preferences));
    } catch {
      // Keep the settings page usable if browser storage is unavailable.
    }
    document.documentElement.dataset.theme = preferences.theme;
  }, [preferences]);

  return (
    <div className="setting-page">
      <h1>{t("nav.settings")}</h1>
      <p>{t("settings.description")}</p>

      <section className="settings-options">
        <label className="setting-option">
          <span>
            <strong>{t("settings.notifications")}</strong>
            <small>{t("settings.notificationsDescription")}</small>
          </span>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(event) => updatePreference("notifications", event.target.checked)}
          />
        </label>

        <label className="setting-option">
          <span>
            <strong>{t("settings.theme")}</strong>
            <small>{t("settings.themeDescription")}</small>
          </span>
          <select
            value={preferences.theme}
            onChange={(event) => updatePreference("theme", event.target.value)}
          >
            <option value="light">{t("theme.light")}</option>
            <option value="dark">{t("theme.dark")}</option>
          </select>
        </label>

        <label className="setting-option">
          <span>
            <strong>{t("settings.privacy")}</strong>
            <small>{t("settings.privacyDescription")}</small>
          </span>
          <input
            type="checkbox"
            checked={preferences.hidePersonalInfo}
            onChange={(event) => updatePreference("hidePersonalInfo", event.target.checked)}
          />
        </label>

        <label className="setting-option">
          <span>
            <strong>{t("settings.language")}</strong>
            <small>{t("settings.languageDescription")}</small>
          </span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="en">{t("language.english")}</option>
            <option value="hy">{t("language.armenian")}</option>
          </select>
        </label>
      </section>
    </div>
  );
}
