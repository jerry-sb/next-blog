const getBlogs = async (subcategory_id: string) => {
  const response = await fetch(
    `http://localhost:3000/api/notion/blogs/${subcategory_id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  return await response.json();
};

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const blogs = await getBlogs(id);

  return (
    <main className="bg-bg flex flex-col items-start min-h-screen p-8 sm:p-24">
      <h1 className="text-heading text-5xl font-bold">This is a heading</h1>
      <p>{}</p>
    </main>
  );
}
