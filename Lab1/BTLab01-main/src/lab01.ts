// 1. Class Person
class Person {
  constructor(public name: string, public age: number) {}
  displayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}
let p1 = new Person("An", 20);
p1.displayInfo();

// 2. Student extends Person
class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }
  displayAll() {
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}
let s1 = new Student("Bình", 21, "A");
s1.displayAll();

// 3. Car
class Car {
  constructor(
    public brand: string,
    public model: string,
    public year: number
  ) {}
  showInfo() {
    console.log(`${this.brand} ${this.model} (${this.year})`);
  }
}
new Car("Toyota", "Camry", 2021).showInfo();

// 4. Rectangle
class Rectangle {
  constructor(public width: number, public height: number) {}
  area() {
    return this.width * this.height;
  }
  perimeter() {
    return 2 * (this.width + this.height);
  }
}
let rect = new Rectangle(4, 5);
console.log("Area:", rect.area(), "Perimeter:", rect.perimeter());

// 5. BankAccount
class BankAccount {
  constructor(public balance: number = 0) {}
  deposit(amount: number) {
    this.balance += amount;
  }
  withdraw(amount: number) {
    if (this.balance >= amount) this.balance -= amount;
  }
}
let acc = new BankAccount(1000);
acc.deposit(500);
acc.withdraw(200);
console.log("Balance:", acc.balance);

// 6. Book
class Book {
  constructor(
    public title: string,
    public author: string,
    public year: number
  ) {}
}

// 7. User private + getter/setter
class User {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
}
let u = new User("Lan");
console.log(u.name);
u.name = "Hà";

// 8. Product + filter
class Product {
  constructor(public name: string, public price: number) {}
}
let products: Product[] = [new Product("Book", 50), new Product("Phone", 200)];
let expensive = products.filter((p) => p.price > 100);
console.log(expensive);

// 9. Interface Animal
interface IAnimal {
  name: string;
  sound(): void;
}
class Dog1 implements IAnimal {
  name = "Dog";
  sound() {
    console.log("Woof!");
  }
}

// 10. Account with fields
class Account {
  public username: string;
  private password: string;
  readonly id: number;
  constructor(u: string, p: string, id: number) {
    this.username = u;
    this.password = p;
    this.id = id;
  }
}

// 11. Animal → Dog, Cat
class Animal {
  constructor(public name: string) {}
}
class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}
class Cat extends Animal {
  meow() {
    console.log("Meow!");
  }
}

// 12. Interfaces Flyable + Swimmable
interface Flyable {
  fly(): void;
}
interface Swimmable {
  swim(): void;
}
class Bird implements Flyable {
  fly() {
    console.log("Bird flying");
  }
}
class Fish implements Swimmable {
  swim() {
    console.log("Fish swimming");
  }
}

// 13. Abstract Shape
abstract class Shape {
  abstract area(): number;
}
class Square extends Shape {
  constructor(public side: number) {
    super();
  }
  area() {
    return this.side * this.side;
  }
}
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

// 14. Employee
class Employee {
  constructor(public name: string) {}
}
class Manager extends Employee {
  manage() {
    console.log(`${this.name} is managing.`);
  }
}
class Developer extends Employee {
  code() {
    console.log(`${this.name} is coding.`);
  }
}

// 15. Library
class Library {
  books: Book[] = [];
  users: User[] = [];
  addBook(b: Book) {
    this.books.push(b);
  }
}

// 16. Generic Box
class Box<T> {
  constructor(public value: T) {}
}
let box1 = new Box<number>(123);

// 17. Singleton Logger
class Logger {
  private static instance: Logger;
  private constructor() {}
  static getInstance() {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
  log(msg: string) {
    console.log("LOG:", msg);
  }
}
Logger.getInstance().log("Hello");

// 18. Static MathUtil
class MathUtil {
  static add(a: number, b: number) {
    return a + b;
  }
  static subtract(a: number, b: number) {
    return a - b;
  }
  static multiply(a: number, b: number) {
    return a * b;
  }
  static divide(a: number, b: number) {
    return a / b;
  }
}

// 19. Overriding + Polymorphism
class Animal2 {
  sound() {
    console.log("Some sound");
  }
}
class Dog2 extends Animal2 {
  sound() {
    console.log("Woof!");
  }
}
class Cat2 extends Animal2 {
  sound() {
    console.log("Meow!");
  }
}
let animals: Animal2[] = [new Dog2(), new Cat2()];
animals.forEach((a) => a.sound());

// 20. Vehicle interface
interface Vehicle {
  drive(): void;
}
class Car2 implements Vehicle {
  drive() {
    console.log("Car driving");
  }
}
class Bike implements Vehicle {
  drive() {
    console.log("Bike driving");
  }
}

// 21. Generic Repository
class Repository<T> {
  private items: T[] = [];
  add(item: T) {
    this.items.push(item);
  }
  getAll() {
    return this.items;
  }
}

// 22. Stack
class Stack<T> {
  private items: T[] = [];
  push(item: T) {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

// 23. Payment interface
interface Payment {
  pay(amount: number): void;
}
class CashPayment implements Payment {
  pay(amount: number) {
    console.log(`Paid ${amount} in cash`);
  }
}
class CardPayment implements Payment {
  pay(amount: number) {
    console.log(`Paid ${amount} by card`);
  }
}

// 24. Abstract Appliance
abstract class Appliance {
  abstract turnOn(): void;
}
class Fan extends Appliance {
  turnOn() {
    console.log("Fan on");
  }
}
class AirConditioner extends Appliance {
  turnOn() {
    console.log("AC on");
  }
}

// 25. Shape static method
class Shape2 {
  static describe() {
    console.log("Shapes have area and perimeter.");
  }
}
Shape2.describe();

// 26. Order
class Order {
  constructor(public products: Product[]) {}
  totalPrice() {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}

// 27. Teacher extends Person
class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) {
    super(name, age);
  }
  introduce() {
    console.log(`I am ${this.name}, teaching ${this.subject}`);
  }
}

// 28. Animal protected
class Animal3 {
  protected makeSound() {
    console.log("Generic sound");
  }
}
class Dog3 extends Animal3 {
  protected makeSound() {
    console.log("Woof!");
  }
}
class Cat3 extends Animal3 {
  protected makeSound() {
    console.log("Meow!");
  }
}

// 29. Movable interface
interface Movable {
  move(): void;
}
class Car3 implements Movable {
  move() {
    console.log("Car moving");
  }
}
class Robot implements Movable {
  move() {
    console.log("Robot moving");
  }
}

// 30. School
class School {
  students: Student[] = [];
  teachers: Teacher[] = [];
  showInfo() {
    this.students.forEach((s) => s.displayAll());
    this.teachers.forEach((t) => t.introduce());
  }
}
