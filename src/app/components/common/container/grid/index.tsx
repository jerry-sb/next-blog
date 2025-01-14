import clsx from 'clsx';
import React from 'react';

interface GridContainerProps {
  columns?: string;
  rows?: string;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  width?: string;
  height?: string;
  className?: string; // 확장 가능한 CSS prop 추가
  children: React.ReactNode;
}

interface GridItemProps {
  columnStart?: string;
  columnEnd?: string;
  rowStart?: string;
  rowEnd?: string;
  area?: string;
  animation?: boolean;
  boxShadow?: boolean;
  className?: string; // 확장 CSS를 받기 위한 prop
  children: React.ReactNode;
}

const GridContainer: React.FC<GridContainerProps> = ({
  columns = '1fr',
  rows = 'auto',
  gap = '0',
  columnGap = '0',
  rowGap = '0',
  width = '100%',
  height = '100%',
  className, // className prop 추가
  children,
}) => {
  return (
    <div
      className={clsx(
        'grid', // 기본 Tailwind CSS 클래스
        `grid-cols-[${columns}]`, // 동적 column 정의
        `grid-rows-[${rows}]`, // 동적 row 정의
        `gap-[${gap}]`, // 전체 간격
        `col-gap-[${columnGap}]`, // 열 간격
        `row-gap-[${rowGap}]`, // 행 간격
        `w-[${width}]`, // 너비
        `h-[${height}]`, // 높이
        className // 사용자 정의 클래스
      )}
    >
      {children}
    </div>
  );
};

const GridItem: React.FC<GridItemProps> = ({
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  area,
  animation = false,
  boxShadow = false,
  className, // 추가된 prop
  children,
}) => {
  return (
    <div
      className={clsx(
        'overflow-hidden bg-white', // 기본 클래스
        boxShadow && 'shadow-md', // boxShadow 조건
        animation && 'animate-pulse', // animation 조건
        columnStart && `col-start-${columnStart}`, // column 시작 위치
        columnEnd && `col-end-${columnEnd}`, // column 종료 위치
        rowStart && `row-start-${rowStart}`, // row 시작 위치
        rowEnd && `row-end-${rowEnd}`, // row 종료 위치
        area && `grid-area-${area}`, // grid 영역
        className // 외부에서 전달된 클래스
      )}
    >
      {children}
    </div>
  );
};

const Grid = {
  Item: GridItem,
  Container: GridContainer,
};

export default Grid;
