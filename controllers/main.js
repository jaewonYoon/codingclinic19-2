exports.getIndex =(req,res,next) => {
    res.render('main/index',{
        pageTitle: '힐러'
    })
}