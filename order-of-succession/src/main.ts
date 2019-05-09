declare function readline(): string

type PersonParameters = {
    name: string;
    parent: string;
    birth: number;
    death: string;
    religion: string;
    gender: string;
}

class PersonTree {
    private root_: Person | undefined
    constructor() { }

    addPerson(person: Person) {
        if (person.parent === '-') {
            return this.root_ = person
        }

        const parent = this.findPersonByName(person.parent)
        if (parent) {
            parent.children.push(person)
        } else {
            throw new Error('Could not add Person as we could not find a parent')
        }
    }

    findPersonByName(name: string, currentNode = this.root_): Person | null {
        if (currentNode) {
            if (currentNode.name === name) {
                return currentNode
            }

            for (const child of currentNode.children) {
                const result = this.findPersonByName(name, child)
                if (result) return result
            }
            return null
        }
        return null
    }

    getOrderOfSuccession(currentNode = this.root_, results: string[] = []): string[] {
        if (currentNode) {
            if (currentNode.isAlive && currentNode.isAnglican) {
                results.push(currentNode.name)
            }

            const children = currentNode.children.sort(this.sortByOrderOfSuccession)

            for (const child of children) {
                results = this.getOrderOfSuccession(child, results)
            }
            return results
        }

        throw new Error('The tree is empty')
    }

    private sortByOrderOfSuccession(a: Person, b: Person) {
        if (a.gender === 'M' && b.gender === 'F') {
            return -1
        }
        if (a.gender === 'F' && b.gender === 'M') {
            return 1
        }
        if (a.birth < b.birth) {
            return -1
        }
        if (a.birth > b.birth) {
            return 1
        }
        return 0
    }
}

class Person {
    name: string;
    parent: string;
    children: Person[] = []
    birth: number;
    isAlive: boolean;
    isAnglican: boolean;
    gender: 'M' | 'F';
    constructor(personParameters: PersonParameters) {
        this.name = personParameters.name
        this.birth = personParameters.birth
        this.isAlive = personParameters.death === '-' ? true : false
        this.isAnglican = personParameters.religion === 'Anglican' ? true : false
        this.gender = personParameters.gender as 'M' | 'F'
        this.parent = personParameters.parent
    }
}

let tree = new PersonTree()

const n = parseInt(readline());
for (let i = 0; i < n; i++) {
    const inputs = readline().split(' ');
    const name = inputs[0];
    const parent = inputs[1];
    const birth = parseInt(inputs[2]);
    const death = inputs[3];
    const religion = inputs[4];
    const gender = inputs[5];

    const person = new Person({ name, parent, birth, death, religion, gender })
    tree.addPerson(person)
}

tree.getOrderOfSuccession().forEach(person => console.log(person))
