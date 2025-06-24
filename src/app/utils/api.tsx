export const fetchAllPrograms = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/program/all");
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch programs", err);
    throw err;
  }
};
