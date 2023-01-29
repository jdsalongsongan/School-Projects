import java.util.ArrayList;
import java.util.concurrent.Callable;

public class PolynomialAddition implements Callable<ArrayList<Term>> {
	
	private ArrayList<Term> addend1, addend2, addend3;
	
	public PolynomialAddition() {
		setAddend1(null);
		setAddend2(null);
		setAddend3(null);
	}
	
	//constructor in problem
	public PolynomialAddition(ArrayList<Term> addend1, ArrayList<Term> addend2, ArrayList<Term> addend3) {
		setAddend1(addend1);
		setAddend2(addend2);
		setAddend3(addend3);
	}
	
	public PolynomialAddition(ArrayList<ArrayList<Term>> equation) {
		setAddend1(null);
		setAddend2(null);
		setAddend3(null);
		if(equation.size() >= 1) setAddend1(equation.get(0));
		if(equation.size() >= 2) setAddend2(equation.get(1));
		if(equation.size() >= 3) setAddend3(equation.get(2));
	}
	@Override
	public ArrayList<Term> call() throws Exception {
		//combine the whole equation
		ArrayList<Term> sum = new ArrayList<Term>();
		if(getAddend1() != null) sum.addAll(getAddend1());
		if(getAddend2() != null) sum.addAll(getAddend2());
		if(getAddend3() != null) sum.addAll(getAddend3());
		//combine like terms; group exponents
		IntegerSet exp = new IntegerSet();
		for(Term x : sum) {
			exp.add(x.getExponent());
		}
		ArrayList<ArrayList<Integer>> coefGrps = new ArrayList<>();
		for(int[] x: exp) {
			ArrayList<Integer> coef = new ArrayList<Integer>();
			for(Term y: sum) {
				if(equals(x, y.getExponent())) coef.add(y.getCoefficient());
			}
			coefGrps.add(coef);
		}
		//add coeffs
		ArrayList<Integer> sumCoef = new ArrayList<Integer>();
		for(ArrayList<Integer> grp: coefGrps) {
			int ans = 0;
			for(Integer x: grp) ans += x;
			sumCoef.add(ans);
		}
		//combine the answer
		ArrayList<Term> finalAns = new ArrayList<Term>();
		int i = 0;
		for(int[] y: exp) {
			Term t = new Term(sumCoef.get(i), y);
			finalAns.add(t);
			i++;
		}
		return finalAns;
	}
	
	public boolean equals(int[] x, int[] y) {
		for(int i = 0; i < x.length; i++) {
			if(x[i] != y[i]) return false;
		}
		return true;
	}

	public ArrayList<Term> getAddend1() {
		return addend1;
	}

	public void setAddend1(ArrayList<Term> addend1) {
		this.addend1 = addend1;
	}

	public ArrayList<Term> getAddend2() {
		return addend2;
	}

	public void setAddend2(ArrayList<Term> addend2) {
		this.addend2 = addend2;
	}

	public ArrayList<Term> getAddend3() {
		return addend3;
	}

	public void setAddend3(ArrayList<Term> addend3) {
		this.addend3 = addend3;
	}

}
