import { getBlogs } from '@/app/api/notion/database/getDatabase';
import { NotionBlogList } from '@/types/notion.model';
import BlogList from '@/app/components/BlogList';

export default async function Home() {
  const blogs = await getBlogs();
  const blogList: NotionBlogList = [];

  if (blogs?.results && blogs.results.length > 0) {
    blogs.results.forEach((blog) => {
      const { cover, properties, id } = blog;
      const { Title, InsertDate } = properties;

      blogList.push({
        id,
        title: Title.title[0].text.content,
        coverImage: cover?.external ? cover.external.url : cover?.file.url,
        insertDate: InsertDate.date?.start ?? '',
      });
    });
  }

  return (
    <div
      className={
        'flex flex-col items-center justify-center my-20 animate-opacityTransX'
      }
    >
      <h1 className={'head-text1 italic underline'}>All Posts</h1>
      <BlogList blogList={blogList} />
    </div>
  );
}
