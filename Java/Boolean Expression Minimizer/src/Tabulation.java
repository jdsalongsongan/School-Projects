import java.text.Collator;
import java.util.*;

public class Tabulation {
	
	//declared variables
	private static int variableCount;
	private static  int[] minterms;
	private static int[] dontCares;
	private static char[] variables;
	private static int maxMintermCount;
	private static List<List<List<int[]>>> initialGroups;
	private static List<List<List<List<int[]>>>> step1Table;
	private static int[] checklist;
	private static List<int[]> essentials;
	private static List<List<int[]>> listOfPossible;
	private static List<List<int[]>> step2Table;
	private static String petrickRes;
	private static Set<Integer> setOfTermsAlreadyUsed;
	
	//Getters and setters
	public static int getVariableCount() {
		return variableCount;
	}

	public static int[] getMinterms() {
		return minterms;
	}

	public static char[] getVariables() {
		return variables;
	}

	public static int[] getDontCares() {
		return dontCares;
	}

	public static void setMinterms(int[] minterms) {
		Tabulation.minterms = minterms;
	}

	public static void setDontCares(int[] dontCares) {
		Tabulation.dontCares = dontCares;
	}

	public static void setVariableCount(int variableCount) {
		Tabulation.variableCount = variableCount;
	}

	public static List<List<List<int[]>>> getInitialGroups(){
		return initialGroups;
	}
	
	public static List<int[]> getEssentials(){
		return essentials;
	}
	
	public static String getPetrickRes() {
		return petrickRes;
	}
	
	public static List<List<List<List<int[]>>>> getStep1Table() {
		return step1Table;
	}

	public static List<List<int[]>> getStep2Table() {
		return step2Table;
	}
	
	public static int getMaxMintermCount() {
		Tabulation.maxMintermCount =  (int) Math.pow(2, variableCount);
		return maxMintermCount;
	}

	public static int[] getCombinedTerms() {
		return Utility.combineArr(minterms, dontCares);
	}
	


	public static void startTabulation() {
		initialize();
		getNeededInputs();
		prepInitialTable(getVariableCount(), getCombinedTerms());
		step1(getInitialGroups());
		setupStep2(getStep1Table());
		step2(getStep2Table());
		binaryToSOP(listOfPossible, getVariables());
	}
	
	public static void initialize() {
		variableCount = maxMintermCount = 0;
		minterms = dontCares = checklist = null;
		variables = null;
		initialGroups = new ArrayList<>();
		step1Table = new ArrayList<>();
		step2Table = new ArrayList<>();
		essentials = new ArrayList<>();
		setOfTermsAlreadyUsed = new HashSet<>();
		petrickRes = null;
		listOfPossible = new ArrayList<>();
	}

	public static void getNeededInputs() {
		Scanner scan = new Scanner(System.in);
		boolean inputState = true;

		while(inputState == true) {
			System.out.print("How many variables will be used (from 1 to 26 only): ");
			String inputVarCount = scan.nextLine();

			if(!Utility.isNumeric(inputVarCount)) {
				System.out.println("Invalid input. Please try again.");
			}
			else if(Integer.parseInt(inputVarCount) <= 0 || Integer.parseInt(inputVarCount) > 26) {
				System.out.println("Invalid input. Please try again.");
			}
			else {
				setVariableCount(Integer.parseInt(inputVarCount));
				inputState = false;
			}
		}
		getVariableAssignment(getVariableCount());
		inputState = true;
		int inputCounter = 0;
		int[] mintermList = Utility.initArray(getMaxMintermCount());
		System.out.println("For the minterms, you are allowed to enter numbers from 0 to " + (maxMintermCount - 1)
				+ ".");
		while(inputState == true) {
			if(inputCounter == maxMintermCount) {
				setMinterms(Utility.arraySorter(mintermList));
				System.out.println("The minterm list is already full.");
				
				return;
			}
			else {
				
				System.out.print("Enter the minterm (type x to stop): ");
				String inputMinterm = scan.nextLine();

				if(inputMinterm.equals("x")) {
					setMinterms(Utility.arraySorter(mintermList));
					break;
				}
				else if(!Utility.isNumeric(inputMinterm) || inputMinterm.equals("")) {
					System.out.println("Invalid minterm input. Please try again");
				}
				else if(Utility.isAlreadyThere(mintermList, Integer.parseInt(inputMinterm))) {
					System.out.println("Minterm already in the list. Please try again");
				}
				else if(Integer.parseInt(inputMinterm) < 0 || Integer.parseInt(inputMinterm) >= getMaxMintermCount()) {
					System.out.println("Invalid input. Please enter numbers from 0 to " + (getMaxMintermCount() - 1) + ".");
				}
				else {
					mintermList[inputCounter] = Integer.parseInt(inputMinterm);
					inputCounter++;
				}
			}

		}

		inputState = true;
		int dcCounter = 0;
		int[] dontCareList = Utility.initArray(getMaxMintermCount() - inputCounter);
		while(inputState == true) {
			if(inputCounter == maxMintermCount) {
				setDontCares(Utility.arraySorter(dontCareList));
				System.out.println("The list is already full.");
				
				return;
			}
			else {
				System.out.print("Enter the don't care (type x to stop): ");
				String inputDontCare = scan.nextLine();

				if(inputDontCare.equals("x")) {
					setDontCares(Utility.arraySorter(dontCareList));
					
					break;
				}
				else if(!Utility.isNumeric(inputDontCare) || inputDontCare.equals("")) {
					System.out.println("Invalid don't care input. Please try again");
				}
				else if(Utility.isAlreadyThere(dontCareList, Integer.parseInt(inputDontCare))) {
					System.out.println("Don't care already in the list. Please try again");
				}
				else if(Utility.isAlreadyThere(mintermList, Integer.parseInt(inputDontCare))) {
					System.out.println("Don't care already in the minterm list. Please try again");
				}
				else if(Integer.parseInt(inputDontCare) < 0 || Integer.parseInt(inputDontCare) >= getMaxMintermCount()) {
					System.out.println("Invalid input. Please enter numbers from 0 to " + (getMaxMintermCount() - 1) + ".");
				}
				else {
					dontCareList[dcCounter] = Integer.parseInt(inputDontCare);
					dcCounter++;
					inputCounter++;
				}
			}
		}

	}

	public static void getVariableAssignment(int varCount){
		variables = new char[varCount];
		Scanner scan = new Scanner(System.in);
		boolean inputState = true;
		while(inputState == true) {
			System.out.print("Do you want to customize the variable assignments? (y/n): ");
			String answer = scan.nextLine();
			switch (answer) {
			case "n":
				System.out.print("Do you want the variables to be UPPERCASE or lowercase? (u/l): ");
				String ans = scan.nextLine();
				char[] defaultVars = new char[26];
				boolean input = true;
				while(input == true) {
					switch (ans) {
					case "l":
						defaultVars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
						input = false;
						break;
					case "u":
						defaultVars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
						input = false;
						break;
					default:
						System.out.println("Invalid input.");
						break;
					}
				}
				for(int i = 0; i < variables.length; i++) {
					variables[i] = defaultVars[i];
				}
				inputState = false;
				break;
			case "y":
				int count = 0;
				while(count != varCount) {
					System.out.print("Variable assigned for position " + (count + 1) + ": ");
					String var = scan.nextLine();

					if(!Utility.isAlphabet(var)) System.out.println("Only enter alphabetic characters for variable assignments. Try again");
					else if(var.length() != 1) System.out.println("Enter exactly one character. Try again");
					else {
						char v = var.charAt(0);
						if(Utility.isCharAlreadyThere(variables, v)) {
							System.out.println("Variable already assigned. Try again.");
							System.out.println("Note: Uppercase and lowercase is considered the same in variable assignment");
						}
						else {
							variables[count] = v;
							count++;
						}
					}
				}
				inputState = false;
				break;
			default:
				System.out.println("Invalid input. Try again");
				break;
			}
		}
	}



	public static void prepInitialTable(int varCount, int[] minterms){

		List<List<int[]>> group = new ArrayList<>();
		for(int i = 0; i < Utility.getArraySize(minterms); i++) {
			List<int[]> row = new ArrayList<>();
			int[] indicator = new int[1];
			indicator[0] = -1;
			int[] decimal = new int[1];
			decimal[0] = minterms[i];
			int[] binary = Utility.convertDectoBin(minterms[i], varCount);
			row.add(indicator);
			row.add(decimal);
			row.add(binary);
			group.add(row);	
		}

		groupedInitialTable(group, varCount);
	}
	

	public static void groupedInitialTable(List<List<int[]>> ungrouped, int varCount) {
		for(int i = 0; i <= varCount; i++) {
			List<List<int[]>> group = new ArrayList<>();
			for(int j = 0; j < ungrouped.size(); j++) {
				int onesCount = Utility.count1s(ungrouped.get(j).get(2));
				if (onesCount == i) group.add(ungrouped.get(j));
				else continue;
			}
			if (group.size() != 0) initialGroups.add(group);
			else continue;
		}
	}

	public static void step1(List<List<List<int[]>>> groups) {

		if(groups.size() < 2) {
			step1Table.add(groups); 
			//Utility.showTable(getStep1Table());  //display
			return;

		}
		else {
			List<List<List<int[]>>> nextGroup = new ArrayList<>();

			for(int i = 0; i < groups.size(); i++) {
				List<List<int[]>> groupNew = new ArrayList<>();
				List<List<int[]>> current;
				List<List<int[]>> next;
				List<int[]> listOfBinaryCombs = new ArrayList<>();
				if(i < groups.size() - 1) {
					current = groups.get(i);
					next = groups.get(i + 1);
					for(int j = 0; j < current.size(); j++) {

						for(int k = 0; k < next.size(); k++) {

							if(Utility.is1Difference(current.get(j).get(2), next.get(k).get(2))) {
								List<int[]> rowNew = new ArrayList<>();
								int[] indicatorOn = new int[] {0};
								groups.get(i).get(j).set(0, indicatorOn);
								groups.get(i + 1).get(k).set(0, indicatorOn);

								int[] indicatorNew = new int[] {-1};
								int[] decimalNew = Utility.combineArr(current.get(j).get(1), next.get(k).get(1));
								int[] binaryNew = Utility.markedDifference(current.get(j).get(2), next.get(k).get(2));


								if(!Utility.alreadyThere(binaryNew, listOfBinaryCombs)) {
									listOfBinaryCombs.add(binaryNew);
									rowNew.add(indicatorNew);
									rowNew.add(decimalNew);
									rowNew.add(binaryNew);
								}


								if(rowNew.size() != 0) groupNew.add(rowNew);

							}
							else continue;
						}	
					}

				}
				else continue;
				if(groupNew.size() != 0) nextGroup.add(groupNew);
				else continue;
			}
			step1Table.add(groups);
			step1(nextGroup);
		}
	}



	public static void setupStep2(List<List<List<List<int[]>>>> table){

		for(int i = 0; i < table.size(); i++) {
			for(int j = 0; j < table.get(i).size(); j++) {
				for(int k = 0; k < table.get(i).get(j).size(); k++) {
					int[] indicator = table.get(i).get(j).get(k).get(0);
					for(int l = 0; l < indicator.length; l++) {
						if(indicator[l] == -1) {
							List<int[]> row = new ArrayList<>();
							int [] decimals = table.get(i).get(j).get(k).get(1);
							int [] binary = table.get(i).get(j).get(k).get(2);
							int [] minterms = getMinterms();
							int [] checklist = Utility.initArray(Utility.getArraySize(minterms));
							int [] indicatorNew = {-1};

							for(int m = 0; m < checklist.length; m++) {
								for(int n = 0; n < decimals.length; n++) {
									if(minterms[m] == decimals[n]) checklist[m] = 0;
									else continue;
								}
							}
							row.add(indicatorNew);
							row.add(decimals);
							row.add(binary);
							row.add(checklist);
							step2Table.add(row);

						}
					}
				}
			}
		}
		//Utility.display(step2Table); //display
	}

	public static void initChecklist() {
		checklist = Utility.initArray(Utility.getArraySize(minterms));
	}

	public static void step2(List<List<int[]>> table) {
		initChecklist();
		int[] counts = Utility.countChecks(table, Utility.getArraySize(getMinterms()));
		for(int i = 0; i < counts.length; i++) {
			if(counts[i] == 1) {
				checklist[i] = 0;
				for(int j = 0; j < table.size(); j++) {
					if(Utility.isAlreadyThere(table.get(j).get(1), minterms[i])) {
						table.get(j).get(0)[0] = 0;
					}
				}	
			}
		}
		List<List<int[]>> tableForOthers = new ArrayList<>();
		for(int i = 0; i < table.size(); i++) {
			if(table.get(i).get(0)[0] == -1) tableForOthers.add(table.get(i));
			else {
				essentials.add(table.get(i).get(2));
				int[] essentialMin = table.get(i).get(1);
				for(int j = 0; j < essentialMin.length; j++) {
					setOfTermsAlreadyUsed.add(essentialMin[j]);
				}
			}
		}
	
		int[] alreadyUsed = Utility.arraySorter(Utility.convertSetToIntArr(setOfTermsAlreadyUsed));
		int[] difference = Utility.findingDifference(minterms ,alreadyUsed);
	
		if(difference.length == 0) {
			listOfPossible.add(essentials);
	
			return;
		}
		else petrick(tableForOthers);
	}

	public static void petrick(List<List<int[]>> table) {
		
		char[] letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
		char[] labels = new char[table.size()];
		for(int i = 0; i < table.size(); i++) {
			labels[i] = letters[i];
		}
		
		List<String> toBeSimp = new ArrayList<>();
		int[] notUsed = Utility.findingDifference(minterms, Utility.convertSetToIntArr(setOfTermsAlreadyUsed));
		int[] index = new int[notUsed.length];
		int c = 0;
		for(int a = 0; a < notUsed.length; a++) {
			for(int b = 0; b < minterms.length; b++) {
				if(notUsed[a] == minterms[b]) {
					index[c] = b;
					c++;
				}
			}
		}
		
		for(int ind : index) {
			StringBuilder sb = new StringBuilder();
			for(int j = 0; j < table.size(); j++) {
				int[] checked = table.get(j).get(3);
				if(checked[ind] == 0) {
					sb.append(labels[j]);
					sb.append("+");
				}
			}
			sb.deleteCharAt(sb.toString().length() - 1);
			toBeSimp.add(sb.toString());
		}

		//System.out.println(toBeSimp); //display
		Collections.sort(toBeSimp, Collator.getInstance());
		if(toBeSimp.size() <= 1) {
			petrickRes = toBeSimp.get(0);
		}
		else {
			simplify(toBeSimp);
		}
		//System.out.println(petrickRes); //display
		String[] results = getPetrickRes().split("\\+");
		String[] additionals = shortestCombs(results);
		for(int k = 0; k < additionals.length; k++) {
			char[] indiv = new char[additionals[k].length()];
			int[] indx = new int[additionals[k].length()];
			indiv = additionals[k].toCharArray();
			for(int l = 0; l < indiv.length; l++) {
				for(int m = 0; m < labels.length; m++) {
					if(indiv[l] == labels[m]) indx[l] = m;
				}
			}
			
			List<int[]> essen = new ArrayList<>(getEssentials());
			for(int n = 0; n < indx.length; n++) {
				int[] addit = table.get(indx[n]).get(2);
				essen.add(addit);
			}
			listOfPossible.add(essen);
			
		}
		
	}
	
	
	public static String[] shortestCombs(String[] a) {
		int[] lengths = new int[a.length];
		int i = 0;
		for(String b : a) {
			lengths[i] = b.length();
			i++;
		}
		int min = Arrays.stream(lengths).min().getAsInt();
		List<Integer> indexes = new ArrayList<>();
		for(int j = 0; j < lengths.length; j++) {
			if(lengths[j] == min) indexes.add(j);
		}
		String[] shortest = new String[indexes.size()];
		for(int k = 0; k < indexes.size(); k++) {
			shortest[k] = a[indexes.get(k)];
		}
		return shortest;
		
	}
	public static String remove(String a) {
		String[] b = a.split("\\+");
		LinkedHashSet<String> c = new LinkedHashSet<>(Arrays.asList(b));
		String[] d = c.toArray(new String[c.size()]);
		StringBuilder sb = new StringBuilder();
		for(String e : d) {
			sb.append(e);
			sb.append("+");
		}
		sb.deleteCharAt(sb.toString().length() - 1);
		return sb.toString();
	}
	/**
	 * Simplifies a String of boolean expression by applying the
	 *  Absorptive Law of Boolean Algebra (A + AB = A).
	 * @param a - String of boolean expression
	 * @return - String of the simplified expression
	 */
	public static String absorp(String a) {
		String[] b = a.split("\\+");
		Arrays.sort(b, Comparator.comparingInt(String::length));
		
		int i = 0;
		for(int j = 1; j < b.length; j++) {
			if(j < b.length - 1) {
				if(b[i].length() == b[j].length()) i++;
				else break;
			}
		}
	
		StringBuilder sbL =new StringBuilder();
		StringBuilder sbH = new StringBuilder();
		for(int ind = 0; ind < b.length; ind++) {
			if(ind <= i) {
				sbL.append(b[ind]);
				sbL.append("+");
			}
			else {
				sbH.append(b[ind]);
				sbH.append("+");
			}
			
		}
		sbL.deleteCharAt(sbL.toString().length() - 1);
		sbH.deleteCharAt(sbH.toString().length() - 1);
		
		String low = sbL.toString();
		String high = sbH.toString();
		
		String[] e = low.split("\\+");
		String[] f = high.split("\\+");
		
		HashSet<String> absorbed = new HashSet<>();
		HashSet<String> intersection = new HashSet<>();
		for(String x : e) {
			for(String y : f) {
				if(!contain(x , y)) {
					if(absorbed.contains(y)) {
						absorbed.add(y);
						intersection.add(y);
					}
					else absorbed.add(y);
				}
			}
			intersection.add(x);
		}
		
		StringBuilder build = new StringBuilder();
		for(String x : intersection) {
			build.append(x);
			build.append("+");
		}
		build.deleteCharAt(build.toString().length() - 1);
		return build.toString();
	}
	public static boolean contain(String a, String b) {
		String[] c = a.split("");
		String[] d = b.split("");
		int i = 0;
		for(String e : c) {
			for(String f : d) {
				if(Objects.equals(e, f)) {
					i++;
					break;
				}
			}
		}
		if(i == c.length) return true;
		else return false;
		
	}

	public static void simplify(List<String> exp) {
		if(exp.size() <= 1) {
			String y = "";
			for(String x: exp) {
				y = remove(x);
			}
			String z = absorp(y);
			petrickRes = z;
			return;
		}
		else {
			List<String> simplified = new ArrayList<>();
			for(int i = 0; i < exp.size(); i+=2) {
				String a = exp.get(i);
				String b = "";
				if(i < exp.size() - 1) {
					b = exp.get(i + 1);
				}
				String c = simplifyInd(a, b);
				simplified.add(c);
			}
			//System.out.println(simplified); //display
			simplify(simplified);
		}
	}
	
	public static String simplifyInd(String a, String b) {
		if(b == "") return a;
		else {
			
			String[] c = a.split("\\+");
			String[] d = b.split("\\+");
			
			String[] e = new String[c.length * d.length];
			int i = 0;
			for(String f : c) {
				for(String g : d) {
					if(Objects.equals(f, g)) {
						e[i] = f;
						i++;
					}
					else {
						StringBuilder sb = new StringBuilder();
						sb.append(f);
						sb.append(g);
						char[] s = sb.toString().toCharArray();
						Arrays.sort(s);
						StringBuilder u = new StringBuilder();
						for(char t : s) {
							u.append(t);
						}
						e[i] = u.toString();
						i++;
					}
				}
			}
			
			for(int l = 0; l < e.length; l++) {
				e[l] = removeDup(e[l]);
			}
			
			StringBuilder sb = new StringBuilder();
			for(String h : e) {
				sb.append(h);
				sb.append("+");
			}
			sb.deleteCharAt(sb.toString().length() - 1);
			String simp = simplifyFurther(sb.toString()); 
			return simp;
		}
	}
	public static String removeDup(String a) {
		Set<Character> b = new HashSet<>();
		StringBuilder sb = new StringBuilder(a.length());
		
		for(int i = 0; i < a.length(); i++) {
			char ch = a.charAt(i);
			if(b.add(ch)) sb.append(ch);
		}
		
		return sb.toString();
	}
	
	public static String simplifyFurther(String a) {
		if(checkIfSimplest(a) == true) {
			return a;
		}
		else {
			List<String> l = new ArrayList<>();
			String[] b = a.split("\\+");
			Arrays.sort(b, Comparator.comparingInt(String::length));
			String c = b[0];
			String[] d = Arrays.copyOfRange(b, 1, b.length);
			for(String e : d) {
				if(e.contains(c)) {
					l.add(c);
				}
				else l.add(e);
			}
			StringBuilder sb = new StringBuilder();
			for(int i = 0; i < l.size(); i++) {
				sb.append(l.get(i));
				sb.append("+");
			}
			sb.deleteCharAt(sb.toString().length() - 1);
			
			return simplifyFurther(sb.toString());
		}
	}
	public static boolean checkIfSimplest(String a) {
		String[] b = a.split("\\+");
		Arrays.sort(b, Comparator.comparingInt(String::length));
		String c = b[0];
		String[] d = Arrays.copyOfRange(b, 1, b.length);
		for(String e : d) {
			if(e.contains(c)) return false;
		}
		return true;
	}
	
	/**
	 * Converts the combinations of binary in to their Sum of Products (SOP) form.
	 * @param combs - List of possible combinations of the minimized expression
	 * @param variables - Assigned variables per position
	 */
	public static void binaryToSOP(List<List<int[]>> combs, char[] variables) {
		System.out.println();
		System.out.println("Result of minimization:");
		List<String> listOfSOP = new ArrayList<>();
		for(int i = 0; i < combs.size(); i++) {
			StringBuilder sb = new StringBuilder();
			for(int j = 0; j < combs.get(i).size(); j++) {
				int[] bin = combs.get(i).get(j);
				int c = 0;
				for(int k: bin) {	
					if(k == 0) {
						sb.append(variables[c]);
						sb.append("'");
						c++;
					}
					else if(k == 1) {
						sb.append(variables[c]);
						c++;
					}
					else c++;

				}
				if(j != combs.get(i).size() - 1) sb.append(" + ");
			}
			listOfSOP.add(sb.toString());
			
		}
		printShortest(listOfSOP);
	}
	/**
	 * Compares the number of literals, and prints the expression/s with the lowest count.
	 * @param sop - List of SOP 
	 */
	public static void printShortest(List<String> sop) {
		List<Integer> len = new ArrayList<>();
		for(String a: sop) {
			int num = 0;
			for(int i = 0; i < a.length(); i++) {
				if(Character.isAlphabetic(a.charAt(i))) num++;
			}
			len.add(num);
		}
		
		int min = Collections.min(len);
		List<Integer> idx = new ArrayList<>();
		for(int l = 0; l < len.size(); l++) {
			if(min == len.get(l)) idx.add(l);
		}
		
		for(int d: idx) {
			System.out.println(sop.get(d));
		}
		
	}
}
