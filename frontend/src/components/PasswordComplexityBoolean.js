import zxcvbn from 'zxcvbn';

export function PasswordComplexityBoolean(password)
{
    const testResult = zxcvbn(password);

    if(testResult.score >= 3)
    {
        return true;
    }
    else
    {
        return false;
    }
}