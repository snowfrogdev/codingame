"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCollection {
    constructor() {
        this.elements_ = [];
    }
    /**
     * The number of elements in the Collection<T>.
     *
     * @abstract
     * @type {number}
     * @memberof AbstractCollection
     */
    get size() {
        return this.elements_.length;
    }
    /**
     * Adds an element to the Collection<T>.
     *
     * @param {T} item The item to add to the Collection<T>.
     * @memberof Collection
     */
    add(item) {
        this.elements_.push(item);
    }
    /**
     * Removes all elements from the Collection<T>.
     *
     * @memberof Collection
     */
    clear() {
        this.elements_.length = 0;
    }
    /**
     * Determines whether the Collection<T> includes a certain value among its entries.
     *
     * @param {T} item element whose presence in this Collection<T> is to be tested.
     * @returns {boolean} true if item is found in the Collection<T>; otherwise, false.
     * @memberof Collection
     */
    has(item) {
        return this.elements_.includes(item);
    }
    /**
     * Removes the first occurrence of a specific element from the Collection<T>.
     *
     * @param {T} item element to be removed from this Collection<T>, if present.
     * @returns {boolean} true if item was successfully removed from the Collection<T>; otherwise,
     * false. This method also returns false if item is not found in the original Collection<T>.
     * @memberof Collection
     */
    remove(item) {
        const index = this.elements_.indexOf(item);
        if (index === -1)
            return false;
        this.elements_.splice(index, 1);
        return true;
    }
}
exports.AbstractCollection = AbstractCollection;
