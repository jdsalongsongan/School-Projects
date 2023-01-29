;$ nasm -f elf xor.asm
;$ ld -m elf_i386 xor.o -o xor
;$ ./xor
section .data
title   db   'XOR Cipher Encrypter/ Decrypter', 0
msg1    db   'Enter input filename (extension included): ', 0
msg4    db   'Enter output filename (extension included): ', 0
len     equ  2048
msg2    db   'Enter 8-bit key: ', 0
msg3    db   'Result: ', 0
msg5    db   'Check ', 0
msg6    db   ' for the result of the cipher.', 0
errmsg  db   ' not found.', 0
section .bss
name:    resb    100
oname:   resb    100
desc:    resb    4
buff:    resb    2048
key:     resb    9
temp:    resb    1

section .text
global _start
_start:
mov     eax, title
call    strprintwf

mov     eax, msg1
call    strprint

mov     ecx, name
mov     edx, 100
mov     ebx, 0
mov     eax, 3
int     80h

mov     eax, name
xor     ecx, ecx
ol0:
cmp     byte[eax+ecx], 10
je      orem
inc     ecx
jmp     ol0

orem:
mov     byte[eax+ecx], 0

mov     ebx, eax
mov     eax, 5
mov     ecx, 0
int     80h
cmp     eax, 0
jle     fileNotFound

mov     [desc], eax

mov     eax, 3
mov     ebx, [desc]
mov     ecx, buff
mov     edx, len
int     80h

mov     eax, 6
mov     ebx, [desc]
int     80h

mov     eax, msg4
call    strprint

mov     ecx, oname
mov     edx, 100
mov     ebx, 0
mov     eax, 3
int     80h

mov     eax, msg2
call    strprint

mov     ecx, key
mov     edx, 9
mov     ebx, 0
mov     eax, 3
int     80h

mov     esi, key
xor     edi, edi
l1:
cmp     byte[esi+edi], 10
je      trunc
inc     edi
jmp     l1
trunc:
mov     byte[esi+edi], 0 

mov     al, 128
mov     bl, 2
xor     edi, edi
mov     cl, 0
atod:
cmp     al, 0
je      xortime
cmp     byte[esi+edi], '0'
je      skip
add     cl, al
skip:
xor     ah, ah
div     bl
inc     edi 
jmp     atod 
xortime:
mov     esi, buff
mov     byte[temp], cl
mov     ah, cl
xor     edi, edi
l3:
cmp     byte[esi+edi], 0
je      printing
cmp     byte[esi+edi], 10
je      incre
xor     byte[esi+edi], ah
incre:
inc     edi
jmp     l3

printing:
mov     eax, msg5
call    strprint

mov     eax, oname
xor     ecx, ecx
l0:
cmp     byte[eax+ecx], 10
je      rem
inc     ecx
jmp     l0

rem:
mov     byte[eax+ecx], 0
mov     ebx, eax

call    strprint

mov     eax, msg6
call    strprintwf

xor     edi, edi
counter:
cmp     byte[esi+edi], 0
je      proceedToWrite
inc     edi
jmp     counter

proceedToWrite:
mov     eax, 5
mov     ecx, 1
int     80h
cmp     eax, 0
jle     createfile
mov     ebx, eax
jmp     write

createfile:
mov     eax, 8
mov     ecx, 511
int     80h
mov     ebx, eax

write:
mov     eax, 4
mov     ecx, esi
mov     edx, edi
int     80h

mov     eax, 36
int     80h

mov     eax, 6
int     80h

call    exit

fileNotFound:
mov     eax, name
call    strprint
mov     eax, errmsg
call    strprintwf
mov     ebx, eax
mov     eax, 1
int     80h

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
