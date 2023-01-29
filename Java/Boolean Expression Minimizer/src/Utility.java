import java.util.*;
import java.util.stream.*;

public class Utility {

	public static boolean isNumeric(String input) {
		int counter = 0;
		for(int i = 0; i < input.length(); i++) {
			if(!Character.isDigit(input.charAt(i))) counter++;
			else continue;
		}
		if (counter != 0) return false;
		else return true;
	}

	public static boolean isAlphabet(String input) {
		int counter = 0;
		for(int i = 0; i < input.length(); i++) {
			if(!Character.isAlphabetic(input.charAt(i))) counter++;
			else continue;
		}
		if (counter == 0) return true;
		else return false;
	}

	public static boolean isAlreadyThere(int[] arr, int input) {
		int counter = 0;
		for(int i = 0; i < arr.length; i++) {
			if(arr[i] == input) counter++;
			else continue;
		}
		if (counter > 0) return true;
		else return false;
	}

	public static boolean isCharAlreadyThere(char[] arr, char input) {
		int counter = 0;
		for(int i = 0; i < arr.length; i++) {
			if(arr[i] == Character.toLowerCase(input) || arr[i] == Character.toUpperCase(input)) counter++;
			else continue;
		}
		if (counter > 0) return true;
		else return false;
	}

	public static boolean alreadyThere(int[] a, List<int[]> b){
		for(int i = 0; i < b.size(); i++) {
			int counter = 0;
			int[] c = b.get(i);
			for(int j = 0; j < elemCount(a); j++) {
				if(a[j] == c[j]) counter++;
			}
			if(counter == elemCount(a)) return true;
		}
		return false;
	}

	public static boolean is1Difference(int[] a, int[] b) {
		int counter = countDifference(a, b);
		if (counter == 1) return true;
		else return false;
	}

	public static int[] initArray(int size) {
		int[] arr = new int[size];
		for(int i = 0; i < arr.length; i++) {
			arr[i] = -1;
		}
		return arr;
	}

	public static int[] findingSimilar(int[] a, int[] b) {
		List<Integer> listSame = Arrays.stream(a).boxed().collect(Collectors.toList());
		List<Integer> otherList = Arrays.stream(b).boxed().collect(Collectors.toList());
		HashSet<Integer> setSame = new HashSet<>(listSame);
		setSame.retainAll(otherList);
		int[] same = new int[setSame.size()];
		int i = 0;
		for(int c: setSame) {
			same[i] = c;
			i++;
		}
		return same;
	}

	public static int[] findingDifference(int[] a, int[] b) {
		List<Integer> listDiff = Arrays.stream(a).boxed().collect(Collectors.toList());
		List<Integer> otherList = Arrays.stream(b).boxed().collect(Collectors.toList());
		listDiff.removeAll(otherList);
		int[] diff = new int[listDiff.size()];
		int i = 0;
		for(int c: listDiff) {
			diff[i] = c;
			i++;
		}
		return diff;
	}

	public static int[] convertSetToIntArr(Set<Integer> a) {
		return a.stream().mapToInt(Integer::intValue).toArray();
	}

	public static int[] convertDectoBin(int decimal, int varCount) {
		int[] binIntArr = new int[varCount];
		String binary = Integer.toBinaryString(decimal);
		int len = binary.length();
		String pad = "";
		while (len != varCount) {
			pad += "0";
			len++;
		}
		binary = pad += binary;
		String[] binStrArr =  binary.split("");
		for(int i = 0; i < binIntArr.length; i++) {
			binIntArr[i] = Integer.parseInt(binStrArr[i]);
		}
		return binIntArr;
	}

	public static int[] arraySorter(int[] arr) {
		int phase1[] = new int[getArraySize(arr)];
		for(int i = 0; i < phase1.length; i++) {
			phase1[i] = arr[i];
		}
		Arrays.sort(phase1);
		int phase2[] = initArray(getArraySize(arr));
		for(int i = 0; i < phase2.length; i++) {
			phase2[i] = phase1[i];
		}
		return phase2;
	}

	public static int[] countChecks(List<List<int[]>> a, int size) {
		int[] counterOfChecks = new int[size];
		for(int i = 0; i < a.size(); i++) {
			int[] eachChecklist = a.get(i).get(3);
			for(int j = 0; j < eachChecklist.length; j++) {
				if(eachChecklist[j] == 0) counterOfChecks[j]++;		
			}
		}
		return counterOfChecks;
	}

	public static int[] markedDifference(int[] a, int[] b){
		int[] marked = new int[a.length];
		for(int i = 0; i < a.length; i++) {
			if(a[i] == b[i]) marked[i] = a[i];
			else marked[i] = -1;
		}
		return marked;
	}
	/**
	 * Combines two int[] into a single sorted int[]. If either one of them is null, it will return the non-null
	 * int[].
	 * @param a
	 * @param b
	 * @return
	 * combined - sorted combination of the given arrays
	 */
	public static int[] combineArr(int[] a, int[] b) {
		if(a == null) return b;
		else if(b == null) return a;
		else {
			int[] combined = Arrays.copyOf(a, a.length + b.length);
			System.arraycopy(b, 0, combined, a.length, b.length);
			Arrays.sort(combined);
			return combined;
		}
	}
	/**
	 * Counts the non-'-1' element of the given int[].
	 * @param arr
	 * @return
	 * count - number of non-'-1' element
	 */
	public static int getArraySize(int[] arr) {
		int count = 0;
		for(int i = 0; i < arr.length; i++) {
			if(arr[i] != -1) count++;
			else continue;
		}
		return count;
	}

	/**
	 * Counts the number of '1' in a given int[].
	 * @param binary
	 * @return
	 * count - number of 1s present in binary
	 */
	public static int count1s(int[] binary) {
		int count = 0;
		for(int i = 0; i < binary.length; i++) {
			if(binary[i] == 1) count++;
			else continue;
		}
		return count;

	}
	/**
	 * Counts the number of different values at the same index of two int[].
	 * @param a 
	 * @param b 
	 * @return
	 * counter - number of different index
	 */
	public static int countDifference(int[] a, int[] b) {
		int len = elemCount(a);
		int counter = 0;
		for(int j = 0; j < len; j++) {
			if(b[j] != a[j]) counter++;
		}
		return counter;
	}

	/**
	 * Counts the number of elements in the given int[].
	 * @param a - given int[]
	 * @return len - number of elements
	 * 
	 */
	public static int elemCount(int[] a) {
		int len = 0;
		for(int i: a) {
			len++;
		}
		return len;
	}


	public static void display(List<List<int[]>> a) {
		for(int i = 0; i < a.size(); i++) {
			List<int[]> k = a.get(i);
			for(int l = 0; l < k.size(); l++) {
				int[] m = k.get(l);

				System.out.print(Arrays.toString(m) + " ");	
			}
			System.out.println();
		}
		System.out.println();
	}

	public static void showTable(List<List<List<List<int[]>>>> a) {
		System.out.println("---starttable---");
		for(List<List<List<int[]>>> b : a) {
			System.out.println("---startpart---");
			for(List<List<int[]>> c : b) {
				System.out.println("---startgroup---");
				for(List<int[]> d : c) {
					for(int [] e : d) {
						System.out.print(Arrays.toString(e) + " ");
					}
					System.out.println();
				}
				System.out.println("---endgroup---\n");
			}
			System.out.println("---endpart---\n");
		}
		System.out.println("---endtable---");
	}
}
