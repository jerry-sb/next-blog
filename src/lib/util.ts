export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export const getPublishedImageUrl = (
  notionCoverUrl: string,
  projectId: string
) => {
  const encodedUrl = encodeURIComponent(notionCoverUrl.split('?')[0]);
  return `https://adjoining-ostrich-c77.notion.site/image/${encodedUrl}?table=block&id=${projectId}&cache=v2`;
};
