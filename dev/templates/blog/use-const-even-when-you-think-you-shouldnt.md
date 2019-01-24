[Back to blog posts](../blog.html)

If you're just starting out in Javascript (JS), you might be learning from some of the many great trainings that explain how JS has been done for many years. There are tons of great trainings to check out and I'll recommend some in a moment. When you go through these trainings, you probably see everywhere the use of `var` for creating variables. With the advent of ES6 (or ECMAScript 2015, the latest version of Javascript) there are a couple more fun variable types that we can use: `const` and let.

There are a lot of great tutorials that explain how to use the different types of variables and go into in-depth description of what they do and how they're different from `var`, but I want to focus specifically on `const` and one of the concepts that took me a while to understand.

On the surface, `const` would seem to stand for "constant", which it kind of is. Here's what [MDN has to say about const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const):

> Constants are block-scoped, much like variables defined using the let statement. The value of a constant cannot change through reassignment, and it can't be redeclared.

So it seems pretty clear: "the value of a constant cannot change through reassignment, and it can't be redeclared." So what does that mean?

### Const can't be reassigned

Assigning a variable is when we tell a function what value a variable is going to have. Essentially it's the function saying "here's what this variable holds." It's usually shown like this:

```JavaScript
const variable1 = 5;
```

If this was a `var` instead of a const, we can tell the function to assign different values at different times.

```JavaScript
var variable1 = 5;

console.log(variable1); //output is: "5"

variable1 = 10;

console.log(variable1); //output is: "10"
```

This is possible because `var` is able to be redefined. `Const`, however, isn't. So trying the same function with `const` will just give you an error:

```JavaScript
const variable1 = 5;

console.log(variable1); //output is: "5"

variable1 = 10;

console.log(variable1); //output is: "TypeError: invalid assignment to const `variable1'"
```

### Const can't be redeclared

Declaring a variable is when a function says "here's the name of a variable." Redeclaring is when the function later says another variable has that same name. Here's an example:

```JavaScript
function example() {
  var variable1 = 5;

  console.log(variable1); //output is: "5"

  var variable1 = 10;

  console.log(variable1); //output is: "10"
}
```

So in this little function, the same variable is created twice with two different values. This is possible because `var` is able to redeclared. If you tried it with `const`, however, you would get an error because the variable has already been declared once.

```Javascript
function example() {
  const variable1 = 5;

  console.log(variable1); //output is: "5"

  const variable1 = 10;

  console.log(variable1); //output is: "SyntaxError: redeclaration of const variable1"
}
```

It's not specified, but it's implied that you also can't change what type of content is being held by the `const`. This is pretty obvious because if you can't change the content of what's in it, why would you be able to change the type of content that's in it either.

Ok, so now you're thinking: _"cool, `const` is for "constant", or unchanging values, no problem. I'll only use them when I have a value that isn't changing."_ And you'll be right, sort of.

### Const values can change in certain circumstances

**Wait, what? How is that possible?**

It's true. It took me a while to understand this, but it makes sense and it's why I use `const` almost all the time for variable declarations.

### When const holds an object or array, the value can change

A quick review: there are different types of content that can be stored in a variable. These are things like number values, strings of text, boolean (true/false) values, arrays, and objects. The first three of those, **numbers**, **strings**, and **booleans**, cannot be changed if they are declared in a `const` variable. So in those instances, the `const` truly means it's a constant.

If `const` is declared as an **array** or an **object**, however, it can change, but not completely. _Wait, what? I thought `const` couldn't change!_ So if you declare a `const` variable as an array, it is constant, as an array. It can't change to be something other than an array, it's stuck as an array. However, you **can** change the values contained **inside** the array! 🤯 The same goes for if the `const` is holding an object.

So why is this possible? I don't know. It's the way they made it.

Why is it good? It means that when you create a `const` variable, you always know what type of content will be in it. You don't have to worry that at some other point in the function you might forget that you used that variable name and give it a new value or new type of content, once you create it, it stays the same. This comes in handy when you're containing a lot of information inside of an object and need to add things like functions through dot notation.

```JavaScript
const obj1 = {
  name: "Rob",
  lastName: "Lahoda"
}
obj1.greeting = function() {
  console.log("hello " + this.name + " " + this.lastName)
}
```

Maybe you have an array that you need to iterate over and process the data, then you're going to save it into another variable. You'd think that since the second variable is going to "change" since the content adds with every iteration, but you can still use `const` for that.

```JavaScript
const array1 = [1,2,3,4,5,6];
const array2 = array1.map((num) => {
  return num * 2;
});
console.log(array2);// output is: [2,4,6,8,10,12]
```

This means you can use `const` for probably the majority of variables that you're going to create when you're writing your functions.

[Back to blog posts](../blog.html)
