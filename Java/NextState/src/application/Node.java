package application;

public class Node {
	/**
	 * Holds the key or element of the node
	 */
	private Object element;
	
	/**
	 * Points to the next node in the linked list
	 */
	private Node next;
	
	/**
	 * Initializes the node with the element being null
	 * and next node also null
	 */
	public Node() {
		this(null, null);
	}
	
	/**
	 * Initializes the node
	 * 
	 * @param element the key or element of the node
	 * @param next the node where this node points to
	 */
	public Node(Object element, Node next) {
		this.element = element;
		this.next = next;
	}
	
	/** 
	 * @return the key or element of the node
	 */
	Object getElement() {
		return element;
	}
	
	/**
	 * 
	 * @return the next node of this node in the list
	 */
	Node getNext() {
		return next;
	}
	
	/**
	 * Sets the key or element of the node
	 * 
	 * @param element the new key or element of the node
	 */
	void setElement(Object element) {
		this.element = element;
	}
	
	/**
	 * Sets the next node of this node
	 * 
	 * @param next the next node of this node
	 */
	void setNext(Node next) {
		this.next = next;
	}
}
