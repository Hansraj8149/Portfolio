const GetSectionData = async (path: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/strapi?path=${path}`;

    const response = await fetch(url);

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

export default GetSectionData;
