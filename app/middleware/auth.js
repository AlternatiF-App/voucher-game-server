module.exports = {
    isLoginAdmin : (req, res, next) => {
        if(req.session.user === null || req.session.user === undefined) {
            req.flash('alertMessage', 'Sorry, Your session is timeout. Please login again')
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }else{
            next()
        }
    }
}