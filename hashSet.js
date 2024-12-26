class HashSet {
    #capacity = 16;
    #loadFactor = .75;
    #buckets = new Array(this.#capacity);
    #size = 0;

    #resize() {
        let oldBuckets = this.#buckets;
        this.#capacity *= 2;
        this.#buckets = new Array(this.#capacity); 
        this.#size = 0;
        for (let bucket of oldBuckets) {
            // set the old values into the new bucket
            if (!bucket) continue;
            for (let key of bucket) {
                this.set(key);
            }
        }

    }

    hash(key) { // Assuming key is a string
        let hashCode = 1;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    set(key) {
        if (this.#size > this.#capacity * this.#loadFactor) {
            console.log("Buckets reszed!");
            this.#resize();
        }
        let index = this.hash(key);
        if (!this.#buckets[index]) {
            this.#buckets[index] = [];
            // If we have to crate the inner array, that means this key is new
            this.#buckets[index].push(key);
            this.#size++;
            console.log(`Inserted new key: ${key} at index ${index}`);
            return;
        }

        let bucket = this.#buckets[index];
        let keyExists = false;
        for (let item of bucket) {
            if (item === key) {
                console.log(`${key} already exists at index ${index}`);
                keyExists = true;
                break;
            }
        }
        if (!keyExists) {
            bucket.push(key);
            this.#size++;
            console.log(`Inserted new key: ${key} at index ${index}`);
        }
    }

    has(key) {
        let index = this.hash(key);
        let bucket = this.#buckets[index];
        if (!bucket) return false;
        for (let item of bucket) {
            if (item === key) return true;
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key);
        let bucket = this.#buckets[index];
        if (!bucket) return false;
        let keyIndex = bucket.indexOf(key);
        if (keyIndex !== -1) {
            bucket.splice(keyIndex, 1);
            this.#size--;
            return true;
        }
        return false;
    }

    length() {
        return this.#size;
    }

    clear() {
        this.#buckets = new Array(this.#capacity);
        this.#size = 0;
        this.#capacity = 16;
    }

    keys() {
        let keyList = [];
        for (let bucket of this.#buckets) {
            if (!bucket) continue;
            for (let item of bucket) {
                keyList.push(item);
            }
        }
        let keyString = keyList.join(", ");
        return `[${keyString}]`;
    }

    
}

const test = new HashSet();
test.set('apple')
test.set('banana')
test.set('carrot')
test.set("torrac")
test.set('dog')
test.set('elephant')
test.set('frog')
test.set('grape')
test.set('hat')
test.set('ice cream')
test.set('ice cream')
test.set('jacket')
test.set('kite')
test.set('lion')
test.set('hat')

console.log(`length: ${test.length()}`);
console.log(`Has "hat": ${test.has("hat")}`);
console.log(`Has "fish": ${test.has("fish")}`);
console.log(`Removed "hat": ${test.remove("hat")}`);
console.log(`Keys: ${test.keys()}`);
test.clear();
console.log(`length: ${test.length()}`);
