;$ nasm -f elf gcd.asm
;$ ld -m elf_i386 gcd.o -o gcd
;$ ./gcd
section .data:
msg1    db  'GCD Finder: gcd(a,b)', 0
msg2    db  'Assign a number for a: ', 0
msg3    db  'Assign a number for b: ', 0
msg4    db  'Result: ', 0

section .bss
numA:    resb    32
numB:    resb    32

section .text
global _start
_start:
mov     eax, msg1
call    strprintwf

mov     eax, msg2
call    strprint

mov     eax, 3
mov     ebx, 0
mov     ecx, numA
mov     edx, 32
int     80h

mov     eax, msg3
call    strprint

mov     eax, 3
mov     ebx, 0
mov     ecx, numB
mov     edx, 32
int     80h

mov     eax, numA
call    absVal      ;incase of negative input
push    eax
mov     eax, numB
call    absVal      ;incase of negative input
mov     ebx, eax
pop     eax
call    gcd

;recursive gcd
;eax <- a
;ebx <- b
;base case: gcd(a, 0) = a
gcd:
;if(b == 0) gcd = a
cmp     ebx, 0 
je      result      ;jump to result    
;else
xor     edx, edx
div     ebx
mov     eax, ebx    ;a = b
mov     ebx, edx    ;b = a mod b (remainder of div)
jmp     gcd         ;call itself

result:
push    eax
mov     eax, msg4
call    strprint
pop     eax
call    intprintwf
call    exit

;helpers
absVal:
cmp     byte[eax], '-'
je      negative
call    atoi
ret

negative:
inc     eax
call    atoi
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