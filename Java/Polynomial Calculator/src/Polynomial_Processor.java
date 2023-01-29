import java.io.*;
import java.util.ArrayList;

public class Polynomial_Processor {

	public String csv;


	public Polynomial_Processor() {
		this.csv = null;	
	}

	public Polynomial_Processor(String csv) {
		this.csv = csv;
	}

	public String getCsv() {
		return csv;
	}

	public void setCsv(String csv) {
		this.csv = csv;
	}

	public ArrayList<ArrayList<Term>> processFile(){
		//check if file is csv
		if(!getCsv().substring(getCsv().length() - 3).equals("csv")) {
			System.out.println("Wrong file format.");
			return null;
		}
		//get values in csv
	
		ArrayList<String[]> terms = new ArrayList<String[]>();
		try(BufferedReader br = new BufferedReader(new FileReader(getCsv()))){
			String l;
			while((l = br.readLine()) != null) {
				String[] comps = l.split(",");
				if(comps.length > 3) {
					System.out.println("Invalid number of elements in term.");
					return null;
				}
				terms.add(comps);
			}
		}
		catch (Exception e){
			System.out.println("Unexpected error.");
			return null;
		}

		ArrayList<Integer> breakers = new ArrayList<Integer>();
		for(int i = 0; i < terms.size(); i++) {
			String a = terms.get(i)[0];
			if(a.equals("")) breakers.add(i);
		}

		if(breakers.size() > 2) {
			System.out.println("Invalid number of polynomials");
			return null;
		}

		ArrayList<String[]> stringedAddend1 = null;
		ArrayList<String[]> stringedAddend2 = null;
		ArrayList<String[]> stringedAddend3 = null;

		ArrayList<Term> addend1 = null;
		ArrayList<Term> addend2 = null;
		ArrayList<Term> addend3 = null;

		int index = 0;

		if (breakers.size() >= 0) {
			stringedAddend1 = new ArrayList<String[]>();
			if(breakers.size() == 0) {
				for(int i = 0; i < terms.size(); i++) {
					stringedAddend1.add(terms.get(i));
				}
			}
			else {
				for(int i = 0;i < breakers.get(0); i++) {
					stringedAddend1.add(terms.get(i));
					index++;
				}
				index++;
			}
			addend1 = numberizePolynomial(stringedAddend1);
			if(addend1 == null) return null;
			System.out.print("\t");
			printEquation(addend1);
		}
		if (breakers.size() >= 1) {
			int j = index;
			stringedAddend2 = new ArrayList<String[]>();
			if(breakers.size() == 1) {
				for(int i = j; i < terms.size(); i++) {
					stringedAddend2.add(terms.get(i));
				}
			}
			else {
				for(int i = j; i < breakers.get(1); i++) {
					stringedAddend2.add(terms.get(i));
					index++;
				}
				index++;
			}
			addend2 = numberizePolynomial(stringedAddend2);
			if(addend2 == null) return null;
			System.out.print("(+)\t");
			printEquation(addend2);
		}
		if (breakers.size() == 2) {
			int j = index;
			stringedAddend3 = new ArrayList<String[]>();
			for(int i = j; i < terms.size(); i++) {
				stringedAddend3.add(terms.get(i));
			}
			addend3 = numberizePolynomial(stringedAddend3);
			if(addend3 == null) return null;
			System.out.print("(+)\t");
			printEquation(addend3);
		}

		ArrayList<ArrayList<Term>> equation = new ArrayList<ArrayList<Term>>();

		if (addend1 != null) equation.add(addend1);
		if (addend2 != null) equation.add(addend2);
		if (addend3 != null) equation.add(addend3);

		return equation;
	}

	private ArrayList<Term> numberizePolynomial(ArrayList<String[]> poly){
		ArrayList<Term> polynomial = new ArrayList<Term>();	
		for(int i = 0; i < poly.size(); i++) {
			try {
				int[] exp = {Integer.parseInt(poly.get(i)[1]), Integer.parseInt(poly.get(i)[2])};
				for(int e : exp) {
					if(e > 5) {
						System.out.println("Up to degree 5 polynomials only");
						return null;
					}
				}
				Term term = new Term(Integer.parseInt(poly.get(i)[0]), exp);
				polynomial.add(term);
			} catch (NumberFormatException e) {
				System.out.println("Input not a number.");
				return null;
			}
		}
		return polynomial;
	}

	public static void printEquation(ArrayList<Term> polynomial) {
		int last = polynomial.size() - 1;
		int i = 0;
		for(Term t: polynomial) {
			System.out.print("(" + t.toString() + ")");
			if(i < last) System.out.print("+");
			else System.out.println();
			i++;
		}
	}

	public void prinEq(ArrayList<String[]> p) {
		for(String[] e: p) {
			for(String l : e) {
				System.out.print(l + " ");
			}
			System.out.println();
		}
	}


}
