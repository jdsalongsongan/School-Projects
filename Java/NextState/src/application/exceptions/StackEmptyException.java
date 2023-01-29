package application.exceptions;

@SuppressWarnings("serial")
public class StackEmptyException extends RuntimeException {

	public StackEmptyException(String err) {
		super(err);
	}
}
