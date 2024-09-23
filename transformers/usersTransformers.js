exports.validateEmailFormat = (user) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(user.email);
};

exports.getInvalidEmails = (users) => {
    return users.reduce((acc, val) => {
        const isEmailValid = this.validateEmailFormat(val);

        if(!isEmailValid) {
            const invalidObject = {
                userId: val.userId,
                email: val.email
            };

            acc.invalidEmailsCount++;
            acc.invalidEmails.push(invalidObject);
        }

        return acc;

    }, {invalidEmailsCount: 0, invalidEmails: []})
} 
