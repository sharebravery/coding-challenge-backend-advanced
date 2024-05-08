export const validateRedeemCode = (code: string): boolean => {
    return /^[a-zA-Z0-9]{6}$/.test(code); // Assuming the redemption code is a combination of 6 alphanumeric characters
};
