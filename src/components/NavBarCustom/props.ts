import { ThemeEnum } from '@/enums/appEnum'
import { ExtractPropTypes } from 'vue'

export const baseNavBarProps = {
  title: String,
  isLeft: Boolean,
  fixed: {
    type: Boolean,
    default: true,
  },
  back: Function,
  theme: String as PropType<ThemeEnum>,
  backgroundColor: String,
}

export type BaseNavBarPropsType = ExtractPropTypes<typeof baseNavBarProps>
