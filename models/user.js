const db = require('../util/database');

module.exports = class User{
    constructor(userId, password, email, gender, age, weight, height) {
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.height = height;
    }

    save() {

    }

    static fetchAll(){
        return db.execute('SELECT * FROM user');
    }

    static fetchUser(userId){
        return db.execute(`SELECT * FROM user where userId ='${userId}'`);
    }
}
