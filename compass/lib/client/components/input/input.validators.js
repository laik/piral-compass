export const isRequired = {
    condition: ({ required }) => required,
    message: () => `This field is required`,
    validate: value => !!value.trim(),
};
export const isEmail = {
    condition: ({ type }) => type === "email",
    message: () => `Wrong email forma`,
    validate: value => !!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
};
export const isNumber = {
    condition: ({ type }) => type === "number",
    message: () => `Invalid number`,
    validate: (value, { min, max }) => {
        const numVal = +value;
        return !(isNaN(numVal) ||
            (min != null && numVal < min) ||
            (max != null && numVal > max));
    },
};
export const isUrl = {
    condition: ({ type }) => type === "url",
    message: () => `Wrong url forma`,
    validate: value => !!value.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
};
export const minLength = {
    condition: ({ minLength }) => !!minLength,
    message: (value, { minLength }) => `Minimum length is ${minLength}`,
    validate: (value, { minLength }) => value.length >= minLength,
};
export const maxLength = {
    condition: ({ maxLength }) => !!maxLength,
    message: (value, { maxLength }) => `Maximum length is ${maxLength}`,
    validate: (value, { maxLength }) => value.length <= maxLength,
};
export const systemName = {
    message: () => `This field must contain only lowercase latin characters, numbers and dash.`,
    validate: value => !!value.match(/^[a-z0-9-]+$/) && !!value.match(/^\D+/),
};
export const accountId = {
    message: () => `Invalid account ID`,
    validate: value => (isEmail.validate(value) || systemName.validate(value))
};
export const conditionalValidators = [
    isRequired, isEmail, isNumber, isUrl, minLength, maxLength
];
//# sourceMappingURL=input.validators.js.map