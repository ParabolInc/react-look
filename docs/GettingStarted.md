# Getting started

The following usage guide should provide enough information to build apps with Look.

1. [Installation](#1-installation)
2. [First Component](#2-first-component)
3. [Stateless Components](#3-stateless-components)
4. [Pseudo classes](#4-pseudo-classes)
5. [Media queries](#5-media-queries)
6. [Mixins & Plugins](#6-mixins--plugins)
	* 6.1. [Configuration](#2-configuration)
	* 6.2. [look wrapper](#-6-2-look-wrapper)
	* 6.3. [Usage](#-6-3-usage)
7. [Fallback values](#7-fallback-values)
8. [Vendor prefixes](#8-vendor-prefixes)
9. [Server-side rendering](#9-server-side-rendering)
10. [DevTools](#10-dev-tools)
11. [Debugging](#11-debugging)

## 1. Installation
First of all we need to install `react-look` to our project.
```sh
npm install react-look
```

Now we are able to import Look into our code. We can either use the new ECMAScript 2015 `import` syntax or the CommonJS `require` syntax. *(The examples will use the `import`-syntax)*

```javascript
// ECMAScript 2015
import look from 'react-look'

// CommonJS
const look = require('react-look')
```

## 3. First Component
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
Now that we got the basic Component let's start adding some styles.<br> We use the `StyleSheet.create` helper to generate unique `className`s. This let's us reuse the same CSS class multiple times. <br>
Another benefit is the use of content hash classNames as two identical style objects get resolved to the same className and therefore only rendered ones.


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

## 3. Stateless Components
With Look you can easily style even **[Stateless Components](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components)** which have been introduced with React 0.14.
> Note: This will destroy the performance benefit as Look transforms those to Stateful Components again, but it is less code to type.

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
			color 'blue',
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
But while pseudo classes and media queries just work with the `StyleSheet` API by default, it **requires some configuration** to be able to use plugins, mixins or devTools.

### 6.1. Configuration
We will use a preset which provides every mixin & plugin available. We will refer to this as the 'global config' as it should affect every Component resolved with Look. Therefore we basically just pass them as a prop of the **root-Component** that gets directly rendered into a DOM-node.
> Note: If you want to use a custom configration check out the [configuration guide](guides/configureLook.md).


```javascript
import { Presets } from 'react-look'
import { render } from 'react-dom'
import React from 'react'

const config = Presets['react-dom']

// For react-native use the react-native preset
const config = Presets['react-native']


// Using the lookConfig prop will cause the configuration
// to be passed down to every Component using context
render(<App lookConfig={config} />, document.getElementById('app'))
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
> Check out [Mixins.md](Mixins.md) and [Plugins.md](Plugins.md) to learn about every available mixin and plugin and how to use them!

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
		this.setState({ clicks:+this.state.clicks++ })
	}

	render() {
		return <div className={styles.box} onClick={this.increment}>I am growing if you click me</div>
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
Using the `Presets['react-dom']` we already include the [Fallback Value](plugins/FallbackValue.md) plugin that allows multiple fallback values as an array.
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
`Presets['react-dom']` also automatically includes the [Prefixer](plugins/Prefixer.md) plugin which uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to add only prefixes that are actually required. It uses data provided by [caniuse.com](caniuse.com) and evaluates the `userAgent` for browser information.

## 9. Server-side rendering
Look also fully supports server-side rendering with minimal additional configuration.<br>
You basically just need to pass the users `userAgent` with the `lookConfig` to be able to prefix correctly. This is most likely done directly within the request. <br>
e.g. [universal example](../demo/server.js) (`npm run demo:universal`) using an [express](http://expressjs.com/) server:
```javascript
const serverConfig = Presets['react-dom']

app.get('/', (req, res) => {
	// Takes the userAgent directly form the request
  serverConfig.userAgent = req.headers['user-agent']

  const content = renderToString(
    <App lookConfig={serverConfig} />
  )

  res.write(indexHTML.replace('<!-- {{app}} -->', content))
  res.end()
})
```

## 10. DevTools
Your **development experience** will be boosted with the special developer tools we provide.<br>