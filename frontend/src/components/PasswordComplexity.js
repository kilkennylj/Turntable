import React from 'react';
import zxcvbn from 'zxcvbn';

const PasswordComplexity = ({ password }) => {
    const testResult = zxcvbn(password);
    const num = testResult.score * 100/4;

    const createPasswordLabel = () => {
        switch(testResult.score) {
            case 0:
                return 'Very weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fear';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    }

    const functionProgressColor = () => {
        switch(testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none';
        }
    }

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: functionProgressColor(),
        height: '7px'
    })

    return (
        <div class>
            <div class="tw-text-right tw-font-TWGr tw-text-xs">
                <div class="progress tw-mb-1" style={{height: '7px'}}>
                    <div class="progress-bar" style={changePasswordColor()}></div>
                </div>
                <p style={{ color: functionProgressColor() }}>{createPasswordLabel()}</p>
            </div>
            <div class="tw-font-TWGr tw-text-xs tw-text-white">
                <p class="tw-my-1">• Must not be a common password</p>
                <p class="tw-my-1">• Must be at least 8 characters long</p>
                <p class="tw-my-1">• Must contain at least one number</p>
                <p class="tw-my-1">• Must contain one uppercase letter</p>
                <p class="tw-my-1">• Must contain one lowercase letter</p>
                <p class="tw-my-1">• Must contain one special character</p>
            </div>
        </div>
    )
}

export default PasswordComplexity