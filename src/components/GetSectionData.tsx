const GetSectionData = async (path: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/strapi?path=${path}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch API data");
  }
  return response.json();
};

export default GetSectionData;
