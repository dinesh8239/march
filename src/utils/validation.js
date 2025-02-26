const validateSchemaUpdate = (req) => {

    const { firstName, lastName, emailId, password, age, skills } = req.body

    if (!firstName || !lastName) {
        throw new Error('Name is required')
    }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (emailId && !emailRegex.test(emailId)) {
        throw new Error('Invalid emaiId format')
    }
    else if (password.length < 8) {
        throw new Error('please enter a strong password')
    }
    else if(age < 18) {
        throw new Error('age is not valid')
    }
    else if(skills.length > 5) {
        throw new Error('skills should be less than 5')
    }
}

module.exports = {
    validateSchemaUpdate
} 