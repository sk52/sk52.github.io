---
title: Using console.time and console.timeEnd in JavaScript
date: '2021-11-17T07:37:00.000Z'
---

When writing code we often try to optimise our implementations to reduce the time complexity. 
Optimising code results a better experience for end users, as they have to wait less time for a response. 
In this post we'll be looking at how you can use `console.time()` and `console.timeEnd()` in JavaScript to time a block of code. 

## How to use console.time()

You might be familiar with using `console.log()` in JavaScript to log some data. The console object also has some other methods available. 
Namely, the `time()` and `timeEnd()` methods. 

To use these, simply place them before and after a block of code that you wish to time, with the same argument passed to each method call:

```
const pets = [
  {type: 'dog', name: 'Dave'}, 
  {type: 'cat', name: 'Freddie'}, 
  {type: 'dog', name: 'Monty'}
];

console.time('filterDogs');

// code block to time
const dogs = pets.filter(pet => 
  pet.type === 'dog'
);

console.timeEnd('filterDogs');
```

The logged output will look something like this: 

```
filterDogs: 0.052001953125 ms
```

## Summary

It is as simple as that. Just be sure to pass the same argument into both the `console.time()` and `console.timeEnd()` methods.
You can also use several timers in a single piece of code, either sequentially or nested. 
This can be a useful tool when assessing the performance of your code. 
