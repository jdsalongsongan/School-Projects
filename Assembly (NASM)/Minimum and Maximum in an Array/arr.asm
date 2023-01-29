;$ nasm -f elf arr.asm
;$ ld -m elf_i386 arr.o -o arr
;$ ./arr
section .data
msg1    db   'Finding Minimum and Maximum in an Array', 0
msg2    db   'Enter a number: ', 0
msg3    db   'Minimum: ', 0
msg4    db   'Maximum: ', 0
msg5    db   ' Index: ', 0
msg6    db   'Result:', 0
negsign db   '-', 0
lf      db   '', 0
arr1    dd   0, 0, 0, 0, 0, 0, 0, 0, 0, 0

section .bss
inp:    resb   8


section .text
global _start
_start:
mov     eax, msg1
call    strprintwf

xor     ebx, ebx
xor     edi, edi
inpLoop:
cmp     edi, 10
je      nextStep

mov     eax, msg2
call    strprint

mov     ecx, inp
mov     edx, 8
call    getinput
mov     eax, inp
call    checkIfNeg

mov     dword[arr1+ebx*4], eax
inc     ebx
inc     edi
jmp     inpLoop

nextStep:
mov     edi, 1
mov     ecx, [arr1]  ;min
mov     ebx, [arr1]  ;max
xor     eax, eax    ;imax
xor     edx, edx    ;imin
findMinMax:
cmp     edi, 10
je      out
cmpMax:
cmp     ebx, [arr1+edi*4]
jl      changeMax
jmp     cmpMin
changeMax:
mov     ebx, [arr1+edi*4]
mov     eax, edi
cmpMin:
cmp     ecx, [arr1+edi*4]
jg      changeMin
jmp     increment
changeMin:
mov     ecx, [arr1+edi*4]
mov     edx, edi
increment:
inc     edi
jmp     findMinMax
out:
;index starts at 0
push    eax
mov     eax, lf
call    strprintwf

mov     eax, msg6
call    strprintwf

mov     eax, msg3
call    strprint
mov     eax, ecx
call    checkIfNegResult
mov     eax, msg5
call    strprint
mov     eax, edx
call    intprintwf

mov     eax, msg4
call    strprint
mov     eax, ebx
call    checkIfNegResult
mov     eax, msg5
call    strprint
pop     eax
call    intprintwf

call    exit

getinput:
push    ebx
mov     eax, 3
mov     ebx, 0
int     80h
pop     ebx
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