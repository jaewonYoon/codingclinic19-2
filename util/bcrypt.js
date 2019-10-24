const bcrypt= require('bcryptjs');
exports.makePassword = (password) => {
    return bcrypt.hashSync(password, 8);
}
exports.checkPassword = (password, dbPassword) =>{
    return bcrypt.compareSync(password, dbPassword);
    // return true if password is correct 
}