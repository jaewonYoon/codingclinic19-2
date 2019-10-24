//signIn 
exports.getSignIn = (req,res,next) => {
    res.render('user/signIn');
}
exports.postSignIn = (req,res,next) => {
    console.log(res.body);
}

