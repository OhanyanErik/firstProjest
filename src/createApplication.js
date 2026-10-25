export default function createApplication(values) {
  return {
    ...values,
    id: crypto.randomUUID(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
}
