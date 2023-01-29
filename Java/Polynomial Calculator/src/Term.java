
public class Term {
	private int coefficient;
	private char[] variable = {'x','y'};
	private int[] exponent;
	
	public Term(int coefficient, int[] exponent) {
		this.coefficient = coefficient;
		this.exponent = exponent;
	}

	public int getCoefficient() {
		return coefficient;
	}

	public void setCoefficient(int coefficient) {
		this.coefficient = coefficient;
	}

	public int[] getExponent() {
		return exponent;
	}

	public void setExponent(int[] exponent) {
		this.exponent = exponent;
	}
	
	public String toString() {
		String t = "";
		if(coefficient == 0) return t;
		else {
			t += coefficient;
			if(exponent[0] != 0) t += (variable[0]);
			if(exponent[0] > 1) t += ( "^" + exponent[0]);
			if(exponent[1] != 0) t += (variable[1]);
			if(exponent[1] > 1) t += ( "^" + exponent[1]);
		}
		return t;
	}
	
	public int getPower() {
		return exponent[0] + exponent[1];
	}
}
