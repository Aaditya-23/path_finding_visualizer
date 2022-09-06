export class Queue {
  #queue;

  constructor() {
    this.#queue = [];
  }

  enqueue(element) {
    const queue = this.#queue;
    queue.push(element);
  }

  dequeue() {
    const queue = this.#queue;
    queue.shift();
  }

  front() {
    return this.#queue[0];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#queue.length;
  }
}
