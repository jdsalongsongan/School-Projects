import java.util.ArrayList;
import java.util.Iterator;

public class IntegerSet implements Iterable<int[]>{
	
	ArrayList<int[]> intset;
	
	public IntegerSet() {
		this.intset = new ArrayList<int[]>();
	}
	
	public void add(int[] i) {
		if(intset.isEmpty()) {
			intset.add(i);
		}
		else {
			//will only add if unique
			//will only work on int[2]
			boolean willAdd = true;
			for(int[] j: intset) {
				boolean[] flags = new boolean[i.length];
				for(int m = 0; m < flags.length; m++) {
					flags[m] = false;
				}
				for(int k = 0; k < i.length; k++) {
					if(i[k] == j[k]) flags[k] = true;
				}
				
				if(flags[0] == true && flags[1] == true) {
					willAdd = false;
					break;
				}
			}
			if(willAdd) intset.add(i);
		}
	}

	@Override
	public Iterator<int[]> iterator() {
		return intset.iterator();
	}
	
}