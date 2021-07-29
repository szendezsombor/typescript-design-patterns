interface Prototype {
    clone(): Prototype; // : this;
}

class CustomPrototype implements Prototype {
    public somePrimitiveTypeValue: string;
    public someObject: Object;
    public circularReference: CircularReferenceClass;


    // @ts-ignore
    constructor(private alma: string) {
    }

    clone(): CustomPrototype { // : this {
        const clone = new CustomPrototype(this.alma);

        clone.somePrimitiveTypeValue = this.somePrimitiveTypeValue;
        clone.someObject = Object.create(this.someObject || {});
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }

    printOutAlma() {
        console.log(this.alma);
    }

}

class CircularReferenceClass {
    public prototype: Prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

const myCustomPrototype = new CustomPrototype("Almaaaaa??? Almaaaaa.... Ez egy almaaaaa...");
myCustomPrototype.somePrimitiveTypeValue = "Primitive value!";
myCustomPrototype.someObject = { alma: 12 };
myCustomPrototype.circularReference = new CircularReferenceClass(myCustomPrototype);

const clone = myCustomPrototype.clone();

if (myCustomPrototype.somePrimitiveTypeValue === clone.somePrimitiveTypeValue) console.log('[Success]: Some primitive value cloning success.');
else console.log('[Error]: Some primitive value cloning error.');

if (myCustomPrototype.someObject === clone.someObject) console.log('[FAIL]: Cloning failed.');
else console.log('[Success]: Some object cloning success.');

if (myCustomPrototype.circularReference === clone.circularReference) console.log('[FAIL]: Cloning failed.');
else console.log('[Success]: Circular reference cloning success.');

clone.printOutAlma();

// Amennyiben örököltetjük subclassba.
class ExtendedCustomPrototype extends CustomPrototype{
    clone(): CustomPrototype {
        return super.clone();
    }
}