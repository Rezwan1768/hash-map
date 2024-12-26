class HashMap {
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
            for (let { key, value } of bucket) {
                this.set(key, value);
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

    set(key, value) {
        if (this.#size > this.#capacity * this.#loadFactor) {
            console.log("Buckets reszed!");
            this.#resize();
        }
        let index = this.hash(key);
        if (!this.#buckets[index]) {
            this.#buckets[index] = [];
            // If we have to crate the inner array, that means this key is new
            this.#buckets[index].push({ key, value });
            this.#size++;
            console.log(`Inserted new key: ${key} and value: ${value} at index ${index}`);
            return;
        }

        let bucket = this.#buckets[index];
        let keyExists = false;
        for (let item of bucket) {
            if (item.key === key) {
                item.value = value; // Update value if key already exists
                console.log(`Updated ${key} to new value: ${value} at index ${index}`);
                keyExists = true;
                break;
            }
        }
        if (!keyExists) {
            bucket.push({ key, value });
            this.#size++;
            console.log(`Inserted new key: ${key} and value: ${value} at index ${index}`);
        }
    }

    get(key) {
        let index = this.hash(key);
        let bucket = this.#buckets[index];
        if (!bucket) return null;
        for (let item of bucket) {
            if (item.key === key) return item.value;
        }
        return null;
    }

    has(key) {
        let index = this.hash(key);
        let bucket = this.#buckets[index];
        if (!bucket) return false;
        for (let item of bucket) {
            if (item.key === key) return true;
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key);
        let bucket = this.#buckets[index];
        if (!bucket) return false;
        for (let [ind, item] of bucket.entries()) {
            if (item.key === key) {
                bucket.splice(ind, 1);
                this.#size--;
                return true;
            }
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
                keyList.push(item.key);
            }
        }
        let keyString = keyList.join(", ");
        return `[${keyString}]`;
    }

    values() {
        let valueList = [];
        for (let bucket of this.#buckets) {
            if (!bucket) continue;
            for (let item of bucket) {
                valueList.push(item.value);
            }
        }
        let valueString = valueList.join(", ");
        return `[${valueString}]`;
    }


    entries() {
        let entriesList = [];
        for (let bucket of this.#buckets) {
            if (!bucket) continue;
            for (let item of bucket) {
                entriesList.push(`[${item.key}, ${item.value}]`);
            }
        }
        let entriesString = entriesList.join(", ");
        return `[${entriesString}]`;
    }
    
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set("torrac", "green")
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('ice cream', 'yellow')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('hat', 'red')

console.log(`length: ${test.length()}`);
console.log(`Value of "frog" ${test.get("frog")}`);
console.log(`Value of "fish" ${test.get("fish")}`);
console.log(`Has "hat": ${test.has("hat")}`);
console.log(`Has "fish": ${test.has("fish")}`);
console.log(`Removed "hat": ${test.remove("hat")}`);
console.log(`Value of "hat" ${test.get("hat")}`);
console.log(`Keys: ${test.keys()}`);
console.log(`Values: ${test.values()}`);
console.log(`Entries: ${test.entries()}`);
test.clear();
console.log(`length: ${test.length()}`);
console.log(`Value of "frog" ${test.get("frog")}`);


