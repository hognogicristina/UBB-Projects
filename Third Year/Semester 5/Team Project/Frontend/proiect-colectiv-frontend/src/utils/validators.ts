export enum PasswordError {
    LengthSmallerThan8 = "Password must be at least 8 characters",
    NoUpperCaseLetter = "Password must contain at least one uppercase letter"
}


export function validateUsername(userName: string): boolean {
    if (!userName) {
        return false;
    }
    return true;
}

export function validatePasswd(passwd: string): PasswordError | boolean {
    if (passwd.length < 8) {
        return PasswordError.LengthSmallerThan8;
    }
    if (!containsUpper(passwd)) {
        return PasswordError.NoUpperCaseLetter;
    }
    return true;
}

function containsUpper(str: string): boolean {
    let contains = false;
    str.split('').forEach(letter => {
        if (letter === letter.toUpperCase()) {
            contains = true;
        }
    })
    return contains;
}