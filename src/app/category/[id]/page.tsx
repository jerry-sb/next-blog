import BlogList from '@/app/components/BlogList';
import { NotionBlogList } from '@/types/notion.model';
import Spacer from '@/app/components/common/Spacer';
import {
  getBlogsBySubcategoryId,
  getSubcategories,
} from '@/app/api/notion/database/getDatabase';

export async function generateStaticParams() {
  const subCategories = await getSubcategories();
  return subCategories.results.map((item) => ({
    id: item.properties.Title.title[0].text.content,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  let categoryTitle: string = '';
  const blogs = await getBlogsBySubcategoryId(id);
  const blogList: NotionBlogList = [];

  if (blogs?.results && blogs.results.length > 0) {
    blogs.results.forEach((blog, index) => {
      const { cover, properties, id } = blog;
      const { Title, InsertDate, SubcategoryName } = properties;

      if (index === 0) {
        categoryTitle = SubcategoryName.rich_text[0].plain_text;
      }

      blogList.push({
        id,
        title: Title.title[0].text.content,
        coverImage: cover !== null ? cover.file.url : undefined,
        insertDate: InsertDate.date?.start ?? '',
      });
    });
  }

  return (
    <div className={'flex flex-col items-center justify-center mt-20'}>
      <h1 className={'head-text1 italic underline'}>{categoryTitle}</h1>
      <Spacer d={'vertical'} size={50} />
      <BlogList blogList={blogList} />
    </div>
  );
}
