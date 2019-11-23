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
    static createImage(userId,imageUrl){
        return db.db.execute(`update user set Image='${imageUrl}' where userId='${userId}'`);
    }
    static fetchImage(userId){
        return db.db.execute(`SELECT Image from user where userId='${userId}' `);
    }
    static fetchGoal(userId, age, height, weight ,kcal, bmr, gender, activity, process){
        return db.db.execute(`INSERT INTO goal(userId, age, height ,weight, kcal, bmr, gender, activity, process)
        values ('${userId}', '${age}', '${height}', '${weight}', '${kcal}', '${bmr}', '${gender}', '${activity}', '${process}')
        `);
    }
    static getProcess(userId){
        return db.db.execute(`SELECT process from goal where userId='${userId}'`);
    }
    static getGoal(userId){
        return db.db.execute(`SELECT * from goal where userId='${userId}'`);  
    }
    static applyGoal(userId, goalWeight, goalFatRate, period, process){
        return db.db.execute(`update goal set goalWeight='${goalWeight}', goalFatRate='${goalFatRate}', period='${period}', process='${process}' where userId='${userId}'`);
    }
    static applyProcess(userId,process){

    }
}

