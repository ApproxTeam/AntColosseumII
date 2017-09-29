export function makeToast(heading, text, icon, hideAfter, position) {
  $.toast({
    text: text,
    heading: heading,
    icon: icon,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: hideAfter > 0 ? hideAfter : false,
    stack: 5,
    position: position,

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export const iconTypes = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  information: 'info',
}
