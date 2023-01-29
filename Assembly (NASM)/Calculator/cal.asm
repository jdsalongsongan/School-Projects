;$ nasm -f elf cal.asm
;$ ld -m elf_i386 cal.o -o cal
;$ ./cal
section .data:
title   db  'Assembly Calculator', 0
msg1    db  'Enter n1: ', 0
msg2    db  'Enter n2: ', 0
msg3    db  'n1 + n2 = ', 0
msg4    db  'n1 - n2 = ', 0
msg5    db  'n1 * n2 = ', 0
msg6    db  'n1 / n2 = ', 0
msg7    db  ' r. ', 0
msg8    db  'Is n1 a multiple of n2? ', 0
msg9    db  'Is n2 a multiple of n1? ', 0
msg10   db  'Yes', 0
msg11   db  'No', 0
negsign db  '-', 0

section .bss
num1:   resb    32
num2:   resb    32

section .text
global _start

_start:
mov     eax, title
call    strprintwf

mov     eax, msg1
call    strprint

mov     eax, 3
mov     ebx, 0
mov     ecx, num1
mov     edx, 32
int     80h

mov     eax, msg2
call    strprint

mov     eax, 3
mov     ebx, 0
mov     ecx, num2
mov     edx, 32
int     80h

;addition
mov     eax, num2
call    checkIfNeg
mov     ebx, eax
mov     eax, num1
call    checkIfNeg
add     eax, ebx  
push    eax

mov     eax, msg3
call    strprint
pop     eax
call    checkIfNegResult

;subtraction
mov     eax, num2
call    checkIfNeg
mov     ebx, eax
mov     eax, num1
call    checkIfNeg
sub     eax, ebx
push    eax

mov     eax, msg4
call    strprint
pop     eax
call    checkIfNegResult

;multiplication
mov     eax, num1
call    checkIfNeg
mov     ebx, eax
mov     eax, num2
call    checkIfNeg
mul     ebx
mov     ebx, eax

mov     eax, msg5
call    strprint
mov     eax, ebx
call    checkIfNegResult

;division
mov     eax, msg6
call    strprint

mov     eax, num2
call    checkIfNeg
mov     ebx, eax
mov     eax, num1
call    checkIfNeg
call    checkSignOfN1
;fix division routines
cont:
mov     eax, msg7
call    strprint
call    checkIfNegRem

mults:
;n1 is multiple of n2
mov     ebx, eax
mov     eax, msg8
call    strprint
mov     eax, ebx
call    isMultiple

;n2 is multiple of n1
pop     ebx
pop     eax
xor     edx, edx
div     ebx
mov     eax, msg9
call    strprint
mov     eax, edx
call    isMultiple

call    exit

checkSignOfN1:
mov     ecx, 0
cmp     eax, 0
jg      checkSignOfN2n
neg     eax
push    eax
inc     ecx
jmp     checkSignOfN2

checkSignOfN2:
cmp     ebx, 0
jg      doDivisionn
neg     ebx
push    ebx
inc     ecx
jmp     doDivision

checkSignOfN2n:
push    eax
cmp     ebx, 0
jg      doDivisionn
neg     ebx
push    ebx
inc     ecx
jmp     doDivision

doDivision:
xor     edx, edx
div     ebx
cmp     ecx, 1
je      negAns
jmp     posAns

doDivisionn:
push    ebx
xor     edx, edx
div     ebx
cmp     ecx, 1
je      negAns
jmp     posAns

negAns:
push    eax
mov     eax, negsign
call    strprint
pop     eax
jmp     posAns

posAns:
call    intprint
jmp     cont


checkIfNegRem:
pop     ecx
pop     ebx
pop     eax
push    ebx
push    eax
cmp     eax, 0
jl      negRem
jmp     posRem

negRem:
mov     eax, negsign
call    strprint
push    edx
mov     eax, edx
call    intprintwf
neg     eax
jmp     mults

posRem:
mov     eax, edx
call    intprintwf
jmp     mults

isMultiple:
cmp     eax, 0
je      .printYes
mov     eax, msg11
call    strprintwf
ret

.printYes:
mov     eax, msg10
call    strprintwf 
ret  

checkIfNeg:
cmp     byte[eax], '-'
je      negative
call    atoi
ret

negative:
inc     eax
call    atoi
neg     eax
ret

checkIfNegResult:
cmp     eax, 0
jl      printNeg
call    intprintwf
ret

printNeg:
neg     eax
push    eax
mov     eax, negsign
call    strprint
pop     eax
call    intprintwf
ret


atoi:
push    ebx
push    ecx
push    edx
push    esi
mov     esi, eax
mov     eax, 0
mov     ecx, 0

.loopmul:
xor     ebx, ebx
mov     bl, [esi+ecx]
cmp     bl, 48
jl      .done
cmp     bl, 57
jg      .done
sub     bl, 48
add     eax, ebx
mov     ebx, 10
mul     ebx
inc     ecx
jmp     .loopmul

.done:
cmp     ecx, 0
je      .restore
mov     ebx, 10
div     ebx

.restore:
pop     esi
pop     edx
pop     ecx
pop     ebx
ret

intprint:
push    eax
push    ecx
push    edx
push    esi
mov     ecx, 0

.loopdiv:
inc     ecx
mov     edx, 0
mov     esi, 10
idiv    esi
add     edx, 48
push    edx
cmp     eax, 0
jnz     .loopdiv

.loopprint:
dec     ecx
mov     eax, esp
call    strprint
pop     eax
cmp     ecx, 0
jnz     .loopprint
pop     esi
pop     edx
pop     ecx
pop     eax
ret

intprintwf:
call    intprint
push    eax
mov     eax, 0ah
push    eax
mov     eax, esp
call    strprint
pop     eax
pop     eax
ret

strlen:
push    ebx
mov     ebx, eax

.nxtch:
cmp     byte[eax], 0
jz      .finished
inc     eax
jmp     .nxtch

.finished:
sub     eax, ebx
pop     ebx
ret

strprint:
push    edx
push    ecx
push    ebx
push    eax
call    strlen
mov     edx, eax
pop     eax
mov     ecx, eax
mov     ebx, 1
mov     eax, 4
int     80h
pop     ebx
pop     ecx
pop     edx
ret

strprintwf:
call    strprint
push    eax
mov     eax, 0ah
push    eax
mov     eax, esp
call    strprint
pop     eax
pop     eax
ret

exit:
mov     ebx, 0
mov     eax, 1
int     80h
ret
