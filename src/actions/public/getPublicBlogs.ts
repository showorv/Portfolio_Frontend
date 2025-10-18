

export const fetchBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  };