// External imports
import type { BoxProps } from '@mui/material' // Type for Box component props
import { Box } from '@mui/material' // Box component from Material-UI

// Internal imports
import { layoutConfig } from '@/components/layout/utils/layoutConfig' // Layout configuration
import type { ChildrenType } from '@core/types' // Type for children prop

/**
 * Props for the ContainerCommon component.
 * Extends Material-UI's BoxProps and includes children and an optional component prop.
 */
type ContainerCommonProps = BoxProps & ChildrenType & { component?: React.ElementType }

/**
 * ContainerCommon Component
 * A reusable container component that wraps its children with consistent styling.
 *
 * @param {ContainerCommonProps} props - Props for the component.
 * @returns {JSX.Element} A styled container wrapping the children.
 */
const ContainerCommon = ({ children, ...props }: ContainerCommonProps): JSX.Element => {
  const { sx, ...restProps } = props

  return (
    <Box
      sx={{
        width: '100%',
        marginInline: 'auto',
        maxInlineSize: `${layoutConfig.compactContentWidth}px`,
        px: {
          xs: `${layoutConfig.contentPadding.xs}px`,
          sm: `${layoutConfig.contentPadding.sm}px`,
          md: `${layoutConfig.contentPadding.md}px`,
          lg: `${layoutConfig.contentPadding.lg}px`,
          xl: `${layoutConfig.contentPadding.xl}px`
        },
        ...sx
      }}
      {...restProps}
    >
      {children}
    </Box>
  )
}

export default ContainerCommon
