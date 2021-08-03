import { Box, BoxProps } from '@material-ui/core'

export type Spacing = 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface AppBoxProps extends BoxProps {
  spacing?: Spacing
}

export default function AppBox({ spacing, ...props }: AppBoxProps): JSX.Element {
  return <Box display="flex" gridGap={spacing && spacing * 8} {...props} />
}
