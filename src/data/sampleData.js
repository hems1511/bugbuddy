// ============================================================
//  BugBuddy AI – Sample Analysis Data
//  These are clearly-labelled mock results for Phase 1 (Frontend MVP).
//  No real AI backend is connected yet.
// ============================================================

export const LANGUAGES = [
  { id: 'python',     label: 'Python',     emoji: '🐍' },
  { id: 'javascript', label: 'JavaScript', emoji: '🟨' },
  { id: 'c',          label: 'C',          emoji: '🔵' },
  { id: 'cpp',        label: 'C++',        emoji: '⚙️' },
  { id: 'java',       label: 'Java',       emoji: '☕' },
];

// ----------------------------------------------------------------
// Sample code snippets shown when user clicks "Load Example"
// ----------------------------------------------------------------
export const SAMPLE_EXAMPLES = {
  python: {
    code: `# Python – IndexError example
fruits = ["apple", "banana", "cherry"]

for i in range(4):          # <-- range should be 3
    print(fruits[i])        # Crashes when i == 3
`,
    error: `Traceback (most recent call last):
  File "main.py", line 4, in <module>
    print(fruits[i])
IndexError: list index out of range`,
  },

  javascript: {
    code: `// JavaScript – TypeError example
function greet(user) {
    console.log("Hello, " + user.name.toUpperCase());
}

greet(null);   // <-- passing null instead of an object
`,
    error: `TypeError: Cannot read properties of null (reading 'name')
    at greet (app.js:3:36)
    at Object.<anonymous> (app.js:6:1)`,
  },

  c: {
    code: `// C – Segmentation Fault example
#include <stdio.h>

int main() {
    int *ptr = NULL;
    *ptr = 42;   /* Writing to NULL pointer */
    printf("%d\\n", *ptr);
    return 0;
}
`,
    error: `Segmentation fault (core dumped)
Program received signal SIGSEGV, Segmentation fault.
0x00005555555545f9 in main () at main.c:6`,
  },

  cpp: {
    code: `// C++ – Compilation Error (missing semicolon)
#include <iostream>
using namespace std;

int main() {
    int x = 10
    cout << "Value: " << x << endl;
    return 0;
}
`,
    error: `main.cpp:6:5: error: expected ';' after expression
    cout << "Value: " << x << endl;
    ^
1 error generated.`,
  },

  java: {
    code: `// Java – NullPointerException example
public class Main {
    public static void main(String[] args) {
        String message = null;
        System.out.println(message.length());  // NPE here
    }
}
`,
    error: `Exception in thread "main" java.lang.NullPointerException: 
  Cannot invoke "String.length()" because "message" is null
    at Main.main(Main.java:5)`,
  },
};

// ----------------------------------------------------------------
// Sample analysis results per language
// ----------------------------------------------------------------
export const SAMPLE_RESULTS = {
  python: {
    errorType: 'index',
    errorTypeName: 'IndexError',
    confidence: 97,
    explanation:
      'Your program is trying to access a position in the list that does not exist. Think of a list like a row of seats — if there are only 3 seats (positions 0, 1, 2) and you ask for seat number 3, there\'s nothing there!',
    rootCause:
      'The `range(4)` generates numbers 0, 1, 2, 3. But the list `fruits` only has 3 elements (indices 0, 1, 2). When the loop reaches `i = 3`, Python tries `fruits[3]` which is out of bounds.',
    correctedCode: `# Python – Fixed IndexError
fruits = ["apple", "banana", "cherry"]

# Use len(fruits) so the range always matches the list size
for i in range(len(fruits)):   # range(3) → 0, 1, 2
    print(fruits[i])

# Even cleaner — iterate directly:
# for fruit in fruits:
#     print(fruit)
`,
    tips: [
      'Use `range(len(your_list))` instead of a hard-coded number so the range always matches the list.',
      'Better yet, iterate directly: `for item in my_list:` — no index needed.',
      'Before accessing `my_list[i]`, check `if i < len(my_list)` to be safe.',
      'Python\'s `enumerate()` is handy when you need both index and value.',
    ],
  },

  javascript: {
    errorType: 'type',
    errorTypeName: 'TypeError',
    confidence: 95,
    explanation:
      'JavaScript is trying to read a property (`name`) on something that is `null`. Null means "nothing is here" — you can\'t read properties from nothing, just like you can\'t open a box that doesn\'t exist.',
    rootCause:
      'The function `greet` expects a `user` object with a `.name` property, but `null` was passed instead. JavaScript cannot access `.name` on `null`.',
    correctedCode: `// JavaScript – Fixed TypeError
function greet(user) {
    // Guard: check that user and user.name actually exist
    if (!user || !user.name) {
        console.log("Hello, Guest!");
        return;
    }
    console.log("Hello, " + user.name.toUpperCase());
}

greet(null);            // Now prints: Hello, Guest!
greet({ name: "Ada" }); // Prints: Hello, ADA
`,
    tips: [
      'Always validate function arguments before using them — check for `null` and `undefined`.',
      'Use optional chaining (`user?.name`) to safely access nested properties without crashing.',
      'Use default parameters: `function greet(user = {})` to avoid null inputs.',
      'TypeScript can catch these issues at compile time — worth learning!',
    ],
  },

  c: {
    errorType: 'runtime',
    errorTypeName: 'Segmentation Fault',
    confidence: 99,
    explanation:
      'A segmentation fault means your program tried to access memory it is not allowed to touch. It\'s like trying to open a door with the wrong key — the operating system shuts your program down to protect itself.',
    rootCause:
      'The pointer `ptr` was set to `NULL` (no memory address). Writing `*ptr = 42` attempts to store a value at address 0, which is forbidden. The OS sends a SIGSEGV signal, crashing the program.',
    correctedCode: `// C – Fixed Segmentation Fault
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate real memory before using the pointer
    int *ptr = (int *)malloc(sizeof(int));

    if (ptr == NULL) {           // Always check if malloc succeeded
        printf("Memory allocation failed!\\n");
        return 1;
    }

    *ptr = 42;                   // Safe: ptr now points to valid memory
    printf("%d\\n", *ptr);       // Prints: 42

    free(ptr);                   // Always free allocated memory
    ptr = NULL;                  // Good practice: nullify after free
    return 0;
}
`,
    tips: [
      'Always initialize pointers — use `NULL` or a valid address, never leave them uninitialized.',
      'Check the return value of `malloc()` — it returns NULL if allocation fails.',
      'Always call `free()` when you\'re done with dynamically allocated memory to avoid leaks.',
      'Tools like Valgrind can detect memory issues before they cause crashes.',
    ],
  },

  cpp: {
    errorType: 'syntax',
    errorTypeName: 'Syntax Error',
    confidence: 100,
    explanation:
      'A syntax error means your code has a typo or grammatical mistake that C++ cannot understand. It\'s similar to writing a sentence without a period — the compiler needs every statement to end with a semicolon (`;`).',
    rootCause:
      'Line 6 is missing a semicolon at the end of `int x = 10`. The C++ compiler expects each statement to be terminated with `;` and reports an error when it finds the next line instead.',
    correctedCode: `// C++ – Fixed Syntax Error
#include <iostream>
using namespace std;

int main() {
    int x = 10;          // ← Added the missing semicolon
    cout << "Value: " << x << endl;
    return 0;
}
`,
    tips: [
      'Every statement in C/C++ must end with a semicolon (`;`) — this is the #1 beginner mistake.',
      'Most IDEs (VS Code, CLion) highlight syntax errors in real time — use them!',
      'Read the compiler error carefully: it tells you the exact file and line number.',
      'When you see "expected \';\' after expression", look at the line just before the reported line.',
    ],
  },

  java: {
    errorType: 'runtime',
    errorTypeName: 'NullPointerException',
    confidence: 96,
    explanation:
      'A NullPointerException (NPE) is one of the most common Java errors. It happens when you try to call a method or access a field on an object that hasn\'t been created yet — it\'s `null`, meaning "nothing".',
    rootCause:
      '`String message = null;` creates a variable that points to nothing. Calling `message.length()` on it is like asking the length of something that doesn\'t exist — Java throws a NullPointerException.',
    correctedCode: `// Java – Fixed NullPointerException
public class Main {
    public static void main(String[] args) {
        String message = null;

        // Option 1: Check for null before using the variable
        if (message != null) {
            System.out.println(message.length());
        } else {
            System.out.println("Message is empty (null).");
        }

        // Option 2: Give it a default value
        String safeMessage = (message != null) ? message : "";
        System.out.println("Length: " + safeMessage.length()); // 0
    }
}
`,
    tips: [
      'Always check if an object is `null` before calling methods on it.',
      'Use Java\'s `Optional<T>` class to represent values that might be absent safely.',
      'Initialize strings to `""` (empty string) instead of `null` when you can.',
      'Java 14+ provides helpful NullPointerException messages that tell you exactly which variable is null.',
    ],
  },
};

// ----------------------------------------------------------------
// App-level stats (mock numbers for the dashboard)
// target = final number to count up to
// suffix = string appended after the number (e.g. '%' or ',480')
// ----------------------------------------------------------------
export const DASHBOARD_STATS = [
  { label: 'Errors Analyzed',    target: 12480, suffix: '',   decimals: 0, icon: 'zap',          color: 'purple'  },
  { label: 'Bugs Fixed Today',   target: 347,   suffix: '',   decimals: 0, icon: 'bug',          color: 'blue'    },
  { label: 'Languages Supported',target: 5,     suffix: '',   decimals: 0, icon: 'code-2',       color: 'cyan'    },
  { label: 'Accuracy Rate',      target: 98.2,  suffix: '%',  decimals: 1, icon: 'shield-check', color: 'emerald' },
];
