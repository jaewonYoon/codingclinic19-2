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
    static createUser(userId,password,email,nickname){
        return db.db.execute(`INSERT INTO user(userId,password,email,nickname) values 
         ('${userId}','${password}','${email}','${nickname}')`);
    }
    static fetchAll(){
        return db.db.execute('SELECT * FROM user');
    }

    static fetchUser(userId){
        return db.db.execute(`SELECT * FROM user where userId ='${userId}'`);
    }
    static fetchNick(nick){
        return db.db.execute(`SELECT count(*) as count FROM user where nickname='${nick}';`);
    }
}

