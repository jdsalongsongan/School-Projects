import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		boolean inputState = true;
		while(inputState == true) {
			System.out.println();
			System.out.println("-----------------------------------");
			System.out.println("|                                 |");
			System.out.println("|   Boolean Expression Minimizer  |");
			System.out.println("|                                 |");
			System.out.println("|            Options:             |");
			System.out.println("|                                 |");
			System.out.println("| [1] Start minimizing            |");
			System.out.println("| [2] Exit the program            |");
			System.out.println("|                                 |");
			System.out.println("-----------------------------------");
			System.out.print("Choose an option: ");
			String i = scan.nextLine();
			switch(i) {
			case "1":
				Tabulation.startTabulation();
				
				boolean next = false;
				while(next == false) {
					System.out.print("Task Complete. Type 'x' if you are done in checking the expression. : ");
					String x = scan.nextLine();
					switch(x) {
					case "x":
						next = true;
						break;
					default:
						System.out.println("Invalid input. Try again.");
						System.out.println();
						break;
					}
				}
				break;
			case "2":
				System.out.println("Thank you for using the Boolean Expression Minimizer. Have a nice day.");
				inputState = false;
				break;
			default:
				System.out.println("Invalid input.");
				break;
			}
		}
		
		scan.close();
		
	}

	




}
