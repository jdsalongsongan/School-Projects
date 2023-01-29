import java.util.ArrayList;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Driver {

	public static void main(String[] args) throws InterruptedException, ExecutionException {
		System.out.println("Polynomial Addition Calculator:");
		System.out.println("Enter the absolute path of your .csv file:");
		Scanner s = new Scanner(System.in);
		String path = s.nextLine();
		
		System.out.println("Equation:");
		Polynomial_Processor p = new Polynomial_Processor(path);
		ArrayList<ArrayList<Term>> addends = p.processFile();
		
		
		if(addends != null) {
			ArrayList<Term> addend1 = null;
			ArrayList<Term> addend2 = null;
			ArrayList<Term> addend3 = null;
			
			if(addends.size() >= 1) addend1 = addends.get(0);
			if(addends.size() >= 2) addend2 = addends.get(1);
			if(addends.size() == 3) addend3 = addends.get(2);
			ExecutorService executor = Executors.newFixedThreadPool(1);
			//straight from arraylist of polynomials
			//Future<ArrayList<Term>> future = executor.submit(new PolynomialAddition(addends));
			
			
			Future<ArrayList<Term>> future = executor.submit(new PolynomialAddition(addend1, addend2, addend3));
			ArrayList<Term> sum = future.get();

			int lineln = sum.toString().length() + "(=)\t".length() + 7;
			int i = 0;
			String line = "";
			while(lineln > i) {
				line += "-";
				i++;
			}
			System.out.println(line);
			System.out.print("(=)\t");
			Polynomial_Processor.printEquation(sum);
			
			executor.shutdown();
		}
		else {
			System.out.println("An error occured. Try again.");
		}
		
		s.close();
	}

}