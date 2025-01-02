import { css, keyframes } from 'styled-components';

export const hoverScaleTransition = css`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export const hoverTextTransition = css`
  transition: color 0.3s ease-in-out;
`;

export const rotate = keyframes`
  100% {
    rotate: 360deg;
  }
`;

const slideDown = (distance: string) => keyframes`
  0% {
    opacity: 0;
    transform: translateY(${distance});
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleAnimation = (isOpen: boolean) => keyframes`
  0% {
    transform: scale(${isOpen ? 0 : 1});
  }
  100% {
    transform: scale(${isOpen ? 1 : 0});
  }
`;

export const slideScaleAnimation = ({
  second,
  isOpen,
}: {
  second: number;
  isOpen: boolean;
}) => css`
  animation: ${second}s ${scaleAnimation(isOpen)} ease-in-out;
  transform-origin: top; // 위쪽에서 아래로 확장되도록 설정
`;

export const slideDownAnimation = (distance: string) => css`
  animation: 1s ${slideDown(distance)} ease-out;
`;

const heightAnimation = (isOpen: boolean) => keyframes`
  0% {
    height: ${isOpen ? '0px' : 'auto'}
  }
  100% {
    height: ${isOpen ? 'auto' : '0px'}
  }
`;

export const slideHeightAnimation = ({
  second,
  isOpen,
}: {
  second: number;
  isOpen: boolean;
}) => css`
  animation: ${second}s ${heightAnimation(isOpen)} ease-in-out;
`;
