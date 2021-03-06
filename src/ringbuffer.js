/**
 * RingBuffer implements classic fixed length ring buffer, or circular queue.
 *
 * The methods match the Array signature for push, pop, unshift, and shift.
 *
 * For buffer operation either use push/shift together, or unshift/pop together.
 *
 * RingBuffer is substantially faster than an Array for this use case.
 */
export class RingBuffer {
  /**
   * Constructs a RingBuffer with fixed maximum capacity.
   * @param {Number} capacity - maximum number of values in the buffer
   */
  constructor (capacity) {
    this.capacity = capacity
    this._buffer = new Array(capacity)
    this._first = 0
    this.length = 0
  }

  /**
   * Empties the ring buffer.
   */
  clear () {
    this._first = 0
    this.length = 0
  }

  /**
   * Returns the value at the back of the buffer.
   * @returns {any} - the back of the buffer, or `undefined` if empty
   */
  back () {
    if (this.length === 0) return undefined
    return this._buffer[this._last]
  }

  /**
   * Returns the value at the front of the buffer.
   * @returns {any} - the front of the buffer, or `undefined` if empty
   */
  front () {
    if (this.length === 0) return undefined
    return this._buffer[this._first]
  }

  /**
   * Pushes a value onto the back of the buffer. If length === capacity,
   * the value at the front of the buffer is discarded.
   * @param {any} value - value to push
   * @returns {Number} - the current length of the buffer
   */
  push (value) {
    if (this.length === this.capacity) this.shift()
    this.length++
    this._buffer[this._last] = value
    return this.length
  }

  /**
   * Removes a value from the back of the buffer and returns it. The
   * newly empty buffer location is set to undefined to release any
   * object references.
   * @returns {any} the value removed from the back of the buffer
   * or `undefined` if empty.
   */
  pop () {
    if (this.length === 0) return undefined
    const value = this._buffer[this._last]
    this._buffer[this._last] = undefined // release reference on memory
    this.length--
    return value
  }

  /**
   * Removes a value from the front of the buffer and returns it. The
   * newly empty buffer location is set to undefined to release any
   * object references.
   * @returns {any} the value removed from the front of the buffer
   * or `undefined` if empty.
   */
  shift () {
    if (this.length === 0) return undefined
    const value = this._buffer[this._first]
    this._buffer[this._first] = undefined // release reference on memory
    this.length--
    this._right()
    return value
  }

  /**
   * Pushes a value on the front of the buffer. If length === capacity,
   * the value at the back is discarded.
   * @param {any} value - to push onto the front
   * @returns {Number} - the current length of the buffer
   */
  unshift (value) {
    if (this.length === this.capacity) this.pop()
    this._left()
    this.length++
    this._buffer[this._first] = value
    return this.length
  }

  /**
   * Iterator that goes from front to back.
   * @returns {Generator} - iterates from front to back
   */
  * [Symbol.iterator] () {
    let index = this._first
    for (let i = 0; i < this.length; ++i) {
      yield this._buffer[index++]
      if (index > (this.capacity - 1)) index = 0
    }
  }

  // Calculates the index of the value at the back of the buffer.
  get _last () {
    const index = this._first + (this.length - 1)
    return (index > (this.capacity - 1)) ? index - this.capacity : index
  }

  // moves the front of the buffer one step toward the back.
  _right () {
    if (++this._first > (this.capacity - 1)) this._first = 0
  }

  // moves the front of the buffer one step forward.
  _left () {
    if (--this._first < 0) this._first = this.capacity - 1
  }
}
