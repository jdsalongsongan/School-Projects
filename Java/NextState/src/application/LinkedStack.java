package application;

import application.exceptions.StackEmptyException;


public class LinkedStack implements Stack {
	private Node top;
	private int size;
	
	public LinkedStack() {
		top = null;
		size = 0;
	}

	@Override
	public boolean isEmpty() {		
		return (top == null);
	}


	@Override
	public Object pop() throws StackEmptyException {
		if (isEmpty())
			throw new StackEmptyException("Stack is empty!");
		Object temp = top.getElement();
		top = top.getNext();
		size--;
		return temp;
	}


	@Override
	public void push(Object element) {
		Node v = new Node(element, top);
		top = v;
		size++;
	}

	
	@Override
	public int size() {		
		return size;
	}

	@Override
	public Object top() throws StackEmptyException {
		if (isEmpty())
			throw new StackEmptyException("Stack is empty!");
		
		return top.getElement();
	}

}
