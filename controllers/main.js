exports.getIndex =(req,res,next) => {
    let user;
    if(req.session){
        user = req.session.userId; 
    }
    res.render('main/index',{
        pageTitle: '힐러',
        session: user
    })
}