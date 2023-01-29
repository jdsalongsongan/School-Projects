;$ nasm -f elf ari.asm
;$ ld -m elf_i386 ari.o -o ari
;$ ./ari
section .data
msg1    db  'Arithmetic Series', 0
msg2    db  'Enter starting number a0: ', 0
msg3    db  'Enter common difference d: ', 0
msg4    db  'Enter last number an: ', 0
msg5    db  'Invalid entry. Check your inputs', 0
msg6    db  'Sequence: ', 0
comma   db  ', ', 0
msg7    db  'Sum: ', 0
lf      db  '', 0
negsign db  '-', 0

section .bss
a0:     resb    32
an:     resb    32
d:      resb    32
n:      resb    32

section .text
global _start
_start:
mov     eax, msg1
call    strprintwf

mov     eax, msg2
call    strprint

mov     ecx, a0
mov     edx, 32
call    getinput
mov     eax, a0
call    checkIfNeg
push    eax         ;stack: a0

mov     eax, msg3
call    strprint

mov     ecx, d
mov     edx, 32
call    getinput
mov     eax, d
call    checkIfNeg
push    eax         ;stack: a0, d

mov     eax, msg4
call    strprint

mov     ecx, an
mov     edx, 32
call    getinput
mov     eax, an
call    checkIfNeg
push    eax         ;stack: a0, d, an

checkInp:
pop     eax         ;stack: a0, d  eax <- an
pop     ecx         ;stack: a0     ecx <- d
cmp     ecx, 0
jl      decreasing
je      constant
jmp     increasing

increasing:
pop     ebx         ;stack: <none> ebx <- a0
cmp     eax, ebx
jl      badInp
jmp     checkIfReachable

decreasing:
pop     ebx
cmp     eax, ebx
jg      badInp
jmp     checkIfReachable

constant:
pop     ebx
cmp     eax, ebx
jne     badInp
jmp     checkIfReachable

badInp:
mov     eax, msg5
call    strprintwf
call    exit

checkIfReachable:
push    eax     ;stack: an
push    ebx     ;stack: an, a0
push    ecx     ;stack: an, a0, d
sub     eax, ebx
mov     ebx, ecx
cmp     ebx, 0
jl      procNeg
jmp     proceed
procNeg:
neg     ebx
jmp     proceed
proceed:
xor     edx, edx
div     ebx
cmp     edx, 0
jne     badInp  ;change message to unreachable
pop     ebx     ;stack: an, a0  ebx <- d
pop     eax     ;stack: an      eax <- a0
pop     edx     ;stack: <none>  edx <- an
push    eax     ;stack: a0
push    edx     ;stack: a0, an
push    eax     ;stack: a0, an, a0
mov     eax, msg6
call    strprint
pop     eax     ;stack: a0, an  eax <- a0
mov     ecx, 1
jmp     printSequence

printSequence:
cmp     eax, edx
je      getSum
push    eax
call    checkIfNegResult
mov     eax, comma
call    strprint
pop     eax
add     eax, ebx
inc     ecx
jmp     printSequence

getSum:
call    checkIfNegResult
mov     eax, lf
call    strprintwf
pop     eax     ;stack: a0  eax <- an
pop     ebx     ;stack: <none> ebx <- a0
add     eax, ebx
mul     ecx
xor     edx, edx
mov     ebx, 2
div     ebx
push    eax     ;stack: Sn
mov     eax, msg7
call    strprint
pop     eax
call    checkIfNegResult
mov     eax, lf
call    strprintwf
call    exit

;helper
checkIfNegResult:
cmp     eax, 0
jl      printNeg
call    intprint
ret

printNeg:
neg     eax
push    eax
mov     eax, negsign
call    strprint
pop     eax
call    intprint
ret
getinput:
mov     eax, 3
mov     ebx, 0
int     80h
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