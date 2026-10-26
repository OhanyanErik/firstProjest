export default function validateApplication(values, t) {
  const errors = {};
  const requiredFields = {
    "full-name": "field.fullName",
    years: "field.experience",
    email: "field.email",
    url: "field.cvUrl",
    number: "field.phone",
    letter: "field.coverLetter",
    position: "field.position",
    company: "field.company",
  };

  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!String(values[field] ?? "").trim()) {
      errors[field] = t("validation.required", { field: t(label) });
    }
  });

  if (values.years !== "" && values.years != null) {
    const years = Number(values.years);
    if (!Number.isFinite(years) || years < 0) {
      errors.years = t("validation.years");
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = t("validation.email");
  }

  if (values.url) {
    try {
      const url = new URL(values.url);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.url = t("validation.urlProtocol");
      }
    } catch {
      errors.url = t("validation.url");
    }
  }

  if (values.number) {
    const digitCount = values.number.replace(/\D/g, "").length;
    if (digitCount < 7 || digitCount > 15) {
      errors.number = t("validation.phone");
    }
  }

  if (values.letter && values.letter.trim().length < 50) {
    errors.letter = t("validation.letter");
  }

  if (values.salary !== "" && values.salary != null) {
    const salary = Number(values.salary);
    if (!Number.isFinite(salary) || salary < 0) {
      errors.salary = t("validation.salary");
    }
  }

  return errors;
}
