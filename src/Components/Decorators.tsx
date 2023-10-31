import React from 'react';

function Logger (constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
};

@Logger
class Controler {
    public id = 1;
};

function AddProperty (constructor: Function) {
  constructor.prototype.myProperty = 'Hello';
};

@AddProperty
class MyClass {};

const myInstance = new MyClass();
//console.log((myInstance as any).myProperty);

function Logger1  (logString: string) {
    return function (constructor: Function) {
        console.log(logString);
    };
};

@Logger1('Logging -CONTROLLER')
class Controller {
    public is = 1;
};

function Logger2 (logString: string) {
    return function (constructor: Function) {
        console.log(logString);
    };
};

function AddProperty2() {
    return function <T extends {new (...args: any[]): {}}> (originalConstructor : T) {
            return class extends originalConstructor {
                modify = true;
            }
    }
};

@Logger2('LOGGING-CONTROLLER')
@AddProperty2()
class Controller1 {
  public id = 1;
  public modify? : boolean;
};

const controller = new Controller1();
console.log('Modified classes ', controller.modify);

interface IDecoration {
    parent: string;
    template: string;
};

function ControllerDecoration (config: IDecoration ) {
    return function (constructor: any) {
        const current = new constructor();
        const getParent = document.getElementById(config.parent);
        const createElement = document.createElement(config.template);

        createElement.innerHTML = current.content;
        constructor.prototype.element = createElement;
        constructor.prototype.parent = getParent;

        getParent?.appendChild(createElement);
    };
};

@ControllerDecoration({
    parent: 'app',
    template: 'H1'
})
class Controller5 {
    public content = 'My custom controller'
};

interface IDecorator2 {
    parent: string;
    template: string;
};

function ControllerDecorator (config: IDecorator2) {
    return function <T extends {new (...arg: any[]): {content: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            private element: HTMLElement;
            private parent: HTMLElement;

            constructor (...arg: any[] ) {
                super(...arg);
                this.parent = document.getElementById(config.parent)!;
                this.element = document.createElement(config.template);

                this.element.innerHTML = this.content;
                this.parent.appendChild(this.element);
            }
        };
    };
};

@ControllerDecorator({
    parent: 'app',
    template: 'H1'
})
class Control {
    public content = 'My custom controller'
};

const control = new Control();

function LogMethod (target: any, name: string, descriptor: PropertyDescriptor) {
  console.log(`Method ${name} of class ${target.constructor.name} is called`)
};

class MyClass1 {
  @LogMethod
  myMethod() {
    console.log('Hello, World!');
  };
};

let obj = new MyClass1();
obj.myMethod();

function ValidateString () {
    return function (
        target: any,
        name: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if(typeof args[0] !== 'string') {
              throw new Error('Invalid input. Expected string'
              );
            }
            return originalMethod.apply(this, args);
        }
    }
};

class MyString {
    @ValidateString()
    public print(value: string) {
        console.log(`Received value: ${value}`);
    };
};

const instance = new MyString();
instance.print('Moon');

function AddTax (taxPercent: number) {
   return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    //Отримуємо вихідний метод
    const method = descriptor.value as Function;

    return {
        configurable: true,
        enumerable: false,
        get() {
            return (...args: any[]) => {
               // Викликаємо вихідний метод і отримуємо його результат.

                   const result = method.apply(this, args);

               // Додаємо податок до результату.
               return result + (result / 100) * taxPercent;
            };
        },
    };
   };
};

class Payment {
    @AddTax(20)
    pay(money: number): number {
      return money;
    };
};

const payment = new Payment();
console.log('Amount with tax : ', payment.pay(100));

//Декоратори параметрів 

function CheckEmail(target: any, methodName: string, position: number) {
 if(!target[methodName].validation) {
    target[methodName].validation = {};
 }
 Object.assign(target[methodName].validation, {
    [position]: (value: string) => {
        if(value.includes('@')) {
            return value;
        }
        throw new Error('No valid field');
    },
 });
};

function Validation (_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[])  {
    if(method.validation) {
        args.forEach((item, index) => {
            if(method.validation[index]) {
                args[index] = method.validation[index](item);
            };
        });
    };

    return method.apply(this, args);
  };
};

class Human {
    @Validation
    setEmail(@CheckEmail email: string) {
        console.log(email);
    };
};

const human = new Human();
human.setEmail('human@gmail.com');
human.setEmail('humangmail.com');

//Декоратори властивостей

interface ValidatorConfig {
    [property: string]: {
        [validateAbleProp: string]: string[];
    }
};

const registeredValidator: ValidatorConfig = {};

function Required (target: any, propName: string) {
   registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: ['required'],
   };
};

function PositiveNumber (target: any, propName: string) {
    registeredValidator[target.constructor.name] = {
        ...registeredValidator[target.constructor.name],
        [propName]: ['positive'],
    };
};

function validate(obj: any) {
    const objValidatorConfig = registeredValidator[obj.constructor.name];
    if(!objValidatorConfig) {
        return true;
    }

    let isValid = true;
    for(const prop in objValidatorConfig) {
        for(const validator in objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive' :
                    isValid = isValid && obj[prop] > 0;
                    break;
            };
        };
    };
    return isValid;
};

class Person10 {
    @Required
    name: string;
    @PositiveNumber
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    };
};

const person10 = new Person10('', -1);

if(!validate(person10)) {
    console.log('Validation error');
}else {
    console.log('Validation ok')
};