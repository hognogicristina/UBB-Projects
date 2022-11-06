bits 32
global _byte_to_base_8
segment data public data use32
segment code public code use32

%IFNDEF BYTE_TO_BASE_8
%DEFINE BYTE_TO_BASE_8

; Show for each number from 32 to 126 the value of the number (in base 8) and the character with that ASCII code.

; stdcall convention
_byte_to_base_8: ;void byte_to_base_8(BYTE value, char* answer);
    push ebp ; when entering the function we set the register EBP←ESP
    mov ebp, esp ; before exiting the function we will restore this value
    sub esp, 4 ; the procedure needs local data, these are static data and they will be stored in a different segment from the stack segment, reserving n bytes multiple of 4
    push esi
    push edi

    ; at the location [EBP] we have the value of ebp for the caller
    ; retreive the function's arguments from the stack
    ; [ebp+4] contains the return value 
    ; [ebp] contains the ebp value for the caller
    
    mov edx, [ebp + 8] 
    lea edi, [ebp - 1] ; load effective address
    std 
    
    mov ecx, 3
    .get_octal_digits_loop:
        mov eax, edx
        shr edx, 3 ; the bits stored in destination are shifted number positions to the right
        and eax, 7
        add eax, '0'
        stosb ; store AL into the byte from the address <ES:EDI>
    loop .get_octal_digits_loop
    
    lea esi, [edi + 1]
    mov edi, [ebp + 12]
    
    ; copy the string passed as parameter to the asmConcat function (string1) in the result string
    cld
    mov ecx, 3
    .get_most_significant_digit:
    
        cmp ecx, 1
        je .done_get_most_significant_digit
        cmp byte[esi], '0'
        jne .done_get_most_significant_digit
        inc esi
    
    loop .get_most_significant_digit
    .done_get_most_significant_digit:
    
    .tmp_loop:
        movsb ; move string
    loop .tmp_loop
    
    mov eax, 0 ;store 0x0 at the end of the string
    stosb ; store AL into the byte from the address <ES:EDI>
    
    ; restore the stack frame
    pop edi
    pop esi
    mov esp, ebp ; returning from the procedure
    pop ebp
    ret
    ; stdcall convention - it is the responsibility of the caller program to free the parameters of the function from the stack

%ENDIF