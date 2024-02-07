import { Alert, Box } from '@mui/material';

type ErrorMessageProps = {
    errors: string[]
}

export function Errors({ errors }: ErrorMessageProps) {
    if (errors.length === 0) {
        return null;
    }
    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            {errors.map((error, index) => (
                <Alert key={index} severity='error' sx={{ mb: 2 }}>
                    {error}
                </Alert>
            ))}
        </Box>
    )
}