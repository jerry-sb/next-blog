import {
  GridStyle,
  gridStyle,
  widthHeightStyle,
  WidthHeightStyle,
} from '@/app/styles/common.module';
import { styled } from 'styled-components';
import { Container } from '@/app/components/common/container/ContainerElements';

export const GridContainer = styled(Container)<GridStyle & WidthHeightStyle>`
  ${widthHeightStyle}
  ${gridStyle}
`;
