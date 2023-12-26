import { enqueueSnackbar, type VariantType } from 'notistack'

export const useToast = (title: string, variant: VariantType) => {
  enqueueSnackbar(title, {
    variant,
    autoHideDuration: 4000,
    preventDuplicate: false,
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
  })
}
