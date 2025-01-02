import { css } from 'styled-components';

export const fontSize = {
  xs: '0.75rem', // 10.5px
  s: '0.875rem', // 12.25px
  sm: '0.975rem', // 13.65px (근사치)
  m: '1rem', // 14px (기본)
  ml: '1.125rem', // 15.75px
  l: '1.25rem', // 17.5px
  xl: '1.5rem', // 21px
  xxl: '2rem', // 28px
  xxxl: '2.5rem', // 35px
};

export const fontStyles = {
  xs: css`
    font-size: ${fontSize.xs};
    font-weight: 400;
    line-height: 1.2;
  `,
  s: css`
    font-size: ${fontSize.s};
    font-weight: 400;
    line-height: 1.2;
  `,
  sm: css`
    font-size: ${fontSize.sm};
    font-weight: 400;
    line-height: 1.2;
  `,
  m: css`
    font-size: ${fontSize.m};
    font-weight: 400;
    line-height: 1.5;
  `,
  ml: css`
    font-size: ${fontSize.ml};
    font-weight: 500;
    line-height: 1.5;
  `,
  l: css`
    font-size: ${fontSize.l};
    font-weight: 600;
    line-height: 1.5;
  `,
  xl: css`
    font-size: ${fontSize.xl};
    font-weight: 700;
    line-height: 1.4;
  `,
  xxl: css`
    font-size: ${fontSize.xxl};
    font-weight: 700;
    line-height: 1.3;
  `,
  xxxl: css`
    font-size: ${fontSize.xxxl};
    font-weight: 800;
    line-height: 1.2;
  `,
};

export type FontStyle = keyof typeof fontStyles;
