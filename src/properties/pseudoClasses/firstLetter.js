import { createElement } from 'react'

// Styles the first letter of an element
export default (property, styles, customKey, {newProps}) => {
  const children = newProps.children

  if (children && typeof children === 'string' && children.length > 0) {
    const firstLetterElement = createElement('span', {style: styles}, children.substr(0, 1))
    newProps.children = [firstLetterElement, children.substr(1, children.length - 1)]
  }
  return false
}