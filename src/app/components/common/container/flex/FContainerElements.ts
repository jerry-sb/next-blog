import {
  FlexStyle,
  flexStyle,
  MarginStyle,
  marginStyle,
  SizeStyles,
  widthHeightStyle,
  WidthHeightStyle,
} from '@/app/styles/common.module';
import { styled } from 'styled-components';
import { Container } from '@/app/components/common/container/ContainerElements';
import { CommonSizeType } from '@/types/style';

export const FContainer = styled(Container)<FlexStyle>`
  ${({ $direction, $align, $gap, $justify }) =>
    flexStyle({ $direction, $align, $gap, $justify })}
`;

export const BasicFContainer = styled(FContainer)<
  {
    $size?: CommonSizeType;
    $require?: boolean;
    $grow?: number;
  } & WidthHeightStyle &
    MarginStyle
>`
  ${({ $size }) => ($size ? SizeStyles[$size] : '')};
  ${widthHeightStyle}
  ${marginStyle}

  ${({ $grow }) =>
    $grow &&
    `
    flex-grow: ${$grow}; 
  `}
`;
