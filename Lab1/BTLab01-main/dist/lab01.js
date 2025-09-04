"use strict";
// 1. Class Person
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}
let p1 = new Person("An", 20);
p1.displayInfo();
// 2. Student extends Person
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    displayAll() {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}
let s1 = new Student("Bình", 21, "A");
s1.displayAll();
// 3. Car
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    showInfo() {
        console.log(`${this.brand} ${this.model} (${this.year})`);
    }
}
new Car("Toyota", "Camry", 2021).showInfo();
// 4. Rectangle
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
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
    constructor(balance = 0) {
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        if (this.balance >= amount)
            this.balance -= amount;
    }
}
let acc = new BankAccount(1000);
acc.deposit(500);
acc.withdraw(200);
console.log("Balance:", acc.balance);
// 6. Book
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}
// 7. User private + getter/setter
class User {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
}
let u = new User("Lan");
console.log(u.name);
u.name = "Hà";
// 8. Product + filter
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
let products = [new Product("Book", 50), new Product("Phone", 200)];
let expensive = products.filter((p) => p.price > 100);
console.log(expensive);
class Dog1 {
    constructor() {
        this.name = "Dog";
    }
    sound() {
        console.log("Woof!");
    }
}
// 10. Account with fields
class Account {
    constructor(u, p, id) {
        this.username = u;
        this.password = p;
        this.id = id;
    }
}
// 11. Animal → Dog, Cat
class Animal {
    constructor(name) {
        this.name = name;
    }
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
class Bird {
    fly() {
        console.log("Bird flying");
    }
}
class Fish {
    swim() {
        console.log("Fish swimming");
    }
}
// 13. Abstract Shape
class Shape {
}
class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }
    area() {
        return this.side * this.side;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
// 14. Employee
class Employee {
    constructor(name) {
        this.name = name;
    }
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
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(b) {
        this.books.push(b);
    }
}
// 16. Generic Box
class Box {
    constructor(value) {
        this.value = value;
    }
}
let box1 = new Box(123);
// 17. Singleton Logger
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance)
            Logger.instance = new Logger();
        return Logger.instance;
    }
    log(msg) {
        console.log("LOG:", msg);
    }
}
Logger.getInstance().log("Hello");
// 18. Static MathUtil
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
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
let animals = [new Dog2(), new Cat2()];
animals.forEach((a) => a.sound());
class Car2 {
    drive() {
        console.log("Car driving");
    }
}
class Bike {
    drive() {
        console.log("Bike driving");
    }
}
// 21. Generic Repository
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
// 22. Stack
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
class CashPayment {
    pay(amount) {
        console.log(`Paid ${amount} in cash`);
    }
}
class CardPayment {
    pay(amount) {
        console.log(`Paid ${amount} by card`);
    }
}
// 24. Abstract Appliance
class Appliance {
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
    constructor(products) {
        this.products = products;
    }
    totalPrice() {
        return this.products.reduce((sum, p) => sum + p.price, 0);
    }
}
// 27. Teacher extends Person
class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    introduce() {
        console.log(`I am ${this.name}, teaching ${this.subject}`);
    }
}
// 28. Animal protected
class Animal3 {
    makeSound() {
        console.log("Generic sound");
    }
}
class Dog3 extends Animal3 {
    makeSound() {
        console.log("Woof!");
    }
}
class Cat3 extends Animal3 {
    makeSound() {
        console.log("Meow!");
    }
}
class Car3 {
    move() {
        console.log("Car moving");
    }
}
class Robot {
    move() {
        console.log("Robot moving");
    }
}
// 30. School
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    showInfo() {
        this.students.forEach((s) => s.displayAll());
        this.teachers.forEach((t) => t.introduce());
    }
}
