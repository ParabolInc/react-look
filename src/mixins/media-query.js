import MixinTypes from '../utils/MixinTypes'
import throttle from '../utils/throttle'

/**
 * Evaluates if a media condition is fulfilled by using window.matchMedia
 * NOTE: This won't work on server-side by default
 */
export default [{
  key: '@media',
  type: MixinTypes.BEGINWITH,
  fn: (key, styles, args) => {
    //Check if browser supports window.matchMedia
    let matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined
    if (matchMedia !== undefined) {
      if (!args.Component._mediaQueryListener) {
        args.Component._mediaQueryListener = throttle(() => {
          args.Component.forceUpdate()
        }, 250)
        window.addEventListener('resize', args.Component._mediaQueryListener)

        //Remove the listener if the component unmounts to keep things clean
        let existingWillUnmount = args.Component.componentWillUnmount
        args.Component.componentWillUnmount = () => {
          existingWillUnmount && existingWillUnmount()
          window.removeEventListener('resize', args.Component._mediaQueryListener)
        }
      }
      return matchMedia(key.replace('@media', '').trim()).matches ? styles : false
    } else {
      console.warn('Failed evaluating media query: ' + key + '. Your environment is not able to use window.matchMedia.');
      return false
    }
  }
}]