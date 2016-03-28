import Linter from 'inline-style-linter'
import { Utils } from 'react-look-core'
const { getChildType } = Utils

export default function linter({ styles, Component, element, config: { linter } }) {
  const warnings = new Linter(linter).lint(styles)

  warnings.forEach(warning => {
    if (!linter.mute) {
      if (linter && linter.onlyLogHint) {
        console.warn(`${Component.constructor.displayName}<${getChildType(element)}>: ` + warning.hint) // eslint-disable-line
      } else {
        console.warn(`${Component.constructor.displayName}<${getChildType(element)}>: ` + warning.hint, warning) // eslint-disable-line
      }
    }
  })

  return styles
}
