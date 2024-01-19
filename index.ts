import "reflect-metadata"

function ClassDecorator(): ClassDecorator {
  console.log("ClassDecorator(): factory evaluated");
  return function (target: Function) {
    const depedencies = Reflect.getMetadata('design:paramtypes', target) || [];
    console.log("ClassDecorator(): depedencies", depedencies);
    console.log("ClassDecorator(): called");
  };
}

function MethodDecorator(): MethodDecorator {
  console.log("MethodDecorator(): factory evaluated");
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const depedencies = Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];

    console.log("MethodDecorator(): depedencies ", depedencies);
    console.log("MethodDecorator(): called");
  };
}

function ParamsDecorator(): ParameterDecorator {
  console.log("ParamsDecorator(): factory evaluated");
  return function (target: any, propertyKey: string | symbol | undefined, parameterIndex: number): string {
    console.log(target[propertyKey || ""])
    return "budi";
  }
}

class OtherService { }

@ClassDecorator()
class SomeService {
  constructor(type: string, age: number) { }

  @MethodDecorator()
  someMethod(@ParamsDecorator() a: string, b: OtherService) {
    console.log(a)
  }
}

console.log("==== START ====");

new SomeService("human", 35).someMethod("aziz", new OtherService())
