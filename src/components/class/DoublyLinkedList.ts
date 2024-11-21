import { AppWindowProps } from "@/app/types";
import { CustomNode } from "./CustomNode";

export class DoublyLinkedList<T> {
  head: CustomNode<T> | null;
  tail: CustomNode<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  peek(): T | null {
    if (this.tail) return this.tail.data;
    else return null;
  }

  // Add a new node to the end of the list
  append(data: T): void {
    const newNode = new CustomNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
    }
    this.length++;
  }

  // Add a new node to the beginning of the list
  prepend(data: T): void {
    const newNode = new CustomNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  // Remove a node by value
  remove(data: T): void {
    if (!this.head) {
      console.error("err in remove node");
      return;
    }

    let current = this.head;

    while (current) {
      if (current.data === data) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next; // Removing the head node
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev; // Removing the tail node
        }

        this.length--;
        return;
      }
      // @ts-expect-error
      current = current.next;
    }
  }

  // Find a node by value
  find(data: T): CustomNode<T> | null {
    let current = this.head;

    while (current) {
      if (current.data === data) return current;
      current = current.next;
    }

    return null;
  }

  // Print the list from head to tail
  printForward(debug?: string): void {
    let current = this.head;
    const values = [];

    while (current) {
      values.push(current.data);
      console.log(debug, current.data);
      current = current.next;
    }
  }

  printBackward(debug?: string): void {
    let current = this.tail;
    const values = [];

    while (current) {
      values.push(current.data);
      current = current.prev;
    }
  }

  getAllForward(): T[] {
    let current = this.head;
    const values: T[] = [];

    while (current) {
      values.push(current.data);
      current = current.next;
    }

    return values;
  }

  getAllBackward(): T[] {
    let current = this.tail;
    const values: T[] = [];

    while (current) {
      values.push(current.data);
      current = current.prev;
    }

    return values;
  }

  copyListWithoutOneNode(
    openAppsStack: DoublyLinkedList<AppWindowProps>,
    cApp: AppWindowProps | undefined
  ): DoublyLinkedList<AppWindowProps> {
    const newStack = new DoublyLinkedList<AppWindowProps>();
    let current = openAppsStack.head;

    // Copy elements from the current stack to the new stack, except for the toggling app
    while (current) {
      if (current.data.id !== cApp?.id) {
        newStack.append(current.data);
      }
      current = current.next;
    }

    return newStack;
  }

  toList(): DoublyLinkedList<T> {
    const newStack = new DoublyLinkedList<T>();
    let current = this.head;

    // Copy elements from the current stack to the new stack, except for the toggling app
    while (current) {
      newStack.append(current.data);

      current = current.next;
    }

    return newStack;
  }
}
