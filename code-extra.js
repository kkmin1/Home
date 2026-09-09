// Safe extension layer for the legacy data.js.
// Existing snippets remain intact; only known defects are patched here.

if (typeof codeData !== 'undefined') {
    if (codeData.cp1) {
        codeData.cp1 = codeData.cp1
            .replace('gcc -o hello.out hello.cpp', 'g++ -o hello hello.cpp')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }

    if (codeData.cp2) {
        codeData.cp2 = codeData.cp2
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');

        if (!codeData.cp2.includes('#include <limits>')) {
            codeData.cp2 = codeData.cp2.replace(
                '#include <iostream>',
                '#include <iostream>\n#include <limits>'
            );
        }
    }

    Object.assign(codeData, {
        ref_c_types: `#include <stdio.h>

int main(void) {
    int age = 20;
    long population = 50000000L;
    float rate = 3.14f;
    double pi = 3.141592653589793;
    char grade = 'A';

    printf("%d %ld %.2f %.6f %c\\n",
           age, population, rate, pi, grade);
    return 0;
}`,

        ref_c_condition: `#include <stdio.h>

int main(void) {
    int score = 83;

    if (score >= 90) {
        puts("A");
    } else if (score >= 80) {
        puts("B");
    } else {
        puts("C 이하");
    }

    return 0;
}`,

        ref_c_loop: `#include <stdio.h>

int main(void) {
    for (int i = 0; i < 5; i++) {
        printf("%d ", i);
    }

    int n = 3;
    while (n > 0) {
        printf("\\n%d", n--);
    }

    return 0;
}`,

        ref_c_array: `#include <stdio.h>

int main(void) {
    int scores[] = {90, 85, 100, 72};
    size_t count = sizeof scores / sizeof scores[0];

    for (size_t i = 0; i < count; i++) {
        printf("%d\\n", scores[i]);
    }

    return 0;
}`,

        ref_c_function: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    printf("%d\\n", add(3, 4));
    return 0;
}`,

        ref_c_pointer: `#include <stdio.h>

void increment(int *value) {
    (*value)++;
}

int main(void) {
    int n = 10;
    int *p = &n;

    printf("value=%d address=%p\\n", *p, (void *)p);
    increment(&n);
    printf("after=%d\\n", n);
    return 0;
}`,

        ref_c_file: `#include <stdio.h>

int main(void) {
    FILE *fp = fopen("sample.txt", "w");
    if (fp == NULL) {
        perror("fopen");
        return 1;
    }

    fprintf(fp, "hello C\\n");
    fclose(fp);
    return 0;
}`,

        ref_c_build: `# Linux / macOS
gcc -std=c17 -Wall -Wextra -O2 main.c -o main
./main

# Windows (MinGW)
gcc -std=c17 -Wall -Wextra -O2 main.c -o main.exe
main.exe`,

        ref_cpp_types: `#include <iostream>
#include <string>

int main() {
    int age = 20;
    double pi = 3.141592;
    bool active = true;
    std::string name = "홍길동";

    std::cout << name << " " << age << " "
              << pi << " " << std::boolalpha << active << "\\n";
}`,

        ref_cpp_condition: `#include <iostream>

int main() {
    int score = 83;

    if (score >= 90)
        std::cout << "A\\n";
    else if (score >= 80)
        std::cout << "B\\n";
    else
        std::cout << "C 이하\\n";
}`,

        ref_cpp_loop: `#include <iostream>

int main() {
    for (int i = 0; i < 5; ++i)
        std::cout << i << ' ';

    int n = 3;
    while (n > 0)
        std::cout << "\\n" << n--;
}`,

        ref_cpp_vector: `#include <iostream>
#include <map>
#include <string>
#include <vector>

int main() {
    std::vector<int> nums{10, 20, 30};
    nums.push_back(40);

    std::map<std::string, int> score{
        {"kim", 90},
        {"lee", 85}
    };

    for (int n : nums) std::cout << n << ' ';
    std::cout << "\\nkim=" << score["kim"] << "\\n";
}`,

        ref_cpp_function: `#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    auto result = add(3, 4);
    std::cout << result << "\\n";
}`,

        ref_cpp_class: `#include <iostream>
#include <string>
#include <utility>

class Person {
public:
    Person(std::string name, int age)
        : name_(std::move(name)), age_(age) {}

    void print() const {
        std::cout << name_ << " " << age_ << "\\n";
    }

private:
    std::string name_;
    int age_;
};

int main() {
    Person p("Kim", 30);
    p.print();
}`,

        ref_cpp_file: `#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ofstream out("sample.txt");
    out << "hello C++\\n";
    out.close();

    std::ifstream in("sample.txt");
    std::string line;
    while (std::getline(in, line))
        std::cout << line << "\\n";
}`,

        ref_cpp_build: `# Linux / macOS
g++ -std=c++20 -Wall -Wextra -O2 main.cpp -o main
./main

# Windows (MinGW)
g++ -std=c++20 -Wall -Wextra -O2 main.cpp -o main.exe
main.exe`,

        ref_py_types: `name = "홍길동"
age = 20
rate = 3.14
active = True
nothing = None

print(type(name), type(age), type(rate), type(active), type(nothing))`,

        ref_py_condition: `score = 83

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C 이하"

print(grade)`,

        ref_py_loop: `for i in range(5):
    print(i)

names = ["kim", "lee", "park"]
for index, name in enumerate(names, start=1):
    print(index, name)`,

        ref_py_collection: `nums = [10, 20, 30]
unique = {10, 20, 20, 30}
person = {"name": "Kim", "age": 30}

nums.append(40)
person["city"] = "Seoul"

print(nums)
print(unique)
print(person.get("name"))`,

        ref_py_function: `def add(a: int, b: int = 0) -> int:
    return a + b

print(add(3, 4))
print(add(5))`,

        ref_py_class: `class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def introduce(self) -> str:
        return f"{self.name}, {self.age}세"

person = Person("Kim", 30)
print(person.introduce())`,

        ref_py_file: `from pathlib import Path

path = Path("sample.txt")
path.write_text("hello Python\\n", encoding="utf-8")

text = path.read_text(encoding="utf-8")
print(text)`,

        ref_py_json: `import json

data = {"name": "Kim", "age": 30}

text = json.dumps(data, ensure_ascii=False, indent=2)
print(text)

restored = json.loads(text)
print(restored["name"])`,

        ref_py_http: `# pip install requests
import requests

response = requests.get(
    "https://api.github.com",
    timeout=10,
)
response.raise_for_status()

print(response.status_code)
print(response.json())`,

        ref_py_exception: `try:
    value = int("abc")
except ValueError as exc:
    print("숫자로 변환할 수 없습니다:", exc)
else:
    print(value)
finally:
    print("완료")`,

        ref_py_cli: `# python app.py input.txt --verbose
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("file")
parser.add_argument("--verbose", action="store_true")
args = parser.parse_args()

print(args.file, args.verbose)`,

        ref_py_module: `# project/
# ├─ app.py
# └─ utils.py

# utils.py
def add(a, b):
    return a + b

# app.py
from utils import add

print(add(3, 4))`,

        ref_js_types: `const name = "홍길동";
let age = 20;
const rate = 3.14;
const active = true;
const nothing = null;
let unknown;

console.log(typeof name, typeof age, typeof rate, typeof active);
console.log(nothing, unknown);`,

        ref_js_condition: `const score = 83;

let grade;
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C 이하";
}

console.log(grade);`,

        ref_js_loop: `const names = ["kim", "lee", "park"];

for (let i = 0; i < names.length; i++) {
    console.log(i, names[i]);
}

for (const [index, name] of names.entries()) {
    console.log(index, name);
}`,

        ref_js_array: `const nums = [10, 20, 30];
nums.push(40);

const doubled = nums.map(n => n * 2);
const filtered = nums.filter(n => n >= 20);

const person = { name: "Kim", age: 30 };
person.city = "Seoul";

console.log(doubled, filtered, person);`,

        ref_js_function: `function add(a, b = 0) {
    return a + b;
}

const multiply = (a, b) => a * b;

console.log(add(3, 4));
console.log(multiply(3, 4));`,

        ref_js_class: `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return \`${'${this.name}'}, ${'${this.age}'}세\`;
    }
}

const person = new Person("Kim", 30);
console.log(person.introduce());`,

        ref_js_json: `const data = { name: "Kim", age: 30 };

const text = JSON.stringify(data, null, 2);
console.log(text);

const restored = JSON.parse(text);
console.log(restored.name);`,

        ref_js_fetch: `async function loadData() {
    const response = await fetch("https://api.github.com");
    if (!response.ok) {
        throw new Error(\`HTTP ${'${response.status}'}\`);
    }

    const data = await response.json();
    console.log(data);
}

loadData().catch(console.error);`,

        ref_js_async: `const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.log("start");
    await delay(500);
    console.log("done");
}

main();`,

        ref_js_dom: `const button = document.querySelector("#run");
const output = document.querySelector("#output");

button.addEventListener("click", () => {
    output.textContent = "실행되었습니다.";
});`,

        ref_js_module: `// math.js
export function add(a, b) {
    return a + b;
}

// app.js
import { add } from "./math.js";

console.log(add(3, 4));`,

        ref_ts_types: `const name: string = "Kim";
let age: number = 30;
const active: boolean = true;
const scores: number[] = [90, 85, 100];

type ID = string | number;
const userId: ID = 1001;`,

        ref_ts_interface: `interface User {
    id: number;
    name: string;
    email?: string;
}

const user: User = {
    id: 1,
    name: "Kim",
};`,

        ref_ts_function: `function add(a: number, b: number = 0): number {
    return a + b;
}

const greet = (name: string): string => \`Hello, ${'${name}'}\`;

console.log(add(3, 4));
console.log(greet("Kim"));`,

        ref_ts_class: `class Person {
    constructor(
        public name: string,
        private age: number,
    ) {}

    introduce(): string {
        return \`${'${this.name}'}, ${'${this.age}'}세\`;
    }
}

const person = new Person("Kim", 30);
console.log(person.introduce());`,

        ref_ts_async: `interface ApiResult {
    current_user_url: string;
}

async function loadData(): Promise<ApiResult> {
    const response = await fetch("https://api.github.com");
    if (!response.ok) throw new Error(\`HTTP ${'${response.status}'}\`);
    return response.json() as Promise<ApiResult>;
}

loadData().then(console.log).catch(console.error);`
    });
}
