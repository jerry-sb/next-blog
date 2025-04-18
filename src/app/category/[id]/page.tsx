import BlogList from '@/app/components/BlogList';
import { NotionBlogList } from '@/types/notion.model';
import {
  getBlogsBySubcategoryId,
  getSubcategories,
  getSubcategoryDetail,
} from '@/app/api/notion/database/getDatabase';

export async function generateStaticParams() {
  const subCategories = await getSubcategories();
  return subCategories.results.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subCategoryInfo = await getSubcategoryDetail(id);
  const { Title } = subCategoryInfo.properties;

  return {
    title: `${Title.title[0].plain_text} | SB Notes`,
    openGraph: {
      title: `${Title.title[0].plain_text} | SB Notes`,
      description: '안녕하세요. 웹 프론트엔드 개발자 심명보입니다.',
      locale: 'kr_KR',
      type: 'website',
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
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
      <h1 className={'page-title'}>{categoryTitle}</h1>
      <BlogList blogList={blogList} />
    </div>
  );
}
