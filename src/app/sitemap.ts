import { MetadataRoute } from 'next';
import {
  getBlogs,
  getSubcategories,
} from '@/app/api/notion/database/getDatabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryPages: {
    url: string;
    priority: number;
    lastModified: Date;
    changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
  }[] = [];
  const blogDetailPages: {
    url: string;
    priority: number;
    lastModified: Date;
    changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
  }[] = [];

  const subCategories = await getSubcategories();
  subCategories.results.forEach((item) => {
    categoryPages.push({
      url: `https://sbnotes.vercel.app/category/${item.id}`,
      priority: 1,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    });
  });

  const blogs = await getBlogs();
  blogs.results.forEach((item) => {
    blogDetailPages.push({
      url: `https://sbnotes.vercel.app/detail/${item.id}`,
      priority: 1,
      lastModified: new Date(),
      changeFrequency: 'weekly',
    });
  });

  return [...blogDetailPages, ...categoryPages];
}
