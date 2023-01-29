package application.model;

import javafx.beans.property.SimpleStringProperty;

//Data for the table
public class Data{
	
	private SimpleStringProperty D0;
	private SimpleStringProperty D1;
	private SimpleStringProperty D2;
	private SimpleStringProperty D3;
	private SimpleStringProperty D4;
	private SimpleStringProperty D5;
	private SimpleStringProperty D6;
	private SimpleStringProperty D7;
	private SimpleStringProperty D8;
	private SimpleStringProperty D9;
	private SimpleStringProperty D10;
	
	public Data() {
		D0 = D1 = D2 = D3 = D4 = D5 =
		D6 = D7 = D8 = D9 = D10 = null;
	}
	
	//11 cols
	public Data(String D0, String D1, String D2, String D3, String D4, String D5,
			String D6, String D7, String D8, String D9, String D10) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
		this.D5 = new SimpleStringProperty(D5);
		this.D6 = new SimpleStringProperty(D6);
		this.D7 = new SimpleStringProperty(D7);
		this.D8 = new SimpleStringProperty(D8);
		this.D9 = new SimpleStringProperty(D9);
		this.D10 = new SimpleStringProperty(D10);
	}
	
	//4 cols
	public Data(String D0, String D1, String D2, String D3) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
	}
	
	//5 cols
	public Data(String D0, String D1, String D2, String D3, String D4) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
	}
	
	//6 cols
	public Data(String D0, String D1, String D2, String D3, String D4, String D5) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
		this.D5 = new SimpleStringProperty(D5);
	}
	
	//7 cols
	public Data(String D0, String D1, String D2, String D3, String D4, String D5,
			String D6) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
		this.D5 = new SimpleStringProperty(D5);
		this.D6 = new SimpleStringProperty(D6);
	}
	
	//8 cols
	public Data(String D0, String D1, String D2, String D3, String D4, String D5,
			String D6, String D7) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
		this.D5 = new SimpleStringProperty(D5);
		this.D6 = new SimpleStringProperty(D6);
		this.D7 = new SimpleStringProperty(D7);
	}
	
	//9 cols
	public Data(String D0, String D1, String D2, String D3, String D4, String D5,
			String D6, String D7, String D8) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
		this.D5 = new SimpleStringProperty(D5);
		this.D6 = new SimpleStringProperty(D6);
		this.D7 = new SimpleStringProperty(D7);
		this.D8 = new SimpleStringProperty(D8);
	}
	
	public Data(String D0, String D1, String D2, String D3, String D4, String D5,
			String D6, String D7, String D8, String D9) {
		this.D0 = new SimpleStringProperty(D0);
		this.D1 = new SimpleStringProperty(D1);
		this.D2 = new SimpleStringProperty(D2);
		this.D3 = new SimpleStringProperty(D3);
		this.D4 = new SimpleStringProperty(D4);
		this.D5 = new SimpleStringProperty(D5);
		this.D6 = new SimpleStringProperty(D6);
		this.D7 = new SimpleStringProperty(D7);
		this.D8 = new SimpleStringProperty(D8);
		this.D9 = new SimpleStringProperty(D9);
	}
	
	public String getD0() {
		return D0.get();
	}
	
	public void setD0(String d0) {
		D0.set(d0);
	}
	
	public String getD1() {
		return D1.get();
	}
	
	public void setD1(String d1) {
		D1.set(d1);
	}
	
	public String getD2() {
		return D2.get();
	}
	
	public void setD2(String d2) {
		D2.set(d2);
	}
	
	public String getD3() {
		return D3.get();
	}
	
	public void setD3(String d3) {
		D3.set(d3);
	}
	
	public String getD4() {
		return D4.get();
	}
	
	public void setD4(String d4) {
		D4.set(d4);
	}
	
	public String getD5() {
		return D5.get();
	}
	
	public void setD5(String d5) {
		D5.set(d5);
	}
	
	public String getD6() {
		return D6.get();
	}
	
	public void setD6(String d6) {
		D6.set(d6);
	}
	
	public String getD7() {
		return D7.get();
	}
	
	public void setD7(String d7) {
		D7.set(d7);
	}
	
	public String getD8() {
		return D8.get();
	}
	
	public void setD8(String d8) {
		D8.set(d8);
	}
	
	public String getD9() {
		return D9.get();
	}
	
	public void setD9(String d9) {
		D9.set(d9);
	}
	
	public String getD10() {
		return D10.get();
	}
	
	public void setD10(String d10) {
		D10.set(d10);
	}
	
}
