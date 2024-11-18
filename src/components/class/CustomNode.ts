export class CustomNode<T> {
  data: T;
  next: CustomNode<T> | null;
  prev: CustomNode<T> | null;
  constructor(data: T) {
    // To store the value or data.
    this.data = data;

    // Reference to the previous node
    this.prev = null;

    // Reference to the next node
    this.next = null;
  }
}
