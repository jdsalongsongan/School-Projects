package application.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import application.InfixToPostfix;
import application.LinkedStack;
import application.exceptions.DuplicateAssignmentException;
import application.exceptions.InvalidEquationException;
import application.exceptions.InvalidVariableException;
import application.exceptions.MissingFieldException;
import application.exceptions.StackEmptyException;
import application.model.Data;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ButtonType;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.StackPane;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.scene.control.Alert.AlertType;


public class MenuController {

	@FXML
	public ChoiceBox<String> ffType; //T,D,RS,JK

	@FXML
	private ChoiceBox<Integer> numFF; //1,2

	@FXML
	private ChoiceBox<Integer> numIV; //1,2

	@FXML
	private ChoiceBox<Integer> numOV; //0,1

	@FXML
	private Button proceedButton;

	@FXML
	private TextField FlipFlop1;

	@FXML
	private TextField FlipFlop2;

	@FXML
	private TextField FlipFlop3;

	@FXML
	private TextField FlipFlop4;

	@FXML
	private TextField InputVar1;

	@FXML
	private TextField InputVar2;

	@FXML
	private TextField StateVar1;

	@FXML
	private TextField StateVar2;

	@FXML
	private TextField OutputVar;

	@FXML
	private TextField OutputEq;

	@FXML
	private Button setButton;

	@FXML
	private Button resetButton;

	@FXML
	public void initialize() {
		ffType.getItems().addAll("T", "D", "RS", "JK");
		numFF.getItems().addAll(1, 2);
		numIV.getItems().addAll(1, 2);
		numOV.getItems().addAll(0, 1);
	}

	private String FlipFlop;
	private int FlipFlopCount;
	private int InputCount;
	private int OutputCount;

	@FXML
	public void selectionMade() {
		resetUserTypedOnly();
		try {
			if(ffType.getValue() == null || numFF.getValue() == null ||
					numIV.getValue() == null || numOV.getValue() == null) throw new MissingFieldException();
			setFlipFlop(ffType.getValue());
			setFlipFlopCount(numFF.getValue() * ffType.getValue().length());
			setInputCount(numIV.getValue());
			setOutputCount(numOV.getValue());

			if(numFF.getValue() == 1) {
				StateVar1.setVisible(true);
				StateVar1.setDisable(false);
				StateVar2.setVisible(false);
				StateVar2.setDisable(true);
				StateVar1.setPromptText("State Variable 1");
			}
			else if(numFF.getValue() == 2) {
				StateVar1.setVisible(true);
				StateVar1.setDisable(false);
				StateVar2.setVisible(true);
				StateVar2.setDisable(false);
				StateVar1.setPromptText("State Variable 1");
				StateVar2.setPromptText("State Variable 2");
			}

			if(getFlipFlopCount() == 1) {
				FlipFlop1.setVisible(true);
				FlipFlop1.setDisable(false);
				FlipFlop2.setVisible(false);
				FlipFlop2.setDisable(true);
				FlipFlop3.setVisible(false);
				FlipFlop3.setDisable(true);
				FlipFlop4.setVisible(false);
				FlipFlop4.setDisable(true);
				if(getFlipFlop().equals("T")) FlipFlop1.setPromptText("Equation of T");
				else if(getFlipFlop().equals("D")) FlipFlop1.setPromptText("Equation of D");
			}
			else if(getFlipFlopCount() == 2) {
				FlipFlop1.setVisible(true);
				FlipFlop1.setDisable(false);
				FlipFlop2.setVisible(true);
				FlipFlop2.setDisable(false);
				FlipFlop3.setVisible(false);
				FlipFlop3.setDisable(true);
				FlipFlop4.setVisible(false);
				FlipFlop4.setDisable(true);
				if(getFlipFlop().equals("T")) {
					FlipFlop1.setPromptText("Equation of T1");
					FlipFlop2.setPromptText("Equation of T2");
				}
				else if(getFlipFlop().equals("D")) {
					FlipFlop1.setPromptText("Equation of D1");
					FlipFlop2.setPromptText("Equation of D2");
				}
				else if(getFlipFlop().equals("RS")) {
					FlipFlop1.setPromptText("Equation of S");
					FlipFlop2.setPromptText("Equation of R");
				}
				else if(getFlipFlop().equals("JK")) {
					FlipFlop1.setPromptText("Equation of J");
					FlipFlop2.setPromptText("Equation of K");
				}
			}
			else if(getFlipFlopCount() == 4) {
				FlipFlop1.setVisible(true);
				FlipFlop1.setDisable(false);
				FlipFlop2.setVisible(true);
				FlipFlop2.setDisable(false);
				FlipFlop3.setVisible(true);
				FlipFlop3.setDisable(false);
				FlipFlop4.setVisible(true);
				FlipFlop4.setDisable(false);
				if(getFlipFlop().equals("RS")) {
					FlipFlop1.setPromptText("Equation of S1");
					FlipFlop2.setPromptText("Equation of R1");
					FlipFlop3.setPromptText("Equation of S2");
					FlipFlop4.setPromptText("Equation of R2");
				}
				else if(getFlipFlop().equals("JK")) {
					FlipFlop1.setPromptText("Equation of J1");
					FlipFlop2.setPromptText("Equation of K1");
					FlipFlop3.setPromptText("Equation of J2");
					FlipFlop4.setPromptText("Equation of K2");

				}
			}

			if(getInputCount() == 1) {
				InputVar1.setVisible(true);
				InputVar1.setDisable(false);
				InputVar2.setVisible(false);
				InputVar2.setDisable(true);
				InputVar1.setPromptText("Input Variable 1");
			}
			else if(getInputCount() == 2) {
				InputVar1.setVisible(true);
				InputVar1.setDisable(false);
				InputVar2.setVisible(true);
				InputVar2.setDisable(false);
				InputVar1.setPromptText("Input Variable 1");
				InputVar2.setPromptText("Input Variable 2");
			}

			if(getOutputCount() == 1) {
				OutputVar.setVisible(true);
				OutputVar.setDisable(false);
				OutputEq.setVisible(true);
				OutputEq.setDisable(false);

				OutputVar.setPromptText("Output Variable");
				OutputEq.setPromptText("Output Equation");
			}
			else {
				OutputVar.setVisible(false);
				OutputVar.setDisable(true);
				OutputEq.setVisible(false);
				OutputEq.setDisable(true);
			}

		} catch(MissingFieldException e) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Missing information");
			alert.setContentText("Please fill all the information needed before pressing \"Set\".");
			alert.showAndWait();
		}

	}

	private List<String> varAssignments;

	@FXML
	public void proceedToTable() {
		varAssignments = new ArrayList<>();
		try {
			if(numFF.getValue() == 1) {
				if(StateVar1.getText().equals("")) throw new MissingFieldException();
				if(!isVarValid(StateVar1.getText())) throw new InvalidVariableException(); 
				else getVarAssignments().add(StateVar1.getText().replace(" ", "").toUpperCase());
			}
			else if(numFF.getValue() == 2) {
				if(StateVar1.getText().equals("") || StateVar2.getText().equals("")) throw new MissingFieldException();

				if(!isVarValid(StateVar1.getText()) || !isVarValid(StateVar2.getText())) throw new InvalidVariableException();
				else {
					getVarAssignments().add(StateVar1.getText().replace(" ", "").toUpperCase());
					getVarAssignments().add(StateVar2.getText().replace(" ", "").toUpperCase());
				}
			}
			if(getFlipFlopCount() == 1) {
				if(FlipFlop1.getText().equals("")) throw new MissingFieldException();
			}
			else if(getFlipFlopCount() == 2) {
				if(FlipFlop1.getText().equals("")|| FlipFlop2.getText().equals("")) throw new MissingFieldException();
			}
			else if(getFlipFlopCount() == 4) {
				if(FlipFlop1.getText().equals("") || FlipFlop2.getText().equals("")
						||  FlipFlop3.getText().equals("") ||  FlipFlop4.getText().equals("")) throw new MissingFieldException();
			}
			if(getInputCount() == 1) {
				if(InputVar1.getText().equals("")) throw new MissingFieldException();
				if(!isVarValid(InputVar1.getText())) throw new InvalidVariableException();
				else getVarAssignments().add(InputVar1.getText().replace(" ", "").toUpperCase());
			}
			else if(getInputCount() == 2) {
				if(InputVar1.getText().equals("") || InputVar2.getText().equals("")) throw new MissingFieldException();
				if(!isVarValid(InputVar1.getText()) || !isVarValid(InputVar2.getText())) throw new InvalidVariableException();
				else {
					getVarAssignments().add(InputVar1.getText().replace(" ", "").toUpperCase());
					getVarAssignments().add(InputVar2.getText().replace(" ", "").toUpperCase());
				}

			}
			if(getOutputCount() == 1) {
				if(OutputVar.getText().equals("") || OutputEq.getText().equals("")) throw new MissingFieldException();
				if(!isVarValid(OutputVar.getText())) throw new InvalidVariableException();
				else {
					getVarAssignments().add(OutputVar.getText().replace(" ", "").toUpperCase());
				}
			}

			HashSet<String> assigned = new HashSet<>(getVarAssignments());
			if(assigned.size() < getVarAssignments().size()) throw new DuplicateAssignmentException();


			if(getFlipFlopCount() == 1) {
				if(!isEqValid(FlipFlop1.getText())) throw new InvalidEquationException();
			}
			else if(getFlipFlopCount() == 2) {
				if(!isEqValid(FlipFlop1.getText()) || !isEqValid(FlipFlop2.getText())) throw new InvalidEquationException();
			}
			else if(getFlipFlopCount() == 4) {
				if(!isEqValid(FlipFlop1.getText()) || !isEqValid(FlipFlop2.getText()) ||
						!isEqValid(FlipFlop3.getText()) || !isEqValid(FlipFlop4.getText())) throw new InvalidEquationException();
			}
			if(getOutputCount() == 1) {
				if(!isEqValid(OutputEq.getText())) throw new InvalidEquationException();
			}
			
			try {
			fillTable();
			createTable();
			}catch(Exception e) {
				Alert alert = new Alert(AlertType.ERROR);
				alert.setTitle("Error");
				alert.setHeaderText("Invalid Information");
				alert.setContentText("There might be some invalid information in the input. "
						+ "Please check the format of your data before pressing "
						+ "\"Proceed\".");
				alert.showAndWait();
			}

		}catch(MissingFieldException e) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Missing information");
			alert.setContentText("Please fill all the information needed before pressing \"Proceed\".");
			alert.showAndWait();
		}catch(InvalidVariableException e) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Invalid Variable");
			alert.setContentText("Please check the format of variables entered. For more information, ple"
					+ "ase check the User's Manual.");
			alert.showAndWait();
		}catch(InvalidEquationException e) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Invalid Equation");
			alert.setContentText("Please check the equation entered. For more information, ple"
					+ "ase check the User's Manual.");
			alert.showAndWait();
		}catch(DuplicateAssignmentException e) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Duplicate Variable Assignment");
			alert.setContentText("Please check the variables entered. Make sure that each variable is unique.");
			alert.showAndWait();
		}catch(NullPointerException e) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setTitle("Error");
			alert.setHeaderText("Missing information");
			alert.setContentText("Please set the needed information and fill the fields before pressing"
					+ "\"Proceed\".");
			alert.showAndWait();
		}
	}

	protected List<List<String>> Table;
	protected List<String> Used;
	public void fillTable() {
		List<String> S1 = null, 
				S2 = null,
				I1 = null,
				I2 = null,
				NS1  = null,
				NS2  = null,
				O  = null,
				F1  = null,
				F2  = null,
				F3  = null,
				F4 = null;
		String EqO = null,
				EqF1 = null,
				EqF2 = null,
				EqF3 = null,
				EqF4 = null;
		int size = (int) Math.pow(2, numFF.getValue() + numIV.getValue());
		if(getFlipFlop().equals("T") || getFlipFlop().equals("D")) {
			if(numFF.getValue() == 1) {
				S1 = new ArrayList<>();
				F1 = new ArrayList<>();
				NS1 = new ArrayList<>();
				for(int i = 0; i < size; i++) {
					if(i < size/2) S1.add(Integer.toString(0));
					else S1.add(Integer.toString(1));
				}
				EqF1 = FlipFlop1.getText();
				EqF1 = capEq(EqF1);
				InfixToPostfix postF1 = new InfixToPostfix(transform(EqF1));
				EqF1 = postF1.convertToPostFix();
			}
			else {
				S1 = new ArrayList<>();
				S2 = new ArrayList<>();
				F1 = new ArrayList<>();
				F2 = new ArrayList<>();
				NS1 = new ArrayList<>();
				NS2 = new ArrayList<>();
				for(int i = 0; i < size; i++) {
					if(i < size/2) S1.add(Integer.toString(0));
					else S1.add(Integer.toString(1));
				}
				for(int i = 0; i < size; i++) {
					if(i < size/2) {
						if(i < size/4) S2.add(Integer.toString(0));
						else S2.add(Integer.toString(1));
					}
					else {
						if(i < ((3*size)/4)) S2.add(Integer.toString(0));
						else S2.add(Integer.toString(1));
					}
				}
				EqF1 = FlipFlop1.getText();
				EqF2 = FlipFlop2.getText();
				EqF1 = capEq(EqF1);
				EqF2 = capEq(EqF2);

				InfixToPostfix postF1 = new InfixToPostfix(transform(EqF1));
				EqF1 = postF1.convertToPostFix();
				InfixToPostfix postF2 = new InfixToPostfix(transform(EqF2));
				EqF2 = postF2.convertToPostFix();
			}
		}
		else {
			if(numFF.getValue() == 1) {
				S1 = new ArrayList<>();
				F1 = new ArrayList<>();
				F2 = new ArrayList<>();
				NS1 = new ArrayList<>();

				for(int i = 0; i < size; i++) {
					if(i < size/2) S1.add(Integer.toString(0));
					else S1.add(Integer.toString(1));
				}
				EqF1 = FlipFlop1.getText();
				EqF2 = FlipFlop2.getText();
				EqF1 = capEq(EqF1);
				EqF2 = capEq(EqF2);

				InfixToPostfix postF1 = new InfixToPostfix(transform(EqF1));
				EqF1 = postF1.convertToPostFix();
				InfixToPostfix postF2 = new InfixToPostfix(transform(EqF2));
				EqF2 = postF2.convertToPostFix();
			}
			else {
				S1 = new ArrayList<>();
				S2 = new ArrayList<>();
				F1 = new ArrayList<>();
				F2 = new ArrayList<>();
				F3 = new ArrayList<>();
				F4 = new ArrayList<>();
				NS1 = new ArrayList<>();
				NS2 = new ArrayList<>();

				for(int i = 0; i < size; i++) {
					if(i < size/2) S1.add(Integer.toString(0));
					else S1.add(Integer.toString(1));
				}
				for(int i = 0; i < size; i++) {
					if(i < size/2) {
						if(i < size/4) S2.add(Integer.toString(0));
						else S2.add(Integer.toString(1));
					}
					else {
						if(i < ((3*size)/4)) S2.add(Integer.toString(0));
						else S2.add(Integer.toString(1));
					}
				}
				EqF1 = FlipFlop1.getText();
				EqF2 = FlipFlop2.getText();
				EqF3 = FlipFlop3.getText();
				EqF4 = FlipFlop4.getText();
				EqF1 = capEq(EqF1);
				EqF2 = capEq(EqF2);
				EqF3 = capEq(EqF3);
				EqF4 = capEq(EqF4);

				InfixToPostfix postF1 = new InfixToPostfix(transform(EqF1));
				EqF1 = postF1.convertToPostFix();
				InfixToPostfix postF2 = new InfixToPostfix(transform(EqF2));
				EqF2 = postF2.convertToPostFix();
				InfixToPostfix postF3 = new InfixToPostfix(transform(EqF3));
				EqF3 = postF3.convertToPostFix();
				InfixToPostfix postF4 = new InfixToPostfix(transform(EqF4));
				EqF4 = postF4.convertToPostFix();
			}


		}

		if(getInputCount() == 1) {
			I1 = new ArrayList<>();
			if(getFlipFlopCount() == 1) {
				for(int i = 0; i < size; i++) {
					if(i < size/2) {
						if(i < size/4) I1.add(Integer.toString(0));
						else I1.add(Integer.toString(1));
					}
					else {
						if(i < ((3*size)/4)) I1.add(Integer.toString(0));
						else I1.add(Integer.toString(1));
					}
				}
			}
			else {
				for(int i = 0; i < size; i++) {
					if(i % 2 == 0) I1.add(Integer.toString(0));
					else I1.add(Integer.toString(1));
				}
			}
		}
		else {
			I1 = new ArrayList<>();
			I2 = new ArrayList<>();
			if(numFF.getValue() == 1) {
				for(int i = 0; i < size; i++) {
					if(i < size/2) {
						if(i < size/4) I1.add(Integer.toString(0));
						else I1.add(Integer.toString(1));
					}
					else {
						if(i < ((3*size)/4)) I1.add(Integer.toString(0));
						else I1.add(Integer.toString(1));
					}
				}
				for(int i = 0; i < size; i++) {
					if(i % 2 == 0) I2.add(Integer.toString(0));
					else I2.add(Integer.toString(1));
				}
			}
			else {
				for(int i = 0; i < size; i++) {
					if(i < size/2) {
						if(i < size/4) {
							if(i < size/8) I1.add(Integer.toString(0));
							else I1.add(Integer.toString(1));
						}
						else {
							if(i < ((3*size)/8)) I1.add(Integer.toString(0));
							else I1.add(Integer.toString(1));
						}
					}
					else {
						if(i < ((3*size)/4)) {
							if(i < ((5*size)/8)) I1.add(Integer.toString(0));
							else I1.add(Integer.toString(1));
						}
						else {
							if(i < ((7*size)/8)) I1.add(Integer.toString(0));
							else I1.add(Integer.toString(1));
						}
					}
				}
				for(int i = 0; i < size; i++) {
					if(i % 2 == 0) I2.add(Integer.toString(0));
					else I2.add(Integer.toString(1));
				}
			}
		}

		if(getOutputCount() == 1) {
			O = new ArrayList<>();
			EqO = OutputEq.getText();
			EqO = capEq(EqO);
			InfixToPostfix postO = new InfixToPostfix(transform(EqO));
			EqO = postO.convertToPostFix();
		}

		//filling flipflop column
		List<String> assignments = new ArrayList<>();
		assignments.add(StateVar1.getText().replace(" ", "").toUpperCase());
		assignments.add(StateVar2.getText().replace(" ", "").toUpperCase());
		assignments.add(InputVar1.getText().replace(" ", "").toUpperCase());
		assignments.add(InputVar2.getText().replace(" ", "").toUpperCase());
		List<List<String>> vals = new ArrayList<>();
		vals.add(S1);
		vals.add(S2);
		vals.add(I1);
		vals.add(I2);
		

		if(getFlipFlopCount() == 1) {
			F1 = solve(assignments, vals, EqF1, size);
		}
		else if(getFlipFlopCount() == 2) {
			F1 = solve(assignments, vals, EqF1, size);
			F2 = solve(assignments, vals, EqF2, size);
		}
		else if(getFlipFlopCount() == 4) {
			F1 = solve(assignments, vals, EqF1, size);
			F2 = solve(assignments, vals, EqF2, size);
			F3 = solve(assignments, vals, EqF3, size);
			F4 = solve(assignments, vals, EqF4, size);
		}

		if(getOutputCount() == 1) O = solve(assignments, vals, EqO, size);

		//filling up nextState
		if(ffType.getValue().equals("T")) {
			for(int i = 0; i < S1.size(); i++) {
				if(F1.get(i).equals("0")) NS1.add(S1.get(i));
				else {
					String nstate = "";
					if(S1.get(i).equals("0")) nstate = "1";
					else nstate = "0";
					NS1.add(nstate);
				}
			}
			if(numFF.getValue() == 2) {
				for(int i = 0; i < S2.size(); i++) {
					if(F2.get(i).equals("0")) NS2.add(S2.get(i));
					else {
						String nstate = "";
						if(S2.get(i).equals("0")) nstate = "1";
						else nstate = "0";
						NS2.add(nstate);
					}
				}
			}
		}
		else if(ffType.getValue().equals("D")) {
			NS1 = F1;
			if(numFF.getValue() == 2) {
				NS2 = F2;
			}
		}
		else if(ffType.getValue().equals("RS")) {
			for(int i = 0; i < S1.size(); i++) {
				//ff1 = s ff, ff2 = r ff
				if(F1.get(i).equals("0")) {
					if(F2.get(i).equals("0")) {
						NS1.add(S1.get(i));
					}
					else {
						NS1.add("0");
					}
				}
				else {
					if(F2.get(i).equals("0")) {
						NS1.add("1");
					}
					else {
						NS1.add("?");
					}

				}
			}
			if(numFF.getValue() == 2) {
				for(int i = 0; i < S2.size(); i++) {
					//ff3 = s2 ff, ff4 = r2 ff
					if(F3.get(i).equals("0")) {
						if(F4.get(i).equals("0")) {
							NS2.add(S2.get(i));
						}
						else {
							NS2.add("0");
						}
					}
					else {
						if(F4.get(i).equals("0")) {
							NS2.add("1");
						}
						else {
							NS2.add("?");
						}

					}
				}
			}
		}
		else {
			for(int i = 0; i < S1.size(); i++) {
				//ff1 = s ff, ff2 = r ff
				if(F1.get(i).equals("0")) {
					if(F2.get(i).equals("0")) {
						NS1.add(S1.get(i));
					}
					else {
						NS1.add("0");
					}
				}
				else {
					if(F2.get(i).equals("0")) {
						NS1.add("1");
					}
					else {
						if(S1.get(i).equals("0")) NS1.add("1");
						else NS1.add("0");
					}

				}
			}
			if(numFF.getValue() == 2) {
				for(int i = 0; i < S2.size(); i++) {
					//ff3 = s2 ff, ff4 = r2 ff
					if(F3.get(i).equals("0")) {
						if(F4.get(i).equals("0")) {
							NS2.add(S2.get(i));
						}
						else {
							NS2.add("0");
						}
					}
					else {
						if(F4.get(i).equals("0")) {
							NS2.add("1");
						}
						else {
							if(S2.get(i).equals("0")) NS2.add("1");
							else NS2.add("0");
						}

					}
				}
			}
		}
		Table = new ArrayList<>();
		Used = new ArrayList<>();
		if(S1 != null) {
			Table.add(S1);
			Used.add("S1");
		}
		if(S2 != null) {
			Table.add(S2);
			Used.add("S2");
		}
		if(I1 != null) {
			Table.add(I1);
			Used.add("I1");
		}
		if(I2 != null) {
			Table.add(I2);
			Used.add("I2");
		}
		if(NS1 != null) {
			Table.add(NS1);
			Used.add("NS1");
		}
		if(NS2 != null) {
			Table.add(NS2);
			Used.add("NS2");
		}
		if(O != null) {
			Table.add(O);
			Used.add("O");
		}
		if(F1 != null) {
			Table.add(F1);
			Used.add("F1");
		}
		if(F2 != null) {
			Table.add(F2);
			Used.add("F2");
		}
		if(F3 != null) {
			Table.add(F3);
			Used.add("F3");
		}
		if(F4 != null) {
			Table.add(F4);
			Used.add("F4");
		}
	}

	private String capEq(String eq) {
		String neq = "";
		char[] eqa = eq.toCharArray();
		for(char e: eqa) {
			if(Character.isAlphabetic(e)) {
				neq = neq + Character.toUpperCase(e);
			}
			else neq = neq + e;
		}
		neq = neq.replace(" ", "");
		return neq;
	}

	private List<String> solve(List<String> asgn, List<List<String>> vals, String eq, int size){
		List<String> res = new ArrayList<>();
		if(eq.equals("1")) for(int i = 0; i < size; i++) res.add("1");
		else if(eq.equals("0")) for(int i = 0; i < size; i++) res.add("0");
		else {
			try {
				String[] eqN = eq.split(" ");
				LinkedStack opStack = new LinkedStack();
				int idx = 0;
				String p = "";
				for(int i = 0; i < size; i++) {
					for(int j = 0; j < eqN.length; j++) {
						if(isStrAlpha(eqN[j])) {
							idx = asgn.indexOf(eqN[j]);
							p = vals.get(idx).get(i);
							opStack.push(p);
						}
						else {
							if(eqN[j].equals("\'")) {
								String x = (String) opStack.pop();
								if(x.equals("0")) x = "1";
								else x = "0";
								opStack.push(x);
							}
							else if(eqN[j].equals("*")) {
								String x = (String) opStack.pop();
								String y = (String) opStack.pop();
								String z = "";
								if(x.equals("0") || y.equals("0")) z = "0";
								else z = "1";
								opStack.push(z);
							}
							else if(eqN[j].equals("+")) {
								String x = (String) opStack.pop();
								String y = (String) opStack.pop();
								String z = "";
								if(x.equals("1") || y.equals("1")) z = "1";
								else z = "0";
								opStack.push(z);
							}
							else if(eqN[j].equals("^")) {
								String x = (String) opStack.pop();
								String y = (String) opStack.pop();
								String z = "";
								if(x.equals(y)) z = "0";
								else z = "1";
								opStack.push(z);
							}
						}
					}
					res.add((String) opStack.pop());
				}


			}catch(Exception e) {

			}
		}
		return res;
	}

	private boolean isStrAlpha(String a) {
		char[] b = a.toCharArray();

		for(char c : b) if(!Character.isAlphabetic(c)) return false;

		return true;
	}

	@SuppressWarnings("unchecked")
	public void createTable() {
		TableView<Data> table = new TableView<Data>();
		table.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY);
		TableColumn<Data, String> statecol = new TableColumn<Data, String>("Current State");
		TableColumn<Data, String> stateAcol = new TableColumn<Data, String>(StateVar1.getText());
		TableColumn<Data, String> stateBcol = new TableColumn<Data, String>(StateVar2.getText());
		statecol.setEditable(false);
		statecol.setSortable(false);
		stateAcol.setEditable(false);
		stateAcol.setSortable(false);
		stateBcol.setEditable(false);
		stateBcol.setSortable(false);

		statecol.setMinWidth(161.81);
		stateAcol.setMinWidth(80.9);
		stateBcol.setMinWidth(80.9);


		TableColumn<Data, String> inputcol = new TableColumn<Data, String>("Input");
		TableColumn<Data, String> inputAcol = new TableColumn<Data, String>(InputVar1.getText());
		TableColumn<Data, String> inputBcol = new TableColumn<Data, String>(InputVar2.getText());
		inputcol.setEditable(false);
		inputcol.setSortable(false);
		inputAcol.setEditable(false);
		inputAcol.setSortable(false);
		inputBcol.setEditable(false);
		inputBcol.setSortable(false);

		inputcol.setMinWidth(161.81);
		inputAcol.setMinWidth(80.9);
		inputBcol.setMinWidth(80.9);

		TableColumn<Data, String> nstatecol = new TableColumn<Data, String>("Next State");
		TableColumn<Data, String> nstateAcol = new TableColumn<Data, String>(StateVar1.getText());
		TableColumn<Data, String> nstateBcol = new TableColumn<Data, String>(StateVar2.getText());
		nstatecol.setEditable(false);
		nstatecol.setSortable(false);
		nstateAcol.setEditable(false);
		nstateAcol.setSortable(false);
		nstateBcol.setEditable(false);
		nstateBcol.setSortable(false);

		nstatecol.setMinWidth(161.81);
		nstateAcol.setMinWidth(80.9);
		nstateBcol.setMinWidth(80.9);

		TableColumn<Data, String> outputcol = new TableColumn<Data, String>("Output");
		TableColumn<Data, String> outputAcol = new TableColumn<Data, String>(OutputVar.getText());
		outputcol.setEditable(false);
		outputcol.setSortable(false);
		outputAcol.setEditable(false);
		outputAcol.setSortable(false);


		outputcol.setMinWidth(80.9);
		outputAcol.setMinWidth(80.9);


		TableColumn<Data, String> ffcol = new TableColumn<Data, String>("Flip Flop Input");
		TableColumn<Data, String> ffAcol = new TableColumn<Data, String>();
		TableColumn<Data, String> ffBcol = new TableColumn<Data, String>();
		TableColumn<Data, String> ffCcol = new TableColumn<Data, String>();
		TableColumn<Data, String> ffDcol = new TableColumn<Data, String>();
		ffcol.setEditable(false);
		ffcol.setSortable(false);
		ffAcol.setEditable(false);
		ffAcol.setSortable(false);
		ffBcol.setEditable(false);
		ffBcol.setSortable(false);
		ffCcol.setEditable(false);
		ffCcol.setSortable(false);
		ffDcol.setEditable(false);
		ffDcol.setSortable(false);

		ffcol.setMinWidth(323.63);
		ffAcol.setMinWidth(80.9);
		ffBcol.setMinWidth(80.9);
		ffCcol.setMinWidth(80.9);
		ffDcol.setMinWidth(80.9);

		for(int i = 0; i < Used.size(); i++) {
			if(Used.get(i).equals("S1")) statecol.getColumns().add(stateAcol);
			else if(Used.get(i).equals("S2")) statecol.getColumns().add(stateBcol);
			else if(Used.get(i).equals("I1")) inputcol.getColumns().add(inputAcol);
			else if(Used.get(i).equals("I2")) inputcol.getColumns().add(inputBcol);
			else if(Used.get(i).equals("NS1")) nstatecol.getColumns().add(nstateAcol);
			else if(Used.get(i).equals("NS2")) nstatecol.getColumns().add(nstateBcol);
			else if(Used.get(i).equals("O")) outputcol.getColumns().add(outputAcol);
			else {
				if(ffType.getValue().equals("T")) {
					if(Used.get(i).equals("F1")) {
						ffAcol.setText("T" + StateVar1.getText());
						ffcol.getColumns().add(ffAcol);
					}
					else if(Used.get(i).equals("F2")) {
						ffBcol.setText("T" + StateVar2.getText());
						ffcol.getColumns().add(ffBcol);
					}
				}
				else if(ffType.getValue().equals("D")){
					if(Used.get(i).equals("F1")) {
						ffAcol.setText("D" + StateVar1.getText());
						ffcol.getColumns().add(ffAcol);
					}
					else if(Used.get(i).equals("F2")) {
						ffBcol.setText("D" + StateVar2.getText());
						ffcol.getColumns().add(ffBcol);
					}
				}
				else if(ffType.getValue().equals("RS")) {
					if(Used.get(i).equals("F1")) {
						ffAcol.setText("S" + StateVar1.getText());
						ffcol.getColumns().add(ffAcol);
					}
					else if(Used.get(i).equals("F2")) {
						ffBcol.setText("R" + StateVar1.getText());
						ffcol.getColumns().add(ffBcol);
					}
					else if(Used.get(i).equals("F3")) {
						ffCcol.setText("S" + StateVar2.getText());
						ffcol.getColumns().add(ffCcol);
					}
					else if(Used.get(i).equals("F4")) {
						ffDcol.setText("R" + StateVar2.getText());
						ffcol.getColumns().add(ffDcol);
					}
				}
				else {
					if(Used.get(i).equals("F1")) {
						ffAcol.setText("J" + StateVar1.getText());
						ffcol.getColumns().add(ffAcol);
					}
					else if(Used.get(i).equals("F2")) {
						ffBcol.setText("K" + StateVar1.getText());
						ffcol.getColumns().add(ffBcol);
					}
					else if(Used.get(i).equals("F3")) {
						ffCcol.setText("J" + StateVar2.getText());
						ffcol.getColumns().add(ffCcol);
					}
					else if(Used.get(i).equals("F4")) {
						ffDcol.setText("K" + StateVar2.getText());
						ffcol.getColumns().add(ffDcol);
					}
				}
			}
		}

		if(ffType.getValue().equals("T") || ffType.getValue().equals("D")) {
			if(numFF.getValue() == 1) {
				stateAcol.setCellValueFactory(new PropertyValueFactory<>("D0"));
				if(numIV.getValue() == 1) {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D1"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
						
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					}
				}
				else {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D1"));
					inputBcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
					}
				}
			}
			else {
				stateAcol.setCellValueFactory(new PropertyValueFactory<>("D0"));
				stateBcol.setCellValueFactory(new PropertyValueFactory<>("D1"));
				if(numIV.getValue() == 1) {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					nstateBcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
					}
				}
				else {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					inputBcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
					nstateBcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D8"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
					}
				}
			}
		}
		else {
			//DO THIS
			if(numFF.getValue() == 1) {
				stateAcol.setCellValueFactory(new PropertyValueFactory<>("D0"));
				if(numIV.getValue() == 1) {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D1"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
					}
				}
				else {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D1"));
					inputBcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
					}
				}
			}
			else {
				stateAcol.setCellValueFactory(new PropertyValueFactory<>("D0"));
				stateBcol.setCellValueFactory(new PropertyValueFactory<>("D1"));
				if(numIV.getValue() == 1) {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					nstateBcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
						ffCcol.setCellValueFactory(new PropertyValueFactory<>("D8"));
						ffDcol.setCellValueFactory(new PropertyValueFactory<>("D9"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffCcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
						ffDcol.setCellValueFactory(new PropertyValueFactory<>("D8"));
					}
				}
				else {
					inputAcol.setCellValueFactory(new PropertyValueFactory<>("D2"));
					inputBcol.setCellValueFactory(new PropertyValueFactory<>("D3"));
					nstateAcol.setCellValueFactory(new PropertyValueFactory<>("D4"));
					nstateBcol.setCellValueFactory(new PropertyValueFactory<>("D5"));
					if(numOV.getValue() == 1) {
						outputAcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D8"));
						ffCcol.setCellValueFactory(new PropertyValueFactory<>("D9"));
						ffDcol.setCellValueFactory(new PropertyValueFactory<>("D10"));
					}
					else {
						ffAcol.setCellValueFactory(new PropertyValueFactory<>("D6"));
						ffBcol.setCellValueFactory(new PropertyValueFactory<>("D7"));
						ffCcol.setCellValueFactory(new PropertyValueFactory<>("D8"));
						ffDcol.setCellValueFactory(new PropertyValueFactory<>("D9"));
					}
				}
			}

		}

		ObservableList<Data> list = getData();
		table.setItems(list);

		if(getOutputCount() == 0) table.getColumns().addAll(statecol, inputcol, nstatecol, ffcol);
		else table.getColumns().addAll(statecol, inputcol, nstatecol, outputcol, ffcol);
		
		table.setFocusTraversable(false);
		StackPane root = new StackPane();
		//set maxwidth and height
		root.setMaxSize(890, 555);
		root.setPadding(new Insets(5));
		root.getChildren().add(table);
		Stage stage = new Stage();
		stage.setTitle("State Table");
		stage.initModality(Modality.APPLICATION_MODAL);
		Scene scene = new Scene(root, 900, 560);
		stage.setScene(scene);
		stage.show();
		//resetInput();

	}

	private ObservableList<Data> getData(){
		ObservableList<Data> datalist = FXCollections.observableArrayList();
		int size = (int) Math.pow(2, numFF.getValue() + numIV.getValue());
		for(int i = 0; i < size; i++) {
			if(Used.size() == 4) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i)));
			else if(Used.size() == 5) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i)));
			else if(Used.size() == 6) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i), Table.get(5).get(i)));
			else if(Used.size() == 7) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i), Table.get(5).get(i),
					Table.get(6).get(i)));
			else if(Used.size() == 8) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i), Table.get(5).get(i),
					Table.get(6).get(i), Table.get(7).get(i)));
			else if(Used.size() == 9) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i), Table.get(5).get(i),
					Table.get(6).get(i), Table.get(7).get(i), Table.get(8).get(i)));
			else if(Used.size() == 10) datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i), Table.get(5).get(i),
					Table.get(6).get(i), Table.get(7).get(i), Table.get(8).get(i), Table.get(9).get(i)));
			else datalist.add(new Data(Table.get(0).get(i), Table.get(1).get(i),
					Table.get(2).get(i), Table.get(3).get(i), Table.get(4).get(i), Table.get(5).get(i),
					Table.get(6).get(i), Table.get(7).get(i), Table.get(8).get(i), Table.get(9).get(i),
					Table.get(10).get(i)));
		}
		return datalist;
	}


	@FXML
	private void resetAll() {
		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setTitle("Reset All");
		alert.setHeaderText("Reset Confirmation");
		alert.setContentText("This will reset all of your input and choices. Do you want "
				+ "to proceed?");
		Optional<ButtonType> choice = alert.showAndWait();
		if(choice.get() == ButtonType.OK) {
			resetInput();
		}
	}

	private void resetInput() {
		ffType.setValue(null);
		numFF.setValue(null);
		numIV.setValue(null);
		numOV.setValue(null);
		resetUserTypedOnly();

	}

	private void resetUserTypedOnly() {
		StateVar1.setVisible(false);
		StateVar1.setDisable(true);
		StateVar1.setText("");
		StateVar2.setVisible(false);
		StateVar2.setDisable(true);
		StateVar2.setText("");

		FlipFlop1.setVisible(false);
		FlipFlop1.setDisable(true);
		FlipFlop1.setText("");
		FlipFlop2.setVisible(false);
		FlipFlop2.setDisable(true);
		FlipFlop2.setText("");
		FlipFlop3.setVisible(false);
		FlipFlop3.setDisable(true);
		FlipFlop3.setText("");
		FlipFlop4.setVisible(false);
		FlipFlop4.setDisable(true);
		FlipFlop4.setText("");

		InputVar1.setVisible(false);
		InputVar1.setDisable(true);
		InputVar1.setText("");
		InputVar2.setVisible(false);
		InputVar2.setDisable(true);
		InputVar2.setText("");

		OutputVar.setVisible(false);
		OutputVar.setDisable(true);
		OutputVar.setText("");
		OutputEq.setVisible(false);
		OutputEq.setDisable(true);
		OutputEq.setText("");
	}

	private String transform(String eq) {
		String neq = eq;
		char[] eqr = eq.toCharArray();
		int addix = 1;
		try {
			for(int i = 0; i < eqr.length; i++) {
				if(Character.isAlphabetic(eqr[i])) {
					if(Character.isAlphabetic(eqr[i+1])) {
						neq = neq.substring(0, i+addix) + "*" + 
								neq.substring(i+addix);
						addix++;
					}
					else if(eqr[i+1] == '(') {
						neq = neq.substring(0, i+addix) + "*" + 
								neq.substring(i+addix);
						addix++;
					}
				}
				else if(eqr[i] == ')' || eqr[i] == '\'') {
					if(Character.isAlphabetic(eqr[i+1])) {
						neq = neq.substring(0, i+addix) + "*" + 
								neq.substring(i+addix);
						addix++;
					}
					else if(eqr[i+1] == '(') {
						neq = neq.substring(0, i+addix) + "*" + 
								neq.substring(i+addix);
						addix++;
					}
				}
			}

		}catch(Exception e) {

		}
		return neq;
	}

	private boolean isVarValid(String a) {
		a = a.replace(" ", "");
		if(a.length() > 1) return false;
		else {
			char[] b = a.toCharArray();
			for(char c: b)
				if(Character.isAlphabetic(c)) return true;
		}
		return false;
	}

	private boolean isEqValid(String e) {
		e = e.replace(" ", "");
		//operations available: and(* or () or AB) or(+) not(') xor (^)
		if(e.equals("0") || e.equals("1")) return true;
		char[] f = e.toCharArray();
		String[] symbols = "()+*'^".split("");
		List<String> l = new ArrayList<>();
		for(int i = 0; i < symbols.length; i++) {
			l.add(symbols[i]);
		}
		int i = 0;
		for(char g: f) {
			if(Character.isAlphabetic(g)) {
				if(!getVarAssignments().contains(Character.toString(Character.toUpperCase(g)))) return false;
				i++;
			}
			else {
				if(!l.contains(Character.toString(g))) return false;
				try {
					if(g == ')') {
						boolean isOpenParenthesesThere = false;
						for(int j = i; j >= 0; j--) {
							if(f[j] == '(') isOpenParenthesesThere = true;
							if(f[j] == ')') isOpenParenthesesThere = false;
						}
						if(isOpenParenthesesThere == false) return false;
					}
					if(g == '\'' && f[i + 1] == '\'') return false;
					if(g != ')' && g != '\'') if(f[i+1] == '*' || f[i+1] == '^' || f[i+1] == '+'|| f[i+1] == '\'') return false;
					
				}catch(ArrayIndexOutOfBoundsException a) {
					
				}
				i++;
			}
		}

		if(f[0] == '*' || f[0] == '^' || 
				f[0] == '+' || f[0] == '\'') return false;

		if(f[f.length - 1] == '*' || f[f.length - 1] == '^' || 
				f[f.length - 1] == '+') return false;

		return true;
	}


	public String getFlipFlop() {
		return FlipFlop;
	}

	public void setFlipFlop(String flipFlop) {
		FlipFlop = flipFlop;
	}

	public int getFlipFlopCount() {
		return FlipFlopCount;
	}

	public void setFlipFlopCount(int flipFlopCount) {
		FlipFlopCount = flipFlopCount;
	}

	public int getInputCount() {
		return InputCount;
	}

	public void setInputCount(int inputCount) {
		InputCount = inputCount;
	}

	public int getOutputCount() {
		return OutputCount;
	}

	public void setOutputCount(int outputCount) {
		OutputCount = outputCount;
	}

	public List<String> getVarAssignments() {
		return varAssignments;
	}

	public void setVarAssignments(List<String> varAssignments) {
		this.varAssignments = varAssignments;
	}
	
	@FXML
	private Button guideButton;
	
	@FXML
	private void guide() {
		Alert alert = new Alert(AlertType.INFORMATION);
		alert.setTitle("Guide");
		alert.setHeaderText("NextState Guide");
		alert.setContentText("Choose a guide to view.");
		
		ButtonType usagebutton = new ButtonType("Usage");
		ButtonType operatorbutton = new ButtonType("Operators");
		
		alert.getButtonTypes().setAll(usagebutton, operatorbutton);
		Optional<ButtonType> res = alert.showAndWait();
		if(res.get() == usagebutton) {
			Alert alert2 = new Alert(AlertType.INFORMATION);
			alert2.setTitle("General Usage Guide");
			alert2.setHeaderText("Usage of NextState");
			alert2.setContentText("Here is how to use the application:\n"
					+ "1. Choose the type of flip-flops, number of flip-flops, number of input variables, "
					+ "and number of output variables to be used.\n"
					+ "2. Click \"Set\".\n"
					+ "3. Assign the variables and the equations. Check the operator guide for the list of"
					+ " valid operations.\n"
					+ "4. Click \"Proceed\"."
					+ "\n\nIf possible, please keep the variables on the same letter case."
					+ "\n\nIf the user want to reset all inputs and selections, click \"Reset All\".");
			
			alert2.showAndWait();
		}
		else if(res.get() == operatorbutton) {
			Alert alert2 = new Alert(AlertType.INFORMATION);
			alert2.setTitle("Operator Guide");
			alert2.setHeaderText("Operators Available in NextState");
			alert2.setContentText("Here are the following operators available to use and their valid symbols:\n"
					+ "Operator\t\tValid Symbol\t\tExample\n"
					+ "AND\t\t\t\t *\t\t\tA*B or AB\n"
					+ "OR\t\t\t\t +\t\t\t   A+B\n"
					+ "NOT\t\t\t\t  \'\t\t\t    A\'\n"
					+ "XOR\t\t\t\t ^\t\t\t   A^B\n"
					+ "\nNotes:"
					+ "\nFor NAND and NOR, the user can just do AND and OR first, respectively"
					+ ", then use NOT."
					+ "\n\nThe user may or may not put AND operator between two variables that are"
					+ " intended to do the operation."
					+"\n\nPlease avoid enclosing the whole equation with paretheses, and only use "
					+ "it when grouping parts of an equation.");
			
			alert2.showAndWait();
		}
		
	}


}
