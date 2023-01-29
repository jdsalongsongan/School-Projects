package application;

public class InfixToPostfix {
	private String infix;
	private String postfix;

	public InfixToPostfix(String infix){
		this.infix = infix;
		this.postfix = "";
	}
	
	//a method to convert the infix expression to postfix expression
	//Note: this method converts the value of the instance variable infix
	public String convertToPostFix(){
		Stack s = new LinkedStack();
		infix = format(infix);
		
		for (int i = 0; i < infix.length(); i++) {
			String a = Character.toString(infix.charAt(i));
			
			if (!isOperator(a)) {
				postfix += a;
			}
			else if (a.equals("(")) {
				s.push(a);
			}
			else if (a.equals(")")){
				postfix += popUntilOpenPar(s);
			}
			else {
				while (!s.isEmpty() && prec(a) <= prec(s.top())) {
					postfix += s.pop();
					
				}
				s.push(a);
			}
		}
		
		postfix += finalAddOperator(s);
		return format(postfix);
	}
	
	private static String format(String s) {
		
		String b = "";
		Character c;
		String C = "";
		for (int i = 0; i < s.length(); i++) {
			Character a = s.charAt(i);
			String A = Character.toString(a);
			int k = i + 1;
			if (k == s.length()) {
				c = a;
				C = A;
			}
			else {
				c = s.charAt(k);
				C = Character.toString(c);
			}
			
			if(Character.isLetterOrDigit(a) && Character.isLetterOrDigit(c)) {
				b += a;
			}
			else if(Character.isLetterOrDigit(a) && isOperator(C)) {
				b += a;
				b += " ";
			}
			else if(isOperator(A) && Character.isLetterOrDigit(c)) {
				b += A;
				if (i != 0)
					b += " ";
			}
			else if(A.equals(" ") && C.equals(" ")) {
				continue;
			}
			else if(isOperator(A) && C.equals(" ")) {
				b += A;	
			}else if(isOperator(A) && isOperator(C)) {
				b += A;
				if (i != s.length() - 1)
					b += " ";
			}
			else b += A;
			
		}
		return b;
	}
	
	private static boolean isOperator(String x) {
		return ("()^*+'".contains(x));
	}
	
	private int prec(Object a) {
		if (a.equals("'")) return 4; //not
		else if (a.equals("*")) return 3; //and
		else if (a.equals("^")) return 2; //xor
		else if (a.equals("+")) return 1; //or
		else if (a.equals("(")) return 0;
		else return -1;
	}
	
	private String popUntilOpenPar(Stack s) {
		String a = "";
		while (!s.top().equals("(")) {
			a += s.pop();
		}
		s.pop();
		return a;
	}
	
	private String finalAddOperator(Stack s) {
		String a = "";
		while(!s.isEmpty()) {
			if(s.top().equals("(") || s.top().equals(")")) {
				s.pop();
				continue;
			}
			a += s.pop();
		}
		return a;
	}
	
	
	
}