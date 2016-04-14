<h1 align="center">react-look</h1>
<p align="center">
<img alt="npm version" src="https://badge.fury.io/js/react-look.svg">
<img alt="npm downloads" src="https://img.shields.io/npm/dm/react-look.svg">
<img alt="react version" src="https://img.shields.io/badge/react--dom-%5E0.14.0-brightgreen.svg">
<img alt="gzipped size" src="https://img.shields.io/badge/gzipped-~16kb-brightgreen.svg">
</p>
<p align="center">
<a href="./docs/Docs.md">Docs</a> • <a href="./docs/GettingStarted.md">Getting Started</a> • <a href="#example">Example</a><br>
Also available for <a href="../react-look-native/">React Native</a>
</p>

# Features
- ES2015 Classes & `React.createClass`
- stateless Components
- server-side rendering
- [plugin-based](docs/Plugins.md)
- [developer tools](docs/Plugins.md#developertools)
- Sass-like nesting
- [pseudo classes](docs/api/StyleSheet.md#pseudo-classes)
- [media queries](docs/api/StyleSheet.md#media-queries)
- [platform queries](docs/Mixins.md#platform-queries)
- [conditioned styles](docs/Mixins.md#stateful-conditions)
- [stateful values](docs/plugins/StatefulValue.md) & [selectors](docs/plugins/StatefulSelector.md)
- [fallback values](docs/plugins/FallbackValue.md)
- [extending](docs/Mixins.md#extend)
- [vendor prefixing](docs/Prefixer.md)
- [CSS](docs/api/StyleSheet.md#addcssstyles--scope), [font-face ](docs/api/StyleSheet.md#fontfontfamily-files--properties) & [keyframes API](docs/api/StyleSheet.md#keyframesframes--name)

# [Documentation](docs/Docs.md)
The documentation contains information on every part of Look including usage guides and API reference.

**New to Look?**<br>
Make sure to check out the the Getting Started guide which provides a full guide on how to use Look. From installation, over configuration and up to even developer tooling.


## Table of contents

1. [Getting Started](docs/GettingStarted.md)
  * 1.1. [Installation](docs/GettingStarted.md#1-installation)
  * 1.2. [First Component](docs/GettingStarted.md#2-first-component)
  * 1.3. [Stateless Components](docs/GettingStarted.md#3-stateless-components)
  * 1.4. [Pseudo classes](docs/GettingStarted.md#4-pseudo-classes)
  * 1.5. [Media queries](docs/GettingStarted.md#5-media-queries)
  * 1.6. [Mixins & Plugins](docs/GettingStarted.md#6-mixins--plugins)
  * 1.7. [Fallback values](docs/GettingStarted.md#7-fallback-values)
  * 1.8. [Vendor prefixes](docs/GettingStarted.md#8-vendor-prefixes)
  * 1.9. [Server-side rendering](docs/GettingStarted.md#9-server-side-rendering)
  * 1.10. [DevTools](docs/GettingStarted.md#10-devtools)
2. [API Reference](docs/api/)
  * **2.1. [look](docs/api/Look.md)**
  * **2.2. [StyleSheet](docs/api/StyleSheet.md)**
    * [create](docs/api/StyleSheet.md#createstyles)
    * [combineStyles](docs/api/StyleSheet.md#combinestylesstyles)
    * [toCSS](docs/api/StyleSheet.md#tocssstyles--scope) <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/res/deprecated-badge.png" height=15>
    * [addCSS](docs/api/StyleSheet.md#addcssstyles--scope)
    * [renderToString](docs/api/StyleSheet.md#rendertostringprefixer)
    * [keyframes](docs/api/StyleSheet.md#keyframesframes--name)
    * [font](docs/api/StyleSheet.md#fontfontfamily-files--properties)
  * **2.3. [LookRoot](docs/api/LookRoot.md)**
  * **2.4. [StyleContainer](docs/api/StyleContainer.md)** <img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/res/private-badge.png" height=15>
3. Registry
  * **3.1. [Plugins](docs/Plugins.md)**
    * [Fallback Value](docs/plugins/FallbackValue.md)
    * [Mixin](docs/plugins/Mixin.md)
    * [Stateful Value](docs/plugins/StatefulValue.md)
    * [Stateful Selector](docs/plugins/StatefulSelector.md)
    * **3.1.1 [DevTools](docs/Plugins.md#developertools)**
      * [Friendly ClassName](docs/plugins/FriendlyClassName.md)
      * [Linter](docs/plugins/Linter.md)
      * [Style Logger](docs/plugins/StyleLogger.md)
  * **3.2 [Mixins](docs/Mixins.md)**
    * [Contains](docs/Mixins.md#contains)
    * [Extend](docs/Mixins.md#extend)
    * [Extract CSS](docs/Mixins.md#extract-css)
    * [Platform Queries](docs/Mixins.md#platform-queries)
    * [Stateful Conditions](docs/Mixins.md#stateful-conditions)
    * [Substr](docs/Mixins.md#substr)
  * **3.3. [Prefixer](docs/Prefixer.md)**
    * [Static Prefixer](docs/prefixer/StaticPrefixer.md)
    * [Dynamic Prefixer](docs/prefixer/DynamicPrefixer.md)
4. [Guides](docs/guides/)
  * 4.1. [Upgrading Look](docs/guides/upgradeLook.md)
  * 4.2. [Configuring Look](docs/guides/configureLook.md)
  * 4.3. [Build your own: Mixin](docs/guides/customMixin.md)
  * 4.4. [Build your own: Plugin](docs/guides/customPlugin.md)
  * 4.5. [Build your own: Prefixer](docs/guides/customPrefixer.md)
5. [FAQ](docs/FAQ.md)

# Example
The syntax is quite similar to [Sass](http://sass-lang.com) and other React styling libraries.

```sh
npm install react-look --save
```
Look ships **pseudo class** and **media query** support by default. They're resolved within the `StyleSheet.create` method.
```javascript
import React, { Component, PropTypes } from 'react'
import look, { StyleSheet } from 'react-look'

class Header extends Component {
  static defaultProps = { size: 24 };
  static propTypes = { size: PropTypes.number.isRequired };
  state = { status: 'active' };

  render() {
    return (
      // Styles are basically applied using the `className` property
      <header className={styles.header}>
        <h1 className={styles.title}>
          {this.props.title}
        </h1>
      </header>
    )
  }
}

// generates classNames for each selector
const styles = StyleSheet.create({
  header: {
    transition: '200ms all linear',
    // Use media queries or pseudo classes
    // using nested style objects. Those get transformed
    // on the fly and can be nested endlessly.
    '@media (min-height: 800px)': {
      fontSize: 13,
      ':hover': {
        fontSize: 15
      }
    },
    // You can also use mixins with the same selector.
    // They'll get split intelligently and evaluated on render
    'status=active': {
      backgroundColor: 'green',
      'size>=20': {
        backgroundColor: 'pink'
      }
    }
  },
  title: {
    fontWeight: 800,
    // use functions to inject props, state or context values
    fontSize: (props, state, context) => props.size * state.zoom
  }
})

export default look(Header)
```
Finally you only need to wrap your application with LookRoot.
```javascript
import { LookRoot, Presets } from 'react-look'
import { render } from 'react-dom'
import React, { Component } from 'react'
import Header from './Header'

const App = () => <Header title="Hello World" />

render(
  <LookRoot config={Presets['react-dom']}>
    <App />
  </LookRoot>,
  document.getElementById('app')
)
```
# Demo
Check out the provided examples for some special use cases. See them in action using the demo. You can easily run the examples on your own within the provided demo by just.

```sh
git clone --bare https://github.com/rofrischmann/react-look.git
cd react-look
npm install
# run this to actually prepare the modules
npm run build
# run this as a client-side only demo
npm run demo
# run this as a universal demo
npm run demo:universal
```

# License
**Look** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
