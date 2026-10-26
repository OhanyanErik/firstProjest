import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.addApplication": "Add Application",
    "nav.settings": "Settings",
    "app.name": "Job Tracker",
    "dashboard.title": "Job Application Manager",
    "dashboard.description": "Track your job applications and stay organized.",
    "dashboard.add": "+ Add Application",
    "stats.total": "Total",
    "status.pending": "Pending",
    "status.interview": "Interview",
    "status.accepted": "Accepted",
    "status.rejected": "Rejected",
    "search.placeholder": "Search applications...",
    "filter.allStatus": "All Status",
    "sort.newest": "Newest First",
    "sort.oldest": "Oldest First",
    "empty.applications": "No applications yet.",
    "empty.matches": "No applications match your search and status filter.",
    "field.fullName": "Full Name",
    "field.experience": "Experience (years)",
    "field.email": "Email",
    "field.cvUrl": "CV URL",
    "field.phone": "Phone",
    "field.coverLetter": "Cover Letter",
    "field.position": "Position",
    "field.company": "Company",
    "field.salary": "Salary Expectation",
    "field.appliedOn": "Applied on",
    "field.years": "years",
    "field.openCv": "Open CV",
    "application.view": "View Application",
    "application.edit": "Edit Application",
    "application.changeStatus": "Change application status",
    "application.deleteTitle": "Delete application?",
    "application.deleteMessage": "Delete the application for {position} at {company}? This cannot be undone.",
    "button.view": "View",
    "button.edit": "Edit",
    "button.delete": "Delete",
    "button.close": "Close",
    "button.cancel": "Cancel",
    "button.save": "Save Changes",
    "button.addApplication": "Add Application",
    "settings.description": "Choose how the application works for you.",
    "settings.notifications": "Notifications",
    "settings.notificationsDescription": "Enable follow-up reminder preferences.",
    "settings.theme": "Dark / Light Mode",
    "settings.themeDescription": "Choose the application appearance.",
    "settings.privacy": "Privacy",
    "settings.privacyDescription": "Hide email and phone on application cards.",
    "privacy.hidden": "Hidden",
    "settings.language": "Language",
    "settings.languageDescription": "Choose your preferred language.",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "language.english": "English",
    "language.armenian": "Armenian",
    "validation.required": "{field} is required.",
    "validation.years": "Experience must be zero or more years.",
    "validation.email": "Enter a valid email address.",
    "validation.url": "Enter a valid CV URL.",
    "validation.urlProtocol": "CV URL must start with http:// or https://.",
    "validation.phone": "Phone number must contain 7 to 15 digits.",
    "validation.letter": "Cover letter must be at least 50 characters.",
    "validation.salary": "Salary expectation must be zero or more.",
  },
  hy: {
    "nav.dashboard": "Վահանակ",
    "nav.addApplication": "Ավելացնել դիմում",
    "nav.settings": "Կարգավորումներ",
    "app.name": "Աշխատանքի դիմումների կառավարիչ",
    "dashboard.title": "Աշխատանքի դիմումների կառավարիչ",
    "dashboard.description": "Հետևիր աշխատանքի դիմումներին և պահպանիր կարգավորված ցանկ։",
    "dashboard.add": "+ Ավելացնել դիմում",
    "stats.total": "Ընդամենը",
    "status.pending": "Ընթացքի մեջ",
    "status.interview": "Հարցազրույց",
    "status.accepted": "Ընդունված",
    "status.rejected": "Մերժված",
    "search.placeholder": "Որոնել դիմումները...",
    "filter.allStatus": "Բոլոր կարգավիճակները",
    "sort.newest": "Նորերը սկզբում",
    "sort.oldest": "Հները սկզբում",
    "empty.applications": "Դեռ դիմումներ չկան։",
    "empty.matches": "Որոնմանը և ֆիլտրին համապատասխան դիմում չկա։",
    "field.fullName": "Անուն, ազգանուն",
    "field.experience": "Փորձ (տարի) ",
    "field.email": "Էլ․ փոստ",
    "field.cvUrl": "Ինքնակենսագրականի հղում",
    "field.phone": "Հեռախոս",
    "field.coverLetter": "Ուղեկցող նամակ",
    "field.position": "Պաշտոն",
    "field.company": "Ընկերություն",
    "field.salary": "Աշխատավարձի ակնկալիք",
    "field.appliedOn": "Դիմելու ամսաթիվ",
    "field.years": "տարի",
    "field.openCv": "Բացել CV-ն",
    "application.view": "Դիտել դիմումը",
    "application.edit": "Խմբագրել դիմումը",
    "application.changeStatus": "Փոխել դիմումի կարգավիճակը",
    "application.deleteTitle": "Ջնջե՞լ դիմումը։",
    "application.deleteMessage": "Ջնջե՞լ {company} ընկերության {position} պաշտոնի դիմումը։ Գործողությունը հնարավոր չէ հետարկել։",
    "button.view": "Դիտել",
    "button.edit": "Խմբագրել",
    "button.delete": "Ջնջել",
    "button.close": "Փակել",
    "button.cancel": "Չեղարկել",
    "button.save": "Պահպանել փոփոխությունները",
    "button.addApplication": "Ավելացնել դիմում",
    "settings.description": "Կարգավորիր հավելվածի նախընտրությունները։",
    "settings.notifications": "Ծանուցումներ",
    "settings.notificationsDescription": "Կառավարիր դիմումների հիշեցումների նախընտրությունը։",
    "settings.theme": "Մուգ / բաց ռեժիմ",
    "settings.themeDescription": "Ընտրիր հավելվածի տեսքը։",
    "settings.privacy": "Գաղտնիություն",
    "settings.privacyDescription": "Դիմումների քարտերում թաքցնել email-ն ու հեռախոսը։",
    "privacy.hidden": "Թաքցված է",
    "settings.language": "Լեզու",
    "settings.languageDescription": "Ընտրիր նախընտրելի լեզուն։",
    "theme.light": "Բաց",
    "theme.dark": "Մուգ",
    "language.english": "Անգլերեն",
    "language.armenian": "Հայերեն",
    "validation.required": "«{field}» դաշտը պարտադիր է։",
    "validation.years": "Փորձը պետք է լինի զրո կամ ավելի տարի։",
    "validation.email": "Մուտքագրիր ճիշտ էլ․ փոստի հասցե։",
    "validation.url": "Մուտքագրիր CV-ի ճիշտ հղում։",
    "validation.urlProtocol": "CV հղումը պետք է սկսվի http:// կամ https://-ով։",
    "validation.phone": "Հեռախոսահամարը պետք է պարունակի 7-ից 15 թիվ։",
    "validation.letter": "Ուղեկցող նամակը պետք է լինի առնվազն 50 նիշ։",
    "validation.salary": "Աշխատավարձը պետք է լինի զրո կամ ավելի։",
  },
};

const LanguageContext = createContext(null);

function getSavedLanguage() {
  try {
    return localStorage.getItem("appLanguage") === "hy" ? "hy" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getSavedLanguage);

  useEffect(() => {
    try {
      localStorage.setItem("appLanguage", language);
    } catch {
      // Keep language switching available if storage is unavailable.
    }

    document.documentElement.lang = language;
  }, [language]);

  function t(key, values = {}) {
    const template = translations[language][key] || translations.en[key] || key;
    return Object.entries(values).reduce(
      (result, [name, value]) => result.replaceAll(`{${name}}`, value),
      template
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
