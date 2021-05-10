# API

## show()

<!-- translate -->
<br >

You can open the modal through the `show()` method.

### Example

```javascript
// with prop foo
this.$FModal.show({ component: Component }, { foo: 'bar' })

// centered modal
this.$FModal.show(
  { 
    component: Example, 
    maxHeight: '100%', 
    placement: 'center center' 
  }
)
```

### Syntax
```js
this.$FModal.show(modalOptions)
this.$FModal.show(modalOptions, componentPropsOrAttrs)
```
### Parameters
#### modalOptions

##### component

<!-- <p class="description">Vue Component.</p> -->

-  Type: `Object`
-  Required

##### width

-  Type: `String` | `Number`
-  Default: 800
-  Example
   ```js
   this.$FModal.show({ component: Component, width: '100%' })
   this.$FModal.show({ component: Component, width: 200 })
   this.$FModal.show({ component: Component, width: 'calc(100vw - 100px)' })
   ```

##### height


-  Type: `String` | `Number`

##### maxHeight

-  Type: `String` | `Number`
-  Default: "80%"

##### backgroundColor

-  Type: `String`
-  Default: "#fff"

##### escToClose

-  Type: `Boolean`
-  Default: true

##### clickToClose

-  Type: `Boolean`
-  Default: true

##### placement

<p class="description">Define the poistion as <code>horizontal vertical</code></p>

-  Type: `String`
-  Default: "center center"
    -  horizontal : `left`, `center`, `right`
    -  vertical : `top`, `center`, `bottom`

##### modalStyles

-  Type: `String` | `Object` | `Array<Object>`
-  Example
   ```js
   // String
   this.$FModal.show(
     {
       component: Component,
       modalStyles: "background-color: red"
     }
   )
   // Object
   this.$FModal.show(
     {
       component: Component,
       modalStyles: { backgroundColor: 'red' }
     }
   )
   // Array<Object>
   this.$FModal.show(
     {
       component: Component,
       modalStyles: [{ backgroundColor: 'red', fontSize: '1.5rem'}]
     }
   )
   ```

##### overlayStyles

-  Type: `String` | `Object` | `Array<Object>`
##### contentStyles

-  Type: `String` | `Object` | `Array<Object>`

#### componentPropsOrAttrs (optional)
<br >

-  Type: `Object`
-  Example
   ```js
   this.$FModal.show(
     {
       component: ComponentWithProps
     },
     // componentPropsOrAttrs
     {
       foo: 'bar', bar: 'baz'
     }
   )
   ```

## hide()

<br >

You can close the most recently opened modal via the `hide()` method.

### Syntax
```js
this.$FModal.hide()
```

<style>
li, p.description {
  font-size: small;
}

h5 + ul li:first-child {
  margin-top: 3px;
}

h5 + p.description {
  margin-top: 3px;
}
</style>
