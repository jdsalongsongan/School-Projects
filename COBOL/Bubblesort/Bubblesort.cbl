      ******************************************************************
      * Author: John Eron David Salongsongan
      * Date: May 22, 2022
      * Purpose: Exercise 2
      * Tectonics: cobc
      ******************************************************************
       IDENTIFICATION DIVISION.
      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
       PROGRAM-ID. BUBBLESORT.
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
       01  WS-ARR.
           05 WS-ARR-IN PIC 99 OCCURS 10 TIMES.
       01  WS-INDEX PIC 99 VALUE 1.
       01  WS-INP-BUFFER PIC X(10).
       01  WS-I PIC 99.
       01  WS-J PIC 99.
       01  WS-TEMP PIC 99.
       01  WS-BOOL PIC 9 VALUE 0.
       01  WS-BOOL-INNER PIC 9 VALUE 0.
       01  WS-INP-CHOICE PIC X.
      *-----------------------
       PROCEDURE DIVISION.
      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
       LOOPING-PROCEDURE.
           PERFORM MAIN-PROCEDURE WITH TEST AFTER UNTIL WS-BOOL = 1
           STOP RUN.

       MAIN-PROCEDURE.
            MOVE 0 TO WS-BOOL-INNER
            MOVE 1 TO WS-INDEX
            MOVE 0 TO WS-I
            PERFORM INPUT-LOOP-PROC UNTIL WS-INDEX > 10
            DISPLAY "ARRAY PRE-BUBBLESORT: "NO ADVANCING
            MOVE 1 TO WS-INDEX
            PERFORM PRINT-ARR-PROC UNTIL WS-INDEX > 10
            PERFORM VARYING WS-I FROM 1 BY 1 UNTIL WS-I = 11
                PERFORM VARYING WS-J FROM WS-I BY 1 UNTIL WS-J > 10
                    IF WS-ARR-IN(WS-J) < WS-ARR-IN(WS-I) THEN
                        MOVE WS-ARR-IN(WS-I) TO WS-TEMP
                        MOVE WS-ARR-IN(WS-J) TO WS-ARR-IN(WS-I)
                        MOVE WS-TEMP TO WS-ARR-IN(WS-J)
                   END-IF
                END-PERFORM
            END-PERFORM
            DISPLAY "ARRAY POST-BUBBLESORT: "NO ADVANCING
            MOVE 1 TO WS-INDEX
            PERFORM PRINT-ARR-PROC UNTIL WS-INDEX > 10
            PERFORM WITH TEST AFTER UNTIL WS-BOOL-INNER = 1
            DISPLAY "CONTINUE? (Y/N)"
            ACCEPT WS-INP-CHOICE
            EVALUATE WS-INP-CHOICE
               WHEN "N"
                   DISPLAY "EXITING PROGRAM..."
                   MOVE 1 TO WS-BOOL
                   MOVE 1 TO WS-BOOL-INNER
               WHEN "Y"
                   DISPLAY "CONTINUING..."
                   MOVE 1 TO WS-BOOL-INNER
               WHEN OTHER
                   DISPLAY "INVALID INPUT. TRY AGAIN."
            END-PERFORM.

      ** add other procedures here
       INPUT-LOOP-PROC.
           DISPLAY "ENTER NUMBER "WS-INDEX":"
           ACCEPT WS-INP-BUFFER
           IF FUNCTION NUMVAL(WS-INP-BUFFER) IS POSITIVE THEN
               IF FUNCTION NUMVAL(WS-INP-BUFFER) <= 99 THEN
                   MOVE FUNCTION NUMVAL(WS-INP-BUFFER)
                                TO WS-ARR-IN(WS-INDEX)
                   ADD 1 TO WS-INDEX
               END-IF
           END-IF.

       PRINT-ARR-PROC.
           IF WS-INDEX = 10 THEN
               DISPLAY WS-ARR-IN(WS-INDEX)
           ELSE
               DISPLAY WS-ARR-IN(WS-INDEX)" "NO ADVANCING
           END-IF
           ADD 1 TO WS-INDEX.

       END PROGRAM BUBBLESORT.
