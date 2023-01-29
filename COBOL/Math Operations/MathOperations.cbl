      ******************************************************************
      * Author: John Eron David Salongsongan
      * Date: May 13, 2022
      * Purpose: Exercise
      * Tectonics: cobc
      ******************************************************************
       IDENTIFICATION DIVISION.
      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
       PROGRAM-ID. EXERCISE1.
       ENVIRONMENT DIVISION.
      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
       CONFIGURATION SECTION.
      *-----------------------
       INPUT-OUTPUT SECTION.
      *-----------------------
       DATA DIVISION.
      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
       FILE SECTION.
      *-----------------------
       WORKING-STORAGE SECTION.
      *NUMBERS TO BE TAKEN
       01 WS-NUM1 PIC 9(2)V999.
       01 WS-NUM2 PIC 9(2)V999.
      *FOR DISPLAYING NUMBERS (REMOVES LEADING 0's IN INPUT)
       01 WS-DSP-N1 PIC Z9.99.
       01 WS-DSP-N2 PIC Z9.99.
      *STORES ANSWER
       01 WS-ANS PIC Z(3)9.99.
      *STORES MULTIPLICATION & DIVISION ANSWERS(4 DECIMAL FOR PRECISION)
       01 WS-PRC-ANS PIC ZZZ9.9999.
      *STORES SUBTRACTION ANSWERS (PRESERVES SIGN)
       01 WS-SGN-ANS PIC S9(2)V99.

      *-----------------------
       PROCEDURE DIVISION.
      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
       MAIN-PROCEDURE.
      **
      * The main procedure of the program
      **
            DISPLAY 'THIS PROGRAM ACCEPTS 2 TWO-DIGIT POSITIVE'
            DISPLAY 'DECIMAL NUMBERS (UP TO TWO DECIMAL PLACES)'
            DISPLAY 'ENTER NUM1:'
            ACCEPT WS-NUM1
            DISPLAY 'ENTER NUM2:'
            ACCEPT WS-NUM2
            MOVE WS-NUM1 TO WS-DSP-N1
            MOVE WS-NUM2 TO WS-DSP-N2
            DISPLAY '--RESULTS--'
            ADD WS-NUM1 TO WS-NUM2 GIVING WS-ANS
            DISPLAY WS-DSP-N1 ' + ' WS-DSP-N2 ' = ' WS-ANS
            SUBTRACT WS-NUM2 FROM WS-NUM1 GIVING WS-SGN-ANS
            DISPLAY WS-DSP-N1 ' - ' WS-DSP-N2 ' =  ' WS-SGN-ANS
            MULTIPLY WS-NUM1 BY WS-NUM2 GIVING WS-PRC-ANS
            DISPLAY WS-DSP-N1 ' * ' WS-DSP-N2 ' = ' WS-PRC-ANS
            DIVIDE WS-NUM2 INTO WS-NUM1 GIVING WS-PRC-ANS ROUNDED
            DISPLAY WS-DSP-N1 ' / ' WS-DSP-N2 ' = ' WS-PRC-ANS
            STOP RUN.
      ** add other procedures here
       END PROGRAM EXERCISE1.
