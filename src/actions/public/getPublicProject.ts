
export const fetchProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  };