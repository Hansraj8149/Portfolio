export const getFullMediaUrl = (path: string) => {
  const base =
    process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL ||
    "https://portfolio-backend-xfse.onrender.com";
  return path.startsWith("http") ? path : `${base}${path}`;
};

export const getSectionData = async (path: string) => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL ||
      "https://portfolio-backend-xfse.onrender.com";

    const url = `${baseUrl}/api/${path}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      return { data: null };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: null };
  }
};
