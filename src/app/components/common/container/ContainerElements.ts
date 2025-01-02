import {
  BoxShadowStyle,
  marginStyle,
  MarginStyle,
  paddingStyle,
  PaddingStyle,
  widthHeightStyle,
  WidthHeightStyle,
} from '@/app/styles/common.module';
import { styled } from 'styled-components';

export const Container = styled.div<PaddingStyle>`
  width: 100%;
  height: 100%;
  ${paddingStyle}
`;

export const BasicContainer = styled(Container)<
  WidthHeightStyle & BoxShadowStyle & MarginStyle
>`
  ${widthHeightStyle}
  ${marginStyle}
`;
