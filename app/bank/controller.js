const Bank = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const bank = await Bank.find()
            res.render('admin/bank/view_bank', {
                bank,
                alert,
                name: req.session.user.name,
                title: 'Page Bank'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    viewCreate : async(req, res) => {
        try {
            res.render('admin/bank/create', {
                name: req.session.user.name,
                title: 'Page Insert Bank'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    actionCreate : async(req, res) => {
        try {
            const {name, nameBank, accountNumber} = req.body

            let bank = await Bank({name, nameBank, accountNumber})
            await bank.save()

            req.flash('alertMessage', 'Successfully Added Bank');
            req.flash('alertStatus', 'success');

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    viewEdit : async(req, res) => {
        try {
            const {id} = req.params
            const bank = await Bank.findById({_id : id})
            res.render('admin/bank/edit', {
                bank,
                name: req.session.user.name,
                title: 'Page Edit Bank'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    actionEdit : async (req, res) => {
        try {
            const {id} = req.params
            const {name} = req.body
            const {nameBank} = req.body
            const {accountNumber} = req.body
            await Bank.findByIdAndUpdate({
                _id : id
            }, {name, nameBank, accountNumber})

            req.flash('alertMessage', 'Successfully Edit Bank');
            req.flash('alertStatus', 'warning');

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    actionDelete : async(req, res) => {
        try {
            const {id} = req.params
            await Bank.findByIdAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Successfully Delete Bank');
            req.flash('alertStatus', 'danger');

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    }
}