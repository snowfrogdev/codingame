export interface Collection<T> extends Iterable<T> {
  /**
   * The number of elements in the Collection<T>.
   *
   * @type {number}
   * @memberof Collection
   */
  readonly size: number;

  /**
   * Adds an element to the Collection<T>.
   *
   * @param {T} item The item to add to the Collection<T>.
   * @memberof Collection
   */
  add(item: T): void;

  /**
   * Removes all elements from the Collection<T>.
   *
   * @memberof Collection
   */
  clear(): void;

  /**
   * Determines whether the Collection<T> includes a certain value among its entries.
   *
   * @param {T} item element whose presence in this Collection<T> is to be tested.
   * @returns {boolean} true if item is found in the Collection<T>; otherwise, false.
   * @memberof Collection
   */
  has(item: T): boolean;

  /**
   * Removes the first occurrence of a specific element from the Collection<T>.
   *
   * @param {T} item element to be removed from this Collection<T>, if present.
   * @returns {boolean} true if item was successfully removed from the Collection<T>; otherwise,
   * false. This method also returns false if item is not found in the original Collection<T>.
   * @memberof Collection
   */
  remove(item: T): boolean;
}

export abstract class AbstractCollection<T> implements Collection<T> {
  /**
   * The number of elements in the Collection<T>.
   *
   * @abstract
   * @type {number}
   * @memberof AbstractCollection
   */
  get size(): number {
    return this.elements_.length;
  }

  protected elements_: T[] = [];

  /**
   * Returns an iterator over the elements contained in this Collection<T>. Called by the semantics
   * of the for-of statement.
   *
   * @abstract
   * @returns {Iterator<T>}
   * @memberof AbstractCollection
   */
  abstract [Symbol.iterator](): Iterator<T>;

  /**
   * Adds an element to the Collection<T>.
   *
   * @param {T} item The item to add to the Collection<T>.
   * @memberof Collection
   */
  add(item: T): void {
    this.elements_.push(item);
  }

  /**
   * Removes all elements from the Collection<T>.
   *
   * @memberof Collection
   */
  clear(): void {
    this.elements_.length = 0;
  }

  /**
   * Determines whether the Collection<T> includes a certain value among its entries.
   *
   * @param {T} item element whose presence in this Collection<T> is to be tested.
   * @returns {boolean} true if item is found in the Collection<T>; otherwise, false.
   * @memberof Collection
   */
  has(item: T): boolean {
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
  remove(item: T): boolean {
    const index = this.elements_.indexOf(item);
    if (index === -1) return false;
    this.elements_.splice(index, 1);
    return true;
  }
}

