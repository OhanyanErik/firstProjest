export default function validateApplication(values) {
  const errors = {};
  const requiredFields = {
    "full-name": "Full name",
    years: "Experience",
    email: "Email",
    url: "CV URL",
    number: "Phone",
    letter: "Cover letter",
    position: "Position",
    company: "Company",
  };

  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!String(values[field] ?? "").trim()) {
      errors[field] = `${label} is required.`;
    }
  });

  if (values.years !== "" && values.years != null) {
    const years = Number(values.years);
    if (!Number.isFinite(years) || years < 0) {
      errors.years = "Experience must be zero or more years.";
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.url) {
    try {
      const url = new URL(values.url);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.url = "CV URL must start with http:// or https://.";
      }
    } catch {
      errors.url = "Enter a valid CV URL.";
    }
  }

  if (values.number) {
    const digitCount = values.number.replace(/\D/g, "").length;
    if (digitCount < 7 || digitCount > 15) {
      errors.number = "Phone number must contain 7 to 15 digits.";
    }
  }

  if (values.letter && values.letter.trim().length < 50) {
    errors.letter = "Cover letter must be at least 50 characters.";
  }

  if (values.salary !== "" && values.salary != null) {
    const salary = Number(values.salary);
    if (!Number.isFinite(salary) || salary < 0) {
      errors.salary = "Salary expectation must be zero or more.";
    }
  }

  return errors;
}
