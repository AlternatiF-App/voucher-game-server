const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports={
    viewSignin: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            if(req.session.user === null || req.session.user === undefined) {
                res.render('admin/users/view_signin', {
                    alert,
                    title: 'Page Sign In'
                })
            }else{
                res.redirect('/dashboard')
            }
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionSignIn: async(req, res) => {
        try {
            const {email, password} = req.body
            const check = await User.findOne({ email: email})

            if(check){
                if(check.status === 'Y'){
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if(checkPassword){
                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            name: check.name
                        }
                        res.redirect('/dashboard')
                    }else{
                        req.flash('alertMessage', 'Sorry, Your password is incorrect')
                        req.flash('alertStatus', 'danger')
                        res.redirect('/')
                    }
                }else{
                    req.flash('alertMessage', 'Sorry, Your status is not active')
                    req.flash('alertStatus', 'danger')
                    res.redirect('/')
                }
            }
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
        }
    },
    actionLogout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
}