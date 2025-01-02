import { css } from 'styled-components';
import { fontSize, fontStyles } from './font.module';
import { FlexAlign, FlexDirection, FlexJustify } from '@/types/style';

// basic props
// Padding 타입 정의
export type PaddingStyle = {
  $pt?: string;
  $pb?: string;
  $pl?: string;
  $pr?: string;
  $py?: string;
  $px?: string;
};

export const paddingStyle = css<PaddingStyle>`
  padding-top: ${(props) => props.$pt ?? props.$py ?? '0px'};
  padding-bottom: ${(props) => props.$pb ?? props.$py ?? '0px'};
  padding-left: ${(props) => props.$pl ?? props.$px ?? '0px'};
  padding-right: ${(props) => props.$pr ?? props.$px ?? '0px'};
`;

// Margin 타입 정의
export type MarginStyle = {
  $mt?: string;
  $mb?: string;
  $ml?: string;
  $mr?: string;
  $my?: string;
  $mx?: string;
};

export const marginStyle = css<MarginStyle>`
  margin-top: ${(props) => props.$mt ?? props.$my ?? '0px'};
  margin-bottom: ${(props) => props.$mb ?? props.$my ?? '0px'};
  margin-left: ${(props) => props.$ml ?? props.$mx ?? '0px'};
  margin-right: ${(props) => props.$mr ?? props.$mx ?? '0px'};
`;

export type PositionStyle = {
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
};

// 포지션 스타일 정의
export const positionStyle = css<PositionStyle>`
  ${(props) => props.$top !== undefined && `top: ${props.$top};`}
  ${(props) => props.$right !== undefined && `right: ${props.$right};`}
  ${(props) => props.$bottom !== undefined && `bottom: ${props.$bottom};`}
  ${(props) => props.$left !== undefined && `left: ${props.$left};`}
`;

export type WidthHeightStyle = {
  $w?: string; // width
  $h?: string; // height
  $minW?: string; // min-width
  $minH?: string; // min-height
  $maxW?: string; // max-width
  $maxH?: string; // max-height
};

export const widthHeightStyle = css<WidthHeightStyle>`
  width: ${(props) => props.$w ?? 'auto'};
  height: ${(props) => props.$h ?? 'auto'};
  min-width: ${(props) => props.$minW ?? '0'};
  min-height: ${(props) => props.$minH ?? '0'};
  max-width: ${(props) => props.$maxW ?? 'none'};
  max-height: ${(props) => props.$maxH ?? 'none'};
`;

export type BoxShadowStyle = {
  $boxShadow?: boolean;
};

// 기본 box-shadow 값 설정
export const boxShadowStyle = css<BoxShadowStyle>`
  box-shadow: ${(props) =>
    props.$boxShadow ? '0px 0px 30px rgba(0, 0, 0, 0.25)' : ''};
`;

export type FlexStyle = {
  $direction?: FlexDirection;
  $align?: FlexAlign;
  $justify?: FlexJustify;
  $gap?: number | string;
};

export const flexStyle = ({
  $direction = 'column',
  $gap = 0,
  $justify = 'center',
  $align = 'center',
}: FlexStyle) => css`
  ${({ theme }) =>
    theme.mixin.MFlex(
      $direction,
      $align,
      $justify,
      typeof $gap === 'number' ? `${$gap}px` : $gap
    )}
`;

// export type BorderStyle = {
//   $bc?: keyof typeof ThemeColor;
//   $bw?: string;
//   $bs?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
//   $br?: string;
// };
//
// export const borderStyle = css<BorderStyle>`
//   border-color: ${(props) => (props.$bc ? props.theme.color[props.$bc] : '')};
//   border-width: ${(props) => props.$bw ?? ''};
//   border-style: ${(props) => props.$bs ?? ''};
//   border-radius: ${(props) => props.$br ?? ''};
// `;

export const mediaWidth = (
  $small: string,
  $medium?: string,
  $large?: string
) => css`
  // 작은 화면
  @media (max-width: 768px) {
    width: ${$small};
  }

  // 중간 화면 (medium이 없으면 small 사용)
  @media (min-width: 769px) and (max-width: 1200px) {
    width: ${$medium ?? $small};
  }

  // 큰 화면 (large가 없으면 medium, medium이 없으면 small 사용)
  @media (min-width: 1201px) {
    width: ${$large ?? $medium ?? $small};
  }
`;

export const mediaHeight = (
  $small: string,
  $medium?: string,
  $large?: string
) => css`
  // 작은 화면
  @media (max-width: 768px) {
    height: ${$small};
  }

  // 중간 화면 (medium이 없으면 small 사용)
  @media (min-width: 769px) and (max-width: 1200px) {
    height: ${$medium ?? $small};
  }

  // 큰 화면 (large가 없으면 medium, medium이 없으면 small 사용)
  @media (min-width: 1201px) {
    height: ${$large ?? $medium ?? $small};
  }
`;

export const mediaFlexDirection = (
  $small: FlexDirection,
  $medium?: FlexDirection,
  $border?: boolean
) => css`
  // 작은 화면
  @media (max-width: 768px) {
    flex-direction: ${$small};

    ${$border &&
    css`
      > div:first-child {
        border-bottom: 1px solid #dcdcdc;
      }
    `}
  }

  // 중간 화면 (medium이 없으면 small 사용)
  @media (min-width: 769px) {
    flex-direction: ${$medium ?? $small};
    ${$border &&
    css`
      > div:first-child {
        border-right: 1px solid #dcdcdc;
      }
    `}
  }
`;

export type InputFocusStyle = { $focusEnabled?: boolean };

export const inputFocusStyle = css<InputFocusStyle>`
  ${({ $focusEnabled, theme }) =>
    $focusEnabled &&
    css`
      &:focus {
        outline: none;
        box-shadow: 0 0 10px 3px ${theme.color.info};
      }
    `}
`;

export const SizeStyles = {
  small: css`
    padding: 0.5rem 0.75rem;
    height: 2.5rem;
    ${fontStyles.m}
  `,
  medium: css`
    padding: 1rem 0.75rem;
    height: calc(3.5rem + 2px);
    ${fontStyles.ml}
  `,
  large: css`
    padding: 1.25rem 1rem;
    height: 4rem;
    font-size: ${fontSize.l};
    max-width: 500px;
    width: 80%;
    ${fontStyles.l}
  `,
};

export const CheckBoxSizeStyles = {
  small: css`
    width: 1.5rem;
    height: 1.5rem;
  `,
  medium: css`
    width: 2rem;
    height: 2rem;
  `,
  large: css`
    width: 2.5rem;
    height: 2.5rem;
  `,
};

export const DropBoxSizeHeightValue = {
  small: `2rem`,
  medium: `3rem`,
  large: `4rem`,
};

export const DropBoxSizeStyles = {
  small: css`
    width: 8rem;
    padding: 0.5rem 0.75rem;
    ${fontStyles.m};
  `,
  medium: css`
    width: 12rem;
    padding: 0.75rem 1rem;
    ${fontStyles.ml};
  `,
  large: css`
    padding: 1.25rem 1rem;
    font-size: ${fontSize.l};
    max-width: 500px;
    width: 16rem;
    ${fontStyles.l}
  `,
};

export interface GridStyle {
  $columns?: string; // 예: "1fr 2fr 1fr" (열 너비 비율 정의)
  $rows?: string; // 예: "100px auto 50px" (행 높이 정의)
  $gap?: string; // 예: "16px" (그리드 아이템 간격)
  $columnGap?: string; // 예: "10px" (열 간격)
  $rowGap?: string; // 예: "20px" (행 간격)
  $alignItems?: string; // 예: "start" | "center" | "end" | "stretch"
  $justifyItems?: string; // 예: "start" | "center" | "end" | "stretch"
  $alignContent?: string; // 예: "start" | "center" | "end" | "stretch" | "space-between" | "space-around"
  $justifyContent?: string; // 예: "start" | "center" | "end" | "stretch" | "space-between" | "space-around"
  $areas?: string; // 예: "'header header' 'sidebar content' 'footer footer'" (그리드 영역 정의)
  $autoFlow?: 'row' | 'column' | 'row dense' | 'column dense'; // 아이템 자동 배치
  $autoRows?: string; // 예: "minmax(100px, auto)" (자동 생성된 행의 높이 정의)
  $autoColumns?: string; // 예: "200px" (자동 생성된 열의 너비 정의)
}

export const gridStyle = css<GridStyle>`
  display: grid;
  grid-auto-flow: ${({ $autoFlow }) => $autoFlow || 'row'}; // 아이템 배치 방식
  grid-template-columns: ${({ $columns }) => $columns || '1fr'}; // 열 정의
  grid-template-rows: ${({ $rows }) => $rows || 'auto'}; // 행 정의
  grid-auto-rows: ${({ $autoRows }) => $autoRows || ''}; // 자동 생성 행의 높이
  grid-auto-columns: ${({ $autoColumns }) =>
    $autoColumns || ''}; // 자동 생성 열의 너비
  gap: ${({ $gap }) => $gap || '0'}; // 전체 간격
  column-gap: ${({ $columnGap }) => $columnGap || '0'}; // 열 간격
  row-gap: ${({ $rowGap }) => $rowGap || '0'}; // 행 간격
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'}; // 수직 정렬
  justify-items: ${({ $justifyItems }) =>
    $justifyItems || 'stretch'}; // 수평 정렬
  align-content: ${({ $alignContent }) =>
    $alignContent || 'stretch'}; // 콘텐츠 수직 정렬
  justify-content: ${({ $justifyContent }) =>
    $justifyContent || 'stretch'}; // 콘텐츠 수평 정렬
  grid-template-areas: ${({ $areas }) => $areas || 'none'}; // 영역 정의
`;

export interface GridItemStyle {
  $columnStart?: string; // 예: "1" (1번째 열 시작)
  $columnEnd?: string; // 예: "3" (3번째 열 끝)
  $rowStart?: string; // 예: "2" (2번째 행 시작)
  $rowEnd?: string; // 예: "4" (4번째 행 끝)
  $area?: string; // 예: "header" (grid-template-areas에서 정의된 영역 이름)
  $justifySelf?: string; // 예: "start" | "center" | "end" | "stretch"
  $alignSelf?: string; // 예: "start" | "center" | "end" | "stretch"
}

export const gridItemStyle = css<GridItemStyle>`
  grid-column-start: ${({ $columnStart }) => $columnStart || 'auto'}; // 열 시작
  grid-column-end: ${({ $columnEnd }) => $columnEnd || 'auto'}; // 열 끝
  grid-row-start: ${({ $rowStart }) => $rowStart || 'auto'}; // 행 시작
  grid-row-end: ${({ $rowEnd }) => $rowEnd || 'auto'}; // 행 끝
  grid-area: ${({ $area }) => $area || ''}; // 지정된 영역 이름
  justify-self: ${({ $justifySelf }) => $justifySelf || 'stretch'}; // 수평 정렬
  align-self: ${({ $alignSelf }) => $alignSelf || 'stretch'}; // 수직 정렬
`;
