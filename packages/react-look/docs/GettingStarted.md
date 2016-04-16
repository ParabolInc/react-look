# Getting started

1. [Installation](#1-installation)
2. [First Component](#2-first-component)
3. [Stateless Function Components](#3-stateless-function-components)
4. [Pseudo classes](#4-pseudo-classes)
5. [Media queries](#5-media-queries)
6. [Mixins & Plugins](#6-mixins--plugins)
	* 6.1. [Configuration & LookRoot](#61-configuration--lookroot)
	* 6.2. [look wrapper](#62-look-wrapper)
	* 6.3. [Usage](#63-usage)
7. [Fallback values](#7-fallback-values)
8. [Vendor prefixes](#8-vendor-prefixes)
9. [Server-side rendering](#9-server-side-rendering)
10. [DevTools](#10-devtools)

## 1. Installation
First of all we need to install Look to our project.

```sh
npm install react-look --save
```

Now we are able to import Look into our code. We can either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

```javascript
// ECMAScript 2015
import look from 'react-look'

// CommonJS
const look = require('react-look')
```

## 2. First Component
Now its time to compose your first Component. <br>
You basically start with a blank `React` Component that renders some markup.

```javascript
import React, { Component } from 'react'

export default class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}
```

#### StyleSheet.create(styles)
Now that we got the basic Component let's start adding some styles.<br>

We use the `StyleSheet.create` helper to generate unique `className`s.<br> This let's us reuse the same CSS class multiple times.

```javascript
import { StyleSheet } from 'react-look'
import React, { Component } from 'react'

export default class FirstComponent extends Component {
	render() {
		// pass the `className` to the element
		return <div className={styles.box}>My first Component!</div>
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14, // numbers automatically get 'px' added
		padding: 8,
		border: '1px solid gray'
	}
})
```
#### Multiple styles
You can even have multiple styles assigned to a single node as well as multiple styles for multiple nodes.

```javascript
import { StyleSheet } from 'react-look'
import React, { Component } from 'react'
// We use this shortcut to write less code
const c = StyleSheet.combineStyles

export default class FirstComponent extends Component {
	render() {
		return (
			// Use the combineStyles to combine styles
			// You can pass in as many styles as you wish
			<div className={c(styles.box, styles.specialBox)}>
				<title className={styles.title}>My first Component!</title>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	},
	specialBox: {
		backgroundColor: 'red'
	},

	title: {
		fontWeight: 900,
		fontFamily: 'Lato'
	}
})
```

## 3. Stateless Function Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14.

```javascript
import { StyleSheet } from 'react-look'
import React, { Component } from 'react'

export default ({title}) => <div className={styles.box}>{title}</div>

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray'
	}
})
```

## 4. Pseudo classes
Look supports every available pseudo class. The syntax is similar to Sass and supports multiple nested pseudo classes as well.

> Check [StyleSheet API reference - Pseudo classes](api/StyleSheet.md#pseudo-classes]) for more information on how the nesting gets resolved.

```javascript
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray',
		':hover': {
			color: 'blue',
			// multiple nesting
			':active': {
				color: 'gray'
			}
		}
	}
})
```

## 5. Media Queries
You may also use media queries. They can be nested as well.
> Check [StyleSheet API reference - Media queries](api/StyleSheet.md#media-queries]) for more information on how the nesting gets resolved.

```javascript
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
	box: {
		color: 'red',
		fontSize: 14,
		padding: 8,
		border: '1px solid gray',
		'@media (min-width: 300px)': {
			color 'blue',
			// => @media (min-width: 300px) and (min-height: 400px)
 			'@media (min-height: 400px)': {
				color: 'gray'
			}
		}
	}
})
```
> **Extra tip**: You can even mix media queries and pseudo classes together.

## 6. Mixins & Plugins
For **dynamic styling** we use an advanced set of mixins and plugins. <br>
But while basic styles just work with the `StyleSheet` API by default, it **requires some configuration** to be able to use plugins, mixins or devTools.

### 6.1. Configuration & [LookRoot](api/LookRoot.md)
We will use a preset which provides every mixin & plugin available. We will refer to this as the 'global config' as it should affect every Component resolved with Look. To apply those we need to wrap our whole application into the `LookRoot` Component which uses `context` to spread the configuration to all child Components.
> Note: If you want to use a custom configuration check out the [configuration guide](../guides/configureLook.md).


```javascript
import { Presets, LookRoot } from 'react-look'
import { render } from 'react-dom'
import React from 'react'

const config = Presets['react-dom']

render(
	<LookRoot config={config}>
		<App />
	</LookRoot>,
	document.getElementById('app')
)
```

### 6.2. look wrapper
Resolving mixins and plugins requires your Component to be wrapped with the `look` wrapper.

```javascript
import look from 'react-look'
import React, { Component } from 'react'

class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}

// Now if importing 'FirstComponent'
// you will actually get the Look-enhanced one
export default look(FirstComponent)
```

#### Decorator
Alternatively you may use the decorator/annotation `@look`.
Though I do not recommend this as they neither are part of the ECMAScript 2015 specification nor part of the ECMAScript 2016 by now.

```javascript
import look from 'react-look'
import React, { Component } from 'react'

// Note that now you can export directly
@look
export default class FirstComponent extends Component {
	render() {
		return <div>My first Component!</div>
	}
}
```

### 6.3. Usage
Now as you got all the configuration and wrapping done, simply start using mixins within your `StyleSheet.create`.
> Check out [Mixins.md](../Mixins.md) and [Plugins.md](../Plugins.md) to learn about every available mixin and plugin and how to use them!

```javascript
import look, { StyleSheet } from 'react-look'
import React, { Component } from 'react'

// Note that now you can export directly
@look
export default class FirstComponent extends Component {
	constructor() {
		super(...arguments)
		this.state = { clicks: 0 }
		this.increment = this.increment.bind(this)
	}

	increment() {
		this.setState({ clicks: this.state.clicks++ })
	}

	render() {
		return (
			<div className={styles.box} onClick={this.increment}>
				I am growing on click!
			</div>
		)
	}
}

const styles = StyleSheet.create({
	box: {
		backgroundColor: 'red',
		// with every click the width increments by 1 pixel
		width: (props, state) => state.clicks,
		// if specialProp is set to true the fontSize is 30
		// <FirstComponent specialProp />
		'specialProp=true': {
			fontSize: 30
		},
		// On iOS the font is 'Helvetica Neue'
		'@platform ios': {
			fontFamily: 'Helvetica Neue'
		}
	}
})
```
## 7. Fallback values
Using the `Presets['react-dom']` we already include the [Fallback Value](../plugins/FallbackValue.md) plugin that allows multiple fallback values as an array.
```javascript
{
	box: {
		color: ['rgba(0, 0, 0, 0.5)', '#ccc']
	}
}
```
which is similar to the following CSS code:
```CSS
.box {
	color: rgba(0, 0, 0, 0.5);
	color: #ccc;
}
```
## 8. Vendor prefixes
`Presets['react-dom']` also automatically includes the [StaticPrefixer](../prefixer/StaticPrefixer.md) which uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) to add all vendor-prefixes automatically.

You could also use the [DynamicPrefixer](../prefixer/DynamicPrefixer.md) to add only prefixes that are actually required. It uses data provided by [caniuse.com](caniuse.com) and evaluates the `userAgent` for browser information.

In generally to add a prefixer you will need to use the `prefixer` key of your config object and create a new prefixer instance.
```javascript
import { DynamicPrefixer, Presets } from 'react-look'

const config = Presets['react-dom']
config.prefixer = new DynamicPrefixer({userAgent: navigator.userAgent})
```
## 9. Server-side rendering
Look also fully supports server-side rendering with minimal additional configuration.<br>
You basically prerender your static HTML string as well as your static CSS styles. This is most likely done directly within the request.<br>
e.g. [universal example](../../demo/server.js) (`npm run demo:universal`) using an [express](http://expressjs.com/) server.
##### index.html
```HTML
<html>
  <head>
    <style id="_look"><!-- {{css}} --></style>
  </head>

  <body>
    <div id="app"><!-- {{html}} --></div>
  </body>
</html>
```

##### server.js
```javascript
import { Presets, StyleSheet, LookRoot } from 'react-look'
const serverConfig = Presets['react-dom']

app.get('/', (req, res) => {
	// Takes the userAgent directly form the request
  serverConfig.userAgent = req.headers['user-agent']
  // We also want to use the same <style>-tag for dynamic styles
  serverConfig.styleElementId = '_look'

  // Renders the HTML markup into a string
  const appHTML = renderToString(
    <LookRoot config={serverConfig}>
      <App />
    </LookRoot>
  )
  // Renders the static CSS styles into a string
  // Uses the preset prefixer to add vendor-prefixes to it
  const appCSS = StyleSheet.renderToString(serverConfig.prefixer)

  // Replace html, css placeholder from your index.html
  res.write(indexHTML.replace('<!-- {{html}} -->', appHTML).replace('<-- {{css}} -->', appCSS))
  res.end()
})
```

## 10. DevTools
DevTools are **special** plugins used to boost **your** developer experience *(also now as DX)*. They come in handy if you want to *e.g.* debug your code or quality-proof it.

Look also provides some devTools which can be easily applied by just adding them to the plugins list, but you should **only use them for development**.
> Check out [Plugins.md](../Plugins.md#devtools) for an overview of all devTools.

```javascript
import { Presets, Plugins } from 'react-look'

const config = Presets['react-dom']
// a devTool that improves className readability for better debugging
config.plugins.push(Plugins.friendlyClassName)
```
