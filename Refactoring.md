# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Refactor explanation 1: What I found.

First I tryied to understand what was the biggest problem for me when reading the code defined in the file `dpk.js`. This is what give me an idea of what is the main or most important thing I must work on but not the first. This is because sometimes if you focus only in the bigger problem you may loose the opportunity to improve other little things that makes code simpler and better. So, the bigger and most annoying problem I found was the `if/else` blocks.
Once I save those blocks for later I realized that there were other things that were short to deal with but can improve readability:

- No simple validation of event value to fast return when an invalid value is received.
- Constants defined within the function body that may be defined outside to be reused
- let variable (this is not necessarily a problem to solve, but in my experience reasignment can be tricky to mantain)

Also to understand how the function works I test it with some inputs that I save for future tests definition.

### Refactor explanation 2: One problem at a time

Once I identified all the things available to be improved in terms of readability and mantainability of base code I started to refactor the function. But obviously not all at once but one problem at a time.

- Move constants definition: The first win. I move constants definition outside function block and run tests. Everything went well.
- Simple validation: First I added an empty object as default value for **event** parameter and a validation to return 0 if received event is not of `Object` type. I continued with the refactor but when all the new tests were added I realized that my validation was considering some truthy values as falsy so returned value was 0. Which is wrong. So then I decided not to set a default value but to validate if **event** was falsy. In that case I return 0 otherwise the excution will continue.
- let variable: Well this was directly related to the `if/else` problem so lets move to directly to the explanation

### Refactor explanation 3: Bye bye if/else blocks

In order to understand if that `let candidate;` was a good pattern I needed to understand what was happening inside those `if/else` blocks.
First thing that I noticed was that a type check was beeing made and a I thought that a **helper function** was going to be a good tool, so I created it. Now I can use my function to validate string type values I knew that those type checks could be simplified.

I also noticed that in case **event** was an object, what the function does is to use the key **partitionKey** otherwise it coerces the **event** value to a string and use the crypto functions to create the hash with it.
This was important to know because I realized that I could use destructuring feature to access the value of **event** in case it was an object. But that's not all because I combined it with a default value in case **event** was not an object or **partitionKey** was not an object's key.

Now that I'm sure that **partitionKey** is defined, I can shortcircuit the **candidate** variable (now a `const`) to be **partitionKey** or the strigified value of **event**.
Now in case that **partitionKey** was not a string but other truthy value I created the auxiliary variable **stringifiedCandidate** using a ternary expression to evaluate that and in the false clause I convert **candidate** to a string.

For readability improvements I created another auxiliary variable named **hashFromCandidate** where I assign the execution of the crypto methods using **stringifiedCandidate**

Finally I returned **hashFromCandidate**.

I found that that the constant **MAX_PARTITION_KEY_LENGTH** was used only when candidate was assigned the strigified value of event when event didn't have partitionKey. In my mplementation I believe this is not necessary.
