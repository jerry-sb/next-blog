import {
  BoxShadowStyle,
  GridItemStyle,
  gridItemStyle,
} from '@/app/styles/common.module';
import { styled } from 'styled-components';
import { Property } from 'csstype';
import BorderStyle = Property.BorderStyle;
import { FContainer } from '@/app/components/common/container/flex/FContainerElements';

export const GridItem = styled(FContainer)<
  GridItemStyle & {
    $animation?: boolean;
  } & BoxShadowStyle &
    BorderStyle
>`
  ${gridItemStyle};
  overflow: hidden;
  background-color: ${(props) => props.theme.color.white};
`;
