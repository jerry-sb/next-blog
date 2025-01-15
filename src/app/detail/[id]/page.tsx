import NavigationControl from '@/app/components/NavigationControl';

export default function BlogDetailPage() {
  return (
    <div className="flex w-full mt-20  justify-center mx-auto relative">
      <article
        className={
          'max-w-[900px] w-full lg:w-[900px] min-h-[8000px] bg-gray-700'
        }
      ></article>
      <div className={'relative w-[0px] lg:w-[200px] bg-gray-900'}>
        <nav
          className={
            'top-[100px] w-[0px] lg:w-[200px] h-[500px] sticky bg-gray-200'
          }
        ></nav>
      </div>
      <NavigationControl />
    </div>
  );
}
