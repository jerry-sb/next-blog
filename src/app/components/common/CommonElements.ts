import { styled } from 'styled-components';
import { rotate } from '@/app/styles/animation.module';
import { CommonSizeType } from '@/types/style';

export const Spacer = styled.div<{
  $w?: number;
  $h?: number;
  $d?: 'horizontal' | 'vertical';
}>`
  display: ${(props) => (props.$d === 'horizontal' ? 'inline-block' : 'block')};
  width: ${(props) =>
    props.$d === 'horizontal' ? `${props.$w || 0}px` : '100%'};
  height: ${(props) =>
    props.$d === 'vertical' ? `${props.$h || 0}px` : '100%'};
  flex: none;
`;

export const LoadingSpinner = styled.div<{ $size?: CommonSizeType }>`
  border: 8px solid ${(props) => props.theme.color.info};
  border-top: 8px solid white;
  border-radius: 50%;
  z-index: 4000;
  animation: ${rotate} ease-in-out 1s infinite;

  width: ${({ $size = 'medium' }) => {
    switch ($size) {
      case 'small':
        return '50px';
      case 'medium':
        return '75px';
      case 'large':
      default:
        return '100px';
    }
  }};
  height: ${({ $size = 'medium' }) => {
    switch ($size) {
      case 'small':
        return '50px';
      case 'medium':
        return '75px';
      case 'large':
      default:
        return '100px';
    }
  }};
`;
