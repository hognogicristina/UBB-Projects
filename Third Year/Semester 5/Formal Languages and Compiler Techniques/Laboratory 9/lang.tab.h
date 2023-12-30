/* A Bison parser, made by GNU Bison 2.3.  */

/* Skeleton interface for Bison's Yacc-like parsers in C

   Copyright (C) 1984, 1989, 1990, 2000, 2001, 2002, 2003, 2004, 2005, 2006
   Free Software Foundation, Inc.

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2, or (at your option)
   any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor,
   Boston, MA 02110-1301, USA.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* Tokens.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
   /* Put the tokens into the symbol table, so that GDB and other debuggers
      know about them.  */
   enum yytokentype {
     PROG = 258,
     INT = 259,
     REAL = 260,
     STR = 261,
     CHAR = 262,
     BOOL = 263,
     READ = 264,
     IF = 265,
     ELSE = 266,
     WRITE = 267,
     WHILE = 268,
     ARR = 269,
     SYS = 270,
     AND = 271,
     OR = 272,
     RAD = 273,
     PLUS = 274,
     MINUS = 275,
     TIMES = 276,
     DIV = 277,
     MOD = 278,
     BIGGEREQ = 279,
     LESSEQ = 280,
     BIGGER = 281,
     LESS = 282,
     EQQ = 283,
     EQ = 284,
     NEQ = 285,
     SQBRACKETOPEN = 286,
     SQBRACKETCLOSE = 287,
     OPEN = 288,
     CLOSE = 289,
     BRACKETOPEN = 290,
     BRACKETCLOSE = 291,
     DOT = 292,
     COMMA = 293,
     COLON = 294,
     SEMICOLON = 295,
     END_BLOCK = 296,
     BEGIN_BLOCK = 297,
     ENDL = 298,
     IDENTIFIER = 299,
     INTCONSTANT = 300,
     STRINGCONSTANT = 301
   };
#endif
/* Tokens.  */
#define PROG 258
#define INT 259
#define REAL 260
#define STR 261
#define CHAR 262
#define BOOL 263
#define READ 264
#define IF 265
#define ELSE 266
#define WRITE 267
#define WHILE 268
#define ARR 269
#define SYS 270
#define AND 271
#define OR 272
#define RAD 273
#define PLUS 274
#define MINUS 275
#define TIMES 276
#define DIV 277
#define MOD 278
#define BIGGEREQ 279
#define LESSEQ 280
#define BIGGER 281
#define LESS 282
#define EQQ 283
#define EQ 284
#define NEQ 285
#define SQBRACKETOPEN 286
#define SQBRACKETCLOSE 287
#define OPEN 288
#define CLOSE 289
#define BRACKETOPEN 290
#define BRACKETCLOSE 291
#define DOT 292
#define COMMA 293
#define COLON 294
#define SEMICOLON 295
#define END_BLOCK 296
#define BEGIN_BLOCK 297
#define ENDL 298
#define IDENTIFIER 299
#define INTCONSTANT 300
#define STRINGCONSTANT 301




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef int YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

