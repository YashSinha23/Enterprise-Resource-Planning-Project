export async function fetchEmployees() {
  const res = await fetch("/api/employees");
  return await res.json();
}

export async function addEmployee(employee) {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  });
  return await res.json();
}
