'use client';
import * as React from 'react';
import { NotionBlockResponse } from '@/types/notion.block';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const BlogDetailNavigation = ({ blocks }: { blocks: NotionBlockResponse }) => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [viewActiveIds, setViewActiveIds] = useState<string[]>([]);
  const [active, setActive] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-head-id');
          if (!id) return;

          if (entry.isIntersecting) {
            setViewActiveIds((prev) => [...new Set([...prev, id])]);
          } else {
            setViewActiveIds((prev) =>
              prev.filter((activeId) => activeId !== id)
            );
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    const targets = document.querySelectorAll('[data-head-id]');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.observe(target));
    };
  }, []);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    blocks.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setActive((prev) => [...prev, true]);
      }, index * 100);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [blocks]);

  const onClickHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const lastId = viewActiveIds[viewActiveIds.length - 1];
    const activeEl = itemRefs.current[lastId];

    if (lastId && activeEl && navContainerRef.current) {
      const container = navContainerRef.current;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const elOffsetTop = activeEl.offsetTop;
      const elHeight = activeEl.offsetHeight;

      if (elOffsetTop < containerTop) {
        container.scrollTo({ top: elOffsetTop - 16, behavior: 'smooth' });
      } else if (elOffsetTop + elHeight > containerTop + containerHeight) {
        container.scrollTo({
          top: elOffsetTop - containerHeight + elHeight + 16,
          behavior: 'smooth',
        });
      }
    }
  }, [viewActiveIds]);

  return (
    <aside
      className={
        'top-[150px] left-[200px] w-[0px] lg:w-[300px] overflow-hidden lg:overflow-visible sticky p-0 lg:p-2 rounded-[15px]'
      }
    >
      <div
        className="max-h-[80vh] overflow-y-auto pr-1 scroll-smooth"
        ref={navContainerRef}
      >
        <ul className={'flex flex-col gap-3'}>
          {blocks.map((block, index) => {
            if (block.type === 'heading_3') {
              return (
                <li
                  key={`header${index}`}
                  ref={(el) => {
                    itemRefs.current[block.id] = el;
                  }}
                  className={clsx(
                    'ml-7 text-[var(--border-color)] cursor-pointer',
                    {
                      'animate-opacityTransX': active[index],
                      'text-heading': viewActiveIds.includes(block.id),
                    }
                  )}
                  onClick={() => onClickHeading(block.id)}
                >
                  {block.heading_3.rich_text.reduce((ac, cv) => {
                    return ac + ' ' + cv.plain_text;
                  }, '')}
                </li>
              );
            }
            if (block.type === 'heading_2') {
              return (
                <li
                  key={`header${index}`}
                  ref={(el) => {
                    itemRefs.current[block.id] = el;
                  }}
                  className={clsx(
                    'ml-4 text-[var(--border-color)] cursor-pointer',
                    {
                      'animate-opacityTransX': active[index],
                      'text-heading': viewActiveIds.includes(block.id),
                    }
                  )}
                  onClick={() => onClickHeading(block.id)}
                >
                  {block.heading_2.rich_text.reduce((ac, cv) => {
                    return ac + ' ' + cv.plain_text;
                  }, '')}
                </li>
              );
            }
            if (block.type === 'heading_1') {
              return (
                <li
                  key={`header${index}`}
                  ref={(el) => {
                    itemRefs.current[block.id] = el;
                  }}
                  className={clsx('text-[var(--border-color)] cursor-pointer', {
                    'animate-opacityTransX': active[index],
                    'text-heading': viewActiveIds.includes(block.id),
                  })}
                  onClick={() => onClickHeading(block.id)}
                >
                  {block.heading_1.rich_text.reduce((ac, cv) => {
                    return ac + ' ' + cv.plain_text;
                  }, '')}
                </li>
              );
            }
            return <></>;
          })}
        </ul>
      </div>
    </aside>
  );
};

export default BlogDetailNavigation;
